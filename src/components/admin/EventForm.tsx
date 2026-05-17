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
  Type,
  Calendar,
  MapPin,
  Users,
  Clock,
  Link as LinkIcon,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ImageCropper from './ImageCropper';

interface EventFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function EventForm({ initialData, isEditing = false }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    titleEn: initialData?.titleEn || '',
    titleFr: initialData?.titleFr || '',
    descriptionEn: initialData?.descriptionEn || '',
    descriptionFr: initialData?.descriptionFr || '',
    dateEn: initialData?.dateEn || '',
    dateFr: initialData?.dateFr || '',
    order: initialData?.order || 0,
    locationEn: initialData?.locationEn || 'La Gloria Mexican Coffee, Toronto',
    locationFr: initialData?.locationFr || 'La Gloria Mexican Coffee, Toronto',
    capacityEn: initialData?.capacityEn || 'Limited to 8-12 guests',
    capacityFr: initialData?.capacityFr || 'Limité à 8-12 invités',
    durationEn: initialData?.durationEn || '2.5 - 3 hours',
    durationFr: initialData?.durationFr || '2.5 - 3 heures',
    imageUrl: initialData?.imageUrl || '',
    link: initialData?.link || ''
  });

  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDateSync = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (!dateStr) return;

    try {
      const [year, month, day] = dateStr.split('-');
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      
      const enFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });
      const frFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' });
      
      const dateEn = enFormatter.format(dateObj);
      const dateFrRaw = frFormatter.format(dateObj);
      const dateFr = dateFrRaw.replace(/^[a-z]|\s[a-z]/g, match => match.toUpperCase());

      setFormData(prev => ({
        ...prev,
        dateEn,
        dateFr
      }));
    } catch (err) {
      console.error("Error formatting date", err);
    }
  };

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
    data.set('type', 'event'); 
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isEditing ? `/api/admin/events/${initialData.id}` : '/api/admin/events';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (result.success) {
        router.push('/admin/events');
        router.refresh();
      } else {
        setError(result.details || result.error || 'Something went wrong');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to save event');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-20 max-w-4xl">
      <div className="flex items-center justify-between sticky top-0 z-20 bg-slate-50/80 backdrop-blur-xl py-6 border-b border-slate-200/50 -mx-8 px-8">
        <div className="flex items-center gap-6">
          <Link href="/admin/events" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              {isEditing ? 'Edit Event' : 'Create New Event'}
            </h1>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading || uploading}
          className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} className="mr-2" />}
          {loading ? 'Saving...' : 'Save Event'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Basic Info */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Event Title (English)</label>
              <input 
                type="text" 
                value={formData.titleEn}
                onChange={e => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Event Title (French)</label>
              <input 
                type="text" 
                value={formData.titleFr}
                onChange={e => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          {/* New Fields: Date, Order */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-4 col-span-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" />
                Select Date (Auto-syncs English & French)
              </label>
              <input 
                type="date" 
                onChange={handleDateSync}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all cursor-pointer"
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" />
                Date (English)
              </label>
              <input 
                type="text" 
                value={formData.dateEn}
                onChange={e => setFormData(prev => ({ ...prev, dateEn: e.target.value }))}
                placeholder="e.g. May 30"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" />
                Date (French)
              </label>
              <input 
                type="text" 
                value={formData.dateFr}
                onChange={e => setFormData(prev => ({ ...prev, dateFr: e.target.value }))}
                placeholder="e.g. 30 Mai"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Star size={14} className="text-blue-600" />
                Display Order
              </label>
              <input 
                type="number" 
                value={formData.order}
                onChange={e => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          {/* New Fields: Location, Capacity, Duration */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                Location (English)
              </label>
              <input 
                type="text" 
                value={formData.locationEn}
                onChange={e => setFormData(prev => ({ ...prev, locationEn: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                Location (French)
              </label>
              <input 
                type="text" 
                value={formData.locationFr}
                onChange={e => setFormData(prev => ({ ...prev, locationFr: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Users size={14} className="text-blue-600" />
                Capacity (English)
              </label>
              <input 
                type="text" 
                value={formData.capacityEn}
                onChange={e => setFormData(prev => ({ ...prev, capacityEn: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Users size={14} className="text-blue-600" />
                Capacity (French)
              </label>
              <input 
                type="text" 
                value={formData.capacityFr}
                onChange={e => setFormData(prev => ({ ...prev, capacityFr: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pb-4">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Clock size={14} className="text-blue-600" />
                Duration (English)
              </label>
              <input 
                type="text" 
                value={formData.durationEn}
                onChange={e => setFormData(prev => ({ ...prev, durationEn: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Clock size={14} className="text-blue-600" />
                Duration (French)
              </label>
              <input 
                type="text" 
                value={formData.durationFr}
                onChange={e => setFormData(prev => ({ ...prev, durationFr: e.target.value }))}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <LinkIcon size={14} className="text-blue-600" />
              Event Website / Registration Link (Optional)
            </label>
            <input 
              type="text" 
              value={formData.link}
              onChange={e => setFormData(prev => ({ ...prev, link: e.target.value }))}
              placeholder="e.g. Eventbrite or Google Forms URL"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>
        </div>

        {/* Banner Image */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
            <ImageIcon size={14} className="text-blue-600" />
            Event Cover Image (Square 1:1)
          </div>
          
          <div className="space-y-6">
            <div className="relative aspect-square w-full max-w-[400px] mx-auto rounded-[2rem] overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 group cursor-pointer hover:border-blue-300 transition-all">
              {formData.imageUrl ? (
                <>
                  <Image src={formData.imageUrl} alt="Banner" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Button type="button" variant="destructive" className="rounded-xl font-bold" onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}>
                      <Trash2 size={18} className="mr-2" /> Replace Image
                    </Button>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Plus size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Square Artwork</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>
            <p className="text-slate-500 text-sm font-medium text-center">Recommended: Square image (800x800px). You can crop it after selection.</p>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Event Description (English)</label>
            <textarea 
              value={formData.descriptionEn}
              onChange={e => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
              required
              rows={6}
              placeholder="Details about the event, what to expect, etc..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-50 transition-all resize-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Event Description (French)</label>
            <textarea 
              value={formData.descriptionFr}
              onChange={e => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
              required
              rows={6}
              placeholder="Détails sur l'événement, à quoi s'attendre, etc..."
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
