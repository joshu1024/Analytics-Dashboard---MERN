import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 p-3 text-center text-sm">
      &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
    </div>
  );
};

export default Footer;
