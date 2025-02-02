import './App.css';
import { Routes, Route } from 'react-router-dom'
import CustomerPage from './pages/customer/CustomerPage'
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';

const API_URL = process.env.NODE_ENV === 'production' 
? window.API_URL 
: process.env.REACT_APP_API_URL;


function App() {
  return (
    <Routes >
      <Route exact path='/' element={<CustomerPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<SignUpPage />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />

    </Routes>
  );
}

export default App;
