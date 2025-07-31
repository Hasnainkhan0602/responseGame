import { useRef } from 'react';

export default function Player({ onNameChange, currentName }) {
  const playerNameRef = useRef();

  function handleClick() {
    const newName = playerNameRef.current.value.trim();
    if (newName) {
      onNameChange(newName);
      playerNameRef.current.value = '';
    }
  }

  return (
    <section id="player">
      <h2>Welcome {currentName}</h2>
      <p>
        <input ref={playerNameRef} type="text" placeholder="Enter your name" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
