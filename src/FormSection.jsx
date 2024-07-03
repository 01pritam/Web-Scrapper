import React, { useState } from 'react';
import axios from 'axios';

const FormSection = ({ setProduct }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:3000/scrape', { url });
      setProduct(response.data.product);
    } catch (error) {
      console.error('An error occurred while fetching the product data:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="w-full bg-red-300 shadow-md rounded-lg overflow-hidden p-6">
        <h1 className="text-xxl font-semibold mb-4">ALL NECCESSARY INFO ABOUT YOUR PRODUCT IS HERE:</h1>
        <h2 className="text-xl font-semibold mb-4">Enter Product URL</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700">URL:</label>
            <input
              type="text"
              id="url"
              name="url"
              required
              placeholder="https://www.example.com/product"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            disabled={loading} 
          >
            {loading ? 'Loading...' : 'Scrape'}
          </button>
        </form>
        {loading && <p className="mt-4 text-gray-500">Fetching product details...</p>}
      </section>
    </div>
  );
};

export default FormSection;