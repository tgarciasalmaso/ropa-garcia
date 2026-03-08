export async function registrarPedido(payload) {
  const endpoint = import.meta.env.VITE_GAS_ENDPOINT;
  const token = import.meta.env.VITE_GAS_TOKEN;

  if (!endpoint) throw new Error("Falta VITE_GAS_ENDPOINT");
  if (!token) throw new Error("Falta VITE_GAS_TOKEN");

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({ token, payload }),
  });

  return { ok: true };
}