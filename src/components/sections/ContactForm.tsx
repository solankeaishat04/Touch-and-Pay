'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendEmail, EmailState } from '@/app/actions/sendEmail';

const initialState: EmailState = {
  success: false,
  message: '',
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form fields upon a successful email delivery
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="w-full flex flex-col gap-6">
      
      {/* Name Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-neutral-400">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            required 
            className="w-full bg-[#111c2e] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-neutral-400">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            required 
            className="w-full bg-[#111c2e] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-400">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className="w-full bg-[#111c2e] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-neutral-400">Message</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          className="w-full bg-[#111c2e] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
        />
      </div>

      {/* Submission Status Alerts */}
      {state.message && (
        <div className={`p-4 rounded-xl text-xs font-medium ${state.success ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900' : 'bg-rose-950/50 text-rose-400 border border-rose-900'}`}>
          {state.message}
        </div>
      )}

      {/* Trigger CTA Action */}
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-[#f27424] hover:bg-[#d95f16] disabled:bg-neutral-700 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.01]"
      >
        {isPending ? 'Sending Message...' : 'Send Message'}
      </button>

    </form>
  );
}