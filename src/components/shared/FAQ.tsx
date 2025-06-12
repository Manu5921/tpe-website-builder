'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  variant?: 'plumber' | 'restaurant' | 'medical' | 'legal';
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const FAQ: React.FC<FAQProps> = ({
  faqs,
  title = "Questions Fréquentes",
  subtitle = "Trouvez rapidement les réponses à vos questions",
  variant = 'plumber',
  theme = {
    primary: 'blue-600',
    secondary: 'gray-800',
    accent: 'orange-500'
  }
}) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getVariantContent = () => {
    switch (variant) {
      case 'plumber':
        return {
          icon: '🔧',
          bgPattern: 'bg-blue-50',
          accentBg: 'bg-blue-100'
        };
      case 'restaurant':
        return {
          icon: '🍽️',
          bgPattern: 'bg-amber-50',
          accentBg: 'bg-amber-100'
        };
      case 'medical':
        return {
          icon: '🏥',
          bgPattern: 'bg-teal-50',
          accentBg: 'bg-teal-100'
        };
      case 'legal':
        return {
          icon: '⚖️',
          bgPattern: 'bg-slate-50',
          accentBg: 'bg-slate-100'
        };
    }
  };

  const variantContent = getVariantContent();

  return (
    <section id="faq" className={cn("py-20 px-4 sm:px-6 lg:px-8", variantContent.bgPattern)}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className={cn(
              "p-4 rounded-2xl",
              `bg-${theme.primary}/10`
            )}>
              <HelpCircle className={cn("w-8 h-8", `text-${theme.primary}`)} />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            {variantContent.icon} {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={cn("w-6 h-6", `text-${theme.primary}`)} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={cn(
                      "px-8 pb-6 border-t",
                      variantContent.accentBg
                    )}>
                      <div className="pt-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Vous ne trouvez pas la réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              {variant === 'plumber' && "Notre équipe est disponible 24h/24 pour répondre à toutes vos questions"}
              {variant === 'restaurant' && "Contactez-nous pour toute question sur nos services ou pour une réservation"}
              {variant === 'medical' && "Notre secrétariat médical est à votre disposition pour vous renseigner"}
              {variant === 'legal' && "Nos juristes sont disponibles pour répondre à vos questions spécifiques"}
              {!['plumber', 'restaurant', 'medical', 'legal'].includes(variant) && "Contactez-nous directement pour obtenir une réponse personnalisée"}
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={cn(
                "px-8 py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 shadow-lg",
                `bg-${theme.primary} hover:bg-${theme.primary}/90`
              )}
            >
              Nous contacter
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};