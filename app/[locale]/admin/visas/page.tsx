'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

const visaSchema = z.object({
  id: z.string().min(1, "ID is required"),
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  title_ar: z.string().min(1, "Arabic title is required"),
  title_en: z.string().min(1, "English title is required"),
  desc_short_ar: z.string().min(1, "Short description (AR) is required"),
  desc_short_en: z.string().min(1, "Short description (EN) is required"),
  desc_full_ar: z.string().min(1, "Full description (AR) is required"),
  desc_full_en: z.string().min(1, "Full description (EN) is required"),
  price: z.number().nullable(),
  currency: z.string().nullable(),
  duration_ar: z.string().min(1, "Duration (AR) is required"),
  duration_en: z.string().min(1, "Duration (EN) is required"),
  requirements_ar: z.array(z.string()),
  requirements_en: z.array(z.string()),
  is_active: z.boolean(),
  image: z.string().min(1, "Image is required")
});

type Visa = z.infer<typeof visaSchema>;
type Category = { id: string; title_en: string; title_ar: string };

export default function VisasAdmin() {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const defaultForm: Visa = {
    id: '', slug: '', categoryId: '', title_ar: '', title_en: '',
    desc_short_ar: '', desc_short_en: '', desc_full_ar: '', desc_full_en: '',
    price: null, currency: 'USD', duration_ar: '', duration_en: '',
    requirements_ar: [''], requirements_en: [''], is_active: true, image: ''
  };

  const [formData, setFormData] = useState<Visa>(defaultForm);
  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    const [visasRes, catRes] = await Promise.all([
      supabase.from('visas').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('id, title_en, title_ar').order('id')
    ]);

    if (visasRes.error) console.error(visasRes.error);
    if (catRes.error) console.error(catRes.error);

    setVisas(visasRes.data || []);
    setCategories(catRes.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (visa?: Visa) => {
    setError(null);
    setImageFile(null);
    if (visa) {
      setFormData(visa);
      setEditingId(visa.id);
      setImagePreview(visa.image);
    } else {
      setFormData({ ...defaultForm, categoryId: categories[0]?.id || '' });
      setEditingId(null);
      setImagePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.image; // Return existing if no new file

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('visa-images')
      .upload(filePath, imageFile);

    if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

    const { data } = supabase.storage.from('visa-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // 1. Upload image if exists
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const dataToValidate = { ...formData, image: imageUrl };
      
      // 2. Validate
      const validData = visaSchema.parse(dataToValidate);

      // 3. Save to DB
      if (editingId) {
        const { error: updateError } = await supabase
          .from('visas')
          .update(validData)
          .eq('id', editingId);
        if (updateError) throw updateError;
        toast.success('Visa updated successfully');
      } else {
        const { error: insertError } = await supabase
          .from('visas')
          .insert([validData]);
        if (insertError) throw insertError;
        toast.success('Visa created successfully');
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        toast.error(err.message || 'Failed to save visa.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('visas').delete().eq('id', id);
    if (error) {
      toast.error(`Error deleting: ${error.message}`);
    } else {
      toast.success('Visa deleted successfully');
      setDeleteConfirmId(null);
      fetchData();
    }
  };

  // Array helpers
  const updateReq = (lang: 'ar' | 'en', index: number, val: string) => {
    const key = `requirements_${lang}` as const;
    const newArr = [...formData[key]];
    newArr[index] = val;
    setFormData({ ...formData, [key]: newArr });
  };
  const addReq = (lang: 'ar' | 'en') => {
    const key = `requirements_${lang}` as const;
    setFormData({ ...formData, [key]: [...formData[key], ''] });
  };
  const removeReq = (lang: 'ar' | 'en', index: number) => {
    const key = `requirements_${lang}` as const;
    setFormData({ ...formData, [key]: formData[key].filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visas</h1>
          <p className="text-gray-500">Manage all visa offerings</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Visa
        </Button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 space-y-4">
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-12 w-full rounded-lg" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-600">Image</th>
                  <th className="p-4 font-medium text-gray-600">Title (EN)</th>
                  <th className="p-4 font-medium text-gray-600">Category</th>
                  <th className="p-4 font-medium text-gray-600">Price</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visas.map((visa) => (
                  <tr key={visa.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      {visa.image ? (
                        <img src={visa.image} alt={visa.title_en} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-gray-900 font-medium">{visa.title_en}</td>
                    <td className="p-4 text-gray-600">
                      {categories.find(c => c.id === visa.categoryId)?.title_en || visa.categoryId}
                    </td>
                    <td className="p-4 text-gray-600">{visa.price ? `${visa.price} ${visa.currency}` : 'Custom'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${visa.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {visa.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(visa)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirmId(visa.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {visas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No visas found. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        title="Delete Visa"
        message="Are you sure you want to delete this visa? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => {
          if (deleteConfirmId) handleDelete(deleteConfirmId);
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Visa' : 'New Visa'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="visa-form" onSubmit={handleSave} className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                    {error}
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID (e.g., v1)</label>
                    <input type="text" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} disabled={!!editingId} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none disabled:bg-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (e.g., dubai-tourist)</label>
                    <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none bg-white">
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.title_en}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 text-[#7C3AED] rounded border-gray-300 focus:ring-[#7C3AED]" />
                      <span className="ml-2 text-sm font-medium text-gray-700">Active (Visible to public)</span>
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visa Image</label>
                  <div className="flex items-center gap-4">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-gray-200" />
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />
                      <p className="text-xs text-gray-500 mt-2">Recommended size: 800x600px. Max 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Titles & Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">English Content</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input type="text" value={formData.title_en} onChange={(e) => setFormData({...formData, title_en: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                      <textarea value={formData.desc_short_en} onChange={(e) => setFormData({...formData, desc_short_en: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                      <textarea value={formData.desc_full_en} onChange={(e) => setFormData({...formData, desc_full_en: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration text (e.g., "30 Days")</label>
                      <input type="text" value={formData.duration_en} onChange={(e) => setFormData({...formData, duration_en: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                    </div>
                  </div>

                  <div className="space-y-4" dir="rtl">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">المحتوى العربي</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                      <input type="text" value={formData.title_ar} onChange={(e) => setFormData({...formData, title_ar: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">وصف قصير</label>
                      <textarea value={formData.desc_short_ar} onChange={(e) => setFormData({...formData, desc_short_ar: e.target.value})} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">وصف كامل</label>
                      <textarea value={formData.desc_full_ar} onChange={(e) => setFormData({...formData, desc_full_ar: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">مدة التأشيرة (مثال: "٣٠ يوم")</label>
                      <input type="text" value={formData.duration_ar} onChange={(e) => setFormData({...formData, duration_ar: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (Leave empty if custom)</label>
                    <input type="number" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value ? parseFloat(e.target.value) : null})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <input type="text" value={formData.currency || ''} onChange={(e) => setFormData({...formData, currency: e.target.value})} placeholder="USD, AED, etc." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                  </div>
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Requirements (EN)</label>
                      <button type="button" onClick={() => addReq('en')} className="text-xs text-[#7C3AED] font-medium hover:underline">+ Add Item</button>
                    </div>
                    <div className="space-y-2">
                      {formData.requirements_en.map((req, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={req} onChange={(e) => updateReq('en', i, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none text-sm" placeholder="e.g., Valid Passport" />
                          <button type="button" onClick={() => removeReq('en', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div dir="rtl">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">المتطلبات (AR)</label>
                      <button type="button" onClick={() => addReq('ar')} className="text-xs text-[#7C3AED] font-medium hover:underline">+ إضافة عنصر</button>
                    </div>
                    <div className="space-y-2">
                      {formData.requirements_ar.map((req, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={req} onChange={(e) => updateReq('ar', i, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] outline-none text-sm" placeholder="مثال: جواز سفر صالح" />
                          <button type="button" onClick={() => removeReq('ar', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="visa-form" disabled={isSaving} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isSaving ? 'Saving...' : 'Save Visa'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
