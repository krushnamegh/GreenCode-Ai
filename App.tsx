import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { About } from './components/About';
import { Documentation } from './components/Documentation';
import { BackgroundLeaves } from './components/BackgroundLeaves';
import { analyzeCode } from './services/geminiService';
import { AnalysisResult, Language } from './types';
import { INITIAL_CODE_EXAMPLES, SUPPORTED_LANGUAGES } from './constants';
import { Play, Loader2, History, Trash2, ChevronRight, Code2, Sparkles } from 'lucide-react';

interface HistoryItem {
  id: string;
  timestamp: Date;
  language: Language;
  code: string;
  result: AnalysisResult;
}

type ViewState = 'editor' | 'report' | 'about' | 'docs';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(Language.Python);
  const [code, setCode] = useState<string>(INITIAL_CODE_EXAMPLES[Language.Python]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for view management
  const [view, setView] = useState<ViewState>('editor');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as Language;
    setSelectedLanguage(lang);
    setCode(INITIAL_CODE_EXAMPLES[lang]);
    setError(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeCode(code, selectedLanguage);
      setCurrentResult(data);
      
      // Add to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        language: selectedLanguage,
        code: code,
        result: data
      };
      setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep last 10
      setView('report');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze code. Please check your API key and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setCode(item.code);
    setSelectedLanguage(item.language);
    setCurrentResult(item.result);
    setView('report');
    setShowHistory(false);
  };

  const handleBack = () => {
    setView('editor');
  };

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    // If navigating to editor and we have a result, we might want to keep showing the report? 
    // For now, navigating to 'editor' resets to input view unless specifically "back" from report.
    if (newView === 'editor' && currentResult && view !== 'report') {
        // If coming from About/Docs, just show the editor input
        setCurrentResult(null); 
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans flex flex-col">
      <BackgroundLeaves />
      
      <Navbar onNavigate={handleNavigate} currentView={view} />

      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar - Only show in Editor or Report mode */}
        {(view === 'editor' || view === 'report') && (
            <>
                <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white/90 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 md:bg-transparent md:border-none md:block ${showHistory ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:transform-none'}`}>
                <div className="h-full flex flex-col p-4 md:p-0">
                    <div className="flex items-center justify-between mb-6 md:mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center">
                        <History className="w-5 h-5 mr-2 text-emerald-600" />
                        Recent Scans
                    </h3>
                    <button onClick={() => setShowHistory(false)} className="md:hidden text-slate-400">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                    {history.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm bg-white/50 rounded-xl border border-dashed border-slate-300 p-4">
                        <p>No history yet.</p>
                        <p className="text-xs mt-1">Run an analysis to see it here.</p>
                        </div>
                    ) : (
                        history.map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => loadHistoryItem(item)}
                            className="group cursor-pointer p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.language}</span>
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${item.result.carbon_score >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {item.result.carbon_score}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mb-2">
                                {item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                            <div className="flex items-center text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                View Report <ChevronRight className="w-3 h-3 ml-1" />
                            </div>
                        </div>
                        ))
                    )}
                    </div>
                    {history.length > 0 && (
                        <button 
                        onClick={() => setHistory([])}
                        className="mt-4 flex items-center justify-center text-xs text-slate-400 hover:text-red-500 transition-colors py-2"
                        >
                        <Trash2 className="w-3 h-3 mr-1" /> Clear History
                        </button>
                    )}
                </div>
                </aside>

                {/* Overlay for mobile history */}
                {showHistory && (
                <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setShowHistory(false)}></div>
                )}
            </>
        )}

        {/* Main Content Area */}
        <div className={`flex-1 min-w-0 ${view === 'about' || view === 'docs' ? 'w-full' : ''}`}>
          
          {/* Editor View */}
          {view === 'editor' && (
             <div className="animate-fade-in-scale">
                 <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="inline-flex items-center justify-center p-2 bg-emerald-50 rounded-full mb-4 border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors" onClick={() => handleNavigate('about')}>
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-700 shadow-sm uppercase tracking-wide">Beta v1.0</span>
                        <span className="ml-2 text-sm text-emerald-800 font-medium pr-2 flex items-center">
                            Green Software Initiative <ChevronRight className="w-3 h-3 ml-1" />
                        </span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
                        Code Sustainably. <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Ship Faster.</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Use AI to estimate your code's carbon footprint and discover optimizations that save energy without sacrificing performance.
                    </p>
                    
                     {/* Mobile History Toggle */}
                    <button 
                        onClick={() => setShowHistory(true)}
                        className="md:hidden mt-6 inline-flex items-center text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
                    >
                        <History className="w-4 h-4 mr-2" /> View History
                    </button>
                </div>

                <div className="glass-dark rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-200/50 overflow-hidden backdrop-blur-xl relative">
                    {/* Editor Toolbar */}
                    <div className="border-b border-white/10 bg-slate-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-slate-400">
                                <Code2 className="w-5 h-5 mr-2" />
                                <span className="text-sm font-medium">Source Code</span>
                            </div>
                            <div className="h-4 w-px bg-slate-700"></div>
                            <div className="relative group">
                                <select
                                    id="language"
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    className="block w-40 pl-3 pr-10 py-1.5 text-sm bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all hover:bg-slate-700 cursor-pointer"
                                >
                                    {SUPPORTED_LANGUAGES.map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-slate-400 font-medium">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                            Ready to analyze
                        </div>
                    </div>
                    
                    {/* Code Area */}
                    <div className="relative group">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-[500px] p-6 code-font text-sm bg-[#0f172a] text-slate-300 focus:outline-none resize-none leading-relaxed custom-scrollbar selection:bg-emerald-500/30"
                            spellCheck="false"
                            placeholder="Paste your code here..."
                        />
                        
                        {/* Floating Action Button */}
                        <div className="absolute bottom-8 right-8 z-10">
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !code.trim()}
                                className="flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-1 hover:scale-105 font-bold tracking-wide"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="-ml-1 mr-2 h-5 w-5 fill-current" />
                                        Analyze Impact
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-50/90 backdrop-blur border border-red-200 rounded-xl flex items-start animate-fade-in-scale shadow-sm">
                    <div className="flex-shrink-0 p-1 bg-red-100 rounded-full">
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-bold text-red-800">Analysis Failed</h3>
                        <div className="mt-1 text-sm text-red-700">
                        <p>{error}</p>
                        </div>
                    </div>
                    </div>
                )}
             </div>
          )}

          {/* Report View */}
          {view === 'report' && currentResult && (
             <AnalysisDashboard 
                 result={currentResult} 
                 originalCode={code} 
                 onBack={() => setView('editor')} 
             />
          )}

          {/* Static Pages */}
          {view === 'about' && <About onBack={() => setView('editor')} />}
          {view === 'docs' && <Documentation onBack={() => setView('editor')} />}

        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-200/60 bg-white/50 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm font-medium">
                &copy; {new Date().getFullYear()} GreenCode AI. Powered by <span className="text-emerald-600">Gemini 1.5 Pro</span>.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-slate-400 text-sm flex items-center">
                   <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                   System Operational
                </span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;