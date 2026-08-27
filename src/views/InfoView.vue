<script setup>
// Pagina Info - Layout millimetrico ad alta fedeltà con spaziature dei titoli e dei paragrafi uniformate
</script>

<template>
  <div class="info-container">
    <main class="info-layout">
      
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

    <div class="info-footer">
      <p>Speleo_Archive</p>
      <p>Designed by Paola Fioraso</p>
    </div>
  </div>
</template>

<style scoped>
/* Sfondo a tutto schermo */
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

/* Allineato a sinistra come il menu (24px), stessa altezza Y fissa usata in Archive per "Visual catalog..." */
.info-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: fixed;
  left: 24px;
  top: 272px;
  width: auto;
}

/* Struttura dei due macro-gruppi (About e Credits) */
.about-group,
.credits-group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 40px;
}

/* Contenitore specifico per affiancare i due paragrafi di About */
.about-paragraphs {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 45px;
}

/* Distanza tra la sezione About e Credits */
.credits-group {
  margin-left: 320px;
}

/* Titoli delle sezioni (Jura) - stessa dimensione del menu (24px) */
.info-title {
  font-family: 'Jura', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #afafaf;
  margin: 0;
  line-height: 1.2;
  flex-shrink: 0;
  width: 85px;
}

/* Blocchi di testo: 16px, larghezza ricalibrata su "CAVING CLUBS: Gruppo Speleologico" */
.text-block {
  width: 290px;
  flex-shrink: 0;
  font-family: 'Aeonik', sans-serif;
  font-size: 16px;
  line-height: 1.2;
  color: #343434;
}

.text-block p {
  margin: 0 0 32px 0;
}

.text-block p:last-child {
  margin-bottom: 0;
}

/* Evidenziazioni in grigio chiaro - colore #afafaf */
.highlight {
  color: #afafaf;
  font-weight: inherit;
}

/* Elenchi dei crediti: stessa larghezza e stessa dimensione delle colonne di About */
.credits-list {
  width: 290px;
  font-size: 16px;
  line-height: 1.2;
}

.credits-label {
  font-weight: 500;
  color: #afafaf;
}

/* Footer: stesso stile e posizione usati in Archive/Map/Map Zoom */
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