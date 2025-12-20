import React, { useEffect, useState } from 'react';
import { LuSend } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FcShipped } from 'react-icons/fc';

const UpdateTracking = () => {
    useEffect(() => {
        document.title = "Live-Tracking";
    }, []);

    const { id: OrderId } = useParams(); // useParams er id property
    const axiosSecure = useAxiosSecure();
    const [currentLocation, setCurrentLocation] = useState('Empty');

    const { data: orders = {}, refetch } = useQuery({
        queryKey: ['EditOrder', OrderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/EditOrder/${OrderId}`);
            return res.data.data;
        },

    });

    // Update currentLocation jokhon orders fetch hobe
    useEffect(() => {
        if (orders?.Trackings) {
            const { Delivared, Packaged, QCchack, Finishing, Sewing, Cutting } = orders.Trackings;
            setCurrentLocation(
                Delivared || Packaged || QCchack || Finishing || Sewing || Cutting || 'Empty'
            );
        } else {
            setCurrentLocation('Empty');
        }
    }, [orders]);

    const handleUpdateTrack = async (fieldName, location) => {
        try {
            await axiosSecure.patch(`/CuttingUpdateOrder/${OrderId}?place=${fieldName}&location=${location}`);
            refetch(); // update orders
            Swal.fire({
                title: "Tracking Updated",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
                timerProgressBar: true,
            });
        } catch (err) {
            console.log(err);
        }
    };

    
        if (currentLocation === '22.3569|91.7832') {
            return (<div className="w-full h-[40vh] py-16 flex flex-col items-center justify-center text-center border border-dashed rounded-xl">
    
                <p className='text-gray-400'><FcShipped size={90} /></p>
    
                <h3 className="mt-2 text-lg font-semibold">
                    Order Delivered
                </h3>
                <p className="mt-1 text-sm text-gray-500 max-w-sm">
                    New orders will appear here once customers place their purchases.
                </p>
            </div>)
        }

    return (
        <div>
            <h1 className='section-title'>Update Tracking</h1>
            <ul className="timeline timeline-vertical max-w-150 mx-auto">
                {[
                    { name: 'Cutting', location: '25.7439|89.2752', label: 'Cutting Completed' },
                    { name: 'Sewing', location: '24.8949|91.8687', label: 'Sewing Started' },
                    { name: 'Finishing', location: '21.4272|92.0058', label: 'Finishing' },
                    { name: 'QCchack', location: '22.8456|89.5403', label: 'QC Checked' },
                    { name: 'Packaged', location: '24.3745|88.6042', label: 'Packaged' },
                    { name: 'Delivared', location: '22.3569|91.7832', label: 'Shipped / Out for Delivery' },
                ].map((step) => (
                    <li key={step.name}>
                        <hr />
                        <div className={`timeline-middle ${currentLocation === step.location ? 'text-green-400' : ''} `}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div
                            onClick={() => handleUpdateTrack(step.name, step.location)}
                            className={`cursor-pointer timeline-end timeline-box bg-transparent flex gap-2 items-center ${currentLocation === step.location ? 'border-2 border-green-400 text-green-400' : ''
                                }`}
                        >
                            <span className='flex gap-2 items-center text-info'> <LuSend size={20} /> Send</span> | {step.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpdateTracking;
