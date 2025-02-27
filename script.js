document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.querySelector('.lang-toggle');
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
        });
    }
});