import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import { initialUsersData } from './usersData';
import UserFilters from './components/UserFilters';
import UsersTable from './components/UsersTable';
import UserFormModal from './components/UserFormModal';

const UsersTopBar = () => {
  const { toggleSidebar } = useAppContext();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-[76px] flex items-center justify-between shrink-0">
      <div className="flex items-center gap-[18px] pl-[8px]">
        <button onClick={toggleSidebar} className="text-[var(--color-text)] hover:bg-white w-[28px] h-[28px] rounded-[5px] flex items-center justify-center">
          <Icons.Menu className="text-[20px]" />
        </button>
        <div>
          <h1 className="text-[22px] font-bold text-black leading-none">Users Management</h1>
        </div>
      </div>

      <div className="hidden md:flex items-center h-[42px] rounded-[6px] bg-white border border-[#deddf6] text-[var(--color-text)] mr-[4px] shadow-[0_1px_2px_rgba(3,4,90,0.04)]">
        <div className="h-full flex items-center gap-[9px] pl-[12px] pr-[17px] border-r border-[#e4e2fa]">
          <Icons.Calendar className="text-[17px] text-[var(--color-primary)]" />
          <div className="text-[12px] font-semibold leading-[14px]">
            <div>{time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div>{time.toLocaleDateString('en-US', { weekday: 'long' })}</div>
          </div>
        </div>
        <div className="h-full flex items-center gap-[9px] pl-[15px] pr-[17px]">
          <Icons.Clock className="text-[17px] text-[var(--color-primary)]" />
          <span className="text-[12px] font-semibold">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </header>
  );
};

const UsersLayout = () => {
  const [users, setUsers] = useState(initialUsersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [filterValues, setFilterValues] = useState({
    search: '',
    role: 'All Roles',
    status: 'All Status',
  });

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilterValues({
      search: '',
      role: 'All Roles',
      status: 'All Status',
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const searchLower = filterValues.search.toLowerCase();
      const matchesSearch = 
        user.fullName.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower);

      const matchesRole = filterValues.role === 'All Roles' || user.role === filterValues.role;
      const matchesStatus = filterValues.status === 'All Status' || user.status === filterValues.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, filterValues]);

  const handleAddClick = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === userData.id ? { ...u, ...userData } : u));
    } else {
      const newUser = {
        ...userData,
        createdAt: new Date().toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        }) + ' ' + new Date().toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', hour12: true
        }).toUpperCase(),
      };
      setUsers(prev => [...prev, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="w-full h-full min-w-0 flex flex-col bg-[var(--color-app-bg)] overflow-x-hidden overflow-y-auto box-border px-[15px] sm:px-[13px] pb-[12px]">
      <UsersTopBar />
      
      <UserFilters 
        filterValues={filterValues} 
        onFilterChange={handleFilterChange} 
        onReset={handleResetFilters} 
      />
      
      <UsersTable 
        users={filteredUsers} 
        onEditUser={handleEditClick} 
        onAddUser={handleAddClick} 
      />

      <UserFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveUser} 
        onDelete={handleDeleteUser} 
        initialData={editingUser} 
      />
    </div>
  );
};

export default UsersLayout;
