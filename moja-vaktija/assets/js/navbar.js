// navbar.js - Ubacuje navbar u svaku stranicu i omogućava funkcionalnosti navigacije, odjave i promjene jezika
function renderNavbar(activePage) {
  const root = getRootPath();
  const navbar = `
    <nav class="navbar">
      <a href="${root}index.html" class="navbar-brand">
        <img src="${root}assets/images/logo.png" alt="Moja Vaktija Logo" />
      </a>
      <button class="hamburger" aria-label="Meni">
        <span></span><span></span><span></span>
      </button>
      <ul class="navbar-nav">
        <li><a href="${root}zikr/index.html" class="${activePage==='zikr'?'active':''}" data-i18n="nav_zikr">ZIKR</a></li>
        <li><a href="#" class="nav-signout" data-i18n="nav_signout">ODJAVA</a></li>
        <li><a href="${root}home/index.html" class="${activePage==='home'?'active':''}" data-i18n="nav_home">POČETNA</a></li>
        <li><a href="${root}o-nama/index.html" class="${activePage==='o-nama'?'active':''}" data-i18n="nav_about">O NAMA</a></li>
        <li><a href="${root}kontakt/index.html" class="${activePage==='kontakt'?'active':''}" data-i18n="nav_contact">KONTAKT</a></li>
        <li><button class="lang-toggle">EN</button></li>
      </ul>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', navbar);
}
