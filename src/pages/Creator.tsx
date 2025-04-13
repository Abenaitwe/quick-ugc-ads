
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/creator/Header";
import TextEditor from "@/components/creator/TextEditor";
import TemplateSelector from "@/components/creator/TemplateSelector";
import CallToActionUpload from "@/components/creator/CallToActionUpload";
import VideoPreview from "@/components/creator/VideoPreview";
import MusicSelector from "@/components/creator/MusicSelector";
import GenerateButton from "@/components/creator/GenerateButton";

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

  const handleGenerateVideo = () => {
    alert("Video generation would start here");
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
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left column - Video settings (35%) */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <TextEditor 
              adText={adText}
              setAdText={setAdText}
              textPosition={textPosition}
              handleTextPositionChange={handleTextPositionChange}
            />
            
            <TemplateSelector 
              templates={templates}
              selectedTemplateId={selectedTemplateId}
              handleTemplateSelect={handleTemplateSelect}
            />
            
            <CallToActionUpload />
          </div>
          
          {/* Right column - Preview and Music (65%) */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <VideoPreview 
              selectedTemplateId={selectedTemplateId}
              adText={adText}
              textPosition={textPosition}
            />
            
            <MusicSelector 
              selectedMusic={selectedMusic}
              setSelectedMusic={setSelectedMusic}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          </div>
        </div>
        
        {/* Generate Video Button */}
        <div className="mt-6">
          <GenerateButton onClick={handleGenerateVideo} />
        </div>
      </main>
    </div>
  );
};

export default Creator;
