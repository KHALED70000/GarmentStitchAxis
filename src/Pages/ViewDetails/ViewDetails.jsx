import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ViewDetails = () => {
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      {/* Main Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Image Section */}
        <div className="w-full">
          <img
            src={product.productImgURL}
            alt={product.ProductName}
            className="w-full h-auto rounded-lg object-cover"
          />
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
            <button className="px-6 py-2 border rounded-md">
              Add to Cart
            </button>
            <button className="px-6 py-2 border rounded-md">
              Order Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
