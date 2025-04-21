import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import FormSection from './FormSection';
import ProductDetails from './ProductDetails';
import PriceComparison from './PriceComparison';
import About from './About';

const App = () => {
  const [product, setProduct] = useState(null);
  const [scraped, setScraped] = useState(false); 

  const handleScrape = (data) => {
    setProduct(data);
    setScraped(true); 
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center transition-all duration-500">
            <div className="container mx-auto px-4 py-8">
              <p className="text-2xl font-semibold text-gray-600 mt-10 text-center">WELCOME</p>
              <p className="text-2xl font-semibold text-gray-600 mt-10 text-center">Enjoy Your Smart Shopping Experience Here -</p>

              <div className={`flex flex-wrap items-start justify-center  transition-all duration-500 ${scraped ? 'md:justify-start' : 'md:justify-center'}`}>
                <div className={`transition-all duration-500 ${scraped ? 'w-full md:w-1/3' : 'w-full md:w-1/2'} px-4`}>
                  <FormSection setProduct={handleScrape} />
                </div>

                <div className={`transition-all duration-500 ease-in-out ${scraped ? 'opacity-100 translate-x-0 w-full md:w-2/3 px-4' : 'opacity-0 -translate-x-10 h-0 overflow-hidden'} transform`}>
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
