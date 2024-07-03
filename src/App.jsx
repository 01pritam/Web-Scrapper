import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import FormSection from './FormSection';
import ProductDetails from './ProductDetails';
import PriceComparison from './PriceComparison';
import About from './About';

const App = () => {
  const [product, setProduct] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 py-8">
          <p className="text-2xl font-semibold text-gray-600 mt-10 text-center">WELCOME</p>
            <p className="text-2xl font-semibold text-gray-600 mt-10 text-center">Enjoy Your Smart Shopping Experience Here -</p>
            <div className="flex flex-wrap items-start justify-center">
              <div className="w-full md:w-1/3 pr-4 mb-8 md:mb-0">
                <FormSection setProduct={setProduct} />
              </div>
              <div className="w-full md:w-2/3 pl-4">
                {product && <ProductDetails product={product} />}
              </div>
            </div>
          </div>
        </div>
        } />
        <Route path="/comparison" element={<PriceComparison />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;