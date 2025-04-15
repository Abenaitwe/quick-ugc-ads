
import React, { useState, useRef } from "react";
import { Info, Upload, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCreator } from "@/contexts/CreatorContext";
import { toast } from "sonner";

const CallToActionUpload = () => {
  const { ctaVideo, setCtaVideo } = useCreator();
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error("Please select a valid video file");
      return;
    }
    
    // Check file size (limit to 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast.error("Video file is too large. Maximum size is 50MB");
      return;
    }
    
    // Check video duration (handled post-upload)
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      
      // Validate duration (3-15 seconds)
      const duration = Math.round(video.duration);
      if (duration < 3 || duration > 15) {
        toast.error(`Video must be between 3-15 seconds (yours is ${duration}s)`);
        return;
      }
      
      // Create a URL for the video file
      const fileUrl = URL.createObjectURL(file);
      setCtaVideo({
        file,
        url: fileUrl,
        duration,
        name: file.name
      });
      
      toast.success("CTA video uploaded successfully");
    };
    
    video.onerror = () => {
      toast.error("Error loading video. Please try another file.");
      URL.revokeObjectURL(video.src);
    };
    
    video.src = URL.createObjectURL(file);
  };
  
  const handleRemoveVideo = () => {
    if (ctaVideo?.url) {
      URL.revokeObjectURL(ctaVideo.url);
    }
    setCtaVideo(null);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <h2 className="text-base font-medium">Call to Action</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Upload a short video to be shown at the end</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {!ctaVideo ? (
        <div 
          className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={handleUploadClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className={`h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3 ${isHovering ? 'bg-gray-200' : ''}`}>
            <Upload className="h-5 w-5" />
          </div>
          <p className="text-center text-sm">Click to upload CTA video</p>
          <p className="text-center text-xs text-gray-400 mt-1">3-15 seconds</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium truncate">{ctaVideo.name}</p>
            <button 
              onClick={handleRemoveVideo}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove video"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <video 
            src={ctaVideo.url} 
            className="w-full h-auto rounded" 
            controls 
          />
          <p className="text-xs text-gray-400 mt-2">{ctaVideo.duration} seconds</p>
        </div>
      )}
    </div>
  );
};

export default CallToActionUpload;
