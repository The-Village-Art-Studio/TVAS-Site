"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Loader2, 
  Globe, 
  Hash,
  AtSign,
  Music2,
  Plus,
  Trash2,
  Camera,
  UserCircle,
  Link as LinkIcon,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ImageCropper from './ImageCropper';

interface MemberFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function MemberForm({ initialData, isEditing = false }: MemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'painter',
    imageUrl: initialData?.imageUrl || '',
    statementEn: initialData?.statementEn || '',
    statementFr: initialData?.statementFr || '',
    socialLinks: initialData?.socialLinks ? {
      website: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      ...JSON.parse(initialData.socialLinks)
    } : {
      website: '',
      instagram: '',
      twitter: '',
      tiktok: ''
    }
  });

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
    
    // Clear the input so the same file can be selected again
    e.target.value = '';
  };

  const onCropComplete = async (cropArea: any) => {
    if (!selectedFile) return;
    
    setShowCropper(false);
    setUploading(true);
    setError('');

    const data = new FormData();
    data.set('file', selectedFile);
    data.set('type', 'member');
    
    // Pass precise crop coordinates
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

    if (!formData.imageUrl) {
      setError('Profile image is required');
      setLoading(false);
      return;
    }

    try {
      // Corrected endpoints to match standard pattern
      const endpoint = isEditing ? `/api/admin/members/${initialData.id}` : '/api/admin/members';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          socialLinks: JSON.stringify(formData.socialLinks)
        })
      });

      const result = await res.json();
      if (result.success) {
        router.push('/admin/members');
        router.refresh();
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to save member');
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
            href="/admin/members"
            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
              <UserCircle size={14} />
              <span>{isEditing ? 'Profile Editor' : 'Registration'}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              {isEditing ? 'Edit Artist Profile' : 'New Artist Member'}
            </h1>
          </div>
        </div>
        <Button 
          type="submit"
          disabled={loading || uploading}
          className="h-14 px-10 rounded-xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:translate-y-0 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Save size={20} className="mr-2" />}
          {isEditing ? 'Update Profile' : 'Register Member'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Media & Core Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
              <ImageIcon size={14} className="text-blue-600" />
              Portrait Image
            </div>

            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 group cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
              {formData.imageUrl ? (
                <>
                  <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Button type="button" variant="destructive" className="rounded-xl font-bold" onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}>
                      <Trash2 size={18} className="mr-2" /> Replace Photo
                    </Button>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                  {uploading ? (
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Plus size={32} />
                      </div>
                      <span className="font-bold text-slate-600">Upload Portrait</span>
                      <span className="text-xs text-slate-400 mt-2">Recommended: Square 800 x 800px</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Artist Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="e.g. Elena Marchetti"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Discipline</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 transition-all font-bold cursor-pointer appearance-none"
                >
                  <option value="painter">Painter</option>
                  <option value="photographer">Photographer</option>
                  <option value="sculptor">Sculptor</option>
                  <option value="digital">Digital Artist</option>
                  <option value="musician">Musician</option>
                  <option value="writer">Writer</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
              <LinkIcon size={14} className="text-blue-600" />
              Social Presence
            </div>
            
            <div className="space-y-6">
              {[
                { key: 'website', label: 'Portfolio Website', icon: Globe, color: 'text-slate-400' },
                { key: 'instagram', label: 'Instagram Username', icon: Hash, color: 'text-slate-400' },
                { key: 'twitter', label: 'Twitter / X Handle', icon: AtSign, color: 'text-slate-400' },
                { key: 'tiktok', label: 'TikTok Username', icon: Music2, color: 'text-slate-400' }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{item.label}</label>
                  <div className="relative group">
                    <item.icon size={18} className={`absolute left-5 top-1/2 -translate-y-1/2 ${item.color} group-focus-within:text-blue-600 transition-colors`} />
                    <input 
                      type="text" 
                      value={formData.socialLinks[item.key] || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, [item.key]: e.target.value }
                      }))}
                      placeholder={item.key === 'website' ? 'https://...' : '@username'}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-6 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Statements / I18n */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-black uppercase tracking-widest">
                <Camera size={14} className="text-blue-600" />
                Artist Statement
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100">English</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest border border-indigo-100">French</span>
              </div>
            </div>

            <div className="space-y-12">
              {/* English Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">EN</div>
                  <span className="text-xl font-black tracking-tight text-slate-900 uppercase">English Version</span>
                </div>
                <textarea 
                  value={formData.statementEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, statementEn: e.target.value }))}
                  required
                  rows={8}
                  placeholder="Describe your creative journey and artistic vision in English..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-slate-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium leading-relaxed resize-none"
                />
              </div>

              {/* French Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">FR</div>
                  <span className="text-xl font-black tracking-tight text-slate-900 uppercase">Version Française</span>
                </div>
                <textarea 
                  value={formData.statementFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, statementFr: e.target.value }))}
                  required
                  rows={8}
                  placeholder="Décrivez votre parcours créatif et votre vision artistique en français..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-slate-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium leading-relaxed resize-none"
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
