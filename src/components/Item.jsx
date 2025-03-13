import { Link } from "react-router-dom";

const Item = ({ producto }) => {
    return (
        <article className="border rounded-lg shadow-lg p-4 flex flex-col items-center text-center" title={producto.nombre}>

            <div className="w-full flex justify-center">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-40 h-40 object-contain rounded-md"
                />
            </div>


            <h3 className="text-xl font-bold mt-4">{producto.nombre}</h3>
            <p className="text-gray-700 text-lg mt-2">${producto.precio}</p>


            <Link
                to={`/detalle/${producto.id}`}
                className="text-blue-500 mt-4 inline-block bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 transition"
            >
                Ver más
            </Link>
        </article>

    );
};

export default Item;
