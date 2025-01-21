import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";
import { TLoginForm, TSingUpForm } from "./type";
import { IUser, TRole } from "@/interface/IUser";
import { USER_NOT_FOUND } from "@/constant/error";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";

export const useAuthState = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const auth = getAuth();
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as IUser;
          setUser(userData);
        }
      } else {
        setUser(null);
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  return user;
};

export const signup = async (value: TSingUpForm) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    value.email,
    value.password,
  );
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: value.name,
  });
  const newUser: IUser = {
    uid: userCredential.user.uid,
    name: value.name,
    email: value.email,
    role: "user",
    photoURL: userCredential.user.photoURL,
    emailVerified: userCredential.user.emailVerified,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    password: value.password,
    phone: "",
  };

  await setDoc(doc(db, "users", newUser.uid), newUser);
  return newUser;
};

export const login = async (value: TLoginForm, role: TRole = "user") => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    value.email,
    value.password,
  );

  const docRef = doc(db, "users", userCredential.user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    signOut(auth);
    throw new FirebaseError("user not found", USER_NOT_FOUND);
  }

  if (role !== "user" && docSnap.data()?.role === "user") {
    signOut(auth);
    throw new FirebaseError("operation-not-allowed", "Operation not allowed");
  }

  const user = docSnap.data() as IUser;
  user.emailVerified = userCredential.user.emailVerified;
  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const docRef = doc(db, "users", userCredential.user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const user: IUser = {
      uid: userCredential.user.uid,
      name: userCredential.user.displayName?.split(" ")[0] || "",
      email: userCredential.user.email || "",
      photoURL: userCredential.user.photoURL || "",
      emailVerified: userCredential.user.emailVerified,
      role: "user",
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      phone: "",
    };
    await setDoc(doc(db, "users", user.uid), user);
    return user;
  }

  const user = docSnap.data() as IUser;
  user.emailVerified = userCredential.user.emailVerified;
  return user;
};

export const checkAccountExist = async (email: string) => {
  const user = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(user);
  return querySnapshot.docs.length > 0;
};
