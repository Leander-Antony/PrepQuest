import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUser } from '../context/UserContext';
import './layout.css';

export default function AppLayout() {
  const { updateStreak } = useUser();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
