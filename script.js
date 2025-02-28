document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.classList.add('clicked');
            setTimeout(() => menuToggle.classList.remove('clicked'), 500);
        });
    }

    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    if (navbar) {
        // تغيير لون الـ Navbar عند التمرير (موجود أصلًا)
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // إخفاء وظهور الـ Navbar بناءً على اتجاه التمرير
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll Down - إخفاء
                navbar.classList.add('hidden');
            } else {
                // Scroll Up - ظهور
                navbar.classList.remove('hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // منع القيم السالبة
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in, .slide-in').forEach(el => observer.observe(el));

    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    let scrollPosition = window.pageYOffset;
                    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    document.querySelectorAll('.project-card, .price-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.transform = `translateY(-10px) rotateX(${(y - rect.height / 2) / 20}deg) rotateY(${(x - rect.width / 2) / 20}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const projectImages = document.querySelectorAll('.project-image');

    if (modal && modalImage && closeModal && projectImages.length > 0) {
        projectImages.forEach(image => {
            image.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImage.src = image.getAttribute('data-full');
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

    const elements = document.querySelectorAll('[data-ar][data-en]');
    const langToggle = document.querySelector('.lang-toggle');
    const navItems = document.querySelectorAll('.nav-item');

    if (!langToggle) {
        console.error('Language toggle button not found!');
        return;
    }

    const savedLang = localStorage.getItem('language') || 'ar';
    if (savedLang === 'en') {
        document.body.classList.add('en');
        langToggle.textContent = 'AR';
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });
        document.title = document.querySelector('title').getAttribute('data-en');
    } else {
        document.body.classList.remove('en');
        langToggle.textContent = 'EN';
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-ar');
        });
        document.title = document.querySelector('title').getAttribute('data-ar');
    }

    langToggle.addEventListener('click', () => {
        const isEnglish = !document.body.classList.contains('en');
        document.body.classList.toggle('en');
        localStorage.setItem('language', isEnglish ? 'en' : 'ar');
        langToggle.textContent = isEnglish ? 'AR' : 'EN';
        langToggle.classList.add('clicked');
        setTimeout(() => langToggle.classList.remove('clicked'), 500);

        elements.forEach(element => {
            element.textContent = isEnglish ? element.getAttribute('data-en') : element.getAttribute('data-ar');
        });

        document.title = isEnglish ? document.querySelector('title').getAttribute('data-en') : document.querySelector('title').getAttribute('data-ar');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('clicked');
            setTimeout(() => item.classList.remove('clicked'), 500);
        });
    });
});