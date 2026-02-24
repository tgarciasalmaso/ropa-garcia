import { Link } from "react-router-dom";
import "./Home.css";
import fotoMia from "../../assets/img/yo.png";

export default function Home() {
  return (
    <div className="home">
      <div className="homeIntroWrap">
        <section className="homeIntro">
          <div className="homeIntroMedia" aria-label="Foto personal">
            <img className="homePhoto" src={fotoMia} alt="Foto personal" />
          </div>

          <div className="homeIntroText">
            <h1 className="h1">Hola!</h1>

            <p className="lead">
              Hice esta página para vender ropa que ya no uso y me viene molestando
              tener guardada.
            </p>

            <p className="text">
              Es ropa que compré en viajes o en momentos donde después me dejó de
              gustar o de entrar. Está en excelente estado y es original.
              <br />
              <br />
              <span className="strong">Cada prenda es única</span>: no hay otros talles ni colores.
            </p>

            <div className="homeActions">
              <Link to="/store" className="btn btnPrimary">
                Ver tienda
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="homeCta">
        <h2 className="h2">Tienda</h2>

        <div className="homeGrid">
          <Link to="/store?cat=jeans" className="homeCard">
            <div className="homeCardIcon" aria-hidden="true" />
            <div className="homeCardText ui">Jeans</div>
          </Link>

          <Link to="/store?cat=bermudas" className="homeCard">
            <div className="homeCardIcon" aria-hidden="true" />
            <div className="homeCardText ui">Bermudas</div>
          </Link>

          <Link to="/store?cat=abrigo" className="homeCard">
            <div className="homeCardIcon" aria-hidden="true" />
            <div className="homeCardText ui">Abrigo</div>
          </Link>

          <Link to="/store" className="homeCard homeCardPrimary">
            <div className="homeCardIcon" aria-hidden="true" />
            <div className="homeCardText ui">Ver todo</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
