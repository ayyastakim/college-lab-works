<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Mengambil semua post beserta user pembuatnya
        $notes = Note::with('user')->latest()->get();

        return response()->json($notes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string|max:10000',
        ]);

        // Pastikan bahwa user_id di set
        $validated['user_id'] = $request->user()->id; // Menambahkan user_id

        // Membuat article baru dengan data yang sudah tervalidasi
        $notes = Note::create($validated);

        return response()->json([
            'success' => true,
            'data' => $notes,
            'message' => 'Article created successfully.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
{
    // Mengecek apakah Note ada, jika tidak maka kembalikan 404
    if (!$note) {
        return response()->json(['error' => 'Note not found'], 404);
    }
    return response()->json($note->load('user'), 200);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        // Pastikan hanya pembuat Note yang dapat mengedit
        if ($note->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validasi input
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
        ]);

        // Update Note
        $note->update($validated);

        return response()->json([
            'message' => 'Note updated successfully',
            'Note' => $note,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        // Pastikan hanya pembuat Note yang dapat menghapus
        if ($note->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Hapus Note
        $note->delete();

        return response()->json(['message' => 'Note deleted successfully'], 200);
    }
}