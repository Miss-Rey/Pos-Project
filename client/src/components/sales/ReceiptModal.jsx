import React from 'react';
import Modal from '../common/Modal';

const ReceiptModal = ({ isOpen, onClose, sale }) => {
  if (!sale) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receipt">
      <div className="space-y-2 text-sm">
        <p><strong>Date:</strong> {sale.date}</p>
        <p><strong>Customer:</strong> {sale.customer}</p>
        <p><strong>Items:</strong></p>
        <ul className="list-disc list-inside">
          {sale.items.map((item, i) => (
            <li key={i}>{item.name} x{item.quantity} - ${item.price}</li>
          ))}
        </ul>
        <p><strong>Total:</strong> ${sale.amount}</p>
        <p><strong>Payment Method:</strong> {sale.paymentMethod}</p>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
