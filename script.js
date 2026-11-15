const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = "جاري الإرسال...";
        submitBtn.disabled = true;

        const formData = {
            name: contactForm.querySelector('[name="name"]').value,
            email: contactForm.querySelector('[name="email"]').value,
            message: contactForm.querySelector('[name="message"]').value
        };

        try {
            const response = await fetch("https://formspree.io", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                submitBtn.textContent = "تم إرسال رسالتك بنجاح ✓";
                submitBtn.style.background = "#10b981";
                contactForm.reset();
            } else {
                submitBtn.textContent = "حدث خطأ، حاول مجدداً";
            }
        } catch (error) {
            submitBtn.textContent = "تأكد من اتصالك بالإنترنت";
        }

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = "";
            submitBtn.disabled = false;
        }, 4000);
    });
}
