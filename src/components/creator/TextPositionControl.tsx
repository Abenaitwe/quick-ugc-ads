
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignTop, AlignCenter, AlignBottom } from "lucide-react";

interface TextPositionControlProps {
  textPosition: "top" | "middle" | "bottom";
  handleTextPositionChange: (position: "top" | "middle" | "bottom") => void;
}

const TextPositionControl = ({ textPosition, handleTextPositionChange }: TextPositionControlProps) => {
  return (
    <div className="flex justify-between items-center">
      <ToggleGroup type="single" value={textPosition} onValueChange={(value) => 
        value && handleTextPositionChange(value as "top" | "middle" | "bottom")
      }>
        <ToggleGroupItem value="top" aria-label="Align text to top" className="flex-1">
          <AlignTop className="h-4 w-4 mr-1" />
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="middle" aria-label="Align text to middle" className="flex-1">
          <AlignCenter className="h-4 w-4 mr-1" />
          Middle
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Align text to bottom" className="flex-1">
          <AlignBottom className="h-4 w-4 mr-1" />
          Bottom
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TextPositionControl;
