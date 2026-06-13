export type Availability = "Lab" | "Home" | "Both";

export interface MedicalTest {
  id: string;
  name: string;
  description: string;
  availability: Availability;
  duration: string;
  category?: string;
  slug: string;
  biomarkers?: string[];
  image?: string;
  sampleReportUrl?: string | null;
  price?: number | null;
  discountPrice?: number | null;
  hidePrice?: boolean;
  requirements?: string[];
}

export interface PackageCategory {
  categoryName: string;
  tests: string[];
}

export interface TestProfile extends Omit<MedicalTest, 'category' | 'biomarkers'> {
  includedTests?: string[];
  includedCategories?: PackageCategory[];
  category: string;
  showOnHome?: boolean;
}

export interface PatientUser {
  phone: string;
  pinHash: string;
  createdAt: any;
  failedAttempts?: number;
  lockoutUntil?: any;
}

export interface PatientReport {
  id: string;
  phone: string;
  patientName: string;
  testName: string;
  reportUrl: string;
  createdAt: any;
}
