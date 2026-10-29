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
  const titleCol = dark ? 'text-white' : 'text-[#0D2B3E]';
  const subCol = dark ? 'text-[#F5C518]' : 'text-[#1A6B5A]';

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
          <span className={`font-display font-black tracking-wide uppercase ${titleClass} ${titleCol}`}>
            GLOBAL MINDS
          </span>
          <span className={`font-semibold uppercase tracking-widest ${subClass} ${subCol}`}>
            BUILD SKILLS | OWN THE FUTURE
          </span>
        </span>
      )}
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
