import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const EditOrder = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const {
        data: orderView,
        isLoading,
        // refetch,
    } = useQuery({
        queryKey: ['EditOrder', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/EditOrder/${id}`);
            return res.data.data;
        },
    });


    const handleEditOrder = (UpdatedData) => {

        const UpdatedOrderInfo = {
            Order_Price: UpdatedData.Order_Quantity * parseInt(orderView?.Product_pice) || parseInt(orderView?.Product_pice),
            FirstName: UpdatedData.FirstName || orderView?.FirstName,
            LastName: UpdatedData.LastName || orderView?.LastName,
            Order_Quantity: parseInt(UpdatedData.Order_Quantity) || orderView?.Order_Quantity,
            Buyer_Phone: UpdatedData.Buyer_Phone || orderView?.Buyer_Phone,
            Buyer_Address: UpdatedData.Buyer_Address || orderView?.Buyer_Address,
            Additional_Info: UpdatedData.Additional_Info || orderView?.Additional_Info,
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update this order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, update it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/order/${orderView?._id}`, UpdatedOrderInfo)
                    .then((res) => {
                        if (res.data?.modifiedCount > 0 || res.data?.success) {
                            navigate('/DashBoard/My-Orders')
                            Swal.fire({
                                icon: 'success',
                                title: 'Updated!',
                                text: 'Order updated successfully.',
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        } else {
                            Swal.fire({
                                icon: 'info',
                                title: 'No changes',
                                text: 'Nothing was updated.',
                            });
                        }
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed!',
                            text: 'Something went wrong. Please try again.',
                        });
                        console.error(err);
                    });
            }
        });

    }

    if (isLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                loading . . .
            </div>
        )
    }
    return (
        <div>
            <h1 className='section-title'>Edit Your Order:</h1>
            <div className='max-w-150 mx-auto border-2 border-gray-400 py-6 px-4 rounded-xl'>
                <form onSubmit={handleSubmit(handleEditOrder)} className='flex flex-col w-full gap-5'>
                    <div className='flex gap-3'>

                        <label className='text-gray-400 w-full'>
                            Product Name: <br />
                            <input
                                defaultValue={orderView?.ProductName} readOnly
                                {...register("ProductName")}
                                className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' />

                        </label>

                    </div>


                    <div className='flex gap-3 max-[500px]:flex-wrap'>
                        <label className='text-gray-400 w-full'>
                            First name: <br />
                            <input
                                defaultValue={orderView?.FirstName}
                                {...register("FirstName")}
                                className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='First name . . .' />

                        </label>
                        <label className='text-gray-400 w-full'>
                            Last name: <br />
                            <input
                                defaultValue={orderView?.LastName}
                                {...register("LastName")}
                                className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='Last name . . .' />
                        </label>
                    </div>

                    <div className='flex gap-3 max-[500px]:flex-wrap'>

                        <label className='text-gray-400 w-full'>
                            Order quantity: <br />
                            <input
                                defaultValue={orderView?.Order_Quantity}
                                {...register("Order_Quantity", {
                                    valueAsNumber: true,
                                    min: {
                                        value: orderView?.MOQ,
                                        message: `Buy at least ${orderView?.MOQ} pice...!`,
                                    },
                                    max: {
                                        value: orderView?.AOQ,
                                        message: `Can"t buy more then ${orderView?.AOQ} pice...!`,
                                    }
                                })}
                                className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="number" placeholder='123. . .' />
                            {errors.Order_Quantity && (
                                <p className="text-red-500 font-bold mt-1">{errors.Order_Quantity.message}</p>
                            )}
                        </label>

                    </div>
                    <label className='text-gray-400'>
                        Your Contact Number: <br />
                        <input
                            defaultValue={orderView?.Buyer_Phone}
                            {...register("Buyer_Phone")}
                            className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type='number' placeholder='Phone 123 . . .' />

                    </label>

                    <div className='flex gap-3'>
                        <label className='text-gray-400 w-full'>
                            Your Address: <br />
                            <textarea
                                defaultValue={orderView?.Buyer_Address}
                                {...register("Buyer_Address")}
                                className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' placeholder='Your address . . .'></textarea>

                        </label>

                        <label className='text-gray-400 w-full'>
                            Additional information: <br />
                            <textarea
                                defaultValue={orderView?.Additional_Info}
                                {...register("Additional_Info")}
                                className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' placeholder='Instruction . . .'></textarea>
                        </label>
                    </div>


                    <button className='btn btn-success text-black' type='submit'>Submit</button>

                </form>
            </div>
        </div>
    );
};

export default EditOrder;