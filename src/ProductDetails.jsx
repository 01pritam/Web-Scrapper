import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ product }) => {
  const [youtubeVideo, setYoutubeVideo] = useState(null);

  useEffect(() => {
    if (product) {
      searchYouTubeVideo(product.title);
    }
  }, [product]);

  const searchYouTubeVideo = async (query) => {
    try {
      const response = await axios.get('http://localhost:3000/search-youtube', {
        params: { q: `${query} review` },
      });
      setYoutubeVideo(response.data);
    } catch (error) {
      console.error('Error searching YouTube video:', error);
    }
  };

  const downloadCSV = () => {
    if (!product) return;

    const headers = Object.keys(product).join(",") + "\n";
    const values = Object.values(product)
      .map((value) => {
        if (Array.isArray(value)) return `"${value.join('; ')}"`;
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",");
    const csv = headers + values;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'product_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg overflow-hidden flex">
        <div className="px-4 py-2 ">
          <div><h2 className="text-lg font-semibold text-gray-800 mb-2 ">{product.title}</h2></div>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-40 object-contain object-center"
              style={{ maxHeight: '160px' }}
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">Product Image</div>
          )}
          <div className="mt-2">
            <p className="text-gray-700"><strong>Price:</strong> {product.price}</p>
            <p className="text-gray-700"><strong>Rating:</strong> {product.rating}</p>
            <p className="text-gray-700"><strong>Reviews:</strong> {product.numberOfReviews}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-md font-semibold text-gray-800">Features:</h3>
            <ul className="mt-1 text-sm text-gray-700">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* ✅ Download CSV Button */}
          <div className="mt-4">
            <button
              onClick={downloadCSV}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Download CSV File
            </button>
          </div>
        </div>
      </div>

      <div className='flex px-7'>
        {youtubeVideo && (
          <div className="w-1/2 px-4 py-2">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Review Video:</h3>
            <div className="embed-responsive">
              <iframe
                width="400"
                height="215"
                src={`https://www.youtube.com/embed/${youtubeVideo.id.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
