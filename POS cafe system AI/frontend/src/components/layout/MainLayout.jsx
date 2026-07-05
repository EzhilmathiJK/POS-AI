import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--color-app-bg)] font-sans overflow-hidden text-[var(--color-text)] relative">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-[178px] h-full overflow-hidden flex flex-col transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
