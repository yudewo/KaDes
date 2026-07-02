// 1. TEMA & IKON BROWSER
const htmlElement = document.documentElement;
const btnTheme = document.getElementById('toggleTheme');
const btnStyle = document.getElementById('toggleStyle');

const icons = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    normalStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`,
    glassStyle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`
};

const savedTheme = localStorage.getItem('app-theme') || 'light';
const savedStyle = localStorage.getItem('app-style') || 'normal';
htmlElement.setAttribute('data-theme', savedTheme);
htmlElement.setAttribute('data-style', savedStyle);

function updateIcons() {
    if (!btnTheme || !btnStyle) return;
    btnTheme.innerHTML = htmlElement.getAttribute('data-theme') === 'light' ? icons.moon : icons.sun;
    btnStyle.innerHTML = htmlElement.getAttribute('data-style') === 'normal' ? icons.glassStyle : icons.normalStyle;
}
updateIcons();

if (btnTheme) btnTheme.addEventListener('click', () => {
    let newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme); updateIcons();
});
if (btnStyle) btnStyle.addEventListener('click', () => {
    let newStyle = htmlElement.getAttribute('data-style') === 'normal' ? 'glass' : 'normal';
    htmlElement.setAttribute('data-style', newStyle);
    localStorage.setItem('app-style', newStyle); updateIcons();
});

// 2. STATISTIK DASHBOARD
async function updateDashboardStats() {
    const totalPemasukanEl = document.getElementById('totalPemasukan');
    const totalPengeluaranEl = document.getElementById('totalPengeluaran');
    const saldoKasEl = document.getElementById('saldoKas');
    
    const anggotaEl = document.getElementById('totalAnggota');
    const anggotaAktifEl = document.getElementById('anggotaAktif');
    const anggotaTidakAktifEl = document.getElementById('anggotaTidakAktif');

    try {
        const response = await fetch('api-get-stats.php');
        const result = await response.json();
        
        if (result.status === 'success') {
            if (totalPemasukanEl) totalPemasukanEl.setAttribute('data-target', result.keuangan.total_pemasukan || 0);
            if (totalPengeluaranEl) totalPengeluaranEl.setAttribute('data-target', result.keuangan.total_pengeluaran || 0);
            if (saldoKasEl) saldoKasEl.setAttribute('data-target', result.keuangan.saldo_kas || 0);
            
            if (anggotaEl) anggotaEl.setAttribute('data-target', result.anggota.total || 0);
            if (anggotaAktifEl) anggotaAktifEl.setAttribute('data-target', result.anggota.aktif || 0);
            if (anggotaTidakAktifEl) anggotaTidakAktifEl.setAttribute('data-target', result.anggota.tidak_aktif || 0);

            if (typeof animateCounters === 'function') animateCounters();
        }
    } catch (error) { 
        console.error("Gagal menarik data statistik:", error); 
    }
}

function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const currentString = counter.innerText.replace(/\./g, '');
            const count = +currentString;
            const inc = target / 150;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString('id-ID');
                setTimeout(updateCount, 30);
            } else { counter.innerText = target.toLocaleString('id-ID'); }
        };
        updateCount();
    });
}

// 3. PAGINATION GLOBAL & TOAST NOTIFIKASI
const itemsPerPage = 5; 
function renderPagination(totalItems, currentPage, containerId, callbackFunc) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return; 

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn'; prevBtn.innerHTML = '‹ Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => { callbackFunc(currentPage - 1); };
    container.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i; btn.onclick = () => { callbackFunc(i); };
        container.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn'; nextBtn.innerHTML = 'Next ›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => { callbackFunc(currentPage + 1); };
    container.appendChild(nextBtn);
}

function showCustomToast(arg1, arg2, arg3) {
    const toast = document.getElementById('toastPopup');
    if(toast) {
        let message = "";
        let color = "";

        if (arg3 === undefined) {
            message = arg1;
            color = arg2;
        } else {
            message = arg2;
            color = arg3;
        }
        
        document.getElementById('toastMessage').innerText = message;
        toast.style.borderLeftColor = color;
        toast.classList.add('show');
        
        setTimeout(() => toast.classList.remove('show'), 4000);
    }
}

// 4. MANAJEMEN DATA ANGGOTA (CRUD DB)
let dataAnggotaDB = []; 
let currentPageAnggota = 1;
let deleteTargetId = null; 

async function renderTableAnggota() {
    const tableBody = document.getElementById('tableAnggotaBody');
    if (!tableBody) return;

    try {
        const response = await fetch('api-get-anggota.php');
        const result = await response.json();
        
        if (result.status === 'success') {
            dataAnggotaDB = result.data; 
            tableBody.innerHTML = '';
            
            const start = (currentPageAnggota - 1) * itemsPerPage;
            const paginatedData = dataAnggotaDB.slice(start, start + itemsPerPage);

            paginatedData.forEach(p => {
                const statusClass = p.Status.toLowerCase() === 'aktif' ? 'bg-green' : 'bg-gray';
                tableBody.innerHTML += `
                    <tr>
                        <td><strong>${p.id_anggota}</strong></td>
                        <td>${p.Nama_Lengkap}</td>
                        <td>${p.No_HP}</td>
                        <td>${p.Alamat}</td>
                        <td><span class="badge ${statusClass}">${p.Status}</span></td>
                        <td style="white-space: nowrap;">
                            <button style="background: transparent; border: 1px solid var(--primary-color); color: var(--primary-color); padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; margin-right: 5px;" onclick="editAnggota('${p.NIK}')">Edit</button>
                            <button class="btn-danger" onclick="hapusAnggota('${p.NIK}')">Hapus</button>
                        </td>
                    </tr>
                `;
            });
            renderPagination(dataAnggotaDB.length, currentPageAnggota, 'paginationAnggota', (newPage) => {
                currentPageAnggota = newPage; renderTableAnggota();
            });
            
            loadDynamicNotifications(); // Refresh lonceng notifikasi otomatis
        }
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Gagal memuat data dari database.</td></tr>`;
    }
}

function openAddMemberModal() { 
    const form = document.getElementById('addMemberForm');
    document.getElementById('addMemberModal').querySelector('h3').innerText = "Tambah Anggota Baru";
    form.reset();
    
    let hiddenInput = document.getElementById('editMemberNik');
    if(!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden'; hiddenInput.id = 'editMemberNik';
        form.appendChild(hiddenInput);
    }
    hiddenInput.value = "";
    document.getElementById('addMemberModal').style.display = 'flex'; 
}

function closeAddMemberModal() { document.getElementById('addMemberModal').style.display = 'none'; }

function editAnggota(nik) {
    const m = dataAnggotaDB.find(p => p.NIK === nik);
    if(!m) return;
    
    document.getElementById('addMemberModal').querySelector('h3').innerText = "Edit Data Anggota";
    const form = document.getElementById('addMemberForm');
    
    let hiddenInput = document.getElementById('editMemberNik');
    if(!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden'; hiddenInput.id = 'editMemberNik';
        form.appendChild(hiddenInput);
    }
    hiddenInput.value = m.NIK;
    
    document.getElementById('inputNama').value = m.Nama_Lengkap;
    document.getElementById('inputTelp').value = m.No_HP;
    document.getElementById('inputAlamat').value = m.Alamat;
    
    const statusElement = document.getElementById('inputStatus');
    if(statusElement) statusElement.value = m.Status.toLowerCase();
    
    document.getElementById('addMemberModal').style.display = 'flex';
}

async function submitAddMember(e) {
    e.preventDefault(); 
    const nik = document.getElementById('editMemberNik') ? document.getElementById('editMemberNik').value : "";
    const nama = document.getElementById('inputNama').value;
    const telp = document.getElementById('inputTelp').value;
    const alamat = document.getElementById('inputAlamat').value;
    
    const statusElement = document.getElementById('inputStatus');
    const status = statusElement ? statusElement.value : 'aktif';

    try {
        if(nik) {
            await fetch('api-edit-anggota.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nik, nama, telp, alamat, status }) 
            });
            showCustomToast('Data Anggota berhasil diperbarui di Database!', '#10b981');
        } else {
            await fetch('api-tambah-anggota.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, telp, alamat, status }) 
            });
            showCustomToast('Anggota baru berhasil disimpan ke Database!', '#10b981');
        }
        closeAddMemberModal();
        currentPageAnggota = 1; 
        renderTableAnggota();
        updateDashboardStats();
    } catch (err) { alert('Gagal terhubung ke database.'); }
}

function hapusAnggota(nik) {
    const member = dataAnggotaDB.find(p => p.NIK === nik);
    if (member) {
        deleteTargetId = nik;
        document.getElementById('deleteMemberName').innerText = member.Nama_Lengkap;
        document.getElementById('deleteModal').style.display = 'flex';
    }
}
function closeDeleteModal() { document.getElementById('deleteModal').style.display = 'none'; }

async function confirmDelete() {
    if (deleteTargetId) {
        try {
            const response = await fetch('api-hapus-anggota.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nik: deleteTargetId })
            });
            showCustomToast('Data Anggota berhasil dihapus dari Database!', '#10b981');
            renderTableAnggota();
            updateDashboardStats();
        } catch (error) {
            showCustomToast('Terjadi kesalahan server.', '#ef4444');
        }
        closeDeleteModal();
    }
}

// 5. MANAJEMEN LAPORAN KEUANGAN (CRUD DB)
let dataTransaksi = [];
let currentPageLaporan = 1;
const itemsPerReportPage = 5;

function updateReportStats() {
    let masuk = 0; let keluar = 0;
    dataTransaksi.forEach(t => { if (t.jenis === 'Masuk') masuk += t.jumlah; else keluar += t.jumlah; });
    const saldoAkhir = masuk - keluar;
    const elPemasukan = document.getElementById('totalPemasukan');
    if(elPemasukan) {
        elPemasukan.innerText = 'Rp ' + masuk.toLocaleString('id-ID');
        document.getElementById('totalPengeluaran').innerText = 'Rp ' + keluar.toLocaleString('id-ID');
        document.getElementById('saldoAkhir').innerText = 'Rp ' + saldoAkhir.toLocaleString('id-ID');
    }
}

async function renderTableLaporan() {
    const tableBody = document.getElementById('tableLaporanBody');
    if (!tableBody) return;

    try {
        const response = await fetch('api-get-laporan.php');
        const result = await response.json();
        if (result.status === 'success') { dataTransaksi = result.data; }
    } catch (error) { console.error("Gagal menarik data kas desa"); }

    tableBody.innerHTML = '';
    const sortedData = [...dataTransaksi].sort((a, b) => new Date(b.tgl) - new Date(a.tgl));
    const start = (currentPageLaporan - 1) * itemsPerReportPage;
    const paginatedData = sortedData.slice(start, start + itemsPerReportPage);

    paginatedData.forEach(t => {
        const badge = t.jenis === 'Masuk' ? 'badge-in' : 'badge-out';
        const sign = t.jenis === 'Masuk' ? '+ ' : '- ';
        const color = t.jenis === 'Masuk' ? '#2ecc71' : '#ef4444';
        const dateObj = new Date(t.tgl);
        const formatTgl = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

        tableBody.innerHTML += `
            <tr class="hover-row">
                <td>${formatTgl}</td>
                <td>${t.ket}</td>
                <td><span class="${badge}">Kas ${t.jenis}</span></td>
                <td style="color: ${color}; font-weight: bold;">${sign}Rp ${t.jumlah.toLocaleString('id-ID')}</td>
                <td class="aksi-col" style="text-align: center;">
                    <button style="background: transparent; border: 1px solid var(--primary-color); color: var(--primary-color); padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; margin-right: 5px;" onclick="editReport('${t.id}')">Edit</button>
                    <button style="background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;" onclick="deleteReport('${t.id}')">Hapus</button>
                </td>
            </tr>
        `;
    });

    if (typeof renderPagination === "function") {
        renderPagination(dataTransaksi.length, currentPageLaporan, 'paginationLaporan', (newPage) => {
            currentPageLaporan = newPage; renderTableLaporan();
        });
    }
    updateReportStats();
    loadDynamicNotifications();
}

function openReportModal() {
    document.getElementById('modalReportTitle').innerText = "Tambah Transaksi Baru";
    document.getElementById('reportForm').reset();
    document.getElementById('editReportId').value = ""; 
    document.getElementById('reportModal').style.display = 'flex';
}
function closeReportModal() { document.getElementById('reportModal').style.display = 'none'; }

async function submitReport(e) {
    e.preventDefault();
    const id = document.getElementById('editReportId').value;
    const ket = document.getElementById('repKeterangan').value;
    const jenis = document.getElementById('repJenis').value;
    const jumlah = parseInt(document.getElementById('repNominal').value);
    const tgl = document.getElementById('repTanggal').value;

    try {
        if (id) {
            await fetch('api-edit-laporan.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ket, jenis, jumlah, tgl })
            });
            showCustomToast('Data transaksi berhasil diperbarui!', '#10b981');
        } else {
            await fetch('api-tambah-laporan.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ket, jenis, jumlah, tgl })
            });
            showCustomToast('Transaksi baru berhasil dicatat!', '#10b981');
        }
        closeReportModal();
        currentPageLaporan = 1; 
        renderTableLaporan();
    } catch (error) { alert('Gagal menghubungi server database.'); }
}

function editReport(id) {
    const t = dataTransaksi.find(item => item.id === id);
    if(!t) return;
    document.getElementById('modalReportTitle').innerText = "Edit Transaksi";
    document.getElementById('editReportId').value = t.id;
    document.getElementById('repKeterangan').value = t.ket;
    document.getElementById('repJenis').value = t.jenis.includes('Masuk') ? 'Kas Masuk' : 'Kas Keluar';
    document.getElementById('repNominal').value = t.jumlah;
    document.getElementById('repTanggal').value = t.tgl;
    document.getElementById('reportModal').style.display = 'flex';
}

let targetDeleteReportId = null;
function deleteReport(id) {
    targetDeleteReportId = id;
    document.getElementById('deleteReportModal').style.display = 'flex';
}
function closeDeleteReportModal() {
    document.getElementById('deleteReportModal').style.display = 'none';
    targetDeleteReportId = null;
}

async function confirmDeleteReport() {
    if (targetDeleteReportId !== null) {
        try {
            await fetch('api-hapus-laporan.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: targetDeleteReportId })
            });
            closeDeleteReportModal();
            showCustomToast('Transaksi berhasil dihapus permanen.', '#ef4444');
            renderTableLaporan(); 
        } catch (error) { alert('Gagal menghapus dari database.'); }
    }
}

// 6. FITUR DATA PEMBAYARAN (CRUD)
let dataPembayaranDB = [];
let targetDeletePembayaranId = null;

async function muatDataPembayaran() {
    const tbody = document.getElementById('tabelDataPembayaran');
    if (!tbody) return; 

    try {
        const response = await fetch('api-get-pembayaran.php');
        const data = await response.json();
        dataPembayaranDB = data; 
        
        tbody.innerHTML = ''; 
        
        data.forEach(item => {
            const formatRupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.nominal);
            let warnaStatus = item.Status.toLowerCase() === 'lunas' ? '#10b981' : '#f59e0b';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding: 15px; font-weight: bold; opacity: 0.8;">#P-${item.id_pembayaran}</td>
                <td style="padding: 15px;">${item.NIK_anggota}</td>
                <td style="padding: 15px;">${item.bulan_tahun}</td>
                <td style="padding: 15px; font-weight: 600;">${formatRupiah}</td>
                <td style="padding: 15px;">
                    <span style="background-color: ${warnaStatus}; color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                        ${item.Status}
                    </span>
                </td>
                <td style="padding: 15px;">${item.tanggal_bayar}</td>
                <td style="padding: 15px; white-space: nowrap;">
                    <button style="background: transparent; border: 1px solid var(--primary-color); color: var(--primary-color); padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; margin-right: 5px;" onclick="editPembayaran(${item.id_pembayaran})">Edit</button>
                    <button style="background: transparent; border: 1px solid #ef4444; color: #ef4444; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;" onclick="hapusPembayaran(${item.id_pembayaran})">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        loadDynamicNotifications();
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red; padding:15px;">Gagal memuat data.</td></tr>`;
    }
}

function bukaModalTambahPembayaran() {
    document.getElementById('modalPembayaranTitle').innerText = "Tambah Pembayaran Baru";
    document.getElementById('formPembayaran').reset();
    document.getElementById('editPembayaranId').value = ""; 
    document.getElementById('modalPembayaran').style.display = 'flex';
}

function tutupModalPembayaran() { document.getElementById('modalPembayaran').style.display = 'none'; }

async function submitPembayaran(e) {
    e.preventDefault();
    const id = document.getElementById('editPembayaranId').value;
    const nik = document.getElementById('pemNik').value;
    const bulan = document.getElementById('pemBulan').value;
    const nominal = document.getElementById('pemNominal').value;
    const tanggal = document.getElementById('pemTanggal').value;
    const status = document.getElementById('pemStatus').value;

    try {
        if (id) {
            await fetch('api-edit-pembayaran.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, nik, bulan, nominal, tanggal, status })
            });
            showCustomToast('Data pembayaran berhasil diupdate!', '#10b981');
        } else {
            await fetch('api-tambah-pembayaran.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nik, bulan, nominal, tanggal, status })
            });
            showCustomToast('Data pembayaran baru dicatat!', '#10b981');
        }
        tutupModalPembayaran();
        muatDataPembayaran(); 
    } catch (error) { alert('Gagal terhubung ke server.'); }
}

function editPembayaran(id) {
    const t = dataPembayaranDB.find(item => item.id_pembayaran == id);
    if(!t) return;
    
    document.getElementById('modalPembayaranTitle').innerText = "Edit Data Pembayaran";
    document.getElementById('editPembayaranId').value = t.id_pembayaran;
    document.getElementById('pemNik').value = t.NIK_anggota;
    document.getElementById('pemBulan').value = t.bulan_tahun;
    document.getElementById('pemNominal').value = t.nominal;
    document.getElementById('pemTanggal').value = t.tanggal_bayar;
    document.getElementById('pemStatus').value = t.Status;
    
    document.getElementById('modalPembayaran').style.display = 'flex';
}

function hapusPembayaran(id) {
    targetDeletePembayaranId = id;
    document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() { 
    document.getElementById('deleteModal').style.display = 'none';
    targetDeletePembayaranId = null;
}

async function confirmDelete() {
    // Fungsi ini menangani Hapus Anggota ATAU Hapus Pembayaran tergantung halaman aktif
    if (targetDeletePembayaranId !== null) {
        // Mode Hapus Pembayaran
        try {
            await fetch('api-hapus-pembayaran.php', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: targetDeletePembayaranId })
            });
            closeDeleteModal();
            showCustomToast('Data pembayaran berhasil dihapus.', '#ef4444');
            muatDataPembayaran();
        } catch (error) { alert('Gagal menghapus dari database.'); }
    } else if (deleteTargetId !== null) {
        // Mode Hapus Anggota
        try {
            await fetch('api-hapus-anggota.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nik: deleteTargetId })
            });
            showCustomToast('Data Anggota berhasil dihapus dari Database!', '#10b981');
            renderTableAnggota();
            updateDashboardStats();
        } catch (error) {
            showCustomToast('Terjadi kesalahan server.', '#ef4444');
        }
        closeDeleteModal();
    }
}
// 7. NOTIFIKASI DINAMIS (DATA RIIL)
async function loadDynamicNotifications() {
    const notifBtn = document.getElementById('notificationBtn');
    if (!notifBtn) return;
    const notifList = document.querySelector('.notif-list');
    const notifBadge = document.querySelector('.notif-badge');
    // if (!notifList || !notifBadge) return;

    try {
        const [resStats, resPay] = await Promise.all([
            fetch('api-get-stats.php').catch(() => null),
            fetch('api-get-pembayaran.php').catch(() => null)
        ]);

        const stats = resStats ? await resStats.json() : null;
        const payments = resPay ? await resPay.json() : [];

        let notifications = [];

        if (Array.isArray(payments)) {
            const pending = payments.filter(p => p.Status.toLowerCase() === 'menunggu verifikasi');
            if (pending.length > 0) {
                notifications.push({
                    icon: '⏳',
                    text: `Terdapat <strong>${pending.length} Pembayaran</strong> warga menunggu verifikasi Anda.`,
                    time: 'Segera tangani',
                    link: 'data-pembayaran.html'
                });
            }
        }

        if (stats && stats.status === 'success' && stats.keuangan.saldo_kas < 0) {
            notifications.push({
                icon: '⚠️',
                text: `Peringatan! Saldo Akhir Kas minus <strong>Rp ${Math.abs(stats.keuangan.saldo_kas).toLocaleString('id-ID')}</strong>.`,
                time: 'Perlu Perhatian',
                link: 'laporan.html'
            });
        }

        if (stats && stats.status === 'success' && stats.anggota.tidak_aktif > 0) {
            notifications.push({
                icon: '👤',
                text: `Ada <strong>${stats.anggota.tidak_aktif} Anggota</strong> yang saat ini berstatus Tidak Aktif.`,
                time: 'Cek Status',
                link: 'data-anggota.html'
            });
        }

        notifBadge.textContent = notifications.length;
        if (notifications.length === 0) {
            notifBadge.style.display = 'none';
            notifList.innerHTML = '<li style="padding: 15px; text-align: center; color: var(--text-color); opacity: 0.7; justify-content: center;">Tidak ada peringatan baru.</li>';
        } else {
            notifBadge.style.display = 'block';
            notifList.innerHTML = '';
            notifications.forEach(notif => {
                notifList.innerHTML += `
                    <li onclick="window.location.href='${notif.link}'" style="cursor: pointer;">
                        <div class="notif-icon" style="font-size: 20px;">${notif.icon}</div>
                        <div class="notif-text">
                            <p style="margin: 0 0 4px 0; font-size: 13px; color: var(--text-color);">${notif.text}</p>
                            <span style="font-size: 11px; color: #9ca3af;">${notif.time}</span>
                        </div>
                    </li>
                `;
            });
        }
    } catch (error) {
        console.error("Gagal memuat sistem notifikasi:", error);
    }
}
// 8. HALAMAN
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats(); 
    loadDynamicNotifications();
    
    if(document.getElementById('tableAnggotaBody')) renderTableAnggota(); 
    if(document.getElementById('tableLaporanBody')) renderTableLaporan();
    if(document.getElementById('tabelDataPembayaran')) muatDataPembayaran();
    
    const uploadInput = document.getElementById('uploadPhoto');
    const profilePreview = document.getElementById('profilePreview');
    const savedPhoto = localStorage.getItem('profile-photo');
    
    if (savedPhoto && profilePreview) profilePreview.src = savedPhoto;
    if(uploadInput) {
        uploadInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePreview.src = e.target.result;
                    localStorage.setItem('profile-photo', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Logika Klik Buka/Tutup Dropdown Notifikasi
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });

        window.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
});