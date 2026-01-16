import React from 'react';
import { ArrowLeft, Leaf, Zap, Code, Globe, Shield } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-12">
      <button 
        onClick={onBack}
        className="group flex items-center space-x-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8"
      >
        <div className="p-2 bg-white rounded-full shadow-sm border border-slate-200 group-hover:border-emerald-300 transition-all">
          <ArrowLeft className="h-5 w-5" />
        </div>
        <span className="font-medium">Back to Editor</span>
      </button>

      <div className="glass rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-900/5 border border-white">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-emerald-100 rounded-2xl mb-6">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">GreenCode AI</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Empowering developers to build a sustainable digital future, one line of code at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-emerald-500" /> The Mission
            </h3>
            <p className="text-slate-600 leading-relaxed">
              The internet accounts for nearly 4% of global greenhouse gas emissions. As software eats the world, inefficient code consumes massive amounts of energy in data centers. 
              GreenCode AI aims to reduce this footprint by helping developers identify and fix energy-intensive patterns before they reach production.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" /> How It Works
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Powered by Google's Gemini 1.5 Pro, our engine analyzes source code for algorithmic efficiency (Big O), I/O blocking, and memory usage. It calculates a "Carbon Score" and generates refactored, optimized code that maintains functionality while reducing CPU cycles.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Tech Stack & Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
              <Shield className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="font-semibold text-slate-800">Gemini 1.5 Pro</h4>
              <p className="text-xs text-slate-500 mt-2">Advanced reasoning for complex code analysis.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
              <Code className="w-8 h-8 text-purple-500 mb-3" />
              <h4 className="font-semibold text-slate-800">Multi-Language</h4>
              <p className="text-xs text-slate-500 mt-2">Support for Python, JS, Go, C++, and more.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
              <Leaf className="w-8 h-8 text-green-500 mb-3" />
              <h4 className="font-semibold text-slate-800">Eco-Metrics</h4>
              <p className="text-xs text-slate-500 mt-2">Real-time estimation of CO₂ and Energy.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-sm">Built for the Hackathon • © 2025</p>
        </div>
      </div>
    </div>
  );
};