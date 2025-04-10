import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCart } from '../context/CartContext';

const ItemListContainer = () => {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { agregarAlCarrito } = useCart();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const q = categoria
                    ? query(collection(db, 'instrumentos'), where('categoria', '==', categoria))
                    : collection(db, 'instrumentos');

                const querySnapshot = await getDocs(q);
                const productosFirebase = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductos(productosFirebase);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener productos desde Firebase:', error);
                setLoading(false);
            }
        };

        fetchProductos();
    }, [categoria]);

    if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

    if (productos.length === 0) return <p className="text-center mt-10">No hay productos en esta categoría</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {productos.map(producto => (
                <div key={producto.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                    <img src={producto.imagen} alt={producto.nombre} className="w-48 h-48 object-contain mb-4" />
                    <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                    <p className="text-blue-600 font-bold text-xl">${producto.precio}</p>
                    <div className="flex gap-2 mt-4">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => agregarAlCarrito(producto)}
                        >
                            Agregar al carrito
                        </button>
                        <Link
                            to={`/detalle/${producto.id}`}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Detalle
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemListContainer;
