import '../index.css';
// import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import { list_fila_today } from '../../../server/db/queries/queries';

// const socket = io.connect('http://localhost:3001');
// const db = 'http://localhost:5000/execute-query';

function Fila() {
  const [fila, setFila] = useState(null);

  const executeQuery = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/execute-query', {
        params: {
          query: list_fila_today,
        },
      });
      setFila(data);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  useEffect(() => {
    executeQuery();
  }, [fila]);

  return (
    <>
      <div className='f-column g-16'>
        <div className='f-title'>
          Aguardando Atendimento
          <div className='divider'></div>
        </div>
        {fila &&
          fila.map((item, index) => {
            const isPreferencial = item.prioridade === 'Preferencial';
            return (
              <div key={index} className='f-column g-8' onClick={() => console.log(item)}>
                <div className={`card f-column g-8 ${isPreferencial && 'card-preferencial'}`}>
                  <div className='f-row g-8 f-align-center'>
                    <div className='card-title'>
                      {item.nome} {item.sobrenome}
                    </div>
                    <span className='badge badge-idade'>{item.idade}</span>
                  </div>

                  <div className='f-row f-align-center f-justify-end g-4'>
                    <i className='fa-regular fa-clock'></i>
                    <div>{moment(item.data_entrada).locale('pt-br').format('LT')}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Fila;
