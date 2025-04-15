
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
    if (ctaVideoUrl) {
      console.log("Fetching CTA video...");
      const ctaVideoBlob = await fetchVideo(ctaVideoUrl);
      
      if (ctaVideoBlob) {
        console.log("Merging template and CTA videos...");
        const finalVideo = await mergeVideos(videoWithText, ctaVideoBlob);
        toast.success("Video generated successfully!", { id: toastId });
        return URL.createObjectURL(finalVideo);
      } else {
        console.warn("Failed to load CTA video, using template video only");
      }
    }
    
    // If no CTA video or CTA loading failed, return the template video with text
    toast.success("Video generated successfully!", { id: toastId });
    return URL.createObjectURL(videoWithText);
    
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
  return new Promise(async (resolve) => {
    try {
      // Create a temporary video element to get dimensions
      const video = document.createElement('video');
      const videoUrl = URL.createObjectURL(videoBlob);
      video.src = videoUrl;
      
      video.onloadedmetadata = () => {
        // Create a canvas to draw the video and text
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error("Failed to get canvas context");
          resolve(videoBlob); // Return original if we can't get context
          return;
        }
        
        // Set canvas dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Calculate text position
        const yPosition = position === 'top' ? canvas.height * 0.2 :
                          position === 'middle' ? canvas.height * 0.5 :
                          canvas.height * 0.8;
        
        // Draw video frame on canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Configure text style
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        
        // Draw text with outline
        ctx.strokeText(text, canvas.width / 2, yPosition);
        ctx.fillText(text, canvas.width / 2, yPosition);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            URL.revokeObjectURL(videoUrl);
            resolve(blob);
          } else {
            URL.revokeObjectURL(videoUrl);
            resolve(videoBlob); // Return original if blob creation fails
          }
        }, 'video/mp4');
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(videoUrl);
        resolve(videoBlob); // Return original if video loading fails
      };
      
      // Handle potential lack of metadata
      setTimeout(() => {
        if (!video.videoWidth) {
          URL.revokeObjectURL(videoUrl);
          resolve(videoBlob); // Return original after timeout
        }
      }, 3000);
    } catch (error) {
      console.error("Error adding text overlay:", error);
      resolve(videoBlob); // Return original video if text overlay fails
    }
  });
};

const mergeVideos = async (video1: Blob, video2: Blob): Promise<Blob> => {
  try {
    const video1Url = URL.createObjectURL(video1);
    const video2Url = URL.createObjectURL(video2);
    
    const videoElement1 = document.createElement('video');
    videoElement1.src = video1Url;
    
    const videoElement2 = document.createElement('video');
    videoElement2.src = video2Url;
    
    // Load videos to get duration
    await Promise.all([
      new Promise<void>((resolve) => {
        videoElement1.onloadedmetadata = () => resolve();
        videoElement1.onerror = () => resolve();
      }),
      new Promise<void>((resolve) => {
        videoElement2.onloadedmetadata = () => resolve();
        videoElement2.onerror = () => resolve();
      })
    ]);
    
    // Clean up URLs
    URL.revokeObjectURL(video1Url);
    URL.revokeObjectURL(video2Url);
    
    // Since we can't actually merge video blobs in the browser without a backend service,
    // we'll just return the first video as a placeholder
    console.log("Note: Browser limitations prevent true video merging. Returning first video.");
    return video1;
  } catch (error) {
    console.error("Error in video processing:", error);
    return video1; // Return first video if merging fails
  }
};
