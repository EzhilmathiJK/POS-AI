import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--color-app-bg)] font-sans overflow-hidden text-[var(--color-text)]">
      <Sidebar />
      <main className="flex-1 ml-[178px] h-full overflow-hidden flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
