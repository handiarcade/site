// Handi'Arcade - petites interactions de la page
(function () {
  // pupitre "Je joue avec..."
  var texts = {
    bouche: "Avec Eole, notre manette au souffle : souffler et aspirer dans des tubes, doucement ou fort, remplace les boutons.",
    menton: "Avec un joystick placé devant le visage, que l'on pousse avec les lèvres ou le menton.",
    main: "Avec de gros boutons d'arcade placés là où la main se pose, et autant de boutons qu'il en faut.",
    doigt: "Avec des contacteurs très sensibles : un simple effleurement suffit pour appuyer.",
    pied: "Avec des contacteurs posés au sol, à la bonne hauteur et à la bonne distance.",
    fauteuil: "Avec le joystick de votre fauteuil électrique, transformé en manette de jeu. Projet en cours de développement."
  };
  var btns = document.querySelectorAll('.arc');
  var out = document.getElementById('pad-text');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      btns.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      out.textContent = texts[b.dataset.k];
    });
  });

  // menu mobile
  var mb = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (mb) {
    mb.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); });
    });
  }

  // texte plus grand (retenu pour la visite suivante)
  var sb = document.querySelector('.size-btn');
  function setBig(on) {
    document.documentElement.classList.toggle('big', on);
    if (sb) sb.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  try { setBig(localStorage.getItem('ha-big') === '1'); } catch (e) {}
  if (sb) sb.addEventListener('click', function () {
    var on = !document.documentElement.classList.contains('big');
    setBig(on);
    try { localStorage.setItem('ha-big', on ? '1' : '0'); } catch (e) {}
  });

  // calcul du cout reel d'un don (reduction de 66 %)
  var don = document.getElementById('don'), cout = document.getElementById('cout');
  if (don) {
    var upd = function () {
      var v = Math.max(0, parseFloat(don.value) || 0);
      var c = v * 0.34;
      cout.textContent = (Math.round(c * 100) / 100).toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + ' €';
    };
    don.addEventListener('input', upd); upd();
  }
})();
