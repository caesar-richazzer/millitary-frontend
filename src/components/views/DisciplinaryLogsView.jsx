import React from 'react';

export default function DisciplinaryLogsView({ allInfractions }) {
  return (
    <div className="space-y-6">
      <div className="gemini-card p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <i className="bi bi-clipboard-data-fill text-rose-400"></i> Battalion Disciplinary Incident Logs
        </h2>

        {allInfractions.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            ✅ No unresolved disciplinary infractions logged in the battalion.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-emerald-400 font-bold border-b border-emerald-500/20">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Officer</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Incident Summary</th>
                  <th className="p-3">Penalty Assigned</th>
                  <th className="p-3">Recorded By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/10">
                {allInfractions.map((inf, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono">{inf.date_incident}</td>
                    <td className="p-3 font-bold text-white">{inf.officer_name} ({inf.officer_p_number})</td>
                    <td className="p-3 font-bold text-rose-400">{inf.category}</td>
                    <td className="p-3">{inf.title}</td>
                    <td className="p-3">{inf.punishment_assigned}</td>
                    <td className="p-3 text-slate-400">{inf.recorded_by || 'Admin'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}