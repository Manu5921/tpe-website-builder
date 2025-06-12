'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  location?: string;
  date?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  variant?: 'plumber' | 'restaurant' | 'medical' | 'legal';
  autoplay?: boolean;
  autoplayInterval?: number;
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  title = "Ce que disent nos clients",
  subtitle = "Découvrez les témoignages de nos clients satisfaits",
  variant = 'plumber',
  autoplay = true,
  autoplayInterval = 5000,
  theme = {
    primary: 'blue-600',
    secondary: 'gray-800',
    accent: 'orange-500'
  }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-5 h-5",
              i < rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  const getVariantContent = () => {
    switch (variant) {
      case 'plumber':
        return {
          icon: '🔧',
          bgGradient: 'from-blue-50 to-white',
          cardBg: 'bg-white',
          averageRating: '4.9'
        };
      case 'restaurant':
        return {
          icon: '🍽️',
          bgGradient: 'from-amber-50 to-white',
          cardBg: 'bg-white',
          averageRating: '4.8'
        };
      case 'medical':
        return {
          icon: '🏥',
          bgGradient: 'from-teal-50 to-white',
          cardBg: 'bg-white',
          averageRating: '4.9'
        };
      case 'legal':
        return {
          icon: '⚖️',
          bgGradient: 'from-slate-50 to-white',
          cardBg: 'bg-white',
          averageRating: '4.8'
        };
    }
  };

  const variantContent = getVariantContent();
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '5.0';

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section 
      id="testimonials" 
      className={cn("py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br", variantContent.bgGradient)}
    >
      <div className="max-w-7xl mx-auto">
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
              <ThumbsUp className={cn("w-8 h-8", `text-${theme.primary}`)} />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            {variantContent.icon} {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              {renderStars(5)}
              <span className="font-semibold text-lg text-gray-900">{averageRating}/5</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <span>{testimonials.length} avis clients</span>
            <div className="h-4 w-px bg-gray-300" />
            <span>⭐ Noté sur Google</span>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className={cn(
                  "h-full rounded-3xl shadow-2xl p-8 lg:p-12 flex flex-col justify-center",
                  variantContent.cardBg
                )}>
                  <div className="max-w-4xl mx-auto text-center">
                    {/* Quote Icon */}
                    <Quote className={cn("w-12 h-12 mx-auto mb-6 opacity-20", `text-${theme.primary}`)} />
                    
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    
                    {/* Content */}
                    <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      {testimonials[currentIndex].image ? (
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl",
                          `bg-${theme.primary}`
                        )}>
                          {testimonials[currentIndex].name.charAt(0)}
                        </div>
                      )}
                      <div className="text-left">
                        <div className="font-semibold text-lg text-gray-900">
                          {testimonials[currentIndex].name}
                        </div>
                        {testimonials[currentIndex].role && (
                          <div className="text-gray-600">
                            {testimonials[currentIndex].role}
                          </div>
                        )}
                        {testimonials[currentIndex].location && (
                          <div className="text-sm text-gray-500">
                            📍 {testimonials[currentIndex].location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-110",
                  `bg-${theme.primary} text-white hover:bg-${theme.primary}/90`
                )}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-110",
                  `bg-${theme.primary} text-white hover:bg-${theme.primary}/90`
                )}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? `bg-${theme.primary} scale-125`
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Secondary Testimonials Grid */}
        {testimonials.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow",
                  variantContent.cardBg
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  "{testimonial.content.length > 150 
                    ? testimonial.content.substring(0, 150) + '...'
                    : testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
                      `bg-${theme.primary}`
                    )}>
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      {testimonial.name}
                    </div>
                    {testimonial.role && (
                      <div className="text-xs text-gray-600">
                        {testimonial.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className={cn("rounded-2xl shadow-lg p-8", variantContent.cardBg)}>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Rejoignez nos clients satisfaits
            </h3>
            <p className="text-gray-600 mb-6">
              {variant === 'plumber' && "Faites confiance à notre expertise pour tous vos travaux de plomberie"}
              {variant === 'restaurant' && "Découvrez une expérience culinaire exceptionnelle"}
              {variant === 'medical' && "Bénéficiez de soins de qualité dans un environnement professionnel"}
              {variant === 'legal' && "Obtenez l'accompagnement juridique dont vous avez besoin"}
              {!['plumber', 'restaurant', 'medical', 'legal'].includes(variant) && "Découvrez nos services de qualité"}
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