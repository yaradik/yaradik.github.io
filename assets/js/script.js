// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile Menu
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').prepend(mobileMenuButton);

const navMenu = document.querySelector('nav ul');
mobileMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuButton.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    
    const whatsappMessage = `Новая заявка:%0AИмя: ${name}%0AТелефон: ${phone}`;
    const whatsappUrl = `https://wa.me/77081538703?text=${whatsappMessage}`;
    
    // Открываем WhatsApp напрямую
    window.open(whatsappUrl, '_blank');
    
    // Очищаем форму и показываем сообщение
    this.reset();
    alert('Спасибо за заявку! Мы скоро свяжемся с вами.');
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-overlay').style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-overlay').style.transform = 'translateY(100%)';
    });
});

// Анимация цен
function animatePrice(element) {
    const priceSpan = element.querySelector('.price-number');
    const finalPrice = parseInt(priceSpan.textContent.replace(/\s/g, ''));
    let currentPrice = 0;
    const duration = 2000; // 2 секунды
    const interval = 20; // обновление каждые 20мс
    const steps = duration / interval;
    const increment = finalPrice / steps;

    const timer = setInterval(() => {
        currentPrice += increment;
        if (currentPrice >= finalPrice) {
            currentPrice = finalPrice;
            clearInterval(timer);
        }
        priceSpan.textContent = Math.round(currentPrice).toLocaleString('ru-RU');
    }, interval);
}

// Запуск анимации цен при появлении в поле зрения
const priceCards = document.querySelectorAll('.price-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePrice(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

priceCards.forEach(card => observer.observe(card)); 