document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after selecting an item
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in and slide-in animations
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-btn');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show booking confirmation modal
        bookingModal.style.display = 'block';
        
        // Reset form
        bookingForm.reset();
    });

    // Close Modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // Responsive Image Lazy Loading
    const images = document.querySelectorAll('img');
    const lazyLoadOptions = {
        root: null,
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, lazyLoadOptions);

    images.forEach(img => {
        if (img.dataset.src) {
            lazyLoadObserver.observe(img);
        }
    });
});

// Error Handling for Form Validation
function validateForm() {
    const name = document.querySelector('input[type="text"]');
    const email = document.querySelector('input[type="email"]');
    const phone = document.querySelector('input[type="tel"]');
    const sessionType = document.querySelector('select');
    const date = document.querySelector('input[type="date"]');

    let isValid = true;

    // Name validation
    if (name.value.trim().length < 2) {
        isValid = false;
        name.classList.add('error');
    } else {
        name.classList.remove('error');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        isValid = false;
        email.classList.add('error');
    } else {
        email.classList.remove('error');
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value.replace(/\s+/g, ''))) {
        isValid = false;
        phone.classList.add('error');
    } else {
        phone.classList.remove('error');
    }

    // Session type validation
    if (sessionType.value === "") {
        isValid = false;
        sessionType.classList.add('error');
    } else {
        sessionType.classList.remove('error');
    }

    // Date validation
    if (!date.value) {
        isValid = false;
        date.classList.add('error');
    } else {
        date.classList.remove('error');
    }

    return isValid;
}