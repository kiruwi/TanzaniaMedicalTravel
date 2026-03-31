export const treatments = [
  {
    specialty: 'cardiology',
    slug: 'angioplasty-and-stent-care',
    name: 'Angioplasty and Stent Care',
    summary: 'Structured referral, procedure planning, and aftercare coordination for patients with coronary artery disease.',
    overview: 'Patients receive case review, hospital matching, travel support, and recovery planning around interventional cardiology.',
    priceFrom: 6800,
    duration: '7 to 10 days',
    hospitalSlugs: ['muhimbili-heart-center'],
    doctorSlugs: ['dr-neema-mwakalebela']
  },
  {
    specialty: 'orthopedics',
    slug: 'hip-replacement-program',
    name: 'Hip Replacement Program',
    summary: 'Joint replacement pathways with surgical evaluation, inpatient care, and rehabilitation support.',
    overview: 'Built for patients seeking surgical planning, cost visibility, and accommodation support for orthopedic recovery.',
    priceFrom: 9200,
    duration: '12 to 16 days',
    hospitalSlugs: ['ocean-road-specialist-hospital'],
    doctorSlugs: ['dr-joseph-mkapa']
  },
  {
    specialty: 'ivf',
    slug: 'ivf-cycle-coordination',
    name: 'IVF Cycle Coordination',
    summary: 'End-to-end fertility travel planning with consultations, labs, accommodation, and family support.',
    overview: 'Includes clinic matching, medication guidance, travel windows, and continuity planning after return home.',
    priceFrom: 5400,
    duration: '14 to 21 days',
    hospitalSlugs: ['agakhan-womens-center'],
    doctorSlugs: ['dr-zawadi-katabaro']
  }
]

export const hospitals = [
  {
    slug: 'muhimbili-heart-center',
    name: 'Muhimbili Heart Center',
    city: 'Dar es Salaam',
    country: 'tanzania',
    specialtyFocus: 'Cardiology and cardiothoracic care',
    summary: 'Referral-ready cardiac services with catheterization, diagnostics, and inpatient care.',
    address: 'Upanga West, Dar es Salaam',
    treatmentSlugs: ['angioplasty-and-stent-care']
  },
  {
    slug: 'ocean-road-specialist-hospital',
    name: 'Ocean Road Specialist Hospital',
    city: 'Dar es Salaam',
    country: 'tanzania',
    specialtyFocus: 'Orthopedics and oncology support',
    summary: 'Regional specialist facility with coordinated surgery and rehabilitation pathways.',
    address: 'Ocean Road, Dar es Salaam',
    treatmentSlugs: ['hip-replacement-program']
  },
  {
    slug: 'agakhan-womens-center',
    name: 'Aga Khan Women’s Center',
    city: 'Dar es Salaam',
    country: 'tanzania',
    specialtyFocus: 'Fertility and women’s health',
    summary: 'Private fertility-focused care with structured appointment coordination for international patients.',
    address: 'Msasani Peninsula, Dar es Salaam',
    treatmentSlugs: ['ivf-cycle-coordination']
  }
]

export const doctors = [
  {
    slug: 'dr-neema-mwakalebela',
    name: 'Dr. Neema Mwakalebela',
    title: 'Interventional Cardiologist',
    hospitalSlug: 'muhimbili-heart-center',
    specialty: 'Cardiology',
    summary: 'Focuses on catheter-based interventions and cross-border treatment planning.',
    languages: ['English', 'Swahili']
  },
  {
    slug: 'dr-joseph-mkapa',
    name: 'Dr. Joseph Mkapa',
    title: 'Orthopedic Surgeon',
    hospitalSlug: 'ocean-road-specialist-hospital',
    specialty: 'Orthopedics',
    summary: 'Specializes in complex joint replacement and recovery planning.',
    languages: ['English', 'Swahili']
  },
  {
    slug: 'dr-zawadi-katabaro',
    name: 'Dr. Zawadi Katabaro',
    title: 'Fertility Specialist',
    hospitalSlug: 'agakhan-womens-center',
    specialty: 'Fertility',
    summary: 'Supports IVF planning, monitoring, and post-travel follow-up for couples.',
    languages: ['English', 'Swahili', 'French']
  }
]

export const destinations = [
  {
    country: 'tanzania',
    name: 'Tanzania',
    summary: 'A practical treatment destination with major hospital access in Dar es Salaam and recovery options across the coast.',
    highlights: ['Simplified airport arrival planning', 'Coastal recovery accommodation', 'Swahili and English support']
  },
  {
    country: 'kenya',
    name: 'Kenya',
    summary: 'Useful as a regional recovery and transit option for certain treatment pathways and follow-up schedules.',
    highlights: ['Regional flight connectivity', 'Urban specialist access', 'Recovery-friendly serviced apartments']
  }
]

export const blogPosts = [
  {
    slug: 'how-medical-travel-coordination-works',
    title: 'How Medical Travel Coordination Works Before You Fly',
    excerpt: 'A clear outline of the intake, case review, hospital matching, and travel planning steps patients should expect.',
    publishedAt: '2026-03-10',
    category: 'Planning',
    image: '/images/og-default.svg',
    body: [
      'The intake phase should collect enough detail to prepare a clinically useful referral package without creating friction for the patient.',
      'Once records are reviewed, the coordinator can align treatment options, likely travel windows, estimated costs, and support services.',
      'Strong coordination reduces uncertainty by turning medical, financial, and travel milestones into one visible plan.'
    ]
  },
  {
    slug: 'questions-to-ask-before-choosing-a-hospital',
    title: 'Questions to Ask Before Choosing a Hospital Abroad',
    excerpt: 'A short checklist for evaluating experience, timelines, communication, and recovery support.',
    publishedAt: '2026-02-26',
    category: 'Decision support',
    image: '/images/og-default.svg',
    body: [
      'Ask how the hospital handles international intake, who provides clinical updates, and how follow-up is managed once you return home.',
      'Confirm expected inpatient time, rehabilitation needs, and the likely cost drivers outside the procedure itself.',
      'A good provider match balances specialty capability with practical travel and recovery constraints.'
    ]
  }
]

export const faqs = [
  {
    question: 'How do I request a treatment quote?',
    answer: 'Start with the contact or quote request form. A coordinator reviews your medical summary, records, and travel preferences before preparing options.'
  },
  {
    question: 'Can I upload medical documents securely?',
    answer: 'Yes. The patient portal is designed to support secure document upload and case-linked file management through Supabase storage.'
  },
  {
    question: 'Do you arrange accommodation and airport pickup?',
    answer: 'The booking workflow is intended to cover flights, airport transfers, accommodation, and appointment scheduling once a case is active.'
  }
]

export const testimonials = [
  {
    name: 'Amina R.',
    quote: 'The coordinator kept our hospital communication, accommodation, and appointments aligned from start to finish.',
    location: 'Zanzibar'
  },
  {
    name: 'Daniel M.',
    quote: 'What mattered most was the visibility. We knew what documents were needed, what it would cost, and who was responsible.',
    location: 'Nairobi'
  }
]
