"use client";
import { useState } from 'react';
import { encryptData, decryptData } from '../lib/crypto';

export default function Home() {
  const [mode, setMode] = useState('encrypt');
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [isMasked, setIsMasked] = useState(false); // DEFAULT: Show text
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !password) return;
    try {
      const res = mode === 'encrypt' 
        ? await encryptData(text, password) 
        : await decryptData(text, password);
      setResult(res);
    } catch (err) {
      setResult("Error: Secure Context (HTTPS) Required.");
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="selection:bg-zinc-800">
      {/* Outer wrapper controls symmetry and mobile stacking */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-14 py-12 px-6">
        
        {/* Nav Section: Stays narrow */}
        <div className="flex flex-row md:flex-col gap-6 md:gap-0 items-center md:items-start w-auto">
          <h1 
            className={`cursor-pointer text-3xl md:text-4xl font-bold tracking-tighter transition-all duration-300 ${mode === 'encrypt' ? 'text-white' : 'text-zinc-800 hover:text-zinc-700'}`}
            onClick={() => { setMode('encrypt'); setResult(''); }}
          >
            ENCRYPT
          </h1>
          <h1 
            className={`cursor-pointer text-3xl md:text-4xl font-bold tracking-tighter transition-all duration-300 ${mode === 'decrypt' ? 'text-white' : 'text-zinc-800 hover:text-zinc-700'}`}
            onClick={() => { setMode('decrypt'); setResult(''); }}
          >
            DECRYPT
          </h1>
        </div>

        {/* Form Area: Locked at 240px for that classic symmetrical look */}
        <div className="w-[240px] flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder={mode === 'encrypt' ? "text" : "hash"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
              className="bg-transparent border-b border-zinc-800 outline-none py-1 text-sm font-light focus:border-zinc-500 transition-colors placeholder:text-zinc-800"
            />
            
            <div className="relative">
              <input
                type="text" // Always text to block password managers
                placeholder="key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                className={`w-full bg-transparent border-b border-zinc-800 outline-none py-1 text-sm font-light focus:border-zinc-500 transition-colors placeholder:text-zinc-800 ${isMasked ? 'mask-key' : ''}`}
              />
              <button 
                type="button"
                onClick={() => setIsMasked(!isMasked)}
                className="absolute right-0 bottom-2 text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-700 hover:text-zinc-400 transition-colors"
              >
                {isMasked ? "Show" : "Hide"}
              </button>
            </div>

            <button 
              type="submit"
              className="mt-2 border border-white bg-black hover:bg-white hover:text-black transition-all py-2 text-[10px] font-bold uppercase tracking-[0.4em]"
            >
              {mode}
            </button>
          </form>

          {/* Dotted Result Box */}
          {result && (
            <div className="relative p-4 border border-dashed border-zinc-800 bg-zinc-950/20 rounded-sm animate-in fade-in slide-in-from-top-1">
              <div className="flex justify-between items-start mb-3">
                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold italic">
                  Output
                </p>
                <button 
                  onClick={handleCopy} 
                  className="mt-[-2px] mr-[-2px] p-1 transition-all active:scale-75"
                >
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-in zoom-in"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-white transition-colors"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    )}
                </button>
              </div>
              <p className="text-xs font-light leading-relaxed break-all text-zinc-400">
                {result}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* The Animated Rainbow Line */}
      <div className="fixed bottom-0 left-0 w-full h-[1px] animate-rainbow"></div>
    </main>
  );
}