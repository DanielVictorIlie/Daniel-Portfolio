const navMenu = document.querySelector('.nav-menu'),
    navToggle = document.querySelector('.nav-toggle'),
    navClose = document.querySelector('.nav-close'),
    navLink = document.querySelectorAll('.nav-link'),
    contactForm = document.querySelector('.contact-form'),
    contactName = document.querySelector('#contact-name'),
    contactEmail = document.querySelector('#contact-email'),
    contactMessage = document.querySelector('#contact-message'),
    contactSent = document.querySelector('.contact-sent'),
    sections = document.querySelectorAll('section[id]'),
    themeButton = document.querySelector('#theme-button')

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

const linkAction = () => {
    navMenu.classList.remove('show-menu')
}

navLink.forEach(link => link.addEventListener('click', linkAction))

const swiperProjects = new Swiper(".projects-container", {
    loop: true,
    spaaceBetween: 24,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        1200: {
            slidesPerView: 2,
            spaceBetween: -56,
        },
    },
    mousewheel: true,
});

const swiperTestimonials = new Swiper(".testimonial-container", {
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const sentEmail = (e) => {
    e.preventDefault()

    if (contactName.value === '' || contactEmail.value === '' || contactMessage.value === '') {
        contactSent.classList.remove('color-green')
        contactSent.classList.add('color-red')

        contactSent.innerHTML = `Write all the input fields <i class="ri-alert-line"></i>`
    } else {
        emailjs.sendForm('service_bgjt5li', 'template_e3hr9v9', '.contact-form', 'bL4snM9THFUKnen9I')
            .then(() => {
                contactSent.classList.add('color-green')
                contactSent.innerHTML = `Message successfully sent <i class="ri-checkbox-circle-line"></i>`
                setTimeout(() => {
                    contactSent.innerHTML = ''
                }, 5000)
            }, (error) => {
                alert(' OOPS ! SOMETHING WENT WRONG... ', error)
            })

        contactName.value = ''
        contactEmail.value = ''
        contactMessage.value = ''
    }
}
contactForm.addEventListener('submit', sentEmail)

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 100,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= (sectionTop + sectionHeight)) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

const scrollUp = () => {
    const scrollUp = document.querySelector('.scroll-up')
    this.scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-line';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

const scrollHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header')
}

window.addEventListener('scroll', scrollHeader)

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 400,
    // reset:true
})

sr.reveal(`.home-data, .projects-container, .testimonial-container, .footer-container`)
sr.reveal(`.home-info div`, { delay: 500, origin: 'bottom', interval: 60 })
sr.reveal(`.skills-content:nth-child(1), .contact-form div:nth-child(1), .contact-form div:nth-child(3)`, { origin: 'left' })
sr.reveal(`.skills-content:nth-child(2), .contact-form div:nth-child(2)`, { origin: 'right' })
sr.reveal(`.qualification-content, .services-card, .contact-container`, { interval: 50 })