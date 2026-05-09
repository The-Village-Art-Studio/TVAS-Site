"use client";

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCcw } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedAreaPixels: any) => void;
  onCancel: () => void;
  aspect?: number;
}

export default function ImageCropper({ image, onCropComplete, onCancel, aspect = 1 }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop: any) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteInternal = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md" />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-xl">
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Crop Profile Image</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Adjust the square to focus on the artist</p>
          </div>
          <button 
            onClick={onCancel}
            className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="flex-1 relative min-h-[400px] bg-slate-950">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteInternal}
            showGrid={true}
          />
        </div>

        {/* Footer / Controls */}
        <div className="p-8 bg-white border-t border-slate-100 space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400">
              <span>Zoom Level</span>
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-400">Tip: Drag the image to position it</span>
                <span className="text-blue-600 font-bold">{(zoom * 100).toFixed(0)}%</span>
              </div>
            </div>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-4 px-8 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              Cancel
            </button>
            <button
              onClick={() => onCropComplete(croppedAreaPixels)}
              className="flex-[2] py-4 px-8 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Save Crop Area
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
