// src/components/InventoryList.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

const InventoryList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get('/inventory')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product._id} className="p-4 border rounded shadow">
          <h3 className="font-bold">{product.name}</h3>
          <p>KES {product.price}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;
