// Инициализация AOS при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    function toggleMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Countdown Timer
    function updateTimer() {
        const endDate = new Date('May 9, 2025 23:59:59').getTime();
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            document.querySelector('.promo-float').style.display = 'none';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('modal-days').textContent = days.toString().padStart(2, '0');
        document.getElementById('modal-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('modal-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('modal-seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Update timer every second
    updateTimer();
    setInterval(updateTimer, 1000);

    // Modal functionality
    const promoButton = document.querySelector('.promo-float');
    const modal = document.getElementById('promo-modal');
    const closeBtn = document.querySelector('.modal-close');

    promoButton.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 