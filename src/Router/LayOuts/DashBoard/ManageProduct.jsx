import React from 'react';

const ManageProduct = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold text-center mt-4 mb-10'>Your All Product Here:</h1>
            <div>
                <table className="table border border-gray-500">
                {/* head */}
                <thead>
                    <tr className='text-gray-400'>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Payment Mode</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>

            </table>
            </div>
        </div>
    );
};

export default ManageProduct;