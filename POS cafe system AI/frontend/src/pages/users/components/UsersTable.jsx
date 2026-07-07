import { Icons } from '../../../assets/icons';
import Pagination from '../../../components/ui/Pagination';

const SortMark = () => (
  <span className="inline-flex flex-col ml-[5px] align-middle translate-y-[1px]">
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent border-b-[#9da5b3]" />
    <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#9da5b3] mt-[1px]" />
  </span>
);


const UsersTable = ({ users, loading, pagination, onPageChange, onLimitChange, onEditUser, onAddUser }) => {
  return (
    <section className="w-full flex-1 min-h-[520px] lg:min-h-0 flex flex-col bg-white rounded-[6px] border border-[var(--color-border)] shadow-[0_1px_2px_rgba(3,4,90,0.04)] mt-[14px] overflow-hidden min-w-0 shrink-0">
      
      {/* Header: Title + Action Buttons */}
      <div className="w-full px-[16px] pt-[18px] pb-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[14px] shrink-0">
        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-start gap-[2px]">
          <h2 className="text-[13px] leading-[19px] font-semibold text-[var(--color-text)]">Users List</h2>
          <p className="text-[12px] leading-[18px] font-normal text-[var(--color-primary)]">Total {users.length} users</p>
        </div>

        <div className="grid grid-cols-2 gap-[8px] sm:flex sm:items-center sm:gap-[12px] w-full sm:w-auto">
          <button 
            onClick={onAddUser}
            style={{ fontSize: '14px' }} 
            className="h-[40px] px-[10px] sm:px-[16px] min-w-0 rounded-[6px] bg-[var(--color-primary)] text-white flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-hover)] transition-colors text-center leading-[16px] whitespace-normal cursor-pointer"
          >
            <Icons.Plus className="text-[14px]" /> Add New User
          </button>
          
          <button 
            style={{ fontSize: '14px' }} 
            className="h-[40px] px-[10px] sm:px-[16px] min-w-0 rounded-[6px] border border-[var(--color-primary)] bg-white text-[var(--color-primary)] flex items-center justify-center gap-[7px] font-bold hover:bg-[var(--color-primary-soft)] transition-colors text-center leading-[16px] whitespace-normal cursor-pointer"
          >
            <Icons.FileExcel className="text-[14px]" /> Export to Excel
          </button>
        </div>
      </div>

      {/* Table container with horizontal scroll */}
      <div className="flex-1 mx-[16px] mb-[4px] border border-[#deddf6] rounded-[7px] overflow-auto min-w-0 inventory-table-scroll">
        <table className="w-full min-w-[700px] border-collapse text-[12px] text-[var(--color-primary)]">
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
              <tr key={user.id} className="h-[48px] border-b border-[#deddf6] last:border-b-0 hover:bg-gray-50 transition-colors">
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
                  <div>{user.createdAt.split(' ').slice(0, 3).join(' ')}</div>
                  <div className="mt-[3px]">{user.createdAt.split(' ').slice(3).join(' ')}</div>
                </td>
                <td className="px-[24px] text-right">
                  <button 
                    onClick={() => onEditUser(user)}
                    className="text-[var(--color-primary)] hover:text-[#4338ca] transition-colors cursor-pointer flex items-center justify-center"
                    aria-label={`Edit ${user.fullName}`}
                  >
                    <Icons.Edit className="text-[15px]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        pagination={pagination}
        itemName="entries"
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </section>
  );
};

export default UsersTable;
