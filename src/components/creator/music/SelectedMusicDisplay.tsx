
import React from "react";
import { Music, X } from "lucide-react";

interface SelectedMusicDisplayProps {
  musicName: string;
  onRemove: () => void;
}

const SelectedMusicDisplay = ({ musicName, onRemove }: SelectedMusicDisplayProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
      <div className="flex items-center">
        <Music className="h-4 w-4 text-green-500 mr-2" />
        <span className="text-sm">{musicName}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-500 hover:text-gray-700" onClick={onRemove}>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SelectedMusicDisplay;
