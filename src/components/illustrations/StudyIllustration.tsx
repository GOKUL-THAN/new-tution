
export default function StudyIllustration({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Student studying illustration">
      {/* Desk */}
      <rect x="60" y="260" width="360" height="16" rx="4" fill="#1A6B5A" opacity="0.8"/>
      <rect x="80" y="276" width="12" height="60" rx="3" fill="#1A6B5A" opacity="0.6"/>
      <rect x="388" y="276" width="12" height="60" rx="3" fill="#1A6B5A" opacity="0.6"/>

      {/* Laptop */}
      <rect x="160" y="180" width="200" height="130" rx="8" fill="#0D2B3E"/>
      <rect x="168" y="188" width="184" height="114" rx="4" fill="#1A6B5A" opacity="0.3"/>
      {/* Screen content */}
      <rect x="176" y="196" width="100" height="8" rx="2" fill="#F5C518" opacity="0.8"/>
      <rect x="176" y="210" width="140" height="5" rx="2" fill="white" opacity="0.4"/>
      <rect x="176" y="220" width="120" height="5" rx="2" fill="white" opacity="0.3"/>
      <rect x="176" y="230" width="130" height="5" rx="2" fill="white" opacity="0.3"/>
      {/* Chart on screen */}
      <rect x="280" y="210" width="16" height="40" rx="2" fill="#F5C518" opacity="0.7"/>
      <rect x="300" y="225" width="16" height="25" rx="2" fill="#1A8A7A" opacity="0.7"/>
      <rect x="320" y="218" width="16" height="32" rx="2" fill="#F5C518" opacity="0.5"/>
      {/* Laptop base */}
      <path d="M140 310 L340 310 L350 316 L130 316 Z" fill="#0D2B3E" opacity="0.9"/>

      {/* Books stack */}
      <rect x="80" y="220" width="60" height="10" rx="2" fill="#F5C518"/>
      <rect x="84" y="210" width="54" height="10" rx="2" fill="#1A6B5A"/>
      <rect x="82" y="200" width="56" height="10" rx="2" fill="#F9D85A"/>
      {/* Book spines */}
      <line x1="84" y1="200" x2="84" y2="230" stroke="#D4A017" strokeWidth="1"/>
      <line x1="86" y1="210" x2="86" y2="230" stroke="#0D2B3E" strokeWidth="1" opacity="0.3"/>

      {/* Student figure */}
      <circle cx="380" cy="170" r="28" fill="#F5C518" opacity="0.9"/>
      {/* Face */}
      <circle cx="373" cy="166" r="2.5" fill="#0D2B3E"/>
      <circle cx="387" cy="166" r="2.5" fill="#0D2B3E"/>
      <path d="M373 178 Q380 184 387 178" stroke="#0D2B3E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Graduation cap */}
      <rect x="360" y="144" width="40" height="6" rx="1" fill="#1A6B5A"/>
      <path d="M380 138 L400 145 L380 152 L360 145 Z" fill="#1A6B5A"/>
      <line x1="400" y1="145" x2="400" y2="155" stroke="#1A6B5A" strokeWidth="2"/>
      <circle cx="400" cy="156" r="3" fill="#F5C518"/>
      {/* Body */}
      <path d="M355 200 Q360 195 380 195 Q400 195 405 200 L408 250 L352 250 Z" fill="#1A6B5A" opacity="0.8"/>
      {/* Arms */}
      <path d="M355 205 Q330 220 335 240" stroke="#F5C518" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M405 205 Q415 225 410 245" stroke="#F5C518" strokeWidth="10" strokeLinecap="round" fill="none"/>

      {/* Floating elements */}
      {/* Math formula */}
      <rect x="50" y="100" width="80" height="40" rx="8" fill="white" opacity="0.9"/>
      <text x="62" y="118" fill="#1A6B5A" fontSize="11" fontWeight="bold">∫f(x)dx</text>
      <text x="68" y="132" fill="#0D2B3E" fontSize="9">Calculus</text>

      {/* Atom */}
      <circle cx="430" cy="80" r="8" fill="#F5C518" opacity="0.9"/>
      <ellipse cx="430" cy="80" rx="20" ry="8" fill="none" stroke="#1A6B5A" strokeWidth="1.5" opacity="0.7"/>
      <ellipse cx="430" cy="80" rx="20" ry="8" fill="none" stroke="#1A6B5A" strokeWidth="1.5" opacity="0.7" transform="rotate(60 430 80)"/>
      <ellipse cx="430" cy="80" rx="20" ry="8" fill="none" stroke="#1A6B5A" strokeWidth="1.5" opacity="0.7" transform="rotate(120 430 80)"/>

      {/* Star rating */}
      <text x="30" y="180" fill="#F5C518" fontSize="16">★★★★★</text>
      <text x="32" y="195" fill="#1A6B5A" fontSize="9" fontWeight="500">4.9 Rating</text>

      {/* Pencil */}
      <rect x="440" y="150" width="8" height="60" rx="2" fill="#F5C518" transform="rotate(20 440 150)"/>
      <polygon points="448,208 440,210 444,198" fill="#0D2B3E" transform="rotate(20 440 150)"/>

      {/* Trophy */}
      <path d="M100 60 Q90 75 95 90 L120 90 Q125 75 115 60 Z" fill="#F5C518" opacity="0.8"/>
      <rect x="103" y="90" width="14" height="8" rx="1" fill="#D4A017"/>
      <rect x="98" y="98" width="24" height="4" rx="1" fill="#F5C518"/>
      <path d="M95 65 Q80 67 82 80 L95 80" fill="none" stroke="#F5C518" strokeWidth="3"/>
      <path d="M115 65 Q130 67 128 80 L115 80" fill="none" stroke="#F5C518" strokeWidth="3"/>
    </svg>
  );
}
