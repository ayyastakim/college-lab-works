"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

const Mynotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Untuk status loading
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk status modal
  const [noteToEdit, setNoteToEdit] = useState(null); // Menyimpan note yang sedang diedit
  const router = useRouter();

  useEffect(() => {
    const fetchUserNotes = async () => {
      setIsLoading(true); // Mulai loading
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        setError("No token or user found. Please log in.");
        setIsLoading(false); // Selesai loading
        router.push("/auth/login");
        return;
      }

      try {
        const parsedUser = user ? JSON.parse(user) : null;
        if (!parsedUser) {
          setError("User data is invalid.");
          setIsLoading(false); // Selesai loading
          return;
        }

        const response = await fetch("http://localhost:8000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch notes.");
          setIsLoading(false); // Selesai loading
          return;
        }

        const data = await response.json();
        const userNotes = data.filter((note) => note.user_id === parsedUser.id);
        setNotes(userNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("An error occurred while fetching notes.");
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchUserNotes();
  }, [router]);

  const handleDelete = async (noteId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "An error occurred while deleting the note.");
      } else {
        setNotes(notes.filter((note) => note.id !== noteId)); // Hapus note dari daftar
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("An error occurred while deleting the note.");
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note); // Set note yang akan diedit
    setIsModalOpen(true); // Buka modal
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/notes/${noteToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            judul: noteToEdit.judul,
            isi: noteToEdit.isi,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "An error occurred while saving the note.");
      } else {
        // Update daftar notes setelah berhasil disimpan
        setNotes(
          notes.map((note) => (note.id === noteToEdit.id ? noteToEdit : note))
        );
        setIsModalOpen(false); // Tutup modal setelah berhasil
      }
    } catch (err) {
      console.error("Error saving note:", err);
      setError("An error occurred while saving the note.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Your Dashboard</h1>

        {isLoading && (
          <p className="text-center text-gray-600">Loading notes...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!isLoading && !error && notes.length === 0 && (
          <p className="text-center text-gray-600">No notes available.</p>
        )}

        {!isLoading && !error && notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold">{note.judul}</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {note.isi}
                  </p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>By: {note.user.name}</span>
                    <span>
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(note)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Edit Note */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={noteToEdit.judul}
              onChange={(e) =>
                setNoteToEdit({ ...noteToEdit, judul: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Description</label>
            <textarea
              value={noteToEdit.isi}
              onChange={(e) =>
                setNoteToEdit({ ...noteToEdit, isi: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mynotes;