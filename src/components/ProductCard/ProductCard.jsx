import { Link } from "react-router-dom";
import { buildCloudinaryUrl } from "../../utils/cloudinary.js";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="productCard">
      <img
        className="productCardImg"
        src={buildCloudinaryUrl(product.slug)}
        alt={product.name}
        loading="lazy"
      />

      <div className="productCardInfo stack-8">
        <h3 className="h3">{product.name}</h3>
        <p className="price">${product.price}</p>
      </div>
    </Link>
  );
}