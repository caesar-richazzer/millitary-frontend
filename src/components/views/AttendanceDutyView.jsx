import React from 'react';

export default function AttendanceDutyView({ safeOfficers }) {
  return (
    <div className="space-y-6">
      <div className="gemini-card p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <i className="bi bi-calendar-check-fill text-emerald-400"></i> Officer Duty & Attendance Roster
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-emerald-400 font-bold border-b border-emerald-500/20">
              <tr>
                <th className="p-3">P-Number</th>
                <th className="p-3">Officer Name</th>
                <th className="p-3">Rank</th>
                <th className="p-3">Department</th>
                <th className="p-3">Housing Quarters</th>
                <th className="p-3">Duty Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {safeOfficers.map(o => (
                <tr key={o.p_service_number} className="hover:bg-slate-900/50">
                  <td className="p-3 font-mono font-bold text-white">{o.p_service_number}</td>
                  <td className="p-3 font-bold">{o.first_name} {o.last_name}</td>
                  <td className="p-3">{o.rank}</td>
                  <td className="p-3 text-emerald-400 font-bold">{o.department}</td>
                  <td className="p-3">{o.housing_quarters || 'SOM Quarters'}</td>
                  <td className="p-3">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                      {o.duty_status || 'ACTIVE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}