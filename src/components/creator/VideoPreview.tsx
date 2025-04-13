
import React from "react";

interface VideoPreviewProps {
  selectedTemplateId: number | null;
  adText: string;
  textPosition: "top" | "middle" | "bottom";
}

const VideoPreview = ({ selectedTemplateId, adText, textPosition }: VideoPreviewProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden">
        {selectedTemplateId ? (
          <div className="relative w-full h-full">
            <img
              src={`https://source.unsplash.com/random/600x1067?portrait&sig=${selectedTemplateId}`}
              alt="Video preview"
              className="w-full h-full object-cover"
            />
            {adText && (
              <div className={`absolute left-1/2 -translate-x-1/2 w-full px-4 text-center
                ${textPosition === 'top' ? 'top-16' : 
                  textPosition === 'middle' ? 'top-1/2 -translate-y-1/2' : 'bottom-16'}`}>
                <span className="backdrop-blur-sm px-4 py-2 rounded-lg text-white text-base font-medium">
                  {adText}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p>Select a template to preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
