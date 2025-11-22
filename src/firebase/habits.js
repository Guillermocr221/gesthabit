import { collection, addDoc, getDocs, doc, setDoc, getDoc, query, where, orderBy, limit, updateDoc, deleteDoc } from "firebase/firestore";
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

// Nuevas funciones para actividades personalizadas
export async function createActividad(uid, actividad) {
  console.log('🔧 createActividad llamada con:');
  console.log('  - uid:', uid);
  console.log('  - actividad:', actividad);
  
  try {
    const actividadData = {
      ...actividad,
      uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('📝 Datos preparados para guardar:', actividadData);
    console.log('🎯 Intentando guardar en colección: actividades_usuario');
    
    const docRef = await addDoc(collection(db, "actividades_usuario"), actividadData);
    
    console.log('✅ Documento creado exitosamente con ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Error creating actividad:", error);
    console.error("❌ Error details:", {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return { success: false, error: error.message };
  }
}

export async function getActividadesUsuario(uid, fecha = null) {
  try {
    let q;
    if (fecha) {
      // Consulta simple por uid y fecha - sin orderBy para evitar índices compuestos
      q = query(
        collection(db, "actividades_usuario"), 
        where("uid", "==", uid),
        where("fecha", "==", fecha)
      );
    } else {
      // Solo por uid - sin orderBy
      q = query(
        collection(db, "actividades_usuario"), 
        where("uid", "==", uid)
      );
    }
    
    const snap = await getDocs(q);
    const actividades = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Ordenar en el cliente si es necesario
    if (fecha) {
      actividades.sort((a, b) => {
        if (a.hora && b.hora) {
          return a.hora.localeCompare(b.hora);
        }
        return new Date(b.createdAt?.seconds * 1000 || 0) - new Date(a.createdAt?.seconds * 1000 || 0);
      });
    } else {
      actividades.sort((a, b) => {
        const dateA = new Date(a.fecha || 0);
        const dateB = new Date(b.fecha || 0);
        return dateB - dateA;
      });
    }
    
    return { success: true, data: actividades };
  } catch (error) {
    console.error("Error getting actividades usuario:", error);
    return { success: false, error: error.message };
  }
}

export async function updateActividadCompletada(actividadId, completada) {
  try {
    await updateDoc(doc(db, "actividades_usuario", actividadId), {
      completada,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating actividad:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteActividad(actividadId) {
  try {
    await deleteDoc(doc(db, "actividades_usuario", actividadId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting actividad:", error);
    return { success: false, error: error.message };
  }
}

// Nuevas funciones para estadísticas
export async function getProgresoSemanal(uid) {
  try {
    const hoy = new Date();
    const hace7Dias = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const progresoDatos = [];
    
    // Obtener datos de los últimos 7 días
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(hace7Dias.getTime() + i * 24 * 60 * 60 * 1000);
      const fechaStr = fecha.toISOString().split('T')[0];
      
      const result = await getProgresoDaily(uid, fechaStr);
      progresoDatos.push({
        fecha: fechaStr,
        dia: fecha.toLocaleDateString('es-ES', { weekday: 'long' }),
        progreso: result.success ? result.data : null
      });
    }
    
    return { success: true, data: progresoDatos };
  } catch (error) {
    console.error("Error getting progreso semanal:", error);
    return { success: false, error: error.message };
  }
}

export async function getActividadesPorCategoriaSemana(uid) {
  try {
    const hoy = new Date();
    const hace7Dias = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
    const hace7DiasStr = hace7Dias.toISOString().split('T')[0];
    const hoyStr = hoy.toISOString().split('T')[0];
    
    const q = query(
      collection(db, "actividades_usuario"),
      where("uid", "==", uid),
      where("fecha", ">=", hace7DiasStr),
      where("fecha", "<=", hoyStr),
      where("completada", "==", true)
    );
    
    const snap = await getDocs(q);
    const actividades = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Agrupar por categoría
    const categoriasCount = {};
    actividades.forEach(actividad => {
      const categoria = actividad.categoria || 'personal';
      categoriasCount[categoria] = (categoriasCount[categoria] || 0) + 1;
    });
    
    return { success: true, data: categoriasCount };
  } catch (error) {
    console.error("Error getting actividades por categoria:", error);
    return { success: false, error: error.message };
  }
}

export async function getMetasDiariasCumplidas(uid) {
  try {
    const hoy = new Date();
    const hace30Dias = new Date(hoy.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const metasDatos = [];
    
    // Obtener datos de los últimos 30 días
    for (let i = 0; i < 30; i++) {
      const fecha = new Date(hace30Dias.getTime() + i * 24 * 60 * 60 * 1000);
      const fechaStr = fecha.toISOString().split('T')[0];
      
      const result = await getProgresoDaily(uid, fechaStr);
      if (result.success && result.data) {
        const progreso = result.data;
        let metasCumplidas = 0;
        let totalMetas = 0;
        
        // Verificar metas principales
        const metas = ['hidratacion', 'cardio', 'meditacion', 'descanso'];
        metas.forEach(meta => {
          if (progreso[meta]) {
            totalMetas++;
            if (progreso[meta].current >= progreso[meta].total) {
              metasCumplidas++;
            }
          }
        });
        
        const porcentaje = totalMetas > 0 ? (metasCumplidas / totalMetas) * 100 : 0;
        metasDatos.push({
          fecha: fechaStr,
          porcentaje: Math.round(porcentaje),
          metasCumplidas,
          totalMetas
        });
      } else {
        metasDatos.push({
          fecha: fechaStr,
          porcentaje: 0,
          metasCumplidas: 0,
          totalMetas: 0
        });
      }
    }
    
    return { success: true, data: metasDatos };
  } catch (error) {
    console.error("Error getting metas diarias:", error);
    return { success: false, error: error.message };
  }
}
