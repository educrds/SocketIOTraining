import './index.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import moment from 'moment';

const socket = io.connect('http://localhost:3001');

function FormInfoPessoais() {
  const [form, setForm] = useState({
    nome: null,
    dataNascimento: null,
    idade: null,
    dataRegistro: new Date(),
    cpf: null,
    telefone: null,
    estadoCivil: null,
    sexo: null,
    endereco: {
      cep: null,
      numero: null,
    },
  });
  const [messageReceived, setMessageReceived] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;

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
    socket.emit('send_message', form);
  };

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data);
    });
  }, [socket]);

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
            <input placeholder='Insira seu CPF' value={form.cpf} name='cpf' onChange={handleInputChange} />
          </div>
        </div>
        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>Telefone:</label>
            <input placeholder='Insira seu telefone' onChange={handleInputChange} value={form.telefone} name='telefone' />
          </div>
        </div>

        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>Estado civil:</label>

            <select name='estadoCivil' id='' onChange={handleInputChange}>
              <option value=''>Selecione o estado civil</option>
              <option value={'1'}>Solteiro</option>
              <option value={'2'}>Casado</option>
            </select>
          </div>
        </div>
        <div className='f-row g-16'>
          <div className='f-column g-8'>
            <label htmlFor=''>Sexo:</label>

            <div className='f-row g-16'>
              <div className='f-row g-16'>
                <div className='f-row g-4 f-align-center'>
                  <input type='radio' name='sexo' id='' value={form.sexo} />
                  <label htmlFor=''>Masculino</label>
                </div>
              </div>
              <div className='f-row g-16'>
                <div className='f-row g-4 f-align-center'>
                  <input type='radio' name='sexo' id='' value={form.sexo} />
                  <label htmlFor=''>Feminino</label>
                </div>
              </div>
              <div className='f-row g-16'>
                <div className='f-row g-4 f-align-center'>
                  <input type='radio' name='sexo' id='' value={form.sexo} />
                  <label htmlFor=''>Outros</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='f-title'>
          Endereço
          <div className='divider'></div>
        </div>
        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>CEP:</label>
            <input value={form.endereco.cep} placeholder='Insira seu CEP...' type='text' onChange={handleEnderecoChange} name='cep' />
          </div>
          <div className='f-column'>
            <label htmlFor=''>Estado:</label>
            <select name='estado' id='' onChange={handleEnderecoChange}>
              <option value={form.endereco.estado}>Selecione o estado</option>
            </select>
          </div>
        </div>
        <div className='f-column'>
          <label htmlFor=''>Endereço:</label>
          <input placeholder='Insira seu endereço...' onChange={handleEnderecoChange} value={form.endereco.endereco} name='endereco' />
        </div>

        <div className='f-row g-8 f-justify-center'>
          <button className='btn-default btn-ghost'>Voltar</button>
          <button className='btn-default btn-primary' onClick={handleSubmit}>
            Próximo<i className='fa-solid fa-arrow-right'></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default FormInfoPessoais;
