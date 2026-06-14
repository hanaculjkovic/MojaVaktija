# Moja Vaktija 🕌

Islamski web sajt sa namskim vremenima, zikrom i kontakt formom.

## Stranice

| Stranica | Putanja |
|---|---|
| Landing / Ulazna | `/index.html` |
| Prijava | `/login/` |
| Početna (Vaktija) | `/home/` |
| Zikr | `/zikr/` |
| O Nama | `/o-nama/` |
| Kontakt | `/kontakt/` |
| Poruka Poslata | `/poruka-poslata/` |

## Korisnik za testiranje

| Korisničko ime | Lozinka |
|---|---|
| `hana` | `Vaktija2024!` |

## Tehnologije

- HTML5, CSS3, Vanilla JavaScript
- [Vaktija.ba API](https://api.vaktija.ba/vaktija/v1)
- bcryptjs za hašovanje lozinki
- Google Fonts (Cinzel, Cormorant Garamond)

## GitHub Pages postavljanje

1. Push projekat na GitHub
2. Idi na Settings → Pages
3. Source: `main` branch, `/ (root)`
4. Sačuvaj — sajt će biti dostupan na `https://username.github.io/repo-name/`

## Struktura foldera

```
moja-vaktija/
├── index.html              # Landing stranica
├── assets/
│   ├── css/
│   │   ├── global.css      # Globalni stilovi
│   │   └── index.css       # Landing stilovi
│   ├── js/
│   │   ├── global.js       # Auth, i18n, navbar logika
│   │   ├── navbar.js       # Navbar template
│   │   └── users.json      # Korisnici (hašovane lozinke)
│   └── images/
│       ├── background.jpg
│       ├── logo.png
│       └── profilna.jpg
├── login/
│   ├── index.html
│   ├── login.css
│   └── login.js
├── home/
│   ├── index.html
│   ├── home.css
│   └── home.js
├── zikr/
│   ├── index.html
│   ├── zikr.css
│   └── zikr.js
├── o-nama/
│   ├── index.html
│   ├── o-nama.css
│   └── o-nama.js
├── kontakt/
│   ├── index.html
│   ├── kontakt.css
│   └── kontakt.js
└── poruka-poslata/
    ├── index.html
    ├── poruka-poslata.css
    └── poruka-poslata.js
```
