import React from 'react';

export default function UserAccessView({ session }) {
  return (
    <div className="space-y-6">
      <div className="gemini-card p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">System Administrator Roster</h2>
            <p className="text-xs text-slate-400">Authorized High-Command Personnel with Admin Access</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-emerald-400 font-bold border-b border-emerald-500/20">
              <tr>
                <th className="p-3">Admin P-Number</th>
                <th className="p-3">Rank & Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Security Clearance</th>
                <th className="p-3">Access Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              <tr className="hover:bg-slate-900/50">
                <td className="p-3 font-mono font-bold text-white">{session?.p_service_number || 'P-12345'}</td>
                <td className="p-3 font-bold">{session?.rank || 'Kanali'} {session?.first_name || 'caesar richazzer'}</td>
                <td className="p-3">{session?.department || 'HQ Admin'}</td>
                <td className="p-3 text-emerald-400 font-bold">Level 4: Command High Security</td>
                <td className="p-3">
                  <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                    Active Admin
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}