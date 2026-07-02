let dataPengeluaran = [];
let currentPage = 1;
const rowsPerPage = 5;

// TRANSPARANSI - PEMASUKAN & PENGELUARAN
function renderTable() {
    const tbody = document.getElementById('tableBodyTransparansi');
    const pageInfo = document.getElementById('pageInfo');
    if (!tbody || !pageInfo) return; 

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = dataPengeluaran.slice(start, end);

    let htmlContent = "";
    paginatedData.forEach(item => {
        const dateObj = new Date(item.tgl);
        const formatTgl = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

        // Membedakan Masuk (Hijau) dan Keluar (Merah)
        let warnaText = '';
        let simbol = '';
        let badge = '';

        if (item.jenis && item.jenis.toLowerCase().includes('masuk')) {
            warnaText = 'text-primary'; // Class Tailwind untuk hijau
            simbol = '+';
            badge = '<span class="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Masuk</span>';
        } else {
            warnaText = 'text-danger'; // Class Tailwind untuk merah
            simbol = '-';
            badge = '<span class="ml-2 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase">Keluar</span>';
        }

        htmlContent += `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
            <td class="p-4 text-slate-500">${formatTgl}</td>
            <td class="p-4 font-medium flex items-center">${item.ket} ${badge}</td>
            <td class="p-4 font-bold ${warnaText}">${simbol} Rp ${item.nominal.toLocaleString('id-ID')}</td>
        </tr>`;
    });

    tbody.innerHTML = htmlContent;

    const totalPages = Math.ceil(dataPengeluaran.length / rowsPerPage) || 1;
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

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const btnTheme = document.getElementById('toggleTheme');
    const savedTheme = localStorage.getItem('desa-theme') || 'light';
    
    html.setAttribute('data-theme', savedTheme);
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

    const nw = document.getElementById('namaWarga');
    if (nw) {
        const iden = localStorage.getItem('desa_nama');
        if (!iden) { 
            window.location.href = 'login-desa.html'; 
            return;
        } else { 
            nw.innerText = iden; 
        }
    }

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

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                passwordInput.setAttribute('type', passwordInput.getAttribute('type') === 'password' ? 'text' : 'password');
            });
        }

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const userInput = document.getElementById('nik').value.trim();
            const passInput = document.getElementById('password').value;
            const btnText = document.getElementById('btnText');
            const submitBtn = document.getElementById('submitBtn');
            const errorBox = document.getElementById('loginError');

            submitBtn.disabled = true;
            btnText.innerText = 'Memverifikasi...';
            errorBox.classList.add('hidden');

            try {
                const response = await fetch('../api-login-warga.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nik: userInput, password: passInput })
                });
                
                const result = await response.json();

                if (result.status === 'success') {
                    localStorage.setItem('desa_token', 'token-warga-' + result.nik);
                    localStorage.setItem('desa_nama', result.nama); 
                    window.location.href = 'dashboard-warga.html';
                } else {
                    errorBox.innerText = result.pesan;
                    errorBox.classList.remove('hidden');
                    submitBtn.disabled = false;
                    btnText.innerText = 'Masuk Sekarang';
                }
            } catch (error) {
                console.error(error);
                errorBox.innerText = 'Gagal terhubung ke server. Pastikan XAMPP menyala.';
                errorBox.classList.remove('hidden');
                submitBtn.disabled = false;
                btnText.innerText = 'Masuk Sekarang';
            }
        });
    }
});

// MENGAMBIL DATA RIIL DARI DATABASE
async function fetchDashboardData() {
    try {
        let userNik = '';
        const token = localStorage.getItem('desa_token');
        if (token && token.startsWith('token-warga-')) {
            userNik = token.replace('token-warga-', ''); 
        }

        const response = await fetch(`../api-get-warga-dashboard.php?nik=${userNik}`);
        const data = await response.json();

        if(data.status === 'success') {
            document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

            const totalSaldoEl = document.getElementById('totalSaldo');
            if(totalSaldoEl) {
                totalSaldoEl.innerText = 'Rp ' + data.statistik.saldo.toLocaleString('id-ID');
                totalSaldoEl.classList.remove('hidden');
            }

            const totalPengeluaranEl = document.getElementById('totalPengeluaran');
            if(totalPengeluaranEl) {
                totalPengeluaranEl.innerText = 'Rp ' + data.statistik.pengeluaran.toLocaleString('id-ID');
                totalPengeluaranEl.classList.remove('hidden');
            }

            const iuranTerbayarEl = document.getElementById('iuranTerbayar');
            if(iuranTerbayarEl) {
                const jumlahBulan = data.statistik.iuran_terbayar;
                iuranTerbayarEl.innerText = `${jumlahBulan}/12 Bulan`;
                
                if (jumlahBulan >= 12) {
                    iuranTerbayarEl.classList.replace('text-blue-500', 'text-primary');
                }
                
                iuranTerbayarEl.classList.remove('hidden');
            }

            dataPengeluaran = data.transparansi;
            renderTable();
        }
    } catch (e) { 
        console.error("Gagal menarik data warga:", e);
        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));
    }
}

function openModal(id) { 
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.replace('hidden', 'flex');
        if(id === 'modalTransparansi') renderTable(); 
    }
}

function closeModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.classList.replace('flex', 'hidden'); 
}

// MENGIRIM DATA PEMBAYARAN WARGA KE DATABASE ADMIN
async function submitBayar(e) {
    e.preventDefault();

    // 1. Tarik NIK warga yang sedang login dari localstorage
    let userNik = '';
    const token = localStorage.getItem('desa_token');
    if (token && token.startsWith('token-warga-')) {
        userNik = token.replace('token-warga-', ''); 
    }

    if(!userNik) {
        alert("Sesi Anda telah habis. Silakan login kembali.");
        return;
    }

    // 2. Ambil nominal dari pilihan tagihan
    const selectTagihan = document.querySelector('#modalBayarKas select');
    const nominalTagihan = selectTagihan.value;

    // 3. Tanggal hari ini & nama bulan
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    const tanggalHariIni = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    const namaBulan = dateObj.toLocaleString('id-ID', { month: 'long' });
    const bulanTahun = `${namaBulan} ${year}`;

    const btnSubmit = document.querySelector('#modalBayarKas button[type="submit"]');
    const teksAsli = btnSubmit.innerText;
    btnSubmit.innerText = "Mengirim Data...";
    btnSubmit.disabled = true;

    try {
        const response = await fetch('../api-tambah-pembayaran.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nik: userNik,
                bulan: bulanTahun,
                nominal: nominalTagihan,
                status: 'Menunggu Verifikasi',
                tanggal: tanggalHariIni
            })
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert("Berhasil! Data pembayaran Anda telah masuk ke sistem dan sedang menunggu verifikasi Admin.");
            closeModal('modalBayarKas');
            fetchDashboardData(); 
        } else {
            alert("Gagal mengirim data ke database.");
        }
    } catch (error) {
        console.error("Error submit bayar:", error);
        alert("Terjadi kesalahan sistem atau server mati.");
    } finally {
        btnSubmit.innerText = teksAsli;
        btnSubmit.disabled = false;
    }
}

function logout(jenis) {
    localStorage.clear();
    if(jenis === 'warga') {
        window.location.href = 'login-desa.html';
    } else {
        window.location.href = '../login-admin.html';
    }
}