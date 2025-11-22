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

// Funciones para manejar fotos de perfil
export async function updateUserPhoto(uid, photoBase64) {
  try {
    await updateDoc(doc(db, "usuarios", uid), {
      photoURL: photoBase64,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user photo:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserPhoto(uid) {
  try {
    const userDoc = await getDoc(doc(db, "usuarios", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { success: true, photoURL: userData.photoURL || null };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error getting user photo:", error);
    return { success: false, error: error.message };
  }
}

// Función helper para convertir archivo a Base64
export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
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

// Funciones para el sistema de logros
export async function initializeLogros() {
  try {
    // Verificar si ya existen logros en la base de datos
    const logrosQuery = query(collection(db, "logros"));
    const logrosSnap = await getDocs(logrosQuery);
    
    if (logrosSnap.empty) {
      // Crear logros predeterminados
      const logrosPredeterminados = [
        {
          id: "rookie_bienestar",
          nombre: "Rookie del bienestar",
          descripcion: "Completa tu primera semana de rutina.",
          condicion: "semana_completa",
          valorRequerido: 1,
          categoria: "constancia",
          icono: "🌱",
          borderColor: "#4ECDC4",
          rareza: "comun",
          puntos: 100
        },
        {
          id: "constancia_mensual",
          nombre: "Constancia mensual",
          descripcion: "Mantén tu rutina durante un mes completo.",
          condicion: "meses_consecutivos",
          valorRequerido: 1,
          categoria: "constancia",
          icono: "🌿",
          borderColor: "#45B7D1",
          rareza: "raro",
          puntos: 500
        },
        {
          id: "maestro_equilibrio",
          nombre: "Maestro del equilibrio",
          descripcion: "Combina 3 actividades diferentes en una semana.",
          condicion: "actividades_variadas_semana",
          valorRequerido: 3,
          categoria: "variedad",
          icono: "⚖️",
          borderColor: "#FECA57",
          rareza: "comun",
          puntos: 200
        },
        {
          id: "hidratacion_perfecta",
          nombre: "Hidratación perfecta",
          descripcion: "Cumple tu meta de hidratación 7 días consecutivos.",
          condicion: "hidratacion_consecutiva",
          valorRequerido: 7,
          categoria: "salud",
          icono: "💧",
          borderColor: "#4ECDC4",
          rareza: "comun",
          puntos: 150
        },
        {
          id: "cardio_warrior",
          nombre: "Cardio Warrior",
          descripcion: "Completa 30 sesiones de cardio.",
          condicion: "cardio_total",
          valorRequerido: 30,
          categoria: "ejercicio",
          icono: "🏃‍♂️",
          borderColor: "#FF6B6B",
          rareza: "raro",
          puntos: 400
        },
        {
          id: "zen_master",
          nombre: "Maestro Zen",
          descripcion: "Medita 14 días consecutivos.",
          condicion: "meditacion_consecutiva",
          valorRequerido: 14,
          categoria: "relajacion",
          icono: "🧘",
          borderColor: "#9b59b6",
          rareza: "epico",
          puntos: 600
        },
        {
          id: "maraton_bienestar",
          nombre: "Maratón del bienestar",
          descripcion: "Completa 4 semanas consecutivas sin fallar.",
          condicion: "semanas_perfectas",
          valorRequerido: 4,
          categoria: "constancia",
          icono: "🏆",
          borderColor: "#FFD700",
          rareza: "legendario",
          puntos: 1000
        },
        {
          id: "organizador_maestro",
          nombre: "Organizador maestro",
          descripcion: "Programa 50 actividades personalizadas.",
          condicion: "actividades_programadas",
          valorRequerido: 50,
          categoria: "organización",
          icono: "📅",
          borderColor: "#96CEB4",
          rareza: "raro",
          puntos: 350
        },
        {
          id: "descanso_perfecto",
          nombre: "Descanso perfecto",
          descripcion: "Cumple tu meta de sueño 10 días consecutivos.",
          condicion: "descanso_consecutivo",
          valorRequerido: 10,
          categoria: "salud",
          icono: "😴",
          borderColor: "#C1E1C1",
          rareza: "comun",
          puntos: 250
        },
        {
          id: "explorador_habitos",
          nombre: "Explorador de hábitos",
          descripcion: "Prueba todas las categorías de actividades.",
          condicion: "categorias_completas",
          valorRequerido: 6,
          categoria: "variedad",
          icono: "🌟",
          borderColor: "#FECA57",
          rareza: "epico",
          puntos: 750
        }
      ];

      // Guardar cada logro en Firestore
      for (const logro of logrosPredeterminados) {
        await setDoc(doc(db, "logros", logro.id), {
          ...logro,
          createdAt: new Date()
        });
      }

      console.log("Logros inicializados correctamente");
      return { success: true, message: "Logros inicializados" };
    }

    return { success: true, message: "Logros ya existen" };
  } catch (error) {
    console.error("Error inicializando logros:", error);
    return { success: false, error: error.message };
  }
}

export async function getLogros() {
  try {
    const logrosSnap = await getDocs(collection(db, "logros"));
    const logros = logrosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: logros };
  } catch (error) {
    console.error("Error getting logros:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserLogros(uid) {
  try {
    const userLogrosDoc = await getDoc(doc(db, "user_logros", uid));
    if (userLogrosDoc.exists()) {
      return { success: true, data: userLogrosDoc.data() };
    } else {
      // Inicializar logros del usuario
      await setDoc(doc(db, "user_logros", uid), {
        logrosObtenidos: [],
        progreso: {},
        puntosTotal: 0,
        createdAt: new Date()
      });
      return { success: true, data: { logrosObtenidos: [], progreso: {}, puntosTotal: 0 } };
    }
  } catch (error) {
    console.error("Error getting user logros:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserLogro(uid, logroId, progreso = null) {
  try {
    const userLogrosRef = doc(db, "user_logros", uid);
    const userLogrosDoc = await getDoc(userLogrosRef);
    
    let userData = { logrosObtenidos: [], progreso: {}, puntosTotal: 0 };
    
    if (userLogrosDoc.exists()) {
      userData = userLogrosDoc.data();
    }

    // Actualizar progreso si se proporciona
    if (progreso !== null) {
      userData.progreso[logroId] = progreso;
    }

    // Verificar si el logro debe desbloquearse
    const logroDoc = await getDoc(doc(db, "logros", logroId));
    if (logroDoc.exists()) {
      const logro = logroDoc.data();
      const progresoActual = userData.progreso[logroId] || 0;
      
      if (progresoActual >= logro.valorRequerido && !userData.logrosObtenidos.includes(logroId)) {
        userData.logrosObtenidos.push(logroId);
        userData.puntosTotal += logro.puntos;
        
        // Actualizar en Firestore
        await updateDoc(userLogrosRef, userData);
        
        return { 
          success: true, 
          logrosDesbloqueado: true, 
          logro: { id: logroId, ...logro },
          data: userData 
        };
      }
    }

    // Actualizar en Firestore
    await updateDoc(userLogrosRef, userData);
    
    return { success: true, logrosDesbloqueado: false, data: userData };
  } catch (error) {
    console.error("Error updating user logro:", error);
    return { success: false, error: error.message };
  }
}

export async function checkAndUpdateLogros(uid) {
  try {
    // Obtener datos del usuario para verificar logros
    const progresoResult = await getProgresoSemanal(uid);
    const actividadesResult = await getActividadesUsuario(uid);
    
    if (!progresoResult.success || !actividadesResult.success) {
      return { success: false, error: "No se pudieron obtener datos del usuario" };
    }

    const progreso = progresoResult.data;
    const actividades = actividadesResult.data;
    
    const logrosDesbloqueados = [];

    // Verificar hidratación consecutiva
    let hidratacionConsecutiva = 0;
    for (let i = progreso.length - 1; i >= 0; i--) {
      const diaProgreso = progreso[i].progreso;
      if (diaProgreso && diaProgreso.hidratacion && 
          diaProgreso.hidratacion.current >= diaProgreso.hidratacion.total) {
        hidratacionConsecutiva++;
      } else {
        break;
      }
    }
    
    const hidratacionResult = await updateUserLogro(uid, "hidratacion_perfecta", hidratacionConsecutiva);
    if (hidratacionResult.logrosDesbloqueado) {
      logrosDesbloqueados.push(hidratacionResult.logro);
    }

    // Verificar actividades programadas
    const actividadesProgramadas = actividades.length;
    const programadasResult = await updateUserLogro(uid, "organizador_maestro", actividadesProgramadas);
    if (programadasResult.logrosDesbloqueado) {
      logrosDesbloqueados.push(programadasResult.logro);
    }

    // Verificar cardio total
    const actividadesCardio = actividades.filter(act => 
      act.categoria === 'ejercicio' && act.completada
    ).length;
    const cardioResult = await updateUserLogro(uid, "cardio_warrior", actividadesCardio);
    if (cardioResult.logrosDesbloqueado) {
      logrosDesbloqueados.push(cardioResult.logro);
    }

    return { success: true, logrosDesbloqueados };
  } catch (error) {
    console.error("Error checking logros:", error);
    return { success: false, error: error.message };
  }
}
