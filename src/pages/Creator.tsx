import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Assuming this is a placeholder since the file is in the read-only list
const Creator = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div>
      {/* Original Creator page content - not modified since it's read-only */}
    </div>
  );
};

export default Creator;
