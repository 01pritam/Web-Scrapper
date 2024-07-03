import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(url);
  };

  return (
    <div className="max-w-lg mx-auto mt-4 sm:mt-8 sm:ml-8 sm:w-1/4 fixed">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter URL to scrape..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Scrape
        </button>
      </form>
    </div>
  );
};

export default SearchBox;