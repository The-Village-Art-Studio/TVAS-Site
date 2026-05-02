"use client";
import { useState } from 'react';
import { Trash2, Loader2, AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DeletePodcastButtonProps {
  id: string;
  title: string;
}

export default function DeletePodcastButton({ id, title }: DeletePodcastButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/podcasts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowConfirm(false);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete podcast episode');
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
        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
        title="Delete Podcast Episode"
      >
        <Trash2 size={16} />
      </button>

      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

          {/* Dialog */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Close */}
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
              <AlertTriangle size={28} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-slate-900 mb-2">Delete Podcast Episode</h3>
            <p className="text-slate-500 font-medium mb-1">
              You are about to permanently delete:
            </p>
            <p className="font-black text-slate-900 text-lg mb-6">"{title}"</p>
            <p className="text-sm text-slate-400 mb-8">
              This action cannot be undone. The episode will be removed from the CMS and the public website immediately.
            </p>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="flex-1 py-3 px-6 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-6 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-200"
              >
                {isDeleting ? (
                  <><Loader2 size={16} className="animate-spin" /> Deleting...</>
                ) : (
                  <><Trash2 size={16} /> Delete</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
