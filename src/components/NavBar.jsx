import React from "react";
import CartWidget from "./CartWidget";
import "../NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#home">Inicio</a></li>
                <li><a href="#about">Sobre nosostros</a></li>
                <li><a href="#contact">Contacto</a></li>
                <li><a href="#category">Categorias</a></li>
            </ul>
            <div className="navbar-right">
                <CartWidget />
            </div>
        </nav>
    );
};


export default NavBar;
