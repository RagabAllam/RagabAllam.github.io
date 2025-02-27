document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const langToggle = document.querySelector('.lang-toggle'); // للشاشات الكبيرة
    const langOption = document.querySelector('.lang-option'); // للموبايل
    const emailTo = 'midoallam2003@gmail.com'; // البريد الإلكتروني الخاص بك
    let currentLang = localStorage.getItem('lang') || 'ar'; // اللغة الافتراضية هي العربية

    // وظيفة لتحديث النصوص بناءً على اللغة
    function updateLanguage(lang) {
        document.body.className = lang; // إضافة فئة اللغة للـ body
        document.querySelectorAll('[data-ar], [data-en]').forEach(element => {
            const arText = element.getAttribute('data-ar');
            const enText = element.getAttribute('data-en');
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = lang === 'ar' ? arText : enText; // تحديث الـ placeholder
            } else if (element.tagName === 'BUTTON' && element.classList.contains('btn-submit')) {
                element.textContent = lang === 'ar' ? arText : enText; // تحديث نص زر الإرسال
            } else {
                element.textContent = lang === 'ar' ? arText : enText; // تحديث النصوص العادية
            }
            if (element.tagName === 'TITLE') document.title = element.textContent;
        });
        if (langToggle) langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
        if (langOption) langOption.textContent = lang === 'ar' ? 'EN' : 'AR';
        langOption?.classList.toggle('clicked', false); // إعادة الضبط عند التبديل
        localStorage.setItem('lang', lang); // حفظ اللغة في التخزين المحلي
    }

    // تفعيل تبديل اللغة
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            updateLanguage(currentLang);
        });
    }
    if (langOption) {
        langOption.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            updateLanguage(currentLang);
        });
    }

    // تهيئة اللغة عند التحميل
    updateLanguage(currentLang);

    // معالجة نموذج الاتصال (محدود على صفحة تواصل معي)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            // إنشاء رسالة تأكيد
            const confirmation = document.createElement('div');
            confirmation.style.position = 'fixed';
            confirmation.style.top = '50%';
            confirmation.style.left = '50%';
            confirmation.style.transform = 'translate(-50%, -50%)';
            confirmation.style.background = '#2d3748';
            confirmation.style.color = '#fff';
            confirmation.style.padding = '20px';
            confirmation.style.borderRadius = '10px';
            confirmation.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
            confirmation.style.zIndex = '2001';
            confirmation.textContent = `تم إرسال الرسالة إلى ${emailTo}!\n${currentLang === 'ar' ? 'الاسم' : 'Name'}: ${name}\n${currentLang === 'ar' ? 'البريد' : 'Email'}: ${email}\n${currentLang === 'ar' ? 'الرسالة' : 'Message'}: ${message}`;
            document.body.appendChild(confirmation);

            // إخفاء الرسالة بعد 5 ثواني
            setTimeout(() => {
                document.body.removeChild(confirmation);
            }, 5000);

            // إعادة تعيين النموذج
            form.reset();
        });
    }

    // التحكم في القائمة على الموبايل (محدود على الصفحات التي تحتوي على navbar)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // التحكم في التكبير والإطار (Modal) للصور (محدود على صفحة المشاريع)
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

        // إغلاق الإطار عند النقر خارج الصورة
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
