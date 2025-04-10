import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCartItems((prevItems) => {
            const itemExistente = prevItems.find((item) => item.id === producto.id);
            if (itemExistente) {
                return prevItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...producto, cantidad: 1 }];
            }
        });

        toast.success(`${producto.nombre} agregado al carrito.`);
    };

    const quitarUnidad = (id) => {
        setCartItems((items) =>
            items
                .map((item) =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    };

    const quitarDelCarrito = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const vaciarCarrito = () => {
        setCartItems([]);
    };

    const cantidadTotal = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCarrito = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                agregarAlCarrito,
                quitarUnidad,
                quitarDelCarrito,
                vaciarCarrito,
                cantidadTotal,
                totalCarrito
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
