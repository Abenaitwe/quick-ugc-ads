
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkle, Info, Music, Image, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Template {
  id: number;
  imageUrl: string;
}

const Creator = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [adText, setAdText] = useState("");
  const [textPosition, setTextPosition] = useState<"top" | "middle" | "bottom">("middle");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Generate some sample templates - we'll replace these with actual templates later
  const templates = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://source.unsplash.com/random/300x520?person&sig=${i+1}`,
  }));

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplateId(id);
  };

  const handleTextPositionChange = (position: "top" | "middle" | "bottom") => {
    setTextPosition(position);
  };

  const handleMusicSelect = () => {
    // Mock selection - in a real app this would open a file picker
    setSelectedMusic("Minecraft 1");
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleRemoveMusic = () => {
    setSelectedMusic(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // If still loading, show a spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to templates</span>
            </Link>
            
            <div className="flex items-center">
              <span className="text-green-500 mr-2">
                <Sparkle className="h-5 w-5 inline" />
              </span>
              <h1 className="text-xl font-semibold">AI UGC Video Creator</h1>
            </div>
          </div>
          
          <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center">
            <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
            <span>more free sounds & ai modals coming soon</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Video settings */}
          <div className="space-y-6">
            {/* Video Text Input */}
            <Card className="bg-gray-50 shadow-sm border-0">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Add Video Text</h2>
                  <Button variant="outline" size="sm" className="bg-gray-200 hover:bg-gray-300 text-gray-700 border-0 flex items-center">
                    generate <Sparkle className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <textarea 
                  className="w-full h-24 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Enter the text you want to show in your video..."
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                />
                
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className={`px-6 py-2 rounded-md ${textPosition === 'top' ? 'bg-gray-200' : 'bg-transparent'}`}
                    onClick={() => handleTextPositionChange('top')}
                  >
                    Top
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`px-6 py-2 rounded-md ${textPosition === 'middle' ? 'bg-green-400 text-white' : 'bg-transparent'}`}
                    onClick={() => handleTextPositionChange('middle')}
                  >
                    Middle
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`px-6 py-2 rounded-md ${textPosition === 'bottom' ? 'bg-gray-200' : 'bg-transparent'}`}
                    onClick={() => handleTextPositionChange('bottom')}
                  >
                    Bottom
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Template Selection */}
            <Card className="bg-gray-50 shadow-sm border-0">
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-medium">Select UGC Template</h2>
                <div className="grid grid-cols-4 gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedTemplateId === template.id
                          ? "border-green-500 ring-2 ring-green-300"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <img
                        src={template.imageUrl}
                        alt={`Template ${template.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Call to Action */}
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-lg font-medium">Call to Action</h2>
                <Info className="h-4 w-4 ml-2 text-gray-400" />
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Image className="h-6 w-6" />
                </div>
                <p className="text-center">Click to upload CTA video</p>
                <p className="text-center text-sm text-gray-400 mt-1">3-15 seconds</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Preview and Music */}
          <div className="space-y-6">
            {/* Video Preview */}
            <Card className="bg-gray-50 shadow-sm border-0 p-0 overflow-hidden">
              <div className="aspect-[9/16] bg-black">
                {selectedTemplateId ? (
                  <div className="relative w-full h-full">
                    <img
                      src={`https://source.unsplash.com/random/400x720?person&sig=${selectedTemplateId}`}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                    {adText && (
                      <div className={`absolute left-1/2 -translate-x-1/2 w-full px-4 text-center
                        ${textPosition === 'top' ? 'top-16' : 
                          textPosition === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-16'}`}>
                        <span className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-lg font-medium">
                          {adText}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <p>Select a template to preview</p>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Music Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="text-lg font-medium">Upload Music</h2>
                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                </div>
                <Button variant="outline" size="sm" className="border border-gray-300 text-gray-700">
                  Free Tracks
                </Button>
              </div>
              
              {selectedMusic ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <Music className="h-5 w-5 text-green-500 mr-2" />
                      <span>{selectedMusic}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-gray-700" onClick={handleRemoveMusic}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-2 flex items-center space-x-2">
                    <button 
                      className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <span className="h-3 w-3 bg-gray-600 rounded-sm"></span>
                      ) : (
                        <span className="h-0 w-0 border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-gray-600 ml-1"></span>
                      )}
                    </button>
                    <div className="text-xs text-gray-600 w-20">
                      0:00 / 0:30
                    </div>
                    <div className="h-1 bg-gray-300 flex-1 rounded-full">
                      <div className="h-full w-0 bg-gray-600 rounded-full"></div>
                    </div>
                    <button className="text-gray-600">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                  
                  <audio 
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Music className="h-6 w-6" />
                  </div>
                  <p className="text-center">Click or drag to upload music</p>
                  <p className="text-center text-sm text-gray-400 mt-1">MP3, WAV files accepted</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Generate Video Button */}
        <div className="mt-8">
          <Button 
            className="w-full py-6 bg-green-500 hover:bg-green-600 text-white font-medium text-lg"
            onClick={() => alert("Video generation would start here")}
          >
            <Image className="h-5 w-5 mr-2" /> Generate Video
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Creator;
