import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Appbar';
import CartItems from './cartitems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navbar />} />
        <Route path="/cartitems" element={<CartItems />} />
      </Routes>
    </Router>
  );
}

export default App;
