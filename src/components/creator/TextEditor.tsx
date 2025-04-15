
import React from "react";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TextPositionControl from "./TextPositionControl";

interface TextEditorProps {
  adText: string;
  setAdText: (text: string) => void;
  textPosition: "top" | "middle" | "bottom";
  handleTextPositionChange: (position: "top" | "middle" | "bottom") => void;
}

const TextEditor = ({ adText, setAdText, textPosition, handleTextPositionChange }: TextEditorProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-medium">Add Video Text</h2>
        <Button variant="outline" size="sm" className="text-xs bg-gray-200 hover:bg-gray-300 border-0 flex items-center gap-1 px-3 py-1">
          generate <Sparkle className="h-3 w-3" />
        </Button>
      </div>
      
      <Textarea 
        className="w-full h-20 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none mb-3 text-sm"
        placeholder=""
        value={adText}
        onChange={(e) => setAdText(e.target.value)}
      />
      
      <TextPositionControl 
        textPosition={textPosition}
        handleTextPositionChange={handleTextPositionChange}
      />
    </div>
  );
};

export default TextEditor;
