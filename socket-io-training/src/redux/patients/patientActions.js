import { UPDATE_PATIENT } from './patientTypes';
import { GET_PATIENT } from './patientTypes';

export const updatePatient = data => {
  return {
    type: UPDATE_PATIENT,
    payload: data,
  };
};

export const getPatient = data => {
  return {
    type: GET_PATIENT,
    payload: data,
  };
};
