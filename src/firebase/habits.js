import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Funciones para hábitos (existentes)
export async function addHabit(habit) {
  return await addDoc(collection(db, "habits"), habit);
}

export async function getHabits() {
  const snap = await getDocs(collection(db, "habits"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Nuevas funciones para usuarios
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
