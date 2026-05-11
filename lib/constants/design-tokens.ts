// Design Tokens for MediConnect Platform
// Color Palette, Typography, and Spacing Scales

export const COLORS = {
  // Primary Accent
  primaryAccent: '#0D9488', // Deep Teal
  primaryAccentLight: '#14B8A6',
  primaryAccentDark: '#0A7C6D',

  // Backgrounds
  bgLight: '#FAFAFA', // Off-white light
  bgLighter: '#F8FAFC', // Off-white lighter
  bgDark: '#0F172A', // Dark slate
  bgDarker: '#0A0E27', // Darker slate

  // Text
  textPrimary: '#0F172A', // Dark slate
  textSecondary: '#64748B', // Slate
  textMuted: '#94A3B8', // Muted slate
  textInverse: '#F1F5F9', // Light for dark backgrounds

  // Borders & Dividers
  border: '#E2E8F0', // Slate border
  borderDark: '#334155', // Dark slate border

  // States
  success: '#16A34A', // Green
  warning: '#F59E0B', // Amber
  error: '#DC2626', // Red
  info: '#0284C7', // Blue

  // Status
  statusOnline: '#22C55E', // Bright green
  statusOffline: '#6B7280', // Gray
  statusAway: '#F59E0B', // Amber
};

export const TYPOGRAPHY = {
  // Font sizes
  h1: '32px',
  h2: '28px',
  h3: '20px',
  h4: '18px',
  body: '14px',
  bodySm: '13px',
  small: '12px',
  xs: '11px',

  // Line heights
  h1LineHeight: '40px',
  h2LineHeight: '36px',
  h3LineHeight: '28px',
  bodyLineHeight: '22px',
  smallLineHeight: '18px',

  // Font weights
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '32px',
  '5xl': '40px',
  '6xl': '48px',
};

export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '50%',
};

export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
};

// Medical Topics & Categories for the platform
export const MEDICAL_TOPICS = [
  'NEET PG',
  'MBBS',
  'Anatomy',
  'Physiology',
  'Biochemistry',
  'Pathology',
  'Pharmacology',
  'Microbiology',
  'Surgery',
  'Medicine',
  'Pediatrics',
  'Obstetrics',
  'Psychiatry',
  'Radiology',
  'Anesthesia',
  'ENT',
  'Ophthalmology',
  'Dermatology',
  'Orthopedics',
  'Cardiology',
];

// Colleges for India
export const MEDICAL_COLLEGES = [
  'AIIMS Delhi',
  'AIIMS Bangalore',
  'AIIMS Mumbai',
  'CMC Vellore',
  'St. Johns Medical College',
  'Manipal Academy',
  'Delhi Medical College',
  'Government Medical College Trivandrum',
  'JIPMER Puducherry',
  'GMCH Chandigarh',
];

// Degrees
export const DEGREES = ['MBBS', 'BDS', 'NEET PG', 'DNB', 'Super Specialty'];

// Years of study
export const STUDY_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'PG', 'Faculty'];

// User roles
export const USER_ROLES = ['Student', 'Doctor', 'Faculty', 'Intern', 'Resident', 'Admin'];
