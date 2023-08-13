import './index.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

const socket = io.connect('http://localhost:3001');

function Fila() {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
      setFila(prevFila => [...prevFila, data]);
    });
  }, [socket]);

  return (
    <>
      <div className='f-column g-16'>
        <div className='f-title'>
          Aguardando Atendimento
          <div className='divider'></div>
        </div>
        {fila.map((item, index) => (
          <div key={index} className='f-column g-8'>
            <div className='card f-column g-8'>
              <div className='f-row g-8 f-align-center'>
                <div className='card-title'>{item.nome}</div>
                <span className='badge badge-idade'>{item.idade} anos</span>
                {item.idade > 65 && <span className='badge badge-preferencial'> Preferencial</span>}
              </div>

              <div className='f-row f-align-center f-justify-end g-4'>
                <i className='fa-regular fa-clock'></i>
                <div>{moment(item.dataRegistro).format('LTS')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Fila;
