import React, { useState, useEffect } from 'react';
import { formatTime } from '../utils/timeUtils';
import { Clock as ClockIcon } from 'lucide-react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 w-full mb-8">
      <div className="flex items-center gap-3 text-indigo-400 mb-2">
        <ClockIcon size={20} />
        <span className="text-sm font-medium uppercase tracking-wider">Current Time</span>
      </div>
      <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300 font-mono tracking-tighter">
        {formatTime(time)}
      </div>
      <div className="text-slate-400 mt-2 text-sm font-medium">
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};

export default Clock;