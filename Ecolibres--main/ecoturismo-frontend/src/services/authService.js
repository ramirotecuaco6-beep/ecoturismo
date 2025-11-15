import { auth } from "../components/utils/firebase.utils";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const API_URL = "http://localhost:5000/api/usuarios"; // tu backend local

// Registrar usuario
export const registrarUsuario = async (nombre, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Enviar datos a tu backend
  await fetch(`${API_URL}/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid: user.uid,
      nombre,
      email
    }),
  });

  return user;
};

// Iniciar sesión
export const iniciarSesion = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
