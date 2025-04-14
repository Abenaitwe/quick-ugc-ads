
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-base font-medium mb-3">Select UGC Template</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-3 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {isLoading ? (
          // Show loading skeletons while templates are being fetched
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="aspect-square rounded-lg bg-gray-200 animate-pulse"
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))
        ) : templates.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            {error ? 'Failed to load templates' : 'No templates available'}
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                selectedTemplateId === template.id
                  ? "border-green-500 ring-1 ring-green-300"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <video
                src={template.videoUrl}
                className="w-full h-full object-cover"
                preload="metadata"
                onError={(e) => console.error(`Error loading video ${template.id}:`, e)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
