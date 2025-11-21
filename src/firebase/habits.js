import { collection, addDoc, getDocs, doc, setDoc, getDoc, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Funciones para hábitos (existentes)
export async function addHabit(habit) {
  return await addDoc(collection(db, "habits"), habit);
}

export async function getHabits() {
  const snap = await getDocs(collection(db, "habits"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Funciones para usuarios (existentes)
export async function createUser(uid, userData) {
  try {
    await setDoc(doc(db, "usuarios", uid), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }
}

export async function getUser(uid) {
  try {
    const userDoc = await getDoc(doc(db, "usuarios", uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUser(uid, userData) {
  try {
    await setDoc(doc(db, "usuarios", uid), {
      ...userData,
      updatedAt: new Date()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
}

// Nuevas funciones para consejos
export async function getConsejos(categoria = null) {
  try {
    let q;
    if (categoria) {
      q = query(collection(db, "consejos"), where("categoria", "==", categoria));
    } else {
      q = collection(db, "consejos");
    }
    
    const snap = await getDocs(q);
    return { success: true, data: snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  } catch (error) {
    console.error("Error getting consejos:", error);
    return { success: false, error: error.message };
  }
}

export async function createConsejo(consejo) {
  try {
    await addDoc(collection(db, "consejos"), {
      ...consejo,
      createdAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating consejo:", error);
    return { success: false, error: error.message };
  }
}

// Funciones para progreso diario
export async function getProgresoDaily(uid, fecha) {
  try {
    const docId = `${uid}_${fecha}`;
    const progresoDoc = await getDoc(doc(db, "progreso_diario", docId));
    if (progresoDoc.exists()) {
      return { success: true, data: progresoDoc.data() };
    } else {
      return { success: true, data: null };
    }
  } catch (error) {
    console.error("Error getting progreso diario:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProgresoDaily(uid, fecha, progreso) {
  try {
    const docId = `${uid}_${fecha}`;
    await setDoc(doc(db, "progreso_diario", docId), {
      uid,
      fecha,
      ...progreso,
      updatedAt: new Date()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error updating progreso diario:", error);
    return { success: false, error: error.message };
  }
}

// Funciones para actividades por categoría
export async function getActividadesByCategoria(categoria) {
  try {
    const q = query(collection(db, "actividades"), where("categoria", "==", categoria));
    const snap = await getDocs(q);
    return { success: true, data: snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
  } catch (error) {
    console.error("Error getting actividades:", error);
    return { success: false, error: error.message };
  }
}
