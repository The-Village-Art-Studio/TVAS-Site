import prisma from '@/lib/prisma';
import { 
  Users, 
  Palette, 
  MessageSquare, 
  ArrowUpRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from '@/i18n/routing';

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
    { name: 'Total Members', value: stats.members, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Showcases', value: stats.showcases, icon: Palette, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'New Leads', value: stats.leads, icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Dashboard Overview</h1>
        <p className="text-zinc-500 font-medium tracking-wide">Welcome back. Here is what&apos;s happening at the studio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 group hover:border-white/10 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight className="text-zinc-700 group-hover:text-white transition-colors" size={20} />
            </div>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">{stat.name}</p>
            <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} className="text-primary" />
              <h3 className="font-bold tracking-tight text-xl">Recent Leads</h3>
            </div>
            <Link href="/admin/leads" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
              View All
            </Link>
          </div>
          <div className="flex-1">
            {recentLeads.length > 0 ? (
              <div className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-zinc-200 group-hover:text-white transition-colors">{lead.name}</h4>
                      <span className="text-[10px] text-zinc-600 flex items-center gap-1.5 font-bold uppercase tracking-widest">
                        <Clock size={10} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-1 font-medium">{lead.email}</p>
                    <p className="text-sm text-zinc-400 line-clamp-1 italic">&quot;{lead.message}&quot;</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-zinc-600 gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <p className="font-bold uppercase tracking-[0.2em] text-[10px]">No leads yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col">
          <h3 className="font-bold tracking-tight text-xl mb-8 flex items-center gap-3">
            <Clock size={20} className="text-primary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/admin/members" 
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all group flex flex-col gap-4"
            >
              <Users className="text-zinc-500 group-hover:text-primary transition-colors" />
              <span className="font-bold tracking-tight">Add New Member</span>
            </Link>
            <Link 
              href="/admin/showcases" 
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all group flex flex-col gap-4"
            >
              <Palette className="text-zinc-500 group-hover:text-primary transition-colors" />
              <span className="font-bold tracking-tight">Create Showcase</span>
            </Link>
            <Link 
              href="/admin/podcasts" 
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 transition-all group flex flex-col gap-4"
            >
              <Mic className="text-zinc-500 group-hover:text-primary transition-colors" />
              <span className="font-bold tracking-tight">Upload Podcast</span>
            </Link>
            <Link 
              href="/" 
              target="_blank"
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group flex flex-col gap-4"
            >
              <ExternalLink className="text-zinc-500 group-hover:text-white transition-colors" />
              <span className="font-bold tracking-tight">Visit Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
