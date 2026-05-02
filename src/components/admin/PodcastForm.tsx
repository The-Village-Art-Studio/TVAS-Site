"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Loader2, 
  Mic
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PodcastFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function PodcastForm({ initialData, isEditing = false }: PodcastFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    titleEn: initialData?.titleEn || '',
    titleFr: initialData?.titleFr || '',
    artist: initialData?.artist || '',
    descriptionEn: initialData?.descriptionEn || '',
    descriptionFr: initialData?.descriptionFr || '',
    youtubeId: initialData?.youtubeId || '',
    listenUrl: initialData?.listenUrl || '',
    imageUrl: initialData?.imageUrl || '/podcast-cover.png'
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
        setFormData(prev => ({ ...prev, imageUrl: result.url }));
      } else {
        setError('Upload failed: ' + result.error);
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isEditing ? `/api/admin/podcasts/${initialData.id}` : '/api/admin/podcasts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        router.push('/admin/podcasts');
        router.refresh();
      } else {
        setError(result.error || 'Something went wrong');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to save podcast');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-20 max-w-4xl">
      <div className="flex items-center justify-between sticky top-0 z-20 bg-slate-50/80 backdrop-blur-xl py-6 border-b border-slate-200/50 -mx-8 px-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/podcasts" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              {isEditing ? 'Edit Episode' : 'New Episode'}
            </h1>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading || uploading}
          className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} className="mr-2" />}
          {loading ? 'Saving...' : 'Save Episode'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Basic Info */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Title (English)</label>
              <input 
                type="text" 
                value={formData.titleEn}
                onChange={e => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Title (French)</label>
              <input 
                type="text" 
                value={formData.titleFr}
                onChange={e => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Artist Name</label>
              <input 
                type="text" 
                value={formData.artist}
                onChange={e => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">YouTube Video ID</label>
              <input 
                type="text" 
                value={formData.youtubeId}
                onChange={e => setFormData(prev => ({ ...prev, youtubeId: e.target.value }))}
                required
                placeholder="e.g. dQw4w9WgXcQ"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Listen Now Link (Optional)</label>
              <input 
                type="text" 
                value={formData.listenUrl}
                onChange={e => setFormData(prev => ({ ...prev, listenUrl: e.target.value }))}
                placeholder="e.g. Spotify or Apple Podcasts URL"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
            <ImageIcon size={14} className="text-blue-600" />
            Cover Image (Featured Section)
          </div>
          
          <div className="flex gap-8">
            <div className="w-64 h-64 relative rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0 group">
              {formData.imageUrl ? (
                <Image src={formData.imageUrl} alt="Cover" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">No Image</span>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold cursor-pointer transition-all w-max shadow-lg shadow-slate-200">
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                {uploading ? 'Uploading...' : 'Upload Cover Image'}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </label>
              <p className="text-slate-500 text-sm font-medium">Recommended: High resolution landscape image (e.g., 1920x1080px) for the Featured section on the Home page.</p>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description (English)</label>
            <textarea 
              value={formData.descriptionEn}
              onChange={e => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
              required
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description (French)</label>
            <textarea 
              value={formData.descriptionFr}
              onChange={e => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
              required
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-200">
          {error}
        </div>
      )}
    </form>
  );
}
