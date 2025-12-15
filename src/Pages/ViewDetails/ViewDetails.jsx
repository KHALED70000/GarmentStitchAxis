import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ViewDetails = () => {
  const [alokChitro, srtAlokChitro] = useState()
  const { id } = useParams(); // ✅ correct
  const axiosSecure = useAxiosSecure();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (<div className="flex justify-center items-center h-screen">
      <span className="loading w-18 loading-spinner text-gray-400"></span>
    </div>)
  }
  if (isError) return <p>Error loading product</p>;



  const hnadleClickImage = (photo)=>{
    srtAlokChitro(photo)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Main Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Image Section */}
        <div>
          <div className="w-full h-80">
            <img
              src={alokChitro || product.photos[0]}
              alt={product.ProductName}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div className={`mt-4 flex gap-2 justify-${product.photos.length < 4 ? 'center' : 'between'}`}>
            {
              product.photos.map((photo, index) => <div key={index} onClick={()=> hnadleClickImage(photo)} className="w-20 h-20 cursor-pointer">
                <img
                  src={photo}
                  alt={product.ProductName}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>)
            }

          </div>

        </div>



        {/* Details Section */}
        <div className="flex flex-col gap-4">

          <h1 className="text-2xl md:text-3xl font-bold capitalize">
            {product.ProductName}
          </h1>

          <p className="text-base capitalize">
            <strong>Category:</strong> {product.Category}
          </p>

          <p className="text-base">
            <strong>Price:</strong> ${product.Price}
          </p>

          <div className="flex flex-wrap gap-4">
            <p className="text-base">
              <strong>Available Quantity:</strong> {product.AOQ}
            </p>

            <p className="text-base">
              <strong>Minimum Order:</strong> {product.MOQ}
            </p>
          </div>

          <p className="text-base">
            <strong>Payment Option:</strong> {product.paymentOptions.toUpperCase()}
          </p>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Product Description
            </h2>
            <p className="leading-relaxed">
              {product.productDecriiption}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="btn-donate">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
