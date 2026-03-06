import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="bg-amber-600 text-gray-300">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="dark" showBackground={false} />
            <p className="text-sm text-gray-400 leading-relaxed">
              Structured learning platform connecting students with expert trainers and mentors across multiple fields.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-[#525252] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-[#525252] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-[#525252] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-[#525252] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#features" className="text-sm hover:text-[#737373] transition-colors">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm hover:text-[#737373] transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#programs" className="text-sm hover:text-[#737373] transition-colors">Programs</a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-[#737373] transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-bold mb-4">Programs</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">Technology & IT</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">Business & Management</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">Creative Arts</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">Design & UX</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-[#737373] transition-colors">Data Science</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#737373] shrink-0 mt-0.5" />
                <span className="text-sm">123 Learning Street, Education City, EC 12345</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#737373] shrink-0 mt-0.5" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#737373] shrink-0 mt-0.5" />
                <span className="text-sm">hello@umbrellaacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2026 Umbrella Academy LMS. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#737373] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#737373] transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-[#737373] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
