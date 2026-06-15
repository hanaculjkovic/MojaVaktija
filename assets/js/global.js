
const translations = {
  sr: {
    nav_zikr: "ZIKR",
    nav_signout: "ODJAVA",
    nav_home: "POČETNA",
    nav_about: "O NAMA",
    nav_contact: "KONTAKT",
    lang_btn: "EN",
    footer_text: "moja.vaktija ©",

    // Login
    login_title: "PRIJAVA",
    login_username: "KORISNIČKO IME",
    login_password: "LOZINKA",
    login_btn: "PRIJAVI SE",
    login_error: "Pogrešno korisničko ime ili lozinka.",

    // Home
    home_location_default: "NOVI PAZAR",
    home_zora: "ZORA",
    home_sunce: "SUNCE",
    home_podne: "PODNE",
    home_ikindija: "IKINDIJA",
    home_aksam: "AKŠAM",
    home_jacija: "JACIJA",
    home_polovina: "POLOVINA NOĆI",
    home_zadnja: "ZADNJA TREĆINA",

    // Zikr
    zikr_title: "DNEVNI ZIKR",

    // O nama
    about_title: "O MENI",
    about_text: "Zdravo! Ja sam idejni tvorac ovog sajta! Trenutno sam studentkinja druge godine softverskog inženjerstva na Državnom Univerzitetu u mom rodnom gradu Novom Pazaru. Ovo je moj projekat na predmetu \"Veb dizajn\". Završila sam Gimnaziju u Novom Pazaru sa prosekom 5.00 na društveno-jezičkom smeru. Oduvek su me zanimale tehničke nauke i od malena sam istraživala o istim.",
    about_name: "Hana Čuljković",
    about_study: "SI",
    about_index: "036020/23",

    // Kontakt
    contact_ime: "IME :",
    contact_prezime: "PREZIME :",
    contact_email: "EMAIL ADRESA :",
    contact_poruka: "PORUKA :",
    contact_posalji: "POŠALJI",
    contact_err_ime: "Molimo unesite vaše ime.",
    contact_err_prezime: "Molimo unesite vaše prezime.",
    contact_err_email: "Molimo unesite ispravnu email adresu.",
    contact_err_poruka: "Molimo unesite poruku.",

    // Poruka poslata
    success_title: "PORUKA JE POSLATA",
    success_sub: "PORUKA JE POSLATA — ODGOVOR DOBIJATE NA EMAIL ADRESI",
    success_home: "POČETNA",

    // Index
    index_title: "MOJA VAKTIJA",
    index_sub: "PRISTUPI NAMASKIM VREMENIMA UZ LOG IN",
    index_btn: "PRIJAVI SE",
  },
  en: {
    nav_zikr: "ZIKR",
    nav_signout: "SIGN OUT",
    nav_home: "HOME",
    nav_about: "ABOUT US",
    nav_contact: "CONTACT US",
    lang_btn: "SR",
    footer_text: "moja.vaktija ©",

    // Login
    login_title: "LOG IN",
    login_username: "USERNAME",
    login_password: "PASSWORD",
    login_btn: "LOG IN",
    login_error: "Incorrect username or password.",

    // Home
    home_location_default: "NOVI PAZAR",
    home_zora: "FAJR",
    home_sunce: "SUNRISE",
    home_podne: "DHUHR",
    home_ikindija: "ASR",
    home_aksam: "MAGHRIB",
    home_jacija: "ISHA",
    home_polovina: "MIDNIGHT",
    home_zadnja: "LAST THIRD",

    // Zikr
    zikr_title: "DAILY DHIKR",

    // O nama
    about_title: "ABOUT ME",
    about_text: "Hello! I am the creator of this website! I am currently a second-year Software Engineering student at the State University in my hometown of Novi Pazar. This is my project for the Web Design course. I graduated from the Gymnasium in Novi Pazar with a 5.00 GPA in the social-linguistic track. I have always been fascinated by technical sciences and have been exploring them since childhood.",
    about_name: "Hana Čuljković",
    about_study: "SE",
    about_index: "036020/23",

    // Kontakt
    contact_ime: "FIRST NAME :",
    contact_prezime: "LAST NAME :",
    contact_email: "EMAIL ADDRESS :",
    contact_poruka: "MESSAGE :",
    contact_posalji: "SEND",
    contact_err_ime: "Please enter your first name.",
    contact_err_prezime: "Please enter your last name.",
    contact_err_email: "Please enter a valid email address.",
    contact_err_poruka: "Please enter a message.",

    // Poruka poslata
    success_title: "MESSAGE SENT",
    success_sub: "YOUR MESSAGE HAS BEEN SENT — YOU WILL RECEIVE A REPLY AT YOUR EMAIL ADDRESS",
    success_home: "HOME",

    // Index
    index_title: "MOJA VAKTIJA",
    index_sub: "ACCESS PRAYER TIMES BY LOGGING IN",
    index_btn: "LOG IN",
  }
};

// Dobijanje jezika iz localStorage ili podrazumevani jezik
function getLang() {
  return localStorage.getItem('mv_lang') || 'sr';
}

// Postavljanje jezika u localStorage i primena prevoda
function setLang(lang) {
  localStorage.setItem('mv_lang', lang);
  applyTranslations(lang);
}

// Primeni prevode na elemente sa data‑i18n atributom
function applyTranslations(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' && el.type === 'submit') {
        el.value = t[key];
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update lang button
  const btn = document.querySelector('.lang-toggle');
  if (btn) btn.textContent = t.lang_btn;
}

// Toggle za jezik
function toggleLang() {
  const current = getLang();
  setLang(current === 'sr' ? 'en' : 'sr');
}

// ---- AUTH ----
function isLoggedIn() {
  return sessionStorage.getItem('mv_user') !== null;
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = getRootPath() + 'index.html';
    }
}

function signOut() {
  sessionStorage.removeItem('mv_user');
  window.location.href = getRootPath() + 'index.html';
}

function getUser() {
  const u = sessionStorage.getItem('mv_user');
  return u ? JSON.parse(u) : null;
}

// Dobijanje osnovne putanje u odnosu na trenutnu stranicu
function getRootPath() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  
  const pathParts = window.location.pathname.split('/');
  const folders = ['login','home','zikr','o-nama','kontakt','poruka-poslata'];
  const inSubfolder = folders.some(f => pathParts.includes(f));
  return inSubfolder ? '../' : './';
}

// ---- NAVBAR ----
function initNavbar() {
  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.navbar-nav');
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }

  // Language toggle
  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLang);
  }

  // Sign out
  const signoutLink = document.querySelector('.nav-signout');
  if (signoutLink) {
    signoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      signOut();
    });
  }

  // Primeni trenutni jezik
  applyTranslations(getLang());
}

// ---- PASSWORD HASHING (Web Crypto API - radi u svakom browseru bez CDN) ----
async function hashPassword(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(plain, hash) {
  const computed = await hashPassword(plain);
  return computed === hash;
}

// USERS varijabla se učitava iz assets/js/users.js

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
});
