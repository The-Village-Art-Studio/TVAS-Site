"use client";

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  MessageSquare, 
  LogOut, 
  Menu, 
  ChevronRight,
  Home,
  Mic,
  Star
} from 'lucide-react';
import Image from 'next/image';

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Showcases', href: '/admin/showcases', icon: Palette },
  { name: 'Leads', href: '/admin/leads', icon: MessageSquare },
  { name: 'Podcasts', href: '/admin/podcasts', icon: Mic },
  { name: 'Events', href: '/admin/events', icon: Star },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "tvas_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push('/admin/login');
  };

  // If we are on the login page, just show the content without the sidebar shell
  if (pathname === '/admin/login') {
    return <div className="relative z-10">{children}</div>;
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center p-2 shadow-lg shadow-blue-200">
                <Image src="/logo.png" width={32} height={32} alt="Logo" className="brightness-0 invert object-contain" />
              </div>
              <span className="font-black tracking-tighter text-xl text-slate-900 uppercase">TVAS Admin</span>
            </div>

            <nav className="space-y-1">
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
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <item.icon size={20} className={isActive ? 'text-blue-600' : 'group-hover:text-slate-700 transition-colors'} />
                    <span className="text-sm uppercase tracking-wider font-semibold">{item.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-100">
            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all mb-1"
            >
              <Home size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">View Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold uppercase tracking-wider">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white/50">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 lg:px-12 flex-shrink-0">
          <button 
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:block">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              <span>System</span>
              <ChevronRight size={12} />
              <span className="text-blue-600">
                {navigation.find(n => n.href === pathname)?.name || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">Jacky Ho</span>
              <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Founder</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-black shadow-sm">
              JH
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
