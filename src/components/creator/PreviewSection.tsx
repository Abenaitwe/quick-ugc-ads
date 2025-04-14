
import React from "react";
import VideoPreview from "@/components/creator/VideoPreview";
import MusicSelector from "@/components/creator/MusicSelector";
import { useCreator } from "@/contexts/CreatorContext";

interface PreviewSectionProps {
  isLoadingTemplates: boolean;
  templates: Array<{ id: number; videoUrl: string; thumbnailUrl?: string; }>;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ 
  isLoadingTemplates,
  templates 
}) => {
  const { 
    selectedTemplateId,
    adText,
    textPosition,
    selectedMusic,
    setSelectedMusic,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime
  } = useCreator();

  const getSelectedVideoUrl = () => {
    if (!selectedTemplateId) return undefined;
    const template = templates.find(t => t.id === selectedTemplateId);
    return template ? template.videoUrl : undefined;
  };

  return (
    <div className="col-span-12 lg:col-span-8 space-y-4">
      <VideoPreview 
        selectedTemplateId={selectedTemplateId}
        videoUrl={getSelectedVideoUrl()}
        adText={adText}
        textPosition={textPosition}
        isLoading={isLoadingTemplates}
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
  );
};

export default PreviewSection;
