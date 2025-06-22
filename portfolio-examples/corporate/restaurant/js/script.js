// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sticky header
const header = document.querySelector('.restaurant-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Menu items animation
const menuItems = document.querySelectorAll('.menu-item');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            menuObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

menuItems.forEach(item => {
    menuObserver.observe(item);
});

// Gallery modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'gallery-modal';
modal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img src="" alt="">
        <button class="modal-nav modal-prev">&lt;</button>
        <button class="modal-nav modal-next">&gt;</button>
    </div>
`;

document.body.appendChild(modal);

let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        updateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.querySelector('.modal-prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModal();
});

modal.querySelector('.modal-next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateModal();
});

function updateModal() {
    const img = galleryItems[currentImageIndex].querySelector('img');
    modal.querySelector('img').src = img.src;
    modal.querySelector('img').alt = img.alt;
}

// Form validation and submission
const contactForm = document.querySelector('.contact__form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const formData = new FormData(contactForm);
    let isValid = true;
    let firstInvalidInput = null;
    
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('invalid');
            if (!firstInvalidInput) firstInvalidInput = input;
        } else {
            input.classList.remove('invalid');
        }
    });
    
    if (!isValid) {
        firstInvalidInput.focus();
        return;
    }
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'form-notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.
    `;
    
    contactForm.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Reset form
    contactForm.reset();
});

// Add styles for new elements
const style = document.createElement('style');
style.textContent = `
    .restaurant-header {
        transition: transform 0.3s ease;
    }
    
    .restaurant-header.scroll-down {
        transform: translateY(-100%);
    }
    
    .restaurant-header.scroll-up {
        transform: translateY(0);
    }
    
    .menu-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .menu-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .gallery-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        padding: 2rem;
    }
    
    .gallery-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .modal-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .modal-nav:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .modal-prev {
        left: -60px;
    }
    
    .modal-next {
        right: -60px;
    }
    
    .form-notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: #10B981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }
    
    .form-notification i {
        font-size: 1.2rem;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .invalid {
        border-color: #EF4444 !important;
    }
    
    .invalid:focus {
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
    }
`;

document.head.appendChild(style); 