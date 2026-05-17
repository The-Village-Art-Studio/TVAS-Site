"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Loader2, 
  Mic,
  Plus,
  Trash2,
  Type,
  Video,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ImageCropper from './ImageCropper';

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

  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setTempImage(reader.result);
        setShowCropper(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const onCropComplete = async (cropArea: any) => {
    if (!selectedFile) return;
    
    setShowCropper(false);
    setUploading(true);
    setError('');

    const data = new FormData();
    data.set('file', selectedFile);
    data.set('type', 'podcast'); // Triggers 800x800 square on server
    
    data.set('cropX', Math.round(cropArea.x).toString());
    data.set('cropY', Math.round(cropArea.y).toString());
    data.set('cropWidth', Math.round(cropArea.width).toString());
    data.set('cropHeight', Math.round(cropArea.height).toString());

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
      setTempImage(null);
      setSelectedFile(null);
    }
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const getWordCount = (str: string) => str.trim().split(/\s+/).filter(Boolean).length;
  const WORD_LIMIT = 50;

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
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Video size={14} className="text-red-600" />
                YouTube Video Link or ID
              </label>
              <input 
                type="text" 
                value={formData.youtubeId}
                onChange={e => setFormData(prev => ({ ...prev, youtubeId: extractYoutubeId(e.target.value) }))}
                required
                placeholder="Paste YouTube link here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <LinkIcon size={14} className="text-blue-600" />
                Listen Now Link (Optional)
              </label>
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
            Cover Image (Square 800x800)
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-64 h-64 relative rounded-[2rem] overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 flex-shrink-0 group cursor-pointer hover:border-blue-300 transition-all">
              {formData.imageUrl ? (
                <>
                  <Image src={formData.imageUrl} alt="Cover" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Button type="button" variant="destructive" className="rounded-xl font-bold" onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}>
                      <Trash2 size={18} className="mr-2" /> Replace
                    </Button>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Plus size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Cover</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>
            <div className="flex-1 space-y-4 py-4">
              <h4 className="font-bold text-slate-900">Featured Episode Artwork</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Upload a high-quality image for this episode. You will be able to crop it to a perfect 800x800 square after selection.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 w-max px-3 py-1 rounded-full border border-blue-100">
                <span>Standardized 1:1 Aspect Ratio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description (English)</label>
              <span className={`text-[10px] font-black uppercase tracking-widest ${getWordCount(formData.descriptionEn) > WORD_LIMIT ? 'text-red-500' : 'text-slate-400'}`}>
                {getWordCount(formData.descriptionEn)} / {WORD_LIMIT} Words
              </span>
            </div>
            <textarea 
              value={formData.descriptionEn}
              onChange={e => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
              required
              rows={4}
              placeholder="Tell the story behind this episode..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description (French)</label>
              <span className={`text-[10px] font-black uppercase tracking-widest ${getWordCount(formData.descriptionFr) > WORD_LIMIT ? 'text-red-500' : 'text-slate-400'}`}>
                {getWordCount(formData.descriptionFr)} / {WORD_LIMIT} Words
              </span>
            </div>
            <textarea 
              value={formData.descriptionFr}
              onChange={e => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
              required
              rows={4}
              placeholder="Racontez l'histoire de cet épisode..."
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

      {showCropper && tempImage && (
        <ImageCropper
          image={tempImage}
          onCropComplete={onCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setTempImage(null);
            setSelectedFile(null);
          }}
          aspect={1}
        />
      )}
    </form>
  );
}
