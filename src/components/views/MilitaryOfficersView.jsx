import React, { useState } from 'react';

export default function MilitaryOfficersView({
  safeOfficers,
  currentOfficer,
  setSelectedOfficer,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  setSelectedOfficerPrint,
  setSelectedOfficerEdit,
  setIsAddingNew,
  loading,
  isNonOfficerGroup
}) {
  const [viewMode, setViewMode] = useState('ROSTER_LIST'); // 'ROSTER_LIST' | 'DETAIL'
  const [selectedRankFilter, setSelectedRankFilter] = useState('ALL');

  const handleSelectOfficer = (officer) => {
    setSelectedOfficer(officer);
    setViewMode('DETAIL');
  };

  // 1. STRICT 100% BULLETPROOF RANK SEPARATION
  const ncoKeywords = ['askari', 'private', 'koplo', 'corporal', 'sajenti', 'sergeant', 'wara', 'warrant'];

  const categoryOfficers = safeOfficers.filter(o => {
    const rankLower = (o.rank || '').toLowerCase();
    
    // Check if this person has an NCO / Enlisted rank
    const isNcoRank = ncoKeywords.some(kw => rankLower.includes(kw));

    if (isNonOfficerGroup) {
      // NON-OFFICERS TAB: ONLY show NCOs, Corporals, Privates
      return isNcoRank;
    } else {
      // MILITARY OFFICERS TAB: STRICTLY EXCLUDE NCOs, Corporals, Privates
      return !isNcoRank;
    }
  });

  // 2. DYNAMIC RANK DROPDOWN FILTER
  const filteredByRankOfficers = categoryOfficers.filter(o => {
    if (selectedRankFilter === 'ALL') return true;
    return (o.rank || '').toLowerCase().includes(selectedRankFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {/* 1. REAL-TIME SEARCH BAR */}
      <div className="relative w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search Officer by P-Number, Rank, Name, or Department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0F1521]/90 border border-emerald-500/30 pl-11 pr-10 py-3 text-xs font-semibold text-white placeholder-slate-400 rounded-full focus:outline-none focus:border-emerald-400 shadow-xl shadow-emerald-500/10 transition-all"
        />
        <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-sm"></i>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
      </div>

      {/* 2. RANK FILTER DROPDOWN BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-3">
          {viewMode === 'DETAIL' && (
            <button
              onClick={() => setViewMode('ROSTER_LIST')}
              className="bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:bg-slate-800 text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <i className="bi bi-arrow-left"></i> Back to Roster List
            </button>
          )}
          <span className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-white">{filteredByRankOfficers.length}</strong> Record(s)
          </span>
        </div>

        {/* DYNAMIC RANK SELECTOR */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
            <i className="bi bi-funnel-fill text-emerald-400"></i> Filter by Rank:
          </span>
          <select
            value={selectedRankFilter}
            onChange={(e) => setSelectedRankFilter(e.target.value)}
            className="bg-slate-900 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-bold text-emerald-400 rounded-full focus:outline-none cursor-pointer shadow-md"
          >
            <option value="ALL" className="bg-slate-900 text-white">All Ranks (Vyeo Vyote)</option>
            {isNonOfficerGroup ? (
              <optgroup label="Non-Commissioned Staff & NCOs" className="bg-slate-900 text-emerald-400">
                <option value="Afisa Wara I" className="bg-slate-900 text-white">Afisa Wara I (WO I)</option>
                <option value="Afisa Wara II" className="bg-slate-900 text-white">Afisa Wara II (WO II)</option>
                <option value="Sajenti wa Platuani" className="bg-slate-900 text-white">Sajenti wa Platuani (Staff Sgt)</option>
                <option value="Sajenti" className="bg-slate-900 text-white">Sajenti (Sergeant)</option>
                <option value="Koplo" className="bg-slate-900 text-white">Koplo (Corporal)</option>
                <option value="Askari" className="bg-slate-900 text-white">Askari (Private)</option>
              </optgroup>
            ) : (
              <optgroup label="Commissioned Officers" className="bg-slate-900 text-emerald-400">
                <option value="Kanali" className="bg-slate-900 text-white">Kanali (Colonel)</option>
                <option value="Luteni Kanali" className="bg-slate-900 text-white">Luteni Kanali (Lt. Colonel)</option>
                <option value="Meja" className="bg-slate-900 text-white">Meja (Major)</option>
                <option value="Kapteni" className="bg-slate-900 text-white">Kapteni (Captain)</option>
                <option value="Luteni" className="bg-slate-900 text-white">Luteni (Lieutenant)</option>
                <option value="Luteni wa Pili" className="bg-slate-900 text-white">Luteni wa Pili (2nd Lt)</option>
              </optgroup>
            )}
          </select>
        </div>
      </div>

      {/* SEARCH FALLBACK */}
      {loading ? (
        <div className="gemini-card p-12 rounded-3xl text-center text-emerald-400 text-xs font-medium animate-pulse">
          Decrypting Officer Records...
        </div>
      ) : filteredByRankOfficers.length === 0 ? (
        <div className="gemini-card p-12 rounded-3xl text-center text-slate-400 text-xs font-medium space-y-3">
          <i className="bi bi-search text-4xl block text-emerald-500/40"></i>
          <div className="text-sm font-bold text-white">No record found for selected group or rank.</div>
          <p className="text-slate-400">Try selecting "All Ranks" or switch to "Non-Officers (WO1 - Pte)" in sidebar.</p>
        </div>
      ) : viewMode === 'ROSTER_LIST' ? (
        
        /* ================= COMPACT ROSTER LIST ================= */
        <div className="space-y-2.5 max-w-4xl mx-auto">
          {filteredByRankOfficers.map((officer) => {
            const hasInfraction = Array.isArray(officer?.infractions) && officer.infractions.length > 0;
            return (
              <div
                key={officer.id || officer.p_service_number}
                onClick={() => handleSelectOfficer(officer)}
                className={`gemini-card p-3 px-4 rounded-2xl flex items-center justify-between hover:bg-slate-900/90 hover:border-emerald-500/40 hover:scale-[1.01] transition-all cursor-pointer shadow-md ${
                  hasInfraction ? 'border-rose-500/40 bg-rose-950/20' : 'border-emerald-500/15'
                }`}
              >
                {/* LEFT: AVATAR + NAME & RANK */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 shrink-0 shadow-md">
                    <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center">
                      {officer.profile_photo ? (
                        <img src={officer.profile_photo} alt="Officer" className="w-full h-full object-cover" />
                      ) : (
                        <i className="bi bi-person-fill text-xl text-slate-400"></i>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white tracking-tight truncate">
                      {officer.first_name} {officer.last_name}
                    </h3>

                    <div className="text-xs text-slate-400 font-medium truncate flex items-center gap-2 mt-0.5">
                      <span>{officer.rank}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{officer.department}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: P-NUMBER PILL BADGE */}
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  {hasInfraction && (
                    <span className="hidden sm:inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-rose-500/30">
                      <i className="bi bi-exclamation-triangle-fill"></i> Hold
                    </span>
                  )}
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                    {officer.p_service_number}
                  </span>
                  <i className="bi bi-chevron-right text-slate-500 text-xs"></i>
                </div>
              </div>
            );
          })}
        </div>

      ) : (

        /* ================= EXPANDED FULL PROFILE DETAIL VIEW ================= */
        !currentOfficer ? (
          <div className="gemini-card p-12 rounded-3xl text-center text-slate-400 text-xs">
            No officer selected. Select an officer from the roster list above.
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* ACTIVE HORIZONTAL SUB-TABS */}
            <div className="border-b border-emerald-500/20 flex gap-8 text-xs font-bold overflow-x-auto">
              {[
                { id: 'PERSONAL_INFO', label: 'Personal info' },
                { id: 'OFFICER_DETAILS', label: 'Officer details' },
                { id: 'DISCIPLINARY_LOGS', label: 'Disciplinary history' },
                { id: 'NEXT_OF_KIN', label: 'Next of Kin & Family' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-b-2 border-emerald-400 text-emerald-400' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SUB-TAB 1: PERSONAL INFO */}
            {activeTab === 'PERSONAL_INFO' && (
              <div className="space-y-6">
                
                <div className="gemini-card rounded-3xl p-6 relative">
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedOfficerPrint(currentOfficer)}
                      className="p-2 px-3 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="bi bi-printer-fill"></i> <span>Dossier</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsAddingNew(false);
                        setSelectedOfficerEdit(currentOfficer);
                      }}
                      className="p-2 px-3 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="bi bi-pencil-fill"></i> <span>Edit</span>
                    </button>
                  </div>

                  <h2 className="text-base font-bold text-white mb-6">Basic information</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 flex items-center gap-5 pr-6 border-b lg:border-b-0 lg:border-r border-emerald-500/20 pb-6 lg:pb-0">
                      <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-emerald-500/40 overflow-hidden flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        {currentOfficer.profile_photo ? (
                          <img src={currentOfficer.profile_photo} alt="Officer" className="w-full h-full object-cover" />
                        ) : (
                          <i className="bi bi-person-fill text-4xl text-slate-500"></i>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {currentOfficer.first_name} {currentOfficer.middle_name} {currentOfficer.last_name}
                        </h3>
                        <div className="text-xs font-semibold text-emerald-400 font-mono tracking-wide">
                          {currentOfficer.p_service_number}
                        </div>

                        <div className="flex flex-col gap-1 text-xs text-slate-400 pt-1 font-medium">
                          <div className="flex items-center gap-2">
                            <i className="bi bi-gender-ambiguous text-emerald-400"></i> <span>{currentOfficer.gender === 'M' ? 'Male' : 'Female'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="bi bi-envelope-fill text-emerald-400"></i> <span>{currentOfficer.p_service_number.toLowerCase()}@jkt.go.tz</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="bi bi-telephone-fill text-emerald-400"></i> <span>{currentOfficer.phone_number || '+255 7XX XXX XXX'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs font-medium">
                      <div>
                        <div className="text-slate-400 mb-1">Rank (Cheo)</div>
                        <div className="font-bold text-white">{currentOfficer.rank}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-1">Birth date</div>
                        <div className="font-bold text-white">{currentOfficer.date_of_birth || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-1">Blood type</div>
                        <div className="font-bold text-white">{currentOfficer.blood_group || 'O+'}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-1">Department (Tawi)</div>
                        <div className="font-bold text-emerald-400">{currentOfficer.department}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-1">Security Clearance</div>
                        <div className="font-bold text-white">{currentOfficer.security_clearance || 'Confidential (Siri)'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TWO-COLUMN CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="gemini-card rounded-3xl p-6 relative">
                    <button onClick={() => { setIsAddingNew(false); setSelectedOfficerEdit(currentOfficer); }} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-400 text-sm cursor-pointer">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <h2 className="text-base font-bold text-white mb-4">Address & Grassroots Origin</h2>
                    <div className="space-y-4 text-xs font-medium">
                      <div>
                        <div className="text-slate-400 mb-1">National ID (NIDA)</div>
                        <div className="font-bold text-white font-mono">{currentOfficer.nida_number}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-1">Region & District Origin</div>
                        <div className="font-bold text-white">{currentOfficer.region_of_origin || 'Dodoma'} / {currentOfficer.district_of_origin || 'Dodoma Urban'}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 mb-1">Ward & Street Address</div>
                        <div className="font-bold text-white">{currentOfficer.ward || 'Hazina'}, {currentOfficer.street_village || 'Street No. 4'}</div>
                      </div>
                      <div className="pt-2 border-t border-emerald-500/20">
                        <div className="text-slate-400 mb-1">Ten-Cell Leader (Balozi wa Nyumba 10)</div>
                        <div className="font-bold text-emerald-400">{currentOfficer.ten_cell_leader || 'Mzee Juma Hassan'} ({currentOfficer.ten_cell_phone || '+255 712 000 111'})</div>
                      </div>
                    </div>
                  </div>

                  <div className="gemini-card rounded-3xl p-6 relative">
                    <button onClick={() => { setIsAddingNew(false); setSelectedOfficerEdit(currentOfficer); }} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-400 text-sm cursor-pointer">
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <h2 className="text-base font-bold text-white mb-4">Family & Emergency Contact</h2>
                    <div className="space-y-4 text-xs font-medium">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-slate-400 mb-1">Father's Name (Baba)</div>
                          <div className="font-bold text-white">{currentOfficer.father_name || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 mb-1">Mother's Name (Mama)</div>
                          <div className="font-bold text-white">{currentOfficer.mother_name || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-emerald-500/20">
                        <div className="text-slate-400 mb-1">Next of Kin Name</div>
                        <div className="font-bold text-white">{currentOfficer.next_of_kin_name || 'Grace Swai'}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-slate-400 mb-1">Relationship</div>
                          <div className="font-bold text-white">{currentOfficer.relationship || 'Spouse (Mke)'}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 mb-1">Emergency Phone</div>
                          <div className="font-bold text-white">{currentOfficer.next_of_kin_phone || '+255 788 111 222'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: OFFICER DETAILS */}
            {activeTab === 'OFFICER_DETAILS' && (
              <div className="gemini-card rounded-3xl p-6 space-y-6">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <i className="bi bi-award-fill text-emerald-400"></i> Military Rank, Commission & Armory Assignment
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-medium">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1">
                    <div className="text-slate-400">Military Rank</div>
                    <div className="font-bold text-white text-sm">{currentOfficer.rank}</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1">
                    <div className="text-slate-400">Commission Type</div>
                    <div className="font-bold text-white text-sm">{currentOfficer.commission_type || 'REGULAR'}</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1">
                    <div className="text-slate-400">Command Station (Tawi)</div>
                    <div className="font-bold text-emerald-400 text-sm">{currentOfficer.department}</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1">
                    <div className="text-slate-400">Security Clearance</div>
                    <div className="font-bold text-white text-sm">{currentOfficer.security_clearance || 'CONFIDENTIAL'}</div>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1">
                    <div className="text-slate-400">Housing Quarters Address</div>
                    <div className="font-bold text-white text-sm">{currentOfficer.housing_quarters || 'SOM Quarters'}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-500/20 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Military Qualifications & Courses</div>
                  <p className="text-xs text-slate-300 bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/20">
                    {currentOfficer.military_qualifications || 'Command & Staff College, Airborne Operations, Cyber Defense Certification'}
                  </p>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: DISCIPLINARY HISTORY */}
            {activeTab === 'DISCIPLINARY_LOGS' && (
              <div className="gemini-card rounded-3xl p-6 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <i className="bi bi-clipboard-data-fill text-rose-400"></i> Disciplinary Incident Records
                </h2>

                {(!currentOfficer.infractions || currentOfficer.infractions.length === 0) ? (
                  <div className="p-8 text-center text-emerald-400 text-xs font-semibold bg-emerald-500/10 rounded-2xl border border-emerald-500/30 flex items-center justify-center gap-2">
                    <i className="bi bi-check-circle-fill text-lg"></i> Good Record — No Disciplinary Infractions Recorded for {currentOfficer.first_name} {currentOfficer.last_name}.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-900/80 text-emerald-400 font-bold border-b border-emerald-500/20">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Summary</th>
                          <th className="p-3">Penalty Assigned</th>
                          <th className="p-3">Recorded By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-500/10">
                        {currentOfficer.infractions.map((inf, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/50">
                            <td className="p-3 font-mono">{inf.date_incident}</td>
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
            )}

            {/* SUB-TAB 4: NEXT OF KIN & FAMILY */}
            {activeTab === 'NEXT_OF_KIN' && (
              <div className="gemini-card rounded-3xl p-6 space-y-6">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <i className="bi bi-people-fill text-emerald-400"></i> Family Background & Pension Beneficiary
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-medium">
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
                    <h3 className="font-bold text-emerald-400 border-b border-emerald-500/20 pb-2">Parents Background</h3>
                    <div>
                      <div className="text-slate-400">Father's Name (Baba Mzazi)</div>
                      <div className="font-bold text-white text-sm">{currentOfficer.father_name || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Mother's Name (Mama Mzazi)</div>
                      <div className="font-bold text-white text-sm">{currentOfficer.mother_name || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
                    <h3 className="font-bold text-emerald-400 border-b border-emerald-500/20 pb-2">Emergency Next of Kin</h3>
                    <div>
                      <div className="text-slate-400">Beneficiary / Contact Name</div>
                      <div className="font-bold text-white text-sm">{currentOfficer.next_of_kin_name || 'Grace Swai'}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-slate-400">Relationship</div>
                        <div className="font-bold text-white">{currentOfficer.relationship || 'Spouse (Mke)'}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Phone Number</div>
                        <div className="font-bold text-white">{currentOfficer.next_of_kin_phone || '+255 788 111 222'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )
      )}

    </div>
  );
}
