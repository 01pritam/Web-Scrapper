import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">E-Commerce Scraper</h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Web scraper(E-Commerce). Our goal is to provide users with the product
          information and reviews from various e-commerce platforms. This project leverages web scraping
          techniques to gather data and present it in a user-friendly interface.
        </p>
        
        <p className="text-gray-700 leading-relaxed">
          Thank You. 
        </p>
      </div>
    </div>
  );
}

export default About;