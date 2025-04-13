
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Zap, Play, Clock, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleCreateClick = () => {
    if (user) {
      navigate('/creator');
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <div className="w-full">
      {/* Hero Section - Full height now */}
      <header className="w-full min-h-screen bg-[hsl(271,100%,70%)] text-white flex items-center">
        <div className="container mx-auto px-4 relative flex flex-col">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 w-full">
            {/* Left side - Image pattern */}
            <div className="w-full md:w-1/3 hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                {/* First column */}
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden w-full aspect-square shadow-lg animate-float delay-100 border-4 border-white">
                    <img 
                      src="/lovable-uploads/8d5ddf8e-f2fa-4848-adb6-1e17ea40d1bf.png" 
                      alt="UGC sample" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden w-full aspect-square shadow-lg animate-float delay-400 border-4 border-white">
                    <img 
                      src="/lovable-uploads/011a5888-1eb0-4ad7-a308-61379ec4f8b3.png" 
                      alt="UGC sample" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                
                {/* Second column */}
                <div className="space-y-4 pt-8">
                  <div className="rounded-3xl overflow-hidden w-full aspect-square shadow-lg animate-float delay-300 border-4 border-white">
                    <img 
                      src="/lovable-uploads/9bc0b9a7-6f7e-49cd-8321-b3725671949b.png" 
                      alt="UGC sample" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden w-full aspect-square shadow-lg animate-float delay-200 border-4 border-white">
                    <img 
                      src="/lovable-uploads/9d4356fc-b755-4a5d-875f-f23aab165e11.png" 
                      alt="UGC sample" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Glass morphism tab */}
            <div className="w-full md:w-2/3">
              {/* Glass morphism tab with hover effect */}
              <div 
                className={`glass-morphism rounded-3xl p-8 mb-8 w-full mx-auto text-center backdrop-blur-lg 
                bg-white/20 border ${isHovered ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300' : 'border-white/30 shadow-lg'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <h2 className="text-white text-2xl font-bold mb-4">InstantUGC</h2>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                  Create UGC Ads
                  <span className="block mt-1">in Seconds</span>
                </h1>
                <p className="text-lg mb-8 animate-fade-in opacity-90 whitespace-nowrap overflow-hidden">
                  No editing skills needed. Pick a template, add your vibe, and launch
                </p>
                <div className="flex justify-center">
                  <Button 
                    onClick={handleCreateClick}
                    className="relative bg-[#EFF0F6] text-black text-lg px-20 py-6 h-auto rounded-full font-medium animate-fade-in flex items-center justify-center gap-3 shadow-[0_8px_16px_-2px_rgba(130,119,170,0.35)] border border-white"
                    style={{
                      background: 'linear-gradient(180deg, #F8F9FD 0%, #EFF0F6 100%)',
                      boxShadow: '0 8px 16px -2px rgba(130, 119, 170, 0.35), 0 1px 2px rgba(255, 255, 255, 0.9) inset',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px -2px rgba(130, 119, 170, 0.5), 0 1px 2px rgba(255, 255, 255, 0.9) inset';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 16px -2px rgba(130, 119, 170, 0.35), 0 1px 2px rgba(255, 255, 255, 0.9) inset';
                    }}
                  >
                    <div className="flex items-center justify-center bg-white rounded-full w-10 h-10 shadow-md">
                      <Lock className="h-4 w-4 text-black" />
                    </div>
                    Create
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile images - shown only on small screens in a horizontal scroll */}
            <div className="md:hidden w-full overflow-x-auto py-4 flex gap-4 snap-x snap-mandatory">
              <div className="snap-center shrink-0 rounded-3xl overflow-hidden w-40 h-40 shadow-lg border-4 border-white">
                <img 
                  src="/lovable-uploads/8d5ddf8e-f2fa-4848-adb6-1e17ea40d1bf.png" 
                  alt="UGC sample" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="snap-center shrink-0 rounded-3xl overflow-hidden w-40 h-40 shadow-lg border-4 border-white">
                <img 
                  src="/lovable-uploads/9bc0b9a7-6f7e-49cd-8321-b3725671949b.png" 
                  alt="UGC sample" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="snap-center shrink-0 rounded-3xl overflow-hidden w-40 h-40 shadow-lg border-4 border-white">
                <img 
                  src="/lovable-uploads/9d4356fc-b755-4a5d-875f-f23aab165e11.png" 
                  alt="UGC sample" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="snap-center shrink-0 rounded-3xl overflow-hidden w-40 h-40 shadow-lg border-4 border-white">
                <img 
                  src="/lovable-uploads/011a5888-1eb0-4ad7-a308-61379ec4f8b3.png" 
                  alt="UGC sample" 
                  className="w-full h-full object-cover" 
                />
              </div>
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
          <Button 
            onClick={handleCreateClick} 
            className="relative bg-[#EFF0F6] text-black text-lg px-8 py-6 h-auto rounded-full font-medium flex items-center justify-center gap-3 shadow-[0_8px_16px_-2px_rgba(130,119,170,0.35)] border border-white"
            style={{
              background: 'linear-gradient(180deg, #F8F9FD 0%, #EFF0F6 100%)',
              boxShadow: '0 8px 16px -2px rgba(130, 119, 170, 0.35), 0 1px 2px rgba(255, 255, 255, 0.9) inset',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 10px 20px -2px rgba(130, 119, 170, 0.5), 0 1px 2px rgba(255, 255, 255, 0.9) inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 16px -2px rgba(130, 119, 170, 0.35), 0 1px 2px rgba(255, 255, 255, 0.9) inset';
            }}
          >
            <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 shadow-md">
              <Lock className="h-3.5 w-3.5 text-black" />
            </div>
            Start Creating Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
