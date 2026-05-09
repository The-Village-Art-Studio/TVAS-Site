import prisma from '@/lib/prisma';
import { 
  Star, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Calendar,
  MapPin,
  ExternalLink,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import DeleteEventButton from '@/components/admin/DeleteEventButton';

async function getEvents() {
  try {
    return await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <Star size={16} />
            <span>Community Gatherings</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Studio Events</h1>
          <p className="text-slate-500 font-medium">Manage workshops, exhibitions, and community meetups.</p>
        </div>
        <Link 
          href="/admin/events/new" 
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all whitespace-nowrap self-start"
        >
          <Plus size={20} />
          Create New Event
        </Link>
      </div>

      {/* Grid Section */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image 
                  src={event.imageUrl} 
                  alt={event.titleEn} 
                  fill 
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                    Workshop
                  </span>
                  <Link href={event.link || '#'} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={16} />
                  </Link>
                </div>
                
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {event.titleEn}
                </h3>
                
                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">
                  {event.descriptionEn}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link 
                      href={`/admin/events/edit/${event.id}`}
                      className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <DeleteEventButton id={event.id} title={event.titleEn} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
            <Star size={32} />
          </div>
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-xs text-slate-500 mb-2">No upcoming events</p>
            <p className="text-sm font-medium text-slate-400">Host a workshop or exhibition to engage your community.</p>
          </div>
          <Link 
            href="/admin/events/new" 
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Schedule New Event
          </Link>
        </div>
      )}
    </div>
  );
}
