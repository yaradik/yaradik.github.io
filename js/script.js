// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// DOM Elements
const elements = {
    navToggle: document.getElementById('nav-toggle'),
    headerNav: document.querySelector('.header__nav'),
    header: document.querySelector('.header.sticky'),
    filterButtons: document.querySelectorAll('.portfolio-filters .btn-filter'),
    portfolioItems: document.querySelectorAll('.portfolio-gallery .portfolio-item')
};

// Navigation
const initNavigation = () => {
    if (!elements.navToggle || !elements.headerNav) return;

    const toggleMenu = () => {
        elements.headerNav.classList.toggle('active');
        elements.navToggle.classList.toggle('active');
        const isExpanded = elements.navToggle.getAttribute('aria-expanded') === 'true' || false;
        elements.navToggle.setAttribute('aria-expanded', !isExpanded);
    };

    elements.navToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    elements.headerNav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
            if (elements.headerNav.classList.contains('active')) {
                toggleMenu();
                }
            });
        });
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                });
                }
            }
        });
    });
};

    // Portfolio Filter
const initPortfolioFilter = () => {
    if (!elements.filterButtons.length || !elements.portfolioItems.length) return;

    elements.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
            // Update active state
            elements.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

            // Filter items with animation
            elements.portfolioItems.forEach(item => {
                item.classList.add('hidden');
                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                        }
                }, 50);
            });
        });
    });
};

// Sticky Header
const initStickyHeader = () => {
    if (!elements.header) return;

    const handleScroll = debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        elements.header.classList.toggle('scrolled', scrollTop > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    try {
        initNavigation();
        initSmoothScroll();
        initPortfolioFilter();
        initStickyHeader();
    } catch (error) {
        console.error('Error initializing features:', error);
    }
});
