
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VideoGenerationOptions {
  templateVideoUrl: string | undefined;
  ctaVideoUrl: string | undefined;
  adText: string;
  textPosition: "top" | "middle" | "bottom";
}

export const generateVideo = async (options: VideoGenerationOptions): Promise<string | null> => {
  const { templateVideoUrl, ctaVideoUrl, adText, textPosition } = options;
  
  if (!templateVideoUrl) {
    toast.error("No template video selected");
    return null;
  }
  
  try {
    const toastId = toast.loading("Processing video...");
    
    console.log("Starting video generation process with options:", options);
    console.log("Including CTA video:", ctaVideoUrl ? "Yes" : "No");

    // Call our Supabase Edge Function to process the video
    const { data: processedVideo, error } = await supabase.functions.invoke("process-video", {
      body: { 
        templateVideoUrl, 
        ctaVideoUrl, 
        adText, 
        textPosition,
        includeOverlayInFinal: true  // Make sure text is included in downloaded file
      },
    });

    if (error) {
      console.error("Error from process-video function:", error);
      toast.error("Failed to process video", { id: toastId });
      return null;
    }

    console.log("Received processed video data:", processedVideo);

    // Get the video URL from the response
    const { videoUrl } = processedVideo;
    
    if (!videoUrl) {
      console.error("No video URL in response");
      toast.error("Failed to generate video", { id: toastId });
      return null;
    }

    // Create a VideoDisplay object that includes both the video URL and overlay metadata
    const videoDisplay = {
      url: videoUrl,
      adText,
      textPosition,
      hasCta: !!ctaVideoUrl,
    };

    // Store this in sessionStorage for persistence
    sessionStorage.setItem("processedVideoData", JSON.stringify(videoDisplay));
    
    toast.success("Video generated successfully!", { id: toastId });
    return videoUrl;
    
  } catch (error) {
    console.error("Error generating video:", error);
    toast.error("Failed to generate video");
    return null;
  }
};

// These functions remain in client code for preview functionality,
// but the actual processing happens on the server
const fetchVideo = async (url: string): Promise<Blob | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }
    return await response.blob();
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

const addTextOverlay = async (videoBlob: Blob, text: string, position: "top" | "middle" | "bottom"): Promise<Blob> => {
  console.log("Client-side text overlay preview:", text, "at position:", position);
  return videoBlob;
};

const mergeVideos = async (video1: Blob, video2: Blob): Promise<Blob> => {
  console.log("Client-side video merging preview");
  return video1;
};
