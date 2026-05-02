import prisma from '@/lib/prisma';
import { 
  Mic, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Play,
  Video,
  User,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DeletePodcastButton from '@/components/admin/DeletePodcastButton';

async function getPodcasts() {
  try {
    return await prisma.podcast.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch podcasts:", error);
    return [];
  }
}

export default async function AdminPodcastsPage() {
  const podcasts = await getPodcasts();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <Mic size={16} />
            <span>Audio & Video Content</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Podcasts Archive</h1>
          <p className="text-slate-500 font-medium">Manage artist interviews and studio discussions.</p>
        </div>
        <Link 
          href="/admin/podcasts/new" 
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all whitespace-nowrap self-start"
        >
          <Plus size={20} />
          Add New Episode
        </Link>
      </div>

      {/* Grid Section */}
      {podcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <Image 
                  src={`https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`} 
                  alt={podcast.titleEn} 
                  fill 
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                  <Video size={12} fill="currentColor" />
                  YouTube
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                    {podcast.artist}
                  </div>
                </div>
                
                <h3 className="text-xl font-black tracking-tight text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {podcast.titleEn}
                </h3>
                
                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">
                  {podcast.descriptionEn}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
                  <Link 
                    href={`/admin/podcasts/edit/${podcast.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all font-bold text-xs"
                  >
                    <Edit2 size={14} />
                    Edit
                  </Link>
                  <DeletePodcastButton id={podcast.id} title={podcast.titleEn} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
            <Mic size={32} />
          </div>
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-xs text-slate-500 mb-2">No podcast episodes</p>
            <p className="text-sm font-medium text-slate-400">Start documenting studio stories by adding your first episode.</p>
          </div>
          <Link 
            href="/admin/podcasts/new" 
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Add First Episode
          </Link>
        </div>
      )}
    </div>
  );
}
