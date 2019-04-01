import React, { Component } from 'react';

import './ChatContent.css';

class ChatContent extends Component {
    render() {
        return (
            <div className="chip">
                <div className="username">{this.props.username} said:</div>
                <div className="message">{this.props.message}</div>
            </div>
        )
    }
}

export default ChatContent;