import React from 'react';

export default function PrintableOfficerDossier({ officer, onClose }) {
  const data = officer || {};

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 overflow-y-auto p-4 flex justify-center items-start">
      <div className="bg-white text-slate-800 w-full max-w-4xl p-8 rounded-3xl shadow-2xl my-6 border border-slate-200 print:shadow-none print:m-0 print:p-4 print:w-full print:border-none print:rounded-none">
        
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6 print:hidden">
          <button 
            onClick={onClose}
            className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-2xl hover:bg-slate-200 flex items-center gap-1.5"
          >
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2 rounded-2xl shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <i className="bi bi-printer-fill"></i> Print Officer 
          </button>
        </div>

        <div className="text-center border-b pb-4 mb-6">
          <div className="text-xs font-bold text-slate-500 tracking-widest uppercase">JESHI LA KUJENGA TAIFA (JKT)</div>
          <h1 className="text-xl font-bold text-slate-800 uppercase tracking-tight">834 KJ MAKUTUPORA JKT - DODOMA</h1>
          <h2 className="text-sm font-semibold text-blue-600 uppercase mt-0.5">Official Officer Dossier </h2>
        </div>

        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div className="space-y-1 text-xs">
            <div><strong className="w-36 inline-block text-slate-500">Service P-Number:</strong> <span className="font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">{data.p_service_number}</span></div>
            <div><strong className="w-36 inline-block text-slate-500">NIDA Number:</strong> {data.nida_number}</div>
            <div><strong className="w-36 inline-block text-slate-500">Rank:</strong> <span className="font-bold">{data.rank}</span></div>
            <div><strong className="w-36 inline-block text-slate-500">Department:</strong> {data.department}</div>
            <div><strong className="w-36 inline-block text-slate-500">Appointment:</strong> {data.primary_appointment}</div>
          </div>

          <div className="w-28 h-32 border border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 text-center p-2">
            <i className="bi bi-shield-shaded text-3xl text-slate-400 mb-1"></i>
            <div className="text-[9px] font-semibold text-slate-400">OFFICER SEAL</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold uppercase mb-2">1. Personal & Service Bio</h3>
          <div className="grid grid-cols-3 gap-3 text-xs border border-slate-100 p-3 rounded-2xl bg-slate-50/50">
            <div><strong>First Name:</strong> {data.first_name}</div>
            <div><strong>Middle Name:</strong> {data.middle_name}</div>
            <div><strong>Last Name:</strong> {data.last_name}</div>
            <div><strong>Gender:</strong> {data.gender}</div>
            <div><strong>Blood Group:</strong> {data.blood_group}</div>
            <div><strong>Commission:</strong> {data.commission_type}</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold uppercase mb-2">2. Housing & Armory Assignment</h3>
          <div className="grid grid-cols-2 gap-3 text-xs border border-slate-100 p-3 rounded-2xl">
           
            <div>Quarters: <strong>{data.housing_quarters}</strong></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold uppercase mb-2">3. Disciplinary Record</h3>
          {data.infractions && data.infractions.length > 0 ? (
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-2 border-r border-slate-200">Date</th>
                  <th className="p-2 border-r border-slate-200">Category</th>
                  <th className="p-2 border-r border-slate-200">Incident</th>
                  <th className="p-2">Penalty</th>
                </tr>
              </thead>
              <tbody>
                {data.infractions.map((inf, idx) => (
                  <tr key={idx} className="border-t border-slate-200">
                    <td className="p-2 border-r border-slate-200">{inf.date_incident}</td>
                    <td className="p-2 border-r border-slate-200 font-bold text-rose-600">{inf.category}</td>
                    <td className="p-2 border-r border-slate-200">{inf.title}</td>
                    <td className="p-2">{inf.punishment_assigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="border border-slate-100 p-3 rounded-2xl text-xs text-blue-600 bg-blue-50/50 font-medium flex items-center gap-1.5">
              <i className="bi bi-check-circle-fill"></i> Good Record — No Disciplinary Infractions Recorded.
            </div>
          )}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div className="text-center">
            <div className="h-10 border-b border-dashed border-slate-300 mb-1"></div>
            <div>Administration Officer Signature</div>
          </div>
          <div className="text-center">
            <div className="h-10 border-b border-dashed border-slate-300 mb-1"></div>
            <div>Commanding Officer Signature</div>
          </div>
        </div>

      </div>
    </div>
  );
}
