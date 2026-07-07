export const generateRequestNumber = (lastRequest) => {
  if (!lastRequest) {
    return 'REQ-000001';
  }
  const lastNumber = parseInt(lastRequest.request_number.split('-')[1], 10);
  return `REQ-${String(lastNumber + 1).padStart(6, '0')}`;
};

export const getSubmitStatus = (deliveryDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const delivery = new Date(deliveryDate);
  delivery.setHours(0, 0, 0, 0);

  if (delivery <= today) {
    return 'Received';
  }
  return 'On The Way';
};
