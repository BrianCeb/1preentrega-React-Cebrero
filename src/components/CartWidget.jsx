import React from "react";

const CartWidget = ({ cantidad }) => {
    return (
        <div className="relative flex items-center">
            <img className="w-6 h-6" src="/carrito-de-compras.png" alt="Carrito" />
            {cantidad > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                    {cantidad}
                </span>
            )}
        </div>
    );
};

export default CartWidget;
