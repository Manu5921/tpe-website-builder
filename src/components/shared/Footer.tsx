'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Shield,
  Award,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FooterProps {
  businessName: string;
  logo?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  openingHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    emergency?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  variant?: 'plumber' | 'restaurant' | 'medical' | 'legal';
  services?: string[];
  certifications?: string[];
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const Footer: React.FC<FooterProps> = ({
  businessName,
  logo,
  address,
  phone,
  email,
  openingHours,
  socialMedia,
  variant = 'plumber',
  services = [],
  certifications = [],
  theme = {
    primary: 'blue-600',
    secondary: 'gray-800',
    accent: 'orange-500'
  }
}) => {
  const currentYear = new Date().getFullYear();

  const getVariantContent = () => {
    switch (variant) {
      case 'plumber':
        return {
          bgColor: 'bg-gray-900',
          textColor: 'text-gray-300',
          accentColor: 'text-blue-400',
          borderColor: 'border-gray-700',
          hoverColor: 'hover:text-blue-400',
          quickLinks: [
            { name: 'Dépannage Urgence', href: '#services' },
            { name: 'Nos Services', href: '#services' },
            { name: 'Zone Intervention', href: '#zone' },
            { name: 'Devis Gratuit', href: '#contact' },
            { name: 'Témoignages', href: '#testimonials' }
          ],
          legalText: 'Plombier professionnel agréé. Garantie décennale. Intervention 24h/24.',
          certificationIcons: ['🔧', '🛡️', '⭐']
        };
      case 'restaurant':
        return {
          bgColor: 'bg-stone-900',
          textColor: 'text-stone-300',
          accentColor: 'text-amber-400',
          borderColor: 'border-stone-700',
          hoverColor: 'hover:text-amber-400',
          quickLinks: [
            { name: 'Notre Menu', href: '#menu' },
            { name: 'Réservation', href: '#contact' },
            { name: 'À Propos', href: '#about' },
            { name: 'Événements', href: '#events' },
            { name: 'Galerie', href: '#gallery' }
          ],
          legalText: 'Restaurant traditionnel français. Cuisine faite maison avec des produits frais.',
          certificationIcons: ['🍽️', '🏆', '⭐']
        };
      case 'medical':
        return {
          bgColor: 'bg-teal-900',
          textColor: 'text-teal-100',
          accentColor: 'text-teal-300',
          borderColor: 'border-teal-700',
          hoverColor: 'hover:text-teal-300',
          quickLinks: [
            { name: 'Prendre RDV', href: '#contact' },
            { name: 'Nos Spécialités', href: '#services' },
            { name: 'Équipe Médicale', href: '#team' },
            { name: 'Urgences', href: '#urgences' },
            { name: 'Informations', href: '#info' }
          ],
          legalText: 'Cabinet médical agréé. Conventionné Sécurité Sociale.',
          certificationIcons: ['🏥', '🩺', '⭐']
        };
      case 'legal':
        return {
          bgColor: 'bg-slate-900',
          textColor: 'text-slate-300',
          accentColor: 'text-gold-400',
          borderColor: 'border-slate-700',
          hoverColor: 'hover:text-gold-400',
          quickLinks: [
            { name: 'Consultation', href: '#contact' },
            { name: 'Domaines', href: '#services' },
            { name: 'Notre Équipe', href: '#team' },
            { name: 'Actualités', href: '#news' },
            { name: 'Urgences', href: '#urgences' }
          ],
          legalText: 'Cabinet d\'avocats inscrit au Barreau. Conseil et représentation juridique.',
          certificationIcons: ['⚖️', '📜', '🏛️']
        };
    }
  };

  const variantContent = getVariantContent();

  const formatOpeningHours = () => {
    if (!openingHours) return [];
    
    const daysMap = {
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      sunday: 'Dimanche'
    };

    return Object.entries(openingHours)
      .filter(([key]) => key !== 'emergency')
      .map(([key, value]) => ({
        day: daysMap[key as keyof typeof daysMap],
        hours: value || 'Fermé'
      }));
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className={cn("relative", variantContent.bgColor)}>
      {/* Decorative top border */}
      <div className={cn("h-1 bg-gradient-to-r from-transparent via-current to-transparent", variantContent.accentColor)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="mb-6">
              {logo ? (
                <img
                  src={logo}
                  alt={businessName}
                  className="h-12 w-auto"
                />
              ) : (
                <h3 className={cn("text-2xl font-bold", variantContent.accentColor)}>
                  {businessName}
                </h3>
              )}
            </div>

            <p className={cn("mb-6 text-sm leading-relaxed", variantContent.textColor)}>
              {variantContent.legalText}
            </p>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="mb-6">
                <h4 className={cn("font-semibold mb-3", variantContent.accentColor)}>
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <span
                      key={index}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border",
                        variantContent.borderColor,
                        variantContent.textColor
                      )}
                    >
                      {variantContent.certificationIcons[index] || '🏆'} {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media */}
            {socialMedia && Object.values(socialMedia).some(Boolean) && (
              <div>
                <h4 className={cn("font-semibold mb-3", variantContent.accentColor)}>
                  Suivez-nous
                </h4>
                <div className="flex gap-4">
                  {socialMedia.facebook && (
                    <a
                      href={socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-lg border transition-colors",
                        variantContent.borderColor,
                        variantContent.textColor,
                        variantContent.hoverColor
                      )}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {socialMedia.instagram && (
                    <a
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-lg border transition-colors",
                        variantContent.borderColor,
                        variantContent.textColor,
                        variantContent.hoverColor
                      )}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {socialMedia.linkedin && (
                    <a
                      href={socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-lg border transition-colors",
                        variantContent.borderColor,
                        variantContent.textColor,
                        variantContent.hoverColor
                      )}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {socialMedia.twitter && (
                    <a
                      href={socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-2 rounded-lg border transition-colors",
                        variantContent.borderColor,
                        variantContent.textColor,
                        variantContent.hoverColor
                      )}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className={cn("font-semibold mb-6", variantContent.accentColor)}>
              Liens rapides
            </h4>
            <ul className="space-y-3">
              {variantContent.quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "text-sm transition-colors flex items-center gap-2",
                      variantContent.textColor,
                      variantContent.hoverColor
                    )}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className={cn("font-semibold mb-6", variantContent.accentColor)}>
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className={cn("w-5 h-5 mt-0.5 flex-shrink-0", variantContent.accentColor)} />
                <div>
                  <p className={cn("text-sm", variantContent.textColor)}>
                    {address.street}<br />
                    {address.postalCode} {address.city}<br />
                    {address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className={cn("w-5 h-5 flex-shrink-0", variantContent.accentColor)} />
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className={cn(
                    "text-sm transition-colors",
                    variantContent.textColor,
                    variantContent.hoverColor
                  )}
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className={cn("w-5 h-5 flex-shrink-0", variantContent.accentColor)} />
                <a
                  href={`mailto:${email}`}
                  className={cn(
                    "text-sm transition-colors",
                    variantContent.textColor,
                    variantContent.hoverColor
                  )}
                >
                  {email}
                </a>
              </div>

              {variant === 'plumber' && openingHours?.emergency && (
                <div className={cn(
                  "mt-4 p-3 rounded-lg border-2 border-dashed",
                  `border-${theme.accent}`,
                  `bg-${theme.accent}/10`
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className={cn("w-4 h-4", `text-${theme.accent}`)} />
                    <span className={cn("text-sm font-semibold", `text-${theme.accent}`)}>
                      Urgence 24h/24
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">
                    {openingHours.emergency}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Opening Hours */}
          {openingHours && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className={cn("font-semibold mb-6", variantContent.accentColor)}>
                Horaires
              </h4>
              <div className="space-y-2">
                {formatOpeningHours().map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className={cn("text-sm", variantContent.textColor)}>
                      {item.day}
                    </span>
                    <span className={cn(
                      "text-sm font-medium",
                      item.hours === 'Fermé' ? 'text-red-400' : variantContent.accentColor
                    )}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={cn(
            "mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4",
            variantContent.borderColor
          )}
        >
          <div className={cn("text-sm", variantContent.textColor)}>
            © {currentYear} {businessName}. Tous droits réservés.
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <button className={cn("transition-colors", variantContent.textColor, variantContent.hoverColor)}>
              Mentions légales
            </button>
            <button className={cn("transition-colors", variantContent.textColor, variantContent.hoverColor)}>
              Politique de confidentialité
            </button>
            <button className={cn("transition-colors", variantContent.textColor, variantContent.hoverColor)}>
              CGV
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};