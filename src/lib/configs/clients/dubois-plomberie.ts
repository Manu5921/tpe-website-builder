import { ClientConfig } from '@/lib/configs/config.types';
import { Wrench, Droplets, Home, Clock, Shield, Award } from 'lucide-react';

export const duboisPlomberieConfig: ClientConfig = {
  // Métadonnées
  id: 'dubois-plomberie',
  template: 'plumber',
  domain: 'dubois-plomberie.fr',
  status: 'active',
  
  // Informations business
  business: {
    name: 'Plomberie Dubois',
    logo: '/logos/dubois.svg',
    phone: '06 12 34 56 78',
    email: 'contact@dubois-plomberie.fr',
    address: {
      street: '123 rue de la République',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      coordinates: {
        lat: 45.764043,
        lng: 4.835659
      }
    },
    openingHours: {
      monday: '8h00 - 19h00',
      tuesday: '8h00 - 19h00',
      wednesday: '8h00 - 19h00',
      thursday: '8h00 - 19h00',
      friday: '8h00 - 19h00',
      saturday: '9h00 - 17h00',
      sunday: 'Fermé',
      emergency: '24h/24 7j/7 pour urgences'
    },
    socialMedia: {
      facebook: 'https://facebook.com/duboisplomberie',
      instagram: 'https://instagram.com/duboisplomberie'
    }
  },
  
  // SEO
  seo: {
    title: 'Plombier Lyon 69001 - Dépannage 24h/24 | Plomberie Dubois',
    description: 'Plombier professionnel à Lyon 1er. Intervention rapide 24h/24 pour dépannage, fuite d\'eau, débouchage. Devis gratuit. ☎️ 06 12 34 56 78',
    keywords: [
      'plombier lyon',
      'plombier lyon 1er',
      'dépannage plomberie lyon',
      'urgence plombier lyon',
      'fuite eau lyon',
      'débouchage canalisation lyon',
      'plombier 69001',
      'plomberie dubois'
    ],
    ogImage: '/og/dubois-plomberie.jpg'
  },
  
  // Contenu
  content: {
    hero: {
      headline: 'Votre Plombier de Confiance à Lyon',
      subheadline: 'Intervention rapide 24h/24 - Devis gratuit - Plus de 15 ans d\'expérience',
      cta: '📞 Appeler maintenant',
      ctaSecondary: '📝 Devis gratuit',
      features: [
        'Intervention en moins d\'1 heure',
        'Devis gratuit et transparent',
        'Garantie décennale',
        'Artisan certifié RGE'
      ],
      backgroundImage: '/images/plumber-hero.jpg',
      stats: [
        { value: '24h/24', label: 'Disponibilité' },
        { value: '< 1h', label: 'Intervention' },
        { value: '15 ans', label: 'Expérience' },
        { value: '4.8/5', label: 'Note clients' }
      ]
    },
    services: [
      {
        icon: 'Droplets',
        title: 'Dépannage Urgent',
        description: 'Fuite d\'eau, canalisation bouchée, WC bouché... Intervention rapide 24h/24 pour tous vos problèmes de plomberie.',
        price: 'À partir de 80€',
        highlighted: true
      },
      {
        icon: 'Wrench',
        title: 'Installation Sanitaire',
        description: 'Installation complète de salle de bain, cuisine, WC. Travaux soignés et garantis.',
        price: 'Sur devis'
      },
      {
        icon: 'Home',
        title: 'Rénovation Plomberie',
        description: 'Rénovation complète de votre plomberie. Mise aux normes et modernisation.',
        price: 'Sur devis'
      },
      {
        icon: '🚿',
        title: 'Débouchage',
        description: 'Débouchage professionnel de canalisations, éviers, douches, WC avec matériel haute pression.',
        price: 'À partir de 120€'
      },
      {
        icon: '🔥',
        title: 'Chauffe-eau',
        description: 'Installation, dépannage et entretien de chauffe-eau électrique et gaz.',
        price: 'À partir de 150€'
      },
      {
        icon: '💧',
        title: 'Détection de Fuite',
        description: 'Recherche de fuite non destructive avec caméra thermique et détecteur acoustique.',
        price: 'À partir de 200€'
      }
    ],
    testimonials: [
      {
        name: 'Marie Dupont',
        role: 'Cliente particulière',
        content: 'Intervention très rapide pour une fuite d\'eau en pleine nuit. Professionnel et efficace. Je recommande vivement !',
        rating: 5,
        image: '/testimonials/marie.jpg'
      },
      {
        name: 'Jean Martin',
        role: 'Propriétaire',
        content: 'Excellent travail pour la rénovation complète de ma salle de bain. Respect des délais et du devis. Parfait !',
        rating: 5,
        image: '/testimonials/jean.jpg'
      },
      {
        name: 'Sophie Bernard',
        role: 'Syndic de copropriété',
        content: 'Nous faisons appel à Plomberie Dubois depuis 5 ans. Toujours disponibles et professionnels.',
        rating: 5,
        image: '/testimonials/sophie.jpg'
      }
    ],
    faqs: [
      {
        question: 'Intervenez-vous en urgence le week-end et les jours fériés ?',
        answer: 'Oui, nous intervenons 24h/24 et 7j/7, y compris les week-ends et jours fériés pour toutes vos urgences de plomberie.'
      },
      {
        question: 'Quels sont vos délais d\'intervention ?',
        answer: 'Pour les urgences, nous intervenons en moins d\'1 heure sur Lyon et sa proche banlieue. Pour les travaux planifiés, nous convenons d\'un rendez-vous selon vos disponibilités.'
      },
      {
        question: 'Proposez-vous des devis gratuits ?',
        answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer un devis détaillé.'
      },
      {
        question: 'Êtes-vous assurés ?',
        answer: 'Oui, nous disposons d\'une assurance responsabilité civile professionnelle et d\'une garantie décennale pour tous nos travaux.'
      },
      {
        question: 'Acceptez-vous les règlements par carte bancaire ?',
        answer: 'Oui, nous acceptons tous les modes de paiement : espèces, chèque, virement et carte bancaire sur place.'
      }
    ],
    about: {
      title: 'Plomberie Dubois, votre expert plombier à Lyon depuis 2008',
      description: 'Fort de plus de 15 ans d\'expérience, Plomberie Dubois est votre partenaire de confiance pour tous vos travaux de plomberie à Lyon et ses environs. Notre équipe de plombiers qualifiés intervient rapidement pour résoudre tous vos problèmes, du simple dépannage aux installations complètes.',
      image: '/images/team.jpg',
      features: [
        'Entreprise familiale locale',
        'Artisans certifiés RGE',
        'Plus de 5000 clients satisfaits',
        'Garantie décennale sur tous nos travaux'
      ]
    }
  },
  
  // Personnalisation
  theme: {
    colors: {
      primary: 'blue-600',
      secondary: 'gray-800',
      accent: 'orange-500',
      background: 'gray-50',
      foreground: 'gray-900'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    borderRadius: 'rounded-lg'
  },
  
  // Features
  features: {
    contactForm: true,
    onlineBooking: false,
    gallery: true,
    blog: false,
    testimonials: true,
    faq: true,
    newsletter: false,
    analytics: {
      googleAnalytics: 'G-XXXXXXXXXX',
      facebookPixel: 'XXXXXXXXXX'
    }
  }
};