// poruka-poslata.js

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  applyTranslations(getLang());

  // Proveri da li imamo podatke o poruci iz kontakt forme, ako ne, vrati na kontakt stranicu
  const contactData = sessionStorage.getItem('mv_contact');
  if (!contactData) {
    window.location.href = '../kontakt/index.html';
    return;
  }

  // Prikaz poruke korisniku (može se proširiti da prikazuje ime ili deo poruke)
  sessionStorage.removeItem('mv_contact');

  // Dodaj dugme za promenu jezika na ovu stranicu
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
