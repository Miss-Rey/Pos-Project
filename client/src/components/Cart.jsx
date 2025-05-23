// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleSale = async () => {
    const sale = {
      items: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      await API.post('/sales', sale);
      alert('Sale successful!');
      clearCart();
    } catch (err) {
      alert('Error submitting sale');
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Cart</h2>
      {cart.map(item => (
        <div key={item._id} className="flex justify-between items-center mb-2">
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={e => updateQuantity(item._id, parseInt(e.target.value))}
            className="w-16 mx-2"
          />
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 font-bold">
        Total: KES {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
      </div>
      <button
        onClick={handleSale}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Complete Sale
      </button>
    </div>
  );
};

export default Cart;
