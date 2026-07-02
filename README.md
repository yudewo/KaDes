ENG

# 🏡 KaDes (Village Cash & Payment Information System)

Welcome to the **KaDes** project repository! 

This web application was built with a simple yet crucial goal in mind: **Transparency and Administrative Ease**. KaDes is a platform that bridges the gap between administrators (Admins) and residents or members in managing routine dues, recording cash flows, and viewing fund usage transparency in real-time.

With this system, residents no longer need to wonder "what are this month's dues being used for?", and administrators no longer have to stress over manually recording payments in physical books that are easily lost, stained, or misplaced.

---

## ✨ Key Features

The system is divided into two main interfaces (access rights) to keep its functions and layout focused:

### 👨‍💻 Admin Page (Administrators)
- **Statistical Dashboard:** An interactive summary of total income, expenses, final cash balance, and the number of active/inactive members.
- **Smart Notification System:** Automated alerts that detect and notify the Admin if there are residents waiting for payment verification, members with inactive status, or warnings if the cash balance drops below zero (deficit).
- **Member Management (CRUD):** Add, edit, and delete resident data dynamically with clean table visualizations.
- **Financial Report Management:** Record cash flow (inflow & outflow) which directly updates the total balance calculation automatically.
- **Payment Verification:** Admins can manage resident bills, validate payment proofs, and update their status to "Paid".

### 👥 Resident Page
- **Personal Dashboard:** Displays village financial balance information and personal payment history (e.g., "Paid 3/12 Months").
- **Fund Transparency:** Residents can view a real-time table of incoming (green) and outgoing (red) funds inputted by the Admin, similar to a bank statement.
- **QRIS Payment:** A payment form integrated with QRIS code scanning, making it easier for residents to pay dues without having to meet physically.

---

## 🛠️ Technologies Used
This project is built using a lightweight, fast, and easy-to-run local web tech stack (without heavy backend frameworks):

- **Frontend:** HTML5, Vanilla JavaScript, Custom CSS (for Admin styling), and Tailwind CSS (for the Resident page).
- **Backend:** PHP (Native JSON-based API) to process asynchronous requests (AJAX/Fetch) from the client side.
- **Database:** MySQL / MariaDB.
- **UI Design:** Modern *Glassmorphism* concept with Dark Mode & Light Mode toggles.

---

## 🚀 Local Installation & Setup Guide

For those who want to run or modify this application locally, please follow these steps:

1. **Download or Clone this Repository** to your local machine.
2. Move the entire project folder into your local server directory (if using XAMPP, place it inside the `htdocs` folder).
3. Open the XAMPP Control Panel and start the **Apache** and **MySQL** modules.
4. Open your browser and navigate to `http://localhost/phpmyadmin`.
5. Create a new database (e.g., name it `kades`).
6. **Import** the `.sql` database file included in this project folder.
7. Open the `koneksi.php` file using your preferred Code Editor, and ensure the configuration matches your local server settings (default username is usually `root`, and the password is left blank).
8. Access the application via your browser by typing: `http://localhost/your_project_folder_name/`

---

## 👥 Development Team
This project was developed through collaboration and teamwork by students of **Class RL, Universitas Indraprasta PGRI (Unindra)**.

Compiled by Group:
1. **Yudewo Alghiditya Winarno** - NPM 202443500729
2. **Syifa Shalsabilah** - NPM 202443500757
3. **Irfan Maulana** - NPM 20243500746
4. **Wina Amalia Sahidu** - NPM 202443500750
5. **Rifqi Hanif Arindra Putra** - NPM 20243500783

Thank you for visiting this repository! Feel free to use this code for learning purposes. Happy coding! 🚀

IND

IND
# 🏡 KaDes (Sistem Informasi Kas & Pembayaran Desa)

Selamat datang di *repository* proyek **KaDes**! 

Aplikasi web ini dibuat dengan tujuan yang sederhana namun krusial: **Transparansi dan Kemudahan Administrasi**. KaDes adalah platform yang menjembatani antara pengurus (Admin) dengan warga atau anggota dalam mengelola iuran rutin, mencatat arus kas, serta melihat transparansi penggunaan dana secara *real-time*.

Dengan sistem ini, warga tidak perlu lagi bertanya-tanya "uang kas bulan ini dipakai untuk apa saja?", dan pengurus juga tidak pusing lagi merekap pembayaran di buku tulis yang gampang hilang, kotor, atau terselip.

---

## ✨ Fitur Utama

Sistem ini dibagi menjadi dua antarmuka (hak akses) utama agar fungsi dan tampilannya lebih terfokus:

### 👨‍💻 Halaman Admin (Pengurus)
- **Dashboard Statistik:** Ringkasan interaktif untuk total pemasukan, pengeluaran, saldo akhir kas, dan jumlah anggota aktif/tidak aktif.
- **Sistem Notifikasi Cerdas:** Peringatan otomatis yang akan mendeteksi dan memberi tahu Admin jika ada warga yang menunggu verifikasi pembayaran, anggota yang berstatus tidak aktif, atau peringatan jika saldo kas mengalami minus (defisit).
- **Manajemen Anggota (CRUD):** Tambah, edit, dan hapus data warga secara dinamis dengan visualisasi tabel yang rapi.
- **Manajemen Laporan Keuangan:** Pencatatan arus kas (uang masuk & uang keluar) yang akan langsung memengaruhi kalkulasi total saldo secara otomatis.
- **Verifikasi Pembayaran:** Admin dapat mengelola tagihan warga, memvalidasi bukti pembayaran, dan mengubah statusnya menjadi "Lunas".

### 👥 Halaman Warga
- **Dashboard Personal:** Menampilkan informasi saldo keuangan desa dan riwayat iuran pribadi yang sudah terbayar (misal: "Sudah bayar 3/12 Bulan").
- **Transparansi Dana Desa:** Warga bisa melihat langsung tabel riwayat uang masuk (hijau) dan uang keluar (merah) yang diinput oleh Admin layaknya mutasi rekening.
- **Pembayaran via QRIS:** Formulir pembayaran yang mengintegrasikan *scan* kode QRIS untuk mempermudah warga menyetor iuran kas tanpa harus bertemu secara fisik.

---

## 🛠️ Teknologi yang Digunakan
Proyek ini dibangun menggunakan *tech stack* dasar web yang ringan, cepat, dan mudah dijalankan di *local server* (tanpa *framework* backend yang berat):

- **Frontend:** HTML5, Vanilla JavaScript, Custom CSS (untuk *style* Admin), dan Tailwind CSS (untuk halaman Warga).
- **Backend:** PHP (API Native berbasis JSON) untuk memproses *request* secara asinkron (AJAX/Fetch) dari sisi *client*.
- **Database:** MySQL / MariaDB.
- **Desain UI:** Konsep *Glassmorphism* modern dengan dukungan sakelar *Dark Mode* & *Light Mode*.

---

## 🚀 Cara Instalasi & Menjalankan Proyek Lokal

Bagi Anda yang ingin mencoba menjalankan atau memodifikasi aplikasi ini, silakan ikuti langkah-langkah berikut:

1. **Download atau Clone Repository ini** ke dalam penyimpanan komputer Anda.
2. Pindahkan seluruh folder proyek ke dalam direktori server lokal Anda (jika menggunakan XAMPP, letakkan di dalam folder `htdocs`).
3. Buka XAMPP Control Panel, lalu nyalakan *module* **Apache** dan **MySQL**.
4. Buka *browser* dan akses `http://localhost/phpmyadmin`.
5. Buat database baru (misalnya beri nama `kades`).
6. *Import* file database `.sql` yang sudah kami sertakan di dalam folder proyek ini.
7. Buka file `koneksi.php` menggunakan *Code Editor* Anda, lalu pastikan konfigurasinya sudah sesuai dengan *server* lokal Anda (username default biasanya `root`, dan password dikosongkan).
8. Akses aplikasi melalui browser dengan mengetik: `http://localhost/nama_folder_proyek/`

---

## 👥 Tim Pengembang
Proyek ini dikembangkan melalui diskusi dan kerja sama tim oleh mahasiswa **Kelas RL, Universitas Indraprasta PGRI (Unindra)**.

Disusun oleh Kelompok:
1. **Yudewo Alghiditya Winarno** - NPM 202443500729
2. **Syifa Shalsabilah** - NPM 202443500757
3. **Irfan Maulana** - NPM 20243500746
4. **Wina Amalia Sahidu** - NPM 202443500750
5. **Rifqi Hanif Arindra Putra** - NPM 20243500783

Terima kasih sudah mampir ke *repository* ini! Jangan ragu untuk menggunakan kode ini sebagai bahan belajar. Selamat mengoding! 🚀
