import { createContext, useContext, useState } from "react";

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
    };

    const quitarDelCarrito = (id) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const vaciarCarrito = () => {
        setCartItems([]);
    };

    const cantidadTotal = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                agregarAlCarrito,
                quitarDelCarrito,
                vaciarCarrito,
                cantidadTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
