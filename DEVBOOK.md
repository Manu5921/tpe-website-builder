# 📚 DEVBOOK - Plateforme de Création de Sites Web pour PME/TPE

> **Dernière mise à jour :** 06/12/2024  
> **Version :** 1.0.0  
> **Statut :** En développement actif

## 📋 Table des Matières

1. [Vue d'ensemble du Projet](#vue-densemble-du-projet)
2. [Cahier des Charges](#cahier-des-charges)
3. [Architecture Technique](#architecture-technique)
4. [État d'Avancement](#état-davancement)
5. [Guide de Développement](#guide-de-développement)
6. [API et Composants](#api-et-composants)
7. [Déploiement et Production](#déploiement-et-production)

---

## 🎯 Vue d'ensemble du Projet

### Concept
Plateforme permettant de créer et déployer des sites web professionnels pour les PME/TPE locales (plombiers, restaurants, dentistes, etc.) en moins de 48h, avec un design premium et une approche 100% modulaire.

### Objectifs Business
- **Livraison :** Site complet en 48h maximum
- **Prix :** 497€ à 1497€ par site
- **Maintenance :** 29€/mois récurrent
- **Cible :** Artisans et petites entreprises locales
- **Volume :** Capacité de produire 10-20 sites/mois

### Proposition de Valeur
- Design moderne qui impressionne ("effet WOW")
- Optimisation SEO local intégrée
- 100% responsive et performant
- Process industrialisé avec l'IA
- Prix compétitif vs agences traditionnelles

---

## 📝 Cahier des Charges

### Fonctionnalités Essentielles

#### 1. **Système de Templates Modulaires**
- Templates par métier (plombier, restaurant, médical, juridique)
- Composants 100% réutilisables et configurables
- Thèmes de couleurs personnalisables
- Support multi-langue (FR prioritaire)

#### 2. **Composants Principaux**
- **HeroSection** : Section d'accueil avec animations
- **ServicesGrid** : Grille de services flexible
- **ContactForm** : Formulaire de contact intelligent
- **FAQ** : Section questions fréquentes
- **Testimonials** : Témoignages clients
- **Gallery** : Galerie photos/réalisations
- **Footer** : Pied de page avec SEO local
- **CTASection** : Sections d'appel à l'action
- **PricingTable** : Tableau de tarifs
- **Navigation** : Menu responsive

#### 3. **Fonctionnalités Techniques**
- **Performance** : Score Lighthouse > 95
- **SEO** : Schema.org, sitemap dynamique, meta tags
- **Analytics** : Google Analytics, Facebook Pixel
- **Accessibilité** : WCAG 2.1 AA compliant
- **Sécurité** : Headers sécurisés, HTTPS obligatoire

#### 4. **Gestion des Clients**
- Configuration par fichier JSON/TypeScript
- Base de données Supabase pour tracking
- Dashboard admin (futur)
- Système de leads/contacts

#### 5. **Automatisation**
- Script de génération de nouveau client
- Déploiement automatique sur Vercel
- Export PDF pour impression
- Backup automatique des configurations

### Design Guidelines

#### Principes
1. **Moderne** : Utiliser les dernières tendances (glassmorphism, gradients, ombres douces)
2. **Impressionnant** : Animations subtiles, transitions fluides
3. **Professionnel** : Cohérence visuelle, hiérarchie claire
4. **Émotionnel** : Créer une connexion avec le visiteur

#### Palette de Couleurs par Métier
- **Plombier** : Bleu (confiance) + Orange (urgence)
- **Restaurant** : Ambre (chaleur) + Rouge (appétit)
- **Médical** : Teal (santé) + Blanc (propreté)
- **Juridique** : Gris ardoise (sérieux) + Or (prestige)

---

## 🏗️ Architecture Technique

### Stack Technique

```yaml
Frontend:
  - Next.js: 15.3.x (App Router)
  - React: 19.0.0
  - TypeScript: Strict mode
  - Tailwind CSS: 4.0.0

UI/UX:
  - Framer Motion: Animations
  - Radix UI: Composants accessibles
  - Lucide React: Icônes
  
Forms & Validation:
  - React Hook Form: Gestion des formulaires
  - Zod: Validation des schémas
  
Backend:
  - Supabase: Base de données & Auth
  - Next.js API Routes: Endpoints
  
Déploiement:
  - Vercel: Hébergement
  - GitHub: Versioning
```

### Structure des Dossiers

```
/src
  /app                          # Routes Next.js App Router
    /[client]                   # Routes dynamiques par client
      page.tsx                  # Page principale du client
      layout.tsx                # Layout spécifique au client
    /api                        # API Routes
      /contact                  # Endpoint formulaire contact
      /analytics                # Tracking des visites
    layout.tsx                  # Layout global
    page.tsx                    # Page d'accueil (redirect ou landing)
    
  /components
    /shared                     # Composants réutilisables
      HeroSection.tsx          ✅ Créé - Hero modulaire avec animations
      ServicesGrid.tsx         ✅ Créé - Grille de services flexible
      ContactForm.tsx          ✅ Créé - Formulaire intelligent
      Navigation.tsx           ❌ À créer
      Footer.tsx               ❌ À créer
      FAQ.tsx                  ❌ À créer
      Testimonials.tsx         ❌ À créer
      Gallery.tsx              ❌ À créer
      CTASection.tsx           ❌ À créer
      PricingTable.tsx         ❌ À créer
    
    /templates                  # Templates complets par métier
      /plumber
        PlumberTemplate.tsx    ❌ À créer
      /restaurant
        RestaurantTemplate.tsx ❌ À créer
      /medical
        MedicalTemplate.tsx    ❌ À créer
      /legal
        LegalTemplate.tsx      ❌ À créer
    
    /ui                        # Composants UI de base
      Button.tsx               ❌ À créer
      Card.tsx                 ❌ À créer
      Badge.tsx                ❌ À créer
      Input.tsx                ❌ À créer
      
  /lib
    /configs
      config.types.ts          ✅ Créé - Types TypeScript
      /clients
        dubois-plomberie.ts    ✅ Créé - Config exemple
        [client-name].ts       # Autres configs clients
    
    /themes
      plumber-theme.ts         ✅ Créé
      restaurant-theme.ts      ✅ Créé
      medical-theme.ts         ❌ À créer
      legal-theme.ts           ❌ À créer
    
    /utils
      cn.ts                    ✅ Créé - Utility Tailwind
      seo.ts                   ✅ Créé - Helpers SEO
      analytics.ts             ❌ À créer
      
  /scripts
    generate-client.ts         ❌ À créer - Génération nouveau client
    deploy-client.ts           ❌ À créer - Déploiement Vercel
    export-pdf.ts              ❌ À créer - Export PDF
```

### Schéma Base de Données (Supabase)

```sql
-- Table des clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  domain TEXT UNIQUE,
  template_type TEXT NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  subscription_status TEXT DEFAULT 'trial',
  subscription_end_date DATE
);

-- Table des analytics
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des leads/contacts
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  custom_fields JSONB,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table des déploiements
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  vercel_deployment_id TEXT,
  url TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour les performances
CREATE INDEX idx_page_views_client_id ON page_views(client_id);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

---

## 📊 État d'Avancement

### ✅ Complété (30%)

1. **Infrastructure de base**
   - Projet Next.js 15.3 initialisé
   - TypeScript configuré en mode strict
   - Tailwind CSS 4.0 installé
   - Toutes les dépendances installées

2. **Architecture**
   - Structure de dossiers créée
   - Système de types TypeScript complet
   - Thèmes plombier et restaurant

3. **Composants créés**
   - **HeroSection** : 100% fonctionnel avec toutes les variantes
   - **ServicesGrid** : 4 variantes (default, compact, detailed, menu)
   - **ContactForm** : Validation Zod, champs personnalisables

4. **Configuration**
   - Exemple complet : dubois-plomberie.ts
   - Utils SEO avec données structurées

### 🚧 En cours (10%)

1. Template Plombier complet
2. Intégration des composants

### ❌ À faire (60%)

1. **Composants manquants**
   - Navigation responsive
   - Footer avec SEO local
   - FAQ accordéon
   - Testimonials avec carousel
   - Gallery avec lightbox
   - CTASection
   - PricingTable
   - Composants UI de base

2. **Templates**
   - Template Plombier complet
   - Template Restaurant
   - Template Medical
   - Template Legal

3. **Backend & Data**
   - Configuration Supabase
   - API Routes (contact, analytics)
   - Système de tracking
   - Dashboard admin

4. **Automatisation**
   - Script génération client
   - Déploiement automatique
   - Export PDF
   - Tests automatisés

5. **Production**
   - Déploiement Vercel
   - Configuration domaines
   - Monitoring
   - Documentation client

---

## 🛠️ Guide de Développement

### Installation

```bash
# Cloner le projet
git clone [url-repo]
cd tpe-website-builder

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer le développement
npm run dev
```

### Variables d'Environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# Email (pour formulaires)
RESEND_API_KEY=your-resend-key

# Vercel (pour déploiement auto)
VERCEL_TOKEN=your-vercel-token
```

### Commandes Utiles

```bash
# Développement
npm run dev              # Lancer le serveur de dev

# Build & Test
npm run build            # Build de production
npm run lint             # Linter le code
npm run type-check       # Vérifier les types

# Génération
npm run generate:client  # Créer nouveau client
npm run generate:component # Créer nouveau composant

# Déploiement
npm run deploy:preview   # Déployer en preview
npm run deploy:prod      # Déployer en production
```

### Workflow de Création d'un Nouveau Client

1. **Créer la configuration**
   ```bash
   npm run generate:client -- --name "Restaurant Le Gourmet" --type restaurant
   ```

2. **Personnaliser le contenu**
   - Éditer `/src/lib/configs/clients/restaurant-le-gourmet.ts`
   - Ajouter logos et images dans `/public/clients/restaurant-le-gourmet/`

3. **Tester localement**
   ```bash
   npm run dev
   # Visiter http://localhost:3000/restaurant-le-gourmet
   ```

4. **Déployer**
   ```bash
   npm run deploy:client -- --client restaurant-le-gourmet
   ```

### Standards de Code

1. **TypeScript**
   - Mode strict activé
   - Pas de `any` sauf absolument nécessaire
   - Interfaces pour tous les props

2. **React**
   - Composants fonctionnels uniquement
   - Hooks personnalisés dans `/hooks`
   - Props destructurés

3. **Styling**
   - Tailwind CSS uniquement
   - Pas de CSS custom sauf animations complexes
   - Utiliser `cn()` pour classes conditionnelles

4. **Naming**
   - PascalCase pour composants
   - camelCase pour fonctions/variables
   - kebab-case pour fichiers
   - UPPER_SNAKE_CASE pour constantes

---

## 🔧 API et Composants

### Composants Principaux

#### HeroSection

```typescript
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
```

**Utilisation :**
```tsx
<HeroSection
  variant="plumber"
  headline="Votre Plombier de Confiance"
  subheadline="Intervention 24h/24"
  ctaText="Appeler maintenant"
  ctaAction={() => window.location.href = 'tel:0612345678'}
  features={['Devis gratuit', 'Garantie 10 ans']}
  stats={[
    { value: '24h/24', label: 'Disponibilité' },
    { value: '< 1h', label: 'Intervention' }
  ]}
/>
```

#### ServicesGrid

```typescript
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
```

#### ContactForm

```typescript
interface ContactFormProps {
  businessType: BusinessType;
  emailTo: string;
  successMessage?: string;
  webhookUrl?: string;
  businessInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  customFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'time';
    options?: string[];
    required?: boolean;
  }>;
}
```

### API Routes

#### POST /api/contact
Envoie les formulaires de contact

**Body:**
```json
{
  "clientId": "dubois-plomberie",
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "0612345678",
  "message": "J'ai une fuite d'eau urgente",
  "customFields": {}
}
```

#### POST /api/analytics/track
Track les événements

**Body:**
```json
{
  "clientId": "dubois-plomberie",
  "event": "page_view",
  "path": "/",
  "visitorId": "unique-visitor-id"
}
```

---

## 🚀 Déploiement et Production

### Déploiement sur Vercel

1. **Configuration initiale**
   ```bash
   vercel login
   vercel link
   ```

2. **Variables d'environnement**
   - Configurer dans le dashboard Vercel
   - Ou via CLI : `vercel env add`

3. **Déploiement**
   ```bash
   # Preview
   vercel

   # Production
   vercel --prod
   ```

### Configuration des Domaines

1. **Domaine principal**
   - `plateforme.com` → Landing/Dashboard admin

2. **Sous-domaines clients**
   - `dubois-plomberie.plateforme.com`
   - Ou domaine custom : `dubois-plomberie.fr`

3. **Configuration DNS**
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```

### Monitoring

1. **Performance**
   - Vercel Analytics
   - Google PageSpeed API
   - Lighthouse CI

2. **Erreurs**
   - Sentry pour tracking
   - Logs Vercel

3. **Uptime**
   - UptimeRobot
   - Pingdom

### Checklist de Lancement

- [ ] Tests sur tous les navigateurs
- [ ] Tests responsive (mobile, tablet, desktop)
- [ ] Score Lighthouse > 95
- [ ] SSL configuré
- [ ] Redirections configurées
- [ ] Sitemap généré
- [ ] Robots.txt configuré
- [ ] Analytics installé
- [ ] Formulaires testés
- [ ] Backup configuré
- [ ] Documentation client prête

---

## 📚 Ressources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Outils
- [Figma](https://figma.com) - Design
- [Claude](https://claude.ai) - Assistant IA
- [GitHub](https://github.com) - Versioning
- [Linear](https://linear.app) - Gestion de projet

### Inspiration Design
- [Awwwards](https://awwwards.com)
- [Dribbble](https://dribbble.com)
- [Tailwind UI](https://tailwindui.com)

---

## 🤝 Contribution

### Pour les Agents IA

Quand vous travaillez sur ce projet :

1. **Toujours lire ce DEVBOOK en premier**
2. **Respecter l'architecture établie**
3. **Suivre les standards de code**
4. **Mettre à jour la section "État d'Avancement"**
5. **Documenter tout nouveau composant/fonctionnalité**

### Priorités Actuelles

1. **Finir le template Plombier** (priorité haute)
2. **Créer les composants manquants** (Navigation, Footer, FAQ)
3. **Configurer Supabase** (base de données)
4. **Créer le script de génération**
5. **Préparer le déploiement Vercel**

---

**Note :** Ce DEVBOOK est un document vivant. Mettez-le à jour à chaque changement significatif du projet.