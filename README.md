<a id="top"></a>
# Ocenjevanje bonitetne ocene – potrošniški krediti 
<div align="center">
  <h3>🌟 Aplikacija za avtomatizirano ocenjevanje bonitetne ocene za kreditna posojila 🌟</h3>
</div>

<p align="center">
  <a href="#opis">Opis</a> •
  <a href="#tehnologije">Tehnologije</a> •
  <a href="#inštalacije">Inštalacija</a> •
  <a href="#pogon">Pogon</a> •
  <a href="#avtorji">Avtorji</a>
</p>


## Opis

Informacijska rešitev ocenjuje bonitetno oceno na podlagi, PDF dokumentov o finančih izpiskih in osebnih podatkov. Z analizo teh vhodnih podatkov aplikacija določi primerno vrsto kredita in stopnjo tveganja za potencialne kreditojemalce, kar zagotavlja nemoten in ozaveščen postopek odobravanja kreditov. 

### Potek delovanja aplikacije

---
**[1] Ob zagonu aplikacije se pojavi vnosno polje za PDF dokumente.**
![slika1](https://github.com/Valeri1234car/ReadMeDMTest/assets/152204015/7bb67fec-c60f-4638-89ac-103abda85466) <br>

---

**[2] Nato napolnimo vnosno polje z željenimi PDF dokumenti in pritisnemo na gumb "Začnite z obdelavo".** <br>
![slika2](https://github.com/Valeri1234car/ReadMeDMTest/assets/152204015/05da3e8f-d25a-4661-9dd2-2b37ed278561) <br>

---

**[3] Avotmatasko polnjenje vnosnih polji.** <br>
![slika3](https://github.com/Valeri1234car/ReadMeDMTest/assets/152204015/733014a8-cf8e-4016-a4e2-388b82aa6ab1) <br>

---

**[4] Avotmatasko polnjenje vnosnih polji**. <br>
![slika4](https://github.com/Valeri1234car/ReadMeDMTest/assets/152204015/147ecc87-8f29-42dd-98d1-883258826cf3) <br>

---

**[5] Polnjenje excelovih celic. in racunanje bonitetne ocene.** <br>
![slika5](https://github.com/Valeri1234car/ReadMeDMTest/assets/152204015/a78eee3e-6ec4-4d5a-9dd9-d7dd7293fc15) <br>

---

**[6] Izračun bonitetne ocene na podlagi danih podatkov.** <br>
![slika6](https://github.com/Valeri1234car/ReadMeDMTest/assets/152204015/3d9eb3da-7f97-45e2-a147-76d9c3a21bbd) <br>
*Pri ocenjevanju ocene so potrebni tudi vnosi s strani podjetja, ki nudi posojila/kredite.*

---
## Tehnologije

<ul>
<li><img src="https://reactjs.org/favicon.ico" alt="React" width="30" height="30"> React</li>
<li><img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="30"> Bootstrap</li>
<li><img src="https://www.typescriptlang.org/favicon.ico" alt="TypeScript" width="30" height="30"> TypeScript</li>
<li><img src="https://cdn.jsdelivr.net/npm/simple-icons@7.17.0/icons/html5.svg" alt="HTML" width="30" height="30"> HTML</li>
<li><img src="https://cdn.jsdelivr.net/npm/simple-icons@7.17.0/icons/css3.svg" alt="CSS" width="30" height="30"> CSS</li>
</ul>

## Inštalacije
1. Namestitev npm paketov.
```
npm install
```
1.1 Če pride do težav z uvažanjem, namestite še naslednje dodatne pakete:
```
npm i react-bootstrap
npm i electron
npm i xlsx
npm install pdfjs-dist@3.0.279 tesseract.js
npm i exceljs file-saver  
```
## Pogon

Po uspešni namestitvi zahtevanih paketov odprite projekt v svojem najljubšem razvojnem okolju (npr. VSC, WebStorm...). <br>
1.Kloniranje repositorja
```sh
git clone https://github.com/Valeri1234car/PRII.git
```
2.Poženite program v direktoriju `PRII\desktop-app\electron-app>` z ukazom
```
npm run dev
```
## Avtorji

Razvijalci projekta: <br>
Domen Drovenik  <br>
Lazar Čvorović <br>
Valeri Kamburov <br>
## 
[🔼 Nazaj na vrh](#top)
