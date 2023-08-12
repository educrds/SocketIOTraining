import './index.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function Form() {
  const [form, setForm] = useState({});
  const [messageReceived, setMessageReceived] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(form);
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
        {messageReceived.nome}
        <div className='f-title'>
          Informação pessoal
          <div className='divider'></div>
        </div>
        <div className='f-column'>
          <label htmlFor=''>Nome completo:</label>
          <input placeholder='Insira seu nome...' onChange={handleInputChange} value={form.nome} name='nome' />
        </div>
        <div className='f-row g-16'>
          <div className='f-column flex-03'>
            <label htmlFor=''>Data de nascimento:</label>
            <input placeholder='Insira seu nome...' type='date' onChange={handleInputChange} value={form.dataNascimento} name='dataNascimento' />
          </div>

          <div className='f-column'>
            <label htmlFor=''>CPF:</label>
            <input placeholder='Insira seu CPF' value={form.cpf} name='cpf' />
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
        {/* <div className='f-title'>
          Endereço
          <div className='divider'></div>
        </div>
        <div className='f-row g-16'>
          <div className='f-column'>
            <label htmlFor=''>CEP:</label>
            <input value={form.endereco} placeholder='Insira seu CEP...' type='text' onChange={handleInputChange} name='cep' />
          </div>
          <div className='f-column'>
            <label htmlFor=''>Estado:</label>
            <select name='' id='' onChange={handleInputChange}>
              <option value={form.endereco}>Selecione o estado</option>
            </select>
          </div>
        </div>
        <div className='f-column'>
          <label htmlFor=''>Endereço:</label>
          <input placeholder='Insira seu endereço...' onChange={handleInputChange} value={form.endereco} name='endereco'/>
        </div> */}

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

export default Form;
