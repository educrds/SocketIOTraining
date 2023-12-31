import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePatient } from '../redux';
import axios from 'axios';
import FormProgress from '../components/FormProgress';

function FormTermoAceite() {
  const navigate = useNavigate();
  const patientForm = useSelector(state => state.patient);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    termoAceito: patientForm?.termoAceito || false,
  });

  const handleInputChange = event => {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: !!value,
    }));
  };

  const executeInsert = async () => {
    try {
      await axios.post('http://localhost:5000/insert', { patient: patientForm });
    } catch (error) {
      console.error('Error executing query:', error);
    }
  };

  const handleSubmit = () => {
    dispatch(updatePatient(form));
    executeInsert();
    navigate('/senha');
  };
  return (
    <>
      <div className='f-column g-16'>
        <FormProgress currentStep={2} title='Termo de Aceite' />
        <div className='f-column g-16'>
          <div>
            Declaro que autorizo, sem ônus, que o Curso de Odontologia da UNICEPLAC utilize informações e dados referentes ao meu caso, da mesma forma que autorizo o uso de tecidos e dentes removidos
            com justificativa odontológica, mantido sempre direta ou indiretamente o sigilo quanto á identidade e privacidade pessoal - para fins de estudo e aprendizado, apresentação em progresso,
            publicação em livros e revistas e outras atividades científicas, tanto no país como no exterior, respeitada toda a lesgilação vigente em relação ao assunto.
          </div>
          <div className='f-row g-4 f-align-center'>
            <input type='radio' value={true} checked={form.termoAceito} name='termoAceito' onChange={handleInputChange} />
            <label htmlFor=''>Declaro que li e aceito os termos citados.</label>
          </div>
        </div>

        <div className='f-row g-8 f-justify-center'>
          <button className='btn-default btn-ghost' onClick={() => navigate('/info-medicas')}>
            Voltar
          </button>
          <button className='btn-default btn-primary' onClick={handleSubmit}>
            Finalizar<i className='fa-solid fa-arrow-right'></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default FormTermoAceite;
