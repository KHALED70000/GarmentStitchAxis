import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../../HooKs/useAuth';
import { TfiWrite } from "react-icons/tfi";
import Swal from 'sweetalert2';

const ViewDetails = () => {
  const [openForm, setOpenForm] = useState(false);
  const [orderPrice, setOrderPrice] = useState();
  const [alokChitro, srtAlokChitro] = useState();
  const { id } = useParams(); // ✅ correct
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // const [paymentSystemCheck, setPaymentSystemCheck] = useState();


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
  const hnadleClickImage = (photo) => {
    srtAlokChitro(photo)
  }


  const handleOpenBannerForm = () => {
    setOpenForm(true)
  }

  const handleBookNow = (data) => {
    data.Order_Price = orderPrice;
    data.Product_id = product._id;

    axiosSecure.post('/order', data)
      .then(res => {
        if (res.data.insertedId) {
          reset()
          setOpenForm(false);
          setOrderPrice('')
          Swal.fire({
            title: 'Successfully Submited..!',
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
            },
            buttonsStyling: false
          });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const multiply = (price, b) => {
    if (typeof (price) !== 'number' && typeof (b) === 'number') {
      return price * b;
    } else {
      return 0;
    }
  };

  const OrderQuantityObserve = (price) => {
    const OBprice = multiply(price, product.Price);
    setOrderPrice(OBprice);
  };


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
              product.photos.map((photo, index) => <div key={index} onClick={() => hnadleClickImage(photo)} className="w-20 h-20 cursor-pointer">
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
            <strong>Price:</strong> ${product.Price} / Pice
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
            <p className="leading-relaxed text-gray-400 italic">
              {product.productDecriiption}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button onClick={handleOpenBannerForm} className="btn-donate">
              Book Now
            </button>
          </div>

        </div>
      </div>



      {/* boking form */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"

          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl "
            >
              <div className='flex flex-col gap-3 items-center mb-4'>
                <h1 className='text-xl font-bold text-center text-gray-400'>Booking form.</h1>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit(handleBookNow)} className='flex flex-col w-full gap-5'>
                <div className='flex gap-3'>
                  <label className='text-white'>
                    Product Name: <br />
                    <input
                      defaultValue={product?.ProductName} readOnly
                      {...register("ProductName")}
                      className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' />

                  </label>
                  <label className='text-white'>
                    Your Email: <br />
                    <input
                      defaultValue={user?.email} readOnly
                      {...register("BuyerEmail")}
                      className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' />

                  </label>
                </div>
                <label className='text-white'>
                  $ Price/pice: <br />
                  <input
                    defaultValue={product.Price} readOnly
                    {...register("Product_pice")}
                    className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' />
                </label>

                <div className='flex gap-3 max-[500px]:flex-wrap'>
                  <label className='text-white max-[500px]:w-full'>
                    First name: <br />
                    <input
                      {...register("FirstName", {
                        required: "First name is Required...!"
                      })}
                      className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='First name . . .' />
                    {errors.FirstName && (
                      <p className="text-red-500 font-bold mt-1">{errors.FirstName.message}</p>
                    )}
                  </label>
                  {/* asdfasdf */}
                  <label className='text-white max-[500px]:w-full'>
                    Last name: <br />
                    <input
                      {...register("LastName", {
                        required: "Last name is Required...!"
                      })}
                      className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='Last name . . .' />
                    {errors.LastName && (
                      <p className="text-red-500 font-bold mt-1">{errors.LastName.message}</p>
                    )}
                  </label>
                </div>

                {/* Quantity related */}
                <div className='flex gap-3 max-[500px]:flex-wrap'>
                  <label className='text-white w-full'>
                    Order quantity: <br />
                    <input
                      {...register("Order_Quantity", {
                        required: "First name is Required...!",
                        onChange: (e) => OrderQuantityObserve(e.target.value),
                        valueAsNumber: true,
                        min: {
                          value: product.MOQ,
                          message: `Buy at least ${product.MOQ} pice...!`,
                        },
                        max: {
                          value: product.AOQ,
                          message: `Can"t buy more then ${product.AOQ} pice...!`,
                        }
                      })}
                      className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="number" placeholder='123. . .' />
                    {errors.Order_Quantity && (
                      <p className="text-red-500 font-bold mt-1">{errors.Order_Quantity.message}</p>
                    )}
                  </label>
                  {/* asdfasdf */}
                  <label className='text-white w-full'>
                    Order price: <br />
                    <p className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0'>
                      {orderPrice ? orderPrice : <span className='italic text-gray-400'>123 . . .</span>}
                    </p>
                  </label>
                </div>
                {/* contact info, delivery address and Additional description: */}
                <label className='text-white'>
                  Your Contact Number: <br />
                  <input
                    {...register("Buyer_Phone", {
                      required: "Phone numder is Required...!"
                    })}
                    className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type='number' placeholder='Phone 123 . . .' />
                  {errors.Buyer_Phone && (
                    <p className="text-red-500 font-bold mt-1">{errors.Buyer_Phone.message}</p>
                  )}
                </label>

                <div className='flex gap-3'>
                  <label className='text-white w-full'>
                    Your Address: <br />
                    <textarea

                      {...register("Buyer_Address", {
                        required: "Address is Required...!"
                      })}
                      className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' placeholder='Your address . . .'></textarea>
                    {errors.Buyer_Address && (
                      <p className="text-red-500 font-bold mt-1">{errors.Buyer_Address.message}</p>
                    )}
                  </label>

                  <label className='text-white w-full'>
                    Additional information: <br />
                    <textarea

                      {...register("Additional_Info")}
                      className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' placeholder='Instruction . . .'></textarea>
                  </label>
                </div>


                <button className='btn btn-success text-black' type='submit'>Submit</button>

              </form>
              {/* form end */}


              <div className={`flex flex-col gap-4 mt-6`}>
                <button
                  onClick={() => setOpenForm(false)}
                  className="btn btn-warning bg-transparent  border-2 rounded-[7px]  hover:opacity-80"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* boking form end */}


    </div>
  );
};

export default ViewDetails;
