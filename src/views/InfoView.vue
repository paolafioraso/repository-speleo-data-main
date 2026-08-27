<script setup>
// Pagina Info - Layout millimetrico ad alta fedeltà con spaziature dei titoli e dei paragrafi uniformate
// Nessuna logica dinamica: tutto il contenuto (testo, crediti) è scritto direttamente nel template
</script>

<template>
  <div class="info-container">
    <main class="info-layout">

      <!-- Sezione "About": titolo a sinistra, due colonne di testo affiancate a destra -->
      <div class="about-group">
        <h2 class="info-title">About</h2>

        <div class="about-paragraphs">
          <div class="text-block">
            <p>
              My name is <span class="highlight">Marco</span>, I'm 29 years old and from Abano Terme, in the Veneto region of Italy. I work as a <span class="highlight">post-doctoral researcher</span> in geology at the University of Siena.
            </p>
            <p>
              Since <span class="highlight">2017</span>, I've been spending much of my free time <span class="highlight">underground</span>, exploring caves and studying their environments. My passion for <span class="highlight">photography</span> actually came first, rooted in photographing the natural world, and over the years it has merged naturally with my love for <span class="highlight">geology and speleology</span>. Caves are among the last truly <span class="highlight">unexplored spaces</span> on Earth, and <span class="highlight">documenting</span> them means painting with light in a place where it has never naturally existed.
            </p>
          </div>

          <div class="text-block">
            <p>
              The images on this website were taken with the invaluable help of fellow cavers. <span class="highlight">Cave photography is a team effort</span>: capturing a single shot requires multiple people carefully positioning lights in the darkness, and each image can take anywhere from five minutes to over an hour to get right.
            </p>
            <p>
              In the summers of <span class="highlight">2023</span> and <span class="highlight">2025</span>, I traveled to <span class="highlight">Brazil</span> on <span class="highlight">caving expeditions</span> with the goal of <span class="highlight">documenting underground landscapes</span>.
            </p>
          </div>
        </div>
      </div>

      <!-- Sezione "Credits": stessa struttura di About (titolo + testo), ma con un solo blocco -->
      <div class="credits-group">
        <h2 class="info-title">Credits</h2>

        <div class="text-block credits-list">
          <p>
            <span class="credits-label">CAVING CLUBS:</span> Gruppo Speleologico Padovano CAI, Gruppo Grotte Treviso, Gruppo Grotte Schio CAI Belluno, Sociedade Espeleologica Azimute, Grupo Araras de Espeleologia, Sociedade Baiana de Espeleologia, Espeleo Grupo de Brasília, Espeleo Grupo Rio Claro, Federazione Speleologica Veneta, Commissione Centrale Speleologia e Torrentismo CAI.
          </p>
          <p>
            <span class="credits-label">SPELEOLOGISTS:</span> Alice Turatto, Beatrice Boccia, Sergio Rizzato, Stefano Zonta, Filippo Rossetto, Mauro Baratto, Fabio Dal Gallo, Cristina Macedo, Alberto Riva, Anna Maria Dalla Valle, Paolo Corsini, Federico Narduzzi, Raphael Parra, Juliana Bortone, Eugênia Sthefany, Leonardo Bamberg, Jorgean Silva, Celio Andreda.
          </p>
        </div>
      </div>

    </main>

    <!-- Firma in basso, stessa posizione/stile usati in Archive/Map/Map Zoom -->
    <div class="info-footer">
      <p>Speleo_Archive</p>
      <p>Designed by Paola Fioraso</p>
    </div>
  </div>
</template>

<style scoped>
/* Sfondo bianco a tutto schermo, fisso, sotto a tutto il resto */
.info-container {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  box-sizing: border-box;
}

/* Blocco principale (About + Credits): allineato a sinistra come il menu (24px).
   top: 272px è un valore fisso pensato per coincidere con il margin-top usato
   in Archive per "Visual catalog...", così le due pagine sono allineate verticalmente */
.info-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: fixed;
  left: 24px;
  top: 272px;
  width: auto;
}

/* Struttura interna dei due macro-gruppi: titolo a sinistra, testo a destra, affiancati */
.about-group,
.credits-group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px; /* spazio tra il titolo (es. "About") e il testo */
}

/* Le due colonne di paragrafi dentro About, affiancate orizzontalmente */
.about-paragraphs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 45px;
}

/* Distanza orizzontale tra il blocco About e il blocco Credits */
.credits-group {
  margin-left: 320px;
}

/* Titoli delle sezioni ("About", "Credits"): font Jura, stessa dimensione (24px) del menu principale */
.info-title {
  font-family: 'Jura', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #afafaf;
  margin: 0;
  line-height: 1.2;
  flex-shrink: 0; /* non si restringe mai, anche se il testo accanto è largo */
  width: 85px;
}

/* Paragrafi di testo: font Aeonik 16px. Larghezza di 290px calibrata in modo che
   "CAVING CLUBS: Gruppo Speleologico" occupi una riga sola prima di andare a capo */
.text-block {
  width: 290px;
  flex-shrink: 0;
  font-family: 'Aeonik', sans-serif;
  font-size: 16px;
  line-height: 1.2;
  color: #343434;
}

.text-block p {
  margin: 0 0 32px 0; /* spazio tra un paragrafo e il successivo */
}

.text-block p:last-child {
  margin-bottom: 0; /* l'ultimo paragrafo non ha margine extra sotto */
}

/* Parole/termini evidenziati nel testo (es. nomi propri, anni, parole chiave):
   colore grigio chiaro invece del grigio scuro standard del testo */
.highlight {
  color: #afafaf;
  font-weight: inherit;
}

/* Il blocco Credits eredita .text-block ma ne sovrascrive dimensione/larghezza
   per restare identico visivamente ad About, pur avendo contenuto diverso */
.credits-list {
  width: 290px;
  font-size: 16px;
  line-height: 1.2;
}

.credits-label {
  font-weight: 500;
  color: #afafaf;
}

/* Firma "Speleo_Archive / Designed by..." fissa in basso, centrata orizzontalmente:
   stesso stile identico usato in HomeView.vue, MapView.vue e MapZoomView.vue */
.info-footer {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  text-align: center;
  font-family: 'Jura', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.03em;
  color: #a3a3a3;
  line-height: 1.6;
}

.info-footer p {
  margin: 0;
}
</style>