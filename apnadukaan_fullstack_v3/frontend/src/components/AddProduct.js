import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const AddProduct = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  if(!user || user.role !== 'SELLER') return <div className="form-container"><h3>Only sellers can add products</h3></div>;

  const handleSubmit = async (e)=> {
    e.preventDefault();
    const form = e.target;
    const product = {
      name: form.name.value,
      price: Number(form.price.value),
      shortDesc: form.shortDesc.value,
      longDesc: form.longDesc.value,
      image: form.image.value
    };
    try{
      await axios.post('http://localhost:8080/api/products', product, { headers: { Authorization: 'Bearer '+user.token }});
      alert('Product added');
      navigate('/products');
    }catch(err){ alert('Error adding product') }
  };

  return (
    <div className="form-container">
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <label>Product name</label>
        <input name="name" className="input" required/>
        <label>Price (INR)</label>
        <input name="price" type="number" className="input" required/>
        <label>Short description</label>
        <input name="shortDesc" className="input" required/>
        <label>Long description</label>
        <textarea name="longDesc" rows="4" className="input" required/>
        <label>Image URL (optional)</label>
        <input name="image" className="input" placeholder="https://..."/>
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
