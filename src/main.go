package main

import (
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

type Message struct {    // type Message
	Email string `json:"email"`
	Username string `json:"username"`
	Message string `json:"message"`
}

var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message) // queue for messages sent by clients -> Message type

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
} // upgrade http request to a websocket

func handleConnections(w http.ResponseWriter, r *http.Request) {
	// upgrade websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// close websocket when function returns
	defer ws.Close()

	// register new client
	clients[ws] = true

	// end message to channel if message is correct
	for {
		var msg Message
		err := ws.ReadJSON(&msg)

		if err != nil {
			log.Printf("At hanleConnections")
			log.Printf("err: %v", err)
			delete(clients, ws)
			break
		}
		broadcast <- msg
	}
}

func handleMessages() {
	for  {
		// grab the next message
		msg := <-broadcast
		// send it out to every client currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				// close connection and remove clients from the map
				log.Printf("At handleMessages")
				log.Printf("Error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func main() {

	// configure websocket route
	http.HandleFunc("/ws", handleConnections)

	// concurrent process that takes messages from broadcast channel
	go handleMessages()

	log.Println("http server started on:8000")
	err := http.ListenAndServe(":8000", nil) // uses DefaultServeMux

	if err !=  nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

// if handler is implemented as a type with ServeHttp method, use Handle.
// if handler is implemented as a function, use Handlefunc