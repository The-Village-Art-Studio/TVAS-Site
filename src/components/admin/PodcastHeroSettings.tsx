"use client";

import { useState, useEffect } from 'react';
import { ImageIcon, Loader2, Save, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PodcastHeroSettings() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings?key=podcast_latest_cover');
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.value || '/podcast-cover.png');
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    const data = new FormData();
    data.set('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setImageUrl(result.url);
      } else {
        setError('Upload failed: ' + result.error);
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!imageUrl) return;
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'podcast_latest_cover',
          value: imageUrl
        })
      });
      const result = await res.json();
      if (result.success) {
        // Success
      } else {
        setError('Save failed: ' + result.error);
      }
    } catch (err) {
      setError('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-48 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
            <ImageIcon size={14} />
            <span>Featured Section</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 uppercase">Podcast Hero Cover</h2>
          <p className="text-sm text-slate-500 font-medium">This cover image appears in the Latest Episode section on the Home and Podcast pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="h-12 px-6 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
            {uploading ? 'Uploading...' : 'Upload New Cover'}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          </label>
          <Button 
            onClick={handleSave} 
            disabled={saving || uploading}
            className="h-12 px-8 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 hover:bg-blue-700"
          >
            {saving ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
        {imageUrl && (
          <Image src={imageUrl} alt="Hero Cover Preview" fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 text-white/80 text-[10px] font-black uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Live Preview
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Voice of the Village</h3>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold">
          {error}
        </div>
      )}
    </div>
  );
}
