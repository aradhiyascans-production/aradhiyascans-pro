export interface ServiceDetail {
  id: string;
  name: string;
  category: 'imaging' | 'cardiac' | 'laboratory';
  shortDescription: string;
  overview: string;
  whoNeedsIt: string[];
  prepGuidelines: string[];
  procedure: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'ultrasound',
    name: 'Ultrasound Scan',
    category: 'imaging',
    shortDescription: 'Non-invasive high-frequency sound wave diagnostic mapping internal organs, abdominal structures, and obstetric growth.',
    overview: 'Ultrasound imaging (sonography) uses high-frequency sound waves to capture real-time images of the inside of your body. It is completely safe, does not use ionizing radiation, and is widely used to evaluate abdominal organs, monitor fetal development during pregnancy, check blood vessels, and guide minimally-invasive diagnostic procedures.',
    whoNeedsIt: [
      'Pregnant individuals requiring routine fetal growth and safety monitoring',
      'Patients experiencing abdominal or pelvic pain, swelling, or digestive issues',
      'Individuals requiring evaluation of thyroid glands, gallstones, or liver status',
      'Patients needing blood flow dynamics checked via Doppler ultrasound'
    ],
    prepGuidelines: [
      'For abdominal scans, fast for 6 to 8 hours prior to the scan (no food or fatty liquids).',
      'For pelvic and obstetric scans, drink 32 ounces of water 1 hour before the exam and do not empty your bladder.',
      'Wear comfortable, two-piece loose clothing for easy access to the skin.'
    ],
    procedure: [
      'You will lie on a clean examination table, exposing the area of study.',
      'A clear, warm water-soluble gel is applied to the skin, helping the transducer waves transmit without air pockets.',
      'The certified sonographer slides the transducer probe across your skin to capture dynamic real-time frames.',
      'The procedure is completely painless, silent, and takes around 20 to 30 minutes.'
    ],
    benefits: [
      'Zero radiation exposure, making it completely safe for pregnant mothers and children',
      'Dynamic, real-time imaging showing moving structures like heartbeats or blood flow',
      'Completely painless and non-invasive diagnostic method',
      'Highly effective at detailing soft tissues that do not show up well on standard X-rays'
    ],
    faqs: [
      {
        question: 'Is ultrasound safe during pregnancy?',
        answer: 'Yes, diagnostic ultrasound has been used for decades with no known harmful side effects. It uses gentle sound waves rather than ionizing radiation (X-rays).'
      },
      {
        question: 'Why do I need a full bladder for a pelvic scan?',
        answer: 'A full bladder pushes your intestines out of the pelvic area and acts as a clear visual window, allowing sound waves to transmit easily to display the uterus and ovaries.'
      }
    ]
  },
  {
    id: 'ct-scan',
    name: 'CT Scan',
    category: 'imaging',
    shortDescription: 'Advanced multi-slice computed tomography offering high-resolution cross-sectional details of internal body structures.',
    overview: 'Computed Tomography (CT) scans combine a series of X-ray images taken from different angles around your body and use computer processing to create cross-sectional images (slices) of the bones, blood vessels, and soft tissues. This technology provides far more detailed information than normal X-rays, making it essential for complex diagnostic workflows.',
    whoNeedsIt: [
      'Patients showing symptoms of internal injury or trauma',
      'Individuals requiring detailed bone and joint scanning',
      'Physicians needing precise tumor localized tracking and staging',
      'Patients undergoing evaluation for cardiovascular blockages or circulatory conditions'
    ],
    prepGuidelines: [
      'Wear loose, comfortable clothing. You may be asked to change into a surgical gown.',
      'Remove all metal objects, including jewelry, hairpins, and eyeglasses, as they interfere with the scan.',
      'If your scan requires contrast material, fast for 4 to 6 hours prior to the scan.',
      'Inform our technicians if you are pregnant, suspect you might be, or have history of kidney disease or contrast allergies.'
    ],
    procedure: [
      'You will lie down on a motorized examination table that slides through a circular scanner opening.',
      'For contrast CTs, an intravenous line (IV) will be placed to administer the contrast dye.',
      'During the scan, the table moves slowly, and the CT scanner rotates around you to capture slices.',
      'The technologist will monitor you from an adjacent control room; you can communicate through an intercom.',
      'You will be asked to hold your breath for a few seconds to prevent image blurring.'
    ],
    benefits: [
      'Extremely rapid scanning time, essential for trauma and emergency diagnoses',
      'High-contrast detail displaying bone, soft tissue, and blood vessels simultaneously',
      'Non-invasive diagnostic alternative to exploratory surgeries',
      'Highly accurate guidance tool for needle biopsies and surgical planning'
    ],
    faqs: [
      {
        question: 'What does the contrast material do?',
        answer: 'Contrast material highlights specific areas of your body, making blood vessels, intestines, and organs easier to see in the scan images. It helps radiologists distinguish normal tissue from abnormalities.'
      },
      {
        question: 'Is a CT scan painful?',
        answer: 'The scan itself is completely painless. You may feel a brief warm sensation if contrast dye is injected, or mild discomfort from lying still on the examination table.'
      }
    ]
  },
  {
    id: 'digital-x-ray',
    name: 'Digital X-Ray',
    category: 'imaging',
    shortDescription: 'Low-dose, high-speed digital radiography providing immediate, crystal-clear skeletal and respiratory imaging.',
    overview: 'Digital radiography is an advanced form of X-ray inspection which produces a digital radiographic image instantly on a computer. This technique uses digital X-ray sensors instead of traditional photographic film, resulting in significantly lower radiation exposure and immediate image availability for diagnostic evaluation.',
    whoNeedsIt: [
      'Individuals suspected of having bone fractures, dislocations, or joint pathology',
      'Patients requiring chest evaluation for pneumonia, tuberculosis, or persistent coughs',
      'Dentistry and spinal checks for structural alignment',
      'Routine pre-operative health checks'
    ],
    prepGuidelines: [
      'No fasting is required for standard digital X-rays.',
      'Remove jewelry, metal zippers, hooks, or buttons in the area of the scan.',
      'Always notify the technologist if there is any possibility of pregnancy.'
    ],
    procedure: [
      'You will be positioned by the technologist against a digital detector plate.',
      'Lead shields or aprons may be placed over your body to protect non-targeted areas from exposure.',
      'You must remain completely still and hold your breath for a split second when the image is captured.',
      'Multiple views (such as front and side) may be taken depending on your physician\'s instructions.'
    ],
    benefits: [
      'Up to 80% less radiation exposure compared to old traditional film X-rays',
      'Instant image processing reducing patient waiting times significantly',
      'Enhanced digital resolution allowing radiologists to zoom and adjust contrast for perfect accuracy',
      'Environmentally friendly process with zero chemical developer waste'
    ],
    faqs: [
      {
        question: 'How safe is a digital X-ray?',
        answer: 'Digital X-rays use extremely low levels of radiation, and because the sensors are highly sensitive, the exposure time is incredibly brief. It is considered highly safe for diagnostic use.'
      }
    ]
  },
  {
    id: 'sonomammography',
    name: 'Sonomammography',
    category: 'imaging',
    shortDescription: 'High-frequency ultrasound imaging designed for detailed breast tissue assessment and early anomaly detection.',
    overview: 'Sonomammography, or breast ultrasound, is a non-invasive diagnostic technique used to screen for breast abnormalities. It utilizes sound waves to create detailed images of the internal structure of the breast. It is highly effective at determining whether a lump is solid (possibly a non-cancerous fibroadenoma or cancer) or fluid-filled (a benign cyst).',
    whoNeedsIt: [
      'Women with dense breast tissue where standard mammograms have lower clarity',
      'Individuals with a palpable breast lump discovered during clinical examinations',
      'Pregnant women needing breast imaging without exposure to radiation',
      'Follow-up evaluation on ambiguous findings from a mammogram'
    ],
    prepGuidelines: [
      'Do not apply deodorants, perfumes, powders, or lotions under your arms or on your breasts on the day of the exam.',
      'Wear a two-piece outfit to make undressing from the waist up comfortable.'
    ],
    procedure: [
      'You will lie down on an examination table, usually on your back with your arm raised above your head.',
      'A warm, water-soluble gel is applied to the breast area to help the transducer make secure contact.',
      'The sonographer gently moves the transducer back and forth over your breast tissue.',
      'The entire procedure is painless and usually completed in 20 to 30 minutes.'
    ],
    benefits: [
      'No exposure to ionizing radiation, making it safe for pregnant and nursing mothers',
      'Excellent differentiation between fluid-filled cysts and solid masses',
      'Dynamic real-time imaging that can guide needle biopsies if necessary',
      'More comfortable and pain-free compared to compression-based mammograms'
    ],
    faqs: [
      {
        question: 'Does sonomammography replace a regular mammogram?',
        answer: 'It is typically used as a complementary scan alongside a screening mammogram rather than a replacement. It helps clarify ambiguous areas, especially in dense breasts.'
      }
    ]
  },
  {
    id: 'ecg',
    name: 'ECG (Electrocardiogram)',
    category: 'cardiac',
    shortDescription: 'Rapid electrical cardiac tracing to assess heart rhythm, detect abnormalities, and identify ischemic changes.',
    overview: 'An Electrocardiogram (ECG or EKG) is a quick, simple test that records the electrical signals in your heart. Each beat of your heart is triggered by an electrical impulse. An ECG captures these signals to help physicians evaluate the heart\'s rhythm, structure, and general health.',
    whoNeedsIt: [
      'Patients experiencing chest pain, palpitations, rapid pulse, or shortness of breath',
      'Individuals with family history of cardiovascular disease or sudden cardiac events',
      'Patients preparing for general surgery or starting new cardiac medications',
      'Individuals undergoing routine physical evaluations'
    ],
    prepGuidelines: [
      'Avoid applying heavy skin creams or lotions on your chest before the test.',
      'Wear clothing that allows easy access to your chest, wrists, and ankles.',
      'Inform the technician of any medications, vitamins, or supplements you take.'
    ],
    procedure: [
      'You will lie flat on your back on a examination table.',
      'Small, adhesive patches called electrodes are attached to your chest, arms, and legs.',
      'The electrodes are connected by wires to the ECG machine, which records your heart\'s activity.',
      'You must lie completely still and breathe normally for about 1 to 2 minutes while the tracing runs.'
    ],
    benefits: [
      'Instantaneous results enabling quick diagnosis of acute cardiac events like heart attacks',
      'Completely non-invasive with zero radiation or electrical currents passing into your body',
      'Low cost and widely accessible for baseline cardiac health checks'
    ],
    faqs: [
      {
        question: 'Are there any risks associated with an ECG?',
        answer: 'None at all. The machine only records the electrical signals from your body. You will not feel any electrical current. The only minor discomfort might be when peeling off the sticky electrodes.'
      }
    ]
  },
  {
    id: 'echocardiography',
    name: 'Echocardiography (Eco)',
    category: 'cardiac',
    shortDescription: 'Advanced cardiac ultrasound offering real-time imaging of heart valves, chambers, and blood flow dynamics.',
    overview: 'An Echocardiogram is an ultrasound of the heart that provides detailed 2D and 3D moving pictures of your heart valves, muscular walls, and chamber sizes. Using Doppler technology, it also measures the speed and direction of blood flow through the heart, helping identify valve leaks or constriction.',
    whoNeedsIt: [
      'Patients diagnosed with a heart murmur or unexplained heart failure',
      'Individuals suffering from unexplained fatigue, swelling in lower limbs, or fainting',
      'Patients recovering from a heart attack to monitor muscle wall damage',
      'Individuals with suspected congenital heart defects'
    ],
    prepGuidelines: [
      'No special food or drink restrictions are necessary for a standard transthoracic echocardiogram.',
      'Wear a comfortable shirt that can be unbuttoned or slipped off easily.'
    ],
    procedure: [
      'You will lie on your left side on an exam table.',
      'Gel is applied to your chest to assist transducer wave transmission.',
      'The cardiac sonographer will press the transducer firmly against your skin, moving it to capture different angles of the heart.',
      'You may hear a "whooshing" sound during the test, which is the sound of the Doppler tracking blood flow.'
    ],
    benefits: [
      'Detailed visualization of the heart in motion without radiation exposure',
      'Precise calculation of ejection fraction (the heart\'s pumping efficiency)',
      'Accurate evaluation of structural valve issues, helping determine if surgical intervention is needed'
    ],
    faqs: [
      {
        question: 'How long does an echocardiogram take?',
        answer: 'A standard study takes between 30 and 45 minutes to complete. The images are then reviewed by a cardiologist who provides the final report.'
      }
    ]
  },
  {
    id: 'blood-tests',
    name: 'Blood Tests',
    category: 'laboratory',
    shortDescription: 'Comprehensive haematology and biochemistry profiling from sample extraction to detailed analysis.',
    overview: 'Blood tests help doctors check for certain diseases and conditions. They also help check the function of your organs and show how well treatments are working. Our laboratory performs a vast array of blood panels, from Complete Blood Counts (CBC) to advanced biochemical profiles.',
    whoNeedsIt: [
      'Individuals undergoing annual wellness evaluations',
      'Patients showing signs of infection, anemia, or systemic inflammation',
      'Patients managing chronic conditions like diabetes or high blood pressure',
      'Individuals monitoring organ function (liver, kidney, thyroid)'
    ],
    prepGuidelines: [
      'Depending on the test, you may need to fast (no food or drink except water) for 8 to 12 hours. Common fasting tests include Glucose and Lipid Panels.',
      'Stay hydrated by drinking plenty of water, as it makes veins easier to locate.',
      'Consult your doctor about taking your regular medications before the blood draw.'
    ],
    procedure: [
      'A phlebotomist will locate a suitable vein, usually on the inside of your elbow.',
      'A tourniquet is tied around your upper arm to fill the veins with blood.',
      'The area is cleaned with antiseptic, and a sterile needle is inserted to draw blood into vacuum tubes.',
      'The needle is removed, pressure is applied to the site, and a adhesive bandage is placed.'
    ],
    benefits: [
      'Provides a comprehensive blueprint of internal biochemical health',
      'Detects underlying health conditions long before clinical symptoms appear',
      'Minimally invasive diagnostic method yielding high-volume physiological data'
    ],
    faqs: [
      {
        question: 'Why must I fast before some blood tests?',
        answer: 'Nutrients and ingredients in food are absorbed into your bloodstream. This can temporarily alter levels of blood sugar, fats, and certain enzymes, leading to inaccurate test results.'
      }
    ]
  },
  {
    id: 'urine-analysis',
    name: 'Urine Analysis',
    category: 'laboratory',
    shortDescription: 'Physical, chemical, and microscopic examination of urine to detect renal disorders and systemic diseases.',
    overview: 'Urinalysis is a simple test that looks at a small sample of your urine. It is used to detect and manage a wide range of disorders, such as urinary tract infections (UTIs), kidney disease, and diabetes. It involves checking the appearance, concentration, and content of the urine.',
    whoNeedsIt: [
      'Patients with symptoms of a urinary tract infection (painful urination, frequent urge, cloudy urine)',
      'Individuals undergoing routine pregnancy screening',
      'Patients being monitored for kidney disease or kidney stones',
      'Screening for suspected diabetes (glucose in urine)'
    ],
    prepGuidelines: [
      'Ensure the genital area is cleaned before collecting the sample to avoid external contamination.',
      'Collect a "midstream" sample: begin urinating, stop, position the container, and collect the middle portion.'
    ],
    procedure: [
      'You will be given a sterile cup at the lab.',
      'Collect the midstream sample in the restroom and secure the container lid tightly.',
      'Hand the container back to our collection desk for immediate processing.'
    ],
    benefits: [
      'Completely non-invasive sample collection',
      'Rapid detection of metabolic changes, renal filtration issues, and bacterial infections',
      'Essential baseline tool for comprehensive physical evaluations'
    ],
    faqs: [
      {
        question: 'What is a "midstream" urine sample?',
        answer: 'A midstream sample means you don\'t collect the first or last part of urine that comes out. This reduces the risk of the sample being contaminated with bacteria from your skin or urethra.'
      }
    ]
  },
  {
    id: 'hormone-testing',
    name: 'Hormone Testing',
    category: 'laboratory',
    shortDescription: 'Targeted endocrine profiling including thyroid, reproductive, and metabolic hormone assays.',
    overview: 'Hormone testing evaluates the endocrine system, measuring chemical messengers in the blood. These tests help diagnose thyroid conditions, fertility issues, adrenal disorders, and metabolic irregularities by measuring levels of hormones like TSH, T3, T4, insulin, cortisol, estrogen, progesterone, and testosterone.',
    whoNeedsIt: [
      'Individuals suffering from unexplained weight gain/loss, fatigue, or mood swings',
      'Women experiencing irregular menstrual cycles or fertility challenges',
      'Men experiencing symptoms of low energy or muscle loss',
      'Individuals undergoing monitoring for thyroid disorders'
    ],
    prepGuidelines: [
      'Some hormone levels fluctuate significantly throughout the day. Cortisol is best drawn in the morning.',
      'For female reproductive hormones, testing may need to be timed to specific days of the menstrual cycle.',
      'Certain biotin supplements can interfere with hormone assay results; consult your doctor about pausing them.'
    ],
    procedure: [
      'The test is performed using a standard venous blood draw, usually from your arm.',
      'The sample is sent to our laboratory for precise immunoassay analysis.'
    ],
    benefits: [
      'Pinpoints chemical imbalances responsible for mood, energy, and weight fluctuations',
      'Guides personalized hormone replacement therapy or thyroid management plans',
      'Essential diagnostic tool for fertility and family planning support'
    ],
    faqs: [
      {
        question: 'Does the time of day affect my hormone test?',
        answer: 'Yes, many hormones are diurnal, meaning they rise and fall in a 24-hour cycle. Your doctor or our lab will advise you on the optimal time of day to have your blood drawn.'
      }
    ]
  },
  {
    id: 'cholesterol-screening',
    name: 'Cholesterol Screening',
    category: 'laboratory',
    shortDescription: 'Complete lipid profiling measuring LDL, HDL, Triglycerides, and Total Cholesterol to evaluate cardiac risk.',
    overview: 'A cholesterol screening, also called a lipid panel or lipid profile, measures the amount of cholesterol and triglycerides in your blood. This test helps assess your risk of cardiovascular diseases by measuring the balance between "good" (HDL) and "bad" (LDL) cholesterols, as well as circulating fats (triglycerides).',
    whoNeedsIt: [
      'Adults over 20 years old, as a preventive check every 4 to 6 years',
      'Individuals with a family history of early heart attacks or stroke',
      'Patients diagnosed with hypertension, diabetes, or obesity',
      'Individuals monitoring the effectiveness of cholesterol-lowering medications'
    ],
    prepGuidelines: [
      'A lipid panel typically requires fasting for 9 to 12 hours before the blood draw. Only water is permitted.',
      'Avoid high-fat meals and alcohol for 24 hours leading up to the test.'
    ],
    procedure: [
      'The test is performed using a standard blood draw from a vein in your arm.',
      'The sample is analyzed for Total Cholesterol, HDL, LDL, and Triglycerides.'
    ],
    benefits: [
      'Crucial tool in early identification of cardiovascular risk factors',
      'Empowers patients to make proactive dietary, lifestyle, and medical changes',
      'Highly objective metric to gauge cardiovascular health improvement over time'
    ],
    faqs: [
      {
        question: 'What is the difference between HDL and LDL?',
        answer: 'LDL (Low-Density Lipoprotein) is called "bad" cholesterol because it can build up in your artery walls. HDL (High-Density Lipoprotein) is "good" cholesterol because it carries cholesterol from other parts of your body back to your liver to be removed.'
      }
    ]
  },
  {
    id: 'eeg',
    name: 'EEG (Electroencephalogram)',
    category: 'imaging',
    shortDescription: 'Advanced diagnostic recording of brain electrical activity to detect seizures, epilepsy, and cognitive conditions.',
    overview: 'An Electroencephalogram (EEG) is a non-invasive diagnostic test that detects and records electrical activity in your brain using small, metal discs (electrodes) attached to your scalp. Brain cells communicate via electrical impulses and are active all the time, even during sleep. This activity shows up as wavy lines on an EEG recording, allowing neurologists to analyze brainwave patterns, identify irregularities, and diagnose epilepsy, sleep disorders, and other encephalopathic conditions.',
    whoNeedsIt: [
      'Patients experiencing unexplained seizures, blackouts, or convulsions',
      'Individuals being evaluated for epilepsy or brain wave irregularities',
      'Patients with persistent sleep disturbances, sleep apnea, or narcolepsy',
      'Individuals recovering from head injuries or experiencing confusion, memory loss, or cognitive decline'
    ],
    prepGuidelines: [
      'Wash your hair the night before or the morning of the test. Do not use hair oils, sprays, gels, or conditioners, as they make it difficult for the electrodes to stick.',
      'Avoid consuming caffeine (coffee, tea, cola, or chocolate) for at least 8 to 12 hours before the test.',
      'Unless instructed otherwise by your doctor, take your usual medications as scheduled. Provide a list of all medications you take to our technician.'
    ],
    procedure: [
      'You will sit in a comfortable reclining chair or lie on a bed in our diagnostic room.',
      'A technician will measure your head and mark spots on your scalp where electrodes will be placed.',
      'Electrodes are attached to your scalp using a special adhesive paste. The electrodes are connected by wires to the EEG machine.',
      'During the recording, you will be asked to relax, close your eyes, and perform simple tasks like breathing deeply (hyperventilation) or looking at a flashing light.',
      'The recording is completely painless, silent, and typically takes 45 to 60 minutes.'
    ],
    benefits: [
      'Non-invasive and completely painless brain wave diagnostic method',
      'Highly sensitive in detecting epileptic seizures and sub-clinical seizure patterns',
      'Provides crucial baseline diagnostics for memory disorders, sleep apnea, and confusion',
      'Helps physicians monitor and adjust treatments for neurological conditions'
    ],
    faqs: [
      {
        question: 'Does an EEG shock my brain or hurt?',
        answer: 'No, the EEG only records electrical activity coming from your brain. It does not send any electricity or shocks into your body, and it is completely painless.'
      },
      {
        question: 'How long does it take to get EEG results?',
        answer: 'The raw EEG recording is analyzed by our senior consultant neurologist. Verified digital reports are compiled and available within 24 hours.'
      }
    ]
  }
];
