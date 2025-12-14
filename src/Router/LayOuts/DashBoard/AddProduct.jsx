import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const aoqValue = watch("AOQ");
    const navigate = useNavigate();


    const handleCreateProduct = (productData) => {

        axiosSecure.post('/product', productData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Product created...!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                        customClass: {
                            confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
                        },
                        buttonsStyling: false
                    });
                    reset();
                    navigate('/All-Product')
                }

            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold mb-6 mt-6'>Create A New Product</h1>

            <div className='max-w-125 mx-auto border-2 py-5 px-4 rounded-2xl'>
                <form onSubmit={handleSubmit(handleCreateProduct)} className='flex flex-col w-full gap-5'>

                    <label className='w-full'>
                        <span className='font-semibold italic'>Product Name here:</span> <br />
                        <input
                            {...register("ProductName", {
                                required: "Product name is Required...!"
                            })}
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Product name . . .' />
                        {errors.PriductName && (
                            <p className="text-red-500 font-bold mt-1">{errors.PriductName.message}</p>
                        )}
                    </label>


                    <label>
                        <span className='font-semibold italic'>Type Product URL:</span> <br />
                        <input
                            {...register("productImgURL", {
                                required: "Product Image URL is Required...!"
                            })}
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="url" placeholder='Photo url . . .' />
                        {errors.productImgURL && (
                            <p className="text-red-500 font-bold mt-1">{errors.productImgURL.message}</p>
                        )}
                    </label>
                    {/* Category */}
                    <label>
                        <span className='font-semibold italic'>Select your Product Category:</span> <br />
                        <div className='flex flex-wrap gap-10 mt-1'>

                            <div className='w-full pr-2 border-2 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-primary'>
                                <select
                                    {...register("Category", { required: "Please select a Producr Category!" })}
                                    className="pl-1 py-1 rounded-md w-full outline-0 bg-transparent text-gray-400"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    <option className='text-gray-400' value="shirt">Shirt</option>
                                    <option className='text-gray-400' value="pant">Pant</option>
                                    <option className='text-gray-400' value="jacket">Jacket</option>
                                    <option className='text-gray-400' value="accessories">Accessories</option>
                                    <option className='text-gray-400' value="manager">Manager</option>
                                </select>
                            </div>

                        </div>
                        {errors.Category && (
                            <p className="text-red-500 font-bold mt-1">{errors.Category.message}</p>
                        )}
                    </label>
                    {/* role end*/}
                    <label>
                        <span className='font-semibold italic'>Product Pice Here:</span> <br />
                        <input
                            {...register("Price", {
                                required: "Prodict price is Required...!",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Price must be greater than 0$",
                                },
                            })}
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='Price . . .' />
                        {errors.Price && (
                            <p className="text-red-500 font-bold mt-1">{errors.Price.message}</p>
                        )}

                    </label>

                    <div className='flex gap-3 max-[500px]:flex-wrap'>
                        <label className='w-full'>
                            <span className='font-semibold italic'>Available Quantity:</span> <br />
                            <input
                                {...register("AOQ", {
                                    required: "Available Quantity is Required...!",
                                    valueAsNumber: true,
                                    min: {
                                        value: 100,
                                        message: "Available Quantity be at Least 100...!",
                                    },
                                })}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="number" placeholder='1234 . . .' />
                            {errors.AOQ && (
                                <p className="text-red-500 font-bold mt-1">{errors.AOQ.message}</p>
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
                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="text" placeholder='Product description . . .' />
                        {errors.productDecriiption && (
                            <p className="text-red-500 font-bold mt-1">{errors.productDecriiption.message}</p>
                        )}
                    </label>


                    <button className='btn btn-sm btn-donate' type='submit'>Create Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;