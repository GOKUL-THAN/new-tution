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
  const titleCol = dark ? 'text-white' : 'text-[#0E3B43]';
  const subCol = dark ? 'text-accent-400' : 'text-[#D98A12]';

  const content = (
    <span className={`flex items-center gap-2.5 group ${className}`}>
      <Image
        src="/logo-emblem.svg"
        alt="Global Minds Academy Logo"
        width={img}
        height={Math.round((img * 365) / 450)}
        className="flex-shrink-0"
        priority
      />
      {showTagline && (
        <span className="flex flex-col leading-none">
          <span className={`font-display font-black tracking-wide uppercase ${titleClass} ${titleCol}`}>
            GLOBAL MINDS
          </span>
          <span className={`font-bold uppercase tracking-widest ${subClass} ${subCol}`}>
            BUILD SKILLS | OWN THE FUTURE
          </span>
        </span>
      )}
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
