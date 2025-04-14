
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Template {
  id: number;
  videoUrl: string;
  thumbnailUrl?: string;
}

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoadingTemplates(true);
      setError(null);
      
      try {
        console.log("Fetching templates from Supabase...");
        
        const { data: files, error } = await supabase.storage
          .from('templates')
          .list('UGC', {
            sortBy: { column: 'name', order: 'asc' },
          });

        if (error) {
          console.error('Error fetching templates:', error);
          setError(`Failed to fetch templates: ${error.message}`);
          toast.error(`Failed to fetch templates: ${error.message}`);
          return;
        }

        console.log("Files retrieved from Supabase:", files);
        
        if (!files || files.length === 0) {
          console.log("No files found in the UGC folder");
          setError("No template videos found");
          setTemplates([]);
          return;
        }

        const videoFiles = files.filter(file => 
          file.name.toLowerCase().endsWith('.mp4')
        );
        
        console.log("Filtered video files:", videoFiles);

        if (videoFiles.length === 0) {
          console.log("No MP4 files found in the UGC folder");
          setError("No MP4 video files found");
          setTemplates([]);
          return;
        }

        const templatesList = videoFiles.map((file, index) => {
          const filePath = `UGC/${file.name}`;
          console.log(`Creating public URL for: ${filePath}`);
          
          const { data: { publicUrl } } = supabase.storage
            .from('templates')
            .getPublicUrl(filePath);
            
          console.log(`Public URL for ${file.name}: ${publicUrl}`);
          
          return {
            id: index + 1,
            videoUrl: publicUrl,
            thumbnailUrl: undefined,
          };
        });

        console.log("Final templates list:", templatesList);
        setTemplates(templatesList);
      } catch (err) {
        console.error("Unexpected error fetching templates:", err);
        setError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
        toast.error("Failed to load templates");
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  return { templates, isLoadingTemplates, error };
};
