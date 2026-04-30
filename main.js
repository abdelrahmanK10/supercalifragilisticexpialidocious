(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const NUM_STARS = 200;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.15 + 0.04,
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  function initStars() {
    stars = Array.from({ length: NUM_STARS }, createStar);
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();

      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  drawStars();
})();


(function initLoader() {
  const screen = document.getElementById('loading-screen');
  const fill = document.getElementById('progress-fill');
  const pct = document.getElementById('progress-pct');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 7 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('hidden');
        setTimeout(triggerIntroAnimations, 300);
      }, 400);
    }
    fill.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';
  }, 80);
})();


const TEAM_NAME = 'Welcome To Our Presentation';

function triggerIntroAnimations() {
  document.querySelectorAll('#intro .reveal').forEach(el => el.classList.add('visible'));

  setTimeout(() => typeTeamName(), 600);
}

function typeTeamName() {
  const el = document.getElementById('typed-name');
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = TEAM_NAME.slice(0, ++i);
    if (i === TEAM_NAME.length) {
      clearInterval(interval);
      el.classList.add('done');
    }
  }, 90);
}


(function initDotNav() {
  const nav = document.getElementById('dot-nav');
  const sections = document.querySelectorAll('[data-nav-label]');

  sections.forEach((sec, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot-nav-item';
    btn.title = sec.dataset.navLabel;
    btn.setAttribute('aria-label', 'Go to ' + sec.dataset.navLabel);
    btn.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth' }));
    nav.appendChild(btn);
  });

  const dots = nav.querySelectorAll('.dot-nav-item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(sections).indexOf(entry.target);
        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => io.observe(sec));
})();





(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => {
    if (!el.closest('#intro')) {
      io.observe(el);
    }
  });
})();

// تحديد جميع السكاشن في الصفحة
const sections = document.querySelectorAll('section');
let currentSectionIndex = 0;

window.addEventListener('click', (event) => {
  // التأكد أن الجهاز ليس هاتفاً (بناءً على عرض الشاشة أو نظام التشغيل)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

  if (!isMobile) {
    // منع السلوك الافتراضي إذا لزم الأمر
    event.preventDefault();

    // الانتقال للسيكشن التالي
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      sections[currentSectionIndex].scrollIntoView({
        behavior: 'smooth'
      });
    } 
  }
});