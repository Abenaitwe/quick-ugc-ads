import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Play, Clock, Lock } from "lucide-react";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="w-full">
      {/* Hero Section - Full height now */}
      <header className="w-full min-h-screen bg-[hsl(271,100%,70%)] text-white flex items-center">
        <div className="container mx-auto px-4 relative overflow-hidden flex flex-col items-center justify-center">
          {/* Centered title instead of logo */}
          <h1 className="text-white text-3xl font-bold text-center w-full mb-8">InstantUGC</h1>
          
          {/* Glass morphism tab in center with hover effect */}
          <div 
            className={`glass-morphism rounded-3xl p-8 mb-8 w-full max-w-3xl mx-auto text-center z-20 relative backdrop-blur-lg 
            bg-white/20 border ${isHovered ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300' : 'border-white/30 shadow-lg'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Create UGC Ads
              <span className="block mt-1">in Seconds</span>
            </h1>
            <p className="text-xl mb-8 animate-fade-in opacity-90">
              The fastest way to create engaging, conversion-driven UGC content
            </p>
            <Link to="/creator">
              <Button className="bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700 text-lg px-8 py-6 h-auto rounded-full font-medium animate-fade-in flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Get Dripping
              </Button>
            </Link>
          </div>

          {/* Floating images */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 rounded-3xl overflow-hidden w-36 h-36 shadow-lg animate-float delay-100 border-4 border-white">
              <img 
                src="/public/lovable-uploads/7e5d2bad-0f45-4daa-b0af-7f94ff2d5de0.png" 
                alt="UGC sample" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute top-20 right-10 rounded-3xl overflow-hidden w-44 h-44 shadow-lg animate-float delay-300 border-4 border-white">
              <img 
                src="/public/lovable-uploads/c4e747d2-b1db-4f11-bef8-b171f4aa64d4.png" 
                alt="UGC sample" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute bottom-32 left-1/4 rounded-3xl overflow-hidden w-40 h-40 shadow-lg animate-float delay-200 border-4 border-white">
              <img 
                src="/public/lovable-uploads/e2dbf4bd-c5d7-498c-a89e-bcd56a1c439b.png" 
                alt="UGC sample" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute bottom-40 right-1/4 rounded-3xl overflow-hidden w-40 h-40 shadow-lg animate-float delay-400 border-4 border-white">
              <img 
                src="/public/lovable-uploads/03078dbb-8dba-408e-a18f-6bed787e3bb9.png" 
                alt="UGC sample" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute top-40 left-1/3 rounded-3xl overflow-hidden w-36 h-36 shadow-lg animate-float delay-500 border-4 border-white">
              <img 
                src="/public/lovable-uploads/03078dbb-8dba-408e-a18f-6bed787e3bb9.png" 
                alt="UGC sample" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute bottom-20 right-10 rounded-3xl overflow-hidden w-48 h-48 shadow-lg animate-float delay-200 border-4 border-white">
              <img 
                src="/public/lovable-uploads/7e5d2bad-0f45-4daa-b0af-7f94ff2d5de0.png" 
                alt="UGC sample" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Quick, <span className="text-purple-600">Simple</span>, Effective
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ready-Made Templates</h3>
              <p className="text-gray-600">Choose from dozens of high-converting UGC templates designed for maximum engagement.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Perfect Audio Tracks</h3>
              <p className="text-gray-600">Upload your own audio or select from our library of trending, royalty-free music.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create in Minutes</h3>
              <p className="text-gray-600">Our intuitive interface lets you create professional UGC ads in under 2 minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create <span className="text-purple-600">Engaging Ads?</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of content creators who are generating high-converting UGC ads in seconds
          </p>
          <Link to="/creator">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 h-auto rounded-full font-medium">
              Start Creating Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
