import React from 'react';

export default function DashboardView({ safeOfficers }) {
  return (
    <div className="space-y-6">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="gemini-card p-5 rounded-3xl relative overflow-hidden">
          <div className="text-xs font-bold text-slate-400 mb-1">Total Employed Officers</div>
          <div className="text-3xl font-black text-white">{safeOfficers.length}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
            <i className="bi bi-shield-check"></i> Registered in Django DB
          </div>
        </div>

        <div className="gemini-card p-5 rounded-3xl relative overflow-hidden">
          <div className="text-xs font-bold text-slate-400 mb-1">Active Duty Officers</div>
          <div className="text-3xl font-black text-emerald-400">
            {safeOfficers.filter(o => o.duty_status === 'ACTIVE' || !o.duty_status).length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-2">Ready for Command</div>
        </div>

        <div className="gemini-card p-5 rounded-3xl relative overflow-hidden">
          <div className="text-xs font-bold text-slate-400 mb-1">Disciplinary Holds</div>
          <div className="text-3xl font-black text-rose-400">
            {safeOfficers.filter(o => Array.isArray(o.infractions) && o.infractions.length > 0).length}
          </div>
          <div className="text-[11px] text-rose-400 font-medium mt-2">Active Incident Logs</div>
        </div>

        <div className="gemini-card p-5 rounded-3xl relative overflow-hidden">
          <div className="text-xs font-bold text-slate-400 mb-1">Active Command Stations</div>
          <div className="text-3xl font-black text-blue-400">5</div>
          <div className="text-[11px] text-slate-400 font-medium mt-2">HQ, Training, Security, Zana, Afya</div>
        </div>
      </div>

      {/* DEPARTMENT ROSTER METRICS */}
      <div className="gemini-card p-6 rounded-3xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <i className="bi bi-diagram-3-fill text-emerald-400"></i> Department Distribution Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-medium">
          {['HQ', 'TRAINING', 'SECURITY', 'LOGISTICS', 'MEDICAL'].map(dept => {
            const count = safeOfficers.filter(o => o.department === dept).length;
            return (
              <div key={dept} className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 text-center">
                <div className="text-slate-400 mb-1 font-bold">{dept}</div>
                <div className="text-xl font-bold text-white">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}