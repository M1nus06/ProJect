import React from 'react';
import { Ambulance, Building2, ShieldCheck, Activity } from 'lucide-react';

export default function Navbar({ tab, setTab, cases }) {
  const pendingCount = cases.filter(c => c.status === 'pending').length;

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold">ระบบส่งต่อผู้ป่วยฉุกเฉิน</h1>
            <p className="text-xs text-slate-400">ศูนย์ลำดวน &bull; โรงพยาบาล</p>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => setTab('lamduan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              tab === 'lamduan' ? 'bg-rose-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Ambulance className="w-4 h-4" />
            <span>1. ศูนย์ลำดวน (คีย์ข้อมูล)</span>
          </button>

          <button
            onClick={() => setTab('hospital')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              tab === 'hospital' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>2. โรงพยาบาล (Dashboard)</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              tab === 'admin' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3. หลังบ้าน (Admin)</span>
          </button>
        </div>

      </div>
    </header>
  );
}
 