import React from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2018', burden: 20 },
  { year: '2019', burden: 35 },
  { year: '2020', burden: 85 },
  { year: '2021', burden: 70 },
  { year: '2022', burden: 95 },
  { year: '2023', burden: 110 },
  { year: '2024', burden: 135 },
];

export function TimeTaxChart() {
  return (
    <div className="w-full h-48 bg-white/5 dark:bg-slate-900/40 rounded-2xl p-4 border border-white/10 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">Empirical Burden (Hours/Year)</h4>
        <span className="text-[10px] font-mono text-brand-jade font-bold">+575% Index Drift</span>
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBurden" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d1e0" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#00d1e0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff" opacity={0.1} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '8px', 
                fontSize: '10px',
                color: '#fff'
              }}
              itemStyle={{ color: '#00d1e0' }}
              labelStyle={{ display: 'none' }}
              cursor={{ stroke: 'rgba(0,209,224,0.2)', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="burden" 
              stroke="#00d1e0" 
              fillOpacity={1} 
              fill="url(#colorBurden)" 
              strokeWidth={3}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
