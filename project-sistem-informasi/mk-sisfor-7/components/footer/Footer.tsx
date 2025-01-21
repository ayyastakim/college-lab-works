import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { Navlink } from "../navbar/navLink";

export const Footer = () => {
  return (
    <div className="flex h-1/2 w-full flex-col items-start justify-around gap-10 bg-gray-50 px-8 py-10 md:flex-row">
      <div className="">
        <ul>
          <p className="pb-6 text-text-l font-bold text-gray-800">
            Contact <span className="text-[#758BCF]"> Us</span>
          </p>
          <div className="flex gap-6 pb-2">
            {/* Section for icons */}
            <FaTwitter className="cursor-pointer text-text-l hover:text-yellow-600"></FaTwitter>
            <FaLinkedin className="cursor-pointer text-text-l hover:text-yellow-600"></FaLinkedin>
            <FaYoutube className="cursor-pointer text-text-l hover:text-yellow-600"></FaYoutube>
          </div>
        </ul>
      </div>
      <div className="">
        <ul>
          <p className="pb-4 text-text-l font-bold text-gray-800">Quick Link</p>
          {Navlink.map((item) => (
            <Link key={item.href} href={item.href}>
              <li className="text-md flex cursor-pointer flex-col gap-2 pb-2 font-semibold text-gray-500 hover:text-[#758BCF]">
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="">
        <ul className="grid grid-cols-1">
          <p className="pb-4 text-text-l font-bold text-gray-800">
            Platform Info
          </p>
          <Link
            href="/"
            className="text-md cursor-pointer pb-2 font-semibold text-gray-500 hover:text-[#758BCF]"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-md cursor-pointer pb-2 font-semibold text-gray-500 hover:text-[#758BCF]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="text-md cursor-pointer pb-2 font-semibold text-gray-500 hover:text-[#758BCF]"
          >
            Terms of Use
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
