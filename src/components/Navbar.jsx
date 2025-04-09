import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartWidget from "./CartWidget";

const Navbar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { cantidadTotal } = useCart();

    const categorias = [
        { nombre: "Guitarras", ruta: "/categorias/guitarras" },
        { nombre: "Baterías", ruta: "/categorias/baterias" },
        { nombre: "Teclados", ruta: "/categorias/teclados" },
        { nombre: "Violines", ruta: "/categorias/violines" },
        { nombre: "Saxofones", ruta: "/categorias/saxofones" }
    ];

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <Link to="/" className="hover:underline"><h1 className="text-xl font-bold">MDZ-Store</h1></Link>

            <div className="flex items-center space-x-4">
                <div className="relative">
                    <button
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Categorías
                    </button>

                    {menuAbierto && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                            {categorias.map((categoria, index) => (
                                <Link
                                    key={index}
                                    to={categoria.ruta}
                                    className="block px-4 py-2 hover:bg-gray-200"
                                    onClick={() => setMenuAbierto(false)}
                                >
                                    {categoria.nombre}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                
                <Link to="/contacto" className="hover:underline">Contacto</Link>
                <Link to="/carrito">
                    <CartWidget cantidad={cantidadTotal} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
