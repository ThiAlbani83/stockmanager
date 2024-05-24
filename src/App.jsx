import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import StockManagement from './components/StockManagement';
import SalesPage from './components/SalesPage';
import HomePage from './components/HomePage';
import TrackingPage from './components/TrackingPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/home" element={<ProtectedRoute user={user}><HomePage /></ProtectedRoute>} />
        <Route path="/stock" element={<ProtectedRoute user={user}><StockManagement /></ProtectedRoute>} />
        <Route path="/sales" element={<ProtectedRoute user={user}><SalesPage /></ProtectedRoute>} />
        <Route path="/tracking" element={<ProtectedRoute user={user}><TrackingPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
