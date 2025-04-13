
import React from "react";

interface Template {
  id: number;
  imageUrl: string;
}

interface TemplateGridProps {
  templates: Template[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates, selectedId, onSelect }) => {
  return (
    <>
      {templates.map((template) => (
        <div
          key={template.id}
          className={`aspect-[9/16] cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
            selectedId === template.id
              ? "border-purple-500 ring-2 ring-purple-300 scale-[1.02]"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onSelect(template.id)}
        >
          <img
            src={template.imageUrl}
            alt={`Template ${template.id}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </>
  );
};

export default TemplateGrid;
