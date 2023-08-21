import { UPDATE_PATIENT } from './patientTypes';

const initialState = {};

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
