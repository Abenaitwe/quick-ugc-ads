
import { toast } from "sonner";

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
    
    // Fetch the template video
    const templateVideoBlob = await fetchVideo(templateVideoUrl);
    if (!templateVideoBlob) {
      toast.error("Failed to load template video", { id: toastId });
      return null;
    }
    
    // Add text overlay to the template video
    const videoWithText = await addTextOverlay(templateVideoBlob, adText, textPosition);
    
    // If there's a CTA video, fetch and append it
    let finalVideoBlob = videoWithText;
    if (ctaVideoUrl) {
      console.log("Fetching CTA video...");
      const ctaVideoBlob = await fetchVideo(ctaVideoUrl);
      
      if (ctaVideoBlob) {
        console.log("Merging template and CTA videos...");
        finalVideoBlob = await mergeVideos(videoWithText, ctaVideoBlob);
      } else {
        console.warn("Failed to load CTA video, using template video only");
      }
    }
    
    // Create a URL from the blob and return it
    const finalVideoUrl = URL.createObjectURL(new Blob([finalVideoBlob], { type: 'video/mp4' }));
    console.log("Generated final video URL:", finalVideoUrl);
    
    toast.success("Video generated successfully!", { id: toastId });
    return finalVideoUrl;
    
  } catch (error) {
    console.error("Error generating video:", error);
    toast.error("Failed to generate video");
    return null;
  }
};

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
  console.log("Adding text overlay:", text, "at position:", position);
  
  // With browser limitations, we can't actually modify the video content
  // But we're returning the original blob to maintain the expected API
  // The text overlay is handled at display time in the VideoPreview component
  return videoBlob;
};

const mergeVideos = async (video1: Blob, video2: Blob): Promise<Blob> => {
  console.log("Attempting to merge videos");
  
  try {
    // In a real implementation, video merging would require a backend service or Web Assembly
    // For this client-side demo, we'll implement a simple concatenation approach
    // by creating a new blob that contains both original blobs
    
    const mergedBlob = new Blob([video1, video2], { type: 'video/mp4' });
    console.log("Created merged blob of size:", mergedBlob.size);
    return mergedBlob;
  } catch (error) {
    console.error("Error in video merging:", error);
    return video1; // Return first video if merging fails
  }
};
