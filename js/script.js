document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav a');

const updateActiveNav = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 2;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);


const form = document.getElementById('booking-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            successMessage.classList.add('visible');
            
            form.reset();

            setTimeout(() => {
                successMessage.classList.remove('visible');
            }, 4000);

        } else {
            console.error("На жаль, виникла помилка при відправці. Перевірте введені дані.");
        }

    } catch (error) {
        console.error('Помилка відправки форми:', error);
        console.error("Помилка сервера. Спробуйте пізніше або зв'яжіться з нами напряму.");
    }
});
