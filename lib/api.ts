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
  const { data, error } = await supabase.from('categories').select('*').order('id');
  if (error) {
    console.error('Error fetching categories from Supabase:', error);
    return [];
  }
  return (data || []) as VisaCategory[];
}, ['categories'], { revalidate: 60, tags: ['categories'] });

export const getVisas = unstable_cache(async (): Promise<Visa[]> => {
  const { data, error } = await supabase.from('visas').select('*').eq('is_active', true).order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching visas from Supabase:', error);
    return [];
  }
  return (data || []) as Visa[];
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
