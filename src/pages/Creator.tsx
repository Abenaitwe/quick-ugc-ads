
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/creator/Header";
import TextEditor from "@/components/creator/TextEditor";
import TemplateSelector from "@/components/creator/TemplateSelector";
import CallToActionUpload from "@/components/creator/CallToActionUpload";
import VideoPreview from "@/components/creator/VideoPreview";
import MusicSelector from "@/components/creator/MusicSelector";
import GenerateButton from "@/components/creator/GenerateButton";
import { Skeleton } from "@/components/ui/skeleton";

interface Template {
  id: number;
  videoUrl: string;
  thumbnailUrl?: string;
}

const Creator = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [adText, setAdText] = useState("Your taste.....");
  const [textPosition, setTextPosition] = useState<"top" | "middle" | "bottom">("middle");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string | null>("Minecraft 1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoadingTemplates(true);
      setError(null);
      
      try {
        console.log("Fetching templates from Supabase...");
        
        // List all files in the UGC folder within the templates bucket
        const { data: files, error } = await supabase.storage
          .from('templates')
          .list('UGC', {
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          console.error('Error fetching templates:', error);
          setError(`Failed to fetch templates: ${error.message}`);
          toast.error(`Failed to fetch templates: ${error.message}`);
          return;
        }

        console.log("Files retrieved from Supabase:", files);
        
        if (!files || files.length === 0) {
          console.log("No files found in the UGC folder");
          setError("No template videos found");
          setTemplates([]);
          return;
        }

        // Filter to only include MP4 files
        const videoFiles = files.filter(file => 
          file.name.toLowerCase().endsWith('.mp4')
        );
        
        console.log("Filtered video files:", videoFiles);

        if (videoFiles.length === 0) {
          console.log("No MP4 files found in the UGC folder");
          setError("No MP4 video files found");
          setTemplates([]);
          return;
        }

        // Transform the files into template objects
        const templatesList = videoFiles.map((file, index) => {
          const filePath = `UGC/${file.name}`;
          console.log(`Creating public URL for: ${filePath}`);
          
          const { data: { publicUrl } } = supabase.storage
            .from('templates')
            .getPublicUrl(filePath);
            
          console.log(`Public URL for ${file.name}: ${publicUrl}`);
          
          return {
            id: index + 1,
            videoUrl: publicUrl,
            // We're not using thumbnails for now as they're directly from the video
            thumbnailUrl: undefined,
          };
        });

        console.log("Final templates list:", templatesList);
        setTemplates(templatesList);
        
        // Set the first template as selected if there are templates
        if (templatesList.length > 0 && !selectedTemplateId) {
          setSelectedTemplateId(templatesList[0].id);
        }
      } catch (err) {
        console.error("Unexpected error fetching templates:", err);
        setError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
        toast.error("Failed to load templates");
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []); // Run once on component mount

  const handleTemplateSelect = (id: number) => {
    console.log(`Template selected: ${id}`);
    setSelectedTemplateId(id);
  };

  const handleTextPositionChange = (position: "top" | "middle" | "bottom") => {
    setTextPosition(position);
  };

  const handleGenerateVideo = () => {
    alert("Video generation would start here");
  };

  // Get the selected video URL based on template ID
  const getSelectedVideoUrl = () => {
    if (!selectedTemplateId) return undefined;
    const template = templates.find(t => t.id === selectedTemplateId);
    return template ? template.videoUrl : undefined;
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
              isLoading={isLoadingTemplates}
              error={error}
            />
            
            <CallToActionUpload />
          </div>
          
          {/* Right column - Preview and Music (65%) */}
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
