
import React, { useEffect, useState } from "react";
import VideoPreview from "@/components/creator/VideoPreview";
import MusicSelector from "@/components/creator/MusicSelector";
import { useCreator } from "@/contexts/CreatorContext";
import { toast } from "sonner";

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
  
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Effect to update the video URL when a template is selected
  useEffect(() => {
    if (!selectedTemplateId) {
      setVideoUrl(undefined);
      return;
    }
    
    // Find the template with the matching ID
    const template = templates.find(t => t.id === selectedTemplateId);
    
    if (template) {
      console.log("Selected template found:", template);
      setVideoUrl(template.videoUrl);
      setVideoError(null); // Reset any previous errors
    } else {
      // If we have a hardcoded template for backup
      const hardcodedTemplate = {
        id: 999,
        videoUrl: "https://tsflchdtmzqaavrwidoq.supabase.co/storage/v1/object/public/templates/UGC/111da97d-40cb-4a52-9611-adacc0f65d9e.mp4",
      };
      
      if (selectedTemplateId === hardcodedTemplate.id) {
        console.log("Using hardcoded template");
        setVideoUrl(hardcodedTemplate.videoUrl);
        setVideoError(null); // Reset any previous errors
      } else {
        console.error("Selected template not found:", selectedTemplateId);
        setVideoUrl(undefined);
        setVideoError("Template not found");
        toast.error("Selected template not found");
      }
    }
  }, [selectedTemplateId, templates]);

  console.log("Current video URL in PreviewSection:", videoUrl);

  return (
    <div className="col-span-12 lg:col-span-8 space-y-4">
      <VideoPreview 
        selectedTemplateId={selectedTemplateId}
        videoUrl={videoUrl}
        videoError={videoError}
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
