// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import useAxiosSecure from '../../../HooKs/useAxiosSecure';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AddProduct = () => {
//     const axiosSecure = useAxiosSecure()
//     const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
//     const aoqValue = watch("AQ");
//     const navigate = useNavigate();

//     const [customLoader, setCistomLoader] = useState(false)


//     const uploadImages = async (images) => {
//         const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

//         const uploadPromises = images.map(image => {
//             const formData = new FormData();
//             formData.append("image", image);

//             return axios.post(imageApiUrl, formData)
//                 .then(res => res.data.data.url);
//         });

//         return Promise.all(uploadPromises);
//     };

//     const handleCreateProduct = async (productData) => {
//         try {
//             setCistomLoader(true);

//             const files = productData.productPhotos; // react-hook-form field
//             const images = Array.from(files);

//             if (images.length > 5) {
//                 return console.log("Maximum 5 images allowed");
//             }

//             const photoURLs = await uploadImages(images);

//             const productInfo = {
//                 ProductName: productData.ProductName,
//                 Price: productData.Price,
//                 AQ: productData.AQ,
//                 MOQ: productData.MOQ,
//                 paymentOptions: productData.paymentOptions,
//                 productDecriiption: productData.productDecriiption,
//                 Category: productData.Category,
//                 photos: photoURLs, // array of image URLs
//             };

//             // console.log(productInfo)

//             await axiosSecure.post('/product', productInfo)
//                 .then(res => {
//                     if (res.data.insertedId) {
//                         setCistomLoader(false)
//                         Swal.fire({
//                             title: "Product created...!",
//                             icon: "success",
//                             showConfirmButton: false,
//                             timer: 2000,
//                             customClass: {
//                                 confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
//                             },
//                             buttonsStyling: false
//                         });
//                         reset();
//                         navigate('/All-Product')
//                     }

//                 })
//                 .catch(err => {
//                      setCistomLoader(false)
//                         Swal.fire({
//                             title: "An error occured...!",
//                             icon: "warning",
//                             showConfirmButton: false,
//                             timer: 2000,
//                             customClass: {
//                                 confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
//                             },
//                             buttonsStyling: false
//                         });
//                     console.log(err)
//                 })

//         } catch (error) {
//             console.error(error);
//         }
//     };





//     return (
//         <div className='relative'>

//             {
//                 customLoader && <div className='bg-transparent h-full w-full absolute'>

//                 <div className='rounded-2xl p-6 w-80 mx-auto mt-60 bg_Loader'>

//                     <div className="loader">
//                         <div className="loading-text">
//                             Creating<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
//                         </div>
//                         <div className="loading-bar-background">
//                             <div className="loading-bar">
//                                 <div className="white-bars-container">
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                     <div className="white-bar"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//             }

//             <h1 className='text-center text-3xl font-bold mb-6 mt-6'>Create A New Product</h1>

//             <div className='max-w-xl mx-auto border-2 py-5 px-4 rounded-2xl'>
//                 <form onSubmit={handleSubmit(handleCreateProduct)} className='flex flex-col w-full gap-5'>

//                     <label className='w-full'>
//                         <span className='font-semibold italic'>Product Name here:</span> <br />
//                         <input
//                             {...register("ProductName", {
//                                 required: "Product name is Required...!"
//                             })}
//                             className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Product name . . .' />
//                         {errors.ProductName && (
//                             <p className="text-red-500 font-bold mt-1">{errors.ProductName.message}</p>
//                         )}
//                     </label>


//                     <div className='flex gap-3 max-[600px]:flex-wrap'>
//                         {/* image upload */}
//                         <label className='w-full'>
//                             <span className='font-semibold italic'>Upload Maximum 5 images:</span> <br />
//                             <input
//                                 type="file" multiple accept="image/*"
//                                 {...register("productPhotos", {
//                                     required: "Please Upload at least 1 Image...!",
//                                     validate: files =>
//                                         files.length <= 5 || "Maximum 5 images allowed"
//                                 })}
//                                 className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' placeholder='Upload Image . . .' />
//                             {errors.productPhotos && (
//                                 <p className="text-red-500 font-bold mt-1">{errors.productPhotos.message}</p>
//                             )}
//                         </label>
//                         {/* Category */}
//                         <label className='w-full'>
//                             <span className='font-semibold italic'>Product Category:</span> <br />
//                             <div className='flex flex-wrap gap-10 mt-1'>

//                                 <div className='w-full pr-2 border-2 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-primary'>
//                                     <select
//                                         {...register("Category", { required: "Please select a Producr Category!" })}
//                                         className="pl-1 py-1 rounded-md w-full outline-0 bg-transparent text-gray-400"
//                                         defaultValue=""
//                                     >
//                                         <option value="" disabled>
//                                             Select Category
//                                         </option>
//                                         <option className='text-gray-400' value="shirt">Shirt</option>
//                                         <option className='text-gray-400' value="pant">Pant</option>
//                                         <option className='text-gray-400' value="jacket">Jacket</option>
//                                         <option className='text-gray-400' value="accessories">Accessories</option>
//                                         <option className='text-gray-400' value="manager">Manager</option>
//                                     </select>
//                                 </div>

//                             </div>
//                             {errors.Category && (
//                                 <p className="text-red-500 font-bold mt-1">{errors.Category.message}</p>
//                             )}
//                         </label>
//                     </div>
//                     {/* role end*/}

//                     <label>
//                         <span className='font-semibold italic'>Product Price Here:</span> <br />
//                         <input
//                             {...register("Price", {
//                                 required: "Prodict price is Required...!",
//                                 valueAsNumber: true,
//                                 min: {
//                                     value: 1,
//                                     message: "Price must be greater than 0$",
//                                 },
//                             })}
//                             className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='Price . . .' />
//                         {errors.Price && (
//                             <p className="text-red-500 font-bold mt-1">{errors.Price.message}</p>
//                         )}

//                     </label>

//                     <div className='flex gap-3 max-[500px]:flex-wrap'>
//                         <label className='w-full'>
//                             <span className='font-semibold italic'>Available Quantity:</span> <br />
//                             <input
//                                 {...register("AQ", {
//                                     required: "Available Quantity is Required...!",
//                                     valueAsNumber: true,
//                                     min: {
//                                         value: 100,
//                                         message: "Available Quantity be at Least 100...!",
//                                     },
//                                 })}
//                                 className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='1234 . . .' />
//                             {errors.AQ && (
//                                 <p className="text-red-500 font-bold mt-1">{errors.AQ.message}</p>
//                             )}

//                         </label>

//                         <label className='w-full'>
//                             <span className='font-semibold italic'>Minimum Quantity Here:</span> <br />
//                             <input
//                                 {...register("MOQ", {
//                                     required: "Minimum Order Quantity is Required...!",
//                                     valueAsNumber: true,
//                                     min: {
//                                         value: 1,
//                                         message: "Minimum Quantity be at Least 1...!",
//                                     }, validate: (value) =>
//                                         !aoqValue || value <= aoqValue || "MOQ cannot be greater than Available Quantity",
//                                 })}
//                                 className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='1234 . . .' />
//                             {errors.MOQ && (
//                                 <p className="text-red-500 font-bold mt-1">{errors.MOQ.message}</p>
//                             )}

//                         </label>
//                     </div>

//                     <label>
//                         <span className='font-semibold italic'>Select your Payment Options :</span> <br />
//                         <div className='flex flex-wrap gap-10 mt-1'>

//                             <div className='w-full pr-2 border-2 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-primary'>
//                                 <select
//                                     {...register("paymentOptions", { required: "Please select a Payment Option!" })}
//                                     className="pl-1 py-1 rounded-md w-full outline-0 bg-transparent text-gray-400"
//                                     defaultValue=""
//                                 >
//                                     <option value="" disabled>
//                                         Payment Options - - -
//                                     </option>
//                                     <option className='text-gray-400' value="cod">COD</option>
//                                     <option className='text-gray-400' value="payFirst">Pay First</option>

//                                 </select>
//                             </div>

//                         </div>
//                         {errors.paymentOptions && (
//                             <p className="text-red-500 font-bold mt-1">{errors.paymentOptions.message}</p>
//                         )}
//                     </label>

//                     <label>
//                         <span className='font-semibold italic'>Write Product Description:</span> <br />
//                         <textarea
//                             {...register("productDecriiption", {
//                                 required: "Product Decriiption is Required...!"
//                             })}
//                             className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Product description . . .' ></textarea>
//                         {errors.productDecriiption && (
//                             <p className="text-red-500 font-bold mt-1">{errors.productDecriiption.message}</p>
//                         )}
//                     </label>

//                     <button className='btn btn-sm btn-donate' type='submit'>Create Product</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddProduct;

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import useAxiosSecure from "../../../HooKs/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
  const aoqValue = watch("AQ");
  const navigate = useNavigate();

  const [customLoader, setCustomLoader] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ---------------- Drag & Drop ----------------
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (selectedFiles.length + acceptedFiles.length > 5) {
        Swal.fire({
          title: "Maximum 5 images allowed!",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false
        });
        return;
      }
      const newFiles = [...selectedFiles, ...acceptedFiles];
      setSelectedFiles(newFiles);
      setValue("productPhotos", newFiles);
    },
    [selectedFiles, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    noClick: true,
    noKeyboard: true
  });

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue("productPhotos", newFiles);
  };

  // ---------------- Upload Images ----------------
  const uploadImages = async (images) => {
    const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
    const uploadedURLs = [];

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("image", images[i]);
      const res = await axios.post(imageApiUrl, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(Math.round((percent + (i * 100)) / images.length));
        }
      });
      uploadedURLs.push(res.data.data.url);
    }
    setUploadProgress(0);
    return uploadedURLs;
  };

  // ---------------- Handle Submit ----------------
  const handleCreateProduct = async (productData) => {
    try {
      setCustomLoader(true);

      const files = productData.productPhotos;
      if (!files || files.length === 0) {
        Swal.fire({ title: "Upload at least 1 image!", icon: "warning" });
        setCustomLoader(false);
        return;
      }

      const photoURLs = await uploadImages(Array.from(files));

      const productInfo = {
        ProductName: productData.ProductName,
        Price: productData.Price,
        AQ: productData.AQ,
        MOQ: productData.MOQ,
        paymentOptions: productData.paymentOptions,
        productDecriiption: productData.productDecriiption,
        Category: productData.Category,
        photos: photoURLs
      };


      const res = await axiosSecure.post("/product", productInfo);
      if (res.data.insertedId) {
        setCustomLoader(false);
        Swal.fire({
          title: "Product created...!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        reset();
        setSelectedFiles([]);
        navigate("/All-Product");
      }

    } catch (error) {
      setCustomLoader(false);
      Swal.fire({
        title: "An error occurred!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
      console.error(error);
    }
  };

  // ---------------- JSX ----------------
  return (
    <div className="relative">
      {customLoader && (
        <div className="bg-transparent h-full w-full absolute flex justify-center items-center">
          <div className="rounded-2xl p-6 w-80 bg_Loader text-center">
            <div className="loader">
              <div className="loading-text">Creating<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>
              <div className="loading-bar-background mt-3 h-2 bg-gray-300 rounded">
                <div className="loading-bar h-2 bg-green-500 rounded" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
            <p className="mt-2 text-sm">{uploadProgress > 0 ? `${uploadProgress}% Uploaded` : "Starting upload..."}</p>
          </div>
        </div>
      )}

      <h1 className="text-center text-3xl font-bold mb-6 mt-6">Create A New Product</h1>

      <div className="max-w-xl mx-auto border-2 py-5 px-4 rounded-2xl">
        <form onSubmit={handleSubmit(handleCreateProduct)} className="flex flex-col w-full gap-5">

          {/* Product Name */}
          <label className="w-full">
            <span className="font-semibold italic">Product Name here:</span> <br />
            <input
              {...register("ProductName", { required: "Product name is Required...!" })}
              className="border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1"
              type="text"
              placeholder="Product name . . ."
            />
            {errors.ProductName && <p className="text-red-500 font-bold mt-1">{errors.ProductName.message}</p>}
          </label>

          {/* Drag & Drop Images */}
          <div>
            <label className="w-full">
              <span className="font-semibold italic">Upload Maximum 5 images:</span>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-md p-4 mt-1 text-center cursor-pointer ${isDragActive ? "border-primary bg-gray-100" : "border-gray-400"}`}
              >
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the images here...</p> : <p>Drag & drop images here, or click to select (max 5)</p>}
              </div>
              {errors.productPhotos && <p className="text-red-500 font-bold mt-1">{errors.productPhotos.message}</p>}

              {/* Preview Selected Images */}
            </label>
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative w-20 h-20 border rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="flex gap-3 max-w-[600px]:flex-wrap">
            <label className='w-full'>
              <span className='font-semibold italic'>Product price:</span> <br />
              <input
                {...register("Price", {
                  required: "Product price is Required...!",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Price must be at least 1$...!",
                  },
                })}
                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='1234 . . .' />
              {errors.Price && (
                <p className="text-red-500 font-bold mt-1">{errors.Price.message}</p>
              )}

            </label>
            <label className="w-full">
              <span className="font-semibold italic">Product Category:</span> <br />
              <select
                {...register("Category", { required: "Please select a Product Category!" })}
                className="w-full border-2 border-gray-400 rounded-md mt-1 py-1 pl-1 bg-transparent text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>Select Category</option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="jacket">Jacket</option>
                <option value="accessories">Accessories</option>
              </select>
              {errors.Category && <p className="text-red-500 font-bold mt-1">{errors.Category.message}</p>}
            </label>
          </div>

          {/* Remaining fields (Price, AQ, MOQ, Payment, Description) */}
          {/* Copy paste original fields from your code here, no changes needed */}

          <div className='flex gap-3 max-[500px]:flex-wrap'>
            <label className='w-full'>
              <span className='font-semibold italic'>Available Quantity:</span> <br />
              <input
                {...register("AQ", {
                  required: "Available Quantity is Required...!",
                  valueAsNumber: true,
                  min: {
                    value: 100,
                    message: "Available Quantity be at Least 100...!",
                  },
                })}
                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='1234 . . .' />
              {errors.AQ && (
                <p className="text-red-500 font-bold mt-1">{errors.AQ.message}</p>
              )}

            </label>

            <label className='w-full'>
              <span className='font-semibold italic'>Minimum Quantity Here:</span> <br />
              <input
                {...register("MOQ", {
                  required: "Minimum Order Quantity is Required...!",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Minimum Quantity be at Least 1...!",
                  }, validate: (value) =>
                    !aoqValue || value <= aoqValue || "MOQ cannot be greater than Available Quantity",
                })}
                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='1234 . . .' />
              {errors.MOQ && (
                <p className="text-red-500 font-bold mt-1">{errors.MOQ.message}</p>
              )}
            </label>
          </div>

          <label>
            <span className='font-semibold italic'>Select your Payment Options :</span> <br />
            <div className='flex flex-wrap gap-10 mt-1'>

              <div className='w-full pr-2 border-2 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-primary'>
                <select
                  {...register("paymentOptions", { required: "Please select a Payment Option!" })}
                  className="pl-1 py-1 rounded-md w-full outline-0 bg-transparent text-gray-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Payment Options - - -
                  </option>
                  <option className='text-gray-400' value="cod">COD</option>
                  <option className='text-gray-400' value="payFirst">Pay First</option>

                </select>
              </div>

            </div>
            {errors.paymentOptions && (
              <p className="text-red-500 font-bold mt-1">{errors.paymentOptions.message}</p>
            )}
          </label>

          <label>
            <span className='font-semibold italic'>Write Product Description:</span> <br />
            <textarea
              {...register("productDecriiption", {
                required: "Product Decriiption is Required...!"
              })}
              className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Product description . . .' ></textarea>
            {errors.productDecriiption && (
              <p className="text-red-500 font-bold mt-1">{errors.productDecriiption.message}</p>
            )}
          </label>

          <button className="btn btn-sm btn-donate" type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
