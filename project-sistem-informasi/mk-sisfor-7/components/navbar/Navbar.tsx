"use client";

import Link from "next/link";
import { Navlink } from "./navLink";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAuth, User } from "firebase/auth";

import { useAuth } from "@/features/login/useAuth";
export const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const { handleLogOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 200);
    };

    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="drawer z-20">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div
            className={`${
              isScroll ? "bg-white bg-opacity-70 shadow-sm" : "text-[#758BCF]"
            } navbar fixed left-0 right-0 top-0 w-full gap-2 px-8 py-4 md:px-28`}
          >
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="flex pr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="flex-1 items-center gap-4 text-xl font-bold">
              <Image
                src="/images/logounhas.png"
                width={30}
                height={30}
                alt="logo"
                objectPosition="top"
                objectFit="cover"
                className="md:flex"
              />
              <p className="text-text-l text-[#758BCF]">Feedback</p>
            </div>

            <div className="hidden gap-10 md:flex">
              {Navlink.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <li
                      className={`inline-flex cursor-pointer ${
                        isActive ? "text-[#758BCF]" : "text-gray-300"
                      }`}
                    >
                      {item.title}
                    </li>
                  </Link>
                );
              })}
              {user && (
                <button
                  onClick={handleLogOut}
                  className="text-text-sm cursor-pointer rounded-md bg-[#758BCF] px-4 py-1 text-white"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-60 bg-base-200 pt-14">
            {Navlink.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className="p-4">
                  <li
                    className={`inline-flex cursor-pointer ${
                      isActive ? "text-[#758BCF]" : "text-gray-300"
                    }`}
                  >
                    {item.title}
                  </li>
                </Link>
              );
            })}
            {user && (
              <button
                onClick={handleLogOut}
                className="ml-4 w-fit cursor-pointer rounded-md bg-[#758BCF] px-4 py-1 text-xs text-white"
              >
                Log out
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
