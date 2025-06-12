import { LucideIcon } from 'lucide-react';

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  emergency?: string;
}

export interface BusinessInfo {
  name: string;
  logo?: string;
  phone: string;
  email: string;
  address: Address;
  openingHours?: OpeningHours;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface Service {
  icon: string | LucideIcon;
  title: string;
  description: string;
  price?: string;
  highlighted?: boolean;
}

export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  cta: string;
  ctaSecondary?: string;
  features?: string[];
  backgroundImage?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export interface ContentConfig {
  hero: HeroContent;
  services: Service[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  about?: {
    title: string;
    description: string;
    image?: string;
    features?: string[];
  };
  gallery?: {
    title: string;
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  foreground?: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts?: {
    heading?: string;
    body?: string;
  };
  borderRadius?: string;
}

export type BusinessType = 'plumber' | 'restaurant' | 'medical' | 'legal' | 'retail' | 'service';
export type TemplateType = 'plumber' | 'restaurant' | 'medical' | 'legal' | 'default';

export interface ClientConfig {
  // Metadata
  id: string;
  template: TemplateType;
  domain: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'active' | 'inactive' | 'draft';
  
  // Business Information
  business: BusinessInfo;
  
  // SEO Configuration
  seo: SEOConfig;
  
  // Content
  content: ContentConfig;
  
  // Theme Customization
  theme: ThemeConfig;
  
  // Features flags
  features?: {
    contactForm?: boolean;
    onlineBooking?: boolean;
    gallery?: boolean;
    blog?: boolean;
    testimonials?: boolean;
    faq?: boolean;
    newsletter?: boolean;
    analytics?: {
      googleAnalytics?: string;
      facebookPixel?: string;
    };
  };
}