import Image from 'next/image';
import Link from 'next/link';

interface GMALogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  href?: string;
  dark?: boolean;
}

const sizes = {
  sm: { img: 32, titleClass: 'text-sm', subClass: 'text-[9px]' },
  md: { img: 42, titleClass: 'text-base', subClass: 'text-[10px]' },
  lg: { img: 56, titleClass: 'text-xl', subClass: 'text-xs' },
};

export default function GMALogo({
  size = 'md',
  showTagline = true,
  className = '',
  href = '/',
  dark = false,
}: GMALogoProps) {
  const { img, titleClass, subClass } = sizes[size];
  const titleCol = dark ? 'text-white' : 'text-slate-900';
  const subCol = dark ? 'text-sky-300' : 'text-blue-600';

  const content = (
    <span className={`flex items-center gap-2 group ${className}`}>
      <Image
        src="/logo.svg"
        alt="Global Minds Academy Logo"
        width={img}
        height={img}
        className="flex-shrink-0"
        priority
      />
      {showTagline && (
        <span className="flex flex-col leading-none">
          <span className={`font-display font-black tracking-wide uppercase ${titleClass} ${titleCol} flex items-center gap-1.5`}>
            <span>GLOBAL MINDS</span>
            <span className="text-[9px] tracking-wider px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200/80 font-bold">
              ACADEMY
            </span>
          </span>
          <span className={`font-semibold uppercase tracking-widest ${subClass} ${subCol} mt-0.5`}>
            BUILD SKILLS | OWN THE FUTURE
          </span>
        </span>
      )}
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
