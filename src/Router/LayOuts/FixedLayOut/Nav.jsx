import { useEffect, useState } from "react";
import { Link, NavLink} from "react-router-dom";
const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [theme, setTheme] = useState("light");

  // Toggle function
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };
    useEffect(() => {
       document.documentElement.setAttribute(
         "class",
         theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-black"
       );
     }, [theme]);


    const Links = <>
        <NavLink
            to="/"
            className="hover:text-primary transition  px-6"
            onClick={toggleSidebar}
        >
            Services
        </NavLink>
        <NavLink
            to="/Coverage"
            className="hover:text-primary transition  px-6"
            onClick={toggleSidebar}
        >
            Coverage
        </NavLink>
        <NavLink
            to="/Aboutus"
            className="hover:text-primary transition  px-6"
            onClick={toggleSidebar}
        >
            About Us
        </NavLink>
        <NavLink
            to="/SendParcel"
            className="hover:text-primary transition  px-6"
            onClick={toggleSidebar}
        >
            Send Parcel
        </NavLink>
        
        <NavLink
            to="/Rider"
            className="hover:text-primary transition  px-6"
            onClick={toggleSidebar}
        >
            Be A Rider
        </NavLink>
    </>
    const Links_FOR_LARG = <>
        <NavLink
            to="/"
            className="hover:text-primary transition py-1.25 px-3.7"
        >
            Services
        </NavLink>
        <NavLink
            to="/Coverage"
            className="hover:text-primary transition py-1.25 px-3.7"
        >
            Coverage
        </NavLink>
        <NavLink
            to="/Aboutus"
            className="hover:text-primary transition py-1.25 px-3.7"
        >
            About Us
        </NavLink>
        <NavLink
            to="/SendParcel"
            className="hover:text-primary transition py-1.25 px-3.7"
        >
            Send Parcel
        </NavLink>
       
        <NavLink
            to="/Rider"
            className="hover:text-primary transition py-1.25 px-3.7"
        >
            Be A Rider
        </NavLink>
    </>
    return (
        <>
            {/* Navbar */}
            <nav className="bg-white text-black shadow-md fixed top-0 left-0 z-50 w-full">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Left Side: Logo & Hamburger (for mobile) */}
                    <div className="flex items-center gap-3">
                        {/* Hamburger Icon (only small devices) */}
                        <button
                            onClick={toggleSidebar}
                            className="text-2xl md:hidden focus:outline-none"
                        >
                            {sidebarOpen ? "☰" : "☰"}
                        </button>

                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-2xl font-bold text-black tracking-wide"
                        >
                            <div>
                                <h1 className="font-bold text-4xl">LOGO</h1>
                            </div>
                        </Link>
                    </div>

                    {/* Middle: Menu Links (only large devices) */}
                    <div className="hidden md:flex space-x-8 text-lg AC_parent">
                        {Links_FOR_LARG}
                    </div>

                    {/* Right Side: Login Button */}

                    <div className="flex gap-2 items-center">
                        <button onClick={toggleTheme}>Mod</button>
                        <h2 className="text-2xl font-bold">UserProgile</h2>
                    </div>



                </div>
            </nav>

            {/* Sidebar (for small devices) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-primary text-black z-51 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out z-40 shadow-lg`}
            >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-black">Menu</h2>
                    <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                        ✕
                    </button>
                </div>

                {/* Sidebar Menu Items */}
                <div className="flex flex-col mt-4 space-y-3 AC_parent_mobile">
                    {Links}
                </div>
            </div>

            {/* Background Overlay (when sidebar open) */}
            {sidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-lg bg-opacity-50 z-30 transition-opacity duration-300"
                ></div>
            )}

            {/* Open the modal using document.getElementById('ID').showModal() method */}


        </>
    );
};

export default Navbar;
