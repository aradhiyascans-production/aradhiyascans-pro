'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Calendar,
  User,
  FileText,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import SEO from '@/components/SEO';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    testType: 'routine-blood',
    date: '',
    time: 'morning',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    date: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: '', phone: '', date: '' };

    if (!formData.name.trim()) {
      errors.name = 'Patient name is required.';
      valid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Contact phone number is required.';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-+]/g, '').slice(-10))) {
      errors.phone = 'Please enter a valid 10-digit number.';
      valid = false;
    }
    if (!formData.date) {
      errors.date = 'Preferred appointment date is required.';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Compile prefilled WhatsApp text parameters
    const testLabels: { [key: string]: string } = {
      'routine-blood': 'Routine Blood / Pathology Test',
      'ct-scan': 'Computed Tomography (CT Scan)',
      'digital-xray': 'Digital Radiography (X-Ray)',
      'echocardiography': 'Echocardiography (Eco)',
      'sonomammography': 'Sonomammography Breast Scan',
      'health-package': 'Preventive Health Package',
      'custom-panel': 'Other / Custom Panel'
    };

    const selectedTest = testLabels[formData.testType] || formData.testType;
    const timeLabel = formData.time === 'morning' ? 'Morning (07:00 AM - 12:00 PM)' : 'Afternoon/Evening (12:00 PM - 09:00 PM)';

    const text = encodeURIComponent(
      `Hello Aradhiya Scans & Lab, Chidambaram.\n\n` +
      `I would like to book a diagnostic appointment:\n` +
      `• *Patient Name:* ${formData.name}\n` +
      `• *Contact Phone:* ${formData.phone}\n` +
      `• *Diagnostic Test:* ${selectedTest}\n` +
      `• *Preferred Date:* ${formData.date}\n` +
      `• *Preferred Time:* ${timeLabel}\n` +
      `• *Additional Notes:* ${formData.message || 'None'}\n\n` +
      `Please coordinate the slot confirmation.`
    );

    const phoneNumber = '919360933128'; // Primary Aradhiya Scans Chidambaram contact line
    
    // Trigger successful animation state
    setIsSuccess(true);
    
    // Open WhatsApp prefill route in a new tab
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
      setIsSuccess(false);
    }, 1200);
  };

  return (
    <>
      <SEO />
      <div className="bg-brand-cream min-h-screen py-12 lg:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          
          {/* Header Block */}
          <div className="max-w-3xl text-left space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold">Appointment Desk</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-brand-charcoal">
              Coordinate Your Visit
            </h1>
            <p className="font-sans text-sm sm:text-base text-brand-charcoal/70 leading-relaxed">
              Use our quick interactive booking form to send an enquiry directly to our WhatsApp registry line, or visit our central clinical facility in Chidambaram.
            </p>
          </div>

          {/* SPLIT SCREEN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT COLUMN: INFO & MAP */}
            <div className="lg:col-span-5 bg-brand-white rounded-3xl border border-brand-charcoal/5 p-8 lg:p-10 shadow-sm flex flex-col justify-between space-y-8 text-left">
              
              {/* Contact Info blocks */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-medium text-brand-charcoal">Registry Details</h3>
                <ul className="space-y-4 text-xs sm:text-sm text-brand-charcoal/70">
                  <li className="flex items-start gap-x-3">
                    <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      *Aradhiya Scans & Lab*
                      <br />
                      39B, Theradi Kovil Street,
                      <br />
                      (Opp.) Venus Matriculation School,
                      <br />
                      Chidambaram - 608001, Tamil Nadu, India
                    </span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <Phone className="h-5 w-5 text-brand-emerald shrink-0" />
                    <a href="tel:+919360933128" className="hover:text-brand-emerald-dark font-medium transition-colors">
                      +91 93609 33128
                    </a>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <Mail className="h-5 w-5 text-brand-emerald shrink-0" />
                    <a href="mailto:info@aradhiyascans.com" className="hover:text-brand-emerald-dark font-medium transition-colors">
                      info@aradhiyascans.com
                    </a>
                  </li>
                  <li className="flex items-start gap-x-3">
                    <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      *Clinical Schedule:*
                      <br />
                      Mon - Sat: 07:00 AM - 09:00 PM
                      <br />
                      Sunday: 07:00 AM - 02:00 PM
                    </span>
                  </li>
                </ul>
              </div>

              {/* Styled Maps Embed */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-brand-charcoal/5 relative shadow-inner">
                {/* Embed pointer to Aradhiya Scans Google Maps Coordinate (Venugopal St, Chidambaram) */}
                <iframe
                  title="Aradhiya Scans & Lab location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.893874312151!2d79.69248467479705!3d11.397395087711202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54c25f4625b597%3A0xe54d9f67a6d8881e!2sAaradhya%20Scans%20%26%20Lab!5e0!3m2!1sen!2sin!4v1717900000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-750"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="https://maps.app.goo.gl/R6cBXenQDGwkfo1R6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-brand-cream border border-brand-charcoal/5 hover:border-brand-emerald/20 text-[10px] font-bold uppercase tracking-wider text-brand-charcoal transition-colors flex items-center gap-x-2"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-emerald" />
                  Get Directions in Google Maps
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: WHATSAPP APPOINTMENT FORM */}
            <div className="lg:col-span-7 bg-brand-white rounded-3xl border border-brand-charcoal/5 p-8 lg:p-10 shadow-sm text-left flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-medium text-brand-charcoal">Request Booking</h3>
                  <p className="font-sans text-xs text-brand-charcoal/50">
                    Submit the details below to open a pre-filled booking verification text direct on WhatsApp.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60">
                        Patient Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-charcoal/30" />
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="e.g., Sundaram Balaji"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 text-xs bg-brand-cream rounded-xl border focus:outline-none transition-all ${
                            formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-brand-charcoal/5 focus:border-brand-emerald/30'
                          }`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-[10px] text-red-500 flex items-center gap-x-1 mt-0.5">
                          <AlertCircle className="h-3 w-3" /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60">
                        Mobile Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-charcoal/30" />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="e.g., 9876543210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 text-xs bg-brand-cream rounded-xl border focus:outline-none transition-all ${
                            formErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-brand-charcoal/5 focus:border-brand-emerald/30'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-[10px] text-red-500 flex items-center gap-x-1 mt-0.5">
                          <AlertCircle className="h-3 w-3" /> {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Diagnostic Category */}
                  <div className="space-y-1">
                    <label htmlFor="testType" className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60">
                      Required Diagnostics Category
                    </label>
                    <select
                      id="testType"
                      name="testType"
                      value={formData.testType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-xs bg-brand-cream rounded-xl border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-brand-charcoal cursor-pointer"
                    >
                      <option value="routine-blood">Routine Blood / Pathology Test</option>
                      <option value="ct-scan">Computed Tomography (CT Scan)</option>
                      <option value="digital-xray">Digital Radiography (X-Ray)</option>
                      <option value="echocardiography">Echocardiography (Eco)</option>
                      <option value="sonomammography">Sonomammography Breast Scan</option>
                      <option value="health-package">Preventive Health Package</option>
                      <option value="custom-panel">Other / Custom Panel</option>
                    </select>
                  </div>

                  {/* Row 3: Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="date" className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-charcoal/30 pointer-events-none" />
                        <input
                          id="date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 text-xs bg-brand-cream rounded-xl border focus:outline-none transition-all cursor-pointer ${
                            formErrors.date ? 'border-red-500 focus:border-red-500' : 'border-brand-charcoal/5 focus:border-brand-emerald/30'
                          }`}
                        />
                      </div>
                      {formErrors.date && (
                        <p className="text-[10px] text-red-500 flex items-center gap-x-1 mt-0.5">
                          <AlertCircle className="h-3 w-3" /> {formErrors.date}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="time" className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60">
                        Time Slot Preferences
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-xs bg-brand-cream rounded-xl border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 text-brand-charcoal cursor-pointer"
                      >
                        <option value="morning">Morning (07:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon/Evening (12:00 PM - 09:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Custom Message */}
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/60">
                      Additional Notes or Inquiries
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-4 h-4 w-4 text-brand-charcoal/30" />
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="List symptoms, previous scans, or custom test parameters here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 text-xs bg-brand-cream rounded-xl border border-brand-charcoal/5 focus:outline-none focus:border-brand-emerald/30 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-cream bg-[#25D366] hover:bg-[#20ba5a] shadow-md hover:shadow-lg transition-all duration-350 flex items-center justify-center gap-x-2 cursor-pointer mt-4"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    Open & Book on WhatsApp
                  </button>
                </form>
              </div>

              {/* Status messages */}
              {isSuccess && (
                <div className="mt-4 p-4 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/10 text-brand-emerald text-xs flex items-center gap-x-2 animate-pulse justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Redirecting to WhatsApp to send prefilled parameters...</span>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
