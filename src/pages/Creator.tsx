
import React from "react";
import { toast } from "sonner";
import CreatorLayout from "@/components/creator/CreatorLayout";
import EditorSection from "@/components/creator/EditorSection";
import PreviewSection from "@/components/creator/PreviewSection";
import GenerateButton from "@/components/creator/GenerateButton";
import FinalVideoDisplay from "@/components/creator/FinalVideoDisplay";
import { CreatorProvider, useCreator } from "@/contexts/CreatorContext";
import { useTemplates } from "@/hooks/useTemplates";
import { generateVideo } from "@/utils/videoGenerator";

// Separate inner component to use context hooks
const CreatorContent = () => {
  const { templates, isLoadingTemplates, error } = useTemplates();
  const { 
    adText, 
    textPosition, 
    selectedTemplateId, 
    setSelectedTemplateId,
    ctaVideo,
    generatedVideoUrl,
    setGeneratedVideoUrl,
    isGeneratingVideo,
    setIsGeneratingVideo
  } = useCreator();

  // Get the selected template video URL
  const getSelectedTemplateUrl = () => {
    console.log("Getting template URL for ID:", selectedTemplateId);
    console.log("Available templates:", templates);
    
    // Find the template with the matching ID from the templates array
    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
    
    if (selectedTemplate) {
      console.log("Found template:", selectedTemplate);
      return selectedTemplate.videoUrl;
    }
    
    // If not found in the templates array, check for hardcoded template
    if (selectedTemplateId === 999) {
      console.log("Using hardcoded template");
      return "https://tsflchdtmzqaavrwidoq.supabase.co/storage/v1/object/public/templates/UGC/111da97d-40cb-4a52-9611-adacc0f65d9e.mp4";
    }
    
    console.log("No template found for ID:", selectedTemplateId);
    return null;
  };

  const handleGenerateVideo = async () => {
    console.log("Generating video with template ID:", selectedTemplateId);
    
    if (!selectedTemplateId) {
      toast.error("Please select a template first");
      return;
    }

    const templateUrl = getSelectedTemplateUrl();
    
    if (!templateUrl) {
      toast.error("Template video not found");
      return;
    }

    // Set generating state to true
    setIsGeneratingVideo(true);
    
    try {
      // Call the video generation utility with the selected template URL
      const finalVideoUrl = await generateVideo({
        templateVideoUrl: templateUrl,
        ctaVideoUrl: ctaVideo?.url,
        adText,
        textPosition,
      });
      
      if (finalVideoUrl) {
        setGeneratedVideoUrl(finalVideoUrl);
        toast.success("Video successfully generated!");
      }
    } catch (error) {
      console.error("Error in video generation:", error);
      toast.error("Failed to generate video");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleCloseVideoModal = () => {
    // Revoke the object URL to free up memory
    if (generatedVideoUrl) {
      URL.revokeObjectURL(generatedVideoUrl);
    }
    setGeneratedVideoUrl(null);
  };

  // Only disable the button if templates are still loading
  const generateButtonDisabled = isLoadingTemplates;

  return (
    <CreatorLayout>
      <div className="grid grid-cols-12 gap-4">
        <EditorSection 
          isLoadingTemplates={isLoadingTemplates}
          error={error}
          templates={templates}
        />
        
        <PreviewSection 
          isLoadingTemplates={isLoadingTemplates}
          templates={templates}
        />
      </div>
      
      <div className="mt-6">
        <GenerateButton 
          onClick={handleGenerateVideo} 
          disabled={generateButtonDisabled}
        />
      </div>

      {generatedVideoUrl && (
        <FinalVideoDisplay
          videoUrl={generatedVideoUrl}
          onClose={handleCloseVideoModal}
        />
      )}
    </CreatorLayout>
  );
};

// Wrapper component that provides the context
const Creator = () => {
  return (
    <CreatorProvider>
      <CreatorContent />
    </CreatorProvider>
  );
};

export default Creator;
