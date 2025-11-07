import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=>{ fetchProduct() },[]);
  const fetchProduct = async ()=>{
    try{
      const res = await axios.get('http://localhost:8080/api/products/'+id);
      setP(res.data);
    }catch(err){ console.error(err) }
  };
  if(!p) return <div>Loading...</div>;
  return (
    <div style={{marginTop:12}}>
      <div className="card" style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <img src={p.image || 'https://via.placeholder.com/400x300?text=Product'} style={{width:360}} alt={p.name}/>
        <div>
          <h2>{p.name}</h2>
          <div className="price">₹{p.price}</div>
          <p className="short">{p.longDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
