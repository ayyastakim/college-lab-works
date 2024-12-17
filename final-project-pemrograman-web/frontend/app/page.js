"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8000/api/notes", {
          headers: {
            Authorization: `Bearer ${token} `, // Mengirimkan token di header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data); // Set data ke state posts
        } else {
          setError("Failed to fetch notes");
        }
      } catch (err) {
        setError("An error occurred while fetching notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to Notes
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Loading notes...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && notes.length === 0 && (
          <p className="text-center text-gray-600">No notes available.</p>
        )}

        {!loading && !error && notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold">{note.judul}</h2>
                  <p className="text-gray-600 mt-2">{note.isi}</p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>By: {note.user.name}</span>
                    <span>
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;