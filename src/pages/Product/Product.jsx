import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { buildCloudinaryUrl } from "../../utils/cloudinary";
import "./Product.css";

export default function Product() {
  const { slug } = useParams();

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  if (!product) {
    return (
      <div className="productPage container stack-16">
        <h1 className="h1">Producto no encontrado</h1>
        <p className="text">El producto que buscás no existe o fue removido.</p>
        <Link to="/store" className="btn btnPrimary">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const images = Array.from({ length: product.imageCount }, (_, i) => i + 1);

  return (
    <div className="productPage container">
      <div className="productLayout">
        {/* Izquierda: galería scrolleable */}
        <div className="productMediaCol">
          <div className="productGallery stack-12">
            {images.map((n) => (
              <img
                key={n}
                className="productImg"
                src={buildCloudinaryUrl(product.slug, n, 1200)}
                alt={`${product.name} - foto ${n}`}
                loading={n === 1 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </div>

        {/* Derecha: info sticky */}
        <aside className="productInfoCol">
          <div className="productInfo stack-16">
            <h1 className="h1">{product.name}</h1>
            <p className="price">${product.price}</p>

            <div className="productMeta stack-8">
              <p className="uiMuted">
                <span className="strong">Marca:</span> {product.brand}
              </p>
              <p className="uiMuted">
                <span className="strong">Talle:</span> {product.size}
              </p>
            </div>

            <Link
              to={`/comprar/${product.slug}`}
              className="btn btnPrimary productBuyBtn"
            >
              Comprar
            </Link>

            <p className="text">{product.description}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}