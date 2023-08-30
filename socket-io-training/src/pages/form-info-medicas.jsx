import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../redux';
import ButtonGroup from '../components/ButtonGroup';
import TitleWDivider from '../components/TitleWDivider';
import InputRadio from '../components/InputRadio';
import FormProgress from '../components/FormProgress';
import '../index.css';

function FormInfoMedicas() {
  const navigate = useNavigate();
  const patientForm = useSelector(state => state.patient);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fichaMedica: {
      pressaoAlta: patientForm.fichaMedica?.pressaoAlta ?? null,
      pressaoBaixa: patientForm.fichaMedica?.pressaoBaixa ?? null,
      tratamentoPsiquiatrico: patientForm.fichaMedica?.tratamentoPsiquiatrico ?? null,
      doencasCardiacas: patientForm.fichaMedica?.doencasCardiacas ?? null,
      hipertensao: patientForm.fichaMedica?.hipertensao ?? null,
      diabetes: patientForm.fichaMedica?.diabetes ?? null,
      motivo: patientForm.fichaMedica?.motivo ?? null,
      drogas: patientForm.fichaMedica?.drogas ?? null,
      medicamentos: patientForm.fichaMedica?.medicamentos ?? null,
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
        <FormProgress currentStep={1} title='Informações Médicas' />

        <div className='f-column g-16'>
          <TitleWDivider title='Você tem ou teve?' />
          <InputRadio checked={form.fichaMedica.pressaoAlta} name='pressaoAlta' label='Pressão alta:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.pressaoBaixa} name='pressaoBaixa' label='Pressão baixa:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.doencasCardiacas} name='doencasCardiacas' label='Doenças Cardíacas:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.tratamentoPsiquiatrico} name='tratamentoPsiquiatrico' label='Tratamento psiquiátrico:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.hipertensao} name='hipertensao' label='Hipertensão:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.diabetes} name='diabetes' label='Diabetes:' onChange={handleInputChange} />
        </div>

        <div className='f-column g-8'>
          <div className='f-title'>Qual motivo da consulta?</div>
          <textarea placeholder='Escreva aqui...' rows={4} onChange={handleInputChange} value={form.fichaMedica.motivo} name='motivo'></textarea>
        </div>

        <div className='f-column g-16'>
          <TitleWDivider title='Você está usando?' />
          <InputRadio checked={form.fichaMedica.drogas} name='drogas' label='Drogas ilícitas:' onChange={handleInputChange} />
          <InputRadio checked={form.fichaMedica.medicamentos} name='medicamentos' label='Medicamentos:' onChange={handleInputChange} />
        </div>

        <ButtonGroup onClickBack={() => navigate('/info-pessoais')} onClickNext={handleSubmit} />
      </div>
    </>
  );
}

export default FormInfoMedicas;
