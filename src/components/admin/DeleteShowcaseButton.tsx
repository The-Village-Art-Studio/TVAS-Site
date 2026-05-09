"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, Loader2, AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeleteShowcaseButtonProps {
  id: string;
  title: string;
}

export default function DeleteShowcaseButton({ id, title }: DeleteShowcaseButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/showcases/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowConfirm(false);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete showcase');
      }
    } catch {
      setError('An error occurred while deleting');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all font-bold text-xs"
        title="Delete Showcase"
      >
        <Trash2 size={14} />
        Delete
      </button>

      {/* Custom Confirmation Modal */}
      {showConfirm && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" />

          {/* Dialog */}
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-md w-full border border-slate-200 animate-in zoom-in-95 fade-in duration-300">
            {/* Close */}
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-[1.5rem] bg-red-50 text-red-600 flex items-center justify-center mb-8 shadow-inner">
              <AlertTriangle size={32} />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight uppercase">Delete Showcase</h3>
            <p className="text-slate-500 font-medium mb-1">
              You are about to permanently delete:
            </p>
            <p className="font-black text-blue-600 text-xl mb-8">"{title}"</p>
            
            <div className="p-5 bg-red-50/50 rounded-2xl border border-red-100 mb-10">
              <p className="text-sm text-red-700 font-bold leading-relaxed flex gap-3">
                <span className="shrink-0 text-red-500">⚠️</span>
                This action is irreversible. All exhibition photos and gallery assets will be permanently removed from the exhibition archive.
              </p>
            </div>

            {error && (
              <div className="mb-8 px-5 py-4 bg-red-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-red-200 animate-shake">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-4 px-6 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-red-200"
              >
                {isDeleting ? (
                  <><Loader2 size={18} className="animate-spin" /> Deleting...</>
                ) : (
                  <><Trash2 size={18} /> Confirm Delete</>
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
