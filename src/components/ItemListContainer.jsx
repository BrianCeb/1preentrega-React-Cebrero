import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item";

const ItemListContainer = () => {
    const [resultado, setResultado] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(params.id === undefined ? "/instrumentos.json" : `/producto/${params.id}.json`)  // Aquí buscas el producto por id si es necesario
            .then((res) => res.json())
            .then((res) => {
                setResultado(res);  // Almacena el resultado
            })
            .catch((error) => console.error("Error al cargar los datos:", error));
    }, [params.id]);  // Dependemos de params.id para hacer la búsqueda cuando cambia

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {resultado.map((item) => (
                <Item key={item.id} producto={item} />  // Mapeamos los productos
            ))}
        </div>
    );
};

export default ItemListContainer;
