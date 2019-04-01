import React, { Component } from 'react';

import './App.css';
import ChatContent from '../src/ChatContent/ChatContent';

class App extends Component {
  constructor(props) {
    super(props);

    this.ws = null;
    this.state = {
      newMsg: '',
      chatContent: [],
      username: '',
      joined: false
    }
    this.onJoin = this.onJoin.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
  }

  componentWillMount() {
    this.ws = new WebSocket('ws://localhost:8000/ws');
    this.ws.addEventListener('message', e => {
      if (e.data !== "") {
        console.log(e.data);
        let msg = JSON.parse(e.data);
        this.setState(prevState => {
          return {
            chatContent: [... prevState.chatContent, { username: msg.username, message: msg.message }]
          }
        });
      }
    });
  }

  onJoin() {
    if (this.state.username) {
      this.setState({ joined: true });
    } else {
      alert('Please enter username');
    }
  }

  onMessage(e) {
    this.setState({ newMsg: e.target.value });
  }

  onChangeUserName(e) {
    this.setState({ username: e.target.value });
  }

  onSend() {
    if (this.state.newMsg !== '') {
      this.ws.send(
        JSON.stringify({
          email: this.state.email,
          username: this.state.username,
          message: this.state.newMsg
        })
      );

      this.setState({ newMsg: '' });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>Simple Chat App</h2>
        </div>

        { this.state.joined ?
          <div className="chatbody">
            {
              this.state.chatContent.map((message, index) => {
                return <ChatContent key={index} username={message.username} message={message.message} />
              })
            }
          </div> :
          null
        }
        <div className="fields">
        { !this.state.joined ?
          <div>
            <input onChange={this.onChangeUserName} className="username" />
            <button onClick={this.onJoin}>Enter Chat!</button>
          </div>
          :
          <div>
            <input className="new-message"  onChange={this.onMessage} placeholder="Start chatting!"/>
            <button onClick={this.onSend}>Send!</button>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;
