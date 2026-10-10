import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from './components/Auth';
import ConsumerDashboard from './components/ConsumerDashboard'; 
import FarmerDashboard from './components/FarmerDashboard'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* முதல் பக்கமாக Auth (லாகின் & ரெஜிஸ்டர்) பக்கம் வரும் */}
        <Route path="/" element={<Auth />} />
        
        {/* வாடிக்கையாளர் முகப்புப் பக்கம் */}
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        
        {/* விவசாயி முகப்புப் பக்கம் */}
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;