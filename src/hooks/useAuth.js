import { useContext } from "react";
import AuthContext from "../context/AuthContext";


//Devuelve todos los datos del contexto de Auth:{ auth, login, logout}
export default () => useContext(AuthContext);
