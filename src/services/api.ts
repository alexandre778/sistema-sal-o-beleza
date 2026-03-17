// src/services/api.ts
export async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro na requisição GET");
  return res.json();
}

export async function post<T, B>(url: string, body: B): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Erro na requisição POST");
  return res.json();
}
