import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaPlus } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiSolidImageAdd } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const AdminDashboardHome = () => {
    const [openForm, setOpenForm] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        document.title = "Dashboard | Home";
    }, []);

   

    const handleViewBanner = () => {
        setOpen(true)
    }

    const handleOpenBannerForm = () => {
        setOpenForm(true)
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const axiosSecure = useAxiosSecure();
    const { data: Banners = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners');
            return res.data;
        }
    })
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading banners</p>;

    const handleCreate = (data) => {
        console.log(data);
        axiosSecure.post('/banners', data)
            .then((res) => {
                Swal.fire({
                    title: "Well Done...!",
                    text: `${res.data.message}`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
                    },
                    buttonsStyling: false
                });
                refetch();
                reset();
                setOpenForm(false)
            })
            .catch(err => {
                Swal.fire({
                    title: "An error occured...!",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        confirmButton: "bg-[#CAEB66] cursor-pointer text-black px-4 py-2 rounded font-semibold"
                    },
                    buttonsStyling: false
                });
                console.log(err)
            })
    }



    return (
        <div>
            <div className='mb-6'>
                <h1 className='font-bold text-2xl'>Create A New Banner <button onClick={handleOpenBannerForm} className="btn btn-sm bg-gray-400"><BiSolidImageAdd size={20} /></button></h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-gray-400'>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tag Line</th>
                            <th>CTA</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Banners.map((banner, index) => <tr key={banner._id}>
                                <th>{index + 1}</th>
                                <td><img className='h-14 w-20 rounded-xl' src={banner.BannerUrl} alt="Not Found" /></td>
                                <td>Quality Control Specialist</td>
                                <td>
                                    <NavLink to={banner.ActionLink} className={` btn btn-sm bg-transparent text-gray-400 border-2 rounded-[7px] border-gray-400`}>{banner.BtnName}</NavLink>
                                </td>
                                <td>01/02/2001 </td>
                                <td>
                                    <button onClick={handleViewBanner} className={`btn btn-sm bg-transparent text-gray-400 border-2 rounded-[7px] border-gray-400`}>view</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                            >



                                <h2 className="text-xl text-gray-400 font-semibold mb-4">Custom Modal</h2>
                                <p className="text-gray-400 mb-6">
                                    This is a smooth animated modal built with TailwindCSS and Framer Motion.
                                </p>


                                <div className={`flex flex-col gap-4`}>

                                    <div className='flex gap-3 justify-between'>
                                        <button className={`btn btn-sm bg-transparent text-success border-2 rounded-[7px] border-success w-[49%] hover:opacity-80`}><FaEdit size={20} /> Edit</button>
                                        <button className={`btn btn-sm bg-transparent text-warning border-2 rounded-[7px] border-warning w-[45%] hover:opacity-80`}> <RiDeleteBinLine size={20} /> Delete</button>
                                    </div>

                                    <button
                                        onClick={() => setOpen(false)}
                                        className="btn btn-sm bg-transparent text-white border-2 rounded-[7px] border-white hover:opacity-80"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                    {openForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                            >



                                <div className='flex flex-col items-center gap-3 text-white'>
                                    <BiSolidImageAdd size={50} />
                                    <h2 className="text-xl text-center  font-semibold mb-6">CREATE BANNER</h2>
                                </div>

                                {/* form */}
                                <form onSubmit={handleSubmit(handleCreate)} className='flex flex-col w-full gap-5'>
                                    <label className='text-white'>
                                        Image URL <br />
                                        <input
                                            {...register("BannerUrl", {
                                                required: "Banner URL is Required...!"
                                            })}
                                            className='border-2 rounded-md py-1 px-2 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 w-full mt-1' type="url" placeholder='Banner Image URL . . .' />
                                        {errors.BannerUrl && (
                                            <p className="text-red-500 font-bold mt-1">{errors.BannerUrl.message}</p>
                                        )}
                                    </label>
                                    <label className='text-white'>
                                        Slogan <br />
                                        <input
                                            {...register("Slogan", {
                                                required: "Slogan is Required...!"
                                            })}
                                            className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='Banner Slogan . . .' />
                                        {errors.Slogan && (
                                            <p className="text-red-500 font-bold mt-1">{errors.Slogan.message}</p>
                                        )}
                                    </label>
                                    <label className='text-white'>
                                        CTA Button Name <br />
                                        <input
                                            {...register("BtnName", {
                                                required: "Button name is Required...!"
                                            })}
                                            className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='Button Text . . .' />
                                        {errors.BtnName && (
                                            <p className="text-red-500 font-bold mt-1">{errors.BtnName.message}</p>
                                        )}
                                    </label>
                                    <label className='text-white'>
                                        CTA Button Link <br />
                                        <input
                                            {...register("ActionLink", {
                                                required: "CTA link is Required...!"
                                            })}
                                            className='border-2 rounded-md py-1 px-2 w-full mt-1 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0' type="text" placeholder='Action Link . . .' />
                                        {errors.ActionLink && (
                                            <p className="text-red-500 font-bold mt-1">{errors.ActionLink.message}</p>
                                        )}
                                    </label>

                                    <button className='btn btn-success text-black' type='submit'>Create</button>
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
            </div>
        </div>
    );
};

export default AdminDashboardHome;