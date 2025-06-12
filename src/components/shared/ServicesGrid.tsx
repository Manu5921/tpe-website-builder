'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import * as Icons from 'lucide-react';

interface Service {
  icon: LucideIcon | string;
  title: string;
  description: string;
  price?: string;
  highlighted?: boolean;
}

interface ServicesGridProps {
  services: Service[];
  variant?: 'default' | 'compact' | 'detailed' | 'menu';
  columns?: 1 | 2 | 3 | 4;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  services,
  variant = 'default',
  columns = 3,
  theme = {
    primary: 'blue-600',
    secondary: 'gray-800',
    accent: 'orange-500'
  }
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getGridColumns = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const renderIcon = (icon: LucideIcon | string) => {
    if (typeof icon === 'string') {
      // Check if it's an emoji
      if (icon.length <= 2) {
        return <span className="text-4xl">{icon}</span>;
      }
      // Try to get icon from lucide-react
      const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;
      if (IconComponent) {
        return <IconComponent className="w-8 h-8" />;
      }
      // Fallback to emoji or text
      return <span className="text-4xl">🔧</span>;
    }
    const IconComponent = icon;
    return <IconComponent className="w-8 h-8" />;
  };

  const renderServiceCard = (service: Service, index: number) => {
    switch (variant) {
      case 'compact':
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={cn(
              "group relative p-6 rounded-xl border transition-all duration-300",
              service.highlighted
                ? `border-${theme.accent} bg-${theme.accent}/5`
                : "border-gray-200 bg-white hover:border-gray-300",
              "hover:shadow-lg hover:-translate-y-1"
            )}
          >
            <div className={cn(
              "inline-flex p-3 rounded-lg mb-4",
              service.highlighted
                ? `bg-${theme.accent}/10 text-${theme.accent}`
                : `bg-${theme.primary}/10 text-${theme.primary}`
            )}>
              {renderIcon(service.icon)}
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
            {service.price && (
              <p className={cn(
                "mt-4 font-semibold",
                service.highlighted ? `text-${theme.accent}` : `text-${theme.primary}`
              )}>
                {service.price}
              </p>
            )}
          </motion.div>
        );

      case 'detailed':
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={cn(
              "group relative overflow-hidden rounded-2xl transition-all duration-300",
              service.highlighted
                ? "ring-2 ring-offset-2 ring-orange-500"
                : "",
              "hover:shadow-2xl"
            )}
          >
            {service.highlighted && (
              <div className="absolute top-4 right-4 z-10">
                <span className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-full",
                  `bg-${theme.accent} text-white`
                )}>
                  Populaire
                </span>
              </div>
            )}
            <div className="relative p-8 bg-white">
              <div className={cn(
                "inline-flex p-4 rounded-2xl mb-6",
                `bg-gradient-to-br from-${theme.primary}/10 to-${theme.primary}/5`
              )}>
                <div className={`text-${theme.primary}`}>
                  {renderIcon(service.icon)}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              {service.price && (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{service.price}</span>
                </div>
              )}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          </motion.div>
        );

      case 'menu':
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
              {service.price && (
                <span className={cn(
                  "text-xl font-bold whitespace-nowrap",
                  `text-${theme.primary}`
                )}>
                  {service.price}
                </span>
              )}
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "group relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300",
              service.highlighted
                ? "ring-2 ring-orange-500 shadow-orange-100"
                : "hover:shadow-xl",
              "hover:-translate-y-1"
            )}
          >
            {service.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className={cn(
                  "px-4 py-2 text-sm font-semibold rounded-full shadow-lg",
                  `bg-${theme.accent} text-white`
                )}>
                  ⭐ Le plus demandé
                </span>
              </div>
            )}
            
            <div className={cn(
              "inline-flex p-4 rounded-2xl mb-6 transition-all duration-300",
              service.highlighted
                ? `bg-${theme.accent}/10 text-${theme.accent} group-hover:bg-${theme.accent}/20`
                : `bg-${theme.primary}/10 text-${theme.primary} group-hover:bg-${theme.primary}/20`
            )}>
              {renderIcon(service.icon)}
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            
            {service.price && (
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-1">À partir de</p>
                <p className={cn(
                  "text-3xl font-bold",
                  service.highlighted ? `text-${theme.accent}` : `text-${theme.primary}`
                )}>
                  {service.price}
                </p>
              </div>
            )}

            {/* Hover effect */}
            <div className={cn(
              "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
              `bg-gradient-to-br from-${theme.primary}/5 to-transparent`
            )} />
          </motion.div>
        );
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services professionnels
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "grid gap-8",
            variant === 'menu' ? 'max-w-4xl mx-auto' : getGridColumns()
          )}
        >
          {services.map((service, index) => renderServiceCard(service, index))}
        </motion.div>
      </div>
    </section>
  );
};