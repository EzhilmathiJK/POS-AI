import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Toast from '../ui/Toast';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--color-app-bg)] font-sans overflow-hidden text-[var(--color-text)] relative">
      <Sidebar />
      <main className="flex-1 ml-[178px] h-full overflow-hidden flex flex-col">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
};

export default MainLayout;
