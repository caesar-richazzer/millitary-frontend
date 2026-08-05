import React, { useEffect } from 'react';

export default function WelcomeSplash({ onComplete }) {
  useEffect(() => {
    // 5-second automatic transition timer
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col items-center justify-center p-6 select-none relative overflow-hidden font-sans">
      
      {/* SOFT FADED GREEN GRADIENT OVERLAY ON WHITE CANVAS */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none"></div>
      
      {/* REAL-TIME DYNAMIC GREEN SMOKE WAVES ON SIDES */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-[500px] bg-emerald-400/20 rounded-full filter blur-[100px] pointer-events-none animate-gemini-smoke-left"></div>
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-[500px] bg-teal-300/20 rounded-full filter blur-[100px] pointer-events-none animate-gemini-smoke-right"></div>

      {/* CENTER CONTAINER: LOGO + INITIALIZING + 5 PULSING DOTS ONLY */}
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl border border-emerald-200/80 p-8 rounded-3xl text-center relative z-10 shadow-2xl shadow-emerald-500/10 space-y-6">
        
        {/* LOGO */}
        <div className="w-20 h-20 rounded-2xl bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 animate-pulse">
          <i className="bi bi-shield-shaded"></i>
        </div>

        {/* ONLY THE WORD "INITIALIZING..." */}
        <h1 className="text-xl font-extrabold text-slate-800 tracking-wider">
          Initializing...
        </h1>

        {/* 5 DOTTED PULSING LOADER */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 animate-pulse [animation-delay:150ms]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/60 animate-pulse [animation-delay:300ms]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/40 animate-pulse [animation-delay:450ms]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 animate-pulse [animation-delay:600ms]"></div>
        </div>

      </div>

    </div>
  );
}