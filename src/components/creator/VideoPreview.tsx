import React, { useRef, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface VideoPreviewProps {
  selectedTemplateId: number | null;
  videoUrl?: string;
  videoError?: string | null;
  adText: string;
  textPosition: "top" | "middle" | "bottom";
  isLoading?: boolean;
}

const VideoPreview = ({
  selectedTemplateId,
  videoUrl,
  videoError,
  adText,
  textPosition,
  isLoading = false
}: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log("VideoPreview received videoUrl:", videoUrl);
    
    setVideoLoaded(false);
    setLocalError(null);
    
    if (!videoUrl) return;
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;
    
    const videoElement = videoRef.current;
    
    const handleCanPlay = () => {
      console.log("Video can play now");
      setVideoLoaded(true);
      if (!window.matchMedia("(max-width: 768px)").matches) {
        videoElement.play()
          .then(() => {
            console.log("Video playing successfully");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Error playing video:", err);
            setLocalError("Autoplay restricted. Please click play.");
          });
      }
    };
    
    const handleError = (e: Event) => {
      console.error("Video error event:", e);
      setLocalError("Failed to load video");
      setVideoLoaded(false);
    };
    
    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("error", handleError);
    
    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("error", handleError);
    };
  }, [videoUrl, videoRef.current]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => {
          console.log("Video started playing on click");
          setIsPlaying(true);
        })
        .catch(err => {
          console.error("Failed to play video on click:", err);
          setLocalError("Unable to play video. Please try again.");
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const error = videoError || localError;

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden relative">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : !selectedTemplateId ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p>Select a template to preview</p>
          </div>
        ) : !videoUrl ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p>No video URL available</p>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center" onClick={handleVideoClick}>
            {!videoLoaded && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                <div className="h-8 w-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                ref={videoRef}
                src={videoUrl}
                className="h-full w-full object-contain"
                controls={videoLoaded}
                loop
                playsInline
                poster="/placeholder.svg"
                muted
              />
            </div>
            
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white p-4 text-center">
                <AlertCircle className="w-8 h-8 mb-2 text-red-400" />
                <p className="text-lg font-medium">Error loading video</p>
                <p className="text-sm text-gray-300 mt-1">{error}</p>
                <button 
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                    setLocalError(null);
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
            
            {adText && videoLoaded && (
              <div 
                className={`absolute left-1/2 -translate-x-1/2 w-full px-4 text-center z-10
                  ${textPosition === 'top' ? 'top-16' : 
                    textPosition === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-16'}`}
              >
                <span className="inline-block backdrop-blur-sm bg-black/30 px-4 py-2 rounded-lg text-white text-2xl font-bold shadow-lg">
                  {adText}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
