import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { MOCK_COURSES, MOCK_USER, MOCK_HISTORY } from '../data/mockData';

export default function ViewScorecard() {
  const navigate = useNavigate();
  const { roundId } = useParams();
  
  const historyEntry = MOCK_HISTORY.find(h => h.round === parseInt(roundId));
  
  if (!historyEntry) {
    return <div className="p-8 text-center text-xl font-bold text-gray-500">Scorecard not found</div>;
  }

  const course = MOCK_COURSES.find(c => c.name === historyEntry.course) || MOCK_COURSES[0];
  const scores = historyEntry.scores || Array(18).fill(0);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-lm-green" />
        </button>
        <h2 className="text-2xl font-bold font-['Outfit'] text-lm-green">Scorecard: Week {historyEntry.round}</h2>
        <span className="text-gray-500 ml-auto font-medium">{historyEntry.date}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        
        {/* Left Column: Course Info */}
        <div className="flex flex-col gap-4">
          <div className="card-green flex flex-col items-center mt-2">
            <h3 className="text-2xl font-bold font-['Outfit'] mb-6">{course.name}</h3>
            
            <div className="flex w-full justify-between items-center mb-8 px-4">
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center relative">
                <span className="text-2xl font-bold">{course.par}</span>
                <span className="absolute -bottom-6 text-sm font-medium">Par</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{course.yards}</span>
                <span className="text-xs opacity-90">Yards</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{course.rating}</span>
                <span className="text-xs opacity-90">Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{course.slope}</span>
                <span className="text-xs opacity-90">Slope</span>
              </div>
            </div>

            <div className="w-full flex justify-between items-end mt-8 border-t border-white/20 pt-4">
              <span className="font-medium text-lg">Your net par:</span>
              <div className="bg-white text-lm-green px-3 py-1 rounded-lg text-2xl font-bold">
                {course.par + MOCK_USER.handicap}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scorecard */}
        <div className="flex flex-col gap-8 w-full overflow-x-auto pb-4 max-w-5xl mx-auto">
          
          {/* OUT 9 */}
          <div className="min-w-[600px]">
            <h3 className="text-3xl font-bold text-lm-green font-['Outfit'] mb-4">Out</h3>
            <div className="grid grid-cols-[100px_repeat(9,1fr)] gap-2 border-b-2 border-lm-green pb-2 mb-2 items-center text-center text-lm-green font-medium">
              <div className="text-left font-bold text-xl">Hole:</div>
              {course.holes.slice(0, 9).map(h => <div key={h.number} className="text-xl font-bold">{h.number}</div>)}
              
              <div className="text-left font-bold text-lg mt-2">Par:</div>
              {course.holes.slice(0, 9).map(h => <div key={h.number} className="text-lg mt-2 font-semibold">{h.par}</div>)}
            </div>
            
            <div className="grid grid-cols-[100px_repeat(9,1fr)] gap-2 items-center text-center">
              <div className="text-left font-bold text-xl text-lm-green">Score:</div>
              {course.holes.slice(0, 9).map((h, i) => (
                <div key={h.number} className="w-full h-14 sm:h-16 flex items-center justify-center rounded-xl text-2xl font-bold bg-gray-100 text-gray-800">
                  {scores[i] || '-'}
                </div>
              ))}
            </div>
          </div>

          {/* IN 9 */}
          <div className="min-w-[600px]">
            <h3 className="text-3xl font-bold text-lm-green font-['Outfit'] mb-4 mt-6">In</h3>
            <div className="grid grid-cols-[100px_repeat(9,1fr)] gap-2 border-b-2 border-lm-green pb-2 mb-2 items-center text-center text-lm-green font-medium">
              <div className="text-left font-bold text-xl">Hole:</div>
              {course.holes.slice(9, 18).map(h => <div key={h.number} className="text-xl font-bold">{h.number}</div>)}
              
              <div className="text-left font-bold text-lg mt-2">Par:</div>
              {course.holes.slice(9, 18).map(h => <div key={h.number} className="text-lg mt-2 font-semibold">{h.par}</div>)}
            </div>
            
            <div className="grid grid-cols-[100px_repeat(9,1fr)] gap-2 items-center text-center">
              <div className="text-left font-bold text-xl text-lm-green">Score:</div>
              {course.holes.slice(9, 18).map((h, i) => (
                <div key={h.number} className="w-full h-14 sm:h-16 flex items-center justify-center rounded-xl text-2xl font-bold bg-gray-100 text-gray-800">
                  {scores[i+9] || '-'}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lm-green font-bold text-lg leading-tight">Gross: {historyEntry.score || '--'}</span>
            <span className="text-gray-500 font-medium text-sm leading-tight">
              Net: {historyEntry.net > 0 ? `+${historyEntry.net}` : historyEntry.net === 0 && historyEntry.score > 0 ? 'E' : historyEntry.net < 0 ? historyEntry.net : '--'}
            </span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-lm-green text-white px-8 py-3 rounded-xl font-bold hover:bg-lm-dark transition-colors flex items-center gap-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
