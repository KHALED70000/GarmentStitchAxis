import React, { useEffect } from 'react';
import { FaUsers, FaLightbulb, FaRocket } from 'react-icons/fa';

const AboutUs = () => {
         useEffect(() => {
    document.title = "NestCloth | About Us";
  }, []);
    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">About Us</h1>

            <p className="max-w-3xl text-center text-gray-400 mb-12">
                Welcome to our platform! We are dedicated to providing the best user experience, modern solutions, and innovative features.
                Our goal is to build something amazing, reliable, and user-friendly for everyone.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
                <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
                    <FaUsers size={36} className="text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                    <p className="text-gray-400">To become a leading garments manufacturer delivering high-quality, sustainable, and innovative fashion solutions that exceed customer expectations globally.</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
                    <FaLightbulb size={36} className="text-yellow-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-400">Our mission is to produce ethically-made, durable, and stylish garments while ensuring fair labor practices, continuous innovation, and customer satisfaction at every step.</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
                    <FaRocket size={36} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-400">We are dedicated to delivering high-quality garments, ensuring ethical practices, timely delivery, and customer satisfaction while continuously innovating and supporting sustainable manufacturing processes.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
