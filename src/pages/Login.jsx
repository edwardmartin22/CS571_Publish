import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

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
    </div>
  );
}
