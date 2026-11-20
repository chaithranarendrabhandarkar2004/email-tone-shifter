
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Send, 
  Copy, 
  RotateCcw, 
  History as HistoryIcon, 
  Mail, 
  Sparkles, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft
} from 'lucide-react';
import { ToneType, LengthType, ShiftHistory } from './types';
import { shiftTone } from './services/geminiService';

const App: React.FC = () => {
  const [draft, setDraft] = useState('');
  const [result, setResult] = useState('');
  const [tone, setTone] = useState<ToneType>(ToneType.PROFESSIONAL);
  const [length, setLength] = useState<LengthType>(LengthType.STANDARD);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ShiftHistory[]>([]);
  const [copyStatus, setCopyStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('tone_shifter_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    localStorage.setItem('tone_shifter_history', JSON.stringify(history));
  }, [history]);

  const handleShift = async () => {
    if (!draft.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const shiftedText = await shiftTone(draft, tone, length);
      setResult(shiftedText);
      
      const newHistoryItem: ShiftHistory = {
        id: Date.now().toString(),
        original: draft,
        shifted: shiftedText,
        tone: tone,
        timestamp: Date.now()
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 20)); // Keep last 20
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tone_shifter_history');
  };

  const loadFromHistory = (item: ShiftHistory) => {
    setDraft(item.original);
    setResult(item.shifted);
    setTone(item.tone);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Email Tone <span className="text-blue-600">Shifter</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Professional
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Polite
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Effective
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Don't hit send on that rant.
          </h2>
          <p className="text-lg text-slate-600">
            Paste your "messy" draft below, select your desired tone, and let AI transform it into a professional email that gets results.
          </p>
        </div>

        {/* Shifter Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Input Side */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Your Messy Draft
              </h3>
              <button 
                onClick={() => setDraft('')}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Clear draft"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Example: I'm sick of waiting for the report. You said it would be done Tuesday. Stop being lazy and send it now or I'm telling the boss."
              className="flex-grow p-4 resize-none focus:outline-none text-slate-800 leading-relaxed placeholder:text-slate-400"
            />
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Desired Tone</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value as ToneType)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  >
                    {Object.values(ToneType).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Length</label>
                  <select 
                    value={length}
                    onChange={(e) => setLength(e.target.value as LengthType)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  >
                    {Object.values(LengthType).map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                onClick={handleShift}
                disabled={isLoading || !draft.trim()}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                  isLoading || !draft.trim() 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Shifting Tone...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Professionalize Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Side */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Result
              </h3>
              {result && (
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {copyStatus ? (
                    <><CheckCircle2 className="w-4 h-4" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy Email</>
                  )}
                </button>
              )}
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-slate-50/30">
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
              {result ? (
                <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-medium animate-in fade-in duration-500">
                  {result}
                </div>
              ) : !isLoading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                  <Mail className="w-16 h-16 stroke-1" />
                  <p className="text-center font-medium">Your polished email will appear here.</p>
                </div>
              )}
              {isLoading && (
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-2/3 animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HistoryIcon className="w-5 h-5 text-blue-600" /> Recent Shifts
              </h3>
              <button 
                onClick={clearHistory}
                className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => loadFromHistory(item)}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {item.tone}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 italic mb-3">
                    "{item.original}"
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Load draft <Send className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Email Tone Shifter. Professionalize your office communications with AI.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
