export default function AnalyticsIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Analytics dashboard illustration">
      {/* Dashboard card */}
      <rect x="20" y="20" width="360" height="260" rx="16" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>

      {/* Header */}
      <rect x="20" y="20" width="360" height="48" rx="16" fill="#0D2B3E"/>
      <rect x="20" y="52" width="360" height="16" fill="#0D2B3E"/>
      <text x="40" y="50" fill="white" fontSize="13" fontWeight="700">My Performance Dashboard</text>
      {/* Header dots */}
      <circle cx="342" cy="44" r="5" fill="#ef4444"/>
      <circle cx="355" cy="44" r="5" fill="#fbbf24"/>
      <circle cx="368" cy="44" r="5" fill="#22c55e"/>

      {/* Score ring */}
      <circle cx="80" cy="140" r="42" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
      <circle cx="80" cy="140" r="42" stroke="#F5C518" strokeWidth="8" fill="none"
        strokeDasharray="220 44" strokeDashoffset="55" strokeLinecap="round"/>
      <text x="68" y="136" fill="#0D2B3E" fontSize="16" fontWeight="900">83%</text>
      <text x="64" y="152" fill="#6b7280" fontSize="8">Overall</text>

      {/* Subject bars */}
      <text x="150" y="90" fill="#6b7280" fontSize="9" fontWeight="600">SUBJECT-WISE ACCURACY</text>
      {[
        { label: 'Physics',   pct: 88, color: '#1A6B5A' },
        { label: 'Chemistry', pct: 74, color: '#F5C518' },
        { label: 'Maths',     pct: 92, color: '#1A8A7A' },
        { label: 'Biology',   pct: 79, color: '#D4A017' },
      ].map((s, i) => (
        <g key={s.label}>
          <text x="152" y={112 + i * 26} fill="#374151" fontSize="9" fontWeight="500">{s.label}</text>
          <rect x="210" y={100 + i * 26} width="130" height="12" rx="6" fill="#f3f4f6"/>
          <rect x="210" y={100 + i * 26} width={130 * s.pct / 100} height="12" rx="6" fill={s.color}/>
          <text x={346} y={111 + i * 26} fill="#374151" fontSize="9" fontWeight="600">{s.pct}%</text>
        </g>
      ))}

      {/* Mini line chart */}
      <text x="152" y="210" fill="#6b7280" fontSize="9" fontWeight="600">SCORE TREND (last 6 tests)</text>
      <polyline
        points="160,245 190,235 220,240 250,225 280,215 310,205"
        stroke="#1A6B5A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Area fill */}
      <path d="M160 245 L190 235 L220 240 L250 225 L280 215 L310 205 L310 260 L160 260 Z"
        fill="#1A6B5A" opacity="0.08"/>
      {/* Data points */}
      {[[160,245],[190,235],[220,240],[250,225],[280,215],[310,205]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#1A6B5A" strokeWidth="2"/>
      ))}
      {/* X-axis labels */}
      {['T1','T2','T3','T4','T5','T6'].map((t, i) => (
        <text key={t} x={155 + i * 30} y="272" fill="#9ca3af" fontSize="8">{t}</text>
      ))}

      {/* Rank badge */}
      <rect x="310" y="120" width="60" height="70" rx="10" fill="#F5C518" opacity="0.12" stroke="#F5C518" strokeWidth="1.5"/>
      <text x="318" y="142" fill="#D4A017" fontSize="9" fontWeight="600">All India</text>
      <text x="316" y="160" fill="#0D2B3E" fontSize="20" fontWeight="900">#847</text>
      <text x="326" y="178" fill="#6b7280" fontSize="8">Rank</text>
    </svg>
  );
}
