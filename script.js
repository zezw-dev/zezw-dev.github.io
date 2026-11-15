// 1. تفعيل قائمة الهاتف التفاعلية
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. تفعيل نموذج التواصل وتفريغ الحقول بعد الإرسال
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('شكراً لتواصلك مع ZEZW! تم استلام رسالتك وسأرد عليك في أقرب وقت.');
    contactForm.reset();
});
