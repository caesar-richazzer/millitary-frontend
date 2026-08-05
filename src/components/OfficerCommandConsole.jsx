import React, { useState, useEffect } from 'react';
import api from '../api';
import EditOfficerModal from './EditOfficerModal.jsx';
import PrintableOfficerDossier from './PrintableOfficerDossier.jsx';
import AdminSettingsModal from './AdminSettingsModal.jsx';
import SecurityWatermark from './SecurityWatermark.jsx'; // IMPORTED HERE

import DashboardView from './views/DashboardView.jsx';
import UserAccessView from './views/UserAccessView.jsx';
import MilitaryOfficersView from './views/MilitaryOfficersView.jsx';
import AttendanceDutyView from './views/AttendanceDutyView.jsx';
import DisciplinaryLogsView from './views/DisciplinaryLogsView.jsx';
import AuditHistoryView from './views/AuditHistoryView.jsx';

const playLockdownSiren = (active) => {
  if (!active) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);

    let time = ctx.currentTime;
    for (let i = 0; i < 8; i++) {
      osc.frequency.setValueAtTime(400, time);
      osc.frequency.exponentialRampToValueAtTime(900, time + 0.35);
      time += 0.7;
    }
    osc.start();
    osc.stop(ctx.currentTime + 4.5);
  } catch (e) {}
};

export default function OfficerCommandConsole({ session, onLogout }) {
  const [activeNav, setActiveNav] = useState('OFFICERS');
  const [activeTab, setActiveTab] = useState('PERSONAL_INFO');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [codeRed, setCodeRed] = useState(false);
  const [showAdminSettings, setShowAdminSettings] = useState(false);

  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedOfficerEdit, setSelectedOfficerEdit] = useState(null);
  const [selectedOfficerPrint, setSelectedOfficerPrint] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const fetchOfficers = async () => {
    setLoading(true);
    try {
      let url = selectedDept === 'ALL' ? '/officers/' : `/officers/?department=${selectedDept}`;
      
      if (activeNav === 'OFFICERS') {
        url += (url.includes('?') ? '&' : '?') + 'officer_type=COMMISSIONED';
      } else if (activeNav === 'NON_OFFICERS') {
        url += (url.includes('?') ? '&' : '?') + 'officer_type=NON_COMMISSIONED';
      }

      const response = await api.get(url);
      if (Array.isArray(response.data)) {
        setOfficers(response.data);
        if (response.data.length > 0) {
          setSelectedOfficer(response.data[0]);
        } else {
          setSelectedOfficer(null);
        }
      } else {
        setOfficers([]);
        setSelectedOfficer(null);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, [selectedDept, activeNav]);

  const handleLockdownToggle = async () => {
    const nextState = !codeRed;
    setCodeRed(nextState);
    if (nextState) {
      playLockdownSiren(true);
      try {
        await api.post('/officers/lockdown/', {
          p_service_number: session?.p_service_number || 'ADMIN',
          status: 'LOCKDOWN_ACTIVATED'
        });
      } catch (e) {}
    }
  };

  const safeOfficers = Array.isArray(officers) ? officers.filter(o => 
    `${o.first_name} ${o.last_name} ${o.p_service_number} ${o.rank} ${o.department}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const currentOfficer = selectedOfficer || (safeOfficers.length > 0 ? safeOfficers[0] : null);

  const allInfractions = safeOfficers.flatMap(o => 
    (o.infractions || []).map(inf => ({ ...inf, officer_p_number: o.p_service_number, officer_name: `${o.rank} ${o.first_name} ${o.last_name}` }))
  );

  return (
    <div className={`min-h-screen ${codeRed ? 'bg-rose-950 text-rose-100' : ''} flex select-none relative overflow-hidden font-sans`}>
      
      {/* SECURITY WATERMARK INSIDE RETURN BLOCK */}
      <SecurityWatermark session={session} />

      {/* AMBIENT GREEN SMOKE GLOW */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none animate-smoke"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-[120px] pointer-events-none animate-smoke"></div>

      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 bg-[#0F1521]/90 backdrop-blur-xl border-r border-emerald-500/20 p-5 flex flex-col justify-between shrink-0 hidden md:flex z-10">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/30">
              <i className="bi bi-shield-shaded"></i>
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight leading-none">JKT C4ISR</h1>
              <p className="text-[11px] text-emerald-400 font-medium mt-1">Makutupora Dodoma</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-emerald-500/20 rounded-2xl p-3">
            <div className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Active Command</div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Departments (Tawi)</option>
              <option value="834KJ-BHQ" className="bg-slate-900">834KJ-BHQ</option>
              <option value="8934KJ-ADMINI" className="bg-slate-900">8934KJ-ADMINI</option>
              <option value="IO" className="bg-slate-900">IO</option>
              <option value="QM-tawi la siliha" className="bg-slate-900">QM-tawi la siliha</option>
              <option value="834KJ-ZAHANATI" className="bg-slate-900">834KJ-ZAHANATI</option>
              <option value="UDM" className="bg-slate-900">UDM</option>
              <option value="RADIO OPERATOR" className="bg-slate-900">RADIO OPERATOR</option>
              <option value="834KJ-mafunzo" className="bg-slate-900">834KJ-mafunzo</option>
              <option value="834KJ-O/MESS & INSTIUTES" className="bg-slate-900">834KJ-O/MESS & INSTIUTES</option>
              <option value="834KJ-VETA" className="bg-slate-900">834KJ-VETA</option>
            </select>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'DASHBOARD', label: 'Dashboard', icon: 'bi-speedometer2' },
              { id: 'USER_ACCESS', label: 'User & Access', icon: 'bi-people-fill' },
              { id: 'OFFICERS', label: 'Military Officers (Col - 2Lt)', icon: 'bi-person-badge-fill' },
              { id: 'NON_OFFICERS', label: 'Non-Officers (WO1 - Pte)', icon: 'bi-person-vcard-fill' },
              { id: 'ATTENDANCE', label: 'Attendance & Duty', icon: 'bi-calendar-check-fill' },
              { id: 'DISCIPLINE', label: 'Disciplinary Logs', icon: 'bi-clipboard-data-fill' },
              { id: 'AUDIT', label: 'Audit History', icon: 'bi-shield-check' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setSearchTerm('');
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  activeNav === item.id 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold shadow-lg shadow-emerald-500/10' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <i className={`bi ${item.icon} text-sm`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10">
        
        {/* TOP HEADER */}
        <header className="bg-[#0F1521]/80 backdrop-blur-xl border-b border-emerald-500/20 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {activeNav === 'DASHBOARD' && 'System Analytics & C4ISR Overview'}
              {activeNav === 'USER_ACCESS' && 'System Administrators & Access Management'}
              {activeNav === 'OFFICERS' && 'Commissioned Military Officers (Colonel to 2nd Lt)'}
              {activeNav === 'NON_OFFICERS' && 'Non-Commissioned Staff & Enlisted (WO1 to Private)'}
              {activeNav === 'ATTENDANCE' && 'Attendance & Duty Roster Management'}
              {activeNav === 'DISCIPLINE' && 'Battalion Disciplinary Incident Logs'}
              {activeNav === 'AUDIT' && 'System Security & Audit History'}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-0.5">
              <span>834 KJ Makutupora JKT</span>
              <span>/</span>
              <span className="text-emerald-400 font-semibold">{activeNav}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedOfficerEdit(null);
                setIsAddingNew(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <i className="bi bi-person-plus-fill text-sm"></i>
              <span>Register Personnel</span>
            </button>

            <button
              onClick={handleLockdownToggle}
              className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold px-3 py-2 rounded-full hover:bg-rose-500/20 cursor-pointer flex items-center gap-1.5"
            >
              <i className="bi bi-exclamation-octagon-fill"></i> {codeRed ? 'Cancel Lockdown' : 'Lockdown'}
            </button>

            <div className="h-8 w-px bg-slate-800 mx-1"></div>

            <button 
              onClick={() => setShowAdminSettings(true)}
              className="flex items-center gap-3 p-1.5 rounded-full bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow">
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="text-left hidden sm:block pr-3">
                <div className="text-xs font-bold text-white">{session?.first_name || 'caesar richazzer'}</div>
                <div className="text-[10px] text-emerald-400 font-medium">{session?.rank || 'Kanali (Colonel)'} • {session?.p_service_number || 'P-12345'}</div>
              </div>
            </button>
          </div>
        </header>

        {/* DYNAMIC VIEW ACTIVATION */}
        <div className="p-8 space-y-6 max-w-6xl w-full mx-auto">
          {activeNav === 'DASHBOARD' && <DashboardView safeOfficers={safeOfficers} />}
          
          {activeNav === 'USER_ACCESS' && <UserAccessView session={session} />}
          
          {(activeNav === 'OFFICERS' || activeNav === 'NON_OFFICERS') && (
            <MilitaryOfficersView
              safeOfficers={safeOfficers}
              currentOfficer={currentOfficer}
              setSelectedOfficer={setSelectedOfficer}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSelectedOfficerPrint={setSelectedOfficerPrint}
              setSelectedOfficerEdit={setSelectedOfficerEdit}
              setIsAddingNew={setIsAddingNew}
              loading={loading}
              isNonOfficerGroup={activeNav === 'NON_OFFICERS'}
            />
          )}

          {activeNav === 'ATTENDANCE' && <AttendanceDutyView safeOfficers={safeOfficers} />}

          {activeNav === 'DISCIPLINE' && <DisciplinaryLogsView allInfractions={allInfractions} />}

          {activeNav === 'AUDIT' && <AuditHistoryView session={session} />}
        </div>
      </main>

      {/* MODALS */}
      {showAdminSettings && (
        <AdminSettingsModal
          session={session}
          onClose={() => setShowAdminSettings(false)}
          onLogout={onLogout}
        />
      )}

      {(isAddingNew || selectedOfficerEdit) && (
        <EditOfficerModal
          key={selectedOfficerEdit ? selectedOfficerEdit.id : 'new-registration-modal'}
          officer={selectedOfficerEdit}
          onClose={() => {
            setIsAddingNew(false);
            setSelectedOfficerEdit(null);
          }}
          onSave={async (id, data) => {
            try {
              const config = { headers: { 'Content-Type': 'multipart/form-data' } };
              if (id) await api.patch(`/officers/${id}/`, data, config);
              else await api.post('/officers/', data, config);
            } catch (e) {
              console.error(e);
            }
            setIsAddingNew(false);
            setSelectedOfficerEdit(null);
            fetchOfficers();
          }}
          onAddInfraction={async (id, data) => {
            try { await api.post(`/officers/${id}/add_infraction/`, data); } catch (e) {}
            setIsAddingNew(false);
            setSelectedOfficerEdit(null);
            fetchOfficers();
          }}
        />
      )}

      {selectedOfficerPrint && (
        <PrintableOfficerDossier
          officer={selectedOfficerPrint}
          onClose={() => setSelectedOfficerPrint(null)}
        />
      )}

    </div>
  );
}