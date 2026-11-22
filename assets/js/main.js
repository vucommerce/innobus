/**
 * INNOBUS 2027
 * Department of Commerce, Vidyasagar University
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCarouselControls();
  initMobileMenu();
  initCopyButtons();
  initScrollSpy();
  initPaymentModal();
  initBackToTop();
});

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
