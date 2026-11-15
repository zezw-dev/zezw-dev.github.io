const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]').value;
        const email = contactForm.querySelector('[name="email"]').value;
        const message = contactForm.querySelector('[name="message"]').value;

        const subject = encodeURIComponent(`طلب مشروع جديد من: ${name}`);
        const body = encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nتفاصيل المشروع:\n${message}`);

        window.location.href = `mailto:01141130701zyad@://gmail.com{subject}&body=${body}`;
    });
}
