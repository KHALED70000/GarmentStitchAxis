import React, { useEffect } from 'react';


const AllProduct = () => {
     useEffect(() => {
    document.title = "NestCloth | All-Product";
  }, []);
    return (
        <div>
            All-Product
        </div>
    );
};

export default AllProduct;