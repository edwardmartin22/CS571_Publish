import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Verify() {
  const [code, setCode] = useState('');
  const [resendCount, setResendCount] = useState(0);
  const [disabledTime, setDisabledTime] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'email@example.com';

  useEffect(() => {
    let timer;
    if (disabledTime > 0) {
      timer = setInterval(() => {
        setDisabledTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [disabledTime]);

  const handleResend = () => {
    if (disabledTime > 0) return;

    const newCount = resendCount + 1;
    setResendCount(newCount);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    if (newCount >= 3) {
      // Exponential backoff: 10s, 20s, 40s...
      const backoffSeconds = Math.pow(2, newCount - 3) * 10;
      setDisabledTime(backoffSeconds);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length >= 6) {
      navigate('/dashboard');
    }
  };

  const formatCode = (val) => {
    const cleaned = val.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}`;
  };

  const handleCodeChange = (e) => {
    const formatted = formatCode(e.target.value);
    if (formatted.length <= 7) {
      setCode(formatted);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 animate-in fade-in slide-in-from-right-8 duration-500 auth-bg">
      <div className="w-full max-w-md flex flex-col items-center bg-white p-10 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative">
        
        <div className="mb-12 flex flex-col items-center scale-75 transform origin-top">
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
        <div className="flex items-center gap-2 text-lm-green font-medium mb-8 text-center text-lg">
          <span>Email was sent to {email}</span>
          <CheckCircle2 className="text-lm-green fill-current text-white" size={24} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <label htmlFor="code" className="text-lm-green font-medium pl-1 text-sm">
            Enter the one-time code sent to your email
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              placeholder="123-456"
              className="input-field text-lm-green text-center text-2xl tracking-[0.2em] font-medium"
              required
            />
            <button 
              type="submit" 
              className="border-2 border-lm-green rounded-xl p-3 text-lm-green hover:bg-lm-light transition-all flex items-center justify-center aspect-square"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </form>

        <div className="flex gap-6 mt-8">
          <button 
            onClick={handleResend}
            disabled={disabledTime > 0}
            className={`font-medium border-b-2 pb-0.5 transition-opacity ${
              disabledTime > 0 
                ? 'text-gray-400 border-gray-400 cursor-not-allowed opacity-50' 
                : 'text-lm-green border-lm-green hover:opacity-70'
            }`}
          >
            {disabledTime > 0 ? `Try again in ${disabledTime}s` : 'Resend Email'}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-lm-green font-medium border-b-2 border-lm-green hover:opacity-70 transition-opacity pb-0.5"
          >
            Change Email
          </button>
        </div>

      </div>

      {/* Resend Toast */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <CheckCircle2 className="text-lm-light" />
        <span className="font-medium">Verification email resent!</span>
      </div>

    </div>
  );
}
