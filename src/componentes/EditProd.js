import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import db from "../firebase";

function EditProd() {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "productos", id);
    const data = { nombre: nombre, stock: stock };
    await updateDoc(product, data);
    navigate("/");
  };

  const getProductById = async (id) => {
    const productId = await getDoc(doc(db, "productos", id));
    if (productId.exists()) {
      setNombre(productId.data().nombre);
      setStock(productId.data().stock);
    } else {
      console.log("no existe el producto");
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h5>Editar producto</h5>
          <form onSubmit={update} className="contForm">
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

export default EditProd;
