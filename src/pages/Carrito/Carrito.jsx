import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCart, removeFromCart, clearCart } from "../../utils/cart";
import { SHIPPING_ZONES } from "../../data/shipping";
import { registrarPedido } from "../../utils/pedidos";  
import zonasEnvioImg from "../../assets/img/zonas-envio.png";
import ComprarItemCard from "../../components/ComprarItemCard/ComprarItemCard";
import "./Carrito.css";

export default function Carrito() {

  const [items, setItems] = useState([]);
  const [showZoneMap, setShowZoneMap] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    shippingZone: "",
  });

  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    setItems(getCart());
  }, []);

  function handleChange(e){
    const { id, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: value
    }));
  }

  function quitar(slug){
    const next = removeFromCart(slug);
    setItems(next);
  }

  function vaciar(){
    clearCart();
    setItems([]);
  }

  const subtotal = useMemo(()=>{
    return items.reduce((acc,p)=>acc + Number(p.price || 0),0);
  },[items]);

  const shippingPrice = form.shippingZone
  ? SHIPPING_ZONES[form.shippingZone].price
  : 0;

 const total = subtotal + shippingPrice;

  
 async function handleSubmit(e) {
    e.preventDefault();
  
    if (loading) return;
  
    const nombreCliente = form.fullName.trim();
    const telefono = form.phone.trim();
    const direccion = form.address.trim();
    const shippingZone = form.shippingZone;
  
    if (!items.length) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    if (!nombreCliente || !telefono || !direccion || !shippingZone) {
      alert("Por favor completá nombre, teléfono, dirección y zona de envío.");
      return;
    }
  
    setLoading(true);
  
    const fecha = new Date().toLocaleString("es-AR");
  
    try {
      // registra un pedido por cada producto del carrito
      for (const item of items) {
        const payload = {
          slug: item.slug,
          nombreProducto: item.name,
          urlProducto: `${window.location.origin}/product/${item.slug}`,
          precio: Number(item.price) || 0,
          envio: shippingPrice,
          totalPedido: total,
          marca: item.brand || "",
          nombreCliente,
          telefono,
          direccion: `${direccion} | ${SHIPPING_ZONES[shippingZone].label}`,
          fecha,
        };
  
        await registrarPedido(payload);
      }
  
      const lines = [
        "🧾 *Nuevo pedido — Ropa García*",
        "",
        "👕 *Productos:*",
        ...items.map(
          (item) =>
            `• ${item.name} ${item.size ? `(${item.size})` : ""} - $${item.price}`
        ),
        "",
        `📦 *Subtotal:* $${subtotal}`,
        `🚚 *Envío (${SHIPPING_ZONES[shippingZone].label}):* $${shippingPrice}`,
        `💰 *Total:* $${total}`,
        "",
        "🙋 *Datos del comprador*",
        `• Nombre: ${nombreCliente}`,
        `• Teléfono: ${telefono}`,
        `• Dirección: ${direccion}`,
        `• Zona: ${SHIPPING_ZONES[shippingZone].label}`,
        "",
        `🕒 Fecha: ${fecha}`,
      ];
  
      const text = encodeURIComponent(lines.join("\n"));
  
      window.open(
        `https://wa.me/5491169212626?text=${text}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      alert("No se pudo registrar el pedido ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="carritoPage stack-28">
      <h1 className="h1">Carrito</h1>
  
      {items.length === 0 ? (
        <div className="carritoEmpty stack-16">
          <p className="text">
            Tu carrito está vacío. Explorá la tienda para encontrar algo que te guste.
          </p>
  
          <Link to="/store" className="btn btnPrimary ui">
            Ver tienda
          </Link>
        </div>
      ) : (
        <div className="carritoLayout">
          {/* LEFT */}
          <section className="carritoLeft stack-16">
            <div className="carritoItemsBox">
              <div className="carritoGrid">
                {items.map((item) => (
                  <div key={item.slug} className="carritoGridItem">
                    <ComprarItemCard product={item} />
                  </div>
                ))}
              </div>
  
              <button className="btn ui carritoClear" onClick={vaciar}>
                Vaciar carrito
              </button>
            </div>
  
            <div className="hr" />
  
            <div className="carritoTotals stack-12">
            <div className="carritoSubtotal">
                <p className="ui">Subtotal</p>
                <p className="price">${subtotal}</p>
            </div>

            <div className="carritoSubtotal">
                <p className="ui">Envío</p>
                <p className="price">${shippingPrice}</p>
            </div>

            <div className="carritoSubtotal">
                <p className="ui strong">Total</p>
                <p className="price">${total}</p>
            </div>
            </div>
          </section>
  
          {/* RIGHT */}
          <section className="carritoRight stack-16">
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

              <div className="comprarField stack-8">
                <label className="ui" htmlFor="shippingZone">Zona de envío</label>

                <select
                  id="shippingZone"
                  className="comprarInput ui"
                  value={form.shippingZone}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar zona</option>
                  <option value="caba">CABA</option>
                  <option value="cordon1">1° cordón</option>
                  <option value="cordon2">2° cordón</option>
                  <option value="cordon3">3° cordón</option>
                </select>
              </div>
              <button
                  type="button"
                  className="carritoZoneHelp uiMuted"
                  onClick={() => setShowZoneMap(true)}
                >
                  No sé mi zona
              </button>
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
      )}
            {showZoneMap && (
        <div className="carritoModalOverlay" onClick={() => setShowZoneMap(false)}>
          <div
            className="carritoModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="carritoModalClose btn ui"
              onClick={() => setShowZoneMap(false)}
              aria-label="Cerrar mapa de zonas"
            >
              ✕
            </button>

            <img
              src={zonasEnvioImg}
              alt="Mapa de zonas de envío"
              className="carritoZoneMapImg"
            />
          </div>
        </div>
          )}
        </div>
  );
}