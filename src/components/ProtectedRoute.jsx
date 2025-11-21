import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  if (!user) {
    alert("Acceso denegado. Por favor, inicie sesión.");
    return <Navigate to="/" replace />;  // redirige a login
  }

  return children;
}
