/**
 * PORTOFOLIO VIRA MAHDALENA - SCRIPT
 * Interactive features, Lightbox, Nav scroll & Clipboard helper
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Section Tracker
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Tracking
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // 2. Interactive Lightbox Modal
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const openLightbox = (src, caption = '') => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Attach Lightbox triggers to gallery items & certificate cards
  document.querySelectorAll('.gallery-item, .cert-img-wrap, .cert-btn-view').forEach(item => {
    item.addEventListener('click', (e) => {
      let targetImg = null;
      let caption = '';

      if (item.classList.contains('gallery-item')) {
        targetImg = item.querySelector('img');
        caption = targetImg ? targetImg.alt : '';
      } else if (item.classList.contains('cert-img-wrap')) {
        targetImg = item.querySelector('img');
        const parentCard = item.closest('.cert-card');
        const titleEl = parentCard ? parentCard.querySelector('.cert-title') : null;
        caption = titleEl ? titleEl.textContent : (targetImg ? targetImg.alt : '');
      } else if (item.classList.contains('cert-btn-view')) {
        const parentCard = item.closest('.cert-card');
        targetImg = parentCard ? parentCard.querySelector('.cert-img-wrap img') : null;
        const titleEl = parentCard ? parentCard.querySelector('.cert-title') : null;
        caption = titleEl ? titleEl.textContent : '';
      }

      if (targetImg && targetImg.src) {
        openLightbox(targetImg.src, caption);
      }
    });
  });

  // 3. Toast Notifications & Copy to Clipboard
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  window.showToast = (msg) => {
    if (!toast) return;
    if (toastText) toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  window.copyText = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(`${label} berhasil disalin: ${text}`);
    }).catch(() => {
      window.showToast(`Berhasil: ${text}`);
    });
  };

  // 4. Subtle entrance reveal animations
  const revealElements = document.querySelectorAll('.about-card, .edu-card, .skill-card, .tools-banner, .exp-desc-card, .gallery-item, .cert-card, .contact-card-main');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
});

