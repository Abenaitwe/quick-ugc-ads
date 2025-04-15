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
  try {
    // Create a temporary video element to get dimensions
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoBlob);
    
    await new Promise((resolve) => {
      video.onloadedmetadata = resolve;
    });
    
    // Create a canvas to draw the video and text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Failed to get canvas context");
    
    // Set canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Calculate text position
    const yPosition = position === 'top' ? canvas.height * 0.2 :
                     position === 'middle' ? canvas.height * 0.5 :
                     canvas.height * 0.8;
    
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
    const resultBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'video/mp4');
    });
    
    return resultBlob;
  } catch (error) {
    console.error("Error adding text overlay:", error);
    return videoBlob; // Return original video if text overlay fails
  }
};

const mergeVideos = async (video1: Blob, video2: Blob): Promise<Blob> => {
  try {
    // Create MediaRecorder to combine videos
    const stream = new MediaStream();
    const mediaRecorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];
    
    // Add both videos to the stream
    const video1Url = URL.createObjectURL(video1);
    const video2Url = URL.createObjectURL(video2);
    
    const videoElement1 = document.createElement('video');
    videoElement1.src = video1Url;
    await new Promise((resolve) => { videoElement1.onloadedmetadata = resolve; });
    
    const videoElement2 = document.createElement('video');
    videoElement2.src = video2Url;
    await new Promise((resolve) => { videoElement2.onloadedmetadata = resolve; });
    
    // Start recording
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.start();
    
    // Play videos sequentially
    await videoElement1.play();
    await new Promise((resolve) => { setTimeout(resolve, videoElement1.duration * 1000); });
    
    await videoElement2.play();
    await new Promise((resolve) => { setTimeout(resolve, videoElement2.duration * 1000); });
    
    // Stop recording and create final blob
    mediaRecorder.stop();
    
    return new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: 'video/mp4' });
        resolve(finalBlob);
      };
    });
  } catch (error) {
    console.error("Error merging videos:", error);
    return video1; // Return first video if merging fails
  } finally {
    // Clean up URLs
    URL.revokeObjectURL(video1);
    URL.revokeObjectURL(video2);
  }
};
