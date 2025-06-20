export function dayOfYearToDateString(dayOfYear: number): string {
  const date = new Date(new Date().getFullYear(), 0); // 0 = январь
  date.setDate(dayOfYear);

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}
