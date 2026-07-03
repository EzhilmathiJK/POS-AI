import React from 'react';
import { Icons } from '../../../assets/icons';

const SortMark = () => (
  <span className="inline-flex flex-col ml-[5px] align-middle translate-y-[1px]">
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#9da5b3]" />
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#9da5b3] mt-[1px]" />
  </span>
);

const EntriesSelect = () => (
  <div className="relative h-[27px] w-[47px]">
    <select
      defaultValue="5"
      aria-label="Records per page"
      className="w-full h-full appearance-none rounded-[5px] border border-[var(--color-border)] bg-[#fbfbfd] pl-[11px] pr-[18px] text-[var(--color-text)] font-semibold outline-none focus:border-[var(--color-primary)] cursor-pointer"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="25">25</option>
    </select>
    <Icons.ChevronDown className="absolute right-[7px] top-[9px] text-[10px] text-[#b2b5c2] pointer-events-none" />
  </div>
);

const UsersTable = ({ users, onEditUser, onAddUser }) => {
  return (
    <section className="flex-1 min-h-0 bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[14px] px-[16px] pt-[18px] pb-[14px] flex flex-col">
      <div className="flex items-start justify-between shrink-0 px-[6px]">
        <div>
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Users List</h2>
          <p className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total {users.length} users</p>
        </div>

        <div className="flex items-center gap-[12px]">
          <button 
            onClick={onAddUser}
            style={{ fontSize: '14px' }} 
            className="h-[40px] px-[16px] rounded-[6px] bg-[var(--color-primary)] text-white flex items-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            <Icons.Plus className="text-[14px]" /> Add New User
          </button>
          
          <button 
            style={{ fontSize: '14px' }} 
            className="h-[40px] px-[16px] rounded-[6px] border border-[var(--color-primary)] bg-white text-[var(--color-primary)] flex items-center gap-[7px] font-bold hover:bg-[var(--color-primary-soft)] transition-colors"
          >
            <Icons.FileExcel className="text-[14px]" /> Export to Excel
          </button>
        </div>
      </div>

      <div className="mt-[18px] border border-[#deddf6] rounded-[7px] overflow-hidden flex-1 min-h-0 relative">
        <div className="h-full overflow-auto custom-scrollbar inventory-table-scroll">
          <table className="w-full min-w-[700px] table-fixed border-collapse text-[12px] text-[var(--color-primary)]">
            <colgroup>
              <col style={{ width: '22%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '5%' }} />
            </colgroup>
            <thead className="sticky top-0 z-10">
              <tr className="h-[50px] bg-[#f7f6ff] border-b border-[#deddf6]">
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-left whitespace-nowrap">Full Name <SortMark /></th>
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-left whitespace-nowrap">Username <SortMark /></th>
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-left whitespace-nowrap">Email <SortMark /></th>
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-left whitespace-nowrap">Role <SortMark /></th>
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-center whitespace-nowrap">Status <SortMark /></th>
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] text-left whitespace-nowrap">Created At</th>
                <th className="font-semibold text-[13px] text-[var(--color-text)] px-[24px] w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="h-[48px] border-b border-[#deddf6] last:border-b-0 hover:bg-[#faf9ff] transition-colors">
                  <td className="px-[24px] font-normal whitespace-nowrap">{user.fullName}</td>
                  <td className="px-[24px] font-normal whitespace-nowrap">{user.username}</td>
                  <td className="px-[24px] font-normal whitespace-nowrap">{user.email}</td>
                  <td className="px-[24px] font-normal whitespace-nowrap">{user.role}</td>
                  <td className="px-[24px] font-normal whitespace-nowrap text-center">
                    <span className={`inline-flex items-center justify-center h-[22px] rounded-[5px] px-[10px] text-[11px] font-semibold ${
                      user.status === 'Active' 
                        ? 'bg-[#dff8e6] text-[#00a711]' 
                        : 'bg-[#ffe4e7] text-[#ff1e27]'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-[24px] font-normal whitespace-nowrap">
                    <div className="truncate">{user.createdAt.split(' ').slice(0, 3).join(' ')}</div>
                    <div className="mt-[3px] truncate">{user.createdAt.split(' ').slice(3).join(' ')}</div>
                  </td>
                  <td className="px-[24px] text-right">
                    <button 
                      onClick={() => onEditUser(user)}
                      className="text-[var(--color-primary)] hover:text-[#4338ca] transition-colors"
                    >
                      <Icons.Edit className="text-[15px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="min-h-[42px] pt-[14px] flex flex-wrap items-center justify-between gap-[14px] shrink-0 text-[12px] text-[var(--color-primary)] px-[2px]">
        <div className="flex items-center gap-[7px] font-semibold">
          <span>Show</span>
          <EntriesSelect />
          <span>entries</span>
        </div>

        <div className="flex justify-center gap-[5px]">
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.First className="text-[14px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Prev className="text-[14px]" />
          </button>
          <button className="w-[30px] h-[30px] rounded-[7px] bg-[var(--color-primary)] text-white font-semibold">1</button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Next className="text-[14px]" />
          </button>
          <button className="w-[28px] h-[28px] rounded-[7px] border border-[var(--color-border)] text-[#b9bdcb] flex items-center justify-center">
            <Icons.Last className="text-[14px]" />
          </button>
        </div>

        <p className="text-right font-semibold text-[12px]">Showing 1 to {users.length} of {users.length} entries</p>
      </div>
    </section>
  );
};

export default UsersTable;
