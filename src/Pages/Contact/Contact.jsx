// import React, {  useEffect } from 'react';
// import { AuthContext } from '../../CONTEXT/AuthContext';

// const Contact = () => {
//     useEffect(() => {
//        document.title = "NestCloth | Contact";
//      }, []);
//     return (
//         <div>
//             Contact page
//         </div>
//     );
// };

// export default Contact;

import React, { useEffect, useState } from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {
       useEffect(() => {
       document.title = "NestCloth | Contact";
     }, []);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // এখানেই তুমি backend call করতে পারো
        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for contacting us.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className=" flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-400">Contact Us</h1>
            
            <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <MdEmail size={28} className="text-blue-500" />
                        <p>support@example.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <MdPhone size={28} className="text-green-500" />
                        <p>+880 1234 567 890</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt size={28} className="text-red-500" />
                        <p>Dhaka, Bangladesh</p>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
                        rows={4}
                        required
                    />
                    <button type="submit" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg shadow transition">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
