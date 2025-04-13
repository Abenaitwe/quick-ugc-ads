
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkle, Info, Music, Image, Upload, X, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Template {
  id: number;
  imageUrl: string;
}

const Creator = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [adText, setAdText] = useState("Your taste.....");
  const [textPosition, setTextPosition] = useState<"top" | "middle" | "bottom">("middle");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(1);
  const [selectedMusic, setSelectedMusic] = useState<string | null>("Minecraft 1");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Generate some sample templates - we'll replace these with actual templates later
  const templates = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://source.unsplash.com/random/300x300?portrait&sig=${i+1}`,
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
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left column - Video settings (35%) */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Video Text Input */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-medium">Add Video Text</h2>
                <Button variant="outline" size="sm" className="text-xs bg-gray-200 hover:bg-gray-300 border-0 flex items-center gap-1 px-3 py-1">
                  generate <Sparkle className="h-3 w-3" />
                </Button>
              </div>
              
              <Textarea 
                className="w-full h-20 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-3 text-sm"
                placeholder="Your taste....."
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
              />
              
              <div className="flex justify-between items-center">
                <button 
                  className={`px-4 py-1.5 rounded-md text-sm ${textPosition === 'top' ? 'bg-gray-200' : 'bg-transparent'}`}
                  onClick={() => handleTextPositionChange('top')}
                >
                  Top
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-md text-sm ${textPosition === 'middle' ? 'bg-green-400 text-white' : 'bg-transparent'}`}
                  onClick={() => handleTextPositionChange('middle')}
                >
                  Middle
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-md text-sm ${textPosition === 'bottom' ? 'bg-gray-200' : 'bg-transparent'}`}
                  onClick={() => handleTextPositionChange('bottom')}
                >
                  Bottom
                </button>
              </div>
            </div>
            
            {/* Template Selection */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-base font-medium mb-3">Select UGC Template</h2>
              <div className="grid grid-cols-4 gap-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedTemplateId === template.id
                        ? "border-green-500 ring-1 ring-green-300"
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
            
            {/* Call to Action */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <h2 className="text-base font-medium">Call to Action</h2>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500">
                <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Image className="h-5 w-5" />
                </div>
                <p className="text-center text-sm">Click to upload CTA video</p>
                <p className="text-center text-xs text-gray-400 mt-1">3-15 seconds</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Preview and Music (65%) */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Video Preview */}
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden">
                {selectedTemplateId ? (
                  <div className="relative w-full h-full">
                    <img
                      src={`https://source.unsplash.com/random/600x1067?portrait&sig=${selectedTemplateId}`}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                    {adText && (
                      <div className={`absolute left-1/2 -translate-x-1/2 w-full px-4 text-center
                        ${textPosition === 'top' ? 'top-16' : 
                          textPosition === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-16'}`}>
                        <span className="backdrop-blur-sm px-4 py-2 rounded-lg text-white text-base font-medium">
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
            </div>
            
            {/* Music Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <h2 className="text-base font-medium">Upload Music</h2>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <Button variant="outline" size="sm" className="border border-gray-300 text-gray-700 text-xs">
                  Free Tracks
                </Button>
              </div>
              
              {selectedMusic ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <Music className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{selectedMusic}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-gray-700" onClick={handleRemoveMusic}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-2 flex items-center space-x-3">
                    <button 
                      className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <span className="h-2.5 w-2.5 bg-gray-600 rounded-sm"></span>
                      ) : (
                        <span className="h-0 w-0 border-t-[5px] border-b-[5px] border-l-[8px] border-transparent border-l-gray-600 ml-0.5"></span>
                      )}
                    </button>
                    <div className="text-xs text-gray-600">
                      0:00 / 0:30
                    </div>
                    <div className="h-1 bg-gray-300 flex-1 rounded-full">
                      <div className="h-full w-0 bg-gray-600 rounded-full"></div>
                    </div>
                    <button className="text-gray-600">
                      <Volume2 className="h-4 w-4" />
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
        <div className="mt-6">
          <Button 
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-medium text-base"
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
