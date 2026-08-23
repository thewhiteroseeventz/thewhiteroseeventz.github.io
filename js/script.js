/* ===========================
   The White Rose Eventz
   Cinematic Experience Engine
   =========================== */

(function() {
    'use strict';

    /* ===========================
       CINEMATIC OPENING — THE CURTAIN RISE
       Timeline:
       0.00s  BLACK
       0.20s  Gold curtain lines appear
       0.80s  Lines move to edges, hero bg starts revealing
       1.70s  Horizon line draws from center
       2.40s  "THE WHITE ROSE" letters fade in
       3.00s  "EVENTZ" appears
       3.30s  Tagline fades in
       3.70s  CTA buttons rise
       4.30s  Everything settled, nav visible
       =========================== */
    const heroBg = document.getElementById('heroBg');
    const navbar = document.getElementById('navbar');
    const curtainTop = document.getElementById('curtainTop');
    const curtainBottom = document.getElementById('curtainBottom');
    const heroCta = document.getElementById('heroCta');
    const scrollIndicator = document.getElementById('scrollIndicator');

    // 0.20s — Curtain lines appear
    setTimeout(() => {
        if (curtainTop) curtainTop.classList.add('open');
        if (curtainBottom) curtainBottom.classList.add('open');
    }, 200);

    // 0.80s — Hero bg starts revealing
    setTimeout(() => {
        if (heroBg) heroBg.classList.add('reveal');
    }, 800);

    // 3.70s — CTA buttons rise
    setTimeout(() => {
        if (heroCta) heroCta.classList.add('visible');
    }, 3700);

    // 4.30s — Nav + scroll indicator visible
    setTimeout(() => {
        if (navbar) navbar.classList.add('visible');
        if (scrollIndicator) scrollIndicator.classList.add('visible');
    }, 4300);

    /* ===========================
       MOBILE NAV — HAMBURGER + SCROLL STATE
       Touch devices skip the custom cursor,
       gold dust and hero parallax loops.
       =========================== */
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        const closeMenu = () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        };
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ===========================
       CUSTOM CURSOR
       =========================== */
    const cursorRing = document.getElementById('cursorRing');
    const cursorDot = document.getElementById('cursorDot');
    const cursorLabel = document.getElementById('cursorLabel');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        if (!finePointer) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        cursorLabel.style.left = ringX + 'px';
        cursorLabel.style.top = (ringY + 30) + 'px';
        if (finePointer) requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
            const label = el.getAttribute('data-cursor');
            if (label) {
                cursorLabel.textContent = label;
                cursorLabel.classList.add('active');
            }
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
            cursorLabel.classList.remove('active');
        });
    });

    /* ===========================
       GOLD DUST PARTICLES
       =========================== */
    const canvas = document.getElementById('goldCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let prevMouseX = 0, prevMouseY = 0;
    let mouseSpeed = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class GoldParticle {
        constructor(x, y, speed) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 0.5;
            this.life = 1;
            this.decay = 0.008 + Math.random() * 0.012;
            this.vx = (Math.random() - 0.5) * speed * 0.3;
            this.vy = (Math.random() - 0.5) * speed * 0.3 + 0.2;
            this.gravity = 0.02;
        }
        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.99;
            this.life -= this.decay;
        }
        draw() {
            ctx.globalAlpha = this.life * 0.6;
            ctx.fillStyle = '#C9A84C';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    document.addEventListener('mousemove', (e) => {
        mouseSpeed = Math.sqrt(
            Math.pow(e.clientX - prevMouseX, 2) +
            Math.pow(e.clientY - prevMouseY, 2)
        );
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        const count = Math.min(Math.floor(mouseSpeed * 0.15), 5);
        for (let i = 0; i < count; i++) {
            if (particles.length < 50) {
                particles.push(new GoldParticle(
                    e.clientX + (Math.random() - 0.5) * 10,
                    e.clientY + (Math.random() - 0.5) * 10,
                    mouseSpeed
                ));
            }
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        ctx.globalAlpha = 1;
        if (finePointer || particles.length) requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ===========================
       LOGO PARALLAX (Hero BG)
       =========================== */
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroBg.style.transform = `translate(${-x * 4}px, ${-y * 2.5}px) scale(1.01)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            heroBg.style.transform = 'translate(0, 0) scale(1)';
            heroBg.style.transition = 'transform 0.5s ease';
            setTimeout(() => { heroBg.style.transition = ''; }, 500);
        });
    }

    /* ===========================
       SCROLL REVEAL
       =========================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-text').forEach(el => {
        revealObserver.observe(el);
    });

    /* ===========================
       SECTION SCROLL-IN ANIMATIONS
       =========================== */
    const sectionTransition = document.getElementById('sectionTransition');
    let transitionCooldown = false;

    // Add scroll-in class to main content sections
    document.querySelectorAll('.about, .packages, .custom, .testimonials, .contact, .footer, .moment-statement').forEach(section => {
        section.classList.add('section-scroll-in');
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Trigger page-turn transition (with cooldown)
                if (!transitionCooldown && sectionTransition) {
                    transitionCooldown = true;
                    sectionTransition.classList.add('active');
                    setTimeout(() => {
                        sectionTransition.classList.remove('active');
                    }, 1300);
                    setTimeout(() => {
                        transitionCooldown = false;
                    }, 2500);
                }
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-scroll-in').forEach(section => {
        sectionObserver.observe(section);
    });

    /* ===========================
       MOMENT STATEMENT WORD REVEAL
       =========================== */
    const momentText = document.getElementById('momentText');
    if (momentText) {
        const momentWords = momentText.querySelectorAll('.moment-word');
        const momentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    momentWords.forEach(word => word.classList.add('visible'));
                    momentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        momentObserver.observe(momentText);
    }

    /* ===========================
       TESTIMONIAL HANDWRITING ANIMATION
       =========================== */
    const handwriteCards = document.querySelectorAll('[data-handwrite]');
    if (handwriteCards.length) {
        const handwriteObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    // Stagger each card's handwriting
                    const cardIndex = Array.from(handwriteCards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('handwritten');
                    }, cardIndex * 600);
                    handwriteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        handwriteCards.forEach(card => handwriteObserver.observe(card));
    }

    /* ===========================
       ABOUT SHOWCASE CROSSFADE
       =========================== */
    const showcase = document.getElementById('aboutShowcase');
    if (showcase) {
        const slides = showcase.querySelectorAll('.showcase-img');
        const dotsWrap = document.getElementById('showcaseDots');
        let current = slides.length - 1;
        let showcaseTimer;

        const dots = Array.from(slides).map((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'showcase-dot' + (i === current ? ' active' : '');            dot.setAttribute('aria-label', 'Show image ' + (i + 1));
            dot.addEventListener('click', () => goToSlide(i));
            dotsWrap.appendChild(dot);
            return dot;
        });

        function goToSlide(i) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = (i + slides.length) % slides.length;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
            restartShowcase();
        }

        function restartShowcase() {
            clearInterval(showcaseTimer);
            showcaseTimer = setInterval(() => goToSlide(current + 1), 6000);
        }

        restartShowcase();
    }

    /* ===========================
       CONTACT FORM — AJAX + SUCCESS STATE
       =========================== */
    const envelopeFlow = { reseal: null };
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const resetBtn = document.getElementById('resetFormBtn');
        const originalBtnText = submitBtn.textContent;
        // Route the AJAX submission through FormSubmit's JSON endpoint
        // while keeping the normal action as a no-JS fallback.
        const ajaxEndpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (submitBtn.disabled) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

            try {
                const response = await fetch(ajaxEndpoint, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                const result = await response.json().catch(() => null);
                const ok = response.ok && result && String(result.success) !== 'false';
                if (!ok) throw new Error(result && result.message ? result.message : 'Submission failed');

                contactForm.hidden = true;
                formSuccess.hidden = false;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => formSuccess.classList.add('visible'));
                });
                // Let them read "Form Submitted!", then the envelope reseals itself
                setTimeout(() => {
                    if (envelopeFlow.reseal) envelopeFlow.reseal();
                }, 2800);
            } catch (err) {
                alert('Something went wrong while sending your enquiry. Please call or WhatsApp us instead.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });

        resetBtn.addEventListener('click', () => {
            formSuccess.classList.remove('visible');
            setTimeout(() => {
                formSuccess.hidden = true;
                contactForm.reset();
                contactForm.hidden = false;
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }

    /* ===========================
       ENVELOPE FLOW — SEALED / OPEN / RESEAL
       Starts closed. Click to open. Reseals after
       submission and when scrolled out of view.
       =========================== */
    const envelope = document.getElementById('envelope');
    if (envelope) {
        const letterBox = envelope.querySelector('.envelope-letter');
        const sealNote = document.getElementById('envelopeNote');
        const openHint = document.getElementById('envelopeHint');
        let noteTimer = null;

        const closedHeight = () => (window.innerWidth < 768 ? 300 : 380);
        const setHeight = (h) => { envelope.style.height = h + 'px'; };
        const isOpen = () => envelope.classList.contains('open');
        const measureOpenHeight = () => letterBox.offsetHeight + 40;
        setHeight(closedHeight());

        function openEnvelope() {
            clearTimeout(noteTimer);
            if (isOpen()) return;
            if (sealNote && !sealNote.hidden) {
                sealNote.classList.remove('visible');
                setTimeout(() => { sealNote.hidden = true; }, 300);
            }
            if (openHint) openHint.classList.add('gone');
            setHeight(measureOpenHeight());
            envelope.classList.add('open');
            envelope.setAttribute('aria-expanded', 'true');
            setTimeout(() => {
                const firstField = contactForm && !contactForm.hidden
                    ? contactForm.querySelector('input[name="name"]')
                    : null;
                if (firstField) firstField.focus({ preventScroll: true });
            }, 1700);
        }

        function closeEnvelope(showNote) {
            if (!isOpen()) return;
            envelope.classList.remove('open');
            envelope.setAttribute('aria-expanded', 'false');
            setHeight(closedHeight());
            if (document.activeElement && envelope.contains(document.activeElement)) {
                document.activeElement.blur();
            }
            if (showNote && sealNote && sealNote.hidden) {
                noteTimer = setTimeout(() => {
                    sealNote.hidden = false;
                    requestAnimationFrame(() => sealNote.classList.add('visible'));
                }, 800);
            }
        }

        envelopeFlow.reseal = () => {
            formSuccess.classList.remove('visible');
            setTimeout(() => {
                formSuccess.hidden = true;
                contactForm.reset();
                contactForm.hidden = false;
            }, 350);
            closeEnvelope(true);
        };

        envelope.addEventListener('click', openEnvelope);
        envelope.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEnvelope();
            }
        });
        if (openHint) openHint.addEventListener('click', openEnvelope);

        const reopenBtn = document.getElementById('reopenBtn');
        if (reopenBtn) reopenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEnvelope();
        });

        // Auto-close when the envelope leaves the viewport (keeps typed data)
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting && isOpen()) closeEnvelope(false);
            });
        }, { threshold: 0 }).observe(envelope);

        window.addEventListener('resize', () => {
            setHeight(isOpen() ? measureOpenHeight() : closedHeight());
        });
    }

})();
