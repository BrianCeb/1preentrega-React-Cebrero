import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Cart = () => {
    const { cartItems, agregarAlCarrito, quitarUnidad, quitarDelCarrito, vaciarCarrito } = useCart();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
    const [enviando, setEnviando] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calcularNuevoTotal = () => {
            const nuevoTotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
            setTotal(nuevoTotal);
        };

        calcularNuevoTotal();
    }, [cartItems]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calcularTotal = () => {
        return total;
    };

    const handleCompra = async () => {
        if (enviando) return;

        if (!formData.nombre || !formData.email || !formData.telefono) {
            alert('Por favor completa todos los campos.');
            return;
        }

        setEnviando(true);

        const orden = {
            cliente: formData,
            items: cartItems.map(({ id, nombre, precio, cantidad }) => ({
                id,
                nombre,
                precio,
                cantidad,
            })),
            total: calcularTotal(),
            fecha: Timestamp.fromDate(new Date()),
        };

        try {
            const docRef = await addDoc(collection(db, 'ordenes'), orden);
            alert(`Compra realizada. ID de orden: ${docRef.id}`);
            vaciarCarrito();
            setMostrarFormulario(false);
        } catch (error) {
            console.error('Error al guardar la orden:', error);
            alert('Ocurrió un error al procesar la compra.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Tu carrito</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-white p-4 shadow rounded"
                        >
                            <div className="flex items-center gap-4">
                                <img src={item.imagen || item.imagenUrl} alt={item.nombre} className="w-16 h-16 object-contain" />
                                <div>
                                    <h3 className="font-semibold">{item.nombre}</h3>
                                    <p>${item.precio} x {item.cantidad}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => quitarUnidad(item.id)}
                                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                                >
                                    -
                                </button>
                                <span>{item.cantidad}</span>
                                <button
                                    onClick={() => agregarAlCarrito(item)}
                                    className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => quitarDelCarrito(item.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="text-right mt-4">
                        <p className="text-xl font-bold">Total: ${calcularTotal().toFixed(2)}</p>
                        <button
                            onClick={() => setMostrarFormulario(true)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Finalizar compra
                        </button>
                    </div>

                    {mostrarFormulario && (
                        <div className="mt-6 bg-gray-100 p-4 rounded">
                            <h3 className="text-lg font-bold mb-2">Datos del cliente</h3>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="block w-full p-2 mb-2 rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full p-2 mb-2 rounded"
                            />
                            <input
                                type="text"
                                name="telefono"
                                placeholder="Teléfono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="block w-full p-2 mb-2 rounded"
                            />
                            <button
                                onClick={handleCompra}
                                disabled={enviando}
                                className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${enviando ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {enviando ? 'Procesando...' : 'Confirmar compra'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;