
import React from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton = ({ onClick }: GenerateButtonProps) => {
  return (
    <Button 
      className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-medium text-base"
      onClick={onClick}
    >
      <Video className="h-5 w-5 mr-2" /> Generate Video
    </Button>
  );
};

export default GenerateButton;
