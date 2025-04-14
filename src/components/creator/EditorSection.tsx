
import React from "react";
import TextEditor from "@/components/creator/TextEditor";
import TemplateSelector from "@/components/creator/TemplateSelector";
import CallToActionUpload from "@/components/creator/CallToActionUpload";
import { useCreator } from "@/contexts/CreatorContext";

interface EditorSectionProps {
  isLoadingTemplates: boolean;
  error: string | null;
  templates: Array<{ id: number; videoUrl: string; thumbnailUrl?: string; }>;
}

const EditorSection: React.FC<EditorSectionProps> = ({ 
  isLoadingTemplates,
  error,
  templates
}) => {
  const { 
    adText, 
    setAdText, 
    textPosition, 
    setTextPosition,
    selectedTemplateId,
    setSelectedTemplateId
  } = useCreator();

  return (
    <div className="col-span-12 lg:col-span-4 space-y-4">
      <TextEditor 
        adText={adText}
        setAdText={setAdText}
        textPosition={textPosition}
        handleTextPositionChange={setTextPosition}
      />
      
      <TemplateSelector 
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        handleTemplateSelect={setSelectedTemplateId}
        isLoading={isLoadingTemplates}
        error={error}
      />
      
      <CallToActionUpload />
    </div>
  );
};

export default EditorSection;
