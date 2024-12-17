"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";


const Add = () => {
  const [judul, setJudul] = useState(""); // State untuk judul
  const [isi, setIsi] = useState(""); // State untuk konten
  const [error, setError] = useState(""); // State untuk error
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      setError("No token found. Please log in.");
      router.push("/auth/login"); // Redirect ke login jika token tidak ada
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Mengirimkan token di header
        },
        body: JSON.stringify({
          judul: judul,
          isi: isi,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "An error occurred while submitting the post.");
      } else {
        router.push("/"); // Redirect ke halaman utama setelah sukses
      }
    } catch (err) {
      console.error("Error during submit:", err);
      setError("An error occurred while submitting the post.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Create a New Note</h1>
        {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="judul" className="block text-lg font-medium">
              Judul
            </label>
            <input
              id="judul"
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="isi" className="block text-lg font-medium">
              Isi
            </label>
            <textarea
              id="isi"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;