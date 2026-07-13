import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertTriangle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already acknowledged to avoid showing it on every single reload
    const hasAcknowledged = sessionStorage.getItem('cs571_acknowledged');
    if (!hasAcknowledged) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAcknowledge = () => {
    sessionStorage.setItem('cs571_acknowledged', 'true');
    setShowDisclaimer(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/verify', { state: { email } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 auth-bg">
      <div className="w-full max-w-md flex flex-col items-center bg-white p-10 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative">
        
        <div className="mb-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-lm-green rounded-full flex items-center justify-center relative mb-6">
             <div className="w-6 h-6 bg-white rounded-full absolute top-3 right-3 opacity-80" />
             <div className="w-3 h-3 bg-white rounded-full absolute bottom-6 right-6 opacity-60" />
             <div className="w-4 h-4 bg-white rounded-full absolute top-8 left-4 opacity-70" />
             <div className="w-10 h-3 bg-lm-green absolute -bottom-2" />
          </div>
          <h1 className="text-6xl font-bold text-lm-green font-['Outfit'] tracking-tight leading-none text-center">
            League<br/>Mate
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <label htmlFor="email" className="text-lm-green font-medium pl-1 text-sm">
            Enter your email to begin
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="input-field text-lm-green placeholder-lm-green/50"
              required
            />
            <button 
              type="submit" 
              className="border-2 border-lm-green rounded-xl p-3 text-lm-green hover:bg-lm-light transition-all flex items-center justify-center aspect-square"
            >
              <Mail size={24} />
            </button>
          </div>
        </form>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-6">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-bold font-['Outfit'] text-gray-800 mb-4">
              Academic Project Notice
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Please acknowledge that this is a fake site created for CS 571. 
              <strong> No emails will actually be sent, and no real data is collected or stored.</strong> This is purely a static prototype.
            </p>
            <button 
              onClick={handleAcknowledge}
              className="w-full bg-lm-green text-white font-semibold py-4 rounded-xl hover:bg-lm-dark transition-colors active:scale-95"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
