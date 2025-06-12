'use client';

import React from 'react';
import { Wrench, Shield, Award, Clock, Phone } from 'lucide-react';
import { Navigation } from '@/components/shared/Navigation';
import { HeroSection } from '@/components/shared/HeroSection';
import { ServicesGrid } from '@/components/shared/ServicesGrid';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQ } from '@/components/shared/FAQ';
import { ContactFormSimple } from '@/components/shared/ContactFormSimple';
import { Footer } from '@/components/shared/Footer';
import { ClientConfig } from '@/lib/configs/config.types';
import { cn } from '@/lib/utils/cn';

interface PlumberTemplateProps {
  config: ClientConfig;
}

export const PlumberTemplate: React.FC<PlumberTemplateProps> = ({ config }) => {
  const { business, content, theme } = config;

  const navigationItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Zone intervention', href: '#zone' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleCallAction = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${business.phone.replace(/\s/g, '')}`;
    }
  };

  const handleQuoteAction = () => {
    if (typeof window !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        businessName={business.name}
        logo={business.logo}
        phone={business.phone}
        address={`${business.address.city} ${business.address.postalCode}`}
        emergencyHours={business.openingHours?.emergency}
        navigation={navigationItems}
        variant="plumber"
        theme={theme.colors}
      />

      <section id="hero">
        <HeroSection
          variant="plumber"
          headline={content.hero.headline}
          subheadline={content.hero.subheadline}
          ctaText={content.hero.cta}
          ctaAction={handleCallAction}
          ctaSecondaryText={content.hero.ctaSecondary}
          ctaSecondaryAction={handleQuoteAction}
          features={content.hero.features}
          backgroundImage={content.hero.backgroundImage}
          stats={content.hero.stats}
          phone={business.phone}
          address={`${business.address.street}, ${business.address.city}`}
          businessHours="Lun-Ven 8h-19h, Sam 9h-17h"
          rating={4.8}
          reviewCount={127}
          badges={[
            { icon: Shield, text: 'Garantie 10 ans' },
            { icon: Award, text: 'Artisan RGE' },
            { icon: Clock, text: 'Urgence 24h/24' }
          ]}
        />
      </section>

      <section id="services">
        <ServicesGrid
          services={content.services}
          variant="default"
          columns={3}
          theme={theme.colors}
        />
      </section>

      <section id="zone" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
              Zone intervention
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous intervenons rapidement dans tout Lyon et ses communes limitrophes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    Carte Interactive
                  </h3>
                  <p className="text-blue-700">
                    Zone de couverture : 30km autour de Lyon
                  </p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Intervention &lt; 1h
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Intervention rapide dans toute la métropole
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Notre équipe de plombiers professionnels intervient dans un rayon de 30 kilomètres 
                autour de Lyon pour tous vos dépannages urgents et travaux planifiés.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold mb-3 text-gray-900">Communes principales</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Lyon (tous arrondissements)</li>
                    <li>• Villeurbanne</li>
                    <li>• Bron</li>
                    <li>• Vénissieux</li>
                    <li>• Caluire-et-Cuire</li>
                    <li>• Oullins</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold mb-3 text-gray-900">Délais intervention</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>🚨 <strong>Urgence:</strong> &lt; 1 heure</li>
                    <li>⚡ <strong>Dépannage:</strong> &lt; 2 heures</li>
                    <li>📅 <strong>RDV planifié:</strong> 24-48h</li>
                    <li>🏗️ <strong>Gros travaux:</strong> Sur devis</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleCallAction}
                  className={cn(
                    "px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105",
                    `bg-${theme.colors.primary} text-white hover:bg-${theme.colors.primary}/90`
                  )}
                >
                  <Phone className="w-5 h-5 inline mr-2" />
                  Appeler maintenant
                </button>
                <button
                  onClick={handleQuoteAction}
                  className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all"
                >
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content.testimonials && (
        <section id="testimonials">
          <Testimonials
            testimonials={content.testimonials}
            variant="plumber"
            theme={theme.colors}
          />
        </section>
      )}

      {content.faqs && (
        <section id="faq">
          <FAQ
            faqs={content.faqs}
            variant="plumber"
            theme={theme.colors}
          />
        </section>
      )}

      <section id="contact">
        <ContactFormSimple
          businessType="plumber"
          emailTo={business.email}
          businessInfo={{
            phone: business.phone,
            email: business.email,
            address: `${business.address.street}, ${business.address.city}`,
            hours: business.openingHours ? 
              `Lun-Ven: ${business.openingHours.monday || '8h-19h'}\nSam: ${business.openingHours.saturday || '9h-17h'}\nDim: ${business.openingHours.sunday || 'Fermé'}\n\n🚨 ${business.openingHours.emergency || 'Urgence 24h/24 7j/7'}` 
              : undefined
          }}
          theme={theme.colors}
        />
      </section>

      <Footer
        businessName={business.name}
        logo={business.logo}
        address={business.address}
        phone={business.phone}
        email={business.email}
        openingHours={business.openingHours}
        socialMedia={business.socialMedia}
        variant="plumber"
        certifications={['Garantie décennale', 'Artisan RGE', 'Assurance RC Pro']}
        theme={theme.colors}
      />
    </div>
  );
};