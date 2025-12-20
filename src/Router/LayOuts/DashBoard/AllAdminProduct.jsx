
import React, { useState, useMemo, useEffect } from 'react';
import useAuth from '../../../HooKs/useAuth';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TbMoodEmptyFilled } from 'react-icons/tb';
import { IoMdSearch } from "react-icons/io";
import useRole from '../../../HooKs/useRole';
import { CiSearch } from "react-icons/ci";


const AllAdminProduct = () => {
    const [productStatus, setProductStatus] = useState('');
    const [searchText, setSearchText] = useState('');
    const { user, logOut } = useAuth();
    const { role } = useRole();

    useEffect(() => {
        document.title = "Manage-Product";
    }, []);



    const axiosSecure = useAxiosSecure();
    const { data: Products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', user?.email, productStatus],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?status=${productStatus}`);
            return res.data;
        }
    });

    // Derived displayProducts based on searchText and original Products
    const displayProducts = useMemo(() => {
        if (!searchText.trim()) return Products;
        return Products.filter(p =>
            p.ProductName.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [Products, searchText]);

    const handleDeleteProduct = (Product) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete: "${Product.ProductName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/product/${Product._id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            `"${Product.ProductName}" has been deleted.`,
                            'success'
                        );
                        refetch();
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire(
                            'Error!',
                            'Something went wrong while deleting.',
                            'error'
                        );
                    });
            }
        });
    };

    const handleStatusFilter = (status) => {
        setProductStatus(status);
        setSearchText('')
        refetch();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const input = e.target.inputName.value;
        setSearchText(input);
    };

    if (role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center h-screen ">
                <div className=" p-8 rounded-lg shadow-lg text-center bg-gray-950">
                    <h1 className="text-2xl font-bold mb-4 text-red-600">
                        Access Denied
                    </h1>
                    <p className="mb-6 text-gray-400">
                        The page is not for you, cause this page is only for Managers.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-4 py-2 bg-blue-500  rounded hover:bg-blue-600 transition">
                            Go Back
                        </button>
                        <button onClick={logOut} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

        );
    }

    const handleSHPtrue = (poduc) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You Want to Show ${poduc.ProductName}" on Home Page?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, set it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/product/${poduc._id}/shp`, { SHP: true })
                    .then(() => {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'SHP is TRUE now',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to update SHP',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(err)
                    })
            }
        })
    }

    const handleSHPfalse = (poduc) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You Want to Remove "${poduc.ProductName}" from Home Page?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, set it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/product/${poduc._id}/shp`, { SHP: false })
                    .then(() => {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'SHP is FALSE now',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to update SHP',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        console.log(err)
                    })
            }
        })
    }


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading w-18 loading-spinner text-gray-400"></span>
            </div>
        );
    }
    return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-4 mb-10'>All Products:</h1>

            <div className='flex flex-wrap gap-2 justify-between mb-4'>
                <p className='my-4 capitalize'>Total Products: "{Products.length}"</p>

                {/* Search Form */}
                <form onSubmit={handleSearch} className='border-2 flex justify-between items-center rounded-full w-100 px-4 focus:ring-2 focus:ring-primary focus:outline-none border-gray-400 focus:border-0 outline-0 mt-1'>
                    <input
                        name='inputName'
                        className='focus:outline-none focus:border-0 outline-0 w-[90%] pr-2'
                        type="search"
                        placeholder='Search by product name...'
                    />
                    <button className='w-[10%] flex justify-end items-center cursor-pointer text-gray-400 border-l-2'>
                        <IoMdSearch size={25} />
                    </button>
                </form>

                {/* Status Filters */}
                <div className='flex gap-2'>
                    <button
                        onClick={() => handleStatusFilter('')}
                        className={`px-5 py-1 rounded-[5px] cursor-pointer text-gray-400 ${productStatus === '' && 'border-2 border-gray-400'}`}>
                        All Products
                    </button>
                    <button
                        onClick={() => handleStatusFilter('pending')}
                        className={`px-5 py-1 rounded-[5px] cursor-pointer text-gray-400 ${productStatus === 'pending' && 'border-2 border-gray-400'}`}>
                        Pending Products
                    </button>
                    <button
                        onClick={() => handleStatusFilter('approved')}
                        className={`px-5 py-1 rounded-[5px] cursor-pointer text-gray-400 ${productStatus === 'approved' && 'border-2 border-gray-400'}`}>
                        Approved Products
                    </button>
                </div>
            </div>

            <div>
                {displayProducts.length > 0 ? (
                    <table className="table border border-gray-500">
                        <thead>
                            <tr className='text-gray-400'>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Payment Mode</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayProducts.map((Product, index) => (
                                <tr key={Product._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className='w-22 h-15'>
                                            <img className='w-full h-full rounded-xl' src={Product.photos?.[0]} alt="" />
                                        </div>
                                    </td>
                                    <td>{Product.ProductName}</td>
                                    <td>${Product.Price}</td>
                                    <td>{Product.paymentOptions === 'payFirst' ? 'Pay First' : 'COD'}</td>
                                    <td className={`${Product.status === 'pending' ? 'text-yellow-400' : 'text-green-400'} capitalize`}>{Product.status}</td>
                                    <td className='flex gap-2'>
                                        <div className="flex gap-2">
                                            <div>
                                                {
                                                    Product.SHP === true 
                                                    ? <button onClick={() => handleSHPfalse(Product)} className='btn btn-sm bg-gray-900 border-2 border-yellow-400 rounded-lg text-red-400'>Remove From Home Page</button> 
                                                    : <button onClick={() => handleSHPtrue(Product)} className='btn btn-sm bg-gray-900 border-2 border-green-400 rounded-lg text-green-400'>Show On Home Page</button>
                                                }
                                                
                                                
                                            </div>
                                            <NavLink to={`/Edit-Product/${Product._id}`} className="btn btn-sm bg-transparent border-2 border-blue-400 rounded-lg text-blue-400 hover:bg-blue-400/10">Edit</NavLink>
                                            <button onClick={() => handleDeleteProduct(Product)} className="btn btn-sm bg-transparent border-2 border-red-400 rounded-lg text-red-400 hover:bg-red-400/10">Delete</button>
                                        </div>
                                        <NavLink to={`/View-Details/${Product._id}`} className='btn btn-sm bg-transparent border-2 border-gray-400 rounded-lg text-gray-400'><CiSearch size={20} /></NavLink>
                                        {/* <button className='btn btn-sm bg-transparent border-2 border-gray-400 rounded-lg text-gray-400'>Manage</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full h-[40vh] py-16 flex flex-col items-center justify-center text-center border border-dashed rounded-xl">
                        <p className='text-gray-400'><TbMoodEmptyFilled size={90} /></p>
                        <h3 className="mt-2 text-lg font-semibold">No Available Products</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-sm">Products will appear here once added or matched with search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAdminProduct;
