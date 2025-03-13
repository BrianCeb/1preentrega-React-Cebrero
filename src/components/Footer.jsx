import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Mdz-Store. Todos los derechos reservados.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <Link to="/contacto" className="hover:text-gray-400">Contacto</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;