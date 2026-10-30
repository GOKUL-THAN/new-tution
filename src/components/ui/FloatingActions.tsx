'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Bot, MessageCircle, Mail, X, ChevronUp,
} from 'lucide-react';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button after scrolling 400 px
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const buttons = [
    {
      id: 'ai',
      label: 'AI Tutor',
      href: '/student/doubt-support',
      bg: 'bg-violet-600 hover:bg-violet-700',
      icon: (
        <span className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-2 -right-2 bg-amber-400 text-[9px] font-bold text-gray-900 px-1 rounded-full leading-tight">
            AI
          </span>
        </span>
      ),
    },
    {
      id: 'whatsapp',
      label: 'Chat on WhatsApp',
      // Replace with your actual WhatsApp number
      href: 'https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20Global%20Minds%20Academy',
      bg: 'bg-[#25D366] hover:bg-[#20b957]',
      external: true,
      icon: (
        // WhatsApp SVG — properly licensed via simple-icons / inline
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      id: 'enquiry',
      label: 'Send Enquiry',
      href: '/contact',
      bg: 'bg-orange-500 hover:bg-orange-600',
      icon: <Mail className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <>
      {/* FAB Stack — fixed right side */}
      <div
        className="fixed right-4 bottom-20 sm:bottom-6 z-50 flex flex-col items-center gap-3"
        aria-label="Quick contact options"
      >
        {/* Action buttons — visible when open */}
        <div
          className={`flex flex-col items-center gap-3 transition-all duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          {buttons.map((btn) =>
            btn.external ? (
              <a
                key={btn.id}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={btn.label}
                title={btn.label}
                className={`w-12 h-12 rounded-full ${btn.bg} flex items-center justify-center shadow-lg shadow-black/20 transition-all duration-200 hover:scale-110 active:scale-95`}
                onClick={() => setIsOpen(false)}
              >
                {btn.icon}
              </a>
            ) : (
              <Link
                key={btn.id}
                href={btn.href}
                aria-label={btn.label}
                title={btn.label}
                className={`w-12 h-12 rounded-full ${btn.bg} flex items-center justify-center shadow-lg shadow-black/20 transition-all duration-200 hover:scale-110 active:scale-95`}
                onClick={() => setIsOpen(false)}
              >
                {btn.icon}
              </Link>
            )
          )}
        </div>

        {/* Toggle button (open/close) */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
          aria-expanded={isOpen}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-black/25 transition-all duration-300 hover:scale-110 active:scale-95 ${
            isOpen
              ? 'bg-rose-500 hover:bg-rose-600 rotate-0'
              : 'bg-brand-600 hover:bg-brand-700'
          }`}
        >
          <span
            className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-0'}`}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <MessageCircle className="w-5 h-5 text-white" />
            )}
          </span>
        </button>
      </div>

      {/* Scroll-to-top button — separate, bottom-left */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-4 bottom-6 sm:bottom-20 z-40 w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 active:scale-95 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </button>

      {/* Backdrop — closes menu on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
