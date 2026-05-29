/**
 * DESA DIGITAL - API & LOGIC CONTROLLER (FIXED TABLE & PAGINATION)
 */

// ==========================================
// 1. DATA DUMMY PENGELUARAN (Bisa ditambah)
// ==========================================
const dataPengeluaran = [
    { tgl: "15 Mei 2026", ket: "Pencairan Dana Bencana Alam", nominal: 2000000 },
    { tgl: "20 Mei 2026", ket: "Perbaikan Atap Balai Warga", nominal: 5500000 },
    { tgl: "22 Mei 2026", ket: "Bantuan Modal UMKM Ibu Siti", nominal: 1500000 },
    { tgl: "23 Mei 2026", ket: "Penyediaan Bibit Padi Desa", nominal: 1200000 },
    { tgl: "24 Mei 2026", ket: "Honor Kebersihan Pos Ronda", nominal: 800000 },
    { tgl: "25 Mei 2026", ket: "Bantuan Internet Balai Desa", nominal: 500000 },
    { tgl: "26 Mei 2026", ket: "Alat Tulis Kantor (ATK)", nominal: 300000 },
    { tgl: "27 Mei 2026", ket: "Sewa Sound System Musrenbang", nominal: 700000 }
];

let currentPage = 1;
const rowsPerPage = 5;

// ==========================================
// 2. FUNGSI RENDER TABEL (PAGINATION)
// ==========================================
function renderTable() {
    const tbody = document.getElementById('tableBodyTransparansi');
    const pageInfo = document.getElementById('pageInfo');
    if (!tbody || !pageInfo) return; // Cegah error jika elemen tidak ada

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = dataPengeluaran.slice(start, end);

    let htmlContent = "";
    paginatedData.forEach(item => {
        htmlContent += `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
            <td class="p-4 text-slate-500">${item.tgl}</td>
            <td class="p-4 font-medium">${item.ket}</td>
            <td class="p-4 font-bold text-danger">- Rp ${item.nominal.toLocaleString('id-ID')}</td>
        </tr>`;
    });

    tbody.innerHTML = htmlContent;

    const totalPages = Math.ceil(dataPengeluaran.length / rowsPerPage);
    pageInfo.innerText = `Halaman ${currentPage} dari ${totalPages}`;
}

function nextPage() {
    const totalPages = Math.ceil(dataPengeluaran.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

// Pastikan fungsi bisa dipanggil oleh tombol di HTML
window.renderTable = renderTable;
window.nextPage = nextPage;
window.prevPage = prevPage;


// ==========================================
// 3. FUNGSI UTAMA (Saat Halaman Dimuat)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Render tabel segera agar data tidak kosong
    renderTable();

    // Sistem Tema
    const html = document.documentElement;
    const btnTheme = document.getElementById('toggleTheme');
    const btnStyle = document.getElementById('toggleStyle');

    const savedTheme = localStorage.getItem('desa-theme') || 'light';
    const savedStyle = localStorage.getItem('desa-style') || 'glass';

    html.setAttribute('data-theme', savedTheme);
    html.setAttribute('data-style', savedStyle);
    if(savedTheme === 'dark') html.classList.add('dark');

    if (btnTheme) {
        btnTheme.innerHTML = html.classList.contains('dark') ? '☀️' : '🌙';
        btnTheme.addEventListener('click', () => {
            html.classList.toggle('dark');
            const newT = html.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('desa-theme', newT);
            btnTheme.innerHTML = newT === 'dark' ? '☀️' : '🌙';
        });
    }

    if (btnStyle) {
        btnStyle.innerHTML = html.getAttribute('data-style') === 'normal' ? '✨' : '🎨';
        btnStyle.addEventListener('click', () => {
            const newS = html.getAttribute('data-style') === 'normal' ? 'glass' : 'normal';
            html.setAttribute('data-style', newS);
            localStorage.setItem('desa-style', newS);
            btnStyle.innerHTML = newS === 'normal' ? '✨' : '🎨';
        });
    }

    // Loading Screen
    const ls = document.getElementById('loadingScreen');
    const dc = document.getElementById('dashboardContent');
    if (ls && dc) {
        setTimeout(() => {
            ls.style.opacity = '0';
            dc.classList.remove('opacity-0');
            setTimeout(() => {
                ls.style.display = 'none';
                fetchDashboardData();
            }, 500);
        }, 1500);
    } else if (dc) {
        dc.classList.remove('opacity-0');
        fetchDashboardData();
    }

    // Cek Login Warga
    const nw = document.getElementById('namaWarga');
    if (nw) {
        const iden = localStorage.getItem('desa_nama');
        if (!iden) { window.location.href = 'login-desa.html'; }
        else { nw.innerText = iden; }
    }

    // Cek Login Warga (Di halaman login)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                passwordInput.setAttribute('type', passwordInput.getAttribute('type') === 'password' ? 'text' : 'password');
            });
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const userInput = document.getElementById('nik').value.trim();
            const btnText = document.getElementById('btnText');
            const submitBtn = document.getElementById('submitBtn');
            const errorBox = document.getElementById('loginError');

            submitBtn.disabled = true;
            btnText.innerText = 'Memverifikasi...';
            errorBox.classList.add('hidden');

            try {
                const isNIK = /^\d{16}$/.test(userInput);
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);

                if (!isNIK && !isEmail) throw new Error('Harap masukkan NIK (16 Angka) atau Email yang valid.');

                setTimeout(() => {
                    localStorage.setItem('desa_token', 'xxx-abc');
                    localStorage.setItem('desa_nama', userInput); 
                    window.location.href = 'dashboard-warga.html';
                }, 1000);
            } catch (error) {
                errorBox.innerText = error.message;
                errorBox.classList.remove('hidden');
                submitBtn.disabled = false;
                btnText.innerText = 'Masuk Sekarang';
            }
        });
    }
});


// ==========================================
// 4. GLOBAL HELPERS (Dipanggil dari HTML)
// ==========================================

async function fetchDashboardData() {
    try {
        const data = { saldo: 491000000, pengeluaran: 12500000, iuran: 4 };
        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

        if(document.getElementById('totalSaldo')) {
            document.getElementById('totalSaldo').innerText = 'Rp ' + data.saldo.toLocaleString('id-ID');
            document.getElementById('totalSaldo').classList.remove('hidden');
        }
        if(document.getElementById('totalPengeluaran')) {
            document.getElementById('totalPengeluaran').innerText = 'Rp ' + data.pengeluaran.toLocaleString('id-ID');
            document.getElementById('totalPengeluaran').classList.remove('hidden');
        }
        if(document.getElementById('iuranTerbayar')) {
            document.getElementById('iuranTerbayar').innerText = `${data.iuran}/12 Bulan`;
            document.getElementById('iuranTerbayar').classList.remove('hidden');
        }
    } catch (e) { console.error(e); }
}

function openModal(id) { 
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.replace('hidden', 'flex');
        // Kunci Rahasia: Paksa tabel di-render ulang setiap kali pop-up dibuka!
        if(id === 'modalTransparansi') renderTable(); 
    }
}

function closeModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.classList.replace('flex', 'hidden'); 
}

function submitBayar(e) {
    e.preventDefault();
    alert("Terima kasih! Bukti pembayaran QRIS sedang dikonfirmasi oleh Admin.");
    closeModal('modalBayarKas');
}

function logout(jenis) {
    localStorage.clear();
    if(jenis === 'warga') {
        window.location.href = 'login-desa.html';
    } else {
        window.location.href = 'login-admin.html';
    }
}
