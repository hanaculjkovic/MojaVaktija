// login.js

document.addEventListener('DOMContentLoaded', () => {
  // if (isLoggedIn()) {
  //   window.location.href = '../home/index.html';
  //   return;
  // }

  applyTranslations(getLang());

  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  loginBtn.addEventListener('click', handleLogin);

  [usernameInput, passwordInput].forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
  });

  async function handleLogin() {
    clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const lang = getLang();
    const t = translations[lang];

    let valid = true;

    if (!username) {
      showError('err-username', lang === 'en' ? 'Please enter your username.' : 'Unesite korisničko ime.');
      usernameInput.classList.add('error');
      valid = false;
    }

    if (!password) {
      showError('err-password', lang === 'en' ? 'Please enter your password.' : 'Unesite lozinku.');
      passwordInput.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    loginBtn.disabled = true;
    loginBtn.textContent = '...';

    try {
      // USERS je globalna varijabla iz users.js
      if (typeof USERS === 'undefined') {
        throw new Error('users.js nije učitan');
      }

      const user = USERS.find(u => u.username.toLowerCase() === username.toLowerCase());

      if (!user) {
        showError('err-general', t.login_error);
        resetBtn();
        return;
      }

      // Proveri sifru pomocu Web Crypto SHA-256
      const match = await verifyPassword(password, user.password);

      if (match) {
        sessionStorage.setItem('mv_user', JSON.stringify({ username: user.username, ime: user.ime }));
        window.location.href = '../home/index.html';
      } else {
        showError('err-general', t.login_error);
        resetBtn();
      }

    } catch (err) {
      console.error('Login greska:', err);
      showError('err-general', lang === 'en' ? 'An error occurred. Please try again.' : 'Došlo je do greške. Pokušajte ponovo.');
      resetBtn();
    }
  }

  function resetBtn() {
    loginBtn.disabled = false;
    loginBtn.textContent = translations[getLang()].login_btn;
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add('visible');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => {
      el.classList.remove('visible');
      el.textContent = '';
    });
    document.querySelectorAll('.form-input').forEach(el => {
      el.classList.remove('error');
    });
  }
});
