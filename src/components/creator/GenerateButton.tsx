import React from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
interface GenerateButtonProps {
  onClick: () => void;
}
const GenerateButton = ({
  onClick
}: GenerateButtonProps) => {
  return <Button onClick={onClick} className="w-full py-4 text-white font-medium text-base bg-violet-500 hover:bg-violet-400">
      <Video className="h-5 w-5 mr-2" /> Generate Video
    </Button>;
};
export default GenerateButton;