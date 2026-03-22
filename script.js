/**
 * ================================================================
 * FLORES AMARILLAS — script.js v9
 *
 * Flujo (automático, sin botones de "Siguiente"):
 *   Escena 1  → clic #btn-empezar
 *   Escena 2  → clic sobre → confeti + apertura 3D → 2.5 s
 *   Escena 3  → lectura progresiva → GIF cierre → 3.2 s
 *   Escena Final → ramo + dedicatoria + stickers → confeti festivo
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. REFERENCIAS DOM
       ============================================================ */
    const escena1 = document.getElementById('escena-1');
    const escena2 = document.getElementById('escena-2');
    const escena3 = document.getElementById('escena-3');
    const escenaFinal = document.getElementById('escena-final');

    const btnEmpezar = document.getElementById('btn-empezar');
    const sobreConten = document.getElementById('sobre-contenedor');
    const hintAbrir = document.getElementById('hint-abrir');
    const cartaCuerpo = document.getElementById('carta-cuerpo');
    const gifCierreWrap = document.getElementById('gif-cierre-wrap');
    const mariposasCont = document.getElementById('mariposas-container');


    /* ============================================================
       2. ESTADO
       ============================================================ */
    const est = {
        sobreAbierto: false,
        transicionActiva: false,
    };


    /* ============================================================
       3. UTILIDADES
       ============================================================ */
    function ocultarSec(sec) {
        sec.style.display = 'none';
        sec.setAttribute('aria-hidden', 'true');
        sec.style.opacity = '';
    }

    function mostrarSec(sec, display = 'flex') {
        sec.style.display = display;
        sec.removeAttribute('aria-hidden');
    }

    /** Partículas CSS decorativas sin emojis */
    function crearParticulas(contenedor, tipos, cantidad = 14) {
        if (!contenedor) return;
        for (let i = 0; i < cantidad; i++) {
            const el = document.createElement('div');
            const tipo = tipos[Math.floor(Math.random() * tipos.length)];
            el.setAttribute('aria-hidden', 'true');
            el.classList.add('particula', `particula--${tipo}`);
            Object.assign(el.style, {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                bottom: '-8%',
                transform: `scale(${Math.random() * .6 + .45}) rotate(${Math.random() * 360}deg)`,
                animation: `aparecer-particula ${Math.random() * 5 + 5}s ease-in-out ${Math.random() * 7}s infinite`,
                pointerEvents: 'none',
                willChange: 'transform, opacity',
            });
            contenedor.appendChild(el);
        }
    }

    /* Estilos de partículas inyectados en <head> una vez */
    (function () {
        const s = document.createElement('style');
        s.textContent = `
      .particula { position:absolute; pointer-events:none; user-select:none; }
      .particula--flor {
        width:15px; height:15px; border-radius:50%; background:#FFD700;
        box-shadow:
          0 -10px 0 -4px #FFCA28, 0 10px 0 -4px #FFCA28,
          -10px 0 0 -4px #FFCA28, 10px 0 0 -4px #FFCA28,
          -7px -7px 0 -5px #FFE066, 7px -7px 0 -5px #FFE066,
          -7px 7px 0 -5px #FFE066, 7px 7px 0 -5px #FFE066;
      }
      .particula--circulo { width:8px; height:8px; border-radius:50%; background:#FFE082; opacity:.65; }
      .particula--hoja    { width:10px; height:14px; background:#7CB87A; border-radius:80% 0 80% 0; opacity:.70; }
      .particula--punto   { width:5px; height:5px; border-radius:50%; background:#C8960C; opacity:.45; }
    `;
        document.head.appendChild(s);
    })();


    /* ============================================================
       4. MARIPOSAS EXTRA (JS añade 3 a las 4 del HTML)
       ============================================================ */
    function generarMariposaExtra() {
        const img = document.createElement('img');
        img.src = 'mariposas1.gif';
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.classList.add('mariposa-gif');

        const top = Math.random() * 75 + 5;
        const size = Math.random() * 24 + 26;
        const dur = Math.random() * 14 + 11;
        const del = Math.random() * 10;
        const izq = Math.random() > .5;

        Object.assign(img.style, {
            top: `${top}%`,
            width: `${size}px`,
            transform: izq ? 'scaleX(-1)' : 'none',
            animation: [
                `${izq ? 'vuelo-izq' : 'vuelo-der'} ${dur}s linear ${del}s infinite`,
                `ondula-v ${(dur * .3).toFixed(1)}s ease-in-out ${del}s infinite`,
                `aleteo ${(.32 + Math.random() * .18).toFixed(2)}s ease-in-out infinite alternate`,
                `fade-in-mar 1s ease ${del}s forwards`,
            ].join(', '),
        });

        mariposasCont.appendChild(img);
    }

    for (let i = 0; i < 3; i++) generarMariposaExtra();


    /* ============================================================
       5. CONFETI
       ============================================================ */
    function disparConfeti(modo = 'normal') {
        const c = ['#FFD700', '#FFCA28', '#F9A825', '#FFF176', '#C8960C', '#A5D6A7', '#FFF', '#FFE082'];

        if (modo === 'normal') {
            const b = {
                particleCount: 72, spread: 86, startVelocity: 42,
                gravity: .84, ticks: 210, colors: c,
                shapes: ['circle', 'square'], scalar: 1.02, zIndex: 999,
            };
            confetti({ ...b, origin: { x: .24, y: .57 }, angle: 68 });
            setTimeout(() => confetti({ ...b, origin: { x: .76, y: .57 }, angle: 112 }), 170);
            setTimeout(() => confetti({
                particleCount: 40, spread: 152, startVelocity: 16,
                gravity: .54, ticks: 280, colors: c,
                origin: { x: .5, y: .30 }, scalar: .84, zIndex: 999,
            }), 420);

        } else if (modo === 'final') {
            const b = {
                particleCount: 90, spread: 100, startVelocity: 50,
                gravity: .75, ticks: 350, colors: c,
                shapes: ['circle', 'square'], scalar: 1.1, zIndex: 999,
            };
            confetti({ ...b, origin: { x: .20, y: .50 }, angle: 60 });
            setTimeout(() => confetti({ ...b, origin: { x: .80, y: .50 }, angle: 120 }), 200);
            setTimeout(() => confetti({
                particleCount: 60, spread: 180, startVelocity: 22,
                gravity: .50, ticks: 400, colors: c,
                origin: { x: .5, y: .20 }, scalar: .9, zIndex: 999,
            }), 500);
            setTimeout(() => confetti({ ...b, origin: { x: .35, y: .60 }, angle: 80 }), 800);
            setTimeout(() => confetti({ ...b, origin: { x: .65, y: .60 }, angle: 100 }), 1000);
        }
    }


    /* ============================================================
       6. ESCENA 1 → ESCENA 2
       ============================================================ */
    function iniciarExperiencia() {
        if (est.transicionActiva) return;
        est.transicionActiva = true;
        btnEmpezar.disabled = true;

        gsap.to(escena1, {
            opacity: 0, duration: 1, ease: 'power2.inOut',
            onComplete: mostrarEscena2,
        });
    }

    function mostrarEscena2() {
        ocultarSec(escena1);

        gsap.set(sobreConten, { opacity: 0, y: 52 });
        gsap.set('.escena-2__subtitulo', { opacity: 0, y: 14 });
        gsap.set('.escena-2__hint', { opacity: 0 });

        mostrarSec(escena2);

        crearParticulas(
            document.getElementById('escena2-particulas'),
            ['hoja', 'circulo', 'punto'], 12
        );

        gsap.to('.escena-2__subtitulo', { opacity: 1, y: 0, duration: .7, ease: 'power2.out', delay: .2 });
        gsap.to(sobreConten, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: .42 });
        gsap.to('.escena-2__hint', {
            opacity: .7, duration: .6, ease: 'power1.out', delay: 1.05,
            onComplete: () => { est.transicionActiva = false; },
        });
    }

    btnEmpezar.addEventListener('click', iniciarExperiencia);
    btnEmpezar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); iniciarExperiencia(); }
    });


    /* ============================================================
       7. APERTURA DEL SOBRE
       ============================================================ */
    function abrirSobre() {
        if (est.sobreAbierto || est.transicionActiva) return;
        est.sobreAbierto = true;
        est.transicionActiva = true;

        /* Activar animación CSS 3D */
        sobreConten.classList.add('abierto');
        disparConfeti('normal');

        gsap.fromTo(sobreConten,
            { rotation: -2 },
            { rotation: 0, duration: .62, ease: 'elastic.out(1,.4)', delay: .1 }
        );

        gsap.to(hintAbrir, {
            opacity: 0, y: -6, duration: .28, ease: 'power1.in',
            onComplete: () => {
                hintAbrir.textContent = 'Abriendo...';
                gsap.to(hintAbrir, { opacity: .6, y: 0, duration: .32 });
            },
        });

        sobreConten.setAttribute('aria-label', 'Sobre abierto.');
        sobreConten.setAttribute('aria-expanded', 'true');

        setTimeout(transicionE2aE3, 2500);
    }

    sobreConten.addEventListener('click', abrirSobre);
    sobreConten.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirSobre(); }
    });


    /* ============================================================
       8. ESCENA 2 → ESCENA 3
       ============================================================ */
    function transicionE2aE3() {
        gsap.to(escena2, {
            opacity: 0, duration: .85, ease: 'power2.inOut',
            onComplete: mostrarEscena3,
        });
    }

    function mostrarEscena3() {
        ocultarSec(escena2);

        gsap.set(escena3, { opacity: 0 });
        gsap.set('.pergamino', { opacity: 0, y: 32, rotation: .3 });
        gsap.set('.tira-vintage', { opacity: 0, x: 50 });
        gsap.set('.decoracion-transparente', { opacity: 0, scale: .80 });

        mostrarSec(escena3);

        crearParticulas(
            document.getElementById('escena3-particulas'),
            ['flor', 'circulo', 'punto', 'hoja'], 12
        );

        const tl = gsap.timeline();

        tl.to(escena3, { opacity: 1, duration: .99, ease: 'power2.out' })
            .to('.pergamino', { opacity: 1, y: 0, duration: .99, ease: 'power3.out' }, '-=.15')
            .to('.tira-vintage', { opacity: 1, x: 0, duration: .99, ease: 'back.out(1.2)' }, '-=.45')
            .to('.decoracion-transparente', {
                opacity: 1, scale: 1, duration: .99, ease: 'back.out(1.6)', stagger: .18,
            }, '-=.30')
            .call(iniciarLecturaProgresiva);
    }


    /* ============================================================
       9. LECTURA PROGRESIVA — GSAP stagger
       ============================================================ */
    function iniciarLecturaProgresiva() {
        const lineas = cartaCuerpo.querySelectorAll('.carta-linea');
        gsap.set(lineas, { opacity: 0, y: 12 });

        gsap.to(lineas, {
            opacity: 1, y: 0, duration: .99, ease: 'power2.out',
            stagger: .36, delay: .3,
            onComplete: revelarGifCierre,
        });
    }

    function revelarGifCierre() {
        if (gifCierreWrap) {
            gifCierreWrap.classList.add('visible');
            gifCierreWrap.removeAttribute('aria-hidden');
        }

        /* Confeti suave al terminar la carta */
        setTimeout(() => confetti({
            particleCount: 50, spread: 110, startVelocity: 17, gravity: .58, ticks: 270,
            colors: ['#FFD700', '#FFCA28', '#FFF176', '#F9A825', '#FFF', '#A5D6A7'],
            origin: { x: .5, y: .38 }, zIndex: 999,
        }), 500);

        /* Transición automática a Escena Final tras 3.2 s */
        setTimeout(transicionE3aFinal, 30000);
    }


    /* ============================================================
       10. ESCENA 3 → ESCENA FINAL
       ============================================================ */
    function transicionE3aFinal() {
        est.transicionActiva = true;

        gsap.to(escena3, {
            opacity: 0, duration: .9, ease: 'power2.inOut',
            onComplete: mostrarEscenaFinal,
        });
    }

    function mostrarEscenaFinal() {
        ocultarSec(escena3);

        gsap.set(escenaFinal, { opacity: 0 });
        gsap.set('.ramo-grande', { opacity: 0, y: -30, scale: .90 });
        gsap.set('.dedicatoria-panel', { opacity: 0, y: 24, rotation: .5 });
        gsap.set('.dedicatoria-texto', { opacity: 0, y: 16 });
        gsap.set('.dedicatoria-firma', { opacity: 0 });
        gsap.set('.sticker', { opacity: 0, scale: .60 });

        mostrarSec(escenaFinal);

        crearParticulas(
            document.getElementById('escena-final-particulas'),
            ['flor', 'circulo', 'hoja', 'punto'], 16
        );

        const tl = gsap.timeline({
            onComplete: () => {
                est.transicionActiva = false;
                /* Confeti festivo final */
                setTimeout(() => disparConfeti('final'), 300);
            }
        });

        tl.to(escenaFinal, { opacity: 1, duration: .65, ease: 'power2.out' })

            /* Ramo cae desde arriba con rebote */
            .to('.ramo-grande', {
                opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.4)',
            }, '-=.2')

            /* Panel de dedicatoria sube */
            .to('.dedicatoria-panel', {
                opacity: 1, y: 0, duration: .85, ease: 'power3.out',
            }, '-=.55')

            /* Texto de la dedicatoria */
            .to('.dedicatoria-texto', {
                opacity: 1, y: 0, duration: .7, ease: 'power2.out',
            }, '-=.30')

            /* Firma */
            .to('.dedicatoria-firma', {
                opacity: 1, duration: .55, ease: 'power1.out',
            }, '+=.2')

            /* Stickers en cascada con rebote individual desde posición aleatoria */
            .to('.sticker', {
                opacity: 1, scale: 1, duration: .55, ease: 'back.out(2)',
                stagger: { each: .14, from: 'random' },
            }, '-=.2');
    }


    /* ============================================================
       11. INICIALIZACIÓN
       ============================================================ */
    gsap.set(sobreConten, { opacity: 0, y: 52 });

    console.log('Flores Amarillas v9 — lista.');
    console.log('Coloca fondo.jpg en la carpeta del proyecto para el fondo global.');
    console.log('Reemplaza los placeholders de decoraciones con tus PNGs/GIFs.');

}); // fin DOMContentLoaded