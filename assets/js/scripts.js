// scripts.js - JavaScript for Block Breaker Landing Page

// Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav || !menuToggle) return;
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        e.preventDefault();
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = menuToggle ? menuToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.download-card');
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}
revealElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal, { passive: true });

// Add touch scrolling for reviews on mobile
const reviewsSlider = document.querySelector('.reviews-slider');
let isDown = false;
let startX;
let scrollLeft;
if (reviewsSlider) {
    reviewsSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsSlider.classList.add('active');
        startX = e.pageX - reviewsSlider.offsetLeft;
        scrollLeft = reviewsSlider.scrollLeft;
    });
    reviewsSlider.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsSlider.classList.remove('active');
    });
    reviewsSlider.addEventListener('mouseup', () => {
        isDown = false;
        reviewsSlider.classList.remove('active');
    });
    reviewsSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsSlider.scrollLeft = scrollLeft - walk;
    });
    // Touch events for mobile
    reviewsSlider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - reviewsSlider.offsetLeft;
        scrollLeft = reviewsSlider.scrollLeft;
    });
    reviewsSlider.addEventListener('touchend', () => {
        isDown = false;
    });
    reviewsSlider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - reviewsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsSlider.scrollLeft = scrollLeft - walk;
    }, { passive: true });
}

// Download button click tracking
const downloadButtons = document.querySelectorAll('.btn-primary, .btn-outline, .btn-light');
downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
        const href = (this instanceof HTMLAnchorElement) ? this.href : '';
        if (href && (href.includes('.apk') || href.includes('.ipa'))) {
            console.log('Download initiated:', href);
        }
    });
});

// Page load animation
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        if (heroContent) heroContent.style.opacity = '1';
        if (heroImage) heroImage.style.opacity = '1';
    }, 250);
});

// Add initial opacity styles for hero elements
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transition = 'opacity 1s ease';
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transition = 'opacity 1s ease';
    }
});