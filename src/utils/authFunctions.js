import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

const googleProvider = new GoogleAuthProvider();

export async function signInWithEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email, password, firstName, secondName) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, {
    displayName: `${firstName} ${secondName}`,
  });

  return userCredential;
}

export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export function getAuthErrorMessage(errorCode) {
  const errorMessages = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password":
      "Password is too weak. Please use a stronger password.",
    "auth/popup-closed-by-user": "Login cancelled by user.",
    "auth/popup-blocked": "Popup was blocked by browser.",
    "auth/network-request-failed":
      "Network error. Please check your connection.",
  };

  return errorMessages[errorCode] || "Authentication failed. Please try again.";
}
