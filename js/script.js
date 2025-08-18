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
    portfolioItems: document.querySelectorAll('.portfolio-gallery .portfolio-item'),
    tabs: document.querySelectorAll('.tabs .tab'),
    tabPanels: document.querySelectorAll('.tab-panels .tab-panel')
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

// Portfolio Tabs
const initPortfolioTabs = () => {
    const tabsContainer = document.querySelector('.tabs');
    const tabPanels = document.querySelectorAll('.tab-panels .tab-panel');
    if (!tabsContainer || !tabPanels.length) return;

    const setActiveTab = (targetName) => {
        // Toggle active state on buttons
        tabsContainer.querySelectorAll('.tab').forEach(btn => {
            const isActive = btn.getAttribute('data-tab') === targetName;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', String(isActive));
            btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        // Toggle panels
        tabPanels.forEach(panel => {
            const id = panel.id.replace('tab-', '');
            if (id === targetName) {
                panel.removeAttribute('hidden');
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.setAttribute('hidden', '');
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Event delegation
    tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab');
        if (!btn) return;
        e.preventDefault();
        const target = btn.getAttribute('data-tab');
        if (!target) return;
        setActiveTab(target);
    });

    // Sync with URL hash (supports direct links and back/forward)
    const applyHash = () => {
        const hash = window.location.hash || '';
        if (hash.startsWith('#tab-')) {
            const name = hash.replace('#tab-', '');
            const exists = document.getElementById(`tab-${name}`);
            if (exists) setActiveTab(name);
        }
    };
    window.addEventListener('hashchange', applyHash);

    // Prevent double init
    if (tabsContainer.dataset.inited === '1') return;
    tabsContainer.dataset.inited = '1';

    // Init ARIA
    tabsContainer.setAttribute('role', 'tablist');
    tabsContainer.querySelectorAll('.tab').forEach((btn, idx) => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        btn.setAttribute('tabindex', idx === 0 ? '0' : '-1');
    });
    tabPanels.forEach((panel, idx) => {
        panel.setAttribute('role', 'tabpanel');
        if (idx !== 0) panel.setAttribute('hidden', '');
    });

    // Ensure initial activation reflects current active button (or first)
    const initiallyActiveBtn = tabsContainer.querySelector('.tab.active') || tabsContainer.querySelector('.tab');
    if (initiallyActiveBtn) setActiveTab(initiallyActiveBtn.getAttribute('data-tab'));
    applyHash();
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
        initPortfolioTabs();

        "use strict";

        // Optional hooks (guarded)
        if (typeof scrollTop === 'function') {
            window.addEventListener('load', scrollTop);
            document.addEventListener('scroll', scrollTop);
        }
        if (typeof aos_init === 'function') {
            window.addEventListener('load', aos_init);
            window.addEventListener('scroll', aos_init);
        }
        if (typeof PureCounter !== 'undefined') {
            try { new PureCounter(); } catch (_) { /* noop */ }
        }

        // Рандомные звезды для отзывов
        const reviewStars = document.querySelectorAll('.review-card__stars');
        reviewStars.forEach(function(starsEl) {
            const rating = Math.random() < 0.5 ? 4 : 5;
            starsEl.textContent = '★★★★★'.slice(0, rating) + (rating === 4 ? '☆' : '');
        });

        // Каскадная анимация появления
        const reviewCards = document.querySelectorAll('.review-card.fade-in');
        reviewCards.forEach(function(card, i) {
            card.style.setProperty('--delay', i);
            setTimeout(() => {
                card.classList.add('visible');
                card.style.opacity = 1;
                card.style.transform = 'none';
            }, 100 + i * 120);
        });
    } catch (error) {
        console.error('Error initializing features:', error);
    }

    /**
     * Hero type effect
     */
    const typed = document.querySelector('.typed');
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }
});
