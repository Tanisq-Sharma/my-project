import React from 'react';
import AuthService from '../services/authService';
const CustomerPortal = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div style={{marginTop:12}}>
      <h3>Customer Dashboard</h3>
      <p>Welcome back, {currentUser?.name}. Browse products from the Products tab.</p>
    </div>
  );
};
export default CustomerPortal;
