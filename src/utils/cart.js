const CART_KEY = "cart";

export function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  const parsed = raw ? JSON.parse(raw) : [];
  return Array.isArray(parsed) ? parsed : [];
}

export function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(product) {
  const cart = getCart();

  const exists = cart.some((item) => item.slug === product.slug);
  if (exists) return { ok: false, reason: "exists" };

  const item = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    brand: product.brand || "",
    size: product.size || "",
  };

  const next = [...cart, item];
  saveCart(next);

  return { ok: true, items: next };
}

export function removeFromCart(slug) {
  const next = getCart().filter((item) => item.slug !== slug);
  saveCart(next);
  return next;
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().length;
}