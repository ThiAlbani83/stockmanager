import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'items');
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !purchasePrice || !sellingPrice) {
      alert('Please fill in all fields.');
      return;
    }

    const productDoc = selectedProductId ? doc(db, 'items', selectedProductId) : null;
    const productExists = products.find(product => product.name.toLowerCase() === name.toLowerCase());

    if (productExists && !selectedProductId) {
      // Update existing product
      await updateDoc(doc(db, 'items', productExists.id), {
        quantity: productExists.quantity + parseInt(quantity, 10),
        purchasePrice: parseFloat(purchasePrice),
        sellingPrice: parseFloat(sellingPrice)
      });
    } else {
      // Add new product
      if (selectedProductId) {
        await updateDoc(productDoc, {
          name,
          quantity: parseInt(quantity, 10),
          purchasePrice: parseFloat(purchasePrice),
          sellingPrice: parseFloat(sellingPrice)
        });
      } else {
        await addDoc(collection(db, 'items'), {
          name,
          quantity: parseInt(quantity, 10),
          purchasePrice: parseFloat(purchasePrice),
          sellingPrice: parseFloat(sellingPrice),
          amountSold: 0,
          valueGained: 0
        });
      }
    }

    setName('');
    setQuantity('');
    setPurchasePrice('');
    setSellingPrice('');
    setSelectedProductId(null);
    const productsCollection = collection(db, 'items');
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleEdit = (product) => {
    setName(product.name);
    setQuantity(product.quantity.toString());
    setPurchasePrice(product.purchasePrice.toString());
    setSellingPrice(product.sellingPrice.toString());
    setSelectedProductId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Purchase Price</label>
            <input
              type="number"
              step="0.01"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Selling Price</label>
            <input
              type="number"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {selectedProductId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Purchase Price</th>
              <th className="px-4 py-2">Selling Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">${product.purchasePrice.toFixed(2)}</td>
                <td className="border px-4 py-2">${product.sellingPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManagement;
