import React from "react";
import NavBar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import "./App.css";

function App() {
  return (
    <div className="body">
      <NavBar />
      <ItemListContainer greeting="Bienvenido a Music-Store MDZ!" />
    </div>
  );
}

export default App;