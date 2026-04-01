/* =============================================
   स्वप्रातला कवी – COMPLETE JAVASCRIPT
   ============================================= */

/* ======= EMAILJS CONFIG =======
   TO MAKE FEEDBACK WORK:
   1. Go to https://emailjs.com → Sign Up FREE
   2. Add Gmail service → Get Service ID
   3. Create Email Template → Get Template ID
   4. Get your Public Key from Account > API Keys
   5. Replace the values below
   ================================ */
const EMAILJS_CONFIG = {
  serviceId: 'service_gx5tf6r',   // ← Replace with your EmailJS Service ID
  templateId: 'template_l7kyzgn',     // ← Replace with your EmailJS Template ID
  publicKey: '4ztPznKdiQgNIqgwE'  // ← Replace with your EmailJS Public Key
};

// ======= LOADER =======
window.addEventListener('load', () => {
  // Init EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }
  // Hide loader after animation
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('gone');
  }, 2100);
});

// ======= THEME =======
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

// ======= MOBILE MENU =======
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  if (!menu || !burger) return;
  menu.classList.toggle('open');
  burger.classList.toggle('open');
}
function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (burger) burger.classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  const navbar = document.querySelector('.navbar');
  if (menu && menu.classList.contains('open') && navbar && !navbar.contains(e.target)) {
    closeMenu();
  }
});

// ======= NAVBAR SCROLL =======
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = 'home';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nl').forEach(n => {
    const href = n.getAttribute('href');
    n.classList.toggle('active', href === '#' + current);
  });

  // Scroll top button
  const st = document.getElementById('scrollTop');
  if (st) st.classList.toggle('show', scrollY > 500);

  lastScrollY = scrollY;
}, { passive: true });

// ======= POEM FILTER =======
function filterCat(cat) {
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.poem-card').forEach(card => {
    if (cat === 'all') {
      card.classList.remove('hidden');
    } else {
      card.classList.toggle('hidden', card.dataset.cat !== cat);
    }
  });
}

// Filter buttons
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterCat(btn.dataset.cat);
  });
});

// ======= STAR RATING =======
let selectedRating = 5;
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.v);
    document.getElementById('fbRating').value = selectedRating;
    highlightStars(selectedRating);
  });
  star.addEventListener('mouseenter', () => highlightStars(parseInt(star.dataset.v)));
  star.addEventListener('mouseleave', () => highlightStars(selectedRating));
});

function highlightStars(n) {
  document.querySelectorAll('.star').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}
// Default 5 stars on load
document.addEventListener('DOMContentLoaded', () => highlightStars(5));

// ======= FEEDBACK FORM =======
const fbForm = document.getElementById('fbForm');
if (fbForm) {
  fbForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('fbName').value.trim();
    const email = document.getElementById('fbEmail').value.trim();
    const rating = document.getElementById('fbRating').value || selectedRating;
    const poem = document.getElementById('fbPoem').value;
    const message = document.getElementById('fbMessage').value.trim();
    const errorEl = document.getElementById('fbError');
    const submitBtn = document.getElementById('fbSubmitBtn');

    // Validate
    if (!name || !email || !message) {
      showError('❌ कृपया सर्व आवश्यक माहिती भरा.');
      return;
    }
    if (!isValidEmail(email)) {
      showError('❌ कृपया योग्य ईमेल पत्ता टाका.');
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> पाठवत आहे...';
    if (errorEl) errorEl.textContent = '';

    // Email template params
    const templateParams = {
      from_name: name,
      from_email: email,
      rating: rating + ' / 5 ⭐',
      favorite_poem: poem || 'निवडले नाही',
      message: message,
      to_email: 'abhishekingole81@gmail.com',
      reply_to: email,
      book_title: 'स्वप्रातला कवी',
      submission_date: new Date().toLocaleDateString('mr-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    };

    try {
      // Check if EmailJS is configured
      if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE' || typeof emailjs === 'undefined') {
        // DEMO MODE – show success without real email (for testing)
        console.log('📧 Feedback (EmailJS not configured yet):', templateParams);
        await simulateDelay(1500);
        showSuccess();
      } else {
        // REAL EMAIL SEND via EmailJS
        const result = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );
        console.log('Email sent successfully:', result.status);
        showSuccess();
      }
    } catch (error) {
      console.error('Email send failed:', error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> अभिप्राय पाठवा';
      showError('❌ काहीतरी चूक झाली. पुन्हा प्रयत्न करा किंवा थेट ईमेल करा: abhishekingole81@gmail.com');
    }
  });
}

function showSuccess() {
  const form = document.getElementById('fbForm');
  const success = document.getElementById('fbSuccess');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
}

function resetForm() {
  const form = document.getElementById('fbForm');
  const success = document.getElementById('fbSuccess');
  const submitBtn = document.getElementById('fbSubmitBtn');
  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (success) success.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> अभिप्राय पाठवा';
  }
  selectedRating = 5;
  highlightStars(5);
  document.getElementById('fbRating').value = 5;
}

function showError(msg) {
  const el = document.getElementById('fbError');
  if (el) {
    el.textContent = msg;
    setTimeout(() => { el.textContent = ''; }, 5000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ======= SMOOTH SCROLL for all anchor links =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Footer filter links
function filterCatFooter(cat) {
  document.querySelector('#poems').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => filterCat(cat), 400);
}
