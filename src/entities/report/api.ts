export async function fetchReport({
  size,
  withErrors = "off",
  maxSpend = "1000",
}: {
  size: number;
  withErrors?: string;
  maxSpend?: string;
}) {
  const params = new URLSearchParams({
    size: size.toString(),
    withErrors,
    maxSpend,
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(`подключаемся к ${BASE_URL}/report?${params.toString()}`);
  const response = await fetch(`${BASE_URL}/report?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "text/csv",
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка при получении отчета: ${response.statusText}`);
  }
  const csv = await response.text();
  console.log("answer", csv);

  return csv;
}
