
import React, { useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPreviewProps {
  selectedTemplateId: number | null;
  videoUrl?: string;
  adText: string;
  textPosition: "top" | "middle" | "bottom";
  isLoading?: boolean;
}

const VideoPreview = ({ selectedTemplateId, videoUrl, adText, textPosition, isLoading = false }: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset the video when the template changes
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (selectedTemplateId) {
        // Pause the video initially
        videoRef.current.pause();
      }
    }
  }, [selectedTemplateId]);

  // Log when the video URL changes to help debug
  useEffect(() => {
    console.log("VideoPreview - videoUrl changed:", videoUrl);
  }, [videoUrl]);

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : selectedTemplateId && videoUrl ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover"
              controls
              loop
              playsInline
              poster="/placeholder.svg"
              onError={(e) => {
                console.error("Error loading video in preview:", e);
              }}
              onLoadedData={() => {
                console.log("Video loaded successfully in preview");
              }}
            />
            {adText && (
              <div className={`absolute left-1/2 -translate-x-1/2 w-full px-4 text-center
                ${textPosition === 'top' ? 'top-16' : 
                  textPosition === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-16'}`}>
                <span className="backdrop-blur-sm px-4 py-2 rounded-lg text-white text-base font-medium">
                  {adText}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p>{videoUrl ? "Error loading video" : "Select a template to preview"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
