import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";

const ItemListContainer = () => {
    const [resultado, setResultado] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const params = useParams();

    useEffect(() => {
        fetch(params.id === undefined ? "/instrumentos.json" : `/producto/${params.id}.json`)
            .then((res) => res.json())
            .then((res) => {
                setResultado(res);
            })
            .catch((error) => console.error("Error al cargar los datos:", error));
    }, [params.id]);  

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