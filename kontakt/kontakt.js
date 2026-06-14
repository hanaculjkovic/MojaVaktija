// kontakt.js

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  renderNavbar('kontakt');
  initNavbar();

  const posaljiBtn = document.getElementById('posaljiBtn');

  posaljiBtn.addEventListener('click', handleSubmit);

  // Enter submits from inputs
  ['ime','prezime','email'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmit();
    });
  });

  function handleSubmit() {
    clearErrors();
    const lang = getLang();
    const t = translations[lang];

    const ime = document.getElementById('ime').value.trim();
    const prezime = document.getElementById('prezime').value.trim();
    const email = document.getElementById('email').value.trim();
    const poruka = document.getElementById('poruka').value.trim();

    let valid = true;

    if (!ime) {
      showError('err-ime', t.contact_err_ime);
      document.getElementById('ime').classList.add('error');
      valid = false;
    }

    if (!prezime) {
      showError('err-prezime', t.contact_err_prezime);
      document.getElementById('prezime').classList.add('error');
      valid = false;
    }

    if (!email || !isValidEmail(email)) {
      showError('err-email', t.contact_err_email);
      document.getElementById('email').classList.add('error');
      valid = false;
    }

    if (!poruka) {
      showError('err-poruka', t.contact_err_poruka);
      document.getElementById('poruka').classList.add('error');
      valid = false;
    }

    if (valid) {
      // Store message data in sessionStorage for confirmation page
      sessionStorage.setItem('mv_contact', JSON.stringify({ ime, prezime, email, poruka }));
      window.location.href = '../poruka-poslata/index.html';
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    document.querySelectorAll('.kontakt-input').forEach(el => {
      el.classList.remove('error');
    });
  }
});
