'use client';

import { Mic, MicOff, Video, VideoOff, Phone, Settings, Grid3X3, Volume2, User, Maximize, Minimize } from 'lucide-react';

interface VideoCallInterfaceProps {
  isCallActive: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  callDuration: string;
  onMuteToggle: () => void;
  onVideoToggle: () => void;
  onEndCall: () => void;
  onFullscreenToggle: () => void;
  isFullscreen: boolean;
}

export default function VideoCallInterface({
  isCallActive,
  isMuted,
  isVideoOn,
  callDuration,
  onMuteToggle,
  onVideoToggle,
  onEndCall,
  onFullscreenToggle,
  isFullscreen
}: VideoCallInterfaceProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 overflow-hidden">
      {/* Background Scene */}
      <div className="absolute inset-0">
        {/* Night sky with stars */}
        <div className="w-full h-full relative">
          {/* Dark gradient sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900"></div>
          
          {/* Stars */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1/5 left-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-2/5 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>
          
          {/* Moon */}
          <div className="absolute top-1/4 left-1/6 w-8 h-8 bg-gray-200 rounded-full opacity-90 shadow-lg"></div>
          
          {/* Hot air balloon - more realistic positioning and colors */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Balloon with checkered pattern */}
              <div className="w-32 h-40 relative">
                {/* Base balloon shape */}
                <div className="w-full h-full bg-gradient-to-b from-red-500 to-red-700 rounded-full relative overflow-hidden">
                  {/* Checkered pattern */}
                  <div className="absolute inset-0">
                    {/* Red and blue stripes */}
                    <div className="absolute top-0 left-0 w-full h-1/4 bg-red-500"></div>
                    <div className="absolute top-1/4 left-0 w-full h-1/4 bg-blue-600"></div>
                    <div className="absolute top-2/4 left-0 w-full h-1/4 bg-green-600"></div>
                    <div className="absolute top-3/4 left-0 w-full h-1/4 bg-yellow-500"></div>
                    
                    {/* Vertical stripes overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black via-transparent to-transparent opacity-20"></div>
                  </div>
                </div>
                
                {/* Balloon strings */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-px h-8 bg-yellow-800"></div>
                  <div className="absolute -left-2 top-0 w-px h-8 bg-yellow-800"></div>
                  <div className="absolute left-2 top-0 w-px h-8 bg-yellow-800"></div>
                </div>
                
                {/* Basket */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-amber-900 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Water surface */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-slate-800 to-slate-700">
            {/* Water ripples */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-16 h-32 bg-gradient-to-t from-red-400 via-blue-400 to-transparent opacity-60 blur-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Left - Participant Info */}
      <div className="absolute top-3 lg:top-6 left-3 lg:left-6 z-20">
        <div className="flex items-center gap-2 lg:gap-3 bg-black bg-opacity-40 rounded-lg px-3 lg:px-4 py-2 lg:py-3 backdrop-blur-sm">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </div>
          <div className="text-white">
            <div className="text-xs lg:text-sm font-medium">Dave Jones</div>
            <div className="text-xs text-gray-300">You</div>
          </div>
        </div>
      </div>

      {/* Top Center - Call Duration */}
      <div className="absolute top-3 lg:top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black bg-opacity-40 rounded-full px-3 lg:px-4 py-1.5 lg:py-2 backdrop-blur-sm">
          <div className="text-white text-xs lg:text-sm font-medium flex items-center gap-2">
            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-500 rounded-full animate-pulse"></div>
            {callDuration}
          </div>
        </div>
      </div>

      {/* Top Right - Other Participant Video + Fullscreen Button */}
      <div className="absolute top-3 lg:top-6 right-3 lg:right-6 z-20 flex flex-col items-end gap-2 lg:gap-3">
        {/* Fullscreen Toggle Button */}
        <button 
          onClick={onFullscreenToggle}
          className="bg-black bg-opacity-40 rounded-lg p-1.5 lg:p-2 backdrop-blur-sm hover:bg-opacity-60 transition-all"
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          ) : (
            <Maximize className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          )}
        </button>
        
        {/* Other Participant Video */}
        <div className="w-28 h-20 lg:w-40 lg:h-28 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-xl">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative">
            {/* Participant avatar */}
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm lg:text-lg font-medium">M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Volume Control - Hidden on mobile */}
      <div className="hidden lg:flex absolute left-6 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col items-center bg-black bg-opacity-40 rounded-full p-3 backdrop-blur-sm">
          {/* Volume slider */}
          <div className="w-1 h-24 bg-gray-600 rounded-full relative mb-3">
            <div className="absolute bottom-0 w-full h-3/4 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
          </div>
          {/* Volume icon */}
          <button className="w-8 h-8 flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Center - Main Controls */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 lg:gap-4 bg-black bg-opacity-40 rounded-full px-4 lg:px-6 py-3 lg:py-4 backdrop-blur-sm">
          {/* Grid View */}
          <button className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all">
            <Grid3X3 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </button>

          {/* Mute Toggle */}
          <button 
            onClick={onMuteToggle}
            className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
          >
            <Mic className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </button>

          {/* End Call - Larger red button */}
          <button 
            onClick={() => {
              onEndCall();
              window.location.href = '/post-signup/live-session';
            }}
            className="w-12 h-12 lg:w-16 lg:h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg"
          >
            <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-white transform rotate-135" />
          </button>

          {/* Video Toggle */}
          <button 
            onClick={onVideoToggle}
            className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
          >
            <Video className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </button>

          {/* Settings */}
          <button className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all">
            <Settings className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}