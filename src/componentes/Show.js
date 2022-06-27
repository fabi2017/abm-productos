import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {collection,getDocs,deleteDoc, doc,} from "firebase/firestore";
import db from "../firebase";
import "boxicons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Show() {
  const [products, setProducts] = useState([]);
  const dataProductos = collection(db, "productos");

  const MySwal = withReactContent(Swal);

  const getProductos = async () => {
    const data = await getDocs(dataProductos);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("su poducto es: ", products);
  };

  const deleteProductos = async (id) => {
    const productDoc = doc(db, "productos", id);
    deleteDoc(productDoc);
    getProductos();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Desea eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#228B22",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar!",
      confirmButtonText: "SI, eliminar!",
      backdrop: `
      rgba(0,0,0,0.45)
    url("./homer.gif")
     top
    no-repeat
  `,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductos(id);
        Swal.fire("Exito!", "Tu producto fue eliminado.", "success");
      }
    });
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-gid gap-2">
              <Link to="/add" className="btn btn-secondary mb-5">
                Agregar Producto
              </Link>
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <Link to={`/edit/${producto.id}`} className="btn btn-light me-2" >
                          <box-icon name="edit" type="solid" animation="tada-hover"></box-icon>
                        </Link>
                        <button
                          onClick={() => {
                            confirmDelete(producto.id);
                          }} className="btn btn-danger my-2" >
                          <box-icon name="trash-alt" animation="tada-hover"></box-icon>
                        </button>
                      </td>
                    </tr> )) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Show;
