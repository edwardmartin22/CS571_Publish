import { useState, useEffect } from 'react';
import { ChevronDown, Save, Send, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COURSES, MOCK_USER, MOCK_HISTORY } from '../data/mockData';

export default function RecordScore() {
  const [selectedCourseId, setSelectedCourseId] = useState(MOCK_COURSES[0].id);
  const course = MOCK_COURSES.find(c => c.id === selectedCourseId) || MOCK_COURSES[0];
  const navigate = useNavigate();
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  
  // Initialize scores array to match holes length, default empty
  const [scores, setScores] = useState(() => {
    const saved = sessionStorage.getItem('draft_week_6');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.scores) return parsed.scores;
    }
    return Array(18).fill('');
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('draft_week_6');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.courseId) setSelectedCourseId(parsed.courseId);
    }
  }, []);

  useEffect(() => {
    if (showSaveToast) {
      const timer = setTimeout(() => setShowSaveToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSaveToast]);

  useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => setShowErrorToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);

    // Auto-advance to next input after one digit
    if (value.toString().length === 1 && index < 17) {
      const nextInput = document.getElementById(`hole-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
        // Optional: select the content so it overwrites if they type again
        setTimeout(() => nextInput.select(), 0);
      }
    }
  };

  const calculateGross = () => {
    return scores.reduce((acc, curr) => acc + (parseInt(curr) || 0), 0);
  };

  const calculateNet = () => {
    const gross = calculateGross();
    if (gross === 0) return 0;
    return gross - course.par - MOCK_USER.handicap;
  };

  const grossScore = calculateGross();
  const netScore = calculateNet();

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-24">
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        
        {/* Left Column: Course Selector & Info */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-lm-green font-medium pl-1">Select a course:</label>
            <div className="relative">
              <select 
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="input-field text-lm-green font-semibold appearance-none pr-10"
              >
                {MOCK_COURSES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="text-lm-green" />
              </div>
            </div>
          </div>

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

            <div className="w-full bg-lm-dark/30 rounded-xl p-4 mt-2">
              <h4 className="text-sm font-semibold mb-3 text-center">Course Leaders</h4>
              <div className="flex flex-col gap-2">
                {course.leaders.map((leader, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{leader.name}</span>
                    <span className="font-bold">{leader.score}</span>
                  </div>
                ))}
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
                <input
                  key={h.number}
                  id={`hole-input-${i}`}
                  type="number"
                  min="1"
                  max="20"
                  value={scores[i]}
                  onChange={(e) => handleScoreChange(i, e.target.value)}
                  className="w-full h-14 sm:h-16 border-2 border-lm-green rounded-xl text-center text-2xl font-bold text-lm-green focus:ring-2 focus:ring-lm-light outline-none"
                />
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
                <input
                  key={h.number}
                  id={`hole-input-${i+9}`}
                  type="number"
                  min="1"
                  max="20"
                  value={scores[i+9]}
                  onChange={(e) => handleScoreChange(i+9, e.target.value)}
                  className="w-full h-14 sm:h-16 border-2 border-lm-green rounded-xl text-center text-2xl font-bold text-lm-green focus:ring-2 focus:ring-lm-light outline-none"
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lm-green font-bold text-lg leading-tight">Gross: {grossScore || '--'}</span>
            <span className="text-gray-500 font-medium text-sm leading-tight">
              Net: {netScore > 0 ? `+${netScore}` : netScore === 0 && grossScore > 0 ? 'E' : netScore < 0 ? netScore : '--'}
            </span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                sessionStorage.setItem('draft_week_6', JSON.stringify({ scores, courseId: selectedCourseId }));
                setShowSaveToast(true);
              }}
              className="border-2 border-lm-green text-lm-green px-4 py-2 rounded-xl font-semibold hover:bg-lm-light transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">Save</span> Score <Save size={20} />
            </button>
            <button 
              onClick={() => {
                if (grossScore === 0) {
                  setShowErrorToast(true);
                  return;
                }
                
                const newEntry = {
                  round: 6,
                  score: grossScore,
                  date: "Today",
                  course: course.name,
                  net: netScore,
                  putts: 30, // hardcoded putts for prototype
                  scores: scores.map(s => parseInt(s) || 0)
                };
                
                // Add to history if not already added
                const alreadyHasWeek6 = MOCK_HISTORY.find(h => h.round === 6);
                if (!alreadyHasWeek6) {
                  MOCK_HISTORY.push(newEntry);
                }
                
                sessionStorage.removeItem('draft_week_6');
                navigate('/dashboard', { state: { toastMessage: 'Score successfully submitted for Week 6!', showConfetti: true } });
              }}
              className="bg-lm-green text-white px-4 py-2 rounded-xl font-semibold hover:bg-lm-dark transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">Submit</span> Score <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Save Draft Toast */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${
          showSaveToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <CheckCircle2 className="text-lm-light" />
        <span className="font-medium">Score saved as draft! It has not been submitted yet.</span>
      </div>

      {/* Error Toast */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${
          showErrorToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <span className="font-medium">Please enter some scores first!</span>
      </div>

    </div>
  );
}
