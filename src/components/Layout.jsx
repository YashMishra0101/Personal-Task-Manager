import React from "react";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import InstallPrompt from "./InstallPrompt";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children, title }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-primary transition-colors duration-300 font-sans flex md:flex-row">
      {/* Sidebar only renders here on desktop due to CSS in Navbar, but Navbar is fixed bottom on mobile */}
      <Navbar />

      <div className="flex-1 w-full min-h-screen bg-background md:bg-surface/50 flex flex-col relative pb-24 md:pb-0 overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between bg-surface/80 backdrop-blur-md sticky top-0 z-40 border-b border-border shadow-sm">
          {/* Main Heading - Centered on Mobile */}
          <div className="flex-1 flex justify-center md:justify-start min-w-0 px-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider truncate w-full text-center md:text-left">
              {title || "Task Manager"}
            </h1>
          </div>

          <div className="flex items-center space-x-2 absolute right-6 md:static">
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-6 overflow-y-auto scrollbar-hide max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* PWA Install Prompt */}
        <InstallPrompt />
      </div>
    </div>
  );
}
