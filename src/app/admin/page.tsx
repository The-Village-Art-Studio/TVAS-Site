import prisma from '@/lib/prisma';
import { 
  Users, 
  Palette, 
  MessageSquare, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Mic,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

async function getStats() {
  try {
    const [membersCount, showcasesCount, leadsCount] = await Promise.all([
      prisma.member.count(),
      prisma.showcase.count(),
      prisma.lead.count(),
    ]);

    return {
      members: membersCount,
      showcases: showcasesCount,
      leads: leadsCount,
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return { members: 0, showcases: 0, leads: 0 };
  }
}

async function getRecentLeads() {
  try {
    return await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentLeads = await getRecentLeads();

  const statCards = [
    { name: 'Total Members', value: stats.members, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { name: 'Showcases', value: stats.showcases, icon: Palette, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { name: 'New Leads', value: stats.leads, icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Dashboard Overview</h1>
        <p className="text-slate-500 font-medium">Welcome back. Manage your content and community here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className={`bg-white border ${stat.border} rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                <stat.icon size={22} />
              </div>
              <ArrowUpRight className="text-slate-300" size={18} />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.name}</p>
            <h3 className="text-3xl font-black tracking-tight text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <MessageSquare size={16} />
              </div>
              <h3 className="font-bold tracking-tight text-lg text-slate-900">Recent Leads</h3>
            </div>
            <Link href="/admin/leads" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
              View All
            </Link>
          </div>
          <div className="flex-1">
            {recentLeads.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="p-5 hover:bg-slate-50 transition-colors group">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{lead.name}</h4>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold uppercase tracking-widest">
                        <Calendar size={10} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">{lead.email}</p>
                    <p className="text-xs text-slate-400 line-clamp-1 italic text-balance">&quot;{lead.message}&quot;</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <p className="font-bold uppercase tracking-widest text-[9px]">No recent leads</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
            <h3 className="font-bold tracking-tight text-lg text-slate-900">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/admin/members" 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group flex flex-col gap-3"
            >
              <Users className="text-slate-400 group-hover:text-blue-600 transition-colors" size={20} />
              <span className="font-bold tracking-tight text-sm text-slate-700 group-hover:text-blue-700">Add Member</span>
            </Link>
            <Link 
              href="/admin/showcases" 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group flex flex-col gap-3"
            >
              <Palette className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={20} />
              <span className="font-bold tracking-tight text-sm text-slate-700 group-hover:text-indigo-700">New Showcase</span>
            </Link>
            <Link 
              href="/admin/podcasts" 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:bg-violet-50 transition-all group flex flex-col gap-3"
            >
              <Mic className="text-slate-400 group-hover:text-violet-600 transition-colors" size={20} />
              <span className="font-bold tracking-tight text-sm text-slate-700 group-hover:text-violet-700">Upload Podcast</span>
            </Link>
            <Link 
              href="/" 
              target="_blank"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white transition-all group flex flex-col gap-3"
            >
              <ExternalLink className="text-slate-400 group-hover:text-slate-900 transition-colors" size={20} />
              <span className="font-bold tracking-tight text-sm text-slate-700 group-hover:text-slate-900">Visit Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
