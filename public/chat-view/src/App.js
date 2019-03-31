import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.ws = null;
    this.state = {
      newMsg: '',
      chatContent: '',
      username: '',
      joined: false
    }
    this.onJoin = this.onJoin.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
  }

  componentWillMount() {
    this.ws = new WebSocket('ws://localhost:8000/ws');
    this.ws.addEventListener('message', e => {
      let msg = json.parse(e.data);
      this.setState(prevState => {
        return {
          chatContent: prevState.chatContent + `
            <div class="chip">
              <span class="username">${msg.username}</span>
              <span class="message">${msg.message}</span>
            </div>
          `
        }
      })
    })
  }

  onJoin() {
    if (this.state.username) {
      this.setState({ joined: true });
    } else {
      alert('Please enter username');
    }
  }

  onChangeUserName(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>Simple Chat App</h2>
        </div>

        <div className="chatbody">
          
        </div>

        <div className="fields">
        { !this.state.joined ?
          <div>
            <input onChange={this.onChangeUserName} className="username" />
            <button onClick={this.onJoin}>Enter Chat!</button>
          </div>
          :
          <div>
            <input className="new-message" value="" placeholder="Start chatting!"/>
            <button>Send!</button>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;
