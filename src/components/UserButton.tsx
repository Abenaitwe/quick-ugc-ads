
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Lock } from "lucide-react";

export const UserButton = () => {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
        <span className="sr-only">Loading user</span>
        <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-purple-600 animate-spin"></div>
      </Button>
    );
  }

  if (!user) {
    return (
      <Button 
        onClick={() => navigate("/auth")}
        className="flex items-center gap-2"
      >
        <Lock className="h-5 w-5" />
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full bg-purple-100">
          <span className="sr-only">Open user menu</span>
          <User className="h-5 w-5 text-purple-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled className="font-medium">
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
