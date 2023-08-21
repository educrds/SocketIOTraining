import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormInfoPessoais from './pages/form-info-pessoais.jsx';
import Fila from './pages/fila.jsx';
import FormInfoMedicas from './pages/form-info-medicas.jsx';
import FormTermoAceite from './pages/form-termo.jsx';
import FormSenha from './pages/senha.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/info-pessoais' element={<FormInfoPessoais />}></Route>
        <Route path='/info-medicas' element={<FormInfoMedicas />}></Route>
        <Route path='/termo-aceite' element={<FormTermoAceite />}></Route>
        <Route path='/senha' element={<FormSenha />}></Route>

        <Route path='/fila' element={<Fila />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
