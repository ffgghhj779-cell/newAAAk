'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ minHeight: '100vh', backgroundColor: '#FAF9F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ textAlign: 'center', maxWidth: '28rem', width: '100%', backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #f3f4f6' }}>
            <div style={{ width: '4rem', height: '4rem', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.875rem' }}>
              <span>⚠️</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 1rem' }}>Something went wrong!</h2>
            <p style={{ color: '#4b5563', margin: '0 0 2rem', lineHeight: '1.5' }}>
              A critical error occurred. Our team has been notified.
            </p>
            <button 
              onClick={() => reset()} 
              style={{ backgroundColor: '#7C3AED', color: 'white', width: '100%', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6D28D9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#7C3AED'}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
