import { buildCloudinaryUrl } from "../../utils/cloudinary";
import "./ComprarItemCard.css";

export default function ComprarItemCard({ product }) {
  if (!product) return null;

  return (
    <div className="comprarItemCard">
      <img
        className="comprarThumb"
        src={buildCloudinaryUrl(product.slug, 1, 220)}
        alt={product.name}
      />

      <div className="comprarItemInfo">
        <p className="ui comprarItemTitle">
          <span className="strong">{product.name}</span>
          <span className="comprarDot">·</span>
          <span className="uiMuted">{product.size}</span>
        </p>

        <p className="price">${product.price}</p>
      </div>
    </div>
  );
}