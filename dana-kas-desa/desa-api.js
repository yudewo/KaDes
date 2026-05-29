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

    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        // Fitur Toggle Password
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
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            const errorBox = document.getElementById('loginError');

            // Reset Error & Show Loading
            errorBox.classList.add('hidden');
            submitBtn.disabled = true;
            if(btnSpinner) btnSpinner.classList.remove('hidden');
            if(btnText) btnText.innerText = 'Memverifikasi...';

            try {
                // Validasi: NIK 16 digit ATAU format email
                const isNIK = /^\d{16}$/.test(userInput);
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);

                if (!isNIK && !isEmail) {
                    throw new Error('NIK harus 16 angka atau gunakan Email valid.');
                }

                // SIMULASI PROSES BERHASIL
                setTimeout(() => {
                    localStorage.setItem('desa_token', 'token-warga-123');
                    localStorage.setItem('desa_nama', userInput); 
                    
                    // PINDAH KE DASHBOARD
                    window.location.href = 'dashboard-warga.html';
                }, 1500);

            } catch (error) {
                // Tampilkan Error
                errorBox.innerText = error.message;
                errorBox.classList.remove('hidden');
                
                // Kembalikan Tombol
                submitBtn.disabled = false;
                if(btnSpinner) btnSpinner.classList.add('hidden');
                if(btnText) btnText.innerText = 'Masuk Sekarang';
            }
        });
    }

    const loadingScreen = document.getElementById('loadingScreen');
    const dashboardContent = document.getElementById('dashboardContent');
    
    if (loadingScreen && dashboardContent) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            dashboardContent.classList.remove('opacity-0');
            setTimeout(() => loadingScreen.style.display = 'none', 500);
            if (typeof fetchDashboardData === "function") fetchDashboardData();
        }, 1500); 
    }

    // Tampilkan Nama Warga di Dashboard
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
        const data = await new Promise(resolve => setTimeout(() => resolve({
            saldoDesa: 491000000, 
            totalPengeluaran: 9000000, 
            iuranTerbayar: 4, 
            iuranTotal: 12, 
            statusIuran: 'Menunggu Bulan Mei'
        }), 500));

        document.querySelectorAll('.skeleton').forEach(el => el.classList.add('hidden'));

        if(document.getElementById('totalSaldo')) {
            document.getElementById('totalSaldo').innerText = 'Rp ' + data.saldoDesa.toLocaleString('id-ID');
            document.getElementById('totalSaldo').classList.remove('hidden');
        }
        if(document.getElementById('totalPengeluaran')) {
            document.getElementById('totalPengeluaran').innerText = 'Rp ' + data.totalPengeluaran.toLocaleString('id-ID');
            document.getElementById('totalPengeluaran').classList.remove('hidden');
        }
        if(document.getElementById('iuranTerbayar')) {
            document.getElementById('iuranTerbayar').innerText = `${data.iuranTerbayar}/${data.iuranTotal} Bulan`;
            document.getElementById('iuranTerbayar').classList.remove('hidden');
        }
        if(document.getElementById('iuranStatus')) {
            document.getElementById('iuranStatus').innerText = 'Status: ' + data.statusIuran;
            document.getElementById('iuranStatus').classList.remove('hidden');
        }
    } catch (error) { console.error(error); }
}

function openModal(id) { document.getElementById(id)?.classList.replace('hidden', 'flex'); }
function closeModal(id) { document.getElementById(id)?.classList.replace('flex', 'hidden'); }

function logout(jenis) {
    localStorage.clear();
    if(jenis === 'warga') {
        window.location.href = 'login-desa.html';
    } else {
        window.location.href = 'login-admin.html';
    }
}
