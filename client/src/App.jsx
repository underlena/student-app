import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Account from './pages/Account';
import Resumes from './pages/Resumes';
import Login from './pages/Login';
import NotFound from './pages/NotFound';


export default function App() {

  const [AccountData, setAccountData] = useState(null)

  const checkIsLogin = async () => {
    const token_login = localStorage.getItem('token_login')

    if(token_login) {
      const res = await fetch(`http://localhost:5000/api/check_login?token_login=${token_login}`)
      
      const data = await res.json()

      console.log(data)

      if(data.status == 'ok') {
        setAccountData(data.user)
      }
      else {
        logout()
      }
    }
    
  }

  const logout  = () => {

    console.log('logout')

    localStorage.removeItem('token_login')
    window.location.assign('/login')
  }

  useEffect(() => {
    checkIsLogin()
  }, [])


  return (
    <BrowserRouter className="app">
      <Navbar data={AccountData} logout={logout} />

      <div className="content container py-3">

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/resumes" element={<Resumes />} />

        <Route path="/account" element={<Account data={AccountData} logout={logout} />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="*" element={<NotFound />} />

      </Routes>

      </div>

      <Footer />
    </BrowserRouter>
  );
}