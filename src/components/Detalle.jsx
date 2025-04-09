import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        fetch("/instrumentos.json")
            .then((res) => res.json())
            .then((data) => {
                const productoEncontrado = data.find((item) => item.id === parseInt(id));
                setProducto(productoEncontrado);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!producto) return <p>Producto no encontrado</p>;

    return (
        <div className="flex flex-col items-center text-center p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-60 h-60 object-contain rounded-md"
            />

            <h1 className="text-2xl font-bold mt-4">{producto.nombre}</h1>
            <p className="text-gray-700 mt-2">{producto.descripcion}</p>
            <p className="text-xl font-semibold mt-4 text-blue-600">${producto.precio}</p>

            <button
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => agregarAlCarrito(producto)}
            >
                Agregar al carrito
            </button>
            <Link
                to="/"
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Volver al catálogo
            </Link>
        </div>

    );
};

export default DetalleProducto;
