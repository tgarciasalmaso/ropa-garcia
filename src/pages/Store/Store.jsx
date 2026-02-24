import { useMemo, useState } from "react";
import { products } from "../../data/products";
import { categories } from "../../data/cateogories.js";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Store.css";

export default function Store() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchesCat = cat === "all" || p.category === cat;
      const matchesQuery = q === "" || p.name.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [cat, query]);

  return (
    <div className="store stack-28">
      <h1 className="h1">Tienda</h1>

      <div className="storeControls">
        {/* Categoría */}
        <div className="storeControlGroup">

          <select
            id="catSelect"
            className="btn ui"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="storeControlGroup">

          <div className="storeSearch">
            <span className="storeSearchIcon" aria-hidden="true">
              🔍
            </span>

            <input
              id="search"
              className="storeSearchInput ui"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre..."
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <div className="storeGrid">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text">No hay productos disponibles.</p>
      )}
    </div>
  );
}