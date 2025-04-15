
import React, { useEffect, useRef, useState } from "react";
import { Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VideoData {
  url: string;
  adText?: string;
  textPosition?: "top" | "middle" | "bottom";
  hasCta?: boolean;
}

interface FinalVideoDisplayProps {
  videoUrl: string;
  onClose: () => void;
}

const FinalVideoDisplay = ({ videoUrl, onClose }: FinalVideoDisplayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  useEffect(() => {
    // Log the video URL to help with debugging
    console.log("Final video display received URL:", videoUrl);
    
    // Try to get any stored metadata from sessionStorage
    try {
      const storedData = sessionStorage.getItem("processedVideoData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log("Retrieved stored video data:", parsedData);
        setVideoData(parsedData);
      } else {
        // If no metadata, just use the URL
        setVideoData({ url: videoUrl });
      }
    } catch (error) {
      console.error("Error retrieving stored video data:", error);
      setVideoData({ url: videoUrl });
    }
    
    // Try to load the video when component mounts
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    // Cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [videoUrl]);

  const handleDownload = () => {
    try {
      console.log("Starting download of video from URL:", videoUrl);
      
      // Using fetch to ensure we get the full video data
      fetch(videoUrl)
        .then(response => response.blob())
        .then(blob => {
          // Create a download link
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `generated-video-${Date.now()}.mp4`;
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
          }, 100);
          
          toast.success("Download started");
        })
        .catch(err => {
          console.error("Error downloading video:", err);
          toast.error("Failed to download video");
        });
    } catch (error) {
      console.error("Error in download handler:", error);
      toast.error("Download failed");
    }
  };

  const handleVideoError = () => {
    console.error("Error loading final video from URL:", videoUrl);
    setHasError(true);
    setIsLoading(false);
    toast.error("There was a problem loading the video");
  };
  
  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setIsLoading(false);
    setHasError(false);
  };
  
  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Determine text position class
  const getTextPositionClass = () => {
    if (!videoData?.textPosition) return "top-1/2 -translate-y-1/2"; // Default to middle
    
    switch (videoData.textPosition) {
      case "top":
        return "top-16";
      case "middle":
        return "top-1/2 -translate-y-1/2";
      case "bottom":
        return "bottom-16";
      default:
        return "top-1/2 -translate-y-1/2";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-medium">Generated Video</h2>
        </div>
        
        <div className="aspect-[9/16] bg-black relative flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
              <div className="h-8 w-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          )}
          
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white p-4 text-center z-20">
              <AlertCircle className="w-8 h-8 mb-2 text-red-400" />
              <p className="text-lg font-medium">Error loading video</p>
              <p className="text-sm text-gray-300 mt-1">The video could not be loaded</p>
              <Button 
                className="mt-4 bg-green-600 hover:bg-green-700"
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </div>
          )}
          
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl}
              className="max-h-full max-w-full object-contain"
              controls
              autoPlay
              loop
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
            />
            
            {/* Text overlay */}
            {videoData?.adText && !isLoading && !hasError && (
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-full px-4 text-center z-10 ${getTextPositionClass()}`}
              >
                <span className="inline-block backdrop-blur-sm bg-black/30 px-4 py-2 rounded-lg text-white text-2xl font-bold shadow-lg">
                  {videoData.adText}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={handleDownload} 
            className="bg-green-600 hover:bg-green-500"
            disabled={isLoading || hasError}
          >
            <Download className="h-4 w-4 mr-2" /> Download Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalVideoDisplay;
