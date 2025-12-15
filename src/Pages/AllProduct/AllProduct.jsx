import React, { useEffect } from 'react';
import useAxiosSecure from '../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';


const AllProduct = () => {
    useEffect(() => {
        document.title = "NestCloth | All-Product";
    }, []);


    const axiosSecure = useAxiosSecure();
    const { data: Products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`);
            return res.data;
        }
    })


    return (
        <div>
            All-Product{Products.length}
            <h2 className='section-title'>All Phoduct Here:</h2>
            <p className='text-xl font-bold my-4'> Total Available Product: "<span>{Products.length}</span>"</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4" >
                {
                    Products.map(Product => <div key={Product._id} className='p-4 bg-gray-900 rounded-xl'>
                        <div className='h-76'>
                            <img className='h-full w-full' src={Product.photos} alt={Product.ProductName} />
                        </div>
                        <div className='flex justify-between items-center text-white mt-4'>
                            <h1 className='text-[20px] font-bold capitalize '>{Product.ProductName}</h1>
                            <span className='font-semibold'>{Product.Price}$ <span>/ Pice</span></span>
                        </div>
                        <div className='flex justify-between items-center text-white mt-2'>
                            <p className=' font-bold '>Category: <span className='capitalize'>{Product.Category}</span></p>
                            <span className='font-semibold'>  {Product.AOQ} Pice</span>
                        </div>
                        <NavLink to={`/ViewDetails/${Product._id}`} className='btn btn-info w-full mb-2 mt-4'>View Details</NavLink>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllProduct;