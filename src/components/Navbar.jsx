import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className='text-3xl tracking-widest font-semibold text-white'>STOCK IT</Link>
        <div className="flex space-x-4">
          <Link to="/home" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/stock" className="text-white hover:text-gray-400">Estoque</Link>
          <Link to="/sales" className="text-white hover:text-gray-400">Vendas</Link>
          <Link to="/tracking" className="text-white hover:text-gray-400">Financeiro</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
