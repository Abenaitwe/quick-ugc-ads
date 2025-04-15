
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinalVideoDisplayProps {
  videoUrl: string;
  onClose: () => void;
}

const FinalVideoDisplay = ({ videoUrl, onClose }: FinalVideoDisplayProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `generated-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-medium">Generated Video</h2>
        </div>
        
        <div className="aspect-[9/16] bg-black relative">
          <video
            src={videoUrl}
            className="w-full h-full object-contain"
            controls
            autoPlay
            loop
          />
        </div>
        
        <div className="p-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-500">
            <Download className="h-4 w-4 mr-2" /> Download Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalVideoDisplay;
