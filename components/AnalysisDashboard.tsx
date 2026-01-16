import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { 
  ArrowLeft, ArrowRight, AlertTriangle, Zap, Download, 
  CheckCircle, Code as CodeIcon, Copy, Check, Leaf 
} from 'lucide-react';

interface AnalysisDashboardProps {
  result: AnalysisResult;
  originalCode: string;
  onBack: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, originalCode, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code'>('overview');
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const report = JSON.stringify({
        ...result,
        original_code: originalCode,
        timestamp: new Date().toISOString()
    }, null, 2);
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greencode-report-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.optimized_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-scale pb-10">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <div className="p-2 bg-white rounded-full shadow-sm border border-slate-200 group-hover:border-emerald-300 group-hover:shadow-md transition-all">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <span className="font-medium">Back to Editor</span>
        </button>
        
        <div className="flex gap-3">
             <button 
                onClick={handleDownload}
                className="glass flex items-center space-x-2 px-4 py-2 rounded-lg text-emerald-700 hover:bg-white transition-all shadow-sm border border-emerald-100 font-medium text-sm"
            >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
            </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500"></div>
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
           <ScoreGauge score={result.carbon_score} />
        </div>

        {/* Stats & Hotspots */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Energy Savings */}
          <div className="glass bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-white shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 p-4 opacity-5">
                <Zap className="w-32 h-32" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                    <Zap className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Energy Efficiency</h3>
              </div>
              <p className="text-4xl font-bold text-emerald-700 tracking-tight">{result.carbon_reduction_estimate}</p>
              <p className="text-sm text-emerald-600 font-medium mt-1">Est. reduction in energy usage</p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-100/50">
               <p className="text-sm text-slate-600 font-medium flex items-center">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                 Total: {result.energy_estimate}
               </p>
            </div>
          </div>

          {/* CO2 Emissions */}
          <div className="glass bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-white shadow-sm flex flex-col justify-between">
            <div>
               <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-800">Carbon Footprint</h3>
              </div>
              <p className="text-3xl font-bold text-slate-800 tracking-tight">{result.co2_emissions}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">per 1 million executions</p>
            </div>
          </div>

           {/* Hotspots Panel */}
           <div className="glass rounded-2xl p-6 border border-white shadow-sm col-span-1 sm:col-span-2">
             <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Optimization Opportunities
                <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    {result.hotspots.length} Found
                </span>
             </h3>
             <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {result.hotspots.map((hotspot, idx) => (
                    <div key={idx} className="group flex items-start justify-between p-4 rounded-xl bg-white border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-200">
                        <div>
                            <p className="font-semibold text-slate-800 text-sm">{hotspot.issue}</p>
                            <p className="text-sm text-slate-500 mt-1 flex items-center">
                                <Leaf className="w-3 h-3 mr-1 text-emerald-500" /> 
                                {hotspot.suggestion}
                            </p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
                            hotspot.impact === 'High' ? 'bg-red-50 text-red-600 border border-red-100' : 
                            hotspot.impact === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                            'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                            {hotspot.impact}
                        </span>
                    </div>
                ))}
                {result.hotspots.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle className="w-12 h-12 text-emerald-300 mb-2" />
                        <p className="text-slate-500 text-sm font-medium">Clean code! No significant hotspots found.</p>
                    </div>
                )}
             </div>
           </div>
        </div>
      </div>

      {/* Code Comparison Section */}
      <div className="glass rounded-2xl shadow-lg shadow-slate-200/50 border border-white overflow-hidden mt-8">
        <div className="border-b border-slate-200 flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md">
            <div className="flex p-1 bg-slate-100 rounded-lg">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center ${activeTab === 'code' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <CodeIcon className="w-4 h-4 mr-1.5" />
                    Code Diff
                </button>
            </div>
            
            {activeTab === 'code' && (
                <button 
                    onClick={handleCopy}
                    className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-emerald-600 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm hover:border-emerald-200 transition-all"
                >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Optimized'}</span>
                </button>
            )}
        </div>

        <div className="p-0">
            {activeTab === 'overview' ? (
                <div className="p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3 text-sm">AI</span>
                        Optimization Strategy
                    </h3>
                    <div className="prose prose-emerald max-w-none text-slate-600 leading-relaxed bg-white/60 p-6 rounded-xl border border-white shadow-inner">
                        <p className="whitespace-pre-line">{result.explanation}</p>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={() => setActiveTab('code')}
                            className="group flex items-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            View Optimized Code <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 h-[600px]">
                    <div className="bg-slate-50 flex flex-col h-full">
                        <div className="px-4 py-2 bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
                            <span>Original</span>
                        </div>
                        <div className="flex-grow overflow-auto custom-scrollbar">
                            <pre className="p-6 text-sm text-slate-600 whitespace-pre font-mono leading-relaxed">
                                {originalCode}
                            </pre>
                        </div>
                    </div>
                    <div className="bg-emerald-50/20 flex flex-col h-full relative">
                        <div className="px-4 py-2 bg-emerald-50/80 border-b border-emerald-100/50 text-xs font-semibold text-emerald-600 uppercase tracking-wider flex justify-between items-center sticky top-0 backdrop-blur-sm z-10">
                            <span>Green Optimized</span>
                            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                                <Zap className="w-3 h-3 fill-current" /> Recommended
                            </span>
                        </div>
                        <div className="flex-grow overflow-auto custom-scrollbar">
                            <pre className="p-6 text-sm text-slate-800 whitespace-pre font-mono leading-relaxed selection:bg-emerald-200">
                                {result.optimized_code}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};