"use client";

import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import CSSQuillAnimation from '../components/CSSQuillAnimation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert('Please complete the hCaptcha verification.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          captchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail(''); // Clear the form
        setCaptchaToken(null); // Reset captcha
        if (captchaRef.current) {
          captchaRef.current.resetCaptcha();
        }
      } else {
        alert(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-8 pb-16" style={{ backgroundColor: '#3A1A4F' }}>
      {/* CSS Quill Writing Animation */}
      <div className="mb-12 md:mb-16 lg:mb-24">
        <CSSQuillAnimation />
      </div>

      {/* Email Form or Success Message */}
      <div className="max-w-md mx-auto w-full">
        {isSubmitted ? (
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-semibold text-[#FF5277] mb-4">
              Welcome to our Pilot Program! 🎉
            </div>
            <p className="text-lg text-[#FF5277] opacity-90">
              We&apos;ll be in touch soon with exclusive updates and early access.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-6 py-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#FF5277] transition-colors bg-white text-center"
            />
            <div className="flex justify-center">
              <HCaptcha
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading || !captchaToken}
              className="bg-gradient-to-r from-[#FF5277] to-[#7B2CBF] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Joining...' : 'Join Our Pilot Program'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}