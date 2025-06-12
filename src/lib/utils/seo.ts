import { Metadata } from 'next';
import { SEOConfig, BusinessInfo } from '@/lib/configs/config.types';

export function generateMetadata(
  seo: SEOConfig,
  business: BusinessInfo,
  pagePath?: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${business.name.toLowerCase().replace(/\s+/g, '-')}.fr`;
  const canonicalUrl = pagePath ? `${baseUrl}${pagePath}` : baseUrl;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: business.name,
      images: seo.ogImage ? [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: business.name,
        }
      ] : [],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData(business: BusinessInfo, services?: any[]) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    image: business.logo,
    '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/#business`,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: business.address.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: business.address.coordinates.lat,
      longitude: business.address.coordinates.lng,
    } : undefined,
    openingHoursSpecification: business.openingHours ? generateOpeningHours(business.openingHours as Record<string, string | undefined>) : undefined,
    sameAs: business.socialMedia ? Object.values(business.socialMedia).filter(Boolean) : undefined,
  };

  // Add services if provided
  if (services && services.length > 0) {
    return {
      ...baseStructuredData,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
          },
          price: service.price,
          position: index + 1,
        })),
      },
    };
  }

  return baseStructuredData;
}

function generateOpeningHours(hoursData: Record<string, string | undefined>) {
  const dayMap = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  const openingHours = [];

  for (const [day, hours] of Object.entries(hoursData)) {
    if (hours && day !== 'emergency' && dayMap[day as keyof typeof dayMap]) {
      if (hours.toLowerCase() === 'fermé' || hours.toLowerCase() === 'closed') {
        continue;
      }

      const [opens, closes] = hours.split(' - ').map(time => time.replace('h', ':'));
      
      openingHours.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[day as keyof typeof dayMap],
        opens,
        closes,
      });
    }
  }

  return openingHours;
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}