import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import LoginForm from './pages/user/LoginForm';


//css 전체공통적용
import './css/mysite.css'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/user/loginform' element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
