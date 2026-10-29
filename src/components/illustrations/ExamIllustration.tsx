export default function ExamIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Exam preparation illustration">
      {/* Background circle */}
      <circle cx="200" cy="150" r="120" fill="#1A6B5A" opacity="0.06"/>

      {/* Answer sheet / clipboard */}
      <rect x="80" y="50" width="160" height="210" rx="10" fill="white" stroke="#1A6B5A" strokeWidth="2"/>
      <rect x="90" y="40" width="140" height="30" rx="6" fill="#1A6B5A"/>
      <circle cx="160" cy="55" r="8" fill="white" opacity="0.4"/>

      {/* Answer lines */}
      {[80, 100, 120, 140, 160, 180, 200].map((y, i) => (
        <g key={i}>
          {/* Question number */}
          <circle cx="110" cy={y} r="9" fill={i < 4 ? '#1A6B5A' : '#e5e7eb'} opacity="0.8"/>
          <text x="106" y={y + 4} fill="white" fontSize="9" fontWeight="bold">{i + 1}</text>
          {/* Option bubbles */}
          {['A','B','C','D'].map((opt, j) => (
            <g key={opt}>
              <circle
                cx={135 + j * 22}
                cy={y}
                r="8"
                fill={
                  (i === 0 && j === 1) || (i === 1 && j === 2) || (i === 2 && j === 0) || (i === 3 && j === 3)
                    ? '#F5C518' : 'none'
                }
                stroke="#1A6B5A"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <text x={131 + j * 22} y={y + 4} fill={
                (i === 0 && j === 1) || (i === 1 && j === 2) || (i === 2 && j === 0) || (i === 3 && j === 3)
                  ? '#0D2B3E' : '#6b7280'
              } fontSize="7" fontWeight="600">{opt}</text>
            </g>
          ))}
        </g>
      ))}

      {/* Timer */}
      <circle cx="300" cy="90" r="40" fill="white" stroke="#1A6B5A" strokeWidth="3"/>
      <circle cx="300" cy="90" r="34" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
      {/* Clock hands */}
      <line x1="300" y1="90" x2="300" y2="62" stroke="#0D2B3E" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="300" y1="90" x2="318" y2="100" stroke="#F5C518" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="300" cy="90" r="3" fill="#1A6B5A"/>
      {/* Timer label */}
      <text x="285" y="118" fill="#1A6B5A" fontSize="9" fontWeight="700">TIMER</text>
      {/* Tick marks */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180;
        const x1 = 300 + 29 * Math.cos(rad);
        const y1 = 90 + 29 * Math.sin(rad);
        const x2 = 300 + 34 * Math.cos(rad);
        const y2 = 90 + 34 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9ca3af" strokeWidth={i % 3 === 0 ? 2 : 1}/>;
      })}

      {/* Score badge */}
      <rect x="260" y="160" width="100" height="60" rx="12" fill="#F5C518"/>
      <text x="274" y="185" fill="#0D2B3E" fontSize="10" fontWeight="600">Your Score</text>
      <text x="278" y="207" fill="#0D2B3E" fontSize="20" fontWeight="900">98%</text>

      {/* Pencil */}
      <rect x="60" y="200" width="10" height="70" rx="3" fill="#F5C518" transform="rotate(-15 60 200)"/>
      <polygon points="60,268 70,268 65,280" fill="#0D2B3E" transform="rotate(-15 60 200)"/>
      <rect x="60" y="200" width="10" height="12" rx="1" fill="#f87171" transform="rotate(-15 60 200)"/>

      {/* Check mark */}
      <circle cx="340" cy="220" r="22" fill="#1A6B5A" opacity="0.15"/>
      <path d="M328 220 L337 230 L352 210" stroke="#1A6B5A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
