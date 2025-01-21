"use client";

import React, { useState } from "react";
import { auth } from "@/config/firebase";
import { useAuth } from "@/features/auth/useAuth";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "next/image";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const {
    signInWithEmailAndPassword,

    loginWithGoogle,
  } = useAuth();

  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthUser(user);
  //     } else {
  //       setAuthUser(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log("User signed up:", userCredential);
        toast.success("Akun berhasil dibuat");
        router.push("/");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log("User signed in:", userCredential);
        toast.success("Akun berhasil masuk");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error signing up/signing in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      console.log("Google sign-in:", user);
      router.push("/");
      toast.success("Akun berhasil masuk");
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", error.message);
    }
  };

  // const userSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     toast.success("Sign Out Successful");
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };

  return (
    <section className="flex items-center justify-center gap-2 border">
      <div className="flex flex-col items-center justify-center gap-6 py-32">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <h2 className="mb-4 text-center text-2xl font-bold text-black">
          Create your Account
        </h2>
        <form
          onSubmit={handleEmailPasswordAuth}
          className="gap- flex w-[400px] flex-col"
        >
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mb-4 rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="w-full rounded-md bg-primary-orange p-3 text-white"
            type="submit"
          >
            {isSignUp ? "Sign Up " : "Sign In"}
          </button>
          <p className="p-2 text-center text-text-l text-black">or</p>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-md bg-black p-3 text-white"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon
              src="/images/google.png"
              width={24}
              height={24}
              className="mr-2 h-6"
              alt="Google Icon"
            />
            Sign in with google
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          <Link href="/login" className="text-primary">
            Already have an account?{" "}
            <spam className="text-primary-orange underline">Sign in</spam>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
