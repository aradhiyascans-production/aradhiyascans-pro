import React from 'react';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { getCachedTests, getCachedTestProfiles } from '@/lib/cached-tests';
import TestsCatalogClient from '@/components/TestsCatalogClient';
import { type MedicalTest, type TestProfile } from '@/lib/types';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: "Health Packages & Diagnostic Tests Catalog | Aradhiya Lab",
  description: "Search individual laboratory blood assays, clinical markers, and health screening packages in Chidambaram. View pricing and preparation instructions.",
  alternates: {
    canonical: "/tests"
  }
};

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function TestsCatalogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearchQuery = resolvedSearchParams.query || '';

  let tests: MedicalTest[] = [];
  let profiles: TestProfile[] = [];

  try {
    tests = await getCachedTests();
    profiles = await getCachedTestProfiles();
  } catch (err) {
    console.error("Failed to load catalog data on server:", err);
  }

  return (
    <>
      <SEO />
      <div className="bg-brand-cream min-h-screen py-12 lg:py-20 font-sans text-brand-charcoal relative overflow-hidden">
        {/* Background glow effects for premium editorial aesthetic */}
        <div className="absolute left-[-10%] top-[5%] w-[45%] h-[45%] rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />
        <div className="absolute right-[-10%] top-[25%] w-[40%] h-[40%] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Luxury Heading block */}
          <div className="max-w-3xl text-left mb-6 lg:mb-16 space-y-3 lg:space-y-4">
            <div className="inline-flex items-center gap-x-2 px-2.5 py-1 rounded-full border border-brand-emerald/10 bg-brand-emerald/5 text-[9px] lg:text-[10px] font-bold tracking-widest text-brand-emerald uppercase shadow-xs">
              <Sparkles className="h-2.5 w-2.5 text-brand-gold" />
              Aradhiya Directory
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-brand-charcoal leading-none">
              Clinical Diagnostic <span className="bg-gradient-to-r from-brand-emerald to-brand-emerald-dark bg-clip-text text-transparent font-normal animate-pulse-slow">Catalog</span> <br className="hidden sm:inline" />
              & Wellness <span className="font-serif italic font-normal text-brand-gold-dark">Packages.</span>
            </h1>
            <p className="text-[10px] sm:text-sm text-brand-charcoal/70 leading-relaxed max-w-xl font-medium">
              Search, filter, and schedule expert scans, cardiac trace readings, and automated lab pathology panels with direct home sample collections.
            </p>
          </div>

          <TestsCatalogClient 
            tests={tests} 
            profiles={profiles} 
            initialSearchQuery={initialSearchQuery} 
          />

        </div>
      </div>
    </>
  );
}
