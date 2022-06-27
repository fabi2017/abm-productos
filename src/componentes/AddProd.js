import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

function AddProd() {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState(1);
  const navigate = useNavigate();
  const dataProductos = collection(db, "productos");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(dataProductos, { nombre: nombre, stock: stock });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h5>Añadir producto</h5>
          <form onSubmit={store} className="contForm">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                required
                onChange={(e) => setNombre(e.target.value)}
              ></input>
            </div>

            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="text"
                className="form-control"
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
              ></input>
            </div>
            <button type="onSubmit" className="btn btn-secondary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProd;
