
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, Music, X, Volume2 } from "lucide-react";

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

  const handleMusicSelect = () => {
    // Mock selection - in a real app this would open a file picker
    setSelectedMusic("Minecraft 1");
  };

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="text-base font-medium">Upload Music</h2>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
        <Button variant="outline" size="sm" className="border border-gray-300 text-gray-700 text-xs">
          Free Tracks
        </Button>
      </div>
      
      {selectedMusic ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
            <div className="flex items-center">
              <Music className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">{selectedMusic}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700" onClick={handleRemoveMusic}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-2 flex items-center space-x-3">
            <button 
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
              onClick={handlePlayPause}
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
          </div>
          
          <audio 
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500">
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <Music className="h-6 w-6" />
          </div>
          <p className="text-center">Click or drag to upload music</p>
          <p className="text-center text-sm text-gray-400 mt-1">MP3, WAV files accepted</p>
        </div>
      )}
    </div>
  );
};

export default MusicSelector;
