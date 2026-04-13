'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Trash2, Mail, Phone, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  visa_id: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
};

type Visa = {
  id: string;
  title_en: string;
};

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [visas, setVisas] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    const [leadsRes, visasRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('visas').select('id, title_en')
    ]);

    if (leadsRes.error) console.error(leadsRes.error);
    if (visasRes.error) console.error(visasRes.error);

    setLeads(leadsRes.data || []);
    
    // Create a map of visa ID to title for easy lookup
    const visaMap: Record<string, string> = {};
    (visasRes.data || []).forEach((v: Visa) => {
      visaMap[v.id] = v.title_en;
    });
    setVisas(visaMap);
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, newStatus: Lead['status']) => {
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    if (error) {
      toast.error(`Error updating status: ${error.message}`);
    } else {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      toast.success('Status updated');
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      toast.error(`Error deleting lead: ${error.message}`);
    } else {
      setLeads(leads.filter(l => l.id !== id));
      toast.success('Lead deleted');
      setDeleteConfirmId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3 h-3" /> New</span>;
      case 'contacted':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Mail className="w-3 h-3" /> Contacted</span>;
      case 'resolved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" /> Resolved</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-500">Manage customer inquiries and applications</p>
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
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium text-gray-600">Date</th>
                  <th className="p-4 font-medium text-gray-600">Customer</th>
                  <th className="p-4 font-medium text-gray-600">Contact Info</th>
                  <th className="p-4 font-medium text-gray-600">Interested In</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      {lead.message && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-xs" title={lead.message}>
                          "{lead.message}"
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-gray-600 hover:underline">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {lead.visa_id ? (visas[lead.visa_id] || lead.visa_id) : 'General Inquiry'}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className="text-sm border-gray-300 rounded-lg focus:ring-[#7C3AED] focus:border-[#7C3AED] bg-transparent"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <div className="mt-2">
                        {getStatusBadge(lead.status)}
                      </div>
                    </td>
                    <td className="p-4 flex justify-end">
                      <button onClick={() => setDeleteConfirmId(lead.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No leads found yet.
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
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => {
          if (deleteConfirmId) handleDelete(deleteConfirmId);
        }}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
