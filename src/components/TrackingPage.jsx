import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';

const TrackingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'items');
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tracking Page</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity Available</th>
                <th className="px-4 py-2">Purchase Price</th>
                <th className="px-4 py-2">Selling Price</th>
                <th className="px-4 py-2">Total Purchase Value</th>
                <th className="px-4 py-2">Total Selling Value</th>
                <th className="px-4 py-2">Amount Sold</th>
                <th className="px-4 py-2">Value Gained</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.quantity}</td>
                  <td className="border px-4 py-2">${product.purchasePrice.toFixed(2)}</td>
                  <td className="border px-4 py-2">${product.sellingPrice.toFixed(2)}</td>
                  <td className="border px-4 py-2">${(product.quantity * product.purchasePrice).toFixed(2)}</td>
                  <td className="border px-4 py-2">${(product.quantity * product.sellingPrice).toFixed(2)}</td>
                  <td className="border px-4 py-2">{product.amountSold}</td>
                  <td className="border px-4 py-2">${product.valueGained.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
