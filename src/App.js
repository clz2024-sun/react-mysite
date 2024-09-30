import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import LoginForm from './pages/user/LoginForm';
import EditForm from './pages/user/EditForm';

import AttachForm from './pages/attach/Form';
import AttachForm2 from './pages/attach/Form2';
import AttachResult from './pages/attach/Result';


import GuestAddList from './pages/guest/AddList';
import GuestDelForm from './pages/guest/DelForm';

//css 전체공통적용
import './css/mysite.css'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Main />} />

          <Route path='/user/loginform' element={<LoginForm />} />
          <Route path='/user/editform' element={<EditForm />} />

          <Route path='/attach/form' element={<AttachForm />} />
          <Route path='/attach/form2' element={<AttachForm2 />} />
          <Route path='/attach/result' element={<AttachResult />} />

          <Route path='/guest' element={<GuestAddList />} />
          <Route path='/guest/delform/:no' element={<GuestDelForm />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
