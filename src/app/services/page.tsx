'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Cpu, 
  Activity, 
  FlaskConical, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { servicesData, ServiceDetail } from '@/data/servicesData';

const serviceImages: Record<string, string> = {
  'ultrasound': '/images/premium_ultrasound.png',
  'ct-scan': '/images/premium_ct_scan.png',
  'digital-x-ray': '/images/xray.png',
  'sonomammography': '/images/premium_sonomammography_v2.png',
  'eeg': '/images/premium_eeg.png',
  'ecg': '/images/ecg.png',
  'echocardiography': '/images/echo.png',
  'blood-tests': '/images/premium_blood_tests.png',
  'urine-analysis': '/images/premium_urinalysis.png',
  'hormone-testing': '/images/premium_hormone_testing.png',
  'cholesterol-screening': '/images/premium_lipid_panel.png',
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'imaging' | 'cardiac' | 'laboratory'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered list based on search and category
  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Diagnostics', icon: null },
    { id: 'imaging', label: 'Imaging', icon: Cpu },
    { id: 'cardiac', label: 'Cardiac', icon: Activity },
    { id: 'laboratory', label: 'Pathology Lab', icon: FlaskConical }
  ] as const;

  return (
    <div className="bg-brand-cream min-h-screen py-12 lg:py-20 font-sans text-brand-charcoal relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute left-[-10%] top-[5%] w-[45%] h-[45%] rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[-10%] top-[25%] w-[40%] h-[40%] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl text-left mb-12 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-x-2 px-3 py-1.5 rounded-full border border-brand-emerald/10 bg-brand-emerald/5 text-[10px] font-bold tracking-widest text-brand-emerald uppercase shadow-xs">
            <Sparkles className="h-3 w-3 text-brand-gold" />
            Clinical Guidance
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-brand-charcoal leading-none">
            Diagnostic <span className="bg-gradient-to-r from-brand-emerald to-brand-emerald-dark bg-clip-text text-transparent font-normal">Services</span> <br />
            & Pre-test <span className="font-serif italic font-normal text-brand-gold-dark">Guidelines.</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed max-w-xl font-medium">
            Browse core scanning procedures, cardiac monitoring tracings, and pathology lab requirements at Aradhiya Scans & Lab.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xs space-y-5 lg:space-y-6 mb-12 text-left relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-brand-cream rounded-full blur-2xl pointer-events-none opacity-50" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
            {/* Search Box */}
            <div className="lg:col-span-12 relative">
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-charcoal/30" />
              <input
                type="text"
                placeholder="Search diagnostic capabilities, procedures, or instructions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-brand-charcoal/10 bg-brand-cream/30 text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold/30 focus:ring-1 focus:ring-brand-gold/20 transition-all font-semibold placeholder-brand-charcoal/30 shadow-2xs"
              />
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="border-t border-brand-charcoal/5 pt-5 lg:pt-6 flex overflow-x-auto scrollbar-none whitespace-nowrap gap-2 pb-1.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer shrink-0 flex items-center gap-x-1.5 ${
                    isActive
                      ? 'bg-brand-emerald text-brand-cream border-transparent shadow-xs'
                      : 'bg-brand-cream text-brand-charcoal/70 border-brand-charcoal/5 hover:border-brand-gold/20 hover:text-brand-charcoal'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid Layout */}
        {filteredServices.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="py-20 bg-brand-white border border-brand-charcoal/5 rounded-3xl shadow-xs text-center space-y-4 max-w-xl mx-auto">
            <p className="text-sm font-semibold text-brand-charcoal/60">No diagnostic service matches your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream border border-brand-charcoal/10 text-brand-charcoal hover:border-brand-emerald/30 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceDetail }) {
  return (
    <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg hover:border-brand-gold/15 transition-all duration-300 text-left relative overflow-hidden group hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand-gold before:rounded-l-3xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
      {/* Premium Gold Accent Glow */}
      <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-brand-gold/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Diagnostic Type Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
            {service.category === 'imaging' ? 'Imaging' :
             service.category === 'cardiac' ? 'Cardiac' :
             'Pathology Lab'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 mt-2 mb-2 pr-6">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-brand-charcoal/65 leading-relaxed line-clamp-3 mb-4 font-medium">
          {service.shortDescription}
        </p>

        {/* Service Clinical Image */}
        {serviceImages[service.id] && (
          <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-brand-charcoal/5 bg-brand-cream mb-4">
            <Image
              src={serviceImages[service.id]}
              alt={service.name}
              fill
              sizes="(max-w-7xl) 33vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="mt-auto pt-5 border-t border-brand-charcoal/5">
        <div className="grid grid-cols-2 gap-3 items-center">
          <Link
            href={`/services/${service.id}`}
            className="w-full border border-brand-charcoal/10 hover:bg-brand-cream hover:text-brand-emerald text-brand-charcoal text-[10px] font-bold uppercase tracking-wider text-center rounded-full py-3 block transition duration-300"
          >
            View Detail
          </Link>
          <button
            onClick={() => {
              const phoneNumber = '919360933128';
              const text = encodeURIComponent(`Hello Aradhiya Scans. I want to book an appointment for the "${service.name}" test.`);
              window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
            }}
            className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[10px] font-bold uppercase tracking-wider text-center rounded-full py-3 block transition duration-300 shadow-2xs hover:shadow-sm cursor-pointer border-none"
          >
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
}
