import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';

const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantitySold, setQuantitySold] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'items');
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchProducts();
  }, []);

  const handleSale = async () => {
    if (!selectedProductId || !quantitySold) {
      alert('Please select a product and enter the quantity sold.');
      return;
    }

    const productRef = doc(db, 'items', selectedProductId);
    const product = products.find(product => product.id === selectedProductId);
    const newQuantity = product.quantity - parseInt(quantitySold, 10);
    const amountSold = parseInt(quantitySold, 10);
    const valueGained = amountSold * product.sellingPrice;

    await updateDoc(productRef, {
      quantity: newQuantity,
      amountSold: product.amountSold + amountSold,
      valueGained: product.valueGained + valueGained
    });

    setQuantitySold('');
    const productsCollection = collection(db, 'items');
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Sales Page</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Product</label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Quantity: {product.quantity})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity Sold</label>
          <input
            type="number"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleSale}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirm Sale
        </button>
      </div>
    </div>
  );
};

export default SalesPage;
