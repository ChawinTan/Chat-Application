import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.ws = null;
    this.state = {
      newMsg: '',
      chatContent: '',
      email: '',
      usermae: '',
      joined: false
    }
    this.onJoin = this.onJoin.bind(this);
  }

  onJoin() {
    this.setState({ joined: true });
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
            <input className="username" />
            <button onClick={this.onJoin}>Enter Chat!</button>
          </div>
          :
          <div>
            <input className="new-message" />
            <button onClick={this.onJoin}>Send!</button>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default App;
