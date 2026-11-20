export function calculateTotal(item, startDate, endDate, quantity) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const days =
    Math.round((new Date(endDate) - new Date(startDate)) / msPerDay) + 1;

  let units = days;
  if (item.rentalType === "Weekly") units = Math.ceil(days / 7);
  if (item.rentalType === "Monthly") units = Math.ceil(days / 30);

  return { days, units, total: item.price * units * quantity };
}
