
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, Upload, Image, Music, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TemplateGrid from "@/components/TemplateGrid";
import AdPreview from "@/components/AdPreview";

// Sample templates - in production these would come from a backend
const TEMPLATE_COUNT = 24;
const sampleTemplates = Array.from({ length: TEMPLATE_COUNT }).map((_, i) => ({
  id: i + 1,
  imageUrl: `https://source.unsplash.com/random/300x500?portrait&sig=${i}`,
}));

// Sample tracks - in production these would come from a backend
const freeTracks = [
  { id: 1, name: "Upbeat Pop", duration: "0:30" },
  { id: 2, name: "Trending Dance", duration: "0:45" },
  { id: 3, name: "Summer Vibes", duration: "0:30" },
  { id: 4, name: "Epic Moment", duration: "0:35" },
  { id: 5, name: "Chill Lofi", duration: "0:40" },
];

const Creator: React.FC = () => {
  const [adText, setAdText] = useState("");
  const [textPosition, setTextPosition] = useState<"top" | "middle" | "bottom">("middle");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<{id: number, name: string} | null>(null);
  const [uploadedMusic, setUploadedMusic] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    toast.success("Template selected!");
  };

  const handleMusicSelect = (id: number, name: string) => {
    setSelectedMusic({ id, name });
    setUploadedMusic(null);
    toast.success(`Selected track: ${name}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "audio/mpeg" || file.type === "audio/wav") {
        setUploadedMusic(file);
        setSelectedMusic(null);
        toast.success(`Uploaded: ${file.name}`);
      } else {
        toast.error("Please upload MP3 or WAV files only");
      }
    }
  };

  const handleGenerateAd = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    if (!adText) {
      toast.error("Please add some text for your ad");
      return;
    }

    if (!selectedMusic && !uploadedMusic) {
      toast.error("Please select or upload music");
      return;
    }

    setIsGenerating(true);
    toast.success("Generating your UGC ad...");
    
    // Simulate ad generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Your UGC ad is ready!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              <h1 className="font-semibold text-xl">UGC Ad Creator</h1>
            </div>
          </div>
          
          <div className="bg-green-100 px-4 py-2 rounded-full flex items-center">
            <span className="bg-green-500 rounded-full w-2 h-2 block mr-2"></span>
            <span className="text-sm text-green-800">more free sounds & templates coming soon</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          {/* Text Input Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Video Text</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <Wand2 className="h-4 w-4" />
                generate
              </Button>
            </div>
            
            <textarea 
              className="w-full border rounded-md p-4 h-24 mb-4"
              placeholder="Enter the text you want to show in your video..."
              value={adText}
              onChange={(e) => setAdText(e.target.value)}
            />
            
            <div className="flex justify-between gap-2">
              <button 
                className={`text-position-button flex-1 ${textPosition === 'top' ? 'active' : 'bg-gray-100'}`}
                onClick={() => setTextPosition('top')}
              >
                Top
              </button>
              <button 
                className={`text-position-button flex-1 ${textPosition === 'middle' ? 'active' : 'bg-gray-100'}`}
                onClick={() => setTextPosition('middle')}
              >
                Middle
              </button>
              <button 
                className={`text-position-button flex-1 ${textPosition === 'bottom' ? 'active' : 'bg-gray-100'}`}
                onClick={() => setTextPosition('bottom')}
              >
                Bottom
              </button>
            </div>
          </section>
          
          {/* Template Selection Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Select UGC Template</h2>
            <TemplateGrid 
              templates={sampleTemplates}
              selectedId={selectedTemplate}
              onSelect={handleTemplateSelect}
            />
          </section>
          
          {/* Call to Action Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold mr-2">Call to Action</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64">Add a short CTA video that will appear at the end of your ad.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="upload-area border-gray-300">
              <Image className="h-10 w-10 text-gray-400 mb-2" />
              <p className="font-medium">Click to upload CTA video</p>
              <p className="text-sm text-gray-500">3-15 seconds</p>
            </div>
          </section>
          
          {/* Music Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold mr-2">Upload Music</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">Add background music to your UGC ad.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => setSelectedMusic(freeTracks[0])}
                className="text-sm"
              >
                Free Tracks
              </Button>
            </div>
            
            {selectedMusic ? (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-purple-600" />
                  <span>{selectedMusic.name}</span>
                </div>
                <button 
                  onClick={() => setSelectedMusic(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            ) : uploadedMusic ? (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-purple-600" />
                  <span>{uploadedMusic.name}</span>
                </div>
                <button 
                  onClick={() => setUploadedMusic(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div 
                className="upload-area border-gray-300 mb-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/mpeg,audio/wav"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Music className="h-10 w-10 text-gray-400 mb-2" />
                <p className="font-medium">Click or drag to upload music</p>
                <p className="text-sm text-gray-500">MP3, WAV files accepted</p>
              </div>
            )}
            
            {!uploadedMusic && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Or choose from our free tracks:</p>
                {freeTracks.map(track => (
                  <div 
                    key={track.id}
                    onClick={() => handleMusicSelect(track.id, track.name)}
                    className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                      selectedMusic?.id === track.id 
                        ? 'bg-purple-100 border border-purple-200' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Music className={`h-5 w-5 ${selectedMusic?.id === track.id ? 'text-purple-600' : 'text-gray-500'}`} />
                      <span>{track.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{track.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        
        {/* Right Column - Preview & Generate */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
            <AdPreview 
              templateId={selectedTemplate} 
              text={adText}
              textPosition={textPosition}
            />
            
            <div className="mt-auto pt-6">
              <Button
                className="w-full py-6 text-lg bg-green-500 hover:bg-green-600" 
                disabled={isGenerating || !selectedTemplate || !adText || (!selectedMusic && !uploadedMusic)}
                onClick={handleGenerateAd}
              >
                <Image className="mr-2 h-5 w-5" />
                {isGenerating ? "Generating..." : "Generate Video"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Creator;
