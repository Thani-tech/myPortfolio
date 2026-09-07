// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Hero rotating word
const words = ['work', 'convert', 'perform', 'load fast', 'get built'];
let wordIndex = 0;
const rotatingWordEl = document.getElementById('rotatingWord');
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  rotatingWordEl.style.opacity = 0;
  setTimeout(() => {
    rotatingWordEl.textContent = words[wordIndex];
    rotatingWordEl.style.opacity = 1;
  }, 250);
}, 2200);

rotatingWordEl.style.transition = 'opacity 0.25s ease';

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fade-in sections on scroll
const fadeSections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeSections.forEach(section => observer.observe(section));

// Expandable project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  const toggle = () => {
    card.classList.toggle('expanded');
    const label = card.querySelector('.project-toggle');
    label.textContent = card.classList.contains('expanded') ? '− Less detail' : '+ More detail';
  };

  card.addEventListener('click', toggle);
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') toggle();
  });
});
// Dark mode: system preference + manual toggle + persistence

function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
}

// 1. Determine initial theme
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  applyTheme(true);
} else if (savedTheme === 'light') {
  applyTheme(false);
} else {
  // No manual choice saved yet — follow system preference
  applyTheme(prefersDark.matches);
}

// 2. Manual toggle overrides system preference and gets remembered
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(!isDark);
  localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

// 3. If user hasn't manually chosen, keep following system changes live
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches);
  }
});


