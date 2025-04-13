
import React from "react";
import { Info, Image } from "lucide-react";

const CallToActionUpload = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <h2 className="text-base font-medium">Call to Action</h2>
        <Info className="h-4 w-4 text-gray-400" />
      </div>
      
      <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500">
        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
          <Image className="h-5 w-5" />
        </div>
        <p className="text-center text-sm">Click to upload CTA video</p>
        <p className="text-center text-xs text-gray-400 mt-1">3-15 seconds</p>
      </div>
    </div>
  );
};

export default CallToActionUpload;
