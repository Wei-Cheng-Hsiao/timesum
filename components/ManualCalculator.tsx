
import React, { useState, useEffect } from 'react';
import { formatTime, addTime } from '../utils/timeUtils';
import { ArrowRight, RotateCcw, Plus, Clock } from 'lucide-react';

const ManualCalculator: React.FC = () => {
  const [baseTime, setBaseTime] = useState<string>('');
  const [addHours, setAddHours] = useState<number>(0);
  const [addMinutes, setAddMinutes] = useState<number>(0);
  const [result, setResult] = useState<string>('');
  const [isNextDay, setIsNextDay] = useState<boolean>(false);

  useEffect(() => {
    setBaseTime(formatTime(new Date()));
  }, []);

  useEffect(() => {
    if (baseTime) {
      const { result: calculatedTime, isNextDay: nextDay } = addTime(baseTime, addHours, addMinutes);
      setResult(calculatedTime);
      setIsNextDay(nextDay);
    }
  }, [baseTime, addHours, addMinutes]);

  const handleReset = () => {
    setBaseTime(formatTime(new Date()));
    setAddHours(0);
    setAddMinutes(0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <Clock size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">開始時間</span>
        </div>
        <input
          type="time"
          value={baseTime}
          onChange={(e) => setBaseTime(e.target.value)}
          className="w-full bg-slate-950 text-white text-4xl font-mono p-4 rounded-2xl border border-slate-800 outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <Plus size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">增加時長</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="number"
              value={addHours}
              onChange={(e) => setAddHours(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-950 text-white text-3xl font-mono p-4 rounded-2xl border border-slate-800 outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-bold">HR</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={addMinutes}
              onChange={(e) => setAddMinutes(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-950 text-white text-3xl font-mono p-4 rounded-2xl border border-slate-800 outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-bold">MIN</span>
          </div>
        </div>
      </div>

      <div className="relative p-8 bg-gradient-to-br from-indigo-950 to-slate-950 rounded-[2.5rem] border border-indigo-500/20 shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">預計結果</span>
        <div className="text-7xl font-black font-mono tracking-tighter text-white">
          {result}
        </div>
        {isNextDay && (
          <div className="mt-4 text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            隔日 (+1 Day)
          </div>
        )}
      </div>

      <button onClick={handleReset} className="w-full py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
        <RotateCcw size={14} /> 重置計算
      </button>
    </div>
  );
};

export default ManualCalculator;
