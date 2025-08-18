// Анимация появления секций при скролле
function revealSections() {
    const sections = document.querySelectorAll('.demo-section');
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Валидация и имитация отправки формы
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Простая валидация
        let valid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#E53E3E';
                valid = false;
            } else {
                input.style.borderColor = '#C3DAFE';
            }
        });
        if (!valid) return;
        // Имитация успешной отправки
        form.querySelector('.form-success').style.display = 'block';
        setTimeout(() => {
            form.reset();
            form.querySelector('.form-success').style.display = 'none';
        }, 2500);
    });
} 