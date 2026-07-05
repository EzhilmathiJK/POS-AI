import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import UserFilters from './components/UserFilters';
import UsersTable from './components/UsersTable';
import UserFormModal from './components/UserFormModal';
import api from '../../api/axios';

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

const formatApiUser = (user) => ({
  id: user.id,
  fullName: user.full_name,
  username: user.username,
  email: user.email,
  role: user.role, // API returns STAFF, ADMIN, MANAGER, CASHIER
  status: user.is_active ? 'Active' : 'Inactive',
  createdAt: new Date(user.created_at).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  }) + ' ' + new Date(user.created_at).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true
  }).toUpperCase(),
});

const UsersLayout = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      if (response.data.success) {
        const mappedUsers = response.data.data.users.map(formatApiUser);
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

      // We compare case insensitively because API role is STAFF, filter is Staff
      const matchesRole = filterValues.role === 'All Roles' || user.role.toLowerCase() === filterValues.role.toLowerCase();
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

  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        const payload = {
          full_name: userData.fullName,
          username: userData.username,
          email: userData.email,
          role: userData.role, 
          is_active: userData.status === 'Active',
        };
        if (userData.password) {
          payload.password = userData.password;
        }
        const response = await api.put(`/users/${editingUser.id}`, payload);
        if (response.data.success) {
          fetchUsers(); // Refresh the list
        }
      } else {
        const payload = {
          full_name: userData.fullName,
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: userData.role, 
        };
        const response = await api.post('/users', payload);
        if (response.data.success) {
          fetchUsers(); // Refresh the list
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving user');
    }
  };

  const handleDeleteUser = (id) => {
    // DELETE /api/users/:id implementation left out for now
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
