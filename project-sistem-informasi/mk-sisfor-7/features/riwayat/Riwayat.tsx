"use client";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { CardRiwayat } from "./CardRiwayat";
import { RiwayatProps } from "./IRiwayat";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import LikeDislikeButton from "@/components/button/LikeDislikeButton";
import Footer from "@/components/footer/Footer";

export const Riwayat = () => {
  const [reviews, setReviews] = useState<RiwayatProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "feedback_mahasiswa"),
      (snapshot) => {
        const fetchedReviews: RiwayatProps[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as unknown as RiwayatProps,
        );
        setReviews(fetchedReviews);
      },
    );

    return () => unsubscribe();
  }, []);

  const filteredReviews = reviews
    .filter(
      (review) =>
        review.nama !== "Anonim" &&
        review.email &&
        (selectedCategory === "Semua" || selectedCategory === ""
          ? true
          : review.kategori === selectedCategory),
    )
    .sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
    )
    .slice(0, 6);

  return (
    <section className="flex w-full flex-col gap-8 px-6 py-32 md:px-28">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-heading-s font-bold text-[#758BCF] md:text-heading-l">
          Riwayat Feedback
        </h2>
        <p className="text-center">
          Berikut adalah daftar feedback yang telah diberikan oleh mahasiswa.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-2 md:flex-row">
        {["Semua", "Administrasi", "Fasilitas", "Akademik", "Lain-lain"].map(
          (category) => (
            <button
              key={category}
              className={`rounded-lg px-4 py-2 text-white ${
                selectedCategory === category
                  ? "bg-[#859ee9]"
                  : "bg-gray-300 duration-300 ease-in-out hover:bg-[#859ee9]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ),
        )}
      </div>

      <div className="grid w-full grid-cols-1 items-center gap-8 pt-10 md:grid-cols-3">
        {filteredReviews.map((review) => {
          const reviewDate = new Date(review.tanggal);
          const daysDifference = differenceInDays(new Date(), reviewDate);
          const displayDate =
            daysDifference > 7
              ? format(reviewDate, "dd MMM yyyy")
              : formatDistanceToNow(reviewDate, { addSuffix: true });

          return (
            <CardRiwayat key={review.id}>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="text-text-m font-semibold">{review.nama}</p>
                  <p className="font-semibold">{review.kategori}</p>
                </div>
                <p className="text-text-m">
                  {truncateText(review.feedback, 80)}
                </p>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <p className="text-white-500 text-m">{displayDate}</p>
                <LikeDislikeButton
                  reviewId={review.id} // Tambahkan id postingan
                  initialLikes={review.initialLikes || 0}
                  initialDislikes={review.initialDislikes || 0}
                />
              </div>
            </CardRiwayat>
          );
        })}
      </div>
      <Footer />
    </section>
  );
};
