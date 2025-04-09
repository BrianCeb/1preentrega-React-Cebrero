import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, quitarDelCarrito, vaciarCarrito } = useCart();

    const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    if (cartItems.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl">Tu carrito está vacío</h2>
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Volver al catálogo</Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Tu carrito</h2>
            <ul className="space-y-4">
                {cartItems.map((item) => (
                    <li key={item.id} className="border rounded p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">{item.nombre}</h3>
                            <p>${item.precio} x {item.cantidad}</p>
                        </div>
                        <button
                            className="text-red-600 hover:underline"
                            onClick={() => quitarDelCarrito(item.id)}
                        >
                            Quitar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-right">
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                <button
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={vaciarCarrito}
                >
                    Vaciar carrito
                </button>
            </div>
        </div>
    );
};

export default Cart;
