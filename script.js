document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const langToggle = document.querySelector('.lang-toggle');
    const emailTo = 'midoallam2003@gmail.com';
    let currentLang = localStorage.getItem('lang') || 'ar';
    const translatableElements = document.querySelectorAll('[data-ar], [data-en]');

    function updateLanguage(lang) {
        document.body.className = lang;
        translatableElements.forEach(element => {
            const arText = element.getAttribute('data-ar');
            const enText = element.getAttribute('data-en');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = lang === 'ar' ? arText : enText;
            } else if (element.tagName === 'BUTTON' && element.classList.contains('btn-submit')) {
                element.textContent = lang === 'ar' ? arText : enText;
            } else {
                element.textContent = lang === 'ar' ? arText : enText;
            }
            if (element.tagName === 'TITLE') document.title = element.textContent;
        });
        if (langToggle) {
            langToggle.textContent = lang === 'ar' ? 'لغة: EN' : 'Language: AR';
        }
        localStorage.setItem('lang', lang);
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            updateLanguage(currentLang);
        });
    }

    updateLanguage(currentLang);

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Menu toggled'); // للتحقق في الكونسول
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const message = form.querySelector('textarea[name="message"]').value;
            window.location.href = `mailto:${emailTo}?subject=رسالة من ${name}&body=${encodeURIComponent(message)}`;
            form.reset();
        });
    }

    const modal = document.querySelector('.modal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const projectImages = document.querySelectorAll('.project-image');
    if (modal && modalImage && closeModal && projectImages.length > 0) {
        projectImages.forEach(image => {
            image.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImage.src = image.src;
                modalImage.alt = image.alt;
            });
        });
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
