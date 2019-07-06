import React from 'react';

const Messages = props => {
  console.log('Messages Component', props.messages);
  const renderMessages = () => {
    const renderList = props.messages.map((e, i) => (
      <li key={i}>
        <p>
          <span>{e.userName}</span>
          {e.message}
        </p>
      </li>
    ));
    return renderList;
  };
  return (
    <div>
      <ul>{renderMessages()}</ul>
    </div>
  );
};

export default Messages;
