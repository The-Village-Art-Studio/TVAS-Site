"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  Mic, 
  Calendar, 
  Star, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Home
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads (CRM)', href: '/admin/leads', icon: MessageSquare },
  { name: 'Village Members', href: '/admin/members', icon: Users },
  { name: 'Showcases', href: '/admin/showcases', icon: Palette },
  { name: 'Podcasts', href: '/admin/podcasts', icon: Mic },
  { name: 'Workshops', href: '/admin/workshops', icon: Calendar },
  { name: 'Events', href: '/admin/events', icon: Star },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = "tvas_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900/50 backdrop-blur-2xl border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-12">
              <Image src="/logo.png" width={32} height={32} alt="Logo" />
              <span className="font-black tracking-tighter text-xl">TVAS ADMIN</span>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      router.push(item.href);
                      setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-zinc-500 hover:bg-white/5 hover:text-white'}
                    `}
                  >
                    <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-primary transition-colors'} />
                    <span className="font-bold tracking-wide text-sm">{item.name}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-white/5">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-zinc-500 hover:bg-white/5 hover:text-white transition-all mb-2"
            >
              <Home size={20} />
              <span className="font-bold tracking-wide text-sm">View Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={20} />
              <span className="font-bold tracking-wide text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-zinc-900/30 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 lg:px-12 flex-shrink-0">
          <button 
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em]">
              {navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold tracking-tight">Jacky Ho</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Founder</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black shadow-inner">
              JH
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </div>
  );
}
