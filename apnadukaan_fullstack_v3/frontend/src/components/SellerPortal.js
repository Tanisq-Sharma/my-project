import React from 'react';
import AuthService from '../services/authService';
const SellerPortal = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div style={{marginTop:12}}>
      <h3>Seller Portal</h3>
      <p>Welcome, {currentUser?.name}. Use <strong>Add Product</strong> to list items.</p>
    </div>
  );
};
export default SellerPortal;
