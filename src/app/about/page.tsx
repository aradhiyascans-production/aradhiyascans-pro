'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Award, 
  Cpu, 
  Users, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import SEO from '@/components/SEO';

export default function AboutPage() {



  return (
    <>
      <SEO />
      <div className="bg-brand-cream min-h-screen py-12 lg:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 lg:space-y-32">
          
          {/* Headline Story Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Our Identity</span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-brand-charcoal leading-[1.15]">
                Deciphering Health with <br />
                <span className="italic text-brand-emerald">Absolute Precision</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-brand-charcoal/70 leading-relaxed">
                We started Aradhiya Scans with a simple intention: to replace typical hospital-aesthetic diagnostics with a warm, patient-first facility backed by high-precision testing systems in Chidambaram.
              </p>
            </div>
            <div className="lg:col-span-5 relative w-full h-[320px] rounded-3xl overflow-hidden border border-brand-charcoal/5 shadow-md bg-brand-white">
              <Image
                src="/images/premium_about_hero_v3.png"
                alt="Aradhiya Scans Premium Diagnostics Environment"
                fill
                sizes="(max-w-7xl) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* SECTION 1: CORE PHILOSOPHY - VALUES */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 space-y-4 text-left">
              <div className="p-3 bg-brand-cream border border-brand-charcoal/5 w-fit rounded-xl">
                <Target className="h-5 w-5 text-brand-emerald" />
              </div>
              <h3 className="font-serif text-xl font-medium text-brand-charcoal">Our Mission</h3>
              <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                To empower families and clinical professionals by delivering verified, prompt diagnostic evaluations. We build safety checks into every workflow to safeguard clinical accuracy.
              </p>
            </div>

            <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 space-y-4 text-left">
              <div className="p-3 bg-brand-cream border border-brand-charcoal/5 w-fit rounded-xl">
                <Award className="h-5 w-5 text-brand-emerald" />
              </div>
              <h3 className="font-serif text-xl font-medium text-brand-charcoal">Diagnostic Excellence</h3>
              <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                We utilize fully-automated clinical paths and daily control calibrations. Our technicians and pathologs double-check all anomalous readings before finalizing reports.
              </p>
            </div>

            <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 space-y-4 text-left">
              <div className="p-3 bg-brand-cream border border-brand-charcoal/5 w-fit rounded-xl">
                <Cpu className="h-5 w-5 text-brand-emerald" />
              </div>
              <h3 className="font-serif text-xl font-medium text-brand-charcoal">Technology Focus</h3>
              <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                From low-radiation digital radiograms to high-speed multi-slice CT scanning systems, we invest in diagnostics that improve resolution and patient comfort.
              </p>
            </div>
          </section>

          {/* SECTION 2: TRUST & CERTIFICATION POINTS */}
          <section className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Why Patients Trust Us</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-charcoal">
                Built on Clinical Integrity & Precision
              </h2>
              <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                Every scan and specimen analysis at Aradhiya is governed by rigid quality parameters designed to ensure promptness, clarity, and precision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 flex gap-6 items-start">
                <div className="p-3 bg-brand-cream border border-brand-charcoal/5 rounded-2xl text-brand-emerald shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="font-serif text-lg font-medium text-brand-charcoal">Double-Verified Reports</h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                    All findings are cross-examined. Critical and abnormal values are automatically double-checked by our senior pathologists and radiologist teams before final dispatch.
                  </p>
                </div>
              </div>

              <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 flex gap-6 items-start">
                <div className="p-3 bg-brand-cream border border-brand-charcoal/5 rounded-2xl text-brand-emerald shrink-0">
                  <Cpu className="h-6 w-6" />
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="font-serif text-lg font-medium text-brand-charcoal">Calibrated Diagnostics</h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                    Our analyzers, CT scanners, and ultrasound units undergo strict daily calibration checks. We match performance against global control standards every single morning.
                  </p>
                </div>
              </div>

              <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 flex gap-6 items-start">
                <div className="p-3 bg-brand-cream border border-brand-charcoal/5 rounded-2xl text-brand-emerald shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="font-serif text-lg font-medium text-brand-charcoal">Certified Clinical Team</h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                    Our phlebotomists and technologists hold professional certifications and undergo regular medical training. Your samples and scans are in safe, experienced hands.
                  </p>
                </div>
              </div>

              <div className="bg-brand-white p-8 rounded-3xl border border-brand-charcoal/5 flex gap-6 items-start">
                <div className="p-3 bg-brand-cream border border-brand-charcoal/5 rounded-2xl text-brand-emerald shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div className="space-y-2 text-left">
                  <h3 className="font-serif text-lg font-medium text-brand-charcoal">Physician-Approved Formats</h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                    Reports are structured to highlight reference intervals and crucial diagnostic findings clearly, allowing your consulting physician to plan treatment with complete confidence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: COMMUNITY IMPACT & QUALITY */}
          <section className="bg-brand-white rounded-3xl border border-brand-charcoal/5 p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Local Commitment</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-brand-charcoal">
                  Supporting Tamil Nadu Families
                </h2>
                <p className="font-sans text-sm text-brand-charcoal/70 leading-relaxed">
                  We believe diagnostic screening should be accessible to all parts of the community. Aradhiya works actively alongside local health registries and provides subsidized screening programs, health awareness initiatives, and mobile sample collections for older adults in and around Chidambaram.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-x-2 text-xs text-brand-charcoal/70">
                    <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                    <span>Free preventive screening clinics</span>
                  </div>
                  <div className="flex gap-x-2 text-xs text-brand-charcoal/70">
                    <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                    <span>Mobile collection teams for elderly patients</span>
                  </div>
                  <div className="flex gap-x-2 text-xs text-brand-charcoal/70">
                    <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                    <span>Physician educational partnerships</span>
                  </div>
                  <div className="flex gap-x-2 text-xs text-brand-charcoal/70">
                    <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" />
                    <span>Subsidized screening panels</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 bg-brand-cream border border-brand-charcoal/5 rounded-3xl p-8 space-y-6 text-left relative overflow-hidden flex flex-col justify-between h-[300px]">
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-brand-emerald/5 rounded-full blur-2xl" />
                <div className="space-y-4">
                  <Heart className="h-8 w-8 text-brand-emerald" />
                  <h3 className="font-serif text-lg font-bold text-brand-charcoal">Need Home Collection?</h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed">
                    Our certified phlebotomists can visit your residence in Chidambaram to collect samples. Fasting requirements apply as normal.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const phoneNumber = '919360933128';
                    const text = encodeURIComponent('Hello Aradhiya. I would like to book a Home Sample Collection service in Chidambaram.');
                    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
                  }}
                  className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition-colors cursor-pointer"
                >
                  Book Home Collection
                </button>
              </div>
            </div>
          </section>


        </div>
      </div>
    </>
  );
}
