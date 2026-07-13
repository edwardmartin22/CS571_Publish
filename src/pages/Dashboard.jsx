import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Bird, Trash2, RotateCcw, Plus, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_LEAGUE, MOCK_LEADERBOARD, MOCK_ACHIEVEMENTS, MOCK_HISTORY, MOCK_USER } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNet, setShowNet] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (location.state?.toastMessage) {
      setToastMessage(location.state.toastMessage);
      
      if (location.state?.showConfetti) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#008b5e', '#e6f4ea', '#ffffff', '#fbbf24']
        });
      }
      
      // Clear the state so it doesn't fire again on refresh
      window.history.replaceState({}, document.title);
      
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Compute chart data with draft if it exists
  const draftSaved = sessionStorage.getItem('draft_week_6');
  let chartData = [...MOCK_HISTORY];
  const alreadyHasWeek6 = MOCK_HISTORY.find(h => h.round === 6);
  
  if (draftSaved && !alreadyHasWeek6) {
    const avgScore = Math.round(MOCK_HISTORY.reduce((acc, h) => acc + h.score, 0) / MOCK_HISTORY.length) || 80;
    chartData.push({ round: 6, score: avgScore, isDraft: true });
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-lm-green font-['Outfit']">{MOCK_LEAGUE.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Left Col: Leaderboard */}
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-2 mb-2 text-lm-green">
            <Trophy size={28} className="fill-yellow-400 text-yellow-500" />
            <h3 className="text-2xl font-bold font-['Outfit']">Leaderboard</h3>
          </div>
          <p className="text-center text-sm text-gray-500 mb-4">Week {MOCK_LEAGUE.currentWeek} of {MOCK_LEAGUE.totalWeeks}</p>
          
          <div className="border-2 border-lm-green rounded-2xl overflow-hidden bg-white shadow-sm">
            {MOCK_LEADERBOARD.map((player, index) => {
              const isCurrentUser = player.id === MOCK_USER.id;
              // Prototype logic: simulate net score by subtracting an arbitrary handicap (e.g. 12) if not user
              const hc = isCurrentUser ? MOCK_USER.handicap : 12;
              const displayScore = showNet ? player.score - hc : player.score;

              return (
                <div 
                  key={player.id} 
                  className={`flex justify-between items-center px-4 py-3 border-b border-lm-green/20 last:border-0 
                    ${isCurrentUser ? 'bg-lm-light font-semibold' : ''}
                    hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lm-green font-bold text-lg w-6">{player.rank}.</span>
                    <span className="text-lg text-gray-800">{player.name}</span>
                  </div>
                  <span className={`text-xl font-bold ${displayScore < 0 ? 'text-lm-green' : 'text-gray-800'}`}>
                    {displayScore > 0 ? `+${displayScore}` : displayScore === 0 ? 'E' : displayScore}
                  </span>
                </div>
              );
            })}
            <div className="bg-gray-50 py-2 px-4 flex justify-end items-center gap-2 border-t border-lm-green/20">
              <span className="text-sm font-medium text-gray-500">{showNet ? 'Net' : 'Gross'}</span>
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${showNet ? 'bg-lm-green' : 'bg-gray-300'}`}
                onClick={() => setShowNet(!showNet)}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${showNet ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="border-2 border-lm-green rounded-lg p-2 flex flex-col items-center flex-1 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-lm-green mb-0.5">
                <Bird size={16} className="fill-current" />
                <span className="text-xs font-semibold">Most Birdies</span>
              </div>
              <span className="text-lg font-bold text-lm-green font-['Outfit']">{MOCK_ACHIEVEMENTS.mostBirdies}</span>
            </div>

            <div className="border-2 border-red-600 rounded-lg p-2 flex flex-col items-center flex-1 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 text-red-600 mb-0.5">
                <Trash2 size={16} />
                <span className="text-xs font-semibold">Most Bogies+</span>
              </div>
              <span className="text-lg font-bold text-red-600 font-['Outfit']">{MOCK_ACHIEVEMENTS.mostBogies}</span>
            </div>
          </div>
        </div>

        {/* Right Col: History */}
        <div className="flex flex-col gap-8 h-full">
          


          {/* Score History Chart */}
          <div className="flex flex-col items-center mt-4 w-full h-full min-h-[400px]">
            <div className="flex items-center gap-2 text-gray-400 mb-6">
              <RotateCcw size={24} />
              <h3 className="text-xl font-bold">Your Score History</h3>
            </div>
            
            <div className="w-full h-full border-b-2 border-l-2 border-gray-400 flex items-end justify-around px-2 pb-0 pt-8 gap-2 relative">
              {chartData.map((h, i) => {
                const heightPercentage = `${(h.score / 100) * 100}%`;
                return (
                  <div 
                    key={i} 
                    className="flex flex-col justify-end items-center w-full h-full relative"
                    onMouseMove={(e) => {
                      setHoveredData(h);
                      setMousePos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredData(null)}
                  >
                    <div 
                      className={`w-full transition-colors cursor-pointer rounded-t-md ${
                        h.isDraft ? 'bg-gray-300 hover:bg-gray-400' : 'bg-lm-green/60 hover:bg-lm-green'
                      }`}
                      style={{ height: heightPercentage }}
                      onClick={() => h.isDraft ? navigate('/record') : navigate('/scorecard/' + h.round)}
                    >
                    </div>
                  </div>
                );
              })}
            </div>
            {/* X-Axis Labels */}
            <div className="w-full flex justify-around px-2 mt-3 gap-2 text-sm font-semibold text-gray-500 ml-[2px]">
              {chartData.map((h, i) => (
                <div key={i} className="w-full text-center">Wk {h.round}</div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40">
        <button 
          onClick={() => navigate('/record')}
          className="bg-lm-green text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-lm-dark hover:scale-105 transition-all flex items-center gap-2 group"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          Record Score
        </button>
      </div>

      {/* Global Hover Tooltip */}
      {hoveredData && (
        <div 
          className="fixed z-50 bg-gray-900/95 text-white p-3 rounded-lg shadow-2xl text-sm flex flex-col gap-1 w-48 pointer-events-none transition-none"
          style={{ 
            left: mousePos.x + 15 + 192 > window.innerWidth ? mousePos.x - 192 - 15 : mousePos.x + 15, 
            top: mousePos.y + 15 
          }}
        >
          {hoveredData.isDraft ? (
            <div className="font-semibold text-center py-2 text-lm-light">
              You have not submitted this score yet. Click to finish submitting!
            </div>
          ) : (
            <>
              <div className="font-bold border-b border-gray-600 pb-1 mb-1 text-lm-light truncate">{hoveredData.course}</div>
              <div className="flex justify-between"><span>Date:</span> <span>{hoveredData.date}</span></div>
              <div className="flex justify-between"><span>Gross:</span> <span className="font-bold">{hoveredData.score}</span></div>
              <div className="flex justify-between"><span>Net:</span> <span>{hoveredData.net}</span></div>
            </>
          )}
        </div>
      )}

      {/* Dynamic Success Toast */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <CheckCircle2 className="text-lm-light" />
        <span className="font-medium">{toastMessage}</span>
      </div>

    </div>
  );
}
