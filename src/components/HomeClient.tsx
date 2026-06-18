'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Cpu,
  Activity,
  Heart,
  CheckCircle2,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { type TestProfile } from '@/lib/types';
import { toast } from 'sonner';

// Animation configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
  }
};

interface HomeClientProps {
  featuredPackages: TestProfile[];
}

export default function HomeClient({ featuredPackages }: HomeClientProps) {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedService, setSelectedService] = useState('Ultrasound Scan');
  const [pkgSlideIndex, setPkgSlideIndex] = useState(0);
  const [isPkgSliderPaused, setIsPkgSliderPaused] = useState(false);

  const pkgSlugs = ['men-s-health-check-up', 'womens-health-check-up', 'master-health-check-up'];
  const pkgSlides = pkgSlugs.map(slug => featuredPackages.find(p => p.slug === slug)).filter(Boolean) as TestProfile[];
  const totalPkgSlides = pkgSlides.length || 1;

  const nextPkgSlide = useCallback(() => {
    setPkgSlideIndex(prev => (prev + 1) % totalPkgSlides);
  }, [totalPkgSlides]);

  const prevPkgSlide = useCallback(() => {
    setPkgSlideIndex(prev => (prev - 1 + totalPkgSlides) % totalPkgSlides);
  }, [totalPkgSlides]);

  useEffect(() => {
    if (isPkgSliderPaused || totalPkgSlides <= 1) return;
    const timer = setInterval(nextPkgSlide, 15000);
    return () => clearInterval(timer);
  }, [isPkgSliderPaused, totalPkgSlides, nextPkgSlide]);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    const message = `Hello Aradhiya Scans & Lab, I want to book an appointment:\n\n*Patient Name:* ${patientName}\n*Phone Number:* ${patientPhone}\n*Required Service:* ${selectedService}`;
    const url = `https://wa.me/919360933128?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    toast.success("Opening WhatsApp to complete your booking!");
  };

  return (
    <>
      <section className="relative overflow-hidden bg-brand-cream pt-10 pb-16 lg:pt-14 lg:pb-20">
        {/* Background glow effects */}
        <div className="absolute left-[-5%] top-[10%] w-[35%] h-[35%] rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />
        <div className="absolute left-[15%] bottom-[5%] w-[25%] h-[25%] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          
          {/* Top Row: Split layout (Left: Business Name block, Right: Booking & QR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-brand-charcoal/5 pb-8 mb-10">
            {/* Left 8 columns: Business name and details */}
            <div className="lg:col-span-8 text-left space-y-6 lg:pr-8">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-brand-emerald tracking-tight uppercase leading-none">
                  Aradhiya Scans & Lab
                </h1>
                <div>
                  <p className="font-sans text-sm sm:text-base lg:text-lg text-brand-gold-dark font-bold uppercase tracking-wider mt-1.5">
                    {"Chidambaram's Advanced Scan, Echo & Diagnostic Pathology Laboratory"}
                  </p>
                </div>
              </div>

              {/* Core Diagnostic Services in the Gap */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xs uppercase tracking-widest text-brand-charcoal/50 font-bold text-left">
                  Core Diagnostic Services
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Ultrasound Scan */}
                  <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 flex flex-col justify-between shadow-md hover:shadow-lg hover:border-brand-gold/15 transition-all duration-300 text-left relative overflow-hidden group hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand-gold before:rounded-l-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div>
                      {/* Diagnostic Type Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                          Imaging
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-base font-semibold tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug mt-1 mb-2 pr-8">
                        Ultrasound Scan
                      </h3>

                      {/* Short Description */}
                      <p className="text-[11px] text-brand-charcoal/65 leading-relaxed line-clamp-2 mb-4 font-medium">
                        High-resolution abdominal, pelvic, and obstetric scanning utilizing safe sound waves.
                      </p>

                      {/* Service Clinical Image */}
                      <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-brand-charcoal/5 bg-brand-cream mb-4">
                        <Image
                          src="/images/premium_ultrasound_v3.png"
                          alt="Ultrasound Scan"
                          fill
                          sizes="(max-w-7xl) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>

                      {/* Scan Types */}
                      <div className="space-y-2.5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/40">Available Scans</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Abdomen', 'Pelvic', 'Thyroid'].map((scan) => (
                            <span key={scan} className="text-[9px] font-semibold text-brand-charcoal/65 bg-brand-cream/60 border border-brand-charcoal/5 rounded-md px-2 py-0.5">
                              {scan}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2.5 pt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-brand-gold-dark" />
                            <span className="text-[9px] font-bold text-brand-gold-dark">Same Day</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-brand-emerald" />
                            <span className="text-[9px] font-bold text-brand-emerald">Walk-in</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-auto pt-4 border-t border-brand-charcoal/5">
                      <div className="grid grid-cols-2 gap-2.5 items-center">
                        <Link
                          href="/services/ultrasound"
                          className="w-full border border-brand-charcoal/10 hover:bg-brand-cream hover:text-brand-emerald text-brand-charcoal text-[9px] font-bold uppercase tracking-wider text-center rounded-full py-2 block transition duration-300"
                        >
                          View Detail
                        </Link>
                        <a
                          href={`https://wa.me/919360933128?text=${encodeURIComponent("Hello Aradhiya Scans. I want to book an appointment for an Ultrasound Scan.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[9px] font-bold uppercase tracking-wider text-center rounded-full py-2 block transition duration-300 shadow-2xs hover:shadow-sm"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: CT Scan */}
                  <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 flex flex-col justify-between shadow-md hover:shadow-lg hover:border-brand-gold/15 transition-all duration-300 text-left relative overflow-hidden group hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand-gold before:rounded-l-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div>
                      {/* Diagnostic Type Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                          Advanced Scan
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-base font-semibold tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug mt-1 mb-2 pr-8">
                        CT Scan
                      </h3>

                      {/* Short Description */}
                      <p className="text-[11px] text-brand-charcoal/65 leading-relaxed line-clamp-2 mb-4 font-medium">
                        High-speed multi-slice scanning yielding precise skeletal and vascular views.
                      </p>

                      {/* Service Clinical Image */}
                      <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-brand-charcoal/5 bg-brand-cream mb-4">
                        <Image
                          src="/images/premium_ct_scan_v3.png"
                          alt="CT Scan"
                          fill
                          sizes="(max-w-7xl) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>

                      {/* Scan Types */}
                      <div className="space-y-2.5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/40">Available Scans</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Brain', 'Chest', 'Abdomen', 'Spine'].map((scan) => (
                            <span key={scan} className="text-[9px] font-semibold text-brand-charcoal/65 bg-brand-cream/60 border border-brand-charcoal/5 rounded-md px-2 py-0.5">
                              {scan}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2.5 pt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-brand-gold-dark" />
                            <span className="text-[9px] font-bold text-brand-gold-dark">Same Day</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-brand-emerald" />
                            <span className="text-[9px] font-bold text-brand-emerald">Appointment</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-auto pt-4 border-t border-brand-charcoal/5">
                      <div className="grid grid-cols-2 gap-2.5 items-center">
                        <Link
                          href="/services/ct-scan"
                          className="w-full border border-brand-charcoal/10 hover:bg-brand-cream hover:text-brand-emerald text-brand-charcoal text-[9px] font-bold uppercase tracking-wider text-center rounded-full py-2 block transition duration-300"
                        >
                          View Detail
                        </Link>
                        <a
                          href={`https://wa.me/919360933128?text=${encodeURIComponent("Hello Aradhiya Scans. I want to book an appointment for a CT Scan.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[9px] font-bold uppercase tracking-wider text-center rounded-full py-2 block transition duration-300 shadow-2xs hover:shadow-sm"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Health Checkup Slider (Data from Firestore) */}
                  <div
                    className="bg-gradient-to-br from-brand-white to-brand-cream/40 border border-brand-charcoal/5 rounded-3xl p-5 flex flex-col justify-between shadow-md hover:shadow-lg hover:border-brand-gold/15 transition-all duration-300 text-left relative overflow-hidden group hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand-gold before:rounded-l-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                    onMouseEnter={() => setIsPkgSliderPaused(true)}
                    onMouseLeave={() => setIsPkgSliderPaused(false)}
                  >
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Dynamic Active Discount Badge */}
                    {(() => {
                      const activePkg = pkgSlides[pkgSlideIndex];
                      const activePrice = activePkg?.price;
                      const activeDiscountPrice = activePkg?.discountPrice;
                      const activeHasDiscount = !!activePrice && !!activeDiscountPrice && activePrice > activeDiscountPrice;
                      const activeDiscountPercent = activeHasDiscount ? Math.round(((activePrice! - activeDiscountPrice!) / activePrice!) * 100) : 0;
                      
                      return activeHasDiscount ? (
                        <div className="absolute -top-1 -right-1 h-11 w-11 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-cream text-[9px] font-bold tracking-tight shadow-md transform rotate-12 z-10 border border-brand-cream">
                          <span>{activeDiscountPercent}%</span>
                          <span className="text-[7px] uppercase tracking-tighter">OFF</span>
                        </div>
                      ) : null;
                    })()}

                    {/* Slider Navigation — Top Left of Card 3 (replacing tags) */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          {pkgSlides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPkgSlideIndex(i)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === pkgSlideIndex ? 'w-5 bg-brand-emerald' : 'w-1.5 bg-brand-charcoal/20 hover:bg-brand-charcoal/40'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={prevPkgSlide}
                            className="h-6 w-6 rounded-full border border-brand-charcoal/10 hover:border-brand-emerald/30 hover:bg-brand-emerald/5 flex items-center justify-center transition-all duration-200"
                          >
                            <ChevronLeft className="h-3 w-3 text-brand-charcoal/50" />
                          </button>
                          <button
                            onClick={nextPkgSlide}
                            className="h-6 w-6 rounded-full border border-brand-charcoal/10 hover:border-brand-emerald/30 hover:bg-brand-emerald/5 flex items-center justify-center transition-all duration-200"
                          >
                            <ChevronRight className="h-3 w-3 text-brand-charcoal/50" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Slide Content Area */}
                    <div className="relative overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${pkgSlideIndex * 100}%)` }}
                      >
                        {pkgSlides.map((pkg) => {
                          const slidePrice = pkg.price;
                          const slideDiscountPrice = pkg.discountPrice;
                          const slideHasDiscount = !!slidePrice && !!slideDiscountPrice && slidePrice > slideDiscountPrice;
                          const slideDiscountPercent = slideHasDiscount ? Math.round(((slidePrice! - slideDiscountPrice!) / slidePrice!) * 100) : 0;
                          const slideSavings = slideHasDiscount ? slidePrice! - slideDiscountPrice! : 0;
                          const slideTestCount = [
                            ...(pkg.includedCategories?.flatMap(c => c.tests || []) || []),
                            ...(pkg.includedTests || [])
                          ].length;
                          const slideDuration = pkg.duration || '24h';
                          const slideIsHome = pkg.availability === 'Home' || pkg.availability === 'Both';

                          return (
                            <div key={pkg.slug} className="w-full shrink-0">
                              {/* Title */}
                              <h3 className="font-serif text-base font-semibold tracking-tight text-brand-charcoal leading-snug mt-1 mb-2 pr-8">
                                {pkg.name}
                              </h3>

                              {/* Description */}
                              <p className="text-[11px] text-brand-charcoal/65 leading-relaxed line-clamp-2 mb-4 font-medium">
                                {pkg.description}
                              </p>

                              {/* Stats Row */}
                              <div className="flex items-center gap-2.5 mb-4">
                                {slideTestCount > 0 && (
                                  <div className="flex items-center gap-1.5 bg-brand-emerald/5 border border-brand-emerald/10 rounded-lg px-2.5 py-1.5">
                                    <Activity className="h-3 w-3 text-brand-emerald" />
                                    <span className="text-[9px] font-bold text-brand-emerald">{slideTestCount}+ Tests</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5 bg-brand-gold/5 border border-brand-gold/10 rounded-lg px-2.5 py-1.5">
                                  <Clock className="h-3 w-3 text-brand-gold-dark" />
                                  <span className="text-[9px] font-bold text-brand-gold-dark">{slideDuration} Reports</span>
                                </div>
                              </div>

                              {/* USP Checklist */}
                              <div className="space-y-2 mb-4">
                                {slideIsHome && (
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-emerald shrink-0" />
                                    <span className="text-[10px] font-semibold text-brand-charcoal/70">Free Home Sample Collection</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-emerald shrink-0" />
                                  <span className="text-[10px] font-semibold text-brand-charcoal/70">Certified Pathologist Verified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-emerald shrink-0" />
                                  <span className="text-[10px] font-semibold text-brand-charcoal/70">Digital Report on WhatsApp</span>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="bg-brand-emerald/5 border border-brand-emerald/10 rounded-xl p-3">
                                <div className="flex items-baseline gap-2">
                                  {slideHasDiscount ? (
                                    <>
                                      <span className="text-xl font-bold text-brand-emerald font-serif">₹{slideDiscountPrice?.toLocaleString('en-IN')}</span>
                                      <span className="text-xs text-brand-charcoal/40 line-through font-semibold">₹{slidePrice?.toLocaleString('en-IN')}</span>
                                    </>
                                  ) : slidePrice ? (
                                    <span className="text-xl font-bold text-brand-emerald font-serif">₹{slidePrice.toLocaleString('en-IN')}</span>
                                  ) : (
                                    <span className="text-sm font-bold italic text-brand-charcoal/45">Price on Request</span>
                                  )}
                                </div>
                                {slideHasDiscount && (
                                  <p className="text-[8px] font-bold text-brand-emerald/70 uppercase tracking-wider mt-0.5">
                                    Save ₹{slideSavings.toLocaleString('en-IN')} · Limited Period Offer
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-auto pt-4 border-t border-brand-charcoal/5">
                      <div className="grid grid-cols-2 gap-2.5 items-center">
                        <Link
                          href={`/tests/${pkgSlides[pkgSlideIndex]?.slug || 'master-health-check-up'}`}
                          className="w-full border border-brand-charcoal/10 hover:bg-brand-cream hover:text-brand-emerald text-brand-charcoal text-[9px] font-bold uppercase tracking-wider text-center rounded-full py-2 block transition duration-300"
                        >
                          View Detail
                        </Link>
                        <a
                          href={`https://wa.me/919360933128?text=${encodeURIComponent(`Hello Aradhiya Scans. I want to book a ${pkgSlides[pkgSlideIndex]?.name || 'Health Checkup'}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[9px] font-bold uppercase tracking-wider text-center rounded-full py-2 block transition duration-300 shadow-2xs hover:shadow-sm"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 columns: Quick Booking Form + Address QR code */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Booking Form */}
              <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 shadow-sm text-left">
                <h3 className="font-serif text-lg font-bold text-brand-charcoal border-b border-brand-charcoal/5 pb-3">
                  Quick Appointment Booking
                </h3>
                <p className="text-[10px] text-brand-charcoal/65 mt-1.5 leading-relaxed font-semibold">
                  Fill in your details below and submit. We will redirect you to WhatsApp to confirm your slot immediately.
                </p>

                <form onSubmit={handleQuickBook} className="mt-4 space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-charcoal/50">Patient Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-charcoal/50">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-medium transition"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-brand-charcoal/50">Select Scan/Checkup</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-xs font-semibold text-brand-charcoal/80 cursor-pointer"
                    >
                      <option value="Ultrasound Scan">Ultrasound Scan</option>
                      <option value="CT Scan">CT Scan</option>
                      <option value="Master Health Checkup">Master Health Checkup</option>
                      <option value="Blood/Urine Pathology Tests">Blood/Urine Pathology Tests</option>
                      <option value="ECG / Heart Echocardiogram">ECG / Heart Echocardiogram</option>
                      <option value="Digital X-Ray">Digital X-Ray</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition duration-300 border-none cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Book Appointment on WhatsApp
                    </button>
                  </div>
                </form>
              </div>

              {/* Prominent Address Location QR Card */}
              <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 shadow-sm text-left flex flex-row items-center gap-4 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
                
                {/* Large QR Code Display */}
                <a
                  href="https://maps.app.goo.gl/XAbKoG42RGcrwue86"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-24 h-24 bg-brand-cream rounded-xl overflow-hidden p-1 shrink-0 border border-brand-charcoal/10 hover:border-brand-gold/40 transition duration-300 block shadow-sm"
                  title="Click to open Google Maps navigation"
                >
                  <Image
                    src="/images/map_qr.png"
                    alt="Google Maps QR Code"
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </a>

                <div className="text-left font-sans flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-gold-dark">
                    Scan or Click for Location
                  </div>
                  <h4 className="font-serif text-sm font-bold text-brand-charcoal mt-1">
                    Visit Our Lab
                  </h4>
                  <p className="text-[10px] text-brand-charcoal/60 leading-normal mt-1 font-semibold">
                    39B, Theradi Kovil Street,<br />
                    (Opp. Venus Matric School),<br />
                    Chidambaram - 608001
                  </p>
                  <a
                    href="https://maps.app.goo.gl/XAbKoG42RGcrwue86"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] font-bold text-brand-emerald hover:text-brand-emerald-light uppercase tracking-wider mt-2 block hover:underline transition"
                  >
                    Open Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary CTA/Information bar for home collections */}
          <div className="bg-brand-emerald/5 border border-brand-emerald/15 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-emerald"></span>
              </span>
              <div className="font-sans">
                <p className="text-xs font-bold text-brand-emerald">Home Sample Collection Available in Chidambaram</p>
                <p className="text-[10px] text-brand-charcoal/60 font-medium">Get blood and urine collections done from the comfort of your home.</p>
              </div>
            </div>
            <Link
              href="/tests"
              className="px-4 py-2 bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0 transition"
            >
              View All Packages & Tests
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES - MODERN VISUAL CARDS */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-y-4">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Specialized Capabilities</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-charcoal">
                Core Diagnostic Services
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold uppercase tracking-wider text-brand-emerald hover:text-brand-emerald-dark transition-colors flex items-center gap-x-2 group shrink-0"
            >
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'ultrasound', title: 'Ultrasound Scan', desc: 'High-resolution abdominal, pelvic, and obstetric scanning utilizing safe sound waves.', image: '/images/premium_ultrasound_v3.png' },
              { id: 'master-health-check-up', title: 'Master Health Checkup', desc: 'A comprehensive preventive screening program assessing vital organs and general wellness.', image: '/images/premium_health_packages_v3.png', isPackage: true },
              { id: 'ct-scan', title: 'CT Scan', desc: 'High-speed multi-slice scanning yielding precise skeletal and vascular views.', image: '/images/premium_ct_scan_v3.png' },
              { id: 'echocardiography', title: 'Echocardiography', desc: 'High-fidelity ultrasound mapping active cardiovascular structural integrity.', image: '/images/echo_v3.png' },
              { id: 'digital-x-ray', title: 'Digital X-Ray', desc: 'Low-dose immediate radiography providing bone structural detail.', image: '/images/xray_v3.png' },
              { id: 'ecg', title: 'ECG (Electrocardiogram)', desc: '12-lead electrical tracing evaluating rhythm, pulse, and ischemic details.', image: '/images/ecg_v3.png' }
            ].map((srv, idx) => {
              const categoryTag =
                srv.id === 'master-health-check-up' ? 'Pathology Lab' :
                  (srv.id === 'ecg' || srv.id === 'echocardiography') ? 'Cardiac' :
                    'Imaging';

              const bookingMsg = `Hello Aradhiya Scans. I want to book an appointment for the "${srv.title}" test.`;

              return (
                <div
                  key={idx}
                  className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-lg hover:border-brand-gold/15 transition-all duration-300 text-left relative overflow-hidden group hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand-gold before:rounded-l-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                >
                  {/* Premium Gold Accent Glow */}
                  <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Diagnostic Type Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                        {categoryTag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-semibold tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 mt-2 mb-2 pr-6">
                      {srv.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-brand-charcoal/65 leading-relaxed line-clamp-3 mb-4 font-medium">
                      {srv.desc}
                    </p>

                    {/* Service Clinical Image */}
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-brand-charcoal/5 bg-brand-cream mb-4">
                      <Image
                        src={srv.image}
                        alt={srv.title}
                        fill
                        sizes="(max-w-7xl) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-auto pt-5 border-t border-brand-charcoal/5">
                    <div className="grid grid-cols-2 gap-3 items-center">
                      <Link
                        href={srv.isPackage ? `/tests/${srv.id}` : `/services/${srv.id}`}
                        className="w-full border border-brand-charcoal/10 hover:bg-brand-cream hover:text-brand-emerald text-brand-charcoal text-[10px] font-bold uppercase tracking-wider text-center rounded-full py-3 block transition duration-300"
                      >
                        View Detail
                      </Link>
                      <a
                        href={`https://wa.me/919360933128?text=${encodeURIComponent(bookingMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[10px] font-bold uppercase tracking-wider text-center rounded-full py-3 block transition duration-300 shadow-2xs hover:shadow-sm"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED WELLNESS PACKAGES */}
      {featuredPackages.length > 0 && (
        <section className="py-24 bg-brand-cream border-t border-brand-charcoal/5 relative overflow-hidden">
          {/* Background glow backdrops */}
          <div className="absolute right-[-10%] top-[10%] w-[35%] h-[35%] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />
          <div className="absolute left-[-10%] bottom-[10%] w-[30%] h-[30%] rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-y-4">
              <div className="space-y-4 text-left">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Proactive Screening</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-charcoal">
                  Featured Wellness Packages
                </h2>
              </div>
              <Link
                href="/tests"
                className="text-xs font-semibold uppercase tracking-wider text-brand-emerald hover:text-brand-emerald-dark transition-colors flex items-center gap-x-2 group shrink-0"
              >
                View All Packages
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => {
                const originalPrice = pkg.price;
                const discountPrice = pkg.discountPrice;
                const hasDiscount = !!originalPrice && !!discountPrice && originalPrice > discountPrice;
                const discountPercent = hasDiscount ? Math.round(((originalPrice! - discountPrice!) / originalPrice!) * 100) : 0;
                const testsList = [
                  ...(pkg.includedCategories && pkg.includedCategories.length > 0
                    ? pkg.includedCategories.flatMap(c => c.tests || [])
                    : []),
                  ...(pkg.includedTests || [])
                ];

                const bookingMessage = `Hi, I would like to book a slot for: *${pkg.name}* at Aradhiya Scans & Lab. Please confirm availability.`;

                return (
                  <div
                    key={pkg.id}
                    className="bg-brand-white border border-brand-charcoal/5 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl p-6 sm:p-8 flex flex-col justify-between h-auto group overflow-hidden shadow-md hover:shadow-xl hover:border-brand-emerald/20 transition-all duration-500 text-left relative hover:-translate-y-1.5"
                  >
                    {/* Gold Accent Glow */}
                    <div className="absolute right-[-10px] top-[-10px] w-28 h-28 bg-gradient-to-br from-brand-gold/10 to-brand-emerald/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Discount Badge */}
                    {hasDiscount && (
                      <div className="absolute -top-1 -right-1 h-12 w-12 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-cream text-[9px] font-bold tracking-tight shadow-md transform rotate-12 transition-transform duration-500 group-hover:scale-110 z-10 border border-brand-cream">
                        <span>{discountPercent}%</span>
                        <span className="text-[7px] uppercase tracking-tighter">OFF</span>
                      </div>
                    )}

                    <div>
                      {/* Top Badges & Turnaround */}
                      <div className="flex items-center justify-between gap-3 mb-5 border-b border-brand-charcoal/5 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-gold-dark">
                            Screening Package
                          </span>
                          <span className="h-1 w-1 rounded-full bg-brand-charcoal/20" />
                          <div className="flex items-center gap-1.5">
                            {pkg.availability === "Home" || pkg.availability === "Both" ? (
                              <span className="text-[9px] font-bold text-brand-emerald uppercase tracking-wider">Home</span>
                            ) : null}
                            {pkg.availability === "Both" ? (
                              <span className="text-[9px] font-bold text-brand-charcoal/20 uppercase tracking-wider">•</span>
                            ) : null}
                            {pkg.availability === "Lab" || pkg.availability === "Both" ? (
                              <span className="text-[9px] font-bold text-brand-gold-dark uppercase tracking-wider">Lab</span>
                            ) : null}
                          </div>
                        </div>

                        <div className={`flex items-center gap-1 text-[9px] font-bold text-brand-charcoal/50 ${hasDiscount ? "mr-10 sm:mr-12" : ""}`}>
                          <Clock className="h-3 w-3 text-brand-gold" />
                          <span>{pkg.duration || "24h"}</span>
                        </div>
                      </div>

                      {/* Package Name */}
                      <h3 className="font-serif text-xl font-medium tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 pr-8">
                        {pkg.name}
                      </h3>

                      {/* Package Description */}
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed line-clamp-2 mt-2 mb-5 font-medium">
                        {pkg.description}
                      </p>

                      {/* Included Tests Summary List */}
                      {testsList.length > 0 && (
                        <div className="mb-6 bg-brand-cream/30 border border-brand-charcoal/5 rounded-2xl p-4">
                          <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/40">Includes parameters like</p>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-brand-charcoal/70 font-semibold">
                            {testsList.slice(0, 3).map((testName, tagIdx) => (
                              <React.Fragment key={tagIdx}>
                                {tagIdx > 0 && <span className="text-brand-gold">•</span>}
                                <span className="max-w-[120px] truncate">{testName}</span>
                              </React.Fragment>
                            ))}
                            {testsList.length > 3 && (
                              <>
                                <span className="text-brand-gold">•</span>
                                <span className="text-brand-emerald text-[9px] font-bold">
                                  +{testsList.length - 3} more
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions and Pricing Row */}
                    <div className="mt-auto pt-4 border-t border-brand-charcoal/5">
                      <div className="flex flex-col gap-3.5">
                        {/* Price Info */}
                        <div className="text-left flex items-baseline justify-between w-full border-b border-brand-charcoal/5 pb-2">
                          <span className="text-[8px] font-bold tracking-[0.2em] text-brand-charcoal/45 uppercase block mb-0.5">Package Price</span>
                          <div className="flex items-baseline gap-1.5">
                            {hasDiscount ? (
                              <>
                                <span className="text-2xl font-bold text-brand-charcoal font-serif">₹{discountPrice}</span>
                                <span className="text-xs text-brand-charcoal/40 line-through font-semibold">₹{originalPrice}</span>
                              </>
                            ) : originalPrice ? (
                              <span className="text-2xl font-bold text-brand-charcoal font-serif">₹{originalPrice}</span>
                            ) : (
                              <span className="text-xs font-bold italic text-brand-charcoal/45">On Request</span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-3 w-full">
                          <Link
                            href={`/tests/${pkg.slug}`}
                            className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-emerald transition-colors duration-300 py-2.5 flex items-center gap-1 group/btn"
                          >
                            Details
                            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                          <a
                            href={`https://wa.me/919360933128?text=${encodeURIComponent(bookingMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[10px] font-bold uppercase tracking-widest text-center rounded-xl px-5 py-3 transition duration-300 shadow-sm hover:shadow-md border border-transparent"
                          >
                            Book Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. WHY ARADHIYA - FEATURE GRID */}
      <section className="py-12 lg:py-24 bg-brand-white border-t border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl text-left mb-8 lg:mb-16 space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-charcoal">
              Where precision diagnostics meet patient-centered care.
            </h2>
            <div className="w-12 h-1 bg-brand-gold rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
            {/* Left side: Premium Image Banner */}
            <div className="lg:col-span-5 relative h-48 lg:h-auto rounded-3xl overflow-hidden border border-brand-charcoal/5 shadow-sm bg-brand-cream animate-pulse-slow">
              <Image
                src="/images/clinic_interior_v3.png"
                alt="Aradhiya Scans Advanced Clinical Scanning Room"
                fill
                sizes="(max-w-7xl) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Right side: 2x2 grid of Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            >
              {[
                {
                  icon: ShieldCheck,
                  title: 'Accurate Diagnostics',
                  description: 'Double-checked analysis protocols and strict calibration standards ensuring high-precision results.'
                },
                {
                  icon: Clock,
                  title: 'Fast Turnaround',
                  description: 'Streamlined clinical testing lines deliver reliable analytical reports back to your provider quickly.'
                },
                {
                  icon: Cpu,
                  title: 'Advanced Technology',
                  description: 'State-of-the-art multi-slice CT scanning and automated biochemical diagnostic tracks.'
                },
                {
                  icon: Heart,
                  title: 'Patient-Focused Care',
                  description: 'Designed to offer comfort, detailed procedural clarity, and transparent guidelines.'
                }
              ].map((feat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 lg:p-8 rounded-3xl bg-brand-cream border border-brand-charcoal/5 hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-charcoal/5 transition-all duration-300 flex flex-col justify-between h-auto sm:h-64 lg:h-72 group cursor-default text-left gap-y-4 sm:gap-y-0"
                >
                  <div className="p-3 bg-brand-white w-fit border border-brand-charcoal/5 group-hover:border-brand-emerald/10 group-hover:bg-brand-emerald/5 transition-all duration-300 rounded-2xl">
                    <feat.icon className="h-5.5 w-5.5 text-brand-emerald" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-medium text-brand-charcoal">{feat.title}</h3>
                    <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. DIAGNOSTIC JOURNEY - INTERACTIVE TIMELINE */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">The Diagnostic Journey</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-charcoal">
              Transparency at Every Step
            </h2>
            <p className="font-sans text-sm text-brand-charcoal/60">
              We guide patients through an orderly, high-accuracy workflow to eliminate anxiety and ensure total verification.
            </p>
          </div>

          {/* Interactive Step Timeline */}
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-brand-emerald/10 hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6">
              {[
                { step: '01', name: 'Consultation', desc: 'Detailed guidance on required preparations, test parameters, and schedules.' },
                { step: '02', name: 'Testing', desc: 'Secure barcoded sample collections or advanced high-definition scanning.' },
                { step: '03', name: 'Analysis', desc: 'Fully automated processing inside clean, regulated diagnostic environments.' },
                { step: '04', name: 'Verification', desc: 'Multi-stage double verification by certified lab specialists.' },
                { step: '05', name: 'Results', desc: 'Secure, digital results delivered instantly to your device and physician.' }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  {/* Step Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-brand-white border-2 border-brand-emerald text-brand-emerald font-serif text-xl font-bold flex items-center justify-center shadow-md z-10 relative group-hover:bg-brand-emerald group-hover:text-brand-cream transition-colors duration-300"
                  >
                    {item.step}
                  </motion.div>
                  <div className="mt-6 space-y-2 px-4">
                    <h4 className="font-serif text-lg font-medium text-brand-charcoal">{item.name}</h4>
                    <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed max-w-[200px] mx-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST METRICS - ELEGANT NUMBER SHOWCASE */}
      <section className="py-24 bg-brand-emerald text-brand-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-emerald-dark/40 z-0" />
        <div className="absolute inset-0 grid-dots-gold opacity-10 z-0" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
            {[
              { value: '25,000+', label: 'Patients Served' },
              { value: '100,000+', label: 'Diagnostic Tests Performed' },
              { value: '4+', label: 'Years of Service' },
              { value: '150+', label: 'Healthcare Professionals Served' }
            ].map((metric, idx) => (
              <div key={idx} className="space-y-2">
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-brand-gold tracking-tight">
                  {metric.value}
                </div>
                <div className="font-sans text-xs sm:text-sm uppercase tracking-wider text-brand-cream/75">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PATIENT EXPERIENCE - STORYTELLING */}
      <section className="py-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Visual Grid */}
            <div className="lg:col-span-5 space-y-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl" />
              <div className="p-8 rounded-3xl bg-brand-white border border-brand-charcoal/5 shadow-sm relative z-10 space-y-6 max-w-sm mx-auto">
                <div className="flex items-center gap-x-3 text-brand-emerald font-serif font-medium">
                  <Activity className="h-5 w-5 text-brand-gold" />
                  Quality Calibration Check
                </div>
                <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                  Daily standard solutions run on clinical chemistry equipment to maintain tight calibration coefficients.
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-emerald animate-ping" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-emerald">
                    System Standardized
                  </span>
                </div>
              </div>
              <div className="p-8 rounded-3xl bg-brand-emerald-dark text-brand-cream shadow-xl border border-white/5 relative z-10 space-y-4 max-w-sm mx-auto mt-2 ml-4 sm:ml-12">
                <div className="text-xs uppercase tracking-widest text-brand-gold font-bold">Patient Protocol</div>
                <h4 className="font-serif text-lg font-medium">Secure Barcoded Tracking</h4>
                <p className="font-sans text-xs text-brand-cream/70 leading-relaxed">
                  Samples are cataloged at the point of extraction with uniquely mapped identifier barcodes, preventing routing discrepancies.
                </p>
              </div>
            </div>

            {/* Story Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4 text-left">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Our Philosophy</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-charcoal">
                  Designed for Trust, Executed with Care
                </h2>
                <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                  {"Diagnostics shouldn't feel clinical and cold. At Aradhiya, we've restructured the testing journey to build complete confidence. We maintain a warm, welcoming environment while deploying automated testing platforms that ensure clinical reports are returned with the utmost integrity."}
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Zero Compromise on Controls', desc: 'Every run is cataloged alongside calibrated reference solutions to check parameters before reports release.' },
                  { title: 'Empathetic Environment', desc: 'Comfortable waiting lounges, clear instructions, and gentle sample extraction processes.' },
                  { title: 'Direct Access', desc: 'Secure, immediate download links and transparent report logs accessible by your physician.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-x-4">
                    <CheckCircle2 className="h-5 w-5 text-brand-emerald shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-charcoal">{item.title}</h4>
                      <p className="font-sans text-xs text-brand-charcoal/60 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL TESTIMONIALS */}
      <section className="py-24 bg-brand-white border-t border-b border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Patient Stories</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-charcoal">
              Trusted by Local Families & Physicians
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Quick response.. Friendly environment.. Super scan centre.",
                author: "harini rajan",
                title: "Patient"
              },
              {
                quote: "Very nice scan centre good service , quickly report.",
                author: "sudha subi",
                title: "Patient"
              },
              {
                quote: "Good scan center, lowest price scan, Advanced mechanics in the center & experience staff.",
                author: "RAJESH SKPS",
                title: "Patient"
              }
            ].map((tst, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-brand-cream border border-brand-charcoal/5 flex flex-col justify-between h-[300px] relative hover:shadow-lg transition-all duration-300"
              >
                <div className="font-serif text-base italic text-brand-charcoal/80 leading-relaxed">
                  &ldquo;{tst.quote}&rdquo;
                </div>
                <div className="pt-6 border-t border-brand-charcoal/5">
                  <div className="font-serif text-sm font-semibold text-brand-charcoal">{tst.author}</div>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-brand-gold font-semibold mt-1">
                    {tst.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CONVERSION CTA */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10 space-y-10">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-brand-charcoal">
              Empowering Your <br className="sm:hidden" />
              Health with <span className="italic">Clarity</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-brand-charcoal/60 max-w-xl mx-auto leading-relaxed">
              Plan your checkup today. Fill out our simple online form to coordinate scheduling, or call our clinical desk directly.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark hover:shadow-lg transition-all duration-300 flex items-center gap-x-2"
            >
              Book an Appointment
              <Calendar className="h-3.5 w-3.5" />
            </Link>
            <a
              href="tel:+919360933128"
              className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-charcoal border border-brand-charcoal/10 hover:border-brand-charcoal bg-transparent transition-all duration-300 flex items-center gap-x-2"
            >
              <Users className="h-3.5 w-3.5" />
              Call Registry Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
