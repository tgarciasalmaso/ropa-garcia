export async function registrarPedido(payload) {
    const endpoint = import.meta.env.VITE_GAS_ENDPOINT;
    const token = import.meta.env.VITE_GAS_TOKEN;
  
    if (!endpoint) throw new Error("Falta VITE_GAS_ENDPOINT");
    if (!token) throw new Error("Falta VITE_GAS_TOKEN");
  
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        // clave para minimizar quilombos de CORS/preflight con GAS
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ token, payload }),
    });
  
    const data = await res.json().catch(() => null);
    if (!data?.ok) throw new Error(data?.error || "No se pudo registrar el pedido");
  
    return data;
  }