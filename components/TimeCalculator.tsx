
import React, { useState, useEffect } from 'react';
import { Plus, Clock, ArrowDown } from 'lucide-react';

const TimeCalculator: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [addH, setAddH] = useState<string>('');
  const [addM, setAddM] = useState<string>('');

  // 即時時鐘更新
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 計算邏輯
  const calculateResult = () => {
    const h = parseInt(addH) || 0;
    const m = parseInt(addM) || 0;
    const resultDate = new Date(now.getTime() + (h * 60 * 60 * 1000) + (m * 60 * 1000));
    
    const resH = resultDate.getHours().toString().padStart(2, '0');
    const resM = resultDate.getMinutes().toString().padStart(2, '0');
    
    // 判斷是否跨日
    const isNextDay = resultDate.getDate() !== now.getDate();
    
    return { time: `${resH}:${resM}`, isNextDay };
  };

  const result = calculateResult();

  return (
    <div className="flex flex-col items-center w-full space-y-8">
      
      {/* 1. 當前時間卡片 */}
      <div className="w-full bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-8 backdrop-blur-xl flex flex-col items-center shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">現在時間</span>
        </div>
        <div className="text-6xl font-black font-mono text-white tracking-tighter">
          {now.getHours().toString().padStart(2, '0')}
          <span className="animate-pulse mx-1">:</span>
          {now.getMinutes().toString().padStart(2, '0')}
        </div>
      </div>

      {/* 中間連接點 */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
        <Plus size={24} />
      </div>

      {/* 2. 輸入加法區域 */}
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-[2rem] flex flex-col items-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">增加小時</span>
          <div className="relative w-full">
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={addH}
              onChange={(e) => setAddH(e.target.value.slice(0, 3))}
              className="w-full bg-transparent text-center text-4xl font-black font-mono text-white outline-none placeholder:opacity-20"
            />
          </div>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-[2rem] flex flex-col items-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">增加分鐘</span>
          <div className="relative w-full">
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={addM}
              onChange={(e) => setAddM(e.target.value.slice(0, 3))}
              className="w-full bg-transparent text-center text-4xl font-black font-mono text-white outline-none placeholder:opacity-20"
            />
          </div>
        </div>
      </div>

      <ArrowDown size={20} className="text-slate-700 animate-bounce" />

      {/* 3. 結果卡片 */}
      <div className="w-full relative group">
        <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative w-full bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-10 shadow-2xl border border-white/10 flex flex-col items-center">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60 mb-4">預計結果時間</span>
          <div className="text-8xl font-black font-mono text-white tracking-tighter leading-none">
            {result.time}
          </div>
          {result.isNextDay && (
            <div className="mt-6 px-4 py-1.5 bg-white/10 rounded-full border border-white/20">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">隔日 (+1 Day)</span>
            </div>
          )}
        </div>
      </div>

      {/* 清除按鈕 */}
      {(addH || addM) && (
        <button 
          onClick={() => { setAddH(''); setAddM(''); }}
          className="text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-400 transition-colors"
        >
          重置加法
        </button>
      )}

    </div>
  );
};

export default TimeCalculator;
