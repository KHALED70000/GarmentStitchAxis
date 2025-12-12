import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <div>
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
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>
                                <NavLink to='/' className={`btn bg-transparent text-gray-400 border-2 rounded-xl border-gray-400`}>Click</NavLink>
                            </td>
                            <td>Blue</td>
                            <td>Blue</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardHome;