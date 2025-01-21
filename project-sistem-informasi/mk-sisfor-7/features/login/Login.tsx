"use client";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { FaGoogle } from "react-icons/fa6";
const Login = () => {
  const { login, handleSigninWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login.mutateAsync({ email, password, role: "user" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center px-4 text-white md:px-0"
      style={{
        backgroundImage: "url('images/bgg.jpg')",
      }}
    >
      <div className="w-full rounded-lg border border-white/50 bg-white/20 p-8 shadow-lg backdrop-blur-md md:w-[28%]">
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          Login
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="email"
              className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
              Your Email
            </label>
            <BiUser className="absolute right-4 top-3 text-white" />
          </div>

          <div className="relative my-4">
            <input
              type="password"
              className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
              Your Password
            </label>
            <AiOutlineUnlock className="absolute right-4 top-3 text-white" />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link href="/" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>

          <button
            className="mb-4 mt-10 w-full rounded-full bg-white py-2 text-lg text-emerald-800 transition-colors duration-300 hover:bg-emerald-600 hover:text-white"
            type="submit"
            disabled={login.isLoading}
          >
            Login
          </button>
          <p className="text-center text-text-m">or login with</p>
          <button
            className="mb-4 mt-2 flex w-full flex-row items-center justify-center gap-2 rounded-full bg-white py-2 text-lg text-emerald-800 transition-colors duration-300 hover:bg-emerald-600 hover:text-white"
            onClick={handleSigninWithGoogle}
          >
            <FaGoogle className="" />
            <p>Google</p>
          </button>

          <div className="text-center">
            <span>
              New Here?{" "}
              <Link className="text-blue-400" href="/signup">
                Create an Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
