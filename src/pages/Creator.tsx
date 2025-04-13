
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserButton } from "@/components/UserButton";
import TemplateGrid from "@/components/TemplateGrid";
import AdPreview from "@/components/AdPreview";
import { Sparkles } from "lucide-react";

const Creator = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [adText, setAdText] = useState("");
  const [textPosition, setTextPosition] = useState<"top" | "middle" | "bottom">("middle");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);

  // Generate some sample templates
  const templates = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://source.unsplash.com/random/400x720?portrait&sig=${i + 1}`,
  }));

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // If still loading, show a spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
      </div>
    );
  }

  // If not logged in, this will redirect, but in case there's a delay
  if (!user) {
    return null;
  }

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplateId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600 mr-2">InstantUGC</h1>
            <span className="text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded">Creator Studio</span>
          </div>
          <UserButton />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Templates */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-purple-500 mr-2" /> 
              Choose a Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <TemplateGrid 
                templates={templates} 
                selectedId={selectedTemplateId} 
                onSelect={handleTemplateSelect} 
              />
            </div>
          </div>

          {/* Right column - Ad preview and settings */}
          <div className="space-y-6">
            {/* Ad Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Ad Preview</h2>
              <div className="aspect-[9/16] w-full mx-auto border border-gray-200 rounded-lg overflow-hidden">
                <AdPreview 
                  templateId={selectedTemplateId} 
                  text={adText} 
                  textPosition={textPosition} 
                />
              </div>
            </div>

            {/* Ad Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Ad Settings</h2>
              
              {/* Text Input */}
              <div className="mb-4">
                <Label htmlFor="ad-text" className="mb-2 block">Ad Text</Label>
                <Input 
                  id="ad-text" 
                  placeholder="Enter your ad text here..." 
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                />
              </div>

              {/* Text Position */}
              <div className="mb-4">
                <Label className="mb-2 block">Text Position</Label>
                <RadioGroup 
                  value={textPosition} 
                  onValueChange={(value) => setTextPosition(value as "top" | "middle" | "bottom")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="top" id="top" />
                    <Label htmlFor="top">Top</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="middle" id="middle" />
                    <Label htmlFor="middle">Middle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bottom" id="bottom" />
                    <Label htmlFor="bottom">Bottom</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Generate Button */}
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Generate Ad
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Creator;
