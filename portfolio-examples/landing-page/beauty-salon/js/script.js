// Beauty Salon JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const galleryImages = Array.from(galleryItems);
    
    // Open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            const img = item.querySelector('img');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigation
    modalPrev.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage();
    });
    
    modalNext.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateModalImage();
    });
    
    function updateModalImage() {
        const img = galleryImages[currentImageIndex].querySelector('img');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                modalPrev.click();
                break;
            case 'ArrowRight':
                modalNext.click();
                break;
        }
    });
    
    // Form validation and submission
    const contactForm = document.querySelector('.modern-form');
    
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
    
    // Smooth scrolling for navigation links
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
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.beauty-header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .master-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add styles for new elements
    const style = document.createElement('style');
    style.textContent = `
        .beauty-header {
            transition: transform 0.3s ease;
        }
        
        .form-notification {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: #10B981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }
        
        .service-card,
        .master-card,
        .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate,
        .master-card.animate,
        .gallery-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
            }
            e.target.value = value;
        });
    }
    
    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Master card social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your social media links here
            console.log('Social link clicked:', this.href);
        });
    });
    
    // Initialize tooltips or additional features
    console.log('Beauty Salon website loaded successfully!');
}); 