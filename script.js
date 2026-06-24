// 1. TEMA & ICON SINKRON DENGAN DASHBOARD
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
    const currentTheme = htmlElement.getAttribute('data-theme');
    const currentStyle = htmlElement.getAttribute('data-style');
    btnTheme.innerHTML = currentTheme === 'light' ? icons.moon : icons.sun;
    btnStyle.innerHTML = currentStyle === 'normal' ? icons.glassStyle : icons.normalStyle;
}
updateIcons();

btnTheme.addEventListener('click', () => {
    let newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
    updateIcons();
});

btnStyle.addEventListener('click', () => {
    let newStyle = htmlElement.getAttribute('data-style') === 'normal' ? 'glass' : 'normal';
    htmlElement.setAttribute('data-style', newStyle);
    localStorage.setItem('app-style', newStyle);
    updateIcons();
});

// 2. LIQUID & LOGIN
document.addEventListener('mousemove', (e) => {
    if(htmlElement.getAttribute('data-style') === 'glass') {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 30; 
            const moveX = (x * speed) - (speed / 2);
            const moveY = (y * speed) - (speed / 2);
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});

// Fitur Show/Hide Password
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    if (isPassword) {
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    } else {
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    }
});

// Login Admin Asli (Terhubung ke PHP & MariaDB)
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const btn = document.querySelector('.btn');
    const originalText = btn.innerHTML;
    const userVal = document.getElementById('username').value.trim();
    const passVal = document.getElementById('password').value;
    
    btn.innerHTML = 'Memverifikasi...';
    btn.style.opacity = '0.7';
    
    try {
        const response = await fetch('api-login-admin.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userVal, password: passVal })
        });
        
        const result = await response.json();

        if (result.status === 'success') {
            btn.innerHTML = 'Berhasil Masuk!';
            btn.style.opacity = '1';
            btn.style.background = 'var(--primary-color)';
            btn.style.color = '#fff';
            
            localStorage.setItem('admin_nama', result.nama);
            
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else {
            alert(result.pesan); // Tampilkan pesan error jika salah
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
        }
    } catch (error) {
        alert('Gagal terhubung ke database. Pastikan XAMPP (Apache & MySQL) menyala.');
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
    }
});