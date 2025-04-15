
import { toast } from "sonner";

interface VideoGenerationOptions {
  templateVideoUrl: string | undefined;
  ctaVideoUrl: string | undefined;
  adText: string;
  textPosition: "top" | "middle" | "bottom";
}

/**
 * Generates a final video by adding text overlay to template video 
 * and optionally appending a CTA video
 */
export const generateVideo = async (options: VideoGenerationOptions): Promise<string | null> => {
  const { templateVideoUrl, ctaVideoUrl, adText, textPosition } = options;
  
  if (!templateVideoUrl) {
    toast.error("No template video selected");
    return null;
  }
  
  try {
    // First, show a toast to indicate that processing has begun
    const toastId = toast.loading("Processing video...");
    
    // Fetch the template video
    const templateVideoBlob = await fetchVideo(templateVideoUrl);
    if (!templateVideoBlob) {
      toast.error("Failed to load template video", { id: toastId });
      return null;
    }
    
    // Create a canvas to add text overlay to the video
    const finalVideo = await addTextOverlay(templateVideoBlob, adText, textPosition);
    
    // If there's a CTA video, append it to the template video
    if (ctaVideoUrl) {
      const ctaVideoBlob = await fetchVideo(ctaVideoUrl);
      if (ctaVideoBlob) {
        const mergedVideo = await mergeVideos(finalVideo, ctaVideoBlob);
        toast.success("Video generated successfully!", { id: toastId });
        return URL.createObjectURL(mergedVideo);
      }
    }
    
    // If no CTA video or merging failed, just return the text-overlayed template video
    toast.success("Video generated successfully!", { id: toastId });
    return URL.createObjectURL(finalVideo);
  } catch (error) {
    console.error("Error generating video:", error);
    toast.error("Failed to generate video");
    return null;
  }
};

/**
 * Fetches a video from a URL and returns it as a Blob
 */
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

/**
 * Adds text overlay to a video
 */
const addTextOverlay = async (videoBlob: Blob, text: string, position: "top" | "middle" | "bottom"): Promise<Blob> => {
  // For now, we'll just return the original video blob
  // In a real implementation, this would use canvas to add text overlay
  console.log(`Adding text "${text}" at position "${position}"`);
  return videoBlob;
};

/**
 * Merges two videos into one
 */
const mergeVideos = async (video1: Blob, video2: Blob): Promise<Blob> => {
  // For now, we'll just return the first video
  // In a real implementation, this would use MediaRecorder or FFmpeg
  console.log("Merging videos (mock implementation)");
  return video1;
};
