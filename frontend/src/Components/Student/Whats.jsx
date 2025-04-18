import React from 'react';
import { assets } from '../../assets/assets';

const Whats = () => {
  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end gap-2 group">
      {/* Chat UI tooltip (hidden by default, visible on hover) */}
      <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md max-w-[200px] text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative">
        👋 Chat with us on WhatsApp
        {/* Pointer */}
        <div className="absolute bottom-[-8px] right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
      </div>

      {/* WhatsApp Icon (group hover target) */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-xl bg-green-500 hover:bg-green-600 transition-transform duration-300 ease-in-out hover:scale-105 p-2"
      >
        <img
          src={assets.whatsapp}
          alt="WhatsApp"
          className="w-full h-full object-contain"
        />
      </a>
    </div>
  );
};

export default Whats;
