
import React from "react";

interface AdPreviewProps {
  templateId: number | null;
  text: string;
  textPosition: "top" | "middle" | "bottom";
}

const AdPreview: React.FC<AdPreviewProps> = ({ templateId, text, textPosition }) => {
  // Determine text position class
  const getPositionClass = () => {
    switch (textPosition) {
      case "top":
        return "top-10";
      case "middle":
        return "top-1/2 -translate-y-1/2";
      case "bottom":
        return "bottom-10";
      default:
        return "top-1/2 -translate-y-1/2";
    }
  };

  return (
    <div className="ad-preview bg-gray-100 flex items-center justify-center">
      {templateId ? (
        <div className="relative w-full h-full">
          <img
            src={`https://source.unsplash.com/random/400x720?portrait&sig=${templateId}`}
            alt="Ad Preview"
            className="w-full h-full object-cover"
          />
          {text && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 ${getPositionClass()} w-full px-4`}
            >
              <div className="bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg inline-block mx-auto text-white font-medium shadow-lg">
                {text}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 flex flex-col items-center justify-center p-8 text-center">
          <p className="mb-2 text-lg">Select a template and add text</p>
          <p className="text-sm">Your ad preview will appear here</p>
        </div>
      )}
    </div>
  );
};

export default AdPreview;
