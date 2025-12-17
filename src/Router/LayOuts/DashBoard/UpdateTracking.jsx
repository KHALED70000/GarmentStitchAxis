import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateTracking = () => {
     useEffect(() => {
        document.title = "Live-Tracking";
    }, []);

    const OrderId = useParams();
    console.log(OrderId)

    return (
        <div>
            Update Tracking
        </div>
    );
};

export default UpdateTracking;