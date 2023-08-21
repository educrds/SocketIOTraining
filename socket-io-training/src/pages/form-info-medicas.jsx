import '../index.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePatient } from '../redux';

const socket = io.connect('http://localhost:3001');

function FormInfoMedicas() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fichaMedica: {
      dorNoPeito: null,
      faltaAr: null,
      pressaoAlta: null,
      pressaoBaixa: null,
      quimioterapia: null,
      motivo: null,
    },
  });

  const handleInputChange = event => {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      fichaMedica: {
        ...prevForm.fichaMedica,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    dispatch(updatePatient(form));
    navigate('/termo-aceite');
  };
  // socket.emit('send_message', form);

  return (
    <>
      <div className='f-column g-16'>
        <div className='f-column g-8 f-align-center'>
          <div className='f-14 col-blue'>Informações médicas</div>
          <div className='f-row g-8'>
            <div className='progress-status-bar ok'></div>
            <div className='progress-status-bar ok'></div>
            <div className='progress-status-bar'></div>
            <div className='progress-status-bar'></div>
          </div>
        </div>

        <div className='f-column g-16'>
          <div className='f-title'>
            Você já tem ou teve?
            <div className='divider'></div>
          </div>

          <div className='f-row'>
            <span className='w-100'>Dor no peito:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='dorNoPeito' onChange={handleInputChange} />
                <label htmlFor=''>Sim</label>
              </div>

              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='dorNoPeito' onChange={handleInputChange} />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Falta de ar:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='faltaAr' onChange={handleInputChange} />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='faltaAr' onChange={handleInputChange} />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Pressão alta:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='pressaoAlta' onChange={handleInputChange} />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='pressaoAlta' onChange={handleInputChange} />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Pressão baixa:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='pressaoBaixa' onChange={handleInputChange} />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='pressaoBaixa' onChange={handleInputChange} />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Tratamento radioterápico:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='' id='' />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='' id='' />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Tratamento psiquiátrico:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='' id='' />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='' id='' />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Quimioterapia:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={true} name='quimioterapia' onChange={handleInputChange} />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' value={false} name='quimioterapia' onChange={handleInputChange} />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
        </div>

        <div className='f-column g-8'>
          <div className='f-title'>Qual motivo da consulta?</div>
          <textarea placeholder='Escreva aqui...' rows={4} onChange={handleInputChange} value={form.fichaMedica.motivo} name='motivo'></textarea>
        </div>

        <div className='f-column g-16'>
          <div className='f-title'>
            Você está usando?
            <div className='divider'></div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Drogas ilícitas:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' name='' id='' />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' name='' id='' />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
          <div className='f-row'>
            <span className='w-100'>Medicamentos:</span>
            <div className='f-row f-between'>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' name='' id='' />
                <label htmlFor=''>Sim</label>
              </div>
              <div className='f-row g-4 f-align-center f-justify-end'>
                <input type='radio' name='' id='' />
                <label htmlFor=''>Não</label>
              </div>
            </div>
          </div>
        </div>

        <div className='f-row g-8 f-justify-center'>
          <button className='btn-default btn-ghost' onClick={() => navigate('/info-pessoais')}>
            Voltar
          </button>
          <button className='btn-default btn-primary' onClick={handleSubmit}>
            Próximo<i className='fa-solid fa-arrow-right'></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default FormInfoMedicas;
