
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
      </div>
    </header>
  );
};

export default Header;
