export const getDateRange = (datePreset, dateFrom, dateTo) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate = null;
  let endDate = null;

  switch (datePreset) {
    case 'today':
      startDate = new Date(today);
      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'yesterday':
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 1);

      endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'thisWeek':
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());

      endDate = new Date();
      break;

    case 'thisMonth':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date();
      break;

    case 'custom':
      if (dateFrom) {
        startDate = new Date(dateFrom);
        startDate.setHours(0, 0, 0, 0);
      }
      if (dateTo) {
        endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
      }
      break;

    case 'all':
    default:
      break;
  }

  return { startDate, endDate };
};
