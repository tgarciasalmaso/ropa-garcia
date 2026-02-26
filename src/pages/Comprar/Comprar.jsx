import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";
import { buildCloudinaryUrl } from "../../utils/cloudinary";
import { registrarPedido } from "../../utils/pedidos";
import ComprarItemCard from "../../components/ComprarItemCard/ComprarItemCard";
import "./Comprar.css";


export default function Comprar() {
  const [loading, setLoading] = useState(false);
  const WHATSAPP_PHONE = "5491169212626";


  const { slug } = useParams();

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (loading) return; // evita doble click
  
    const nombreCliente = form.fullName.trim();
    const telefono = form.phone.trim();
    const direccion = form.address.trim();
  
    if (!nombreCliente || !telefono || !direccion) {
      alert("Por favor completá nombre, teléfono y dirección.");
      return;
    }
  
    setLoading(true);
  
    const urlProducto = `${window.location.origin}/product/${product.slug}`;
    const fecha = new Date().toLocaleString("es-AR");
  
    const payload = {
      slug: product.slug,
      nombreProducto: product.name,
      urlProducto,
      precio: product.price,
      marca: product.brand || "",
      nombreCliente,
      telefono,
      direccion,
      fecha,
    };
  
    try {
      await registrarPedido(payload);
  
      const lines = [
        "🧾 *Nueva compra — Ropa García*",
        "",
        `👕 *Producto:* ${product.name}`,
        `🏷️ *Marca:* ${product.brand || "-"}`,
        `📏 *Talle:* ${product.size || "-"}`,
        `💰 *Precio:* $${product.price}`,
        "",
        "📦 *Datos del comprador*",
        `• Nombre: ${nombreCliente}`,
        `• Teléfono: ${telefono}`,
        `• Dirección: ${direccion}`,
        "",
        `🔗 Link del producto: ${urlProducto}`,
        `🕒 Fecha: ${fecha}`,
      ];
  
      const text = encodeURIComponent(lines.join("\n"));
  
      window.open(
        `https://wa.me/${WHATSAPP_PHONE}?text=${text}`,
        "_blank",
        "noopener,noreferrer"
      );
  
    } catch (err) {
      alert("No se pudo registrar el pedido ❌");
    } finally {
      setLoading(false);
    }
  }

  if (!product) {
    return (
      <div className="comprarPage container stack-16">
        <h1 className="h1">Comprar</h1>
        <p className="text">Producto no encontrado.</p>
        <Link to="/store" className="btn btnPrimary">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="comprarPage stack-28">
      <h1 className="h1">Comprar</h1>
  
      <div className="comprarLayout">
        {/* Columna izquierda */}
        <section className="comprarCol stack-16">
          <h2 className="h2">Producto</h2>
          <ComprarItemCard product={product} />
        </section>
  
        {/* Columna derecha */}
        <section className="comprarCol stack-16">
          <h2 className="h2">Datos</h2>
  
          <form className="comprarForm stack-12" onSubmit={handleSubmit}>
            <div className="comprarField stack-8">
              <label className="ui" htmlFor="fullName">Nombre completo</label>
              <input
                id="fullName"
                className="comprarInput ui"
                value={form.fullName}
                onChange={handleChange}
                />
            </div>
  
            <div className="comprarField stack-8">
              <label className="ui" htmlFor="phone">Número de teléfono</label>
              <input
                id="phone"
                className="comprarInput ui"
                value={form.phone}
                onChange={handleChange}
                />
             </div>
  
            <div className="comprarField stack-8">
              <label className="ui" htmlFor="address">Dirección</label>
              <input
                id="address"
                className="comprarInput ui"
                value={form.address}
                onChange={handleChange}
                />
            </div>
  
            <button
              className="btn btnPrimary comprarSubmit"
              type="submit"
              disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar datos"}
            </button>
  
            <p className="uiMuted">
              Al enviar, coordinamos por WhatsApp el pago y el envío.
            </p>
          </form>

          
        </section>
      </div>
    </div>
  );
}