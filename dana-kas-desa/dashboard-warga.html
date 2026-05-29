/**
 * DESA DIGITAL - API & LOGIC CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {

    const htmlElement = document.documentElement;
    const btnTheme = document.getElementById('toggleTheme');
    const btnStyle = document.getElementById('toggleStyle');

    const savedTheme = localStorage.getItem('desa-theme') || 'light';
    const savedStyle = localStorage.getItem('desa-style') || 'glass';

    htmlElement.setAttribute('data-theme', savedTheme);
    htmlElement.setAttribute('data-style', savedStyle);
    if(savedTheme === 'dark') htmlElement.classList.add('dark');

    function updateIcons() {
        if (btnTheme) btnTheme.innerHTML = htmlElement.classList.contains('dark') ? '☀️' : '🌙';
        if (btnStyle) btnStyle.innerHTML = htmlElement.getAttribute('data-style') === 'normal' ? '✨' : '🎨';
    }
    updateIcons();

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const newTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('desa-theme', newTheme);
            updateIcons();
        });
    }

    if (btnStyle) {
        btnStyle.addEventListener('click', () => {
            const newStyle = htmlElement.getAttribute('data-style') === 'normal' ? 'glass' : 'normal';
            htmlElement.setAttribute('data-style', newStyle);
            localStorage.setItem('desa-style', newStyle);
            updateIcons();
        });
    }

    const loadingScreen = document.getElementById('loadingScreen');
    const dashboardContent = document.getElementById('dashboardContent');
    
    if (loadingScreen && dashboardContent) {
        // Pastikan loading screen hilang apapun yang terjadi
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            dashboardContent.classList.remove('opacity-0');
            setTimeout(() => loadingScreen.style.display = 'none', 500);
            
            // Panggil data setelah loading selesai
            if (typeof fetchDashboardData === "function") fetchDashboardData();
        }, 1500); 
    } else if (dashboardContent) {
        dashboardContent.classList.remove('opacity-0');
    }
    const elNamaWarga = document.getElementById('namaWarga');
    if (elNamaWarga) {
        const identitasWarga = localStorage.getItem('desa_nama');
        if (!identitasWarga) {
            window.location.href = 'login-desa.html';
        } else {
            elNamaWarga.innerText = identitasWarga;
        }
    }
});

async function fetchDashboardData() {
    try {
        // Simulasi pemanggilan API ke MariaDB/PHP
        const data = await new Promise(resolve => setTimeout(() => resolve({
            saldoDesa: 491000000, 
            totalPengeluaran: 9000000, 
            iuranTerbayar: 4, 
            iuranTotal: 12, 
            statusIuran: 'Menunggu Bulan Mei'
        }), 500));

        // Sembunyikan efek skeleton loading
        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

        // 1. Tampilkan Saldo
        const totalSaldoEl = document.getElementById('totalSaldo');
        if(totalSaldoEl) {
            totalSaldoEl.innerText = 'Rp ' + data.saldoDesa.toLocaleString('id-ID');
            totalSaldoEl.classList.remove('hidden');
        }
        
        // 2. Tampilkan Total Pengeluaran (Transparansi)
        const totalPengeluaranEl = document.getElementById('totalPengeluaran');
        if(totalPengeluaranEl) {
            totalPengeluaranEl.innerText = 'Rp ' + data.totalPengeluaran.toLocaleString('id-ID');
            totalPengeluaranEl.classList.remove('hidden');
        }
        
        // 3. Tampilkan Iuran
        const iuranTerbayarEl = document.getElementById('iuranTerbayar');
        if(iuranTerbayarEl) {
            iuranTerbayarEl.innerText = `${data.iuranTerbayar}/${data.iuranTotal} Bulan`;
            iuranTerbayarEl.classList.remove('hidden');
        }
        const iuranStatusEl = document.getElementById('iuranStatus');
        if(iuranStatusEl) {
            iuranStatusEl.innerText = 'Status: ' + data.statusIuran;
            iuranStatusEl.classList.remove('hidden');
        }
    } catch (error) { 
        console.error("Error memuat data dashboard:", error); 
    }
}

// Fungsi Buka/Tutup Modal Universal
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.replace('hidden', 'flex');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.replace('flex', 'hidden');
}

// Fungsi Logout
function logout(jenis) {
    if(jenis === 'warga') {
        localStorage.removeItem('desa_token'); 
        localStorage.removeItem('desa_nama');
        window.location.href = 'login-desa.html';
    } else {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_name');
        window.location.href = 'login-admin.html';
    }
}
