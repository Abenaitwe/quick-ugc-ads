
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
    <div className="template-grid">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`template-item ${selectedId === template.id ? "selected" : ""}`}
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
    </div>
  );
};

export default TemplateGrid;
