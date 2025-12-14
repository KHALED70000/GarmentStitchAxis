import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import LargewhiteLogo from "../../../assets/LaggeWhiteLogo.png"
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">

                {/* Company Info */}
                <div>
                    <div>
                        <img className="w-40" src={LargewhiteLogo} alt="" />
                    </div>
                    <p className="text-gray-400 mb-4">
                        Streamline your garment production & order workflow seamlessly.
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="hover:text-white transition-colors">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <BsTwitterX size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/DashBoard/DashBoard-Home" className="hover:text-white transition-colors">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-white transition-colors">
                                My Orders
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:text-white transition-colors">
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="/Contact" className="hover:text-white transition-colors">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
                    <p className="text-gray-400 mb-2">Email: support@stitchaxispro.com</p>
                    <p className="text-gray-400 mb-2">Phone: +1 234 567 890</p>
                    <p className="text-gray-400">Address: 123 Fashion St, New York, USA</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} NestCloth . All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
