import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/header';
import Login from './pages/login'
import Register from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import NewTicket from './pages/NewTicket'

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

              <Route path='/new-ticket' element={<PrivateRoute />}>
                <Route path='/new-ticket' element={<NewTicket />} />
              </Route>

      
            </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
