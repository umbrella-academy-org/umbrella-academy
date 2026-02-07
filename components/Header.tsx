"use client";

import { Menu, X, Umbrella } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Umbrella className="w-6 h-6 text-[#ca8a04]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-black tracking-wide uppercase">Umbrella</span>
                <span className="text-xs font-medium text-[#ca8a04] tracking-wider uppercase">Academy</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              How It Works
            </a>
            <a href="#programs" className="text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              Programs
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-black hover:text-[#ca8a04] transition-colors font-medium"
              onClick={() => router.push("/auth/login")}>
              Sign In
            </button>
            <button className="px-6 py-2 bg-[#ca8a04] text-white rounded-lg hover:bg-[#a16207] hover:shadow-lg transition-all duration-300 font-medium active:scale-95"
              onClick={() => router.push("/auth/signup")}>
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4 space-y-4 animate-fade-in"
          >
            <a href="#features" className="block text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              How It Works
            </a>
            <a href="#programs" className="block text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              Programs
            </a>
            <a href="#about" className="block text-gray-700 hover:text-[#ca8a04] transition-colors font-medium">
              About
            </a>
            <div className="pt-4 space-y-2">
              <button className="block w-full text-center text-black py-2 font-medium hover:text-[#ca8a04]">
                Sign In
              </button>
              <button className="block w-full px-6 py-2 bg-[#ca8a04] text-white rounded-lg font-medium hover:bg-[#a16207] transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
