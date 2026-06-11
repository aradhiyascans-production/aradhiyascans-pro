import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-ivory border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex flex-col justify-start">
              <span className="font-serif text-3xl font-medium tracking-tight text-brand-ivory">
                Aradhiya
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold font-medium leading-none -mt-1 pl-0.5">
                Scans & Lab
              </span>
            </Link>
            <p className="text-sm text-brand-ivory/60 leading-relaxed max-w-sm">
              An advanced clinical facility focusing on high-resolution imaging, meticulous pathology, and patient-centered diagnostic care in Chidambaram, Tamil Nadu.
            </p>
            <div className="text-xs text-brand-gold font-medium tracking-widest uppercase">
              ISO 9001:2015 & Quality Compliant
            </div>
          </div>

          {/* Core Diagnostics Directory */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-medium text-brand-gold">Diagnostics</h4>
            <ul className="space-y-3 text-sm text-brand-ivory/70">
              <li>
                <Link href="/services#ct-scan" className="hover:text-brand-ivory transition-colors">
                  Multi-Slice CT Scan
                </Link>
              </li>
              <li>
                <Link href="/services#digital-x-ray" className="hover:text-brand-ivory transition-colors">
                  Digital Radiography (X-Ray)
                </Link>
              </li>
              <li>
                <Link href="/services#echocardiography" className="hover:text-brand-ivory transition-colors">
                  Echocardiography (Eco)
                </Link>
              </li>
              <li>
                <Link href="/services#blood-tests" className="hover:text-brand-ivory transition-colors">
                  Comprehensive Pathology
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-brand-ivory transition-colors">
                  Preventive Health Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Support Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-medium text-brand-gold">Patient Guide</h4>
            <ul className="space-y-3 text-sm text-brand-ivory/70">
              <li>
                <Link href="/guide" className="hover:text-brand-ivory transition-colors">
                  Preparation Instructions
                </Link>
              </li>
              <li>
                <Link href="/guide#faqs" className="hover:text-brand-ivory transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-brand-ivory transition-colors">
                  About Our Excellence
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-ivory transition-colors">
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-medium text-brand-gold">Contact & Hours</h4>
            <ul className="space-y-4 text-sm text-brand-ivory/70">
              <li className="flex items-start gap-x-3">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  39B, Theradi Kovil Street,
                  <br />
                  Gandhi Nagar, Chidambaram - 608001,
                  <br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-x-3">
                <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                <a href="tel:+919360933128" className="hover:text-brand-ivory transition-colors">
                  +91 93609 33128
                </a>
              </li>
              <li className="flex items-start gap-x-3">
                <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Mon - Sat: 07:00 AM - 09:00 PM
                  <br />
                  Sunday: 07:00 AM - 02:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 text-center sm:text-left text-xs text-brand-ivory/40">
          &copy; {currentYear} Aradhiya Scans & Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
