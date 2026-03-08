import { Outlet, NavLink, Link } from "react-router-dom";
import "../../styles/Global.css";
import "./HeaderFooter.css";
import logo from "../../assets/img/logo.png";

export default function Layout() {
  const year = new Date().getFullYear();

  return (
    <div className="appShell">
      <header className="siteHeader">
        <div className="headerInner">
          <div className="headerContent">

            <div className="headerLeft">
              <Link to="/" aria-label="Ir al inicio">
                <img src={logo} alt="Ropa García" className="brandMarkLarge" />
              </Link>

              <NavLink to="/store" className="navBtn ui">
                Tienda
              </NavLink>

              <NavLink to="/quienes-somos" className="navBtn ui">
                ¿Quiénes somos?
              </NavLink>
            </div>
            <div className="headerRight">
                <NavLink to="/carrito" className="navBtn ui">
                🛒 Carrito
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <main className="siteMain">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="siteFooter">
        <div className="footerInner caption">© {year} Ropa García</div>
      </footer>
    </div>
  );
}
