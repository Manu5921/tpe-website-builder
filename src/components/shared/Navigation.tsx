'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

interface NavigationProps {
  businessName: string;
  logo?: string;
  phone?: string;
  address?: string;
  emergencyHours?: string;
  navigation: NavigationItem[];
  variant?: 'plumber' | 'restaurant' | 'medical' | 'legal';
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const Navigation: React.FC<NavigationProps> = ({
  businessName,
  logo,
  phone,
  address,
  emergencyHours,
  navigation,
  variant = 'plumber',
  theme = {
    primary: 'blue-600',
    secondary: 'gray-800',
    accent: 'orange-500'
  }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'plumber':
        return {
          bg: 'bg-white',
          scrolledBg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-blue-600',
          emergency: 'bg-orange-500',
          emergencyText: 'text-white'
        };
      case 'restaurant':
        return {
          bg: 'bg-white',
          scrolledBg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-amber-600',
          emergency: 'bg-red-600',
          emergencyText: 'text-white'
        };
      case 'medical':
        return {
          bg: 'bg-white',
          scrolledBg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-teal-600',
          emergency: 'bg-teal-500',
          emergencyText: 'text-white'
        };
      case 'legal':
        return {
          bg: 'bg-white',
          scrolledBg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-slate-700',
          emergency: 'bg-gold-500',
          emergencyText: 'text-white'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <>
      {/* Emergency Banner (only for plumber) */}
      {variant === 'plumber' && emergencyHours && (
        <div className={cn("py-2 px-4 text-center", styles.emergency, styles.emergencyText)}>
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>🚨 Urgence {emergencyHours}</span>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="ml-4 underline hover:no-underline font-bold"
              >
                📞 {phone}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled ? cn(styles.scrolledBg, "backdrop-blur-md shadow-lg") : styles.bg
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {logo ? (
                  <img
                    className="h-8 w-auto lg:h-10"
                    src={logo}
                    alt={businessName}
                  />
                ) : (
                  <div className={cn("text-xl lg:text-2xl font-bold", styles.accent)}>
                    {businessName}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors duration-200 hover:opacity-75",
                      item.current
                        ? styles.accent
                        : styles.text
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info (Desktop) */}
            <div className="hidden lg:flex items-center space-x-6">
              {address && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{address}</span>
                </div>
              )}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105",
                    `bg-${theme.primary} text-white hover:bg-${theme.primary}/90`
                  )}
                >
                  <Phone className="w-4 h-4" />
                  {phone}
                </a>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "inline-flex items-center justify-center p-2 rounded-md transition-colors",
                  styles.text, "hover:bg-gray-100"
                )}
              >
                <span className="sr-only">Ouvrir le menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors",
                      item.current
                        ? cn(styles.accent, "bg-gray-50")
                        : cn(styles.text, "hover:bg-gray-50")
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="px-4 py-4 border-t border-gray-200 space-y-3">
                {address && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{address}</span>
                  </div>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all",
                      `bg-${theme.primary} text-white`
                    )}
                  >
                    <Phone className="w-4 h-4" />
                    Appeler {phone}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};