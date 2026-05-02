"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Loader2, 
  Plus,
  Trash2,
  Video,
  Type,
  Calendar,
  Layers,
  Palette,
  Eye,
  Layout,
  Music
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ShowcaseFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function ShowcaseForm({ initialData, isEditing = false }: ShowcaseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const [formData, setFormData] = useState({
    titleEn: initialData?.titleEn || '',
    titleFr: initialData?.titleFr || '',
    artistName: initialData?.artistName || '',
    mediumEn: initialData?.mediumEn || '',
    mediumFr: initialData?.mediumFr || '',
    seriesEn: initialData?.seriesEn || '',
    seriesFr: initialData?.seriesFr || '',
    statementEn: initialData?.statementEn || '',
    statementFr: initialData?.statementFr || '',
    monthYear: initialData?.monthYear || '',
    galleryItems: initialData?.galleryItems ? JSON.parse(initialData.galleryItems) : []
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.set('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          galleryItems: [...prev.galleryItems, { type: 'image', url: result.url }]
        }));
      } else {
        setError('Upload failed: ' + result.error);
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const addVideoItem = () => {
    if (!videoUrlInput) return;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrlInput.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (videoId) {
      setVideoError('');
      setVideoUrlInput('');
      setShowVideoInput(false);
      setFormData(prev => ({
        ...prev,
        galleryItems: [...prev.galleryItems, { type: 'video', id: videoId }]
      }));
    } else {
      setVideoError('Invalid YouTube URL — please paste a valid youtube.com or youtu.be link.');
    }
  };

  const removeGalleryItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((_: unknown, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.galleryItems.length === 0) {
      setError('At least one gallery item is required');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isEditing ? `/api/admin/showcases/${initialData.id}` : '/api/admin/showcases';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          galleryItems: JSON.stringify(formData.galleryItems)
        })
      });

      const result = await res.json();
      if (result.success) {
        router.push('/admin/showcases');
        router.refresh();
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to save showcase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link 
            href="/admin/showcases"
            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
              <Layout size={14} />
              <span>Exhibition Builder</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              {isEditing ? 'Edit Showcase' : 'Launch New Exhibition'}
            </h1>
          </div>
        </div>
        <Button 
          type="submit"
          disabled={loading || uploading}
          className="h-14 px-10 rounded-xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:translate-y-0 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
          {isEditing ? 'Update Exhibition' : 'Publish Showcase'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Metadata */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
              <Layers size={14} className="text-blue-600" />
              Exhibition Profile
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Showcase Title (EN)</label>
                <input 
                  type="text" 
                  value={formData.titleEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                  required
                  placeholder="e.g. Echoes of Silence"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Showcase Title (FR)</label>
                <input 
                  type="text" 
                  value={formData.titleFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                  required
                  placeholder="e.g. Échos du Silence"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-slate-900 outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Artist Name</label>
                <input 
                  type="text" 
                  value={formData.artistName}
                  onChange={(e) => setFormData(prev => ({ ...prev, artistName: e.target.value }))}
                  required
                  placeholder="e.g. Elena Marchetti"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Month & Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      type="text" 
                      value={formData.monthYear}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthYear: e.target.value }))}
                      required
                      placeholder="October 2025"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Medium (EN)</label>
                  <input 
                    type="text" 
                    value={formData.mediumEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, mediumEn: e.target.value }))}
                    required
                    placeholder="Oil on Canvas"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
                <ImageIcon size={14} className="text-blue-600" />
                Mixed-Media Gallery
              </div>
              <div className="flex gap-2">
                <label className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={20} />}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
                <button type="button" onClick={() => setShowVideoInput(!showVideoInput)} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all">
                  <Video size={20} />
                </button>
              </div>
            </div>

            {showVideoInput && (
              <div className="flex gap-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in slide-in-from-top-4">
                <input 
                  type="text" 
                  value={videoUrlInput}
                  onChange={e => setVideoUrlInput(e.target.value)}
                  placeholder="Paste YouTube URL here..." 
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-50"
                />
                <button type="button" onClick={addVideoItem} className="px-4 py-2 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-all">
                  Add Video
                </button>
              </div>
            )}
            {videoError && (
              <p className="text-red-600 text-sm font-medium animate-in fade-in">{videoError}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              {formData.galleryItems.map((item: any, index: number) => (
                <div key={index} className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-200 group">
                  {item.type === 'image' ? (
                    <Image src={item.url} alt="Gallery" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-300">
                      <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                        <Video size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">YouTube Video</span>
                    </div>
                  )}
                  <button 
                    type="button"
                    onClick={() => removeGalleryItem(index)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {formData.galleryItems.length === 0 && (
                <div className="col-span-2 py-12 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl">
                  <Eye size={32} className="mb-3 opacity-30" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No Media Added</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Descriptions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
                <Palette size={14} className="text-blue-600" />
                Curatorial Narrative
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100">English</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100">French</span>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">EN</div>
                  <span className="text-xl font-black tracking-tight text-slate-900 uppercase">English Narrative</span>
                </div>
                <textarea 
                  value={formData.statementEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, statementEn: e.target.value }))}
                  required
                  rows={10}
                  placeholder="The thematic core of this exhibition..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-slate-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium leading-relaxed resize-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">FR</div>
                  <span className="text-xl font-black tracking-tight text-slate-900 uppercase">Version Française</span>
                </div>
                <textarea 
                  value={formData.statementFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, statementFr: e.target.value }))}
                  required
                  rows={10}
                  placeholder="Le noyau thématique de cette exposition..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-slate-700 outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all font-medium leading-relaxed resize-none"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-[2rem] font-bold flex items-center gap-4 shadow-sm animate-shake">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0">
                !
              </div>
              {error}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
