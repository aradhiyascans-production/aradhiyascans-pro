'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { servicesData } from '@/data/servicesData';

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { id } = use(params);
  
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center bg-brand-cream min-h-[70vh] flex flex-col items-center justify-center font-sans text-brand-charcoal">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 border border-red-100">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-6 font-serif text-2xl font-semibold text-brand-charcoal">Service Not Found</h2>
        <p className="mt-2 text-xs text-brand-charcoal/60 leading-relaxed font-medium max-w-sm">
          The diagnostic service you are looking for could not be found. It may have been renamed or relocated.
        </p>
        <Link 
          href="/services" 
          className="mt-8 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const relatedServices = servicesData
    .filter((s) => s.id !== id)
    .sort((a, b) => {
      if (a.category === service.category && b.category !== service.category) return -1;
      if (b.category === service.category && a.category !== service.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const bookingMessage = `Hi, I would like to book a slot for: *${service.name}* at Aradhiya Scans & Lab. Please let me know available slots.`;
  const whatsappUrl = `https://wa.me/919360933128?text=${encodeURIComponent(bookingMessage)}`;


  return (
    <div className="bg-brand-cream min-h-screen py-10 lg:py-16 font-sans text-brand-charcoal text-left relative overflow-hidden">
      {/* Dynamic luxury glow backdrops */}
      <div className="absolute left-[-5%] top-[10%] w-[35%] h-[35%] rounded-full bg-brand-emerald/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[5%] bottom-[10%] w-[30%] h-[30%] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Back navigation */}
        <Link 
          href="/services" 
          className="mb-8 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-emerald transition-colors group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to Services
        </Link>

        {/* Details Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Main Card Information (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-brand-charcoal/5 bg-brand-white shadow-xs">
              
              {/* Premium Hero Banner Image */}
              {serviceImages[service.id] && (
                <div className="relative aspect-[21/9] w-full bg-brand-cream/30 overflow-hidden border-b border-brand-charcoal/5">
                  <Image
                    src={serviceImages[service.id]}
                    alt={service.name}
                    fill
                    sizes="(max-w-1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.01]"
                    priority
                  />
                  
                  {/* Float Category Badge */}
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-brand-white text-brand-charcoal border border-brand-charcoal/5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm">
                      {service.category === 'imaging' ? 'Imaging Scan' :
                       service.category === 'cardiac' ? 'Cardiac Trace' :
                       'Pathology Lab'}
                    </span>
                  </div>
                </div>
              )}

              {/* Title & Description */}
              <div className="p-6 sm:p-8 space-y-4">
                <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-brand-charcoal uppercase leading-tight">
                  {service.name}
                </h1>
                <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                  {service.overview}
                </p>
              </div>

            </div>

            {/* Split grid: Who requires & Clinical benefits */}
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              
              <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 shadow-xs space-y-3">
                <h4 className="font-serif text-base font-semibold text-brand-charcoal flex items-center gap-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-emerald shrink-0" />
                  Who Requires This
                </h4>
                <ul className="space-y-2 text-xs text-brand-charcoal/70 leading-relaxed list-disc pl-4 font-semibold">
                  {service.whoNeedsIt.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 shadow-xs space-y-3">
                <h4 className="font-serif text-base font-semibold text-brand-charcoal flex items-center gap-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-emerald shrink-0" />
                  Clinical Benefits
                </h4>
                <ul className="space-y-2 text-xs text-brand-charcoal/70 leading-relaxed list-disc pl-4 font-semibold">
                  {service.benefits.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Preparation Guidelines panel */}
            <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-semibold text-brand-charcoal flex items-center gap-x-2">
                <AlertCircle className="h-5 w-5 text-brand-gold shrink-0" />
                Preparation Guidelines
              </h2>
              <ul className="list-decimal pl-5 space-y-2.5 text-xs text-brand-charcoal/70 leading-relaxed font-semibold">
                {service.prepGuidelines.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Walkthrough Timeline */}
            <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-semibold text-brand-charcoal flex items-center gap-x-2">
                <Clock className="h-5 w-5 text-brand-emerald shrink-0" />
                Procedure Walkthrough
              </h2>
              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-brand-emerald/10">
                {service.procedure.map((step, idx) => (
                  <div key={idx} className="flex gap-x-3 text-xs text-brand-charcoal/70 leading-relaxed pl-6 relative before:absolute before:left-1.5 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-emerald font-semibold">
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="font-serif text-lg font-semibold text-brand-charcoal flex items-center gap-x-2">
                  <HelpCircle className="h-5 w-5 text-brand-gold shrink-0" />
                  Common Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="space-y-1.5 text-left">
                      <h5 className="font-serif text-sm font-semibold text-brand-charcoal">
                        {faq.question}
                      </h5>
                      <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed font-semibold">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pricing & Call-to-action Sidebar Panel (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-24 bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="text-left space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 block">Booking Desk</span>
                <h3 className="font-serif text-lg font-semibold text-brand-charcoal leading-snug">
                  Schedule Your Appointment
                </h3>
                <p className="text-xs text-brand-charcoal/65 leading-relaxed font-semibold">
                  Get in touch with our clinical receptionists via WhatsApp or phone registry to schedule your scan.
                </p>
              </div>

              <hr className="border-brand-charcoal/5" />

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-cream bg-brand-emerald hover:bg-brand-emerald-dark transition flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs border-none cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" /> Book via WhatsApp
                </a>
                
                <Link
                  href={`/tests?query=${encodeURIComponent(service.name)}`}
                  className="w-full h-11 border border-brand-charcoal/10 hover:border-brand-emerald/20 hover:bg-brand-cream text-brand-charcoal hover:text-brand-emerald rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition duration-300 cursor-pointer bg-transparent"
                >
                  Check Test Pricing <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <p className="text-[9px] text-center text-brand-charcoal/50 leading-relaxed font-semibold mt-6 block">
                Appointment hours are subject to slot availability. Free physician reference advice available on request.
              </p>
            </div>
          </div>

        </div>

        {/* Related Services Section */}
        {relatedServices.length > 0 && (
          <div className="mt-16 pt-12 border-t border-brand-charcoal/5 space-y-8 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold-dark bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/10">
                Recommendations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-brand-charcoal mt-3">
                Related Diagnostic Services
              </h2>
              <p className="text-xs text-brand-charcoal/60 leading-relaxed font-semibold mt-1">
                Explore other professional diagnostic scans and specialized lab test capabilities.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((relatedService) => {
                const rBookingMessage = `Hi, I would like to book a slot for: *${relatedService.name}* at Aradhiya Scans & Lab. Please confirm availability.`;

                return (
                  <div
                    key={relatedService.id}
                    className="bg-brand-white border border-brand-charcoal/5 rounded-3xl p-6 flex flex-col justify-between h-auto group overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-emerald/20 transition-all duration-500 relative hover:-translate-y-1.5"
                  >
                    {/* Gold Accent Glow */}
                    <div className="absolute right-[-10px] top-[-10px] w-28 h-28 bg-gradient-to-br from-brand-gold/10 to-brand-emerald/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-3 mb-4 border-b border-brand-charcoal/5 pb-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                          {relatedService.category === 'imaging' ? 'Imaging' :
                           relatedService.category === 'cardiac' ? 'Cardiac' :
                           'Pathology Lab'}
                        </span>
                      </div>

                      {/* Service Name */}
                      <h3 className="font-serif text-lg font-medium tracking-tight text-brand-charcoal group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 pr-4">
                        {relatedService.name}
                      </h3>

                      {/* Service Description */}
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed line-clamp-3 mt-2 mb-4 font-medium">
                        {relatedService.shortDescription}
                      </p>

                      {/* Service Clinical Image */}
                      {serviceImages[relatedService.id] && (
                        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-brand-charcoal/5 bg-brand-cream mb-4">
                          <Image
                            src={serviceImages[relatedService.id]}
                            alt={relatedService.name}
                            fill
                            sizes="(max-w-7xl) 33vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="mt-auto pt-4 border-t border-brand-charcoal/5">
                      <div className="grid grid-cols-2 gap-3 items-center">
                        <Link
                          href={`/services/${relatedService.id}`}
                          className="w-full border border-brand-charcoal/10 hover:bg-brand-cream hover:text-brand-emerald text-brand-charcoal text-[10px] font-bold uppercase tracking-wider text-center rounded-full py-3 block transition duration-300"
                        >
                          View Detail
                        </Link>
                        <a
                          href={`https://wa.me/919360933128?text=${encodeURIComponent(rBookingMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand-emerald hover:bg-brand-emerald-dark text-brand-cream text-[10px] font-bold uppercase tracking-wider text-center rounded-full py-3 block transition duration-300 shadow-2xs hover:shadow-sm border border-transparent flex items-center justify-center gap-1.5"
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
        )}

      </div>
    </div>
  );
}

