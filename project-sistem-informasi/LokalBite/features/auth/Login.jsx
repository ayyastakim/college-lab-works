"use client";

import Image from "next/image";
import GoogleIcon from "next/image";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { loginWithEmailPassword, loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await loginWithEmailPassword(email, password);
      console.log("Logged in:", userCredential.user);
      router.push("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please check your email and password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Too many unsuccessful login attempts. Please try again later.",
        );
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await loginWithGoogle();
      console.log("Google sign-in:", userCredential.user);
      router.push("/");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center md:flex-row md:items-start">
      <div className="relative hidden h-1/3 w-full flex-col md:flex md:h-full md:w-1/2">
        <div className="absolute left-[5%] top-[10%] flex flex-col md:left-[10%] md:top-[20%]">
          <h1 className="z-10 my-4 pl-10 text-2xl font-bold text-white md:text-4xl">
            Indonesia Culinary
          </h1>
          <p className="z-10 pl-10 text-lg font-normal text-white md:text-xl">
            Get your Bali belly here
          </p>
        </div>
        <Image
          src="/images/login.jpg"
          width={100}
          height={100}
          alt="Cover"
          className="h-full w-full object-cover brightness-50"
        />
      </div>

      {/* Login Form Section */}
      <div className="flex h-2/3 w-full flex-col items-center justify-between bg-[#f5f5f5] px-8 pt-28 md:h-full md:w-1/2 md:p-20">
        <h1 className="mx-auto mr-auto w-full max-w-[500px] text-lg font-semibold text-[#060606] md:text-xl">
          Brand
        </h1>

        <div className="flex w-full max-w-[500px] flex-col">
          <div className="mb-2 flex w-full flex-col">
            <h3 className="mb-2 text-2xl font-semibold md:text-3xl">Login</h3>
            <p className="mb-2 text-base">
              Welcome! Please enter your details.
            </p>
          </div>

          {/* Error message display */}
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <div className="flex w-full flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border-b bg-transparent py-2 pl-3 outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border-b bg-transparent py-2 pl-3 outline-none focus:outline-none"
            />
          </div>

          <div className="flex w-full items-center justify-between pt-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 h-4 w-4" />
              <p className="text-sm">Remember Me</p>
            </div>
            <Link
              href="/"
              className="cursor-pointer whitespace-nowrap text-sm font-medium underline underline-offset-2"
            >
              Forget password?
            </Link>
          </div>

          <div className="my-4 flex w-full flex-col">
            <button
              type="submit"
              onClick={handleLogin}
              className="my-2 flex w-full cursor-pointer items-center justify-center rounded-md bg-primary-orange p-4 text-center text-white"
            >
              Log in
            </button>
            {/* <button className="my-2 flex w-full cursor-pointer items-center justify-center rounded-md border border-black bg-white p-4 text-center text-[#060606]">
              Register
            </button> */}
          </div>

          <div className="relative flex w-full items-center justify-center py-2">
            <div className="h-[1px] w-full bg-black"></div>
            <p className="absolute bg-[#f5f5f5] text-lg text-black/80">or</p>
          </div>
          <div
            onClick={handleGoogleSignIn}
            className="my-2 flex w-full cursor-pointer items-center justify-center rounded-md border border-black/40 bg-white p-4 text-center text-[#060606]"
          >
            <GoogleIcon
              src="/images/google.png"
              width={24}
              height={24}
              className="mr-2 h-6"
              alt="Google Icon"
            />
            Sign in with Google
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Don{"'"}t have an account?{" "}
            <Link
              href="/signup"
              className="cursor-pointer font-semibold underline underline-offset-2"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
