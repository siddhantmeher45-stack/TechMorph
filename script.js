// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (navToggle) {
            navToggle.querySelector('i').classList.remove('fa-times');
            navToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Scroll Active Link Highlighting
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Particle Background Animation
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', () => {
        setCanvasSize();
        init();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? 'rgba(112, 0, 255, ' : 'rgba(0, 243, 255, ';
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    init();
    animateParticles();
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.service-card, .team-member, .feature-card, .glass-card, .section-header');

animatedElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Optimized Parallax Effect
let scrollRequest = false;
window.addEventListener('scroll', () => {
    if (!scrollRequest) {
        window.requestAnimationFrame(() => {
            const parallaxBgs = document.querySelectorAll('.parallax-bg');
            parallaxBgs.forEach(bg => {
                const speed = 0.3; // Reduced speed for smoother feeling
                const offset = window.pageYOffset * speed;
                bg.style.transform = `translate3d(0, ${offset}px, 0)`; // Use translate3d for hardware acceleration
            });
            scrollRequest = false;
        });
        scrollRequest = true;
    }
});

// Optimized Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-effect');

tiltCards.forEach(card => {
    let mouseRequest = false;

    card.addEventListener('mousemove', (e) => {
        if (!mouseRequest) {
            window.requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Reduced rotation for greater smoothness
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                mouseRequest = false;
            });
            mouseRequest = true;
        }
    });

    // Add ease-out transition only when leaving to smooth return
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';

        // Remove transition after it's done so it doesn't fight mousemove
        setTimeout(() => {
            card.style.transition = '';
        }, 500);
    });
});
