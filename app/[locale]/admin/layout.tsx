import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/server';
import { redirect } from '@/i18n/routing';
import { LogOut, LayoutDashboard, FolderTree, FileText, Users } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: '/admin/login', locale: 'en' });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] rounded-xl transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] rounded-xl transition-colors">
            <FolderTree className="w-5 h-5" /> Categories
          </Link>
          <Link href="/admin/visas" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] rounded-xl transition-colors">
            <FileText className="w-5 h-5" /> Visas
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] rounded-xl transition-colors">
            <Users className="w-5 h-5" /> Leads
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <form action="/auth/signout" method="post">
            <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
