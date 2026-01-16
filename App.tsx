
import React from 'react';
import TimeCalculator from './components/TimeCalculator';

const App: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#020617] text-slate-100 overflow-hidden">
      {/* 背景光暈 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      {/* 頂部標題 */}
      <header className="safe-pt pt-10 pb-4 text-center z-10 shrink-0">
        <h1 className="text-2xl font-black tracking-tighter flex items-center justify-center gap-2">
          <span className="text-white">Time</span>
          <span className="text-indigo-500 font-mono">Plus+</span>
        </h1>
      </header>

      {/* 主要內容區 */}
      <main className="flex-1 overflow-y-auto px-6 z-10 flex flex-col items-center justify-center pb-20">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TimeCalculator />
        </div>
      </main>

      {/* 底部裝飾 */}
      <footer className="py-6 flex flex-col items-center opacity-20 safe-pb shrink-0 z-10">
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">24H System Only</p>
      </footer>
    </div>
  );
};

export default App;
