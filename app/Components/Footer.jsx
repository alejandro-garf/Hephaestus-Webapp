import React from "react";

// Footer component
const Footer = () => {
  return (
    // Footer section with a container centered using Tailwind CSS classes
    <footer className="footer">
      <div className="container mx-auto text-center">
        {/* Display the current year dynamically and the company name */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Hephaestus. All rights reserved.</p>

        {/* Links section with flexbox for spacing */}
        <div className="flex justify-center space-x-4 mt-4">
          {/* Link to Terms of Service */}
          <a href="#" className="hover:text-gray-400">Terms of Service</a>

          {/* Link to LinkedIn */}
          <a href="#" className="hover:text-gray-400">LinkedIn</a>

          {/* Contact email */}
          <a href="#" className="hover:text-gray-400">hephaestus.river.corp@gmail.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
