'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Test & Package', href: '/tests' },
  { label: 'About Us', href: '/about' },
  { label: 'Patient Guide', href: '/guide' },
  { label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-2.5 bg-brand-cream/80 backdrop-blur-md shadow-sm border-b border-brand-charcoal/5' 
          : 'py-3 bg-brand-cream/40 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col justify-start">
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-brand-emerald group-hover:text-brand-emerald-light transition-colors">
              Aradhiya
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium leading-none -mt-1 pl-0.5">
              Scans & Lab
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-2 text-sm font-medium transition-colors text-brand-charcoal/80 hover:text-brand-charcoal"
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Hamburger */}
          <div className="flex items-center gap-x-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition-all duration-300 border border-transparent shadow-sm hover:shadow-md"
            >
              Book Appointment
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 rounded-full text-brand-charcoal hover:bg-brand-charcoal/5 lg:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-brand-cream border-t border-brand-charcoal/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 max-w-7xl mx-auto">
              <nav className="flex flex-col gap-y-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium py-1 transition-colors ${
                        isActive ? 'text-brand-emerald font-semibold' : 'text-brand-charcoal/80 hover:text-brand-charcoal'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-brand-charcoal/5 flex flex-col gap-y-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition-colors"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
