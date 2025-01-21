### **Sistem Informasi Feedback dan Saran Mahasiswa**

**Deskripsi Singkat**: Sistem ini bertujuan untuk memfasilitasi mahasiswa dalam memberikan saran dan feedback kepada fakultas secara terstruktur. Mahasiswa dapat mengirimkan saran atau masukan secara anonim maupun menggunakan identitas. Admin dapat memantau dan mengelola feedback untuk dianalisis lebih lanjut.

---

### **Tugas untuk Kelompok 7 (Front-end / Tampilan untuk Mahasiswa)**

#### **1. Halaman Utama**

- Menampilkan informasi umum tentang fitur feedback dan saran.
- Tombol navigasi menuju:
  - Halaman form untuk mengirimkan feedback.
  - Halaman riwayat feedback (opsional, jika mahasiswa mengirimkan feedback dengan identitas).

#### **2. Halaman Form Kirim Feedback**

- Form untuk mengirimkan feedback atau saran dengan field berikut:
  - Kategori feedback (dropdown): Akademik, Fasilitas, Administrasi, Lain-lain.
  - Feedback (textarea untuk masukan atau saran).
  - Identitas (opsional, dengan checkbox untuk anonim atau input nama dan email).
- Setelah form dikirim:
  - Simpan data ke Firebase Firestore di koleksi **feedback_mahasiswa**.
  - Tampilkan notifikasi "Feedback berhasil dikirim" atau "Terima kasih atas masukan Anda."

#### **3. Firebase Integration**

- Menyimpan data feedback ke koleksi **feedback_mahasiswa** di Firestore.

#### **4. Halaman Riwayat Feedback (Opsional)**

- Jika mahasiswa memilih untuk menggunakan identitas, mereka dapat melihat riwayat feedback yang telah dikirim:
  - Tampilkan list feedback berdasarkan nama atau email pengguna.
  - Setiap feedback menampilkan:
    - Tanggal pengiriman.
    - Kategori.
    - Isi feedback.

#### **5. Fitur Tambahan (Opsional)**

- Tambahkan fitur "Like/Dislike" untuk feedback tertentu jika riwayat feedback tersedia.
- Tampilkan statistik kecil, seperti jumlah feedback yang telah dikirimkan mahasiswa.

#### **Fitur Utama yang Harus Selesai**

1. Form pengiriman feedback yang terintegrasi dengan Firebase.
2. Simpan data feedback ke Firestore.
3. (Opsional) Tampilkan riwayat feedback untuk mahasiswa dengan identitas.

---

### **Struktur Firebase Firestore untuk Feedback**

**Koleksi**: `feedback_mahasiswa`  
**Dokumen (contoh)**:

```json
{
  "id": "001",
  "kategori": "Akademik",
  "feedback": "Saya berharap materi kuliah lebih sering diperbarui.",
  "tanggal": "2024-11-20",
  "anonim": true,
  "nama": "",
  "email": ""
}
```

---

### **Estimasi Timeline (6 Minggu)**

#### **Kelompok 7: Front-end**

- **Minggu 1**: Setup repositori, install dependency, setup Firebase.
- **Minggu 2**: Membuat halaman form feedback dan menyimpan data ke Firestore.
- **Minggu 3**: Menambahkan validasi form dan notifikasi.
- **Minggu 4**: (Opsional) Membuat halaman riwayat feedback.
- **Minggu 5**: Testing fitur utama dan debugging.
- **Minggu 6**: Dokumentasi proyek front-end.
