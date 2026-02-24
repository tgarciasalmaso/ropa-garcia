import { Link } from "react-router-dom";
import "../../styles/Global.css"
import "./QuienesSomos.css";

export default function QuienesSomos() {
  return (
    <section className="quienes container stack-28">
      
      <h1 className="h1">¿Quiénes somos?</h1>

      <div className="stack-20 quienesContent">
        <p className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat.
        </p>

        <p className="text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
          cupidatat non proident, sunt in culpa qui officia deserunt mollit 
          anim id est laborum.
        </p>
      </div>

      <Link to="/store" className="btn btnPrimary quienesBtn">
        Ver tienda
      </Link>

    </section>
  );
}