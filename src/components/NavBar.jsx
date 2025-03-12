import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-xl font-bold">Tienda de Instrumentos</h1>
            <div>
                <Link to="/" className="mx-2">Home</Link>
                <Link to="/categorias" className="mx-2">Categorías</Link>
                <Link to="/contacto" className="mx-2">Contacto</Link>
            </div>
        </nav>
    );
};

export default Navbar;