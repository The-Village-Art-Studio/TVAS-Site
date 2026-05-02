import prisma from '@/lib/prisma';
import { 
  Users, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  MoreVertical,
  UserCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DeleteMemberButton from '@/components/admin/DeleteMemberButton';

async function getMembers() {
  try {
    return await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return [];
  }
}

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <UserCircle size={16} />
            <span>Community Management</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Artists Directory</h1>
          <p className="text-slate-500 font-medium">Manage artist profiles, statements, and social presence.</p>
        </div>
        <Link 
          href="/admin/members/new" 
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:translate-y-0 whitespace-nowrap self-start"
        >
          <Plus size={20} />
          Add New Artist
        </Link>
      </div>

      {/* Toolbar Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search artists by name or type..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all text-slate-900"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="flex-1 md:flex-none bg-slate-50 border border-slate-200 rounded-xl py-3 px-6 text-sm font-bold uppercase tracking-widest outline-none focus:bg-white focus:border-blue-600 transition-all cursor-pointer text-slate-700">
            <option value="">All Types</option>
            <option value="painter">Painter</option>
            <option value="photographer">Photographer</option>
            <option value="sculptor">Sculptor</option>
            <option value="digital">Digital</option>
          </select>
        </div>
      </div>

      {/* Grid Section */}
      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <Image 
                  src={member.imageUrl} 
                  alt={member.name} 
                  fill 
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <Link 
                    href={`/admin/members/edit/${member.id}`}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-lg transition-all"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <DeleteMemberButton id={member.id} name={member.name} />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                    {member.type}
                  </span>
                  <Link href={`/members/${member.id}`} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={16} />
                  </Link>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 leading-relaxed">
                  {member.statementEn}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    ID: {member.id.substring(0, 8)}
                  </span>
                  <button className="text-slate-400 hover:text-slate-900 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-6 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
            <Users size={32} />
          </div>
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-xs text-slate-500 mb-2">No artists found</p>
            <p className="text-sm font-medium text-slate-400">Start building your community by adding the first artist profile.</p>
          </div>
          <Link 
            href="/admin/members/new" 
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Create Artist Profile
          </Link>
        </div>
      )}
    </div>
  );
}
