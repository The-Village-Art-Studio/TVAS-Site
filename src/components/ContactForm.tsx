'use client';

import { useState } from 'react';
import { Send, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  labels: {
    submit: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    artistSubject: string;
    artistLabel: string;
    partnerSubject: string;
    partnerLabel: string;
  };
}

export default function ContactForm({ labels }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 lg:p-12 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl flex flex-col items-center justify-center text-center min-h-[500px] gap-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            Thanks for reaching out. We'll get back to you at <strong>{formData.email || 'your email'}</strong> as soon as possible.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-primary hover:underline uppercase tracking-widest"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 rounded-[3rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-10">
          <Send size={12} />
          {labels.submit}
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 mb-8 text-sm font-medium">
            <AlertCircle size={18} className="shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
              {labels.nameLabel} <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder={labels.namePlaceholder}
              required
              className="w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
              {labels.emailLabel} <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder={labels.emailPlaceholder}
              required
              className="w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
              {labels.subjectLabel}
            </label>
            <div className="relative">
              <select
                value={formData.subject}
                onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                className="w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="General Inquiry">{labels.subjectPlaceholder}</option>
                <option value={labels.artistSubject}>{labels.artistLabel}</option>
                <option value={labels.partnerSubject}>{labels.partnerLabel}</option>
              </select>
              <ArrowRight size={18} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-primary pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block px-1">
              {labels.messageLabel} <span className="text-primary">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              rows={5}
              placeholder={labels.messagePlaceholder}
              required
              className="w-full bg-transparent border-b border-border/50 py-4 px-1 text-lg font-medium outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30 resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={status === 'loading'}
            className="w-full h-16 text-lg font-bold rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all duration-500 disabled:opacity-70 disabled:scale-100"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Sending...
              </>
            ) : (
              labels.submit
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
