import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="row">
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                  Mostrar nuevos lanzamientos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search/artist">
                    Buscar por artista
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
};

export default NavBar;
