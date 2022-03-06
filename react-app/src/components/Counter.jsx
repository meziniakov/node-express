import React, { useState } from 'react';

const Counter = () => {
  let [likes, setLikes] = useState('0');

  function plus() {
    setLikes(++likes);
  }

  function minus() {
    setLikes(--likes);
  }

  return (
    <div>
      <h2>{likes}</h2>
      <button onClick={plus}>Like</button>
      <button onClick={minus}>Dislike</button>
    </div>
  );
};

export default Counter;
