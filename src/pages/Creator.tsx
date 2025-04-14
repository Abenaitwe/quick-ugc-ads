
import React from "react";
import { toast } from "sonner";
import CreatorLayout from "@/components/creator/CreatorLayout";
import EditorSection from "@/components/creator/EditorSection";
import PreviewSection from "@/components/creator/PreviewSection";
import GenerateButton from "@/components/creator/GenerateButton";
import { CreatorProvider } from "@/contexts/CreatorContext";
import { useTemplates } from "@/hooks/useTemplates";

const Creator = () => {
  const { templates, isLoadingTemplates, error } = useTemplates();

  const handleGenerateVideo = () => {
    alert("Video generation would start here");
  };

  return (
    <CreatorProvider>
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
          <GenerateButton onClick={handleGenerateVideo} />
        </div>
      </CreatorLayout>
    </CreatorProvider>
  );
};

export default Creator;
