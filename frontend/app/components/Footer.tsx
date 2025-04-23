import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';  // Importing icons

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 px-4 md:px-16 lg:px-28 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* About Us Section */}
                <div className="text-lg font-semibold">
                    <h2 className="text-xl mb-2 font-bold">About Us</h2>
                    <p className="text-gray-400 text-sm">We are a team dedicated to providing the best services and solutions. We strive to exceed expectations.</p>
                </div>

                {/* Quick Links Section */}
                <div className="text-lg font-semibold">
                    <h2 className="text-xl mb-2 font-bold">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                        <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
                        <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
                        <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">About</a></li>
                    </ul>
                </div>

                {/* Follow Us Section */}
                <div className="text-lg font-semibold">
                    <h2 className="text-xl mb-2 font-bold">Follow Us</h2>
                    <ul className="flex space-x-6">
                        <li><a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition duration-300"><FaFacebook size={28} /></a></li>
                        <li><a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition duration-300"><FaTwitter size={28} /></a></li>
                        <li><a href="https://instagram.com" className="text-gray-400 hover:text-pink-600 transition duration-300"><FaInstagram size={28} /></a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                <p>&copy; 2025 Your Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
