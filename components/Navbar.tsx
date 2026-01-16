import React from 'react';
import { Leaf, Github, Info, BookOpen } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'editor' | 'about' | 'docs') => void;
  currentView: 'editor' | 'about' | 'docs' | 'report';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="glass shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              onClick={() => onNavigate('editor')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="animate-float bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-500/30 transform group-hover:rotate-12 transition-transform duration-300">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-teal-600">
                GreenCode AI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => onNavigate('docs')}
                className={`flex items-center transition-colors text-sm font-medium ${currentView === 'docs' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                <BookOpen className="w-4 h-4 mr-1.5" />
                Documentation
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`flex items-center transition-colors text-sm font-medium ${currentView === 'about' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                <Info className="w-4 h-4 mr-1.5" />
                About
              </button>
              <div className="h-5 w-px bg-slate-200"></div>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 text-sm font-medium">
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};