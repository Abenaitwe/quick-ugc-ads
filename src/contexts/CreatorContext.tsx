
import React, { createContext, useContext, useState } from "react";

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
  const [selectedMusic, setSelectedMusic] = useState<string | null>("Minecraft 1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

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
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};
