import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlumberTemplate } from '@/components/templates/plumber/PlumberTemplate';
import { duboisPlomberieConfig } from '@/lib/configs/clients/dubois-plomberie';
import { generateMetadata as generateSEOMetadata, generateStructuredData } from '@/lib/utils/seo';
import { ClientConfig } from '@/lib/configs/config.types';

// Configuration des clients disponibles
const clientConfigs: Record<string, ClientConfig> = {
  'dubois-plomberie': duboisPlomberieConfig,
  // Ajouter d'autres configurations ici
};

interface PageProps {
  params: Promise<{
    client: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { client } = await params;
  const config = clientConfigs[client];
  
  if (!config) {
    return {
      title: 'Page non trouvée',
      description: 'Cette page n\'existe pas.'
    };
  }

  return generateSEOMetadata(config.seo, config.business);
}

export default async function ClientPage({ params }: PageProps) {
  const { client } = await params;
  const config = clientConfigs[client];

  if (!config) {
    notFound();
  }

  // Injecter les données structurées pour le SEO
  const structuredData = generateStructuredData(config.business, config.content.services);

  return (
    <>
      {/* Données structurées pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Rendu du template selon le type */}
      {config.template === 'plumber' && <PlumberTemplate config={config} />}
      {/* Ajouter d'autres templates ici */}
      {config.template === 'restaurant' && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Template Restaurant
            </h1>
            <p className="text-gray-600">
              Template en cours de développement pour {config.business.name}
            </p>
          </div>
        </div>
      )}
      {config.template === 'medical' && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Template Médical
            </h1>
            <p className="text-gray-600">
              Template en cours de développement pour {config.business.name}
            </p>
          </div>
        </div>
      )}
      {config.template === 'legal' && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Template Juridique
            </h1>
            <p className="text-gray-600">
              Template en cours de développement pour {config.business.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Génération statique des pages pour les clients connus
export function generateStaticParams() {
  return Object.keys(clientConfigs).map((client) => ({
    client,
  }));
}