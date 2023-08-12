import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './form.jsx';
import Fila from './fila.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form />}></Route>
      <Route path='/fila' element={<Fila />}></Route>
    </Routes>
  </BrowserRouter>
);
