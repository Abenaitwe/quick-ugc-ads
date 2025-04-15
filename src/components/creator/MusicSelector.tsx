
import React, { useRef } from "react";
import { Info } from "lucide-react";
import MusicUploadArea from "./music/MusicUploadArea";
import MusicPlayerControls from "./music/MusicPlayerControls";
import SelectedMusicDisplay from "./music/SelectedMusicDisplay";

interface MusicSelectorProps {
  selectedMusic: string | null;
  setSelectedMusic: (music: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

const MusicSelector = ({ 
  selectedMusic, 
  setSelectedMusic,
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime
}: MusicSelectorProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleRemoveMusic = () => {
    setSelectedMusic(null);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <h2 className="text-base font-medium">Upload Music</h2>
        <Info className="h-4 w-4 text-gray-400 ml-1" />
      </div>
      
      {selectedMusic ? (
        <div className="space-y-2">
          <SelectedMusicDisplay 
            musicName={selectedMusic}
            onRemove={handleRemoveMusic}
          />
          <MusicPlayerControls 
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            audioRef={audioRef}
          />
        </div>
      ) : (
        <MusicUploadArea />
      )}
    </div>
  );
};

export default MusicSelector;
