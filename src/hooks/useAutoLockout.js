// src/hooks/useAutoLockout.js
import { useEffect } from 'react';

export default function useAutoLockout(onTimeout, timeoutInMinutes = 15) {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alert('SECURITY TIMEOUT: Session expired due to inactivity!');
        onTimeout();
      }, timeoutInMinutes * 60 * 1000);
    };

    // User activity listeners
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Initialize timer

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [onTimeout, timeoutInMinutes]);
}