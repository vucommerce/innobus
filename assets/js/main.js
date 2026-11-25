/**
 * INNOBUS 2027
 * Department of Commerce, Vidyasagar University
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initParticles();
  initCarouselControls();
  initMobileMenu();
  initCopyButtons();
  initScrollSpy();
  initPaymentModal();
  initBackToTop();
});

/* 0. Dynamic Faint Particle Constellation Network (Inspired by ICSTS 2026) */
function initParticles() {
  const c = document.getElementById('particles-hero');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [];

  const resize = () => {
    W = c.width = c.offsetWidth;
    H = c.height = c.offsetHeight;
    const n = Math.min(75, Math.floor(W / 18));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.6
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    // Draw drifting subtle golden particles
    pts.forEach(p => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.65)';
      ctx.fill();
    });

    // Draw dynamic faint connecting lines between nearby points
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 125 * 125) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.11 * (1 - d2 / 15625)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* 0. Live Countdown Timer to 18-19th March, 2027 */
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Conference Date: 18-19th March, 2027 (Starts March 18, 2027, 09:30:00 AM IST)
  const targetDate = new Date('2027-03-18T09:30:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* 1. Horizontal Image Carousel Controls */
function initCarouselControls() {
  const track = document.getElementById('carouselTrack');
  const pauseBtn = document.getElementById('pauseBtn');
  const pauseIcon = document.getElementById('pauseIcon');
  const pauseText = document.getElementById('pauseText');
  const speedBtn = document.getElementById('speedBtn');

  if (!track || !pauseBtn) return;

  let isPaused = false;
  let isFast = false;

  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
      track.classList.add('paused');
      if (pauseIcon) {
        pauseIcon.classList.remove('fa-pause');
        pauseIcon.classList.add('fa-play');
      }
      if (pauseText) pauseText.textContent = 'Resume';
    } else {
      track.classList.remove('paused');
      if (pauseIcon) {
        pauseIcon.classList.remove('fa-play');
        pauseIcon.classList.add('fa-pause');
      }
      if (pauseText) pauseText.textContent = 'Pause';
    }
  });

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      isFast = !isFast;
      if (isFast) {
        document.documentElement.style.setProperty('--carousel-speed', '12s');
        speedBtn.classList.add('bg-amber-500', 'text-slate-950');
      } else {
        document.documentElement.style.setProperty('--carousel-speed', '28s');
        speedBtn.classList.remove('bg-amber-500', 'text-slate-950');
      }
    });
  }
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* 3. One-Click Copy for Bank Details */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-trigger');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetText = btn.getAttribute('data-copy');
      if (!targetText) return;

      navigator.clipboard.writeText(targetText).then(() => {
        const badge = btn.querySelector('.copied-badge');
        if (badge) {
          badge.classList.add('show');
          setTimeout(() => badge.classList.remove('show'), 2000);
        } else {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Copied!';
          setTimeout(() => { btn.innerHTML = original; }, 2000);
        }
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

/* 4. Payment QR Code Modal */
function initPaymentModal() {
  const modal = document.getElementById('paymentModal');
  const triggers = document.querySelectorAll('[data-bs-target="#paymentModal"], .payment-modal-trigger');
  const closeBtns = document.querySelectorAll('[data-bs-dismiss="modal"], .payment-modal-close');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  triggers.forEach(t => t.addEventListener('click', openModal));
  closeBtns.forEach(c => c.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* 5. ScrollSpy Active Nav Link */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-amber-400', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-amber-400', 'font-bold');
      }
    });
  });
}

/* 6. Back To Top */
function initBackToTop() {
  const btt = document.getElementById('back-to-top');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.remove('opacity-0', 'pointer-events-none');
      btt.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      btt.classList.add('opacity-0', 'pointer-events-none');
      btt.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
