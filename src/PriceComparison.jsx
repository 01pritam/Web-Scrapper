import React, { useState } from 'react';
import axios from 'axios';

const ProductComparison = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [response1, response2] = await Promise.all([
        axios.post('http://localhost:3000/scrape', { url: url1 }),
        axios.post('http://localhost:3000/scrape', { url: url2 })
      ]);
      setProduct1(response1.data.product);
      setProduct2(response2.data.product);
    } catch (error) {
      console.error('An error occurred while fetching the product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceClass = (price1, price2) => {
    const priceValue1 = parseFloat(price1.replace(/[^\d.-]/g, ''));
    const priceValue2 = parseFloat(price2.replace(/[^\d.-]/g, ''));
    if (priceValue1 < priceValue2) return 'bg-green-100 border-green-500';
    if (priceValue1 > priceValue2) return 'bg-red-100 border-red-500';
    return 'bg-gray-100 border-gray-300';
  };

  const getBestFeatureClass = (feature1, feature2) => {
    if (feature1 > feature2) return 'bg-green-100 border-green-500';
    if (feature1 < feature2) return 'bg-red-100 border-red-500';
    return 'bg-gray-100 border-gray-300';
  };

  const renderComparison = () => {
    if (!product1 || !product2) return null;

    const numberOfReviews1 = parseInt(product1.numberOfReviews.replace(/[^0-9]/g, '')) || 0;
    const numberOfReviews2 = parseInt(product2.numberOfReviews.replace(/[^0-9]/g, '')) || 0;

    return (
      
      <div className=" flex flex-col items-center justify-center w-full">
        <div className="flex flex-wrap justify-around w-full mb-8">
          {[product1, product2].map((product, index) => (
            <div key={index} className="w-full md:w-1/2 bg-white shadow-md rounded-lg overflow-hidden m-4 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{product.title}</h2>
              <div className="flex justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-contain object-center"
                  style={{ maxHeight: '160px' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full  bg-white shadow-md rounded-lg overflow-hidden m-4 p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="font-bold"></div>
            <div className="font-bold">Product 1</div>
            <div className="font-bold">Product 2</div>
            <div className="font-bold">Price</div>
            <div className={`p-2 border rounded ${getPriceClass(product1.price, product2.price)}`}>
              {product1.price}
            </div>
            <div className={`p-2 border rounded ${getPriceClass(product2.price, product1.price)}`}>
              {product2.price}
            </div>
            <div className="font-bold">Rating</div>
            <div className={`p-2 border rounded ${getBestFeatureClass(product1.rating, product2.rating)}`}>
              {product1.rating}
            </div>
            <div className={`p-2 border rounded ${getBestFeatureClass(product2.rating, product1.rating)}`}>
              {product2.rating}
            </div>
            <div className="font-bold">Reviews</div>
            <div className={`p-2 border rounded ${getBestFeatureClass(numberOfReviews1, numberOfReviews2)}`}>
              {product1.numberOfReviews}
            </div>
            <div className={`p-2 border rounded ${getBestFeatureClass(numberOfReviews2, numberOfReviews1)}`}>
              {product2.numberOfReviews}
            </div>
            <div className="font-bold">Features</div>
            <div className={`p-2 border rounded ${getBestFeatureClass(product1.features.length, product2.features.length)}`}>
              {product1.features.length} Features
            </div>
            <div className={`p-2 border rounded ${getBestFeatureClass(product2.features.length, product1.features.length)}`}>
              {product2.features.length} Features
            </div>
          </div>
        </div>
      </div>
      
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <section className="w-full md:w-3/4 bg-white shadow-md rounded-lg overflow-hidden p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Enter Product URLs for Comparison</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url1" className="block text-gray-700">URL 1:</label>
            <input
              type="text"
              id="url1"
              name="url1"
              required
              placeholder="https://www.example.com/product1"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url2" className="block text-gray-700">URL 2:</label>
            <input
              type="text"
              id="url2"
              name="url2"
              required
              placeholder="https://www.example.com/product2"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Compare'}
          </button>
        </form>
        {loading && <p className="mt-4 text-gray-500">Fetching product details...</p>}
      </section>
      {renderComparison()}
    </div>
  );
};

export default ProductComparison;