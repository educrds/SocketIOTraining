import patientReducer, { patientByIDReducer } from './patients/patientReducer';

const rootReducer = {
  patient: patientReducer,
  patientByID: patientByIDReducer,
};

export default rootReducer;
