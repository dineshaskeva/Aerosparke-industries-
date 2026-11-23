/**
 * AEROSPARKe Industries - Main JavaScript
 * Handles single-page routing for index.html, counter animations, scroll reveals,
 * fake reCAPTCHA, file uploads, filters, and form submissions.
 */

// ==========================================
// 1. PAGE ROUTER FOR INDEX.HTML (.page-view)
// ==========================================
const PAGE_TITLES = {
  home: 'Drone Survey, LiDAR & GIS Solutions India | AEROSPARKe Industries',
  about: 'About Us | AEROSPARKe Industries',
  services: 'Our Services | AEROSPARKe Industries',
  technology: 'Technology & Equipment | AEROSPARKe Industries',
  projects: 'Our Projects | AEROSPARKe Industries',
  industries: 'Industries We Serve | AEROSPARKe Industries',
  careers: 'Careers | AEROSPARKe Industries',
  cinematography: 'Cinematic Drone Videography | AEROSPARKe Industries',
  contact: 'Contact Us | AEROSPARKe Industries'
};

function switchPage() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [routePart, queryPart] = hash.split('?');
  const targetId = (routePart.trim().toLowerCase() || 'home');

  // Look for matching .page-view
  const targetView = document.getElementById(targetId);

  if (targetView && targetView.classList.contains('page-view')) {
    // 1. Show target page view, hide others
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });
    targetView.classList.add('active');

    // 2. Update navbar active link
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const aRoute = href.replace(/^#\/?/, '').split('?')[0].toLowerCase();
      if (aRoute === targetId || (targetId === 'home' && (aRoute === 'home' || aRoute === ''))) {
        a.classList.add('on');
      } else {
        a.classList.remove('on');
      }
    });

    // 3. Update document title
    if (PAGE_TITLES[targetId]) {
      document.title = PAGE_TITLES[targetId];
    }

    // 4. Close mobile navigation menu if open
    const nav = document.getElementById('nav');
    if (nav) nav.classList.remove('op');

    // 5. Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  setTimeout(updateScrollProgress, 50);

    // 6. Observe reveal elements in the active page
    targetView.querySelectorAll('.rv').forEach(el => io.observe(el));

    // 7. Autoplay background videos inside this page
    targetView.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.play().catch(() => {});
    });

    // 8. Trigger stats counters
    setTimeout(animateCounters, 100);

    // 9. Pre-fill contact form dropdown if service is passed in URL query
    if (targetId === 'contact') {
      const serviceParam = queryPart ? new URLSearchParams(queryPart).get('service') : null;
      if (serviceParam) {
        const select = targetView.querySelector('select[name="Service"]');
        if (select) {
          Array.from(select.options).forEach(opt => {
            if (
              opt.text.toLowerCase() === serviceParam.toLowerCase() ||
              opt.text.toLowerCase().includes(serviceParam.toLowerCase()) ||
              serviceParam.toLowerCase().includes(opt.text.toLowerCase())
            ) {
              select.value = opt.text;
            }
          });
        }
      }
    }
  } else if (targetId) {
    // Check if target is an anchor inside one of the pages (e.g. #openings or #drone-surveying)
    const anchorEl = document.getElementById(targetId);
    if (anchorEl) {
      const parentView = anchorEl.closest('.page-view');
      if (parentView && !parentView.classList.contains('active')) {
        document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active'));
        parentView.classList.add('active');
      }
      setTimeout(() => {
        anchorEl.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }
}

// Listen to hash changes (navbar clicks, back/forward buttons)
window.addEventListener('hashchange', switchPage);

// Ensure clicks on links always switch even if clicking the current hash
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href === '#' || href === '#!') return;
  if (link.getAttribute('onclick')?.includes('scrollIntoView')) return;

  const raw = href.replace(/^#\/?/, '');
  const [route] = raw.split('?');
  const targetView = document.getElementById(route.toLowerCase());

  if (targetView && targetView.classList.contains('page-view')) {
    if (window.location.hash === href) {
      switchPage();
    }
  }
});

// ==========================================
// 2. COUNTER ANIMATIONS
// ==========================================
function animateCounters() {
  document.querySelectorAll('.page-view.active .count-up:not(.counted), body:not(:has(.page-view)) .count-up:not(.counted)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('counted');
      const target = parseFloat(el.dataset.target) || 0;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(ease * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = prefix + target + suffix;
        }
      }
      requestAnimationFrame(update);
    }
  });
}

// ==========================================
// 3. SCROLL REVEAL OBSERVER
// ==========================================
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      animateCounters();
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// ==========================================
// 4. INTERACTIVE RECAPTCHA
// ==========================================
function toggleCaptcha(id) {
  const check = document.getElementById(id + '-check');
  const input = document.getElementById(id + '-input');
  const err = document.getElementById(id + '-err');
  if (!check || !input) return;
  if (input.checked) {
    input.checked = false;
    check.classList.remove('verified');
  } else {
    check.classList.add('verifying');
    if (err) err.style.display = 'none';
    setTimeout(() => {
      check.classList.remove('verifying');
      check.classList.add('verified');
      input.checked = true;
    }, 400);
  }
}

// ==========================================
// 5. FILE UPLOAD (CAREERS)
// ==========================================
function handleFile(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    const content = document.getElementById('cv-content');
    const sel = document.getElementById('cv-selected');
    if (content) content.style.display = 'none';
    if (sel) {
      sel.style.display = 'flex';
      const name = document.getElementById('cv-name');
      const size = document.getElementById('cv-size');
      if (name) name.textContent = file.name;
      if (size) size.textContent = '(' + sizeMb + ' MB)';
    }
  }
}

function removeFile(e) {
  if (e) e.stopPropagation();
  const input = document.getElementById('cv-input');
  if (input) input.value = '';
  const content = document.getElementById('cv-content');
  const sel = document.getElementById('cv-selected');
  if (content) content.style.display = 'flex';
  if (sel) sel.style.display = 'none';
}

// ==========================================
// 6. FORM SUBMISSIONS
// ==========================================
function sendF(e, s) {
  e.preventDefault();
  const f = e.target;
  const captcha = f.querySelector('input[name="RobotVerification"]');
  if (captcha && !captcha.checked) {
    const err = f.querySelector('.recaptcha-err');
    if (err) err.style.display = 'block';
    const box = f.querySelector('.recaptcha-box');
    if (box) {
      box.classList.add('shake');
      setTimeout(()=>box.classList.remove('shake'), 600);
    }
    return;
  }
  const d = new FormData(f);
  let b = '';
  d.forEach((v, k) => {
    if (k === 'RobotVerification' || k === 'ResumeFile') return;
    if (v) b += k + ': ' + v + '\n';
  });
  const fileInput = f.querySelector('input[type="file"]');
  if (fileInput && fileInput.files[0]) {
    b += 'Resume / CV: ' + fileInput.files[0].name + ' (Attached)\n';
  }
  location.href = 'mailto:' + (s === 'Careers' ? 'careers' : 'info') + '@aerosparke.com?subject=' + encodeURIComponent(s + ' – AEROSPARKe website') + '&body=' + encodeURIComponent(b);
}

// ==========================================
// 7. PROJECT FILTER CHIPS
// ==========================================
function filt(c, el) {
  document.querySelectorAll('.chips-filter .chip').forEach(x => x.classList.toggle('on', x === el));
  document.querySelectorAll('#prj-grid .prj-card').forEach(x => {
    const match = (c === 'All' || x.dataset.c === c);
    x.style.display = match ? 'flex' : 'none';
  });
}

// ==========================================
// 8. PAGE INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // If index.html with .page-view exists, run the router
  if (document.querySelector('.page-view')) {
    switchPage();
  } else {
    // Reveal elements on scroll for standalone pages
    document.querySelectorAll('.rv').forEach(el => io.observe(el));

    // Autoplay background video if present
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      v.play().catch(() => {});
    });

    // Pre-fill contact form dropdown from query params
    const qs = window.location.search;
    if (qs) {
      const s = new URLSearchParams(qs).get('service');
      const el = document.querySelector('select[name=Service]');
      if (s && el) {
        Array.from(el.options).forEach(o => {
          if (o.text === s || s.startsWith(o.text.slice(0, 8)) || o.text.toLowerCase().includes(s.toLowerCase())) {
            el.value = o.text;
          }
        });
      }
    }
    setTimeout(animateCounters, 100);
  }
});

// ==========================================
// 9. STICKY HEADER
// ==========================================
// ==========================================
// 9. STICKY HEADER & SCROLL PROGRESS BAR (REFERENCE IMAGE)
// ==========================================
function updateScrollProgress() {
  const progressBar = document.getElementById('navbar-progress-bar');
  if (!progressBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
}

function ensureProgressBar() {
  const header = document.querySelector('header');
  if (header && !document.getElementById('navbar-progress-bar')) {
    const bar = document.createElement('div');
    bar.id = 'navbar-progress-bar';
    bar.className = 'nav-scroll-progress';
    header.appendChild(bar);
  }
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    header.classList.toggle('sc', window.scrollY > 40);
  }
  updateScrollProgress();
}, { passive: true });

window.addEventListener('resize', updateScrollProgress, { passive: true });
document.addEventListener('DOMContentLoaded', () => {
  ensureProgressBar();
  updateScrollProgress();

  // Tech Highlights Dropdown & Image Zoom
  document.querySelectorAll('.tech-highlights-dropdown').forEach(dropdown => {
    dropdown.addEventListener('toggle', () => {
      const card = dropdown.closest('.tech-split-card');
      if (card) {
        card.classList.toggle('hl-open', dropdown.open);
      }
      const label = dropdown.querySelector('.tech-hl-btn-text');
      if (label) {
        label.textContent = dropdown.open ? 'Hide Key Highlights' : 'Key Highlights';
      }
    });
  });
});

