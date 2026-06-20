'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { type MedicalTest, type TestProfile } from '@/lib/types';

interface TestsCatalogClientProps {
  tests: MedicalTest[];
  profiles: TestProfile[];
  initialSearchQuery?: string;
}

export default function TestsCatalogClient({ tests, profiles, initialSearchQuery = '' }: TestsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Tests' | 'Packages'>('All');
  const [onlyHomeCollection, setOnlyHomeCollection] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Combine standard tests & checkup packages/profiles
  const allItems: (MedicalTest | TestProfile)[] = [
    ...tests,
    ...profiles
  ];

  // Filtering logic
  const filteredItems = allItems.filter((item) => {
    // 1. Category check
    const isProfile = item.category === 'Test Profiles' || item.category === 'Laboratory Packages';
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Packages') {
        if (!isProfile) return false;
      } else if (selectedCategory === 'Tests') {
        if (isProfile) return false;
      }
    }

    // 2. Home collection check
    if (onlyHomeCollection) {
      if (item.availability !== 'Home' && item.availability !== 'Both') {
        return false;
      }
    }

    // 3. Search query check
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = (item.description || '').toLowerCase().includes(query);
      
      let matchSubTests = false;
      if ('includedTests' in item && item.includedTests) {
        matchSubTests = item.includedTests.some(test => test.toLowerCase().includes(query));
      }
      
      let matchBiomarkers = false;
      if ('biomarkers' in item && item.biomarkers) {
        matchBiomarkers = item.biomarkers.some(bio => bio.toLowerCase().includes(query));
      }

      return matchName || matchDesc || matchSubTests || matchBiomarkers;
    }

    return true;
  });

  // Split filtered items into packages and tests
  const filteredPackages = filteredItems.filter(item => item.category === 'Test Profiles' || item.category === 'Laboratory Packages');
  const filteredTests = filteredItems.filter(item => item.category !== 'Test Profiles' && item.category !== 'Laboratory Packages');

  // Get suggestions (top 5 matches) for mobile search dropdown
  const showSuggestions = searchQuery.trim().length >= 1;
  const matchingSuggestions = showSuggestions
    ? allItems.filter(item => {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = (item.description || '').toLowerCase().includes(query);
        
        let matchSubTests = false;
        if ('includedTests' in item && item.includedTests) {
          matchSubTests = item.includedTests.some(test => test.toLowerCase().includes(query));
        }
        
        let matchBiomarkers = false;
        if ('biomarkers' in item && item.biomarkers) {
          matchBiomarkers = item.biomarkers.some(bio => bio.toLowerCase().includes(query));
        }
        
        return matchName || matchDesc || matchSubTests || matchBiomarkers;
      }).slice(0, 5)
    : [];

  const renderCard = (item: MedicalTest | TestProfile) => {
    const originalPrice = item.price;
    const discountPrice = item.discountPrice;
    const hasDiscount = !!originalPrice && !!discountPrice && originalPrice > discountPrice;
    const isProfile = item.category === "Test Profiles" || item.category === "Laboratory Packages";
    const discountPercent = hasDiscount ? Math.round(((originalPrice! - discountPrice!) / originalPrice!) * 100) : 0;
    const bookingMessage = `Hi, I would like to book a slot for: *${item.name}* at Aradhiya Scans & Lab. Please confirm availability.`;

    return (
      <div 
        key={`${item.category}-${item.id}`}
        className="bg-brand-white border border-brand-charcoal/5 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-brand-emerald/20 transition-all duration-500 text-left relative overflow-hidden group hover:-translate-y-1"
      >
        {/* Gold Accent Glow */}
        <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-gradient-to-br from-brand-gold/10 to-brand-emerald/5 rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute -top-1 -right-1 h-10 w-10 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-cream text-[8px] font-bold tracking-tight shadow-md transform rotate-12 transition-transform duration-500 group-hover:scale-110 z-10 border border-brand-cream">
            <span>{discountPercent}%</span>
            <span className="text-[6px] uppercase tracking-tighter">OFF</span>
          </div>
        )}

        <div>
          {/* Top Badges & Turnaround */}
          <div className="flex items-center justify-between gap-2 mb-3.5 border-b border-brand-charcoal/5 pb-2">
            <div className="flex items-center gap-1.5">
              <span className={`text-[7px] font-bold uppercase tracking-[0.15em] ${
                isProfile ? 'text-brand-gold-dark' : 'text-brand-emerald'
              }`}>
                {isProfile ? "Package" : "Test"}
              </span>
              <span className="h-0.5 w-0.5 rounded-full bg-brand-charcoal/20" />
              <div className="flex items-center gap-1">
                {item.availability === "Home" || item.availability === "Both" ? (
                  <span className="text-[8px] font-bold text-brand-emerald uppercase tracking-wider">Home</span>
                ) : null}
                {item.availability === "Both" ? (
                  <span className="text-[8px] font-bold text-brand-charcoal/20 uppercase tracking-wider">•</span>
                ) : null}
                {item.availability === "Lab" || item.availability === "Both" ? (
                  <span className="text-[8px] font-bold text-brand-gold-dark uppercase tracking-wider">Lab</span>
                ) : null}
              </div>
            </div>
            
            <div className={`flex items-center gap-1 text-[8px] font-bold text-brand-charcoal/50 ${hasDiscount ? "mr-8 sm:mr-10" : ""}`}>
              <Clock className="h-2.5 w-2.5 text-brand-gold" />
              <span>{item.duration || "24h"}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-semibold tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 pr-6">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] text-brand-charcoal/60 leading-normal line-clamp-2 mt-1 mb-3.5 font-medium">
            {item.description}
          </p>

          {/* Biomarkers Checked list preview for tests */}
          {!isProfile && 'biomarkers' in item && item.biomarkers && item.biomarkers.length > 0 && (
            <div className="mb-4 bg-brand-cream/30 border border-brand-charcoal/5 rounded-xl p-2.5">
              <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/40">Biomarkers Checked</p>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[9px] text-brand-charcoal/70 font-semibold">
                {item.biomarkers.slice(0, 3).map((bio, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-brand-gold">•</span>}
                    <span className="max-w-[100px] truncate">{bio}</span>
                  </React.Fragment>
                ))}
                {item.biomarkers.length > 3 && (
                  <>
                    <span className="text-brand-gold">•</span>
                    <span className="text-brand-emerald text-[8px] font-bold">
                      +{item.biomarkers.length - 3} more
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Included tests list preview for packages */}
          {isProfile && (
            (() => {
              const profile = item as TestProfile;
              const testsList = [
                ...(profile.includedCategories && profile.includedCategories.length > 0
                  ? profile.includedCategories.flatMap(c => c.tests || [])
                  : []),
                ...(profile.includedTests || [])
              ];
              
              if (testsList.length === 0) return null;
              
              return (
                <div className="mb-4 bg-brand-cream/30 border border-brand-charcoal/5 rounded-xl p-2.5">
                  <p className="mb-1 text-[7px] font-bold uppercase tracking-[0.1em] text-brand-charcoal/40">Includes parameters like</p>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[9px] text-brand-charcoal/70 font-semibold">
                    {testsList.slice(0, 3).map((testName, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span className="text-brand-gold">•</span>}
                        <span className="max-w-[100px] truncate">{testName}</span>
                      </React.Fragment>
                    ))}
                    {testsList.length > 3 && (
                      <>
                        <span className="text-brand-gold">•</span>
                        <span className="text-brand-emerald text-[8px] font-bold">
                          +{testsList.length - 3} more
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })()
          )}
        </div>

        {/* Pricing and Actions Row */}
        <div className="mt-auto pt-3 border-t border-brand-charcoal/5">
          <div className="flex flex-col gap-2.5">
            {/* Price Info */}
            <div className="text-left flex items-baseline justify-between w-full border-b border-brand-charcoal/5 pb-1.5">
              <span className="text-[7px] font-bold tracking-[0.15em] text-brand-charcoal/45 uppercase block mb-0.5">Test Price</span>
              <div className="flex items-baseline gap-1">
                {hasDiscount ? (
                  <>
                    <span className="text-xl font-bold text-brand-charcoal font-serif">₹{discountPrice}</span>
                    <span className="text-[10px] text-brand-charcoal/40 line-through font-semibold">₹{originalPrice}</span>
                  </>
                ) : originalPrice ? (
                  <span className="text-xl font-bold text-brand-charcoal font-serif">₹{originalPrice}</span>
                ) : (
                  <span className="text-[10px] font-bold italic text-brand-charcoal/45">On Request</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2.5 w-full">
              <Link
                href={`/tests/${item.slug}`}
                className="text-[9px] font-bold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-emerald transition-colors duration-300 py-1.5 flex items-center gap-1 group/btn"
              >
                Details
                <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
              <a
                href={`https://wa.me/919360933128?text=${encodeURIComponent(bookingMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[9px] font-bold uppercase tracking-widest text-center rounded-lg px-4 py-2 transition duration-300 shadow-sm hover:shadow-md border border-transparent"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Dynamic Filter Deck */}
      <div className="bg-brand-white border border-brand-charcoal/5 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xs space-y-4 lg:space-y-6 mb-6 lg:mb-12 text-left relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-brand-cream rounded-full blur-2xl pointer-events-none opacity-50" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* Search Box with Gold Outline focus */}
          <div className="lg:col-span-8 relative">
            <Search className="absolute left-3.5 lg:left-4.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 lg:h-4.5 lg:w-4.5 text-brand-charcoal/30" />
            <input
              type="text"
              placeholder="Search by test name, description, parameters or biomarkers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3.5 rounded-full border border-brand-charcoal/10 bg-brand-cream/30 text-[11px] lg:text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold/30 focus:ring-1 focus:ring-brand-gold/20 transition-all font-semibold placeholder-brand-charcoal/30 shadow-2xs"
            />
            {/* Mobile search suggestions dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && matchingSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-brand-white border border-brand-charcoal/10 rounded-2xl shadow-lg z-50 overflow-hidden lg:hidden">
                <div className="py-1 divide-y divide-brand-charcoal/5">
                  {matchingSuggestions.map((item) => {
                    const isProfile = item.category === "Test Profiles" || item.category === "Laboratory Packages";
                    return (
                      <Link
                        key={`sugg-${item.category}-${item.id}`}
                        href={`/tests/${item.slug}`}
                        className="flex items-center justify-between px-4 py-3.5 hover:bg-brand-cream/50 transition-colors text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-brand-charcoal truncate">{item.name}</p>
                          <p className="text-[10px] text-brand-charcoal/40 truncate">{item.description}</p>
                        </div>
                        <div className="ml-3 shrink-0 flex items-center gap-1.5">
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isProfile ? 'bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/10' : 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/10'
                          }`}>
                            {isProfile ? "Package" : "Test"}
                          </span>
                          <span className="text-[10px] font-serif font-bold text-brand-charcoal">
                            ₹{item.discountPrice || item.price}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Premium Gold Accent Slide Toggle */}
          <div className="lg:col-span-4 flex items-center justify-between sm:justify-start lg:justify-end gap-3 select-none w-full sm:w-auto">
            <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70">
              Home Sample Collection
            </span>
            <button
              onClick={() => setOnlyHomeCollection(!onlyHomeCollection)}
              className={`relative inline-flex h-5 lg:h-6 w-9 lg:w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                onlyHomeCollection ? 'bg-brand-gold' : 'bg-brand-charcoal/10'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 lg:h-5 w-4 lg:w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
                  onlyHomeCollection ? 'translate-x-4 lg:translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Categories Tab Bar */}
        <div className="border-t border-brand-charcoal/5 pt-4 lg:pt-6 flex overflow-x-auto scrollbar-none whitespace-nowrap gap-2 pb-1.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0">
          {(['All', 'Tests', 'Packages'] as const).map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 lg:px-5 lg:py-2.5 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-brand-emerald text-brand-cream border-transparent shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal/70 border-brand-charcoal/5 hover:border-brand-gold/20 hover:text-brand-charcoal'
                }`}
              >
                {cat === "Packages" ? "Wellness Packages" : cat === "Tests" ? "Standard Tests" : "All Diagnostics"}
              </button>
            );
          })}
        </div>

      </div>

      {filteredItems.length > 0 ? (
        <div className="space-y-12 sm:space-y-16">
          {/* 1. Health Packages Section */}
          {filteredPackages.length > 0 && (
            <div className="space-y-6">
              <div className="text-left border-l-4 border-brand-gold pl-3 py-1">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-brand-charcoal">Popular Health Packages</h2>
                <p className="text-[11px] sm:text-xs text-brand-charcoal/60 mt-0.5">Select from our comprehensively curated health checkup packages.</p>
              </div>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPackages.map((item) => renderCard(item))}
              </div>
            </div>
          )}

          {/* 2. Individual Tests Section */}
          {filteredTests.length > 0 && (
            <div className="space-y-6">
              <div className="text-left border-l-4 border-brand-emerald pl-3 py-1">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-brand-charcoal">Individual Diagnostic Tests</h2>
                <p className="text-[11px] sm:text-xs text-brand-charcoal/60 mt-0.5">Browse individual blood assays, clinical markers, and diagnostic scans.</p>
              </div>
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTests.map((item) => renderCard(item))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 bg-brand-white border border-brand-charcoal/5 rounded-3xl shadow-xs text-center space-y-4 max-w-xl mx-auto">
          <p className="text-sm font-semibold text-brand-charcoal/60">No tests or wellness packages match your query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setOnlyHomeCollection(false);
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-cream border border-brand-charcoal/10 text-brand-charcoal hover:border-brand-emerald/30 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}
