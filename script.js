/**
 * PORTOFOLIO WEBSITE - Septian Fakhrul Hikam
 * JavaScript for animations and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        // Trigger hero animations after loading
        setTimeout(() => {
            document.querySelectorAll('.fade-in-up, .fade-in-right').forEach(el => {
                el.classList.add('visible');
            });
        }, 300);
    }, 1500);

    // Create floating particles
    createParticles();

    // Typing effect
    typeWriter();

    // Navbar scroll effect
    initNavbar();

    // Mobile menu toggle
    initMobileMenu();

    // Smooth scroll for navigation links
    initSmoothScroll();

    // Scroll reveal animations
    initScrollReveal();

    // Tab functionality for Penugasan section
    initTabs();

    // Progress bar animation
    initProgressBars();

    // Contact form submission
    initContactForm();

    // Active navigation link on scroll
    initActiveNavOnScroll();
});

// ========================================
// FLOATING PARTICLES
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = Math.random() * 15 + 5 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ========================================
// TYPING EFFECT
// ========================================
function typeWriter() {
    const text = "Mahasiswa Teknik Komputer";
    const typingElement = document.querySelector('.typing-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            // Pause then restart
            setTimeout(() => {
                typingElement.textContent = '';
                i = 0;
                type();
            }, 3000);
        }
    }

    // Start typing after loading
    setTimeout(type, 2000);
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

// ========================================
// TABS FUNCTIONALITY
// ========================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ========================================
// PROGRESS BAR ANIMATION
// ========================================
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barTop < windowHeight - 100) {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress', progress + '%');
                bar.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Check on load
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        showToast('Pesan berhasil dikirim! Terima kasih.');
        form.reset();
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// LIGHTBOX FUNCTIONS
// ========================================
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const img = element.querySelector('img');

    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close lightbox on clicking outside image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closePDF();
    }
});

// ========================================
// PDF VIEWER FUNCTIONS
// ========================================
function viewPDF() {
    const modal = document.getElementById('pdfModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on clicking outside
document.getElementById('pdfModal').addEventListener('click', (e) => {
    if (e.target.id === 'pdfModal') {
        closePDF();
    }
});

// ========================================
// SCROLL TO TOP BUTTON (Optional)
// ========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ========================================
// COUNTER ANIMATION (Optional for stats)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// ========================================
// HOVER EFFECTS ENHANCEMENT
// ========================================
document.querySelectorAll('.skill-card, .portofolio-card, .kontak-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👋 Halo! ', 'font-size: 24px; font-weight: bold; color: #3182ce;');
console.log('%cSelamat datang di portofolio saya!', 'font-size: 16px; color: #1a365d;');
console.log('%cDibuat dengan ❤️ oleh Septian Fakhrul Hikam', 'font-size: 14px; color: #4a5568;');
