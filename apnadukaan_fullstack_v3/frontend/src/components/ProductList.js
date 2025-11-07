import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(()=>{ fetchProducts() },[]);
  const fetchProducts = async ()=> {
    try{
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    }catch(err){ console.error(err) }
  };
  return (
    <div>
      <h3 style={{marginTop:6}}>Products</h3>
      <div className="card-grid">
        {products.map(p=>(
          <div className="card" key={p.id}>
            <img src={p.image || 'https://via.placeholder.com/400x300?text=Product'} alt={p.name}/>
            <h4>{p.name}</h4>
            <div className="price">₹{p.price}</div>
            <p className="short">{p.shortDesc}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
              <Link to={'/products/'+p.id}><button className="btn" style={{padding:'8px 10px'}}>View</button></Link>
              <span className="small">Seller: {p.sellerId ? p.sellerId.substring(0,6) : 'Local'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
