import "./estilos/App.css";
import Show from "./componentes/Show";
import EditProd from "./componentes/EditProd";
import AddProd from "./componentes/AddProd";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header className="App-header">          
          <Link to="/" className="linkHead">
               <h2>Listado Productos</h2>
          </Link>          
        </header>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/add" element={<AddProd/>} />
          <Route path="/edit/:id" element={<EditProd/>} />          
          <Route path="*" element={<h1>PAGINA NO ENCONTRADA</h1>} />
        </Routes>     
      </BrowserRouter>     
    </div>
  );
}

export default App;
