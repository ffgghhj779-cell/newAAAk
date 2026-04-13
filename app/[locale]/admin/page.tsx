import { createClient } from '@/lib/supabase/server';
import { redirect, Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Double check protection
  if (!user) {
    redirect({ href: '/admin/login', locale: 'en' });
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-[#1F2937] mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Welcome back, {user?.email}. You are successfully authenticated.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">Visas Management</h2>
              <p className="text-purple-700 mb-4">Add, edit, or remove visas from the platform.</p>
              <Link href="/admin/visas" className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Manage Visas
              </Link>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Categories Management</h2>
              <p className="text-blue-700 mb-4">Organize your visas into different categories.</p>
              <Link href="/admin/categories" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Manage Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
