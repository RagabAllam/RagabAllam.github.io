// التحكم في قائمة التنقل على الشاشات الصغيرة
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.classList.add('clicked');
            setTimeout(() => menuToggle.classList.remove('clicked'), 500); // إزالة الفئة بعد التأثير
        });
    }

    // تغيير خلفية الـNavbar عند التمرير (تم تعطيله بناءً على طلبك)
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // تأثير الظهور عند التمرير
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.fade-in, .slide-in').forEach(el => observer.observe(el));

    // تأثير Parallax للخلفية في الصفحة الرئيسية
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            let scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }

    // التعامل مع نموذج التواصل
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(localStorage.getItem('language') === 'en' ? 'Your message has been sent successfully! I will contact you soon.' : 'تم إرسال رسالتك بنجاح! سيتم التواصل معك قريبًا.');
            this.reset();
        });
    }

    // تأثير حركي على بطاقات المشاريع والأسعار
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

    // التحكم في النافذة المنبثقة (Modal)
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const projectImages = document.querySelectorAll('.project-image');

    if (modal && modalImage && closeModal && projectImages.length > 0) {
        projectImages.forEach(image => {
            image.addEventListener('click', () => {
                console.log('Opening modal with image:', image.getAttribute('data-full'));
                modal.style.display = 'flex';
                modalImage.src = image.getAttribute('data-full');
            });
        });

        closeModal.addEventListener('click', () => {
            console.log('Closing modal');
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('Closing modal by clicking outside');
                modal.style.display = 'none';
            }
        });
    }

    // إعداد اللغة عند تحميل الصفحة
    const elements = document.querySelectorAll('[data-ar][data-en]');
    const placeholders = document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]');
    const langToggle = document.querySelector('.lang-toggle');
    const navItems = document.querySelectorAll('.nav-item');

    if (!langToggle) {
        console.error('Language toggle button not found!');
        return;
    }

    // تحقق من اللغة المخزنة أو استخدم العربية افتراضيًا
    const savedLang = localStorage.getItem('language') || 'ar';
    if (savedLang === 'en') {
        document.body.classList.add('en');
        langToggle.textContent = 'AR';
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });
        placeholders.forEach(input => {
            input.placeholder = input.getAttribute('data-en-placeholder');
        });
        document.title = document.querySelector('title').getAttribute('data-en');
    } else {
        document.body.classList.remove('en');
        langToggle.textContent = 'EN';
        elements.forEach(element => {
            element.textContent = element.getAttribute('data-ar');
        });
        placeholders.forEach(input => {
            input.placeholder = input.getAttribute('data-ar-placeholder');
        });
        document.title = document.querySelector('title').getAttribute('data-ar');
    }

    // تبديل اللغة عند النقر مع تأثير موجة
    langToggle.addEventListener('click', () => {
        const isEnglish = !document.body.classList.contains('en');
        document.body.classList.toggle('en');
        localStorage.setItem('language', isEnglish ? 'en' : 'ar');
        langToggle.textContent = isEnglish ? 'AR' : 'EN';
        langToggle.classList.add('clicked');
        setTimeout(() => langToggle.classList.remove('clicked'), 400); // إزالة الفئة بعد الموجة

        elements.forEach(element => {
            element.textContent = isEnglish ? element.getAttribute('data-en') : element.getAttribute('data-ar');
        });

        placeholders.forEach(input => {
            input.placeholder = isEnglish ? input.getAttribute('data-en-placeholder') : input.getAttribute('data-ar-placeholder');
        });

        document.title = isEnglish ? document.querySelector('title').getAttribute('data-en') : document.querySelector('title').getAttribute('data-ar');
    });

    // إضافة تأثير تكبير عند النقر على الروابط
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.add('clicked');
            setTimeout(() => item.classList.remove('clicked'), 300); // إزالة الفئة بعد التكبير
        });
    });
});