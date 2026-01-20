'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import VideoCallInterface from '@/components/live-session/VideoCallInterface';

export default function LiveSessionCallPage() {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(809); // Start at 13:29
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for timer
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Timer for call duration
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <VideoCallInterface
          isCallActive={isCallActive}
          isMuted={isMuted}
          isVideoOn={isVideoOn}
          callDuration={formatDuration(callDuration)}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onVideoToggle={() => setIsVideoOn(!isVideoOn)}
          onEndCall={() => setIsCallActive(false)}
          onFullscreenToggle={toggleFullscreen}
          isFullscreen={true}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar - Fixed */}
      <Sidebar activeItem="Live Session" />

      {/* Main Content - Video Call */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header breadcrumb="Assignments" />

        {/* Video Call Interface */}
        <main className="flex-1 overflow-hidden">
          <VideoCallInterface
            isCallActive={isCallActive}
            isMuted={isMuted}
            isVideoOn={isVideoOn}
            callDuration={formatDuration(callDuration)}
            onMuteToggle={() => setIsMuted(!isMuted)}
            onVideoToggle={() => setIsVideoOn(!isVideoOn)}
            onEndCall={() => setIsCallActive(false)}
            onFullscreenToggle={toggleFullscreen}
            isFullscreen={false}
          />
        </main>
      </div>
    </div>
  );
}