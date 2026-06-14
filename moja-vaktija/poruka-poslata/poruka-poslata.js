// poruka-poslata.js

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  applyTranslations(getLang());

  // If accessed directly without submitting a form, redirect to contact
  const contactData = sessionStorage.getItem('mv_contact');
  if (!contactData) {
    window.location.href = '../kontakt/index.html';
    return;
  }

  // Clear the contact data after reading it
  sessionStorage.removeItem('mv_contact');

  // Language toggle
  const langBtn = document.createElement('button');
  langBtn.className = 'lang-toggle';
  langBtn.style.cssText = 'position:fixed;top:1rem;right:1rem;';
  langBtn.textContent = getLang() === 'sr' ? 'EN' : 'SR';
  langBtn.addEventListener('click', () => {
    toggleLang();
    langBtn.textContent = getLang() === 'sr' ? 'EN' : 'SR';
  });
  document.body.appendChild(langBtn);
});
