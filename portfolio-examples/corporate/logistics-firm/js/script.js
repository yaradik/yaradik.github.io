// Анимация появления секций при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section--visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section--hidden');
    observer.observe(section);
});

// Форма калькулятора: имитация отправки
const calcForm = document.getElementById('calc-form');
const calcSuccess = document.getElementById('calc-success');
if (calcForm && calcSuccess) {
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calcSuccess.style.display = 'block';
        setTimeout(() => { calcSuccess.style.display = 'none'; calcForm.reset(); }, 2500);
    });
}

// Контактная форма: имитация отправки
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; contactForm.reset(); }, 2500);
    });
} 