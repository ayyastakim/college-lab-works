"use client";
import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { Riwayat } from "@/features/riwayat/Riwayat";

export default function RiwayatPage() {
  return (
    <div>
      <Navbar />
      <Riwayat />;
      <Footer />
    </div>
  );
}
