
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to templates</span>
          </Link>
          
          <Logo />
        </div>
        
        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center">
          <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
          <span>more free sounds & ai modals coming soon</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
