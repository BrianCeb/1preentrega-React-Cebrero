import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCart } from '../context/CartContext';

const Detalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'instrumentos'));
                const productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const productoEncontrado = productos.find(item => item.id === parseInt(id));

                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                } else {
                    console.log('No se encontró el producto');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el producto desde Firebase:', error);
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Cargando detalle...</p>;
    if (!producto) return <p className="text-center mt-10">Producto no encontrado</p>;

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

export default Detalle;
