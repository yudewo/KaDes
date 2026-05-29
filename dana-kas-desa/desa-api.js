/**
 * DESA DIGITAL - API & LOGIC CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {

    const htmlElement = document.documentElement;
    const btnTheme = document.getElementById('toggleTheme');
    const btnStyle = document.getElementById('toggleStyle');

    // Ikon SVG
    const icons = {
        sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>`,
        moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        normalStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`,
        glassStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`
    };

    const savedTheme = localStorage.getItem('desa-theme') || 'light';
    const savedStyle = localStorage.getItem('desa-style') || 'glass';

    htmlElement.setAttribute('data-theme', savedTheme);
    htmlElement.setAttribute('data-style', savedStyle);
    if(savedTheme === 'dark') htmlElement.classList.add('dark');

    function updateIcons() {
        if (btnTheme) btnTheme.innerHTML = htmlElement.classList.contains('dark') ? icons.sun : icons.moon;
        if (btnStyle) btnStyle.innerHTML = htmlElement.getAttribute('data-style') === 'normal' ? icons.glassStyle : icons.normalStyle;
        
        const liquidBg = document.getElementById('liquidBg');
        if (liquidBg) {
            if (htmlElement.getAttribute('data-style') === 'glass') {
                liquidBg.classList.add('opacity-85'); 
                liquidBg.classList.remove('opacity-0');
            } else {
                liquidBg.classList.remove('opacity-85'); 
                liquidBg.classList.add('opacity-0');
            }
        }
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

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
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

                if (!isNIK && !isEmail) {
                    throw new Error('Harap masukkan NIK (16 Angka) atau Email yang valid.');
                }

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

// Fungsi Buka/Tutup Modal Universal (Digunakan oleh Transparansi & Bayar Kas)
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.replace('hidden', 'flex');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.replace('flex', 'hidden');
}

// Fungsi Logout Universal
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
