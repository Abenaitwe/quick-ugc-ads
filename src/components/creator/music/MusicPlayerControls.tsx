
import React, { useRef } from "react";
import { Volume2 } from "lucide-react";

interface MusicPlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicPlayerControls = ({ isPlaying, onPlayPause, audioRef }: MusicPlayerControlsProps) => {
  return (
    <div className="bg-gray-100 rounded-lg p-2 flex items-center space-x-3">
      <button 
        className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <span className="h-2.5 w-2.5 bg-gray-600 rounded-sm"></span>
        ) : (
          <span className="h-0 w-0 border-t-[5px] border-b-[5px] border-l-[8px] border-transparent border-l-gray-600 ml-0.5"></span>
        )}
      </button>
      <div className="text-xs text-gray-600">
        0:00 / 0:30
      </div>
      <div className="h-1 bg-gray-300 flex-1 rounded-full">
        <div className="h-full w-0 bg-gray-600 rounded-full"></div>
      </div>
      <button className="text-gray-600">
        <Volume2 className="h-4 w-4" />
      </button>
      
      <audio 
        ref={audioRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MusicPlayerControls;
