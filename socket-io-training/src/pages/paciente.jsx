import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Paciente = () => {
  const navigate = useNavigate();
  const patientByID = useSelector(state => state.patientByID);
  const [patientData] = useState(patientByID);

  const attendPatients = async patientID => {
    try {
      await axios.get('http://localhost:5000/execute-query', {
        params: {
          query: `UPDATE tb_fila SET atendido = TRUE WHERE paciente_id = ${patientID};`,
        },
      });
      navigate('/fila');
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  return (
    <div className='f-column g-16'>
      <div className='f-column'>
        <div className='f-row f-align-center g-16 w-100'>
          <i className='fa-solid fa-arrow-left f-20 c-pointer' onClick={() => navigate('/fila')}></i>
          <div className='f-title w-100'>Informações Paciente</div>
        </div>
        <div className='divider'></div>
      </div>
      <div className='f-column'>
        <div className='f-20 col-gray'>
          {patientData.nome} {patientData.sobrenome}
        </div>
        <div className='f-row g-8 f-wrap'>
          <div className='badge badge-gray'>{patientData.idade} anos</div>
          {patientData.prioridade === 'Preferencial' && <div className='badge badge-preferencial'>Preferencial</div>}
          {patientData.pcd && <div className='badge badge-preferencial'>PCD</div>}
          <div className='badge badge-phone'>{patientData.telefone}</div>
          <div className='badge badge-gray'>{patientData.email}</div>
        </div>
      </div>

      <div className='f-column g-8'>
        <div className='f-column'>
          <label className='f-bold col-gray'>Motivo da consulta</label>
          <div className='col-light-gray'>{patientData.motivo_consulta}</div>
        </div>

        <div className='divider-gray'></div>

        <div className='f-column g-8'>
          <label className='f-bold col-gray'>Endereço</label>
          <div className='f-row g-16'>
            <div className='f-column'>
              <label htmlFor='' className='col-light-gray'>
                CEP:
              </label>
              <input type='text' value={patientData.cep} disabled />
            </div>

            <div className='f-column'>
              <label className='col-light-gray'>Cidade:</label>
              <input value={patientData.cidade} disabled />
            </div>

            <div className='f-column'>
              <label className='col-light-gray'>Estado:</label>
              <input type='text' value={patientData.estado} disabled />
            </div>
          </div>
        </div>

        <div className='f-column'>
          <label className='col-light-gray'>Bairro:</label>
          <input value={patientData.bairro} disabled />
        </div>

        <div className='f-column'>
          <label className='col-light-gray'>Logradouro:</label>
          <input value={patientData.logradouro} disabled />
        </div>
      </div>

      <div className='divider-gray'></div>

      <div className='f-column g-8'>
        <label className='f-bold col-gray'>Já teve ou tem:</label>

        <div className='f-row g-8 f-wrap'>
          {patientData.diabetes && <div className='card-ficha-medica'>Diabetes</div>}
          {patientData.pressao_alta && <div className='card-ficha-medica'>Pressão Alta</div>}
          {patientData.pressao_baixa && <div className='card-ficha-medica'>Pressão Baixa</div>}
          {patientData.tratamento_psiquiatrico && <div className='card-ficha-medica'>Tratamento Psiquiatrico</div>}
          {patientData.doencas_cardiacas && <div className='card-ficha-medica'>Doenças Cardíacas</div>}
          {patientData.hipertensao && <div className='card-ficha-medica'>Hipertensão</div>}
        </div>
      </div>
      {patientData.drogas && patientData.medicamentos && (
        <div className='f-column g-8'>
          <label className='f-bold col-gray'>Faz uso de:</label>

          <div className='f-row g-8 f-wrap'>
            {patientData.drogas && <div className='card-ficha-medica'>Drogas</div>}
            {patientData.medicamentos && <div className='card-ficha-medica'>Medicamentos</div>}
          </div>
        </div>
      )}
      <div className='ml-auto'>
        <button className='btn-default btn-success' onClick={() => attendPatients(patientData.paciente_id)}>
          <i class='fa-solid fa-hand-holding-medical'></i>Atender
        </button>
      </div>
    </div>
  );
};

export default Paciente;
