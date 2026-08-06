import React, { useState } from 'react';

export default function AdminSettingsModal({ session, onClose, onLogout }) {
  const [activeTab, setActiveTab] = useState('SETTINGS');

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99999] flex justify-center items-center p-4 select-none">
      <div className="bg-[#0F1521] border border-emerald-500/30 text-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden font-sans">
        
        {/* HEADER */}
        <div className="p-6 border-b border-emerald-500/20 flex justify-between items-center bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-base shadow">
              <i className="bi bi-person-fill"></i>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {session?.first_name || 'caesar richazzer'} {session?.last_name || ''}
              </h2>
              <p className="text-xs text-emerald-400 font-semibold">{session?.rank || 'Kanali (Colonel)'} • {session?.p_service_number || 'P-12345'}</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer border border-slate-700"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* TABS */}
        <div className="flex p-2 bg-slate-900/80 border-b border-emerald-500/20">
          <button
            type="button"
            onClick={() => setActiveTab('SETTINGS')}
            className={`flex-1 py-2 text-xs font-semibold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'SETTINGS' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <i className="bi bi-gear-fill"></i> System Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('TERMS')}
            className={`flex-1 py-2 text-xs font-semibold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'TERMS' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <i className="bi bi-file-earmark-text-fill"></i> Terms of Agreement
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('AUTHORIZATION')}
            className={`flex-1 py-2 text-xs font-semibold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'AUTHORIZATION' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <i className="bi bi-shield-lock-fill"></i> 834 KJ MAKUTUPORA JKT Authorizations
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs">
          
          {activeTab === 'SETTINGS' && (
            <div className="space-y-4">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20 space-y-3">
                <h3 className="font-bold text-white">System Preferences</h3>
                <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
                  <span>Wait For Connection</span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <i className="bi bi-check-circle-fill"></i> Connected
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-emerald-500/10">
                  <span>Automatic Auto-Lockout Timer</span>
                  <span className="font-bold text-slate-200">15 Minutes Idle</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Emergency Siren Audio Alarms</span>
                  <span className="font-bold text-emerald-400">Enabled (Web Audio API)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'TERMS' && (
            <div className="space-y-3 text-slate-300 font-medium leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20">
              <h3 className="font-bold text-white text-sm">TPDF Military System Non-Disclosure Agreement (NDA)</h3>
              <p>
                By logging into the 834 KJ Makutupora JKT System, you agree to comply with the National Service Act No. 16 of 1964 and TPDF Security Regulations.
              </p>
            </div>
          )}

          {activeTab === 'AUTHORIZATION' && (
            <div className="space-y-3 bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/20">
              <h3 className="font-bold text-white text-sm">Command Authorization Level</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-emerald-500/20">
                  <span>Security Clearance Level:</span>
                  <span className="font-bold text-emerald-400">Level 4: Command High Security</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER LOGOUT BUTTON */}
        <div className="p-4 bg-slate-900/90 border-t border-emerald-500/20 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-medium font-mono">Session ID: {session?.p_service_number || 'P-12345'}</span>
          <button
            type="button"
            onClick={onLogout}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <i className="bi bi-box-arrow-right"></i> Logout Session
          </button>
        </div>

      </div>
    </div>
  );
}
