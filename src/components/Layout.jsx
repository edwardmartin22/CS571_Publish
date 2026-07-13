import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow w-full mx-auto p-6 md:p-8 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
