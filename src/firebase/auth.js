import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}


export function loginUser(email, password) {

  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
    return auth.signOut();
}



// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export function loginWithGoogle() {
  return signInWithPopup(auth, provider);
}

// import { sendPasswordResetEmail } from "firebase/auth";

// export function resetPassword(email) {
//   return sendPasswordResetEmail(auth, email);
// }
