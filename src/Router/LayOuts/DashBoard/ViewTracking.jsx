import React, { useEffect, useState } from 'react';
import { LuSend } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../HooKs/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { TbMoodEmptyFilled } from 'react-icons/tb';
import { FcShipped } from 'react-icons/fc';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const ViewTracking = () => {
    useEffect(() => {
        document.title = "Live-Tracking";
    }, []);

    const { id: OrderId } = useParams(); // useParams er id property
    const axiosSecure = useAxiosSecure();
    const [currentLocation, setCurrentLocation] = useState('Empty');
    // const position = [23.6850, 90.3563];
    const hasLocation = currentLocation && currentLocation !== 'Empty';
    const lat = hasLocation ? parseFloat(currentLocation.split('|')[0]) : 23.685; // BD default
    const lng = hasLocation ? parseFloat(currentLocation.split('|')[1]) : 90.3563;

    const { data: orders = {} } = useQuery({
        queryKey: ['orders', OrderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/${OrderId}`);
            return res.data;
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

    console.log(orders?.ProductName)

    if (currentLocation === '22.3569|91.7832') {
        return (<div className="w-full h-[40vh] py-16 flex flex-col items-center justify-center text-center border border-dashed rounded-xl">

            <p className='text-gray-400'><FcShipped size={90} /></p>

            <h3 className="mt-2 text-lg font-semibold">
                Already Delivered the Order
            </h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm">
                New orders will appear here once customers place their purchases.
            </p>
        </div>)
    }

    return (
        <div>
            <h1 className='section-title'>Order Info</h1>
            <div className='max-w-200 mx-auto p-5 rounded-3xl border-2 border-dashed'>
                <p className='italic border border-b-0 p-2 rounded-t-xl'><span className='text-xl font-bold text-gray-400'>Product Name: </span> {orders?.ProductName}</p>
                <p className='italic border p-2'><span className='text-xl font-bold text-gray-400'>Order Price: </span> {orders?.Product_pice} $</p>
                <p className='italic border border-t-0 p-2'><span className='text-xl font-bold text-gray-400'>Order Quantity: </span> {orders?.Order_Quantity} Pice</p>
                <p className='italic border border-t-0 p-2'><span className='text-xl font-bold text-gray-400'>Buyer Email: </span> <a href={`mailto:${orders?.BuyerEmail}`} className='underline text-info'>{orders?.BuyerEmail}</a></p>
                <p className='italic border border-t-0 p-2 rounded-b-xl'><span className='text-xl font-bold text-gray-400'>Order ID: </span> "{orders?._id}"</p>
                
                
            </div>
            <h1 className='section-title'>View Tracking</h1>
            <ul className="timeline timeline-vertical max-[600px]:-ml-45 max-w-150 mx-auto">
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
                            // onClick={() => handleUpdateTrack(step.name, step.location)}
                            className={`cursor-default timeline-end timeline-box bg-transparent flex gap-2 items-center ${currentLocation === step.location ? 'border-2 border-green-400 text-green-400' : ''
                                }`}
                        >
                            <span className='flex gap-2 items-center text-info'></span> {step.label}
                        </div>
                    </li>
                ))}
            </ul>
            <h1 className='section-title mt-4'>View On Map</h1>
            <div>
                <div className='h-80 max-w-200 mx-auto rounded-2xl overflow-hidden'>
                    <MapContainer
                        className="h-full"
                        center={[lat, lng]}
                        zoom={6}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {hasLocation && (
                            <Marker position={[lat, lng]}>
                                <Popup>
                                    <strong>Your Product is here</strong> <br />
                                    <span>Fast working</span>
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ViewTracking;
