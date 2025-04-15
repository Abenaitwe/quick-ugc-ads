
import React from "react";
import { Button } from "@/components/ui/button";
import { Video, Loader2 } from "lucide-react";
import { useCreator } from "@/contexts/CreatorContext";
import { toast } from "sonner";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const GenerateButton = ({
  onClick,
  disabled = false
}: GenerateButtonProps) => {
  const { isGeneratingVideo } = useCreator();
  
  return (
    <Button 
      onClick={onClick} 
      className="w-full py-4 text-white font-medium text-base bg-violet-500 hover:bg-violet-400"
      disabled={disabled || isGeneratingVideo}
    >
      {isGeneratingVideo ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...
        </>
      ) : (
        <>
          <Video className="h-5 w-5 mr-2" /> Generate Video
        </>
      )}
    </Button>
  );
};

export default GenerateButton;
