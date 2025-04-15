
import React, { createContext, useContext, useState } from "react";

interface CTAVideo {
  file: File;
  url: string;
  duration: number;
  name: string;
}

interface CreatorContextType {
  adText: string;
  setAdText: (text: string) => void;
  textPosition: "top" | "middle" | "bottom";
  setTextPosition: (position: "top" | "middle" | "bottom") => void;
  selectedTemplateId: number | null;
  setSelectedTemplateId: (id: number | null) => void;
  selectedMusic: string | null;
  setSelectedMusic: (music: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  ctaVideo: CTAVideo | null;
  setCtaVideo: (video: CTAVideo | null) => void;
  generatedVideoUrl: string | null;
  setGeneratedVideoUrl: (url: string | null) => void;
  isGeneratingVideo: boolean;
  setIsGeneratingVideo: (isGenerating: boolean) => void;
}

const CreatorContext = createContext<CreatorContextType | null>(null);

export const useCreator = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error("useCreator must be used within a CreatorProvider");
  }
  return context;
};

export const CreatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adText, setAdText] = useState("Your taste.....");
  const [textPosition, setTextPosition] = useState<"top" | "middle" | "bottom">("middle");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [ctaVideo, setCtaVideo] = useState<CTAVideo | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  return (
    <CreatorContext.Provider
      value={{
        adText,
        setAdText,
        textPosition,
        setTextPosition,
        selectedTemplateId,
        setSelectedTemplateId,
        selectedMusic,
        setSelectedMusic,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        ctaVideo,
        setCtaVideo,
        generatedVideoUrl,
        setGeneratedVideoUrl,
        isGeneratingVideo,
        setIsGeneratingVideo,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};
