import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FormProps } from "./IForm";
import { toast } from "react-toastify";
import Image from "next/image";
import { onAuthStateChanged, getAuth } from "firebase/auth";

interface FeedbackProps {
  onSubmitFed: () => void;
}

export const Form: React.FC<FeedbackProps> = ({ onSubmitFed }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormProps>();

  const generateId = async () => {
    const feedbackCollection = collection(db, "feedback_mahasiswa");
    const snapshot = await getDocs(feedbackCollection);
    const currentCount = snapshot.size;
    const newID = (currentCount + 1).toString().padStart(3, "0");
    return newID;
  };

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setValue("nama", user.displayName || "");
        setValue("email", user.email || "");
      } else {
        setValue("nama", "");
        setValue("email", "");
      }
    });

    return () => unsubscribe();
  }, [setValue]);

  const onSubmit = async (data: FormProps) => {
    try {
      const formattedDate = new Date().toISOString();
      const customId = await generateId();
      const feedbackRef = doc(db, "feedback_mahasiswa", customId);

      if (data.anonim) {
        data.nama = "";
        data.email = "";
      }

      await setDoc(feedbackRef, {
        ...data,
        id: customId,
        tanggal: formattedDate,
        status: "new",
      });

      toast.success("Feedback berhasil dikirim");
      onSubmitFed();
      reset();
    } catch (error) {
      console.error("Error submitting Feedback:", error);
      toast.error("Terjadi kesalahan saat mengirimkan feedback");
    }
  };

  const isAnonim = watch("anonim");

  return (
    <section className="flex min-h-screen w-screen items-center justify-center gap-12 px-6 pt-10 md:gap-20 md:px-28 md:pt-0">
      <div className="hidden justify-center md:flex">
        <Image
          src="/images/Checklist.jpg"
          width={700}
          height={100}
          alt="bg"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <section className="flex flex-col gap-4 p-4 md:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-s font-bold text-[#758BCF] md:text-heading-l">
            Form Feedback
          </h2>
          <p>
            Berikan masukan atau saran Anda tentang berbagai hal terkait
            akademik, fasilitas, atau administrasi.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          {!isAnonim && (
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="nama" className="block text-gray-700">
                Nama
              </label>
              <input
                id="nama"
                {...register("nama")}
                className="w-full rounded-md border border-gray-300 bg-transparent p-2 text-black outline-none focus:border-[#758BCF]"
                placeholder="Masukkan nama Anda"
                readOnly
              />
              <label htmlFor="email" className="mt-2 block text-gray-700">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                className="w-full rounded-md border border-gray-300 bg-transparent p-2 text-black outline-none focus:border-[#758BCF]"
                placeholder="Masukkan email"
                readOnly
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="kategori" className="block text-gray-700">
              Kategori
            </label>
            <select
              id="kategori"
              {...register("kategori", { required: "Kategori is required" })}
              className="w-full rounded-md border border-gray-300 bg-transparent p-2 text-black outline-none focus:border-[#758BCF]"
            >
              <option value="">Pilih Kategori</option>
              <option value="Akademik">Akademik</option>
              <option value="Fasilitas">Fasilitas</option>
              <option value="Administrasi">Administrasi</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
            {errors.kategori && (
              <span className="text-sm text-red-500">
                {errors.kategori.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="feedback" className="block text-gray-700">
              Feedback
            </label>
            <textarea
              id="feedback"
              {...register("feedback", {
                required: "Feedback is required",
                minLength: { value: 10, message: "Feedback terlalu pendek" },
                maxLength: { value: 150, message: "Feedback terlalu panjang" },
              })}
              placeholder="Tulis masukan atau saran Anda"
              className="min-h-20 w-full rounded-md border border-gray-300 bg-transparent p-2 text-black outline-none focus:border-[#758BCF]"
            />
            {errors.feedback && (
              <span className="text-sm text-red-500">
                {errors.feedback.message}
              </span>
            )}
          </div>

          <div className="flex flex-row items-center justify-end">
            <label
              htmlFor="anonim"
              className="inline-block bg-transparent text-gray-700"
            >
              Kirim anonim
            </label>
            <input
              type="checkbox"
              id="anonim"
              {...register("anonim")}
              className="ml-2 outline-none focus:border-[#758BCF]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-[#758BCF] p-2 text-white hover:bg-[#ADB9E3]"
          >
            Kirim Feedback
          </button>
        </form>
      </section>
    </section>
  );
};
