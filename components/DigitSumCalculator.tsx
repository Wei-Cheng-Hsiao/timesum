
import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

const DigitSumCalculator: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [frozenTime, setFrozenTime] = useState<Date | null>(null);

  // 更新時鐘
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 鍵盤支援
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        toggleCapture();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [frozenTime]);

  const toggleCapture = () => {
    setFrozenTime(frozenTime ? null : new Date());
  };

  const timeToProcess = frozenTime || currentTime;
  const hStr = timeToProcess.getHours().toString().padStart(2, '0');
  const mStr = timeToProcess.getMinutes().toString().padStart(2, '0');
  
  // 計算邏輯
  const allDigits = [...hStr.split('').map(Number), ...mStr.split('').map(Number)];
  const sum = allDigits.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="flex flex-col items-center space-y-12">
      
      {/* 主顯示區塊 */}
      <div 
        onClick={toggleCapture}
        className="w-full bg-slate-900/40 border border-slate-800/60 rounded-[3rem] p-10 md:p-14 shadow-2xl backdrop-blur-2xl flex flex-col items-center transition-transform active:scale-[0.98] cursor-pointer"
      >
        
        {/* 狀態標籤 */}
        <div className="mb-12">
          <div className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border transition-all duration-500 ${
            frozenTime ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${frozenTime ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></span>
            <span className={`text-[10px] font-black uppercase tracking-widest ${frozenTime ? 'text-amber-400' : 'text-emerald-400'}`}>
              {frozenTime ? '已固定時間' : '即時同步中'}
            </span>
          </div>
        </div>

        {/* 24小時制時間顯示 */}
        <div className="flex items-center gap-4 text-7xl md:text-8xl font-black text-white font-mono tracking-tighter mb-14">
          <div className="bg-slate-950 px-5 py-4 rounded-[2rem] border border-slate-800 shadow-xl">
            {hStr}
          </div>
          <span className={`text-slate-800 mb-2 ${!frozenTime && 'animate-pulse'}`}>:</span>
          <div className="bg-slate-950 px-5 py-4 rounded-[2rem] border border-slate-800 shadow-xl">
            {mStr}
          </div>
        </div>

        {/* 結果數值 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-10"></div>
          
          <div className="relative">
            {/* 背景發光效果 */}
            <div className="absolute inset-0 bg-indigo-600/30 blur-3xl rounded-full scale-150"></div>
            
            <div className="relative w-36 h-36 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-full shadow-2xl border-[5px] border-white/10">
              <span className="text-6xl font-black tracking-tighter leading-none">{sum}</span>
              <span className="text-[10px] font-black opacity-60 mt-1 uppercase tracking-widest">總和</span>
            </div>
          </div>
        </div>
      </div>

      {/* 控制按鈕 */}
      <div className="w-full max-w-xs flex flex-col items-center gap-6">
        <button
          onClick={toggleCapture}
          className={`
            w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 border shadow-2xl active:scale-95
            ${frozenTime 
              ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700' 
              : 'bg-white text-slate-950 border-white hover:bg-slate-100'
            }
          `}
        >
          {frozenTime ? <RotateCcw size={16} /> : <Calculator size={16} />}
          {frozenTime ? '恢復即時時鐘' : '捕捉並計算'}
        </button>
        
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.2em] text-center opacity-60 leading-relaxed">
          點擊上方時鐘或按鈕即可捕捉當前時間
        </p>
      </div>

    </div>
  );
};

export default DigitSumCalculator;
