import React from 'react';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
    const productId = useParams();
    console.log(productId)
    return (
        <div>
            View Details page
        </div>
    );
};

export default ViewDetails;