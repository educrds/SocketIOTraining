import { UPDATE_PATIENT } from './patientTypes';

const initialState = {
  nome: null,
  dataNascimento: null,
  idade: null,
  dataRegistro: new Date(),
  cpf: null,
  telefone: null,
  estadoCivil: null,
  genero: null,
  endereco: {
    cep: null,
    numero: null,
  },
};

// REDUCER
const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PATIENT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default patientReducer;
