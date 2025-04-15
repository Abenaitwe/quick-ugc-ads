
import React, { useRef, ChangeEvent } from "react";
import { Music } from "lucide-react";
import { toast } from "sonner";

interface MusicUploadAreaProps {
  setSelectedMusic: (music: string | null) => void;
}

const MusicUploadArea = ({ setSelectedMusic }: MusicUploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload an MP3 or WAV file');
      return;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    // Create URL for the audio file
    const audioUrl = URL.createObjectURL(file);
    
    // Set the selected music with the file name
    setSelectedMusic(file.name);
    
    // Create a temporary audio element to set the audio source
    const audio = document.createElement('audio');
    audio.src = audioUrl;
    
    toast.success(`Successfully uploaded: ${file.name}`);
  };

  return (
    <div 
      className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={handleClick}
    >
      <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <Music className="h-6 w-6" />
      </div>
      <p className="text-center">Click or drag to upload music</p>
      <p className="text-center text-sm text-gray-400 mt-1">MP3, WAV files accepted</p>
      
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".mp3,.wav,audio/mp3,audio/mpeg,audio/wav"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MusicUploadArea;
