'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Phone, MapPin, Clock, Star, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface HeroSectionProps {
  variant: 'plumber' | 'restaurant' | 'medical' | 'legal';
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaAction: () => void;
  ctaSecondaryText?: string;
  ctaSecondaryAction?: () => void;
  features?: string[];
  backgroundImage?: string;
  stats?: Array<{value: string; label: string}>;
  phone?: string;
  address?: string;
  businessHours?: string;
  rating?: number;
  reviewCount?: number;
  badges?: Array<{icon: LucideIcon; text: string}>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant,
  headline,
  subheadline,
  ctaText,
  ctaAction,
  ctaSecondaryText,
  ctaSecondaryAction,
  features = [],
  backgroundImage,
  stats = [],
  phone,
  address,
  businessHours,
  rating,
  reviewCount,
  badges = []
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'plumber':
        return {
          bgGradient: 'from-blue-600 to-blue-800',
          ctaColor: 'bg-orange-500 hover:bg-orange-600',
          ctaSecondaryColor: 'bg-white text-blue-600 hover:bg-gray-100',
          accentColor: 'text-orange-400'
        };
      case 'restaurant':
        return {
          bgGradient: 'from-amber-600 to-amber-800',
          ctaColor: 'bg-red-600 hover:bg-red-700',
          ctaSecondaryColor: 'bg-white text-amber-600 hover:bg-amber-50',
          accentColor: 'text-red-400'
        };
      case 'medical':
        return {
          bgGradient: 'from-teal-600 to-teal-800',
          ctaColor: 'bg-teal-500 hover:bg-teal-600',
          ctaSecondaryColor: 'bg-white text-teal-600 hover:bg-teal-50',
          accentColor: 'text-teal-300'
        };
      case 'legal':
        return {
          bgGradient: 'from-slate-700 to-slate-900',
          ctaColor: 'bg-gold-500 hover:bg-gold-600',
          ctaSecondaryColor: 'bg-white text-slate-700 hover:bg-gray-100',
          accentColor: 'text-gold-400'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-90",
              styles.bgGradient
            )} />
          </>
        ) : (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br",
            styles.bgGradient
          )}>
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute h-96 w-96 -top-48 -left-48 bg-white rounded-full blur-3xl animate-pulse" />
              <div className="absolute h-96 w-96 -bottom-48 -right-48 bg-white rounded-full blur-3xl animate-pulse animation-delay-1000" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badges */}
            {badges.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm"
                  >
                    <badge.icon className="w-4 h-4" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Rating */}
            {rating && reviewCount && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm">
                  {rating}/5 ({reviewCount} avis Google)
                </span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl mb-8 text-white/90"
            >
              {subheadline}
            </motion.p>

            {/* Features list */}
            {features.length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 mb-8"
              >
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Shield className={cn("w-5 h-5", styles.accentColor)} />
                    <span className="text-white/90">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <button
                onClick={ctaAction}
                className={cn(
                  "px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-xl",
                  styles.ctaColor
                )}
              >
                {ctaText}
              </button>
              {ctaSecondaryText && ctaSecondaryAction && (
                <button
                  onClick={ctaSecondaryAction}
                  className={cn(
                    "px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-xl",
                    styles.ctaSecondaryColor
                  )}
                >
                  {ctaSecondaryText}
                </button>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-3 text-white/80"
            >
              {phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>{address}</span>
                </div>
              )}
              {businessHours && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>{businessHours}</span>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right column - Stats or image */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <div className={cn("text-4xl font-bold mb-2", styles.accentColor)}>
                      {stat.value}
                    </div>
                    <div className="text-white/80">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};