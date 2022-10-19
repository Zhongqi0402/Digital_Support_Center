import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/header';
import Login from './pages/login'
import Register from './pages/register';

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <div className='container'>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;
