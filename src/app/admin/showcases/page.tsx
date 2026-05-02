import prisma from '@/lib/prisma';
import { 
  Palette, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Calendar,
  Star,
  Layout
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DeleteShowcaseButton from '@/components/admin/DeleteShowcaseButton';

async function getShowcases() {
  try {
    return await prisma.showcase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch showcases:", error);
    return [];
  }
}

export default async function AdminShowcasesPage() {
  const showcases = await getShowcases();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <Layout size={16} />
            <span>Exhibition Archive</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Showcases</h1>
          <p className="text-slate-500 font-medium">Manage monthly featured artists and the exhibition archive.</p>
        </div>
        <Link 
          href="/admin/showcases/new" 
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:translate-y-0 whitespace-nowrap self-start"
        >
          <Plus size={20} />
          Create New Showcase
        </Link>
      </div>

      {/* Grid Section */}
      {showcases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {showcases.map((showcase, index) => (
            <div key={showcase.id} className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col lg:flex-row hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="relative w-full lg:w-80 aspect-video lg:aspect-square overflow-hidden flex-shrink-0 bg-slate-100">
                {(() => {
                  try {
                    const gallery = JSON.parse(showcase.galleryItems);
                    const firstImage = gallery.find((item: any) => item.type === 'image');
                    return firstImage ? (
                      <Image 
                        src={firstImage.url} 
                        alt={showcase.titleEn} 
                        fill 
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Palette size={48} />
                      </div>
                    );
                  } catch (e) {
                    return <div className="w-full h-full flex items-center justify-center text-slate-300"><Palette size={48} /></div>;
                  }
                })()}
                
                {index === 0 && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                    <Star size={12} fill="currentColor" />
                    Current Feature
                  </div>
                )}
              </div>

              <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                    {showcase.artistName}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Calendar size={12} className="text-slate-300" />
                    {showcase.monthYear}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {showcase.titleEn}
                </h3>
                
                <p className="text-base text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed max-w-2xl">
                  {showcase.statementEn}
                </p>

                <div className="flex items-center gap-3">
                  <Link 
                    href={`/admin/showcases/edit/${showcase.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all font-bold text-xs"
                  >
                    <Edit2 size={14} />
                    Edit Showcase
                  </Link>
                  <DeleteShowcaseButton id={showcase.id} title={showcase.titleEn} />
                  
                  <Link href={`/showcase/${showcase.id}`} target="_blank" className="ml-auto w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
            <Palette size={32} />
          </div>
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-xs text-slate-500 mb-2">No showcases found</p>
            <p className="text-sm font-medium text-slate-400">Create your first exhibition to feature an artist.</p>
          </div>
          <Link 
            href="/admin/showcases/new" 
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Create New Showcase
          </Link>
        </div>
      )}
    </div>
  );
}
