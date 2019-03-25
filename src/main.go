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

var upgrader = websocket.Upgrader{} // upgrade http request to a websocket

func handleConnections(w http.ResponseWriter, r *http.Request) {

}

func main() {
	// temp file server
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/", fs)

	// configure websocket route
	http.HandleFunc("/ws", handleConnections)
}