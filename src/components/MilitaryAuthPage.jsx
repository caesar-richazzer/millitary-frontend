import React, { useState } from 'react';
import api from '../api';

export default function MilitaryAuthPage({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('LOGIN');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({ p_service_number: '', password: '' });
  const [signupData, setSignupData] = useState({
    p_service_number: '', first_name: '', last_name: '', rank: 'Kanali (Colonel)', password: '', confirmPassword: ''
  });

  // LOGIN HANDLER (SENDS BOTH USERNAME AND P_SERVICE_NUMBER TO DJANGO)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginData.p_service_number.trim() || !loginData.password.trim()) {
      setErrorMessage('INGIZA NAMBA YA JESHI NA NENO LA SIRI!');
      return;
    }

    setLoading(true);
    try {
      const pNumUpper = loginData.p_service_number.trim().toUpperCase();

      const response = await api.post('/auth/login/', {
        username: pNumUpper,            # Required by Django SimpleJWT
        p_service_number: pNumUpper,
        password: loginData.password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      const userDetail = response.data.user || {};

      onAuthSuccess({
        p_service_number: userDetail.p_service_number || pNumUpper,
        first_name: userDetail.first_name || 'ADMIN',
        last_name: userDetail.last_name || pNumUpper,
        rank: userDetail.rank || 'System Administrator',
        department: userDetail.department || '834KJ-BHQ',
        entry_time: new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Dar_es_Salaam' })
      });

    } catch (err) {
      console.error('Django Auth Error:', err.response?.data || err);
      if (err.response && (err.response.status === 401 || err.response.status === 400)) {
        setErrorMessage('NAMBA YA JESHI AU NENO LA SIRI SIO SAHIHI!');
      } else {
        setErrorMessage('HAWEZI KUPATA DJANGO SERVER! HAKIKISHA RUNSERVER INAFANYA KAZI.');
      }
    } font-bold {
      setLoading(false);
    }
  };

  // REGISTER ADMIN IN DJANGO
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!signupData.p_service_number || !signupData.first_name || !signupData.last_name || !signupData.password) {
      setErrorMessage('TAFADHALI JAZA SEHEMU ZOTE ZA ADMIN!');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage('NENO LA SIRI NA UTHIBITISHO HAVIFANANI!');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register/', {
        p_service_number: signupData.p_service_number.trim().toUpperCase(),
        first_name: signupData.first_name.trim(),
        last_name: signupData.last_name.trim(),
        rank: signupData.rank,
        password: signupData.password
      });

      alert('ADMIN USER REGISTERED IN DJANGO! NOW LOGIN.');
      setAuthMode('LOGIN');
      setLoginData({ ...loginData, p_service_number: signupData.p_service_number.toUpperCase(), password: '' });

    } catch (err) {
      console.error('Django Register Error:', err.response?.data || err);
      setErrorMessage('KOSA KATIKA KUSAJILI ADMIN KWENYE DJANGO!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 select-none relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full filter blur-[120px] pointer-events-none animate-smoke"></div>

      <div className="max-w-2xl mx-auto w-full text-center relative z-10">
        <span className="inline-flex items-center gap-2 gemini-card px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400">
          <i className="bi bi-shield-lock-fill text-emerald-400"></i>
          834 KJ Makutupora JKT <span className="text-slate-500">|</span> Admin Control Portal
        </span>
      </div>

      <div className="flex justify-center items-center my-auto py-8 relative z-10">
        <div className="w-full max-w-md gemini-card p-8 rounded-3xl relative">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 mb-3">
              <i className="bi bi-shield-shaded"></i>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Jeshi la Kujenga Taifa</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">834 Kikosi cha Makutupora JKT — Dodoma</p>
          </div>

          <div className="flex p-1 bg-slate-900/80 rounded-2xl mb-6 border border-emerald-500/20">
            <button
              type="button"
              onClick={() => setAuthMode('LOGIN')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${authMode === 'LOGIN' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="bi bi-key-fill"></i> Admin Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('SIGNUP')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${authMode === 'SIGNUP' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="bi bi-person-plus-fill"></i> Register Admin
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 bg-rose-500/10 text-rose-400 border border-rose-500/30 p-3 rounded-2xl text-xs font-medium text-center flex items-center justify-center gap-2">
              <i className="bi bi-exclamation-triangle-fill"></i> {errorMessage}
            </div>
          )}

          {/* LOGIN FORM */}
          {authMode === 'LOGIN' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin P-Number / Service ID</label>
                <input
                  type="text"
                  placeholder="e.g. P-12345"
                  value={loginData.p_service_number}
                  onChange={(e) => setLoginData({...loginData, p_service_number: e.target.value})}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-3 text-white font-semibold rounded-2xl text-sm focus:outline-none focus:border-emerald-400 uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Passcode</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-3 pr-10 text-white font-semibold rounded-2xl text-sm focus:outline-none focus:border-emerald-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-base cursor-pointer"
                  >
                    <i className={`bi ${showLoginPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-2xl text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/25 mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <i className="bi bi-shield-check"></i> {loading ? 'Authenticating...' : 'Authenticate & Access System'}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authMode === 'SIGNUP' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Admin P-Number</label>
                <input
                  type="text"
                  placeholder="e.g. P-12345"
                  value={signupData.p_service_number}
                  onChange={(e) => setSignupData({...signupData, p_service_number: e.target.value})}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl text-xs uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={signupData.first_name}
                    onChange={(e) => setSignupData({...signupData, first_name: e.target.value})}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={signupData.last_name}
                    onChange={(e) => setSignupData({...signupData, last_name: e.target.value})}
                    className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rank</label>
                <select
                  value={signupData.rank}
                  onChange={(e) => setSignupData({...signupData, rank: e.target.value})}
                  className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 text-white font-semibold rounded-2xl text-xs"
                >
                  <option value="Kanali (Colonel)" className="bg-slate-900">Kanali (Colonel)</option>
                  <option value="Luteni Kanali (Lt Colonel)" className="bg-slate-900">Luteni Kanali (Lt Colonel)</option>
                  <option value="Meja (Major)" className="bg-slate-900">Meja (Major)</option>
                  <option value="Kapteni (Captain)" className="bg-slate-900">Kapteni (Captain)</option>
                  <option value="Luteni (Lieutenant)" className="bg-slate-900">Luteni (Lieutenant)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Passcode</label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Passcode"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 pr-8 text-white font-semibold rounded-2xl text-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                    >
                      <i className={`bi ${showSignupPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      className="w-full bg-slate-900/90 border border-emerald-500/30 p-2.5 pr-8 text-white font-semibold rounded-2xl text-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-2xl text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/25 mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <i className="bi bi-person-check-fill"></i> {loading ? 'Registering...' : 'Create Admin Account'}
              </button>
            </form>
          )}

        </div>
      </div>

      <footer className="text-center text-xs text-slate-500 font-medium relative z-10">
        Tanzania Peoples' Defence Force <span className="mx-1.5">•</span> 834 KJ Makutupora JKT
      </footer>

    </div>
  );
}