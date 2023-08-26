import '../index.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePatient } from '../redux';
import TitleWDivider from '../components/TitleWDivider';
import ButtonGroup from '../components/ButtonGroup';
import InputMask from 'react-input-mask';
import axios from 'axios';

function FormInfoPessoais() {
  const navigate = useNavigate();
  const patientForm = useSelector(state => state.patient);
  const dispatch = useDispatch();
  const [estados, setEstados] = useState();
  const [form, setForm] = useState({
    nome: patientForm.nome || null,
    dataNascimento: patientForm.dataNascimento || null,
    idade: patientForm.idade || null,
    cpf: patientForm.cpf || null,
    telefone: patientForm.telefone || null,
    estadoCivil: patientForm.estadoCivil || null,
    genero: patientForm.genero ?? null,
    endereco: {
      cep: patientForm.endereco?.cep ?? null,
      estado: patientForm.endereco?.estado ?? null,
      endereco: patientForm.endereco?.endereco ?? null,
      logradouro: patientForm.endereco?.logradouro ?? null,
      cidade: patientForm.endereco?.cidade ?? null,
    },
  });

  const handleInputChange = event => {
    let { name, value } = event.target;

    if (!isNaN(value)) {
      value = parseInt(value, 10);
    }

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleDataNascimentoChange = event => {
    const { value } = event.target;
    const idade = moment().diff(value, 'years');

    setForm(prevForm => ({
      ...prevForm,
      idade: idade,
      dataNascimento: value,
    }));
  };

  const handleEnderecoChange = event => {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      endereco: {
        ...prevForm.endereco,
        [name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    setForm(prevForm => ({
      ...prevForm,
      dataRegistro: new Date(),
    }));

    dispatch(updatePatient(form));
    navigate('/info-medicas');
  };

  useEffect(() => {
    const urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    axios
      .get(urlEstados)
      .then(({ data }) => setEstados(data))
      .catch(e => console.error(e.messsage));
  }, []);

  const getCEP = async () => {
    const urlCEP = 'https://viacep.com.br/ws/';

    try {
      const { data } = await axios.get(`${urlCEP}/${form.endereco.cep}/json`);
      setForm(prevForm => ({
        ...prevForm,
        endereco: {
          ...prevForm.endereco,
          estado: data.uf,
          endereco: data.bairro,
          logradouro: data.logradouro,
          cidade: data.localidade,
        },
      }));
    } catch (error) {
      console.error(error.messsage);
    }
  };

  return (
    <>
      <div className='f-column g-16'>
        <div className='f-column g-8 f-align-center'>
          <div className='f-14 col-blue'>Informações pessoais</div>
          <div className='f-row g-8'>
            <div className='progress-status-bar ok'></div>
            <div className='progress-status-bar'></div>
            <div className='progress-status-bar'></div>
            <div className='progress-status-bar'></div>
          </div>
        </div>

        <div className='f-column'>
          <label htmlFor=''>Nome completo:</label>
          <input placeholder='Insira seu nome...' onChange={handleInputChange} value={form.nome} name='nome' />
        </div>

        <div className='f-row g-16'>
          <div className='f-column flex-03'>
            <label htmlFor=''>Data de nascimento:</label>
            <input placeholder='Insira seu nome...' type='date' onChange={handleDataNascimentoChange} value={form.dataNascimento} name='dataNascimento' />
          </div>
          <div className='f-column'>
            <label htmlFor=''>CPF:</label>
            <InputMask mask='999.999.999-99' placeholder='Insira seu CPF' value={form.cpf} name='cpf' onChange={handleInputChange} />
          </div>
        </div>

        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>Telefone:</label>
            <InputMask mask='(99) 99999-9999' placeholder='Insira seu telefone' onChange={handleInputChange} value={form.telefone} name='telefone' />
          </div>
        </div>

        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>Estado civil:</label>
            <select name='estadoCivil' id='' onChange={handleInputChange}>
              <option>Selecione o estado civil</option>
              <option value={1} selected={form.estadoCivil === 1}>
                Solteiro
              </option>
              <option value={2} selected={form.estadoCivil === 2}>
                Casado
              </option>
            </select>
          </div>
        </div>

        <div className='f-row g-16'>
          <div className='f-column g-8'>
            <label htmlFor=''>Sexo:</label>

            <div className='f-row g-16'>
              <div className='f-row g-16'>
                <div className='f-row g-4 f-align-center'>
                  <input type='radio' name='genero' id='' value={0} checked={form.genero == 0} onChange={handleInputChange} />
                  <label htmlFor=''>Masculino</label>
                </div>
              </div>
              <div className='f-row g-16'>
                <div className='f-row g-4 f-align-center'>
                  <input type='radio' name='genero' id='' value={1} checked={form.genero == 1} onChange={handleInputChange} />
                  <label htmlFor=''>Feminino</label>
                </div>
              </div>
              <div className='f-row g-16'>
                <div className='f-row g-4 f-align-center'>
                  <input type='radio' name='genero' id='' value={2} checked={form.genero == 2} onChange={handleInputChange} />
                  <label htmlFor=''>Outros</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TitleWDivider title='Endereço' />

        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>CEP:</label>
            <InputMask mask='99999-999' value={form.endereco.cep} placeholder='Insira seu CEP...' type='text' onChange={handleEnderecoChange} onBlur={getCEP} name='cep' />
          </div>

          <div className='f-column'>
            <label htmlFor=''>Estado:</label>
            <select name='estado' id='' onChange={handleEnderecoChange} value={form.endereco.estado}>
              <option value=''>Selecione o estado</option>
              {estados &&
                estados.map(estado => (
                  <option value={estado.sigla} key={estado.id} selected={estados.id === estado.id}>
                    {estado.nome}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className='f-column'>
          <label htmlFor=''>Endereço:</label>
          <input placeholder='Insira seu endereço...' onChange={handleEnderecoChange} value={form.endereco.endereco} name='endereco' />
        </div>

        <div className='f-column'>
          <label htmlFor=''>Cidade:</label>
          <input placeholder='Insira sua cidade...' onChange={handleEnderecoChange} value={form.endereco.cidade} name='cidade' />
        </div>

        <div className='f-column'>
          <label htmlFor=''>Logradouro:</label>
          <input placeholder='Insira seu logradouro...' onChange={handleEnderecoChange} value={form.endereco.logradouro} name='logradouro' />
        </div>

        <ButtonGroup onClickBack='' onClickNext={handleSubmit} />
      </div>
    </>
  );
}

export default FormInfoPessoais;
