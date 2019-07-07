import React from 'react';
import './Messages.css';

const Messages = props => {
  console.log('Messages Component', props.messages);
  const renderMessages = () => {
    const renderList = props.messages.map((e, i) => (
      <li key={i} className="messages">
        <p>
          <span className="userName">{`${e.userName}:`}</span>
          {e.message}
        </p>
      </li>
    ));
    return renderList;
  };
  return (
    <div>
      <ul className="message-container">{renderMessages()}</ul>
    </div>
  );
};

export default Messages;
