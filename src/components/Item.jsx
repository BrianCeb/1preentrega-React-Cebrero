import { Link } from "react-router-dom";

const Item = ({ producto }) => {
    return (
        <article className="border rounded-lg shadow-lg p-4" title={producto.nombre}>
            <h3 className="text-xl font-bold mt-2">{producto.nombre}</h3>
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-40 object-cover rounded-md" />
            <p className="text-gray-700">${producto.precio}</p>
            <Link to={`/detalle/${producto.id}`} className="text-blue-500 mt-2 inline-block">Ver más</Link>
        </article>
    );
};

export default Item;
