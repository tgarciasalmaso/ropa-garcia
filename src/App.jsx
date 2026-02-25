import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Store from "./pages/Store/Store.jsx";
import Product from "./pages/Product/Product.jsx";
import QuienesSomos from "./pages/QuienesSomos/QuienesSomos.jsx";
import Comprar from "./pages/Comprar/Comprar.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="comprar/:slug" element={<Comprar />} />
        <Route path="store/*" element={<h1>Producto no disponible!</h1>} />
        <Route path="quienes-somos" element={<QuienesSomos />} />


        <Route path="*" element={<h1>Error 404. Not found.</h1>} />
      </Route>
    </Routes>
  );
}
