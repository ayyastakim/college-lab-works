"use client";
import { auth, provider } from "@/config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(userCredential.user);
      toast.success("Login successful!");
      return userCredential;
    } catch (error) {
      toast.error("Login failed: " + error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      toast.success("Google login successful!");
      return userCredential;
    } catch (error) {
      toast.error("Google login failed: " + error.message);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Sign Out Successful");
      router.push("/");
    } catch (error) {
      toast.error("Error signing out: " + error.message);
    }
  };

  // const registerWithEmailPassword = async (email, password) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password,
  //     );
  //     return userCredential;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  return {
    user,
    loginWithGoogle,
    loginWithEmailPassword,
    handleSignOut,
  };
};
