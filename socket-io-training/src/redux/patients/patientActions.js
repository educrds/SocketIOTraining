import { UPDATE_PATIENT } from './patientTypes';

export const updatePatient = data => {
  return {
    type: UPDATE_PATIENT,
    payload: data,
  };
};
