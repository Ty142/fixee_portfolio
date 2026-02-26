export type Language = 'vi' | 'en';

export interface TranslationKeys {
  // Navigation
  nav: {
    services: string;
    experience: string;
    howItWorks: string;
    login: string;
  };
  
  // Hero Section
  hero: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    findMechanic: string;
  };
  
  // Services Section
  services: {
    title: string;
    description: string;
    tireRepair: string;
    tireRepairDesc: string;
    engineDead: string;
    engineDeadDesc: string;
    outOfGas: string;
    outOfGasDesc: string;
    batteryReplacement: string;
    batteryReplacementDesc: string;
    towing: string;
    towingDesc: string;
    inspection: string;
    inspectionDesc: string;
  };
  
  // Demo Section
  demo: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    needMechanic: string;
    findNearby: string;
    findingMechanic: string;
    foundMechanic: string;
    mechanicOnWay: string;
  };
  
  // How It Works
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
    loginNow: string;
    downloadApp: string;
  };
  
  // Footer
  footer: {
    description: string;
    aboutFixee: string;
    about: string;
    careers: string;
    terms: string;
    privacy: string;
    servicesTitle: string;
    motorcycleRescue: string;
    maintenance: string;
    technicalConsulting: string;
    pricing: string;
    contact: string;
    hotline: string;
    email: string;
    address: string;
    copyright: string;
  };
  
  // Login
  login: {
    welcome: string;
    subtitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    loginButton: string;
    loggingIn: string;
    noAccount: string;
    signUpNow: string;
    termsAgreement: string;
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    successTitle: string;
    successMessage: string;
  };
  
  // SignUp
  signUp: {
    title: string;
    subtitle: string;
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    phonePlaceholder: string;
    signUpButton: string;
    signingUp: string;
    haveAccount: string;
    loginNow: string;
    termsAgreement: string;
  };
  
  // Common
  common: {
    minutes: string;
    averageTime: string;
  };
}
