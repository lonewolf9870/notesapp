import React, { useEffect, useState } from "react";
import axios from "axios";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from "./pages/Home";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* Register page */}
        <Route path="/register" element={<Register />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>  
  );
}

export default App;