import React, { useState } from 'react';

export default function DepartmentsView({ safeOfficers, onSelectOfficer }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departmentsList = [
    { code: '834KJ-BHQ', title: '834KJ-BHQ', desc: 'Battalion Headquarters Command', icon: 'bi-building-fill-gear' },
    { code: '8934KJ-ADMINI', title: '8934KJ-ADMINI', desc: 'Administration & Personnel Branch', icon: 'bi-briefcase-fill' },
    { code: 'IO', title: 'IO', desc: 'Intelligence Officer & Security Branch', icon: 'bi-eye-fill' },
    { code: 'QM-tawi la siliha', title: 'QM-tawi la siliha', desc: 'Quarter Master & Armory Branch', icon: 'bi-box-seam-fill' },
    { code: '834KJ-ZAHANATI', title: '834KJ-ZAHANATI', desc: 'Medical Corps & Sick Bay', icon: 'bi-hospital-fill' },
    { code: 'UDM', title: 'UDM', desc: 'Unit Discipline Master Command', icon: 'bi-gavel' },
    { code: 'RADIO OPERATOR', title: 'RADIO OPERATOR', desc: 'Communications & Signals Wing', icon: 'bi-broadcast-pin' },
    { code: '834KJ-mafunzo', title: '834KJ-mafunzo', desc: 'Recruit & Officer Training Wing', icon: 'bi-mortarboard-fill' },
    { code: '834KJ-O/MESS & INSTIUTES', title: '834KJ-O/MESS & INSTIUTES', desc: 'Officers Mess & Educational Institutes', icon: 'bi-cup-hot-fill' },
    { code: '834KJ-VETA', title: '834KJ-VETA', desc: 'Vocational Education & Training Wing', icon: 'bi-tools' },
  ];

  const filteredOfficers = selectedDepartment 
    ? safeOfficers.filter(o => (o.department || '').toLowerCase().includes(selectedDepartment.toLowerCase()))
    : [];

  return (
    <div className="space-y-6">
      {!selectedDepartment ? (
        /* GRID OF 10 DEPARTMENTS */
        <div className="space-y-4">
          <div className="border-b border-emerald-500/20 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-buildings-fill text-emerald-400"></i> 834 KJ Command Departments & Stations
            </h2>
            <p className="text-xs text-slate-400 mt-1">Select a department to view assigned Commissioned Officers and Non-Officers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {departmentsList.map((dept) => {
              const deptOfficers = safeOfficers.filter(o => (o.department || '').toLowerCase().includes(dept.code.toLowerCase()));
              const ncoKeywords = ['askari', 'private', 'koplo', 'corporal', 'sajenti', 'sergeant', 'wara', 'warrant'];
              const ncoCount = deptOfficers.filter(o => ncoKeywords.some(k => (o.rank || '').toLowerCase().includes(k))).length;
              const commissionedCount = deptOfficers.length - ncoCount;

              return (
                <div
                  key={dept.code}
                  onClick={() => setSelectedDepartment(dept.code)}
                  className="gemini-card p-5 rounded-3xl hover:border-emerald-500/50 hover:scale-[1.02] transition-all cursor-pointer space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl font-bold shadow-lg">
                      <i className={`bi ${dept.icon}`}></i>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-900 px-3 py-1 rounded-full border border-emerald-500/30">
                      {deptOfficers.length} Assigned
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{dept.title}</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">{dept.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-emerald-500/20 flex justify-between items-center text-xs font-semibold text-slate-300">
                    <span>Officers: <strong className="text-white">{commissionedCount}</strong></span>
                    <span>Non-Officers: <strong className="text-white">{ncoCount}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* SELECTED DEPARTMENT PERSONNEL VIEW */
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
            <button
              onClick={() => setSelectedDepartment(null)}
              className="bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:bg-slate-800 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-all"
            >
              <i className="bi bi-arrow-left"></i> Back to All Departments
            </button>
            <span className="text-xs font-bold text-white bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              Station: {selectedDepartment}
            </span>
          </div>

          <div className="gemini-card p-6 rounded-3xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-people-fill text-emerald-400"></i> Assigned Personnel in {selectedDepartment}
            </h2>

            {filteredOfficers.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                📭 No military personnel currently assigned to {selectedDepartment}.
              </div>
            ) : (
              <div className="space-y-2.5 max-w-4xl mx-auto">
                {filteredOfficers.map(o => (
                  <div
                    key={o.id || o.p_service_number}
                    onClick={() => onSelectOfficer(o)}
                    className="gemini-card p-3 px-4 rounded-2xl flex items-center justify-between hover:bg-slate-900/90 hover:border-emerald-500/40 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-emerald-500 to-teal-400 shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center">
                          {o.profile_photo ? (
                            <img src={o.profile_photo} alt="Officer" className="w-full h-full object-cover" />
                          ) : (
                            <i className="bi bi-person-fill text-xl text-slate-400"></i>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white truncate">{o.first_name} {o.last_name}</h3>
                        <div className="text-xs text-slate-400">{o.rank} • <span className="text-emerald-400 font-semibold">{o.department}</span></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-900 px-3 py-1 rounded-full border border-emerald-500/30">
                        {o.p_service_number}
                      </span>
                      <i className="bi bi-chevron-right text-slate-500 text-xs"></i>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}