// Модальное окно для портфолио
const gallery = document.querySelector('.portfolio__gallery');
const modal = document.getElementById('modal-gallery');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

if (gallery && modal && modalImg && modalClose) {
    gallery.addEventListener('click', function(e) {
        const item = e.target.closest('.portfolio__item');
        if (item) {
            const imgSrc = item.getAttribute('data-img');
            modalImg.src = imgSrc;
            modal.classList.add('active');
        }
    });
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        modalImg.src = '';
    });
    modal.querySelector('.modal__overlay').addEventListener('click', function() {
        modal.classList.remove('active');
        modalImg.src = '';
    });
}

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

// Стили для анимации (добавить в style.css):
// .section--hidden { opacity: 0; transform: translateY(40px); transition: opacity 0.7s, transform 0.7s; }
// .section--visible { opacity: 1; transform: none; }

// Форма: простая имитация отправки
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (form && formSuccess) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formSuccess.style.display = 'block';
        setTimeout(() => { formSuccess.style.display = 'none'; form.reset(); }, 2500);
    });
} 