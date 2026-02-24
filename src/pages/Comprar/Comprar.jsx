import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../../data/products";
import { buildCloudinaryUrl } from "../../utils/cloudinary";
import ComprarItemCard from "../../components/ComprarItemCard/ComprarItemCard";
import "./Comprar.css";

export default function Comprar() {
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

  function handleSubmit(e) {
    e.preventDefault();
  
    const { fullName, phone, address } = form;
  
    if (!fullName || !phone || !address) {
      alert("Por favor completá todos los campos.");
      return;
    }
  
    alert(`Producto comprado: ${product.name} 🎉`);
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
  
            <button className="btn btnPrimary comprarSubmit" type="submit">
              Enviar datos
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