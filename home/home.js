// home.js

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  renderNavbar('home');
  initNavbar();

  const citySelect = document.getElementById('citySelect');
  const cityName = document.getElementById('cityName');

  // Imena gradova po ID-ju (prema vaktija.ba API)
  const cityNames = {
    '107': { sr: 'NOVI PAZAR', en: 'NOVI PAZAR' },
    '77':  { sr: 'SARAJEVO', en: 'SARAJEVO' },
    '1':   { sr: 'ZENICA', en: 'ZENICA' },
    '78':  { sr: 'MOSTAR', en: 'MOSTAR' },
    '79':  { sr: 'BANJA LUKA', en: 'BANJA LUKA' },
    '80':  { sr: 'TUZLA', en: 'TUZLA' },
    '81':  { sr: 'BIHAĆ', en: 'BIHAĆ' },
    '82':  { sr: 'CAZIN', en: 'CAZIN' },
    '83':  { sr: 'SANSKI MOST', en: 'SANSKI MOST' },
    '84':  { sr: 'TRAVNIK', en: 'TRAVNIK' },
    '85':  { sr: 'GORAŽDE', en: 'GORAŽDE' },
    '86':  { sr: 'FOČA', en: 'FOČA' },
    '87':  { sr: 'TREBINJE', en: 'TREBINJE' },
    '88':  { sr: 'PRIJEDOR', en: 'PRIJEDOR' },
    '89':  { sr: 'DOBOJ', en: 'DOBOJ' },
    '90':  { sr: 'BRČKO', en: 'BRČKO' },
  };

  let currentCity = localStorage.getItem('mv_city') || '107';
  citySelect.value = currentCity;
  updateCityDisplay(currentCity);
  fetchVaktija(currentCity);

  citySelect.addEventListener('change', () => {
    currentCity = citySelect.value;
    localStorage.setItem('mv_city', currentCity);
    updateCityDisplay(currentCity);
    fetchVaktija(currentCity);
  });

  function updateCityDisplay(cityId) {
    const lang = getLang();
    const names = cityNames[cityId];
    if (names) {
      cityName.textContent = names[lang] || names['sr'];
    }
  }

  async function fetchVaktija(cityId) {
    setTimes({ zora:'--:--', sunce:'--:--', podne:'--:--', ikindija:'--:--', aksam:'--:--', jacija:'--:--', polovina:'--:--', zadnja:'--:--' });

    try {
      // Dobijanje trenutnog datuma 
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const url = `https://api.vaktija.ba/vaktija/v1/${cityId}/${year}/${month}/${day}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error('API error');

      const data = await res.json();

      // vaktija.ba API vraca: vakat array [fajr, sunrise, dhuhr, asr, maghrib, isha]
      
      if (data && data.vakat) {
        const v = data.vakat;
        setTimes({
          zora:     formatTime(v[0]),
          sunce:    formatTime(v[1]),
          podne:    formatTime(v[2]),
          ikindija: formatTime(v[3]),
          aksam:    formatTime(v[4]),
          jacija:   formatTime(v[5]),
          polovina: calcMidnight(v[4], v[0]),
          zadnja:   calcLastThird(v[4], v[0]),
        });
      } else {
        throw new Error('Unexpected API format');
      }
    } catch (err) {
      console.error('Vaktija API error:', err);
      
      try {
        const url2 = `https://api.vaktija.ba/vaktija/v1/${cityId}`;
        const res2 = await fetch(url2);
        if (!res2.ok) throw new Error('API2 error');
        const data2 = await res2.json();
        if (data2 && data2.vakat) {
          const v = data2.vakat;
          setTimes({
            zora:     formatTime(v[0]),
            sunce:    formatTime(v[1]),
            podne:    formatTime(v[2]),
            ikindija: formatTime(v[3]),
            aksam:    formatTime(v[4]),
            jacija:   formatTime(v[5]),
            polovina: calcMidnight(v[4], v[0]),
            zadnja:   calcLastThird(v[4], v[0]),
          });
        }
      } catch(e) {
        console.error('Both API calls failed', e);
        setTimes({ zora:'N/A', sunce:'N/A', podne:'N/A', ikindija:'N/A', aksam:'N/A', jacija:'N/A', polovina:'N/A', zadnja:'N/A' });
      }
    }
  }

  function formatTime(timeStr) {
    if (!timeStr) return '--:--';
    // API može vratiti "HH:MM" ili "H:MM"
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return parts[0].padStart(2,'0') + ':' + parts[1].padStart(2,'0');
    }
    return timeStr;
  }

  // Izračunaj ponoć (sredina noći između ahsama i narednog sabaha)
  function calcMidnight(maghrib, fajr) {
    try {
      const m = timeToMinutes(maghrib);
      let f = timeToMinutes(fajr);
      if (f < m) f += 24 * 60; // next day
      const mid = m + Math.floor((f - m) / 2);
      return minutesToTime(mid % (24 * 60));
    } catch { return '--:--'; }
  }

  // Izračunaj poslednju trećinu (2/3 između maghriba i narednog fajra)
  function calcLastThird(maghrib, fajr) {
    try {
      const m = timeToMinutes(maghrib);
      let f = timeToMinutes(fajr);
      if (f < m) f += 24 * 60;
      const night = f - m;
      const lastThird = m + Math.floor((2 * night) / 3);
      return minutesToTime(lastThird % (24 * 60));
    } catch { return '--:--'; }
  }

  function timeToMinutes(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  function minutesToTime(mins) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
  }

  function setTimes(times) {
    document.getElementById('t-zora').textContent = times.zora;
    document.getElementById('t-sunce').textContent = times.sunce;
    document.getElementById('t-podne').textContent = times.podne;
    document.getElementById('t-ikindija').textContent = times.ikindija;
    document.getElementById('t-aksam').textContent = times.aksam;
    document.getElementById('t-jacija').textContent = times.jacija;
    document.getElementById('t-polovina').textContent = times.polovina;
    document.getElementById('t-zadnja').textContent = times.zadnja;
  }
});
