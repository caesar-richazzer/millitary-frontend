import React from 'react';

export default function AuditHistoryView({ session }) {
  return (
    <div className="space-y-6">
      <div className="gemini-card p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <i className="bi bi-shield-check text-emerald-400"></i> C4ISR System Security Audit Trail
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-emerald-400 font-bold border-b border-emerald-500/20">
              <tr>
                <th className="p-3">Timestamp (EAT)</th>
                <th className="p-3">Admin ID</th>
                <th className="p-3">Action Performed</th>
                <th className="p-3">Security Event</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-mono text-slate-400">03-AUG-2026 19:58:00</td>
                <td className="p-3 font-mono font-bold text-white">{session?.p_service_number || 'P-12345'}</td>
                <td className="p-3 font-bold text-emerald-400">AUTHENTICATED_LOGIN</td>
                <td className="p-3">JWT Session Issued</td>
                <td className="p-3 font-mono text-slate-400">127.0.0.1 (Localhost)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}