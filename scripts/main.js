/* ============================================
   BIRTHDAY WEBSITE - ENHANCED MAIN JAVASCRIPT
   Journey Through Memories
   
   Features:
   - GSAP animations for all sections
   - Interactive photo gallery
   - Animated statistics counter
   - Timeline animations
   - Surprise reveal interaction
   - Quotes carousel
   - Fireworks canvas animation
   - Floating balloons
   - Floating particles
   - Confetti system
   - Music player toggle
   ============================================ */

// ============================================
// WAIT FOR DOM & GSAP TO LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Enhanced Birthday Website Initialized');

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all features
    initHeroAnimations();

    initStatsCounter();
    initGalleryAnimations();
    initWishSectionAnimations();
    initQuotesCarousel();
    initFinaleAnimations();
    initConfetti();
    initFireworks();
    initMusicPlayer();
});

// ============================================
// HERO SECTION ANIMATIONS
// ============================================
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    heroTimeline
        .fromTo(heroTitle,
            { opacity: 0, scale: 0.8, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'back.out(1.2)' }
        )
        .fromTo(heroSubtitle,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1 },
            '-=0.5'
        )
        .fromTo(scrollIndicator,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1 },
            '-=0.5'
        );

    // Floating animation
    gsap.to('.title-name', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
}

// ============================================
// FLOATING PARTICLES SYSTEM
// ============================================


// ============================================
// FLOATING BALLOONS SYSTEM
// ============================================


// ============================================
// ANIMATED STATISTICS COUNTER
// ============================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => animateCounter(stat, target)
        });
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ============================================
// PHOTO GALLERY ANIMATIONS
// ============================================
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                y: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}



// ============================================
// WISH SECTION ANIMATIONS
// ============================================
function initWishSectionAnimations() {
    const wishFrames = document.querySelectorAll('.wish-frame');

    wishFrames.forEach((frame) => {
        const leftSide = frame.querySelector('.left');
        const rightSide = frame.querySelector('.right');
        const image = frame.querySelector('.employee-photo');
        const wishText = frame.querySelector('.wish-text');
        const employeeName = frame.querySelector('.employee-name');

        const sectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: frame,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            }
        });

        sectionTimeline.fromTo(leftSide,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
        );

        sectionTimeline.fromTo(rightSide,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
            '-=1'
        );

        if (image) {
            sectionTimeline.fromTo(image,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
                '-=1.2'
            );
        }

        if (wishText) {
            sectionTimeline.fromTo(wishText,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
                '-=1'
            );
        }

        if (employeeName) {
            sectionTimeline.fromTo(employeeName,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
                '-=0.6'
            );
        }

        // Parallax effect
        if (image) {
            gsap.to(image, {
                scrollTrigger: {
                    trigger: frame,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: -50,
                ease: 'none'
            });
        }
    });
}



function createConfettiBurst() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(container, ['#d4af37', '#c41e3a', '#ffd700', '#ff6b9d', '#ffffff']);
        }, i * 20);
    }
}

// ============================================
// QUOTES CAROUSEL
// ============================================
function initQuotesCarousel() {
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.quote-dots .dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// ============================================
// FINALE SECTION ANIMATIONS
// ============================================
function initFinaleAnimations() {
    const finaleTitle = document.querySelector('.finale-title');
    const finaleSubtitle = document.querySelector('.finale-subtitle');

    gsap.timeline({
        scrollTrigger: {
            trigger: '.finale-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        }
    })
        .fromTo(finaleTitle,
            { scale: 0.5, opacity: 0, rotationY: 180 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: 'back.out(1.5)' }
        )
        .fromTo(finaleSubtitle,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
            '-=0.8'
        );
}

// ============================================
// CONFETTI ANIMATION SYSTEM
// ============================================
function initConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;

    const colors = ['#d4af37', '#c41e3a', '#ffd700', '#ff6b9d', '#ffffff'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        createConfetti(confettiContainer, colors);
    }

    setInterval(() => {
        createConfetti(confettiContainer, colors);
    }, 300);
}

function createConfetti(container, colors) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * 100;
    const randomDuration = 3 + Math.random() * 4;
    const randomDelay = Math.random() * 2;
    const randomSize = 5 + Math.random() * 10;

    confetti.style.left = `${randomLeft}%`;
    confetti.style.backgroundColor = randomColor;
    confetti.style.width = `${randomSize}px`;
    confetti.style.height = `${randomSize}px`;
    confetti.style.animationDuration = `${randomDuration}s`;
    confetti.style.animationDelay = `${randomDelay}s`;

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), (randomDuration + randomDelay) * 1000);
}

// ============================================
// FIREWORKS CANVAS ANIMATION
// ============================================
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const button = document.getElementById('fireworksButton');

    if (!canvas || !button) return;

    const ctx = canvas.getContext('2d');
    let fireworks = [];
    let particles = [];
    let isActive = false;

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    button.addEventListener('click', () => {
        if (!isActive) {
            isActive = true;
            button.textContent = '🎆 Fireworks Active!';
            launchFireworks();

            setTimeout(() => {
                isActive = false;
                button.textContent = '🎆 Launch Fireworks';
            }, 15000);
        }
    });

    function launchFireworks() {
        if (!isActive) return;

        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const targetY = Math.random() * canvas.height * 0.5;

        fireworks.push(new Firework(x, y, x, targetY));

        setTimeout(launchFireworks, 200 + Math.random() * 300);
    }

    class Firework {
        constructor(sx, sy, tx, ty) {
            this.x = sx;
            this.y = sy;
            this.sx = sx;
            this.sy = sy;
            this.tx = tx;
            this.ty = ty;
            this.distanceToTarget = this.calculateDistance(sx, sy, tx, ty);
            this.distanceTraveled = 0;
            this.trail = [];
            this.trailLength = 5;

            while (this.trailLength--) {
                this.trail.push([sx, sy]);
            }

            this.angle = Math.atan2(ty - sy, tx - sx);
            this.speed = 2;
            this.acceleration = 1.05;
            this.brightness = Math.random() * 50 + 50;
            this.targetRadius = 1;
        }

        calculateDistance(sx, sy, tx, ty) {
            const xDistance = sx - tx;
            const yDistance = sy - ty;
            return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        }

        update(index) {
            this.trail.pop();
            this.trail.unshift([this.x, this.y]);

            if (this.targetRadius < 8) {
                this.targetRadius += 0.3;
            } else {
                this.targetRadius = 1;
            }

            this.speed *= this.acceleration;

            const vx = Math.cos(this.angle) * this.speed;
            const vy = Math.sin(this.angle) * this.speed;

            this.distanceTraveled = this.calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

            if (this.distanceTraveled >= this.distanceToTarget) {
                createParticles(this.tx, this.ty);
                fireworks.splice(index, 1);
            } else {
                this.x += vx;
                this.y += vy;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.trail[this.trail.length - 1][0], this.trail[this.trail.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, ${this.brightness}%)`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.coordinates = [];
            this.coordinateCount = 5;

            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }

            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 10 + 1;
            this.friction = 0.95;
            this.gravity = 1;
            this.hue = Math.random() * 360;
            this.brightness = Math.random() * 80 + 50;
            this.alpha = 1;
            this.decay = Math.random() * 0.03 + 0.01;
        }

        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= this.decay;

            if (this.alpha <= this.decay) {
                particles.splice(index, 1);
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
            ctx.stroke();
        }
    }

    function createParticles(x, y) {
        let particleCount = 30;
        while (particleCount--) {
            particles.push(new Particle(x, y));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        let i = fireworks.length;
        while (i--) {
            fireworks[i].draw();
            fireworks[i].update(i);
        }

        let j = particles.length;
        while (j--) {
            particles[j].draw();
            particles[j].update(j);
        }
    }

    animate();
}

// ============================================
// MUSIC PLAYER TOGGLE
// ============================================
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('.music-icon');

    // Background music setup
    const bgm = new Audio('./assets/bgm.mp3');
    bgm.loop = true;
    bgm.volume = 0.5; // Soft volume

    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            bgm.play().catch(e => console.log("Audio play failed:", e));
            musicIcon.textContent = '⏸️';
            musicToggle.classList.add('playing');

            // Add pulse animation to button
            gsap.to(musicToggle, {
                scale: 1.1,
                duration: 0.5,
                yoyo: true,
                repeat: -1
            });
        } else {
            bgm.pause();
            musicIcon.textContent = '🎵';
            musicToggle.classList.remove('playing');

            // Stop pulse animation
            gsap.killTweensOf(musicToggle);
            gsap.to(musicToggle, { scale: 1, duration: 0.3 });
        }
    });
}

// ============================================
// VIDEO PLAYBACK OPTIMIZATION
// ============================================
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.play().catch(error => {
        console.log('Video autoplay prevented:', error);
        document.addEventListener('click', () => {
            heroVideo.play();
        }, { once: true });
    });
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🎂 Happy Birthday Vijay Sir! 🎉',
    'font-size: 24px; font-weight: bold; color: #d4af37; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log('%cMade with ❤️ by your team',
    'font-size: 14px; color: #c41e3a; font-style: italic;'
);
