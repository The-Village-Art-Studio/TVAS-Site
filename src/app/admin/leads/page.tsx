import prisma from '@/lib/prisma';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Mail,
  Calendar,
  User,
  Clock
} from 'lucide-react';

async function getLeads() {
  try {
    return await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return [];
  }
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <MessageSquare size={16} />
            <span>Communication Center</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Contact Leads</h1>
          <p className="text-slate-500 font-medium">Review and manage incoming inquiries from the website.</p>
        </div>
      </div>

      {/* Grid Section */}
      {leads.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {leads.map((lead) => (
            <div key={lead.id} className="group bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Lead Info */}
                <div className="lg:w-64 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-none mb-1">{lead.name}</h3>
                      <p className="text-xs text-slate-400 font-medium">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Clock size={12} className="text-slate-300" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600">
                    Subject: {lead.subject}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap italic">
                    "{lead.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-start gap-2">
                  <a 
                    href={`mailto:${lead.email}`}
                    className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                    title="Reply via Email"
                  >
                    <Mail size={16} />
                  </a>
                  <button 
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
                    title="Delete Lead"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
            <MessageSquare size={32} />
          </div>
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-xs text-slate-500 mb-2">No leads received</p>
            <p className="text-sm font-medium text-slate-400">Incoming contact form submissions will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
