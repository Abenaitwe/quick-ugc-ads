
import React, { useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Template {
  id: number;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: number | null;
  handleTemplateSelect: (id: number) => void;
  isLoading?: boolean;
  error?: string | null;
}

const TemplateSelector = ({ 
  templates, 
  selectedTemplateId, 
  handleTemplateSelect,
  isLoading = false,
  error = null
}: TemplateSelectorProps) => {
  // Hardcoded template as a fallback
  const hardcodedTemplate = {
    id: 999,
    videoUrl: "https://tsflchdtmzqaavrwidoq.supabase.co/storage/v1/object/public/templates/UGC/111da97d-40cb-4a52-9611-adacc0f65d9e.mp4"
  };
  
  // Combined templates array with the hardcoded template
  const displayTemplates = templates.length > 0 ? templates : [hardcodedTemplate];
  
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="text-base font-medium mb-3">Select UGC Template</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-3 text-sm">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {isLoading ? (
          // Show loading skeletons while templates are being fetched
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="aspect-square rounded-lg bg-gray-200 animate-pulse"
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))
        ) : displayTemplates.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            {error ? 'Failed to load templates' : 'No templates available'}
          </div>
        ) : (
          displayTemplates.map((template) => {
            return (
              <div
                key={template.id}
                className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedTemplateId === template.id
                    ? "border-green-500 ring-1 ring-green-300"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                {/* Using img element instead of video for thumbnails to improve performance */}
                <div className="relative w-full h-full">
                  <img
                    src="/placeholder.svg"
                    className="absolute w-full h-full object-cover"
                    alt="Video thumbnail"
                  />
                  <video
                    src={template.videoUrl}
                    className="w-full h-full object-cover"
                    preload="none"
                    poster="/placeholder.svg"
                    muted
                    playsInline
                    onMouseOver={(e) => {
                      const videoElement = e.target as HTMLVideoElement;
                      videoElement.currentTime = 0;
                      videoElement.play().catch((err) => 
                        console.log("Preview play prevented:", err)
                      );
                    }}
                    onMouseOut={(e) => {
                      const videoElement = e.target as HTMLVideoElement;
                      videoElement.pause();
                    }}
                    onError={(e) => console.error(`Error loading video ${template.id}:`, e)}
                    onLoadedData={(e) => {
                      console.log(`Video ${template.id} loaded successfully`);
                      // Once loaded, take a snapshot for the thumbnail
                      const videoElement = e.target as HTMLVideoElement;
                      videoElement.pause();
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
