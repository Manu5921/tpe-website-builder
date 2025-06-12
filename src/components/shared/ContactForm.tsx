'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { BusinessType } from '@/lib/configs/config.types';

const baseSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

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
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  customFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'time';
    options?: string[];
    required?: boolean;
  }>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  businessType,
  emailTo,
  successMessage = "Merci pour votre message ! Nous vous recontacterons dans les plus brefs délais.",
  webhookUrl,
  businessInfo,
  theme = {
    primary: 'blue-600',
    secondary: 'gray-800',
    accent: 'orange-500'
  },
  customFields = []
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Create dynamic schema based on custom fields
  const dynamicSchema = customFields.reduce((acc, field) => {
    if (field.required) {
      acc[field.name] = z.string().min(1, `${field.label} est requis`);
    } else {
      acc[field.name] = z.string().optional();
    }
    return acc;
  }, {} as Record<string, z.ZodType>);

  const formSchema = baseSchema.extend(dynamicSchema);
  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            to: emailTo,
            businessType,
            timestamp: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi du message');
        }
      } else {
        // Fallback: Use mailto link
        const subject = `Nouveau message de ${data.name}`;
        const body = `
Nom: ${data.name}
Email: ${data.email}
Téléphone: ${data.phone}

Message:
${data.message}

${customFields.map(field => {
  const value = data[field.name as keyof FormData];
  return value ? `${field.label}: ${value}` : '';
}).filter(Boolean).join('\n')}
        `.trim();
        
        window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = (fieldName: string) => {
    switch (businessType) {
      case 'plumber':
        return fieldName === 'message' 
          ? 'Décrivez votre problème de plomberie...'
          : '';
      case 'restaurant':
        return fieldName === 'message'
          ? 'Nombre de personnes, date souhaitée, occasion spéciale...'
          : '';
      case 'medical':
        return fieldName === 'message'
          ? 'Décrivez vos symptômes ou le motif de consultation...'
          : '';
      default:
        return fieldName === 'message'
          ? 'Comment pouvons-nous vous aider ?'
          : '';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {businessType === 'plumber' && "Urgence ou devis gratuit, nous sommes là pour vous"}
            {businessType === 'restaurant' && "Réservez votre table ou contactez-nous pour tout événement"}
            {businessType === 'medical' && "Prenez rendez-vous ou contactez notre secrétariat"}
            {businessType === 'legal' && "Consultez-nous pour tout conseil juridique"}
            {!['plumber', 'restaurant', 'medical', 'legal'].includes(businessType) && "Nous sommes à votre écoute"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Informations de contact
              </h3>
              
              <div className="space-y-6">
                {businessInfo?.phone && (
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      `bg-${theme.primary}/10 text-${theme.primary}`
                    )}>
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <a 
                        href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
                        className={cn(
                          "text-gray-600 hover:text-gray-900 transition-colors",
                          `hover:text-${theme.primary}`
                        )}
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {businessInfo?.email && (
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      `bg-${theme.primary}/10 text-${theme.primary}`
                    )}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a 
                        href={`mailto:${businessInfo.email}`}
                        className={cn(
                          "text-gray-600 hover:text-gray-900 transition-colors",
                          `hover:text-${theme.primary}`
                        )}
                      >
                        {businessInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {businessInfo?.address && (
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      `bg-${theme.primary}/10 text-${theme.primary}`
                    )}>
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p className="text-gray-600">{businessInfo.address}</p>
                    </div>
                  </div>
                )}

                {businessInfo?.hours && (
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      `bg-${theme.primary}/10 text-${theme.primary}`
                    )}>
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Horaires</p>
                      <p className="text-gray-600 whitespace-pre-line">{businessInfo.hours}</p>
                    </div>
                  </div>
                )}
              </div>

              {businessType === 'plumber' && (
                <div className={cn(
                  "mt-8 p-6 rounded-xl",
                  `bg-${theme.accent}/10 border border-${theme.accent}/20`
                )}>
                  <p className={cn("font-semibold mb-2", `text-${theme.accent}`)}>
                    🚨 Urgence 24h/24 7j/7
                  </p>
                  <p className="text-sm text-gray-700">
                    Pour toute urgence, appelez-nous directement
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className={cn("w-16 h-16 mx-auto mb-4", `text-${theme.primary}`)} />
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Message envoyé !</h3>
                  <p className="text-gray-600">{successMessage}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.name 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        )}
                        placeholder="Jean Dupont"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-colors",
                          errors.email 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        )}
                        placeholder="jean.dupont@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors",
                        errors.phone 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      )}
                      placeholder="06 12 34 56 78"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
                    )}
                  </div>

                  {/* Custom Fields */}
                  {customFields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          {...register(field.name as any)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        >
                          <option value="">Sélectionnez...</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          {...register(field.name as any)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        />
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors resize-none",
                        errors.message 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      )}
                      placeholder={getPlaceholder('message')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message as string}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2",
                      `bg-${theme.primary} hover:bg-${theme.primary}/90`,
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};