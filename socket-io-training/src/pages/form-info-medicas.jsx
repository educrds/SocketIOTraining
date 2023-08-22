import '../index.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../redux';

function FormInfoMedicas() {
  const navigate = useNavigate();
  const patientForm = useSelector(state => state.patient);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fichaMedica: {
      dorNoPeito: patientForm.fichaMedica?.dorNoPeito || null,
      faltaAr: patientForm.fichaMedica?.faltaAr || null,
      pressaoAlta: patientForm.fichaMedica?.pressaoAlta || null,
      pressaoBaixa: patientForm.fichaMedica?.pressaoBaixa || null,
      tratamentoRadioterapeutico: patientForm.fichaMedica?.tratamentoRadioterapeutico || null,
      tratamentoPsiquiatrico: patientForm.fichaMedica?.tratamentoPsiquiatrico || null,
      quimioterapia: patientForm.fichaMedica?.quimioterapia || null,
      motivo: patientForm.fichaMedica?.motivo || null,
      drogas: patientForm.fichaMedica?.drogas || null,
      medicamentos: patientForm.fichaMedica?.medicamentos || null,
    },
  });

  const handleInputChange = event => {
    let { name, value } = event.target;

    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

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

          <InputRadio checked={form.fichaMedica.dorNoPeito} name='dorNoPeito' label='Dor no Peito:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.faltaAr} name='faltaAr' label='Falta de ar:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.pressaoAlta} name='pressaoAlta' label='Pressão alta:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.pressaoBaixa} name='pressaoBaixa' label='Pressão baixa:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.tratamentoRadioterapeutico} name='tratamentoRadioterapeutico' label='Tratamento radioterápico:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.tratamentoPsiquiatrico} name='tratamentoPsiquiatrico' label='Tratamento psiquiátrico:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.tratamentoPsiquiatrico} name='quimioterapia' label='Quimioterapia:' onChange={handleInputChange} />
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

          <InputRadio checked={form.fichaMedica.drogas} name='drogas' label='Drogas ilícitas:' onChange={handleInputChange} />

          <InputRadio checked={form.fichaMedica.medicamentos} name='medicamentos' label='Medicamentos:' onChange={handleInputChange} />
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

const InputRadio = ({ checked, onChange, name, label }) => {
  return (
    <div className='f-row'>
      <span className='w-100'>{label}</span>
      <div className='f-row f-between'>
        <div className='f-row g-4 f-align-center f-justify-end'>
          <input type='radio' value={true} checked={checked} name={name} onChange={onChange} />
          <label htmlFor=''>Sim</label>
        </div>
        <div className='f-row g-4 f-align-center f-justify-end'>
          <input type='radio' value={false} checked={!checked} name={name} onChange={onChange} />
          <label htmlFor=''>Não</label>
        </div>
      </div>
    </div>
  );
};

export default FormInfoMedicas;
