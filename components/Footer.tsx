
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-brand-gray border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-brand-light-gray mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Monochrome Learn. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-brand-light-gray hover:text-white transition-colors duration-300">
              Terms
            </a>
            <a href="#" className="text-brand-light-gray hover:text-white transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-brand-light-gray hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
