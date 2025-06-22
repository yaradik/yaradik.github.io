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
const header = document.querySelector('.demo-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form validation and submission
const contactForm = document.querySelector('.contact__form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        
        if (!name || !phone || !doctor || !date) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Phone number validation
        const phoneRegex = /^\+?[0-9]{10,12}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            alert('Пожалуйста, введите корректный номер телефона');
            return;
        }
        
        // Date validation
        const selectedDate = new Date(date);
        const today = new Date();
        if (selectedDate < today) {
            alert('Пожалуйста, выберите будущую дату');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        
        // Simulate API call
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }, 2000);
        }, 1500);
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .doctor-card, .price-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.service-card, .doctor-card, .price-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const createMobileMenu = () => {
    const header = document.querySelector('.demo-header');
    const nav = document.querySelector('.demo-nav');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.innerHTML = nav.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
            
            header.querySelector('.header__content').insertBefore(toggle, nav);
        }
    } else {
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (toggle) {
            toggle.remove();
            nav.classList.remove('active');
        }
    }
};

window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add styles for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .demo-nav {
            display: none;
            width: 100%;
        }
        
        .demo-nav.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// Добавляем функционал для отзывов
const createTestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Анна Петрова',
            position: 'Пациент',
            text: 'Очень довольна обслуживанием в медицинском центре. Врачи внимательные, оборудование современное. Спасибо за профессионализм!',
            rating: 5,
            date: '15.03.2024'
        },
        {
            name: 'Иван Смирнов',
            position: 'Пациент',
            text: 'Быстрое обслуживание, квалифицированные специалисты. Особенно хочу отметить работу кардиолога.',
            rating: 5,
            date: '10.03.2024'
        },
        {
            name: 'Мария Иванова',
            position: 'Пациент',
            text: 'Отличный медицинский центр. Всегда чисто, уютно, персонал вежливый. Рекомендую!',
            rating: 4,
            date: '05.03.2024'
        }
    ];

    const testimonialsSection = document.createElement('section');
    testimonialsSection.id = 'testimonials';
    testimonialsSection.className = 'demo-section';
    testimonialsSection.style.backgroundColor = 'var(--background-light)';

    testimonialsSection.innerHTML = `
        <div class="container">
            <h2>Отзывы пациентов</h2>
            <p class="section-description">Что говорят о нас наши пациенты</p>
            <div class="testimonials__grid">
                ${testimonials.map(testimonial => `
                    <div class="testimonial-card">
                        <div class="testimonial-card__header">
                            <div class="testimonial-card__rating">
                                ${Array(testimonial.rating).fill('★').join('')}
                                ${Array(5 - testimonial.rating).fill('☆').join('')}
                            </div>
                            <div class="testimonial-card__date">${testimonial.date}</div>
                        </div>
                        <p class="testimonial-card__text">${testimonial.text}</p>
                        <div class="testimonial-card__author">
                            <div class="testimonial-card__avatar">
                                <i class="fas fa-user-circle"></i>
                            </div>
                            <div class="testimonial-card__info">
                                <h4>${testimonial.name}</h4>
                                <p>${testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="testimonials__actions">
                <button class="btn-medical btn-medical--outline" id="addTestimonial">
                    <i class="fas fa-plus"></i>
                    Оставить отзыв
                </button>
            </div>
        </div>
    `;

    // Добавляем секцию перед контактами
    const contactSection = document.querySelector('#contact');
    contactSection.parentNode.insertBefore(testimonialsSection, contactSection);

    // Добавляем стили для отзывов
    const testimonialsStyle = document.createElement('style');
    testimonialsStyle.textContent = `
        .testimonials__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .testimonial-card {
            background: var(--white);
            border-radius: 8px;
            padding: 2rem;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .testimonial-card__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .testimonial-card__rating {
            color: #F59E0B;
            font-size: 1.25rem;
        }

        .testimonial-card__date {
            color: var(--light-text);
            font-size: 0.875rem;
        }

        .testimonial-card__text {
            color: var(--text-color);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .testimonial-card__author {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .testimonial-card__avatar {
            width: 50px;
            height: 50px;
            background: var(--background-light);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-color);
            font-size: 1.5rem;
        }

        .testimonial-card__info h4 {
            margin: 0;
            font-size: 1rem;
        }

        .testimonial-card__info p {
            margin: 0;
            color: var(--light-text);
            font-size: 0.875rem;
        }

        .testimonials__actions {
            text-align: center;
            margin-top: 3rem;
        }
    `;
    document.head.appendChild(testimonialsStyle);

    // Добавляем обработчик для кнопки "Оставить отзыв"
    const addTestimonialBtn = document.getElementById('addTestimonial');
    addTestimonialBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal__content">
                <button class="modal__close">&times;</button>
                <h3>Оставить отзыв</h3>
                <form id="testimonialForm">
                    <div class="form-group">
                        <label for="testimonialName">Ваше имя</label>
                        <input type="text" id="testimonialName" required>
                    </div>
                    <div class="form-group">
                        <label for="testimonialRating">Оценка</label>
                        <div class="rating-select">
                            ${Array(5).fill(0).map((_, i) => `
                                <span class="rating-star" data-rating="${i + 1}">☆</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="testimonialText">Ваш отзыв</label>
                        <textarea id="testimonialText" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn-medical">
                        <i class="fas fa-paper-plane"></i>
                        Отправить отзыв
                    </button>
                </form>
            </div>
        `;

        // Добавляем стили для модального окна
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }

            .modal__content {
                background: var(--white);
                padding: 2rem;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                position: relative;
            }

            .modal__close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--light-text);
            }

            .rating-select {
                display: flex;
                gap: 0.5rem;
                font-size: 1.5rem;
                color: #F59E0B;
            }

            .rating-star {
                cursor: pointer;
                transition: var(--transition);
            }

            .rating-star:hover,
            .rating-star.active {
                color: #F59E0B;
            }
        `;
        document.head.appendChild(modalStyle);

        document.body.appendChild(modal);

        // Обработчики для модального окна
        const closeBtn = modal.querySelector('.modal__close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Обработчик для звезд рейтинга
        const stars = modal.querySelectorAll('.rating-star');
        let selectedRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                selectedRating = rating;
                stars.forEach((s, i) => {
                    s.textContent = i < rating ? '★' : '☆';
                    s.classList.toggle('active', i < rating);
                });
            });

            star.addEventListener('mouseover', () => {
                const rating = parseInt(star.dataset.rating);
                stars.forEach((s, i) => {
                    s.textContent = i < rating ? '★' : '☆';
                });
            });

            star.addEventListener('mouseout', () => {
                stars.forEach((s, i) => {
                    s.textContent = i < selectedRating ? '★' : '☆';
                });
            });
        });

        // Обработчик отправки формы
        const form = modal.querySelector('#testimonialForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('testimonialName').value;
            const text = document.getElementById('testimonialText').value;
            
            if (!selectedRating) {
                alert('Пожалуйста, выберите оценку');
                return;
            }

            // Создаем новый отзыв
            const newTestimonial = {
                name,
                position: 'Пациент',
                text,
                rating: selectedRating,
                date: new Date().toLocaleDateString('ru-RU')
            };

            // Добавляем отзыв в начало списка
            const testimonialsGrid = document.querySelector('.testimonials__grid');
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <div class="testimonial-card__header">
                    <div class="testimonial-card__rating">
                        ${Array(newTestimonial.rating).fill('★').join('')}
                        ${Array(5 - newTestimonial.rating).fill('☆').join('')}
                    </div>
                    <div class="testimonial-card__date">${newTestimonial.date}</div>
                </div>
                <p class="testimonial-card__text">${newTestimonial.text}</p>
                <div class="testimonial-card__author">
                    <div class="testimonial-card__avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="testimonial-card__info">
                        <h4>${newTestimonial.name}</h4>
                        <p>${newTestimonial.position}</p>
                    </div>
                </div>
            `;

            testimonialsGrid.insertBefore(testimonialCard, testimonialsGrid.firstChild);
            modal.remove();

            // Показываем уведомление об успешной отправке
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Спасибо за ваш отзыв!
            `;

            const notificationStyle = document.createElement('style');
            notificationStyle.textContent = `
                .notification {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: var(--primary-color);
                    color: var(--white);
                    padding: 1rem 2rem;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: slideIn 0.3s ease-out forwards;
                    z-index: 1000;
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
            `;
            document.head.appendChild(notificationStyle);
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        });
    });
};

// Добавляем функционал для FAQ
const createFAQSection = () => {
    const faqs = [
        {
            question: 'Как записаться на прием?',
            answer: 'Вы можете записаться на прием через форму на сайте, по телефону или лично в медицинском центре. Мы работаем ежедневно с 8:00 до 20:00.'
        },
        {
            question: 'Какие документы нужны для первичного приема?',
            answer: 'Для первичного приема необходимо иметь при себе паспорт и полис ОМС (если есть). Если у вас есть результаты предыдущих обследований, возьмите их с собой.'
        },
        {
            question: 'Работаете ли вы по страховым полисам?',
            answer: 'Да, мы работаем с большинством страховых компаний. Пожалуйста, уточните у вашей страховой компании о возможности обслуживания в нашем медицинском центре.'
        },
        {
            question: 'Есть ли у вас парковка?',
            answer: 'Да, у нас есть бесплатная парковка для пациентов. Она находится на территории медицинского центра.'
        }
    ];

    const faqSection = document.createElement('section');
    faqSection.id = 'faq';
    faqSection.className = 'demo-section';
    faqSection.innerHTML = `
        <div class="container">
            <h2>Часто задаваемые вопросы</h2>
            <p class="section-description">Ответы на популярные вопросы о нашем медицинском центре</p>
            <div class="faq__grid">
                ${faqs.map(faq => `
                    <div class="faq-item">
                        <div class="faq-item__question">
                            <h3>${faq.question}</h3>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="faq-item__answer">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Добавляем секцию перед отзывами
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
        testimonialsSection.parentNode.insertBefore(faqSection, testimonialsSection);
    } else {
        const contactSection = document.querySelector('#contact');
        contactSection.parentNode.insertBefore(faqSection, contactSection);
    }

    // Добавляем стили для FAQ
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
        .faq__grid {
            max-width: 800px;
            margin: 3rem auto 0;
        }

        .faq-item {
            background: var(--white);
            border-radius: 8px;
            margin-bottom: 1rem;
            box-shadow: var(--shadow);
            overflow: hidden;
        }

        .faq-item__question {
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: var(--transition);
        }

        .faq-item__question:hover {
            background: var(--background-light);
        }

        .faq-item__question h3 {
            margin: 0;
            font-size: 1.1rem;
            color: var(--text-color);
        }

        .faq-item__question i {
            color: var(--primary-color);
            transition: var(--transition);
        }

        .faq-item.active .faq-item__question i {
            transform: rotate(180deg);
        }

        .faq-item__answer {
            padding: 0 1.5rem;
            max-height: 0;
            overflow: hidden;
            transition: var(--transition);
        }

        .faq-item.active .faq-item__answer {
            padding: 0 1.5rem 1.5rem;
            max-height: 500px;
        }

        .faq-item__answer p {
            margin: 0;
            color: var(--light-text);
        }
    `;
    document.head.appendChild(faqStyle);

    // Добавляем обработчики для FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все остальные вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Переключаем текущий вопрос
            item.classList.toggle('active');
        });
    });
};

// Добавляем функционал расписания врачей
const createScheduleSection = () => {
    const doctors = [
        {
            id: 1,
            name: 'Иванов Иван Иванович',
            specialization: 'Главный врач',
            schedule: [
                { day: 'Понедельник', time: '9:00 - 17:00' },
                { day: 'Вторник', time: '9:00 - 17:00' },
                { day: 'Среда', time: '9:00 - 17:00' },
                { day: 'Четверг', time: '9:00 - 17:00' },
                { day: 'Пятница', time: '9:00 - 17:00' }
            ]
        },
        {
            id: 2,
            name: 'Петрова Анна Сергеевна',
            specialization: 'Кардиолог',
            schedule: [
                { day: 'Понедельник', time: '10:00 - 18:00' },
                { day: 'Вторник', time: '10:00 - 18:00' },
                { day: 'Среда', time: 'Выходной' },
                { day: 'Четверг', time: '10:00 - 18:00' },
                { day: 'Пятница', time: '10:00 - 18:00' }
            ]
        },
        {
            id: 3,
            name: 'Сидоров Петр Николаевич',
            specialization: 'Невролог',
            schedule: [
                { day: 'Понедельник', time: '8:00 - 16:00' },
                { day: 'Вторник', time: '8:00 - 16:00' },
                { day: 'Среда', time: '8:00 - 16:00' },
                { day: 'Четверг', time: 'Выходной' },
                { day: 'Пятница', time: '8:00 - 16:00' }
            ]
        }
    ];

    const scheduleSection = document.createElement('section');
    scheduleSection.id = 'schedule';
    scheduleSection.className = 'demo-section';
    scheduleSection.style.backgroundColor = 'var(--background-light)';
    scheduleSection.innerHTML = `
        <div class="container">
            <h2>Расписание врачей</h2>
            <p class="section-description">Выберите удобное время для записи к специалисту</p>
            <div class="schedule__grid">
                ${doctors.map(doctor => `
                    <div class="schedule-card">
                        <div class="schedule-card__header">
                            <h3>${doctor.name}</h3>
                            <p class="schedule-card__specialization">${doctor.specialization}</p>
                        </div>
                        <div class="schedule-card__content">
                            <div class="schedule-card__tabs">
                                ${doctor.schedule.map((day, index) => `
                                    <button class="schedule-card__tab ${index === 0 ? 'active' : ''}" 
                                            data-day="${day.day}">
                                        ${day.day}
                                    </button>
                                `).join('')}
                            </div>
                            <div class="schedule-card__schedule">
                                ${doctor.schedule.map((day, index) => `
                                    <div class="schedule-card__day ${index === 0 ? 'active' : ''}" 
                                         data-day="${day.day}">
                                        <div class="schedule-card__time">
                                            <i class="fas fa-clock"></i>
                                            <span>${day.time}</span>
                                        </div>
                                        ${day.time !== 'Выходной' ? `
                                            <button class="btn-medical btn-medical--small schedule-card__book">
                                                <i class="fas fa-calendar-plus"></i>
                                                Записаться
                                            </button>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Добавляем секцию после услуг
    const servicesSection = document.querySelector('#services');
    servicesSection.parentNode.insertBefore(scheduleSection, servicesSection.nextSibling);

    // Добавляем стили для расписания
    const scheduleStyle = document.createElement('style');
    scheduleStyle.textContent = `
        .schedule__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .schedule-card {
            background: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .schedule-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .schedule-card__header {
            padding: 1.5rem;
            background: var(--primary-color);
            color: var(--white);
        }

        .schedule-card__header h3 {
            margin: 0;
            font-size: 1.25rem;
        }

        .schedule-card__specialization {
            margin: 0.5rem 0 0;
            opacity: 0.9;
        }

        .schedule-card__content {
            padding: 1.5rem;
        }

        .schedule-card__tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
        }

        .schedule-card__tab {
            background: none;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            white-space: nowrap;
            transition: var(--transition);
            color: var(--light-text);
        }

        .schedule-card__tab:hover {
            background: var(--background-light);
            color: var(--text-color);
        }

        .schedule-card__tab.active {
            background: var(--primary-color);
            color: var(--white);
        }

        .schedule-card__day {
            display: none;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            background: var(--background-light);
            border-radius: 4px;
        }

        .schedule-card__day.active {
            display: flex;
        }

        .schedule-card__time {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-color);
        }

        .schedule-card__time i {
            color: var(--primary-color);
        }

        .schedule-card__book {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }

        @media (max-width: 768px) {
            .schedule-card__day {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(scheduleStyle);

    // Добавляем обработчики для расписания
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        const tabs = card.querySelectorAll('.schedule-card__tab');
        const days = card.querySelectorAll('.schedule-card__day');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const day = tab.dataset.day;
                
                // Обновляем активные табы
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Обновляем активные дни
                days.forEach(d => {
                    d.classList.toggle('active', d.dataset.day === day);
                });
            });
        });

        // Обработчики для кнопок записи
        const bookButtons = card.querySelectorAll('.schedule-card__book');
        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                const doctorName = card.querySelector('h3').textContent;
                const day = card.querySelector('.schedule-card__tab.active').textContent;
                const time = card.querySelector('.schedule-card__day.active .schedule-card__time span').textContent;

                // Создаем модальное окно для выбора времени
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal__content">
                        <button class="modal__close">&times;</button>
                        <h3>Запись к врачу</h3>
                        <p class="modal__info">
                            <strong>Врач:</strong> ${doctorName}<br>
                            <strong>День:</strong> ${day}<br>
                            <strong>Время приема:</strong> ${time}
                        </p>
                        <form id="bookingForm">
                            <div class="form-group">
                                <label for="bookingName">Ваше имя</label>
                                <input type="text" id="bookingName" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingPhone">Ваш телефон</label>
                                <input type="tel" id="bookingPhone" required>
                            </div>
                            <div class="form-group">
                                <label for="bookingTime">Выберите время</label>
                                <select id="bookingTime" required>
                                    <option value="">Выберите время</option>
                                    ${generateTimeSlots(time)}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="bookingComment">Комментарий (необязательно)</label>
                                <textarea id="bookingComment" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn-medical">
                                <i class="fas fa-calendar-check"></i>
                                Подтвердить запись
                            </button>
                        </form>
                    </div>
                `;

                // Добавляем стили для модального окна бронирования
                const bookingModalStyle = document.createElement('style');
                bookingModalStyle.textContent = `
                    .modal__info {
                        background: var(--background-light);
                        padding: 1rem;
                        border-radius: 4px;
                        margin-bottom: 1.5rem;
                    }

                    .modal__info strong {
                        color: var(--primary-color);
                    }
                `;
                document.head.appendChild(bookingModalStyle);

                document.body.appendChild(modal);

                // Обработчики для модального окна
                const closeBtn = modal.querySelector('.modal__close');
                closeBtn.addEventListener('click', () => {
                    modal.remove();
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });

                // Обработчик отправки формы
                const form = modal.querySelector('#bookingForm');
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const name = document.getElementById('bookingName').value;
                    const phone = document.getElementById('bookingPhone').value;
                    const time = document.getElementById('bookingTime').value;
                    const comment = document.getElementById('bookingComment').value;

                    // Показываем уведомление об успешной записи
                    const notification = document.createElement('div');
                    notification.className = 'notification';
                    notification.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        Запись успешно создана! Мы свяжемся с вами для подтверждения.
                    `;

                    document.body.appendChild(notification);
                    modal.remove();

                    setTimeout(() => {
                        notification.style.animation = 'slideOut 0.3s ease-out forwards';
                        setTimeout(() => notification.remove(), 300);
                    }, 3000);
                });
            });
        });
    });
};

// Функция для генерации временных слотов
const generateTimeSlots = (timeRange) => {
    const [start, end] = timeRange.split(' - ');
    const slots = [];
    
    // Преобразуем время в минуты
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    
    // Генерируем слоты по 30 минут
    for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
        const time = minutesToTime(minutes);
        slots.push(`<option value="${time}">${time}</option>`);
    }
    
    return slots.join('');
};

// Вспомогательные функции для работы со временем
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Инициализация новых секций
window.addEventListener('load', () => {
    createTestimonialsSection();
    createFAQSection();
    createScheduleSection();
}); 