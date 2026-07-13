import { useState } from 'react';
import { Menu, ArrowLeft, ArrowRight, UserCircle, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isAuthPage = location.pathname === '/' || location.pathname === '/verify';

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer transform transition-transform hover:scale-105"
          onClick={() => navigate(isAuthPage ? '/' : '/dashboard')}
        >
          <div className="w-10 h-10 bg-lm-green rounded-full flex items-center justify-center relative">
             <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1 opacity-80" />
             <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-3 right-3 opacity-60" />
             <div className="w-2 h-2 bg-white rounded-full absolute top-4 left-2 opacity-70" />
             <div className="w-4 h-1.5 bg-lm-green absolute -bottom-1" />
          </div>
          
          <div className="flex flex-col leading-none">
            <h1 className="text-xl font-bold text-lm-green font-['Outfit'] tracking-tight">League</h1>
            <h1 className="text-xl font-bold text-lm-green font-['Outfit'] tracking-tight">Mate</h1>
          </div>
        </div>

        {/* Right Side: Profile / Menu */}
        <div className="flex items-center gap-4">
          {!isAuthPage ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-800">You</span>
                  <span className="text-xs text-gray-500">example@email.com</span>
                </div>
                <UserCircle size={32} className="text-lm-green" />
              </div>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                  ></div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl flex flex-col overflow-hidden z-50">
                    <button 
                      className="px-4 py-3 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/profile');
                      }}
                    >
                      Profile
                    </button>
                    <div className="h-px bg-gray-100"></div>
                    <button 
                      className="px-4 py-3 text-left font-semibold text-red-600 hover:bg-red-50 transition-colors flex justify-between items-center"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/'); // Navigate to login
                      }}
                    >
                      Sign Out
                      <LogOut size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <Menu size={28} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
