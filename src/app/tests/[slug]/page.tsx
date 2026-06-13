'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Phone, 
  AlertCircle, 
  Home, 
  Building2,
  ChevronDown,
  ChevronUp,
  Box,
  MessageSquare,
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fetchServiceBySlug, fetchTestProfiles } from '@/lib/tests-service';
import { type MedicalTest, type TestProfile } from '@/lib/types';

// Image mapping helper based on local public directory files
function getImageUrl(item: MedicalTest | TestProfile) {
  if (item.image) return item.image;

  const nameLower = item.name.toLowerCase();

  if (nameLower.includes("ct scan") || nameLower.includes("computed tomography")) {
    return "/images/premium_ct_scan.png";
  }
  if (nameLower.includes("sonomammography") || nameLower.includes("breast ultrasound")) {
    return "/images/premium_sonomammography_v2.png";
  }
  if (nameLower.includes("ultrasound") || nameLower.includes("usg") || nameLower.includes("sonography") || nameLower.includes("scan")) {
    return "/images/premium_ultrasound.png";
  }
  if (nameLower.includes("x-ray") || nameLower.includes("xray") || nameLower.includes("radiography")) {
    return "/images/xray.png";
  }
  if (nameLower.includes("eeg") || nameLower.includes("electroencephalogram")) {
    return "/images/premium_eeg.png";
  }
  if (nameLower.includes("ecg") || nameLower.includes("electrocardiogram")) {
    return "/images/ecg.png";
  }
  if (nameLower.includes("echo") || nameLower.includes("echocardiography")) {
    return "/images/echo.png";
  }
  if (nameLower.includes("blood test") || nameLower.includes("blood-test") || nameLower.includes("hemoglobin") || nameLower.includes("cbc")) {
    return "/images/premium_blood_tests.png";
  }
  if (nameLower.includes("urinalysis") || nameLower.includes("urine")) {
    return "/images/premium_urinalysis.png";
  }
  if (nameLower.includes("hormone") || nameLower.includes("thyroid")) {
    return "/images/premium_hormone_testing.png";
  }
  if (nameLower.includes("lipid") || nameLower.includes("cholesterol")) {
    return "/images/premium_lipid_panel.png";
  }

  // Fallback for packages
  if (item.category === "Test Profiles" || nameLower.includes("package") || nameLower.includes("profile") || nameLower.includes("wellness")) {
    return "/images/premium_health_packages.png";
  }

  return "/images/lab.png";
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TestDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  
  const [item, setItem] = useState<MedicalTest | TestProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [relatedPackages, setRelatedPackages] = useState<TestProfile[]>([]);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await fetchServiceBySlug(slug);
        setItem(data);
        
        // Auto-expand first category if it's a profile
        const isPkg = data && (data.category === "Test Profiles" || data.category === "Laboratory Packages");
        if (data && isPkg) {
          const profile = data as TestProfile;
          if (profile.includedCategories && profile.includedCategories.length > 0) {
            setExpandedCategories([profile.includedCategories[0].categoryName]);
          }

          // Fetch related packages
          const allProfiles = await fetchTestProfiles();
          // Filter out current package and pick up to 3
          const related = allProfiles
            .filter(p => p.id !== data.id)
            .slice(0, 3);
          setRelatedPackages(related);
        }
      } catch (err) {
        console.error("Failed to fetch service details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [slug]);

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-cream text-brand-charcoal px-6">
        <Loader2 className="h-10 w-10 animate-spin text-brand-emerald" />
        <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">Fetching Details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center bg-brand-cream min-h-[70vh] flex flex-col items-center justify-center font-sans text-brand-charcoal">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 border border-red-100">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-brand-charcoal">Service Not Found</h2>
        <p className="mt-2 text-xs text-brand-charcoal/60 leading-relaxed font-medium max-w-sm">
          The diagnostic test or health package you are seeking could not be found. It may have been renamed or removed.
        </p>
        <Link 
          href="/tests" 
          className="mt-8 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Catalogue
        </Link>
      </div>
    );
  }

  const isProfile = item.category === "Test Profiles" || item.category === "Laboratory Packages";
  const originalPrice = item.price;
  const discountPrice = item.discountPrice;
  const hasDiscount = !!originalPrice && !!discountPrice && originalPrice > discountPrice;
  const discountPercent = hasDiscount ? Math.round(((originalPrice! - discountPrice!) / originalPrice!) * 100) : 0;

  const bookingMessage = `Hi, I would like to book a slot for: *${item.name}* at Aradhiya Scans & Lab. Please let me know available slots.`;
  const whatsappUrl = `https://wa.me/919360933128?text=${encodeURIComponent(bookingMessage)}`;

  // Default pre-test instruction if none provided
  const requirementsList = item.requirements && item.requirements.length > 0 
    ? item.requirements 
    : ["No special preparation required."];

  return (
    <div className="bg-brand-cream min-h-screen py-10 lg:py-16 font-sans text-brand-charcoal text-left relative overflow-hidden">
      {/* Dynamic luxury glow backdrops */}
      <div className="absolute left-[-5%] top-[10%] w-[35%] h-[35%] rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[5%] bottom-[10%] w-[30%] h-[30%] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Back navigation */}
        <Link 
          href="/tests" 
          className="mb-8 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-emerald transition-colors group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Catalogue
        </Link>

        {/* Immersive Asymmetric Header Block */}
        <div className="grid gap-8 lg:grid-cols-12 items-center mb-10 bg-brand-white border border-brand-charcoal/5 rounded-[3rem] p-6 sm:p-8 relative overflow-hidden shadow-xs">
          {/* Background Glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-brand-gold/5 to-brand-emerald/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Asymmetric Leaf Image Frame */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl border border-brand-charcoal/5 shadow-md group">
            <Image
              src={getImageUrl(item)}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              priority
            />
            {/* Float Badges inside image frame */}
            <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
              <span className="bg-brand-white/95 backdrop-blur-xs text-brand-charcoal border border-brand-charcoal/5 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                {isProfile ? "Screening Package" : "Diagnostic Test"}
              </span>
              {item.availability === "Home" || item.availability === "Both" ? (
                <span className="bg-brand-white/95 backdrop-blur-xs text-brand-emerald border border-brand-emerald/10 text-[9px] font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
                  Home
                </span>
              ) : null}
              {item.availability === "Lab" || item.availability === "Both" ? (
                <span className="bg-brand-white/95 backdrop-blur-xs text-brand-gold-dark border border-brand-gold/10 text-[9px] font-bold px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
                  Lab Visit
                </span>
              ) : null}
            </div>
          </div>

          {/* Right Column: Title and Details Block */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-gold-dark uppercase tracking-widest bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/10">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              Premium Service
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-brand-charcoal leading-tight uppercase">
              {item.name}
            </h1>
            <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed font-medium">
              {item.description}
            </p>
            
            {/* Expected reports & requirements summary row inside header */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-brand-charcoal/5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-charcoal/55">
                <Clock className="h-4 w-4 text-brand-gold" />
                <span>Report: {item.duration || "24 Hours"}</span>
              </div>
              {requirementsList[0] && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-charcoal/55">
                  <ShieldAlert className="h-4 w-4 text-brand-emerald" />
                  <span className="truncate max-w-[150px]" title={requirementsList[0]}>Prep: {requirementsList[0]}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Content Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Main Card Information (Col 8) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Included tests pane for health packages */}
            {isProfile && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/20 shadow-xs">
                    <Box className="h-5 w-5" />
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-semibold text-brand-charcoal">
                    Tests Included in this Package
                  </h2>
                </div>

                {/* Categorized Package Accordions */}
                {'includedCategories' in item && item.includedCategories && item.includedCategories.length > 0 && (
                  <div className="space-y-4">
                    {item.includedCategories.map((cat, idx) => {
                      const isExpanded = expandedCategories.includes(cat.categoryName);
                      return (
                        <div
                          key={idx}
                          className="overflow-hidden rounded-2xl border border-brand-charcoal/5 bg-brand-white shadow-xs transition-all duration-300 hover:border-brand-emerald/10"
                        >
                          {/* Accordion Toggle Trigger Button */}
                          <button
                            type="button"
                            onClick={() => toggleCategory(cat.categoryName)}
                            className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors duration-150 hover:bg-brand-cream cursor-pointer border-none bg-transparent"
                          >
                            <div className="flex items-center flex-wrap gap-2.5">
                              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-emerald" />
                              <span className="font-serif text-base font-semibold text-brand-charcoal">
                                {cat.categoryName}
                              </span>
                              <span className="rounded-full bg-brand-cream text-brand-emerald border border-brand-emerald/10 text-[9px] font-bold px-2.5 py-0.5 whitespace-nowrap">
                                {cat.tests?.length || 0} {cat.tests?.length === 1 ? 'Test' : 'Tests'} Included
                              </span>
                            </div>
                            <div className="text-brand-charcoal/50 shrink-0">
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </button>

                          {/* Accordion Inner Content */}
                          <div
                            className={`transition-all duration-300 ease-in-out ${
                              isExpanded 
                                ? 'max-h-[1000px] opacity-100 border-t border-brand-charcoal/5 p-4 sm:p-5' 
                                : 'max-h-0 opacity-0 overflow-hidden'
                            }`}
                          >
                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                              {cat.tests?.map((testName, testIdx) => (
                                <div
                                  key={testIdx}
                                  className="flex items-center gap-2 rounded-xl border border-brand-charcoal/5 p-3 bg-brand-cream/30 shadow-xs hover:border-brand-emerald/20 transition-colors"
                                >
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-emerald" />
                                  <span className="text-xs font-semibold text-brand-charcoal/80 leading-tight">
                                    {testName}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Flat fallback / additional test listings */}
                {'includedTests' in item && item.includedTests && item.includedTests.length > 0 && (
                  <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                    {'includedCategories' in item && item.includedCategories && item.includedCategories.length > 0 && (
                      <h3 className="font-serif text-sm font-semibold text-brand-charcoal/80">
                        Other Included Tests
                      </h3>
                    )}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {item.includedTests.map((testName, index) => (
                        <div key={index} className="flex items-start gap-2.5 rounded-xl border border-brand-charcoal/5 p-3 bg-brand-cream/30">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-emerald mt-0.5" />
                          <span className="text-xs font-semibold text-brand-charcoal/80 leading-tight">{testName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Biomarkers Checked panel */}
            {!isProfile && 'biomarkers' in item && item.biomarkers && item.biomarkers.length > 0 && (
              <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="font-serif text-lg font-semibold text-brand-charcoal flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-emerald" />
                  Biomarkers Tested ({item.biomarkers.length})
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {item.biomarkers.map((bio, index) => (
                    <div key={index} className="flex items-center gap-2.5 rounded-xl border border-brand-charcoal/5 p-3.5 bg-brand-cream/30 hover:border-brand-emerald/20 transition-colors text-xs font-semibold text-brand-charcoal/80">
                      <span className="h-2 w-2 rounded-full bg-brand-emerald" />
                      {bio}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pre-Test Instructions panel */}
            <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5 text-left">
              <h2 className="font-serif text-lg font-semibold text-brand-charcoal flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-brand-gold" />
                Pre-test Clinical Preparation
              </h2>
              <div className="grid gap-3">
                {requirementsList.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-brand-charcoal/5 p-4 bg-brand-cream/30">
                    <span className="h-5 w-5 rounded-full bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-brand-gold/15">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-brand-charcoal/80 leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pricing & Call-to-action Sidebar Panel (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 bg-brand-white border border-brand-charcoal/5 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold to-brand-emerald" />
              
              <div className="text-left">
                <span className="text-[8px] font-bold tracking-[0.2em] text-brand-charcoal/40 uppercase block mb-1">Pricing & Booking</span>
                
                {/* Price Display */}
                <div className="flex items-baseline flex-wrap gap-2.5">
                  {hasDiscount ? (
                    <>
                      <span className="text-3xl font-bold text-brand-charcoal font-serif">₹{discountPrice}</span>
                      <span className="text-xs text-brand-charcoal/40 line-through font-semibold">₹{originalPrice}</span>
                      <span className="bg-brand-gold/10 text-brand-gold-dark border border-brand-gold/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {discountPercent}% OFF
                      </span>
                    </>
                  ) : originalPrice ? (
                    <span className="text-3xl font-bold text-brand-charcoal font-serif">₹{originalPrice}</span>
                  ) : (
                    <span className="text-xs font-bold italic text-brand-charcoal/40">Price on Request</span>
                  )}
                </div>
              </div>

              <hr className="border-brand-charcoal/5" />

              {/* Call-to-action triggers */}
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[10px] font-bold uppercase tracking-widest text-center rounded-xl py-3.5 block transition duration-300 shadow-sm hover:shadow-md border border-transparent flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" /> Book via WhatsApp
                </a>
                
                <a
                  href="tel:+919360933128"
                  className="w-full border border-brand-charcoal/10 hover:border-brand-emerald/20 hover:bg-brand-cream text-brand-charcoal hover:text-brand-emerald text-[10px] font-bold uppercase tracking-widest text-center rounded-xl py-3.5 block transition duration-300 flex items-center justify-center gap-2 bg-transparent"
                >
                  <Phone className="h-4 w-4" /> Call Diagnostic Center
                </a>
              </div>

              <p className="text-[9px] text-center text-brand-charcoal/50 leading-relaxed font-semibold mt-4 block">
                Home collection slot availability is subject to change. Free doctor consultation on health packages.
              </p>
            </div>
          </div>

        </div>

        {/* Related Packages Section (Only for Packages) */}
        {isProfile && relatedPackages.length > 0 && (
          <div className="mt-16 pt-12 border-t border-brand-charcoal/5 space-y-8 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold-dark bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/10">
                Recommendations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-brand-charcoal mt-3">
                Related Wellness Packages
              </h2>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed font-semibold mt-1">
                Explore other comprehensive health screening panels and preventive wellness catalogs.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((relatedPkg) => {
                const rOriginalPrice = relatedPkg.price;
                const rDiscountPrice = relatedPkg.discountPrice;
                const rHasDiscount = !!rOriginalPrice && !!rDiscountPrice && rOriginalPrice > rDiscountPrice;
                const rDiscountPercent = rHasDiscount ? Math.round(((rOriginalPrice! - rDiscountPrice!) / rOriginalPrice!) * 100) : 0;
                
                const rTestsList = [
                  ...(relatedPkg.includedCategories && relatedPkg.includedCategories.length > 0
                    ? relatedPkg.includedCategories.flatMap(c => c.tests || [])
                    : []),
                  ...(relatedPkg.includedTests || [])
                ];

                const rBookingMessage = `Hi, I would like to book a slot for: *${relatedPkg.name}* at Aradhiya Scans & Lab. Please confirm availability.`;

                return (
                  <div
                    key={relatedPkg.id}
                    className="bg-brand-white border border-brand-charcoal/5 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-2xl rounded-bl-2xl p-6 flex flex-col justify-between h-auto group overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-emerald/20 transition-all duration-500 relative hover:-translate-y-1.5"
                  >
                    {/* Gold Accent Glow */}
                    <div className="absolute right-[-10px] top-[-10px] w-28 h-28 bg-gradient-to-br from-brand-gold/10 to-brand-emerald/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Discount Badge */}
                    {rHasDiscount && (
                      <div className="absolute -top-1 -right-1 h-12 w-12 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-cream text-[9px] font-bold tracking-tight shadow-md transform rotate-12 transition-transform duration-500 group-hover:scale-110 z-10 border border-brand-cream">
                        <span>{rDiscountPercent}%</span>
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
                            {relatedPkg.availability === "Home" || relatedPkg.availability === "Both" ? (
                              <span className="text-[9px] font-bold text-brand-emerald uppercase tracking-wider">Home</span>
                            ) : null}
                            {relatedPkg.availability === "Both" ? (
                              <span className="text-[9px] font-bold text-brand-charcoal/20 uppercase tracking-wider">•</span>
                            ) : null}
                            {relatedPkg.availability === "Lab" || relatedPkg.availability === "Both" ? (
                              <span className="text-[9px] font-bold text-brand-gold-dark uppercase tracking-wider">Lab</span>
                            ) : null}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[9px] font-bold text-brand-charcoal/50">
                          <Clock className="h-3 w-3 text-brand-gold" />
                          <span>{relatedPkg.duration || "24h"}</span>
                        </div>
                      </div>

                      {/* Package Name */}
                      <h3 className="font-serif text-lg font-medium tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 pr-8">
                        {relatedPkg.name}
                      </h3>

                      {/* Package Description */}
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed line-clamp-2 mt-2 mb-5 font-medium">
                        {relatedPkg.description}
                      </p>

                      {/* Included Tests Summary List */}
                      {rTestsList.length > 0 && (
                        <div className="mb-6 bg-brand-cream/30 border border-brand-charcoal/5 rounded-2xl p-4">
                          <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.15em] text-brand-charcoal/40">Includes parameters like</p>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-brand-charcoal/70 font-semibold">
                            {rTestsList.slice(0, 3).map((testName, tagIdx) => (
                              <React.Fragment key={tagIdx}>
                                {tagIdx > 0 && <span className="text-brand-gold">•</span>}
                                <span className="max-w-[120px] truncate">{testName}</span>
                              </React.Fragment>
                            ))}
                            {rTestsList.length > 3 && (
                              <>
                                <span className="text-brand-gold">•</span>
                                <span className="text-brand-emerald text-[9px] font-bold">
                                  +{rTestsList.length - 3} more
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
                            {rHasDiscount ? (
                              <>
                                <span className="text-2xl font-bold text-brand-charcoal font-serif">₹{rDiscountPrice}</span>
                                <span className="text-xs text-brand-charcoal/40 line-through font-semibold">₹{rOriginalPrice}</span>
                              </>
                            ) : rOriginalPrice ? (
                              <span className="text-2xl font-bold text-brand-charcoal font-serif">₹{rOriginalPrice}</span>
                            ) : (
                              <span className="text-xs font-bold italic text-brand-charcoal/45">On Request</span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between gap-3 w-full">
                          <Link
                            href={`/tests/${relatedPkg.slug}`}
                            className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-emerald transition-colors duration-300 py-2.5 flex items-center gap-1 group/btn"
                          >
                            Details
                            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                          <a
                            href={`https://wa.me/919360933128?text=${encodeURIComponent(rBookingMessage)}`}
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
        )}

      </div>
    </div>
  );
}
