// ================================
// PRELOADER
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const progress = document.getElementById('loaderProgress');
    const percent = document.getElementById('loaderPercent');
    
    let loaded = 0;
    
    const interval = setInterval(() => {
        const remaining = 100 - loaded;
        const increment = Math.max(0.5, remaining * 0.08);
        loaded = Math.min(100, loaded + increment);
        
        progress.style.width = loaded + '%';
        percent.textContent = Math.floor(loaded) + '%';
        
        if (loaded >= 99.9) {
            loaded = 100;
            progress.style.width = '100%';
            percent.textContent = '100%';
            clearInterval(interval);
            
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(() => {
                    mainContent.classList.add('show');
                    initAnimations();
                }, 400);
            }, 500);
        }
    }, 50);
});

// ================================
// CUSTOM CURSOR
// ================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let cursorX = 0, cursorY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
});

function animateCursor() {
    outlineX += (cursorX - outlineX) * 0.15;
    outlineY += (cursorY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .skill-pill, .highlight-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// ================================
// NAVIGATION
// ================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ================================
// TYPING EFFECT
// ================================
const typingText = document.getElementById('typingText');
const roles = ['Computer Science Student', 'Web Developer', 'IoT Enthusiast', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeRole, typeSpeed);
}

// ================================
// COUNTER ANIMATION
// ================================
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseFloat(counter.dataset.count);
        const isDecimal = counter.dataset.decimal === 'true';
        const duration = 2000;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easeProgress;
            
            counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    });
}

// ================================
// SCROLL ANIMATIONS
// ================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ================================
// TILT EFFECT
// ================================
function initTiltEffect() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ================================
// MAGNETIC BUTTONS
// ================================
function initMagneticButtons() {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ================================
// FLOATING PARTICLES
// ================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 30;
    const colors = ['var(--accent)', 'var(--teal)', 'rgba(168, 85, 247, 0.8)'];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors);
    }
    
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < 40) {
            createParticle(container, colors);
        }
    }, 2000);
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// ================================
// PARALLAX BACKGROUND
// ================================
function initParallaxBackground() {
    const glows = document.querySelectorAll('.bg-glow');
    const mesh = document.querySelector('.bg-gradient-mesh');
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        glows.forEach((glow, index) => {
            const speed = (index + 1) * 15;
            glow.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });
        
        if (mesh) {
            mesh.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ================================
// FLOATING CV BUTTON
// ================================
const floatingCV = document.getElementById('floatingCV');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingCV.classList.add('show');
    } else {
        floatingCV.classList.remove('show');
    }
});

// ================================
// CV DOWNLOAD NOTIFICATION
// ================================
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
        showDownloadNotification();
    });
});

function showDownloadNotification() {
    if (document.querySelector('.download-notification')) return;
    
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>CV Download Started!</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ================================
// INIT ALL ANIMATIONS
// ================================
function initAnimations() {
    initScrollAnimations();
    initTiltEffect();
    initMagneticButtons();
    createParticles();
    initParallaxBackground();
    setTimeout(typeRole, 1000);
}

// ================================
// CONTACT FORM - EmailJS
// ================================
emailjs.init('hFeWE08bKDKf7WZIy'); // Replace with your key

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    const data = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: 'Kunal Choudhary'
    };
    
    // Replace with your EmailJS service and template IDs
    emailjs.send('service_wr446ki', 'template_iggyjxu', data)
        .then(() => {
            formStatus.className = 'form-status show success';
            contactForm.reset();
        })
        .catch(() => {
            formStatus.className = 'form-status show error';
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        });
});
// Public Key: hFeWE08bKDKf7WZIy
// Service ID: service_wr446ki
// Template ID: template_iggyjxu

