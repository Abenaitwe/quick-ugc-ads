
import React from "react";

interface Template {
  id: number;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: number | null;
  handleTemplateSelect: (id: number) => void;
}

const TemplateSelector = ({ templates, selectedTemplateId, handleTemplateSelect }: TemplateSelectorProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-base font-medium mb-3">Select UGC Template</h2>
      <div className="grid grid-cols-4 gap-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedTemplateId === template.id
                ? "border-green-500 ring-1 ring-green-300"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            {/* Show thumbnail if available, otherwise use the first frame of the video */}
            {template.thumbnailUrl ? (
              <img
                src={template.thumbnailUrl}
                alt={`Template ${template.id}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <video
                src={template.videoUrl}
                className="w-full h-full object-cover"
                preload="metadata"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
