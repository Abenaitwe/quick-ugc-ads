
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode as base64Decode } from "https://deno.land/std@0.208.0/encoding/base64.ts";

// CORS headers for our API
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Creates a URL from a storage bucket path
function getFileUrl(storagePath: string): string {
  const supabaseUrl = "https://tsflchdtmzqaavrwidoq.supabase.co";
  return `${supabaseUrl}/storage/v1/object/public/${storagePath}`;
}

async function downloadVideo(url: string): Promise<Uint8Array> {
  console.log(`Downloading video from ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function uploadVideoToStorage(
  supabase: any, 
  videoData: Uint8Array, 
  fileName: string
): Promise<string> {
  console.log(`Uploading processed video ${fileName}`);
  
  try {
    // Upload to the processed-videos bucket
    const { data, error } = await supabase.storage
      .from('processed-videos')
      .upload(fileName, videoData, {
        contentType: 'video/mp4',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Generate a public URL for the uploaded video
    const { data: { publicUrl } } = supabase.storage
      .from('processed-videos')
      .getPublicUrl(fileName);
      
    console.log(`Video uploaded successfully, public URL: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
}

/**
 * This function processes a video with FFmpeg to add text overlay and merge with a CTA video.
 */
async function processVideoWithFFmpeg(
  templateVideo: Uint8Array, 
  ctaVideo: Uint8Array | null,
  adText: string,
  textPosition: string
): Promise<Uint8Array> {
  console.log("Processing video with FFmpeg");
  
  // Create a temporary file for the input video
  const tempInputPath = `temp-${Date.now()}.mp4`;
  await Deno.writeFile(tempInputPath, templateVideo);
  
  // Create a temporary file for the output
  const tempOutputPath = `output-${Date.now()}.mp4`;
  
  try {
    // Determine text position parameters
    let textY = "h/2"; // Default to middle
    if (textPosition === "top") textY = "h*0.2";
    else if (textPosition === "bottom") textY = "h*0.8";
    
    // FFmpeg command to add text overlay
    const command = new Deno.Command("ffmpeg", {
      args: [
        "-i", tempInputPath,
        "-vf", `drawtext=text='${adText}':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=${textY}:box=1:boxcolor=black@0.5:boxborderw=5`,
        "-c:a", "copy",
        tempOutputPath
      ]
    });
    
    const { code: exitCode } = await command.output();
    
    if (exitCode !== 0) {
      throw new Error(`FFmpeg command failed with exit code ${exitCode}`);
    }
    
    let finalOutputPath = tempOutputPath;
    
    // If we have a CTA video, merge it with the template
    if (ctaVideo) {
      const tempCtaPath = `cta-${Date.now()}.mp4`;
      await Deno.writeFile(tempCtaPath, ctaVideo);
      
      const tempMergedPath = `merged-${Date.now()}.mp4`;
      
      // Create a file list for FFmpeg concat
      const fileListPath = `list-${Date.now()}.txt`;
      await Deno.writeTextFile(fileListPath, `file '${tempOutputPath}'\nfile '${tempCtaPath}'`);
      
      // FFmpeg command to concatenate videos
      const mergeCommand = new Deno.Command("ffmpeg", {
        args: [
          "-f", "concat",
          "-safe", "0",
          "-i", fileListPath,
          "-c", "copy",
          tempMergedPath
        ]
      });
      
      const { code: mergeExitCode } = await mergeCommand.output();
      
      if (mergeExitCode !== 0) {
        throw new Error(`FFmpeg merge command failed with exit code ${mergeExitCode}`);
      }
      
      finalOutputPath = tempMergedPath;
      
      // Clean up temporary CTA file and file list
      try {
        await Deno.remove(tempCtaPath);
        await Deno.remove(fileListPath);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary files:", cleanupError);
      }
    }
    
    // Read the final processed video
    const finalVideoData = await Deno.readFile(finalOutputPath);
    
    return finalVideoData;
  } catch (error) {
    console.error("Error processing video with FFmpeg:", error);
    throw error;
  } finally {
    // Clean up temporary input/output files
    try {
      if (await Deno.stat(tempInputPath).then(() => true).catch(() => false)) {
        await Deno.remove(tempInputPath);
      }
      
      if (await Deno.stat(tempOutputPath).then(() => true).catch(() => false)) {
        await Deno.remove(tempOutputPath);
      }
    } catch (cleanupError) {
      console.error("Error cleaning up temporary files:", cleanupError);
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing video request received");
    const { templateVideoUrl, ctaVideoUrl, adText, textPosition, includeOverlayInFinal } = await req.json();

    if (!templateVideoUrl) {
      return new Response(
        JSON.stringify({ error: "Template video URL is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log("Template video URL:", templateVideoUrl);
    console.log("CTA video URL:", ctaVideoUrl);
    console.log("Ad text:", adText);
    console.log("Text position:", textPosition);
    console.log("Include overlay in final download:", includeOverlayInFinal);

    // Create a Supabase client for storage operations
    const supabaseUrl = "https://tsflchdtmzqaavrwidoq.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download the template video
    const templateVideoData = await downloadVideo(templateVideoUrl);
    console.log("Template video downloaded, size:", templateVideoData.length);
    
    // Download the CTA video if provided
    let ctaVideoData = null;
    if (ctaVideoUrl) {
      ctaVideoData = await downloadVideo(ctaVideoUrl);
      console.log("CTA video downloaded, size:", ctaVideoData.length);
    }

    // Process the video (add text overlay and merge with CTA)
    const processedVideoData = await processVideoWithFFmpeg(
      templateVideoData,
      ctaVideoData,
      adText,
      textPosition
    );

    // Generate a unique ID for this processed video
    const processedVideoId = crypto.randomUUID();
    const processedVideoPath = `${processedVideoId}.mp4`;

    // Upload the processed video to Supabase Storage
    const videoUrl = await uploadVideoToStorage(
      supabase,
      processedVideoData,
      processedVideoPath
    );

    // Store metadata about the processed video
    const processedVideoMeta = {
      originalTemplateUrl: templateVideoUrl,
      ctaVideoUrl: ctaVideoUrl || null,
      adText: adText || "",
      textPosition: textPosition || "middle",
      processedAt: new Date().toISOString(),
    };

    const response = {
      videoUrl,
      processedVideoId,
      metadata: processedVideoMeta,
    };

    console.log("Video processing complete:", response);

    // Return the result to the client
    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing video:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process video",
        details: error.message 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
