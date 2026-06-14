// zikr.js

const zikrData = [
  {
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ",
    sr: "Allahumme Ente Rabbi, la ilahe illa Ente, halakteni ve ene 'abduke ve, ene 'ala ahdike ve va' dike mesteta'tu e'uzu bike min šerri ma sana'tu, ebu'u leke bi ni'metike 'alejje, ve ebu'u bi zenbi, fagfir li, fe innehu la jagfiru-z-zunube illa Ente.",
    en: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your servant. I am keeping my covenant with You and my pledge to You as best I can. I seek refuge with You from the evil of what I have done. I acknowledge Your blessing upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
    naziv_sr: "Sayyidul-Istighfar",
    naziv_en: "Master of Seeking Forgiveness",
    ponavljanje: "1x"
  },
  {
    arabic: "سُبْحَانَ اللَّهِ",
    sr: "Subhanallah — Slavljen neka je Allah",
    en: "Subhanallah — Glory be to Allah",
    naziv_sr: "Tesbih",
    naziv_en: "Tasbih",
    ponavljanje: "33x"
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ",
    sr: "Elhamdulillah — Hvala Allahu",
    en: "Alhamdulillah — All praise is due to Allah",
    naziv_sr: "Tahmid",
    naziv_en: "Tahmid",
    ponavljanje: "33x"
  },
  {
    arabic: "اللَّهُ أَكْبَرُ",
    sr: "Allahu Ekber — Allah je najveći",
    en: "Allahu Akbar — Allah is the Greatest",
    naziv_sr: "Tekbir",
    naziv_en: "Takbir",
    ponavljanje: "33x"
  },
  {
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    sr: "La ilahe illallahu vahdehu la šerike leh, lehul-mulku ve lehul-hamdu ve huve 'ala kulli šej'in kadir.",
    en: "There is none worthy of worship except Allah alone, with no partner, His is the dominion and His is the praise and He is over all things able.",
    naziv_sr: "Kelime-i Tevhid",
    naziv_en: "Words of Tawheed",
    ponavljanje: "10x"
  },
  {
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    sr: "E'uzu billahi mine-š-šejtani-r-radžim. Bismillahi-r-rahmani-r-rahim.",
    en: "I seek refuge in Allah from the accursed devil. In the name of Allah, the Most Gracious, the Most Merciful.",
    naziv_sr: "E'uzu-Bismilla",
    naziv_en: "Seeking Refuge",
    ponavljanje: "1x"
  },
  {
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    sr: "Allahumme salli 'ala Muhammedin ve 'ala ali Muhammed. Kema sallejte 'ala Ibrahime ve 'ala ali Ibrahim. Inneke hamidun medžid.",
    en: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. You are the Praiseworthy, the Glorious.",
    naziv_sr: "Salavat",
    naziv_en: "Salawat",
    ponavljanje: "10x"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  renderNavbar('zikr');
  initNavbar();

  let currentIndex = 0;
  const card = document.getElementById('zikr-card');
  const counter = document.getElementById('zikrCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function renderZikr(index) {
    const lang = getLang();
    const z = zikrData[index];
    card.innerHTML = `
      <div class="zikr-count-badge">${z.ponavljanje}</div>
      <div class="zikr-arabic">${z.arabic}</div>
      <p class="zikr-text">${lang === 'en' ? z.en : z.sr}</p>
      <div class="zikr-translation">
        <strong>${lang === 'en' ? z.naziv_en : z.naziv_sr}</strong>
      </div>
    `;
    counter.textContent = `${index + 1} / ${zikrData.length}`;
  }

  function goTo(index) {
    card.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = (index + zikrData.length) % zikrData.length;
      renderZikr(currentIndex);
      card.classList.remove('fade-out');
    }, 250);
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  // Re-render on language change (patch toggleLang)
  const origToggle = window.toggleLang;
  window.toggleLang = function() {
    origToggle();
    renderZikr(currentIndex);
  };

  renderZikr(currentIndex);
});
