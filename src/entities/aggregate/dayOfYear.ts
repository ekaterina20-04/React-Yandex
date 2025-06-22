export function dayOfYearToDateString(dayOfYear: number): string {
  const date = new Date(new Date().getFullYear(), 0);
  date.setDate(dayOfYear);

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}
