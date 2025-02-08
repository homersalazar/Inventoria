import './App.css';
import { Routes, Route } from 'react-router-dom'
import CustomerPage from './pages/customer/CustomerPage'
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductPage from './pages/admin/ProductPage';
import CategoryPage from './pages/admin/CategoryPage';
import FinancePage from './pages/admin/FinancePage';
import CreateProductPage from './pages/admin/CreateProductPage';
import ViewProductPage from './pages/admin/ViewProductPage';

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

      <Route path='/products' element={<ProductPage />} />
      <Route path='/add-product' element={<CreateProductPage />} />
      <Route path='/product/view/:item_code' element={<ViewProductPage />} />

      <Route path='/categories' element={<CategoryPage />} />
      <Route path='/finances' element={<FinancePage />} />


    </Routes>
  );
}

export default App;
