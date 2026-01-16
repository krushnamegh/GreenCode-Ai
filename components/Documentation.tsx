import React from 'react';
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-12">
       <button 
        onClick={onBack}
        className="group flex items-center space-x-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8"
      >
        <div className="p-2 bg-white rounded-full shadow-sm border border-slate-200 group-hover:border-emerald-300 transition-all">
          <ArrowLeft className="h-5 w-5" />
        </div>
        <span className="font-medium">Back to Editor</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
             <h3 className="font-bold text-slate-900 px-3 mb-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" /> Documentation
             </h3>
             <a href="#getting-started" className="block px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg">Getting Started</a>
             <a href="#carbon-score" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">Carbon Score</a>
             <a href="#hotspots" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">Code Hotspots</a>
             <a href="#faq" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">FAQ</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 glass rounded-2xl p-8 border border-white shadow-sm">
          
          <section id="getting-started" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Getting Started</h2>
            <p className="text-slate-600 mb-4">
              GreenCode AI is designed to be simple. Paste your code into the editor, select the programming language, and click "Analyze Impact".
            </p>
            <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
              <p className="text-sm text-slate-700">
                <strong>Tip:</strong> Ensure your code is a complete function or snippet for the best analysis results.
              </p>
            </div>
          </section>

          <section id="carbon-score" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Understanding the Carbon Score</h2>
            <p className="text-slate-600 mb-6">
              The Carbon Score is a proprietary metric ranging from 0 to 100 that indicates how environmentally friendly your code is.
            </p>
            <div className="grid gap-4">
                <div className="flex items-start p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-emerald-800">80 - 100 (Excellent)</h4>
                        <p className="text-sm text-emerald-700 mt-1">Code is highly optimized with minimal computational waste. O(n) or O(log n) complexity.</p>
                    </div>
                </div>
                <div className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <HelpCircle className="w-6 h-6 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-yellow-800">50 - 79 (Good/Fair)</h4>
                        <p className="text-sm text-yellow-700 mt-1">Acceptable for small datasets, but may scale poorly. Likely contains O(n log n) or minor unoptimized loops.</p>
                    </div>
                </div>
                <div className="flex items-start p-4 bg-red-50 rounded-lg border border-red-100">
                    <AlertTriangle className="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-red-800">0 - 49 (Needs Action)</h4>
                        <p className="text-sm text-red-700 mt-1">High energy consumption detected. Nested loops O(n²), memory leaks, or redundant I/O operations.</p>
                    </div>
                </div>
            </div>
          </section>

          <section id="hotspots" className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Code Hotspots</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The AI identifies specific lines or blocks of code that contribute disproportionately to energy usage. These are categorized by impact:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
                <li><strong className="text-slate-800">Algorithmic Complexity:</strong> Nested loops that grow exponentially with data size.</li>
                <li><strong className="text-slate-800">Memory Churn:</strong> Creating excessive temporary objects that force garbage collection.</li>
                <li><strong className="text-slate-800">Blocking I/O:</strong> Synchronous operations that keep the CPU idle but powered on.</li>
            </ul>
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 mb-1">How accurate is the CO₂ estimation?</h4>
                    <p className="text-sm text-slate-600">
                        It is an approximation based on the computational complexity and average energy cost of CPU cycles. Actual emissions depend on the hardware and energy grid mix (solar vs coal) where the code runs.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-1">Does this code run securely?</h4>
                    <p className="text-sm text-slate-600">
                        Yes. Your code is processed by the Google Gemini API solely for analysis and is not stored by our servers.
                    </p>
                </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};