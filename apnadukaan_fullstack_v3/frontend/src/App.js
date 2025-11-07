import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import AuthService from './services/authService';
import Login from './components/Login';
import Signup from './components/SignUp';
import SellerPortal from './components/SellerPortal';
import CustomerPortal from './components/CustomerPortal';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import './styles.css';

const LogoutLink = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };
  return <button className="btn" onClick={handleLogout}>Logout</button>;
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  return (
    <Router>
      <div className="container">
        <header className="navbar">
          <Link to="/" className="brand">ApnaDukaan</Link>
          <nav className="nav-links">
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/products">Products</Link>
            {currentUser && currentUser.role === 'SELLER' && <Link className="link" to="/add-product">Add Product</Link>}
            {currentUser ? (
              <>
                <span className="small">Hi, {currentUser.name}</span>
                <LogoutLink />
              </>
            ) : (
              <>
                <Link to="/login"><button className="btn">Login</button></Link>
                <Link to="/signup"><button className="btn">Sign up</button></Link>
              </>
            )}
          </nav>
        </header>

        <section className="header-hero">
          <div className="hero-left">
            <h1>Local shops, curated for you</h1>
            <p className="small">Browse handcrafted goods and support local sellers. Fast demo store for learning and testing.</p>
          </div>
          <div className="hero-right">
            <img src="https://via.placeholder.com/480x320?text=ApnaDukaan" alt="hero"/>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/seller-portal" element={<SellerPortal />} />
          <Route path="/customer-portal" element={<CustomerPortal />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>

        <footer className="footer">Made with ❤️ — ApnaDukaan demo • <span className="small">Light modern theme</span></footer>
      </div>
    </Router>
  );
};

export default App;
