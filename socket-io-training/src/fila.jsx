import './index.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function Fila() {
  const [messageReceived, setMessageReceived] = useState('');

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data);
    });
  }, [socket]);

  return (
    <>
      {messageReceived.nome}
      {messageReceived.telefone}
      {messageReceived.idade}
    </>
  );
}

export default Fila;
