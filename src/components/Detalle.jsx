import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const DetalleProducto = () => {
    const { id } = useParams();  // Recuperar el id de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/instrumentos.json")  // Cargar el archivo JSON con los productos
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
    }, [id]);  // Volver a cargar cuando el id cambie

    if (loading) return <p>Cargando...</p>;
    if (!producto) return <p>Producto no encontrado</p>;

    return (
        <div className="p-6">
            <img src={producto.imagen} alt={producto.nombre} className="w-full max-w-md mx-auto rounded-md" />
            <h1 className="text-2xl font-bold mt-4">{producto.nombre}</h1>
            <p className="text-gray-700 mt-2">{producto.descripcion}</p>
            <p className="text-xl font-semibold mt-2">${producto.precio}</p>
            <Link to="/" className="text-blue-500 mt-4 inline-block">Volver al catálogo</Link>
        </div>
    );
};

export default DetalleProducto;
