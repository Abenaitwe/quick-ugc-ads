
import React, { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";

interface MusicPlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicPlayerControls = ({ isPlaying, onPlayPause, audioRef }: MusicPlayerControlsProps) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
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
        {formatTime(currentTime)} / {formatTime(duration || 0)}
      </div>
      <div className="h-1 bg-gray-300 flex-1 rounded-full">
        <div 
          className="h-full bg-gray-600 rounded-full transition-all" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <button className="text-gray-600">
        <Volume2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MusicPlayerControls;
