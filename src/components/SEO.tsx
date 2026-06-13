import React from 'react';

export default function SEO() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    'name': 'Aradhiya Scans & Lab',
    'alternateName': 'Aradhiya Scans and Diagnostics',
    'description': 'Premium diagnostic center in Chidambaram, Tamil Nadu offering high-resolution CT Scan, Digital X-Ray, Echocardiography, ECG, and fully automated pathology laboratory tests.',
    'url': 'https://aradhiyascans.com',
    'logo': 'https://aradhiyascans.com/logo.png',
    'image': 'https://aradhiyascans.com/hero-preview.jpg',
    'telephone': '+919360933128',
    'email': 'info@aradhiyascans.com',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '39B, Theradi Kovil Street, (Opp.) Venus Matriculation School',
      'addressLocality': 'Chidambaram',
      'addressRegion': 'Tamil Nadu',
      'postalCode': '608001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '11.3984', // Standard latitude coordinates for Venugopal St, Chidambaram
      'longitude': '79.6954' // Standard longitude
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '07:00',
        'closes': '21:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '07:00',
        'closes': '14:00'
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Diagnostic Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalProcedure',
            'name': 'Computed Tomography (CT Scan)',
            'description': 'Advanced multi-slice computed tomography scans'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalProcedure',
            'name': 'Digital Radiography (X-Ray)',
            'description': 'High-resolution digital X-Rays with low radiation dose'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalProcedure',
            'name': 'Echocardiography (Eco)',
            'description': 'Cardiovascular ultrasound scans'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'MedicalTest',
            'name': 'Pathology Laboratory Testing',
            'description': 'Comprehensive blood assays, lipid panels, thyroid markers, and biochemistry'
          }
        }
      ]
    },
    'sameAs': [
      'https://maps.app.goo.gl/R6cBXenQDGwkfo1R6'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
