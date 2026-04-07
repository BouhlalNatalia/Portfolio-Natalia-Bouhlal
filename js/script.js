

// 1. Инициализация и сброс скролла
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});



// 2. Плавная навигация
document.querySelectorAll('nav a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 3. Анимация появления секций и навыков
const observerOptions = { threshold: 0.1 };
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));

const skills = document.querySelectorAll('.skill');
function showSkills() {
    const triggerBottom = window.innerHeight * 0.85;
    skills.forEach((skill, index) => {
        const boxTop = skill.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            skill.style.transitionDelay = `${index * 0.08}s`;
            skill.classList.add('show');
        }
    });
}
window.addEventListener('scroll', showSkills);

// Бургер-меню с оверлеем
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');

if (burger && navMenu && navOverlay) {
    const menuLinks = navMenu.querySelectorAll('a');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
    };


    burger.addEventListener('click', toggleMenu);


    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    });

    navOverlay.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
    });
}
// 5. Отправка формы (EmailJS)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        emailjs.send("service_0by2yph", "template_8tzmb1i", {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        })
            .then(() => {
                alert('Сообщение отправлено!');
                contactForm.reset();
            }, (error) => {
                alert('Ошибка при отправке: ' + JSON.stringify(error));
            });
    });
}

// --- 6. СЛАЙДЕР ПРОЕКТОВ ---
const track = document.querySelector('.project-cards');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
const sliderWindow = document.querySelector('.slider-window');
const dotsContainer = document.querySelector('#sliderDots');

let index = 0;
let isMoving = false;
const slides = track ? track.children : [];
const realSlidesCount = slides.length > 0 ? (slides.length - 1) : 0;

if (dotsContainer && realSlidesCount > 0) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < realSlidesCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (isMoving) return;
            index = i;
            updateSlider(true);
        });
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === (index % realSlidesCount));
    });
}

function updateSlider(hasAnimation = true) {
    if (!track || !sliderWindow) return;
    const width = sliderWindow.clientWidth;
    track.style.transition = hasAnimation ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    track.style.transform = `translateX(${-index * width}px)`;
    updateDots();
}

if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
        if (isMoving) return;
        isMoving = true;
        index++;
        updateSlider(true);
    });

    prevBtn.addEventListener('click', () => {
        if (isMoving) return;
        isMoving = true;
        if (index <= 0) {
            index = realSlidesCount;
            updateSlider(false);
            setTimeout(() => {
                index--;
                updateSlider(true);
            }, 10);
        } else {
            index--;
            updateSlider(true);
        }
    });

    track.addEventListener('transitionend', () => {
        isMoving = false;
        if (index >= realSlidesCount) {
            index = 0;
            updateSlider(false);
        }
    });
}

window.addEventListener('resize', () => updateSlider(false));


// МОДАЛКА
const projectModal = document.getElementById('projectModal');

document.addEventListener('click', function (event) {
    const target = event.target;

    // 1. ОТКРЫТИЕ МОДАЛКИ
    if (target && target.classList.contains('btn-details')) {
        const card = target.closest('.project-card');
        const hiddenData = card.querySelector('.hidden-modal-data');

        if (card && hiddenData && projectModal) {

            const title = card.querySelector('h3').innerText;
            const desc = hiddenData.querySelector('.modal-desc-text')?.innerHTML || "";
            const tags = hiddenData.querySelector('.modal-tech-stack')?.innerHTML || "";
            const highlights = hiddenData.querySelector('.modal-highlights-data')?.innerHTML || "";

            projectModal.querySelector('#modalTitle').innerText = title;
            projectModal.querySelector('#modalDescription').innerHTML = desc;
            projectModal.querySelector('#modalTags').innerHTML = tags;
            projectModal.querySelector('#modalHighlights').innerHTML = highlights;

            projectModal.style.display = 'block';
            setTimeout(() => projectModal.classList.add('show'), 10);
        }
    }

    // 2. ЗАКРЫТИЕ МОДАЛКИ
    if (target && (target.classList.contains('close-modal') || target === projectModal)) {
        projectModal.classList.remove('show');
        setTimeout(() => {
            projectModal.style.display = "none";
        }, 300);
    }
});

// --- 8.  АККОРДЕОН (для резюме) ---
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.accordion-header') || e.target.closest('.accordion-button');
    if (!btn) return;

    const content = btn.nextElementSibling;
    if (!content) return;

    const isActive = btn.classList.toggle('active');
    const parent = btn.parentElement;
    if (parent) parent.classList.toggle('active');

    if (isActive) {
        content.style.display = 'block';
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";

        const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
        if (btn.innerText.includes('Подробнее') || btn.innerText.includes('More details')) {
            btn.innerHTML = isEn ? 'Hide details <span class="icon-arrow">▲</span>' : 'Скрыть детали <span class="icon-arrow">▲</span>';
        }
    } else {
        content.style.maxHeight = "0";
        content.style.opacity = "0";

        const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
        if (btn.innerText.includes('Скрыть') || btn.innerText.includes('Hide')) {
            btn.innerHTML = isEn ? 'More details <span class="icon-arrow">▼</span>' : 'Подробнее <span class="icon-arrow">▼</span>';
        }

        setTimeout(() => {
            if (!btn.classList.contains('active')) {
                content.style.display = 'none';
            }
        }, 400);
    }
});



