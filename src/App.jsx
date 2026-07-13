import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';
import RecordScore from './pages/RecordScore';
import ViewScorecard from './pages/ViewScorecard';
import Profile from './pages/Profile';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="verify" element={<Verify />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="record" element={<RecordScore />} />
          <Route path="scorecard/:roundId" element={<ViewScorecard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
