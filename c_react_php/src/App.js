import CertificateForm from './components/certificateform';
import Login from './components/login';
import Signup from './components/signup';
import View_cate from './components/view_cate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Categories from './components/categories';
import Home from './components/home';
import Logout from './components/logout';
import View_carti from './components/view_certi';
import Edit_cate from './components/edit_cate';
import Edit_certi from './components/edit_carti';
import User_view_pdf from './components/certi/user/user_view_pdf';
import User_header from './components/certi/user/user_header';
import User_login from './components/certi/user/user_login';
import User_signup from './components/certi/user/user_signup';
import User_logout from './components/certi/user/user_logout';
import View_certificate from './components/view_certificate';
import Jspdf from './components/jspdf';
function App() {
  return (
    <>
      <Router>
        <Routes>
          
          <Route path='/' element={<Header />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/carti_form' element={<CertificateForm />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/view_certi' element={<View_carti />} />
          <Route path='/view_categories' element={<View_cate />} />
          <Route path='/view_data/:no' element={<Jspdf />} />
          <Route path='/Edit_cate/:id' element={<Edit_cate />} />
          <Route path='/Edit_certi/:no' element={<Edit_certi />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/footer' element={<Footer />} />
        </Routes>
        <Routes>
          <Route path='/user_header' element={<User_header />} />
          <Route path='/user_login' element={<User_login />} />
          <Route path='/user_signup' element={<User_signup/>} />
          <Route path='/User_logout' element={<User_logout/>} />

          <Route path='/userviewpdf' element={<User_view_pdf />} />
          {/* <Route path='/user_logout' element={<User_view_pdf />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
