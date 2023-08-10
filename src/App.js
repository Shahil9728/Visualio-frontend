import './App.css';
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Pricing from './Pages/Pricing'
import Contact from './Pages/Contact'
import About from './Pages/About'

function App() {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/pricing" element={<Pricing />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
