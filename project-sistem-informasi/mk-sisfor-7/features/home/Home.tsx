import Link from "next/link";

import Image from "next/image";
import { Statistik } from "./Statistik";

export const Home = () => {
  return (
    <main className="flex min-h-screen flex-col gap-10 py-32">
      {/* bagian informasi umum */}
      <section className="text-auto container mx-auto mb-20 mt-20 flex flex-col items-center justify-between gap-y-8 px-8 md:flex-row md:text-left">
        {/* Bagian Teks */}
        <div className="md:w-1/2">
          <h2 className="text-heading-s font-bold text-[#758BCF] md:text-heading-l">
            Selamat Datang!
          </h2>
          <h3 className="mt-8 text-heading-s font-semibold text-[#758BCF] md:text-heading-m">
            Feedback & Saran Mahasiswa
          </h3>
          <p className="mb-4 mt-4 text-lg text-gray-500">
            Kami memahami bahwa suara Anda penting untuk menciptakan pengalaman
            belajar yang lebih baik. Melalui platform ini, Anda dapat memberikan
            masukan, baik berupa saran maupun kritik, yang akan kami gunakan
            untuk terus meningkatkan kualitas layanan kami.
          </p>
        </div>
        {/* Bagian Gambar */}
        <div className="mt-4 md:mt-0 md:w-1/2">
          <Image
            src="/images/Feedback.png"
            alt="Ilustrasi Feedback"
            width={500}
            height={400}
            className="md:ml-20px mx-auto h-auto max-w-[85%]"
          />
        </div>
      </section>
      {/* Tambahan Informasi Umum */}
      <section className="text-auto container mx-auto mb-20 flex flex-col items-center justify-between gap-y-8 px-8 md:flex-row md:text-left">
        {/* Bagian Gambar */}
        <div className="order-2 md:order-1 md:w-1/2">
          <Image
            src="/images/FeedbackMessage.png"
            alt="Ilustrasi Feedback"
            width={580}
            height={200}
            className="mx-auto h-auto max-w-[85%] object-contain md:mx-0"
          />
        </div>
        {/* Bagian Teks */}
        <div className="order-1 md:order-2 md:w-1/2">
          <h4 className="text-heading-s font-semibold text-[#758BCF] md:text-heading-m">
            Kenapa Feedback Anda Penting?
          </h4>
          <p className="mb-4 mt-4 text-lg text-gray-500">
            Feedback yang Anda berikan akan membantu kami memahami kebutuhan dan
            meningkatkan kualitas layanan.Semua masukan Anda, baik berupa saran
            maupun kritik, akan diproses secara profesional demi menciptakan
            pengalaman yang lebih baik.
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Masukan Anda membantu kami meningkatkan pelayanan dan menciptakan
            pengalaman yang lebih baik untuk semua orang. Klik tombol di bawah
            untuk berbagi pendapat Anda!
          </p>
          {/* Tombol Navigasi */}
          <div className="mt-6 flex flex-col md:flex-row">
            <Link
              href="/form"
              className="mt-4 transform rounded-md bg-white p-2 text-center text-[#758BCF] shadow transition-all duration-300 hover:scale-105 hover:bg-[#758BCF] hover:text-white hover:shadow-md"
            >
              Berikan Masukan Anda!
            </Link>
            <Link
              href="/riwayat"
              className="mt-4 ml-4 transform rounded-md bg-white p-2 text-center text-[#758BCF] shadow transition-all duration-300 hover:scale-105 hover:bg-[#758BCF] hover:text-white hover:shadow-md"
            >
              Lihat Semua Riwayat!
            </Link>
          </div>
        </div>
      </section>
      {/* Bagian Statistik */}
      <section className=" ">
        <Statistik />
      </section>
    </main>
  );
};
