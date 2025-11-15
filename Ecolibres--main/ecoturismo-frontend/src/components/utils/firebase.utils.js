// ✅ Importa las funciones necesarias del SDK modular de Firebase
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  getIdToken,
  updateProfile
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

// 🧩 Configuración de Firebase (datos reales del proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyBg_MLIEqy8-_yGnX1HtlDH__2KIi-FuLM",
  authDomain: "ecoturismo-5a0e0.firebaseapp.com",
  projectId: "ecoturismo-5a0e0",
  storageBucket: "ecoturismo-5a0e0.appspot.com", // ✅ debe terminar en .appspot.com
  messagingSenderId: "1046038352351",
  appId: "1:1046038352351:web:25d154de1f65041489346a",
  measurementId: "G-QSCEL7X9NW"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// --- Servicios principales ---
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// --- Funciones de autenticación ---

/**
 * Inicia sesión con correo y contraseña.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error en login:", error.code, error.message);
    throw error;
  }
};

/**
 * Registra un nuevo usuario con correo y contraseña.
 * Crea también su documento base en Firestore.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<UserCredential>}
 */
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Crea documento de usuario en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: new Date().toISOString(),
      logros: [],
    });

    return userCredential;
  } catch (error) {
    console.error("Error en register:", error.code, error.message);
    throw error;
  }
};

// --- Función para actualizar datos del perfil ---
/**
 * Actualiza el nombre o la foto de perfil del usuario.
 * @param {object} updates { displayName?, photoURL? }
 */
export const updateUserProfile = async (updates = {}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No hay usuario autenticado");
  try {
    await updateProfile(user, updates);
    // También actualiza Firestore si el usuario tiene documento
    const userDoc = doc(db, "usuarios", user.uid);
    await setDoc(userDoc, updates, { merge: true });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw error;
  }
};

// --- Función para subir imágenes al Storage ---
/**
 * Sube una imagen al Storage y devuelve su URL pública.
 * @param {File} file Archivo de imagen
 * @param {string} path Ruta en el storage (por ejemplo 'profilePictures/uid')
 * @returns {Promise<string>} URL de descarga
 */
export const uploadImageAndGetURL = async (file, path) => {
  if (!file) throw new Error("No se seleccionó ningún archivo");
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};

// --- Utilidades de autenticación básicas ---
export { onAuthStateChanged, signOut, getIdToken };

// Exporta todo por si se necesita en otros módulos
export {
  ref,
  uploadBytes,
  getDownloadURL,
  doc,
  setDoc,
  getDoc
};

// 🔚 Exporta la app principal por compatibilidad
export default app;
