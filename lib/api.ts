import { supabase } from './supabase';
import { unstable_cache } from 'next/cache';

export type VisaCategory = {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  desc_en: string;
  desc_ar: string;
  icon: string;
};

export type Visa = {
  id: string;
  slug: string;
  categoryId: string;
  title_en: string;
  title_ar: string;
  desc_short_en: string;
  desc_short_ar: string;
  desc_full_en: string;
  desc_full_ar: string;
  price: number | null;
  currency: string;
  duration_en: string;
  duration_ar: string;
  requirements_en: string[];
  requirements_ar: string[];
  image: string;
  is_active: boolean;
};

export const getCategories = unstable_cache(async (): Promise<VisaCategory[]> => {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('id');
    if (error || !data || data.length === 0) {
      throw new Error('Fallback to mock');
    }
    return data as VisaCategory[];
  } catch (err) {
    return [
      {
        id: 'cat-1',
        slug: 'tourist-visas',
        title_en: 'Tourist Visas',
        title_ar: 'تأشيرات سياحية',
        desc_en: 'Explore the world with our fast-track tourist visas.',
        desc_ar: 'اكتشف العالم مع تأشيراتنا السياحية السريعة.',
        icon: 'Plane'
      }
    ];
  }
}, ['categories'], { revalidate: 60, tags: ['categories'] });

export const getVisas = unstable_cache(async (): Promise<Visa[]> => {
  try {
    const { data, error } = await supabase.from('visas').select('*').eq('is_active', true).order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      throw new Error('Fallback to mock');
    }
    return data as Visa[];
  } catch (err) {
    return [
      {
        id: 'visa-1',
        slug: 'dubai-premium-tourist-visa',
        categoryId: 'cat-1',
        title_en: 'Dubai Premium Tourist Visa',
        title_ar: 'تأشيرة دبي السياحية المميزة',
        desc_short_en: 'A fast-track 30-day tourist visa to the United Arab Emirates.',
        desc_short_ar: 'تأشيرة سياحية سريعة لمدة 30 يوماً لدولة الإمارات العربية المتحدة.',
        desc_full_en: 'Experience the magic of Dubai with our hassle-free premium tourist visa. Processing takes only 48 hours.',
        desc_full_ar: 'عش سحر دبي مع تأشيرتنا السياحية المميزة. تستغرق المعالجة 48 ساعة فقط.',
        price: 250,
        currency: 'USD',
        duration_en: '30 Days',
        duration_ar: '30 يوم',
        requirements_en: ['Passport copy', 'Personal photo'],
        requirements_ar: ['صورة الجواز', 'صورة شخصية'],
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
        is_active: true
      }
    ];
  }
}, ['visas'], { revalidate: 60, tags: ['visas'] });

export const getVisaBySlug = unstable_cache(async (slug: string): Promise<Visa | null> => {
  const { data, error } = await supabase.from('visas').select('*').eq('slug', slug).single();
  if (error) {
    console.error(`Error fetching visa ${slug} from Supabase:`, error);
    return null;
  }
  return (data || null) as Visa | null;
}, ['visa-by-slug'], { revalidate: 60, tags: ['visas'] });

export const getCategoryBySlug = unstable_cache(async (slug: string): Promise<VisaCategory | null> => {
  const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single();
  if (error) {
    console.error(`Error fetching category ${slug} from Supabase:`, error);
    return null;
  }
  return (data || null) as VisaCategory | null;
}, ['category-by-slug'], { revalidate: 60, tags: ['categories'] });

export const getVisasByCategory = unstable_cache(async (categoryId: string): Promise<Visa[]> => {
  const { data, error } = await supabase.from('visas').select('*').eq('categoryId', categoryId).eq('is_active', true);
  if (error) {
    console.error(`Error fetching visas for category ${categoryId} from Supabase:`, error);
    return [];
  }
  return (data || []) as Visa[];
}, ['visas-by-category'], { revalidate: 60, tags: ['visas'] });
