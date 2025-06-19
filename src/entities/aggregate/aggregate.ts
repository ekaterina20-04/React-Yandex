export async function fetchAggregate(
  file: File,
  rows: number
): Promise<Response> {
  const form = new FormData();
  form.append("rows", rows.toString());
  form.append("file", file);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(`POST ${BASE_URL}/aggregate (file=${file.name}, rows=${rows})`);

  const response = await fetch(`${BASE_URL}/aggregate`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Ошибка при агрегации: ${response.statusText}`);
  }

  return response;
}
