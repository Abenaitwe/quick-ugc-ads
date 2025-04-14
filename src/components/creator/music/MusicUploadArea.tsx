
import React from "react";
import { Music } from "lucide-react";

const MusicUploadArea = () => {
  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500">
      <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <Music className="h-6 w-6" />
      </div>
      <p className="text-center">Click or drag to upload music</p>
      <p className="text-center text-sm text-gray-400 mt-1">MP3, WAV files accepted</p>
    </div>
  );
};

export default MusicUploadArea;
