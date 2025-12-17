import { FiClock, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { IoReorderThreeOutline } from "react-icons/io5";
import { NavLink, Outlet, useNavigate } from 'react-router';
import { RxDashboard } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { MdLightMode, MdNightlightRound, MdOutlineManageHistory } from 'react-icons/md';
import { FaUserGear } from "react-icons/fa6";
import LaggeWhiteLogo from "../../../assets/LaggeWhiteLogo.png"
import LargeDarkLogo from "../../../assets/LargeDarkLogo.png"
import useAuth from '../../../HooKs/useAuth';
import useRole from '../../../HooKs/useRole';
import { LuPlus } from "react-icons/lu";
import { FaProductHunt } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineUnorderedList } from 'react-icons/ai';
import Footer from '../FixedLayOut/Footer';
import { SlHandbag } from "react-icons/sl";




const DashBoardLayout = () => {

     useEffect(() => {
            document.title = "Dashboard";
        }, []);

    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };
    useEffect(() => {
        document.documentElement.setAttribute(
            "class",
            theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-black"
        );
    }, [theme]);

    const { role } = useRole();
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/LogIn')
            })
            .catch()
    }


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className={`navbar w-full ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} shadow-sm fixed flex justify-between left-0 top-0 z-50`}>

                    <div className='flex items-center'>
                        <NavLink to='/'>
                            {
                                theme === 'dark' ? <img src={LaggeWhiteLogo} className="w-40" alt="" /> : <img src={LargeDarkLogo} className="w-40" alt="" />
                            }
                        </NavLink>

                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost ml-20">
                            {/* Sidebar toggle icon */}
                            <IoReorderThreeOutline size={30} />

                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg> */}
                        </label>
                    </div>
                    <div className='flex'>
                        <button onClick={toggleTheme} className={`p-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-950'}`}>{theme === 'dark' ? <MdLightMode size={30} /> : <MdNightlightRound size={30} />} </button>
                        {
                            user && (<div className="flex gap-2">
                                <div className="w-12 h-12 flax justify-center items-center">
                                    <img className="rounded-full h-full w-full" src={user?.photoURL} alt={user?.displayName} />
                                </div>
                                <button onClick={handleLogOut} className="px-4 py-1 bg-transparent border-2 border-gray-400 text-[16px] rounded-xl">Log Out</button>
                            </div>)
                        }
                    </div>
                </nav>
                {/* Page content here */}

                <div className={`p-4 m-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} rounded-2xl shadow-sm mt-20 z-20`}>
                    <Outlet></Outlet>
                </div>
                
            </div>

            

            <div className="drawer-side is-drawer-close:overflow-visible shadow-sm">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className={`flex min-h-full flex-col items-start ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} is-drawer-close:w-14 is-drawer-open:w-64`}>
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow DashBoardOptions mt-16 flex gap-3">
                        {/* List item */}

                        <li>
                            <NavLink to='/DashBoard/DashBoard-Home' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                                {/* Home icon */}
                                <RxDashboard size={20} />
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </NavLink>
                        </li>
                        {
                            role === 'admin'
                            && <>
                                <li>
                                    <NavLink to='/DashBoard/Users' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users">
                                        {/* Home icon */}
                                        <FaUserGear size={20} />
                                        <span className="is-drawer-close:hidden">Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/DashBoard/AllProduct' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users">
                                        {/* Home icon */}
                                        <FaProductHunt size={20} />
                                        <span className="is-drawer-close:hidden">Users</span>
                                    </NavLink>
                                </li>
                            </>
                        }

                        {
                            role === 'manager'
                            && <>
                                <li>
                                    <NavLink to='/DashBoard/Add-Product' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Product">
                                        {/* Home icon */}
                                        <LuPlus size={22} />
                                        <span className="is-drawer-close:hidden">Add Product</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/DashBoard/Manage-Product' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Product">
                                        {/* Home icon */}
                                        <MdOutlineManageHistory size={22} />
                                        <span className="is-drawer-close:hidden">Add Product</span>
                                    </NavLink>
                                </li>
                                 <li>
                                    <NavLink to='/DashBoard/Pending-Orders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending Orders">
                                        {/* Home icon */}
                                        <SlHandbag size={20} />
                                        <span className="is-drawer-close:hidden">Pending Orders</span>
                                    </NavLink>
                                </li>
                                 <li>
                                    <NavLink to='/DashBoard/Approved-Orders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approved Orders">
                                        {/* Home icon */}
                                        <AiOutlineCheckCircle size={23} />
                                        <span className="is-drawer-close:hidden">Approved Orders</span>
                                    </NavLink>
                                </li>
                                 
                            </>
                        }





                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;