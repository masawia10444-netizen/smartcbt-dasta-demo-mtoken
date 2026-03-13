export function getBuddhistDate(date: Date) {
  const buddhistYear = date.getFullYear() + 543;
  date.setFullYear(buddhistYear);
  return date;
}
