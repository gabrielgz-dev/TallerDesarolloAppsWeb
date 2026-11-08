/* ============================================
   main.js – Lógica del portafolio
   ============================================ */

'use strict';

/* ── 1. MODO OSCURO / CLARO (con localStorage) ── */
(function initTheme() {
  const root   = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon   = toggle ? toggle.querySelector('.theme-icon') : null;

  // Detecta preferencia guardada o usa prefers-color-scheme
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initial);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.dataset.theme || (prefersDark ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // También reacciona si el sistema cambia
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (toggle) {
      toggle.setAttribute('aria-label',
        theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
      );
    }
  }
})();


/* ── 2. MENÚ HAMBURGUESA ── */
(function initNav() {
  const toggle  = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');

  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cierra el menú al hacer clic en un enlace (en móvil)
  navList.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    });
  });

  // Cierra al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── 3. ENLACE ACTIVO EN NAVEGACIÓN (IntersectionObserver) ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((sec) => observer.observe(sec));
})();


/* ── 4. BOTÓN "VOLVER ARRIBA" ── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ── 5. AÑO DINÁMICO EN EL FOOTER ── */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ── 6. VALIDACIÓN DEL FORMULARIO DE CONTACTO ── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = form.querySelectorAll('.form-input');

  // Muestra el error de un campo
  function showError(input, message) {
    const group = input.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;
    if (errorEl) errorEl.textContent = message;
    input.classList.add('is-invalid');
  }

  // Limpia el error de un campo
  function clearError(input) {
    const group = input.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;
    if (errorEl) errorEl.textContent = '';
    input.classList.remove('is-invalid');
  }

  // Valida un campo individual
  function validateField(input) {
    clearError(input);

    if (input.required && !input.value.trim()) {
      showError(input, 'Este campo es obligatorio.');
      return false;
    }

    if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showError(input, 'Introduce un correo electrónico válido.');
      return false;
    }

    if (input.minLength && input.value.trim().length < input.minLength) {
      showError(input, `Mínimo ${input.minLength} caracteres.`);
      return false;
    }

    if (input.type === 'tel' && input.value && !/^[\+]?[0-9\s\-]{7,15}$/.test(input.value)) {
      showError(input, 'Introduce un número de teléfono válido.');
      return false;
    }

    return true;
  }

  // Validación en tiempo real (blur)
  fields.forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  // Validación al enviar
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    if (isValid) {
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = '✅ Mensaje enviado';

      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = originalText;
      }, 3000);
    }
  });
})();


/* ── 7. ANIMACIÓN DE BARRAS DE HABILIDADES (IntersectionObserver) ── */
(function animateSkills() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          // Fuerza la transición al valor definitivo
          fill.style.width = fill.style.getPropertyValue('--level') || '0%';
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Resetea al 0 antes de observar para que la animación sea visible
  fills.forEach((fill) => {
    const target = getComputedStyle(fill).getPropertyValue('--level').trim();
    fill.dataset.level = target;
    fill.style.width = '0%';
    observer.observe(fill);
  });
})();


/* ── 8. SCROLL REVEAL SUAVE ── */
(function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.project-card, .skill-category, .about-facts li, .contact-info, .contact-form'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
