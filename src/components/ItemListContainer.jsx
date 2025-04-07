import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";

const ItemListContainer = () => {
    const [resultado, setResultado] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const { categoriaId } = useParams();

    useEffect(() => {
        fetch("/instrumentos.json")
            .then((res) => res.json())
            .then((data) => {
                if (categoriaId) {
                    const filtrados = data.filter(producto =>
                        producto.categoria === categoriaId.toLowerCase()
                    );
                    setResultado(filtrados);
                } else {
                    setResultado(data);
                }
            })
            .catch((error) => console.error("Error al cargar los datos:", error));
    }, [categoriaId]);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resultado.slice(0, visibleCount).map((item) => (
                    <Item key={item.id} producto={item} />
                ))}
            </div>
            {resultado.length > visibleCount && (
                <div className="flex justify-center mt-6">
                    <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => setVisibleCount(visibleCount + 6)}
                    >
                        Ver más
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemListContainer;
