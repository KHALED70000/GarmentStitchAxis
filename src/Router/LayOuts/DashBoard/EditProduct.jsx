// import React from 'react';
// import { useParams } from 'react-router-dom';
// import useAxiosSecure from '../../../HooKs/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const EditProduct = () => {
//     const {id} = useParams();
//      const axiosSecure = useAxiosSecure();
//     const {
//         data: Product=[],
//     } = useQuery({
//         queryKey: ['product', id],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/product/${id}`);
//             return res.data;
//         },
//     });

//     console.log(Product.data)

//     return (
//         <div>
//             Edit Produce
//         </div>
//     );
// };

// export default EditProduct;


import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import useAxiosSecure from "../../../HooKs/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [aoqerror, setAoqerror] = useState('');
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [customLoader, setCustomLoader] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);


    // ---------------- get product info ----------------
    const { id } = useParams();
    const {
        data: Product = {},
        refetch,
    } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product/${id}`);
            return res.data.data;
        },
    });
    let Images = Product?.photos || [];
    // const aoqValue = watch("AQ") || Product?.AOQ;

    // console.log(aoqValue)
    // ---------------- get product info end ----------------


    // ---------------- Delete Photo ----------------
    const handleDeletePhoto = async (photoUrl) => {

        if (Images.length > 1) {
            await axiosSecure.patch(`/product/${id}/remove-photo`, { photoUrl })
                .then(res => {
                    console.log('Deleted the Photo', res);
                    refetch();

                })
                .catch(err => console.log(err))
        } else {
            return (
                Swal.fire({
                    title: `Cannot Delete the Last image..!`,
                    icon: "info",
                    timer: 2000,
                    showConfirmButton: false
                })
            )
        }



    }
    // ---------------- Delete Photo Handle----------------



    // ---------------- Drag & Drop ----------------
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (selectedFiles.length + acceptedFiles.length > 5 - Images.length) {
                Swal.fire({
                    title: `Cannot upload more than ${5 - Images.length} images!`,
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
        [selectedFiles, setValue, Images.length]
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

        if (!images || images.length === 0) {
            return '';
        }

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
    const handleUpdateProduct = async (productData) => {
        try {
            setCustomLoader(true);

            const files = productData.productPhotos || [];

            const photoURLs = await uploadImages(Array.from(files));

            const productUpdatedInfo = {
                ProductName: productData.ProductName || Product.ProductName,
                Price: productData.Price || Product.Price,
                AQ: productData.AQ || Product.AOQ,
                MOQ: productData.MOQ || Product.MOQ,
                paymentOptions: productData.paymentOptions || Product.paymentOptions,
                productDecriiption: productData.productDecriiption || Product.productDecriiption,
                Category: productData.Category || Product.Category,
                photos: photoURLs || Images,
            };

            if(productUpdatedInfo.AQ < productUpdatedInfo.MOQ){
                setCustomLoader(false);
                return setAoqerror('Minimum quantity cannot de greater then available quantity')
            }

            const res = await axiosSecure.patch(`/product/${id}/Update-Product`, productUpdatedInfo);
            if (res) {
                // setCustomLoader(false);
                if (res.data.modifiedCount) {
                    setCustomLoader(false);
                    setAoqerror('')
                    Swal.fire({
                        title: "Product Updated...!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }

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

            <h1 className="section-title">Update Your Product</h1>

            <div className="max-w-xl mx-auto border-2 py-5 px-4 rounded-2xl">
                <form onSubmit={handleSubmit(handleUpdateProduct)} className="flex flex-col w-full gap-5">

                    {/* Product Name */}
                    <label className="w-full">
                        <span className="font-semibold italic">Update product Name:</span> <br />
                        <input
                            defaultValue={Product?.ProductName}
                            {...register("ProductName")}
                            className="border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1"
                            type="text"
                            placeholder="Product name . . ."
                        />
                    </label>

                    {/* image previous omage and remove thes */}
                    <div>
                        <p className="text-sm text-gray-500 text-center mb-4">
                            Maximum allowed <span className="font-semibold">5 images</span>.
                            Uploaded: <span className="font-semibold">{Images?.length ?? 0}</span>,
                            Remaining slot: <span className="font-semibold">{5 - (Images?.length ?? 0)}</span>
                        </p>

                        {Images.length > 0 ? <div className="flex gap-2 flex-wrap">
                            {
                                Images.map((photo, index) => <div key={index} className="w-25 h-25 relative">
                                    <img className="w-full h-full rounded-lg" src={photo} alt="" />

                                    <div onClick={() => handleDeletePhoto(photo)} className="rounded-lg cursor-pointer p-1 bg-red-500 absolute top-0 right-0"><RiDeleteBin6Line /></div>
                                </div>)
                            }
                        </div> : <></>}
                    </div>
                    {/* image previous omage and remove thes end */}

                    {/* Drag & Drop Images */}
                    {Images.length < 5 ? <div>
                        <label className="w-full">
                            <span className="font-semibold italic">Upload New images:</span>
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-md p-4 mt-1 text-center cursor-pointer ${isDragActive ? "border-blue-500 shadow-lg shadow-blue-500/40" : "border-gray-400"}`}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? <p>Drop the images here...</p> : <p>Drag & drop images here, or click to select</p>}
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
                    </div> : <></>}
                    {/* Drag & Drop Images end */}

                    {/* Category */}
                    <div className="flex gap-3 max-w-[600px]:flex-wrap">
                        <label className='w-full'>
                            <span className='font-semibold italic'>Update product price: <span className="text-sm text-yellow-400">{Product?.Price}</span></span> <br />
                            <input
                                {...register("Price", { valueAsNumber: true })}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='Update price . . .' />


                        </label>
                        <label className="w-full">
                            <span className="font-semibold italic">Update product Category:</span> <br />
                            <select
                                {...register("Category", { required: "Please select a Product Category!" })}
                                className="w-full border-2 border-gray-400 rounded-md mt-1 py-1 pl-1 bg-transparent text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                                defaultValue={Product?.Category}
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


                    <div className='flex gap-3 max-[500px]:flex-wrap'>
                        <label className='w-full'>
                            <span className='font-semibold italic'>Available Quantity: <span className="text-sm text-yellow-400">{Product?.AOQ}</span></span> <br />
                            <input

                                {...register("AQ", {

                                    valueAsNumber: true,
                                    min: {
                                        value: 100,
                                        message: "Available Quantity be at Least 100...!",
                                    },
                                })}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='Update quantity . . .' />
                            {errors.AQ && (
                                <p className="text-red-500 font-bold mt-1">{errors.AQ.message}</p>
                            )}

                        </label>

                        <label className='w-full'>
                            <span className='font-semibold italic'>Minimum Quantity: <span className="text-sm text-yellow-400">{Product?.MOQ}</span></span> <br />
                            <input
                                {...register("MOQ", {

                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Minimum Quantity be at Least 1...!",
                                    }
                                })}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='Update quantity . . .' />
                            {errors.MOQ && (
                                <p className="text-red-500 font-bold mt-1">{errors.MOQ.message}</p>
                            )}
                            {aoqerror ? <p className="text-red-400 text-[12px] font-bold mt-1">{aoqerror}</p> : <></>}
                        </label>
                    </div>

                    <label>
                        <span className='font-semibold italic'>Update Payment Options :</span> <br />
                        <div className='flex flex-wrap gap-10 mt-1'>

                            <div className='w-full pr-2 border-2 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-primary'>
                                <select
                                    {...register("paymentOptions", { required: "Please select a Payment Option!" })}
                                    className="pl-1 py-1 rounded-md w-full outline-0 bg-transparent text-gray-400"
                                    defaultValue={Product?.paymentOptions}
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
                        <span className='font-semibold italic'>Update Product Description:</span> <br />
                        <textarea
                            defaultValue={Product?.productDecriiption}
                            {...register("productDecriiption")}
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Product description . . .' ></textarea>

                    </label>

                    <button className="btn btn-sm btn-donate" type="submit">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
