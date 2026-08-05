// src/components/SecurityWatermark.jsx
import React from 'react';

export default function SecurityWatermark({ session }) {
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Africa/Dar_es_Salaam' });
  const watermarkText = `CLASSIFIED • 834-KJ C4ISR • ${session?.p_service_number || 'ADMIN'} • ${timestamp}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden opacity-[0.03] select-none flex flex-wrap justify-between items-center p-4 gap-12 font-mono text-xs font-black text-[#10B981] rotate-[-15deg]">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} className="whitespace-nowrap tracking-widest">
          {watermarkText}
        </span>
      ))}
    </div>
  );
}