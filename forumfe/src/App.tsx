import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Navigation/>
      <Footer/>
      <Routes>
        <Route path="/test" element={<div>Test</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
