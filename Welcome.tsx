
import React, { useState } from 'react';
import { UserData } from '../types';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface WelcomeProps {
  onStart: (userData: UserData) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !mobile) {
      setError('Please fill in both fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onStart({ email, mobile });
  };

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Let's Get Started</h2>
      <p className="text-slate-600 mb-6">Enter your details to receive your personalized retirement report.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            aria-label="Email Address"
          />
        </div>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            aria-label="Mobile Number"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
          <span>Start Assessment</span>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Welcome;
