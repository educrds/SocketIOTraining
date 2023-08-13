import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormInfoPessoais from './form-info-pessoais.jsx';
import Fila from './fila.jsx';
import FormInfoMedicas from './form-info-medicas.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/info-pessoais' element={<FormInfoPessoais />}></Route>
      <Route path='/info-medicas' element={<FormInfoMedicas />}></Route>
      <Route path='/fila' element={<Fila />}></Route>
    </Routes>
  </BrowserRouter>
);
