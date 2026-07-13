import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, UserCircle } from 'lucide-react';
import { MOCK_USER } from '../data/mockData';

export default function Profile() {
  const [handicap, setHandicap] = useState(MOCK_USER.handicap || 0);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate save
    navigate('/dashboard', { state: { toastMessage: `Handicap successfully updated to ${handicap}!` } });
  };

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto mt-12 animate-in fade-in duration-500">
      
      <div className="w-full card border-lm-green/20">
        <div className="flex flex-col items-center mb-8">
          <UserCircle size={80} className="text-lm-green mb-4" />
          <h2 className="text-3xl font-bold font-['Outfit'] text-gray-800">{MOCK_USER.name}</h2>
          <span className="text-gray-500">{MOCK_USER.email}</span>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="handicap" className="text-lm-green font-medium font-['Outfit'] text-lg">
              Your Handicap
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="handicap"
                value={handicap}
                onChange={(e) => setHandicap(e.target.value)}
                className="input-field max-w-[120px] text-center text-2xl font-bold text-gray-800"
                min="0"
                max="54"
              />
              <span className="text-gray-500 text-sm">
                Used to calculate net scores
              </span>
            </div>
          </div>

          <button type="submit" className="btn-primary mt-4">
            <Save size={20} />
            Save Profile
          </button>
        </form>
      </div>

    </div>
  );
}
