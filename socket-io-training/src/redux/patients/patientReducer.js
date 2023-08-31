import { UPDATE_PATIENT } from './patientTypes';
import { GET_PATIENT } from './patientTypes';

const initialState = {};

// REDUCER PATIENT
const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PATIENT:
      return {
        ...state.patient,
        ...action.payload,
      };
    default:
      return state;
  }
};

// GET PATIENT BY ID
export const patientByIDReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENT:
      return {
        ...state.patientByID,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default patientReducer;
