export default function LiveClassIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 440 320" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Live class illustration">
      {/* Monitor/screen */}
      <rect x="60" y="30" width="320" height="210" rx="12" fill="#1E293B"/>
      <rect x="72" y="42" width="296" height="186" rx="6" fill="#2563EB" opacity="0.15"/>
      {/* Screen stand */}
      <rect x="185" y="240" width="70" height="14" rx="3" fill="#1E293B"/>
      <rect x="165" y="254" width="110" height="8" rx="3" fill="#1E293B" opacity="0.7"/>

      {/* Whiteboard on screen */}
      <rect x="80" y="50" width="200" height="160" rx="4" fill="white" opacity="0.95"/>
      {/* Board content */}
      <text x="96" y="76" fill="#2563EB" fontSize="12" fontWeight="800">Physics — Motion</text>
      <line x1="90" y1="82" x2="272" y2="82" stroke="#e2e8f0" strokeWidth="1"/>
      {/* Equations */}
      <text x="96" y="100" fill="#1E293B" fontSize="11">v = u + at</text>
      <text x="96" y="118" fill="#1E293B" fontSize="11">s = ut + ½at²</text>
      <text x="96" y="136" fill="#1E293B" fontSize="11">v² = u² + 2as</text>
      {/* Graph axes */}
      <line x1="96" y1="195" x2="96" y2="155" stroke="#2563EB" strokeWidth="1.5"/>
      <line x1="96" y1="195" x2="268" y2="195" stroke="#2563EB" strokeWidth="1.5"/>
      {/* Graph curve */}
      <path d="M100 190 Q130 180 160 170 Q190 160 220 145 Q250 130 265 120" stroke="#38BDF8" strokeWidth="2.5" fill="none"/>
      {/* Axis labels */}
      <text x="158" y="205" fill="#64748b" fontSize="8">Time (s)</text>
      <text x="70" y="172" fill="#64748b" fontSize="8">v</text>

      {/* Teacher (video on screen) */}
      <rect x="292" y="50" width="80" height="90" rx="6" fill="#2563EB" opacity="0.3"/>
      {/* Teacher figure */}
      <circle cx="332" cy="80" r="14" fill="#FDE047" opacity="0.9"/>
      <circle cx="326" cy="77" r="2" fill="#1E293B"/>
      <circle cx="338" cy="77" r="2" fill="#1E293B"/>
      <path d="M326 87 Q332 91 338 87" stroke="#1E293B" strokeWidth="1.5" fill="none"/>
      <path d="M318 95 Q322 92 332 92 Q342 92 346 95 L348 132 L316 132 Z" fill="#2563EB"/>
      {/* LIVE badge */}
      <rect x="296" y="54" width="32" height="14" rx="3" fill="#ef4444"/>
      <text x="300" y="64" fill="white" fontSize="8" fontWeight="700">● LIVE</text>

      {/* Chat panel */}
      <rect x="290" y="148" width="82" height="100" rx="6" fill="#1E293B" opacity="0.8"/>
      <text x="300" y="164" fill="#38BDF8" fontSize="8" fontWeight="600">💬 CHAT</text>
      {/* Chat bubbles */}
      <rect x="298" y="170" width="55" height="14" rx="4" fill="white" opacity="0.15"/>
      <text x="302" y="180" fill="white" fontSize="7">Got it! 👍</text>
      <rect x="298" y="188" width="50" height="14" rx="4" fill="#38BDF8" opacity="0.3"/>
      <text x="302" y="198" fill="white" fontSize="7">Doubt? 🙋</text>
      <rect x="298" y="206" width="60" height="14" rx="4" fill="white" opacity="0.1"/>
      <text x="302" y="216" fill="white" fontSize="7">Thanks sir!</text>

      {/* Student avatars (watching) */}
      {[
        { x: 30, y: 280, color: '#2563EB', label: 'Arjun' },
        { x: 130, y: 280, color: '#38BDF8', label: 'Priya' },
        { x: 230, y: 280, color: '#0EA5E9', label: 'Rohan' },
        { x: 330, y: 280, color: '#F59E0B', label: 'Diya' },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.x + 20} cy={s.y} r="16" fill={s.color} opacity="0.9"/>
          <text x={s.x + 16} y={s.y + 4} fill="white" fontSize="9" fontWeight="700">{s.label[0]}</text>
          <text x={s.x + 4} y={s.y + 22} fill="#64748b" fontSize="7">{s.label}</text>
          {/* Mic icon */}
          <circle cx={s.x + 30} cy={s.y - 10} r="6" fill={i === 1 ? '#22c55e' : '#ef4444'} opacity="0.8"/>
          <text x={s.x + 27} y={s.y - 7} fill="white" fontSize="7">{i === 1 ? '🎤' : '🔇'}</text>
        </g>
      ))}

      {/* Participant count */}
      <rect x="168" y="272" width="80" height="24" rx="8" fill="#2563EB" opacity="0.12"/>
      <text x="178" y="287" fill="#2563EB" fontSize="9" fontWeight="600">👥 247 watching</text>
    </svg>
  );
}
