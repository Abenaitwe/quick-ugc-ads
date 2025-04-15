import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

interface Template {
  id: number;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: number | null;
  handleTemplateSelect: (id: number) => void;
  isLoading?: boolean;
  error?: string | null;
}

const TemplateSelector = ({ 
  templates, 
  selectedTemplateId, 
  handleTemplateSelect,
  isLoading = false,
  error = null
}: TemplateSelectorProps) => {
  // Hardcoded template with thumbnail for backup
  const hardcodedTemplate = {
    id: 999,
    videoUrl: "https://tsflchdtmzqaavrwidoq.supabase.co/storage/v1/object/public/templates/UGC/111da97d-40cb-4a52-9611-adacc0f65d9e.mp4",
    thumbnailUrl: "/lovable-uploads/76593663-89bd-4add-a795-2069e5463b3a.png"
  };
  
  // Use templates array if it's not empty, otherwise use hardcoded template
  const displayTemplates = templates.length > 0 ? templates : [hardcodedTemplate];
  
  // Handle template selection with proper logging
  const onTemplateSelect = (template: Template) => {
    console.log("Template selected:", template.id);
    console.log("Template URL:", template.videoUrl);
    handleTemplateSelect(template.id);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-base font-medium mb-3">Select UGC Template</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="aspect-square rounded-lg bg-gray-200 animate-pulse"
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))
        ) : displayTemplates.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            {error ? 'Failed to load templates' : 'No templates available'}
          </div>
        ) : (
          displayTemplates.map((template) => (
            <div
              key={template.id}
              className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all relative ${
                selectedTemplateId === template.id
                  ? "border-green-500 ring-1 ring-green-300"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onTemplateSelect(template)}
            >
              <img
                src={template.thumbnailUrl || "/placeholder.svg"}
                className="w-full h-full object-cover"
                alt="Template thumbnail"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
