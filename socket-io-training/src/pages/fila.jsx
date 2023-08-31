import '../index.css';
// import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import { getPatient } from '../redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const socket = io.connect('http://localhost:3001');
// const db = 'http://localhost:5000/execute-query';

function Fila() {
  const [fila, setFila] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const executeQuery = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/execute-query', {
        params: {
          query:
            `SELECT * FROM tb_fila 
            LEFT JOIN tb_paciente ON tb_paciente.id = tb_fila.paciente_id 
            LEFT JOIN TB_GENERO ON TB_GENERO.ID = TB_PACIENTE.GENERO_ID
            LEFT JOIN TB_ESTADO_CIVIL ON TB_ESTADO_CIVIL.ID = TB_PACIENTE.ESTADO_CIVIL_ID
            LEFT JOIN tb_endereco ON tb_endereco.id = TB_PACIENTE.endereco_id 
            LEFT JOIN tb_ficha_medica ON tb_ficha_medica.paciente_id = TB_PACIENTE.id
            WHERE atendido IS false AND DATE(data_entrada) = CURRENT_DATE 
            ORDER BY CASE WHEN prioridade = 'Preferencial' THEN 1 ELSE 2 END, data_entrada ASC;`,
        },
      });
      setFila(data);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  const getPatientData = data => {
    dispatch(getPatient(data));
    navigate('/paciente');
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
          fila.map((paciente, index) => {
            const isPreferencial = paciente.prioridade === 'Preferencial';
            return (
              <div key={index} className='f-column g-8' onClick={() => getPatientData(paciente)}>
                <div className={`card f-column g-8 ${isPreferencial && 'card-preferencial'}`}>
                  <div className='f-row g-8 f-align-center'>
                    <div className='card-title'>
                      {paciente.nome} {paciente.sobrenome}
                    </div>
                    <span className='badge badge-idade'>{paciente.idade}</span>
                  </div>

                  <div className='f-row f-align-center f-justify-end g-4'>
                    <i className='fa-regular fa-clock'></i>
                    <div>{moment(paciente.data_entrada).locale('pt-br').format('LT')}</div>
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
