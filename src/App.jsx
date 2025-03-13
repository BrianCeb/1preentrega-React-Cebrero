import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import DetalleProducto from "./components/Detalle";
import Categorias from "./components/Categorias";
import Contacto from "./components/Contacto";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}