"use client";

import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import Image from "next/image";
import { IoDocumentText } from "react-icons/io5";
import { FaFolderClosed } from "react-icons/fa6";

export const Statistik = () => {
  const [totalFeedback, setTotalFeedback] = useState(0);
  // const [feedbackTerakhir, setFeedbackTerakhir] = useState<{
  //   name: string | null;
  //   time: string | null;
  // }>({ name: null, time: null });

  const [kategoriTerbanyak, setKategoriTerbanyak] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "feedback_mahasiswa"),
      (snapshot) => {
        let total = 0;
        const feedbacks: { nama: string; tanggal: string; kategori: string }[] =
          [];
        const hitungKategori: { [key: string]: number } = {
          Akademik: 0,
          Fasilitas: 0,
          Administrasi: 0,
          "Lain-lain": 0,
        };

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.nama && data.nama !== "Anonim") {
            total++;
            feedbacks.push({
              nama: data.nama,
              tanggal: data.tanggal || "Tanggal Tidak diketahui",
              kategori: data.kategori || "Lain-lain",
            });
          }

          if (data.kategori && hitungKategori[data.kategori] !== undefined) {
            hitungKategori[data.kategori]++;
          }
        });

        setTotalFeedback(total);

        // if (feedbacks.length > 0) {
        //   const lastFeedbackEntry = feedbacks[feedbacks.length - 1];
        //   setFeedbackTerakhir({
        //     name: lastFeedbackEntry.nama,
        //     time: lastFeedbackEntry.tanggal,
        //   });
        // }

        const mostFrequent = Object.keys(hitungKategori).reduce((a, b) =>
          hitungKategori[a] > hitungKategori[b] ? a : b,
        );
        setKategoriTerbanyak(mostFrequent || null);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="flex w-full flex-col items-center gap-8 px-8 md:px-28">
      <Image
        src="/images/StudentIcon.png"
        alt="Ikon Siswa"
        width={70}
        height={80}
        className="items-start"
      />
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-heading-s font-bold text-[#758BCF] md:text-heading-l">
            Statistik Feedback
          </h2>
          <p className="text-center text-text-l">
            Berikut adalah statistik sederhana berdasarkan feedback-feedback
            yang telah terkirim.
          </p>
        </div>

        <div className="flex flex-col justify-items-center gap-10 md:flex-row">
          {totalFeedback > 0 && (
            <div className="flex w-[240px] items-center justify-center gap-2 rounded-md p-4 text-text-l text-gray-700 shadow-md">
              <IoDocumentText className="h-8 w-8 text-green-400" />
              <p className="text-text-l">
                Total <span className="font-bold">{totalFeedback}</span>{" "}
                feedback
              </p>
            </div>
          )}

          {kategoriTerbanyak && (
            <div className="flex w-[240px] justify-center gap-2 rounded-md p-4 text-text-l text-gray-700 shadow-md">
              <FaFolderClosed className="ml-3 h-10 w-10 text-orange-400" />
              <p className="text-text-l">
                Kategori terbanyak adalah{" "}
                <span className="font-bold">{kategoriTerbanyak}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
