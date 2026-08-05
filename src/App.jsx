// src/App.jsx
import React, { useState } from 'react';
import MilitaryAuthPage from './components/MilitaryAuthPage';
import WelcomeSplash from './components/WelcomeSplash';
import OfficerCommandConsole from './components/OfficerCommandConsole';

function App() {
  // Main System Navigation State: 'AUTH' | 'SPLASH' | 'DASHBOARD'
  const [step, setStep] = useState('AUTH');
  const [session, setSession] = useState(null);

  // SECURE LOGOUT FUNCTION (CLEARS TOKENS & RESETS TO LOGIN SCREEN)
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.clear();
    setSession(null);
    setStep('AUTH');
  };

  // Step 1 -> Step 2 (Auth Success to Splash)
  const handleAuthSuccess = (userData) => {
    setSession(userData);
    setStep('SPLASH');
  };

  // Step 2 -> Step 3 (Splash Complete to Dashboard)
  const handleSplashComplete = () => {
    setStep('DASHBOARD');
  };

  return (
    <div className="App">
      {step === 'AUTH' && (
        <MilitaryAuthPage onAuthSuccess={handleAuthSuccess} />
      )}

      {step === 'SPLASH' && (
        <WelcomeSplash user={session} onComplete={handleSplashComplete} />
      )}

      {step === 'DASHBOARD' && (
        <OfficerCommandConsole session={session} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;