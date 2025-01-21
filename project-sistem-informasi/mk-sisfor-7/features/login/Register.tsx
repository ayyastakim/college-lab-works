"use client";
import { useAuth } from "./useAuth";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail, AiOutlineUnlock } from "react-icons/ai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { signup, handleSigninWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      setIsLoading(true);
      await signup.mutateAsync(data);
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setIsLoading(false);
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
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="relative my-4">
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              aria-invalid={errors.name ? "true" : "false"}
              className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
              Your Name
            </label>
            <BiUser className="absolute right-4 top-3 text-white" />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="relative my-4">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              aria-invalid={errors.email ? "true" : "false"}
              className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
              Your Email
            </label>
            <AiOutlineMail className="absolute right-4 top-3 text-white" />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative my-4">
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              aria-invalid={errors.password ? "true" : "false"}
              className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
            />
            <label className="absolute left-0 top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75">
              Your Password
            </label>
            <AiOutlineUnlock className="absolute right-4 top-3 text-white" />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            className={`mb-4 mt-6 w-full rounded-full text-lg ${isLoading ? "bg-gray-400" : "bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white"} py-2 transition-colors duration-300`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Register"}
          </button>
          <p className="text-center text-text-m">or login with</p>
          <button
            className="mb-4 mt-2 flex w-full flex-row items-center justify-center gap-2 rounded-full bg-white py-2 text-lg text-emerald-800 transition-colors duration-300 hover:bg-emerald-600 hover:text-white"
            onClick={handleSigninWithGoogle}
          >
            <FaGoogle />
            <p>Google</p>
          </button>

          {/* Login Link */}
          <div className="text-center">
            <span>
              Already have an account?{" "}
              <Link className="text-blue-400" href="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
