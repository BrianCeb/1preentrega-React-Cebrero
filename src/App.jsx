import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import DetalleProducto from "./components/Detalle";
import Categorias from "./components/Categorias";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:categoriaId" element={<ItemListContainer />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<h2 className="p-6 text-center">404 - Página no encontrada</h2>} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}
