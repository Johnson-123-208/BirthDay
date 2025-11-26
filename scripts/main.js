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

    // Preload images for faster loading
    preloadImages();

    // Initialize all features
    initHeroAnimations();
    initBibleVerseTyping();
    initTypingAnimation();
    initVideoAudioToggle();
    initStatsCounter();
    initGalleryAnimations();
    initWishSectionAnimations();
    initFinaleAnimations();
    initConfetti();
    initFireworks();
    initMusicPlayer();
});

// ============================================
// IMAGE PRELOADING FOR FASTER LOADING
// ============================================
function preloadImages() {
    const imageUrls = [
        './assets/1.jpeg',
        './assets/2.jpeg',
        './assets/3.jpeg',
        './assets/4.jpeg',
        './assets/5.jpeg',
        './assets/6.jpeg',
        './assets/7.jpeg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// ============================================
// CINEMATIC HERO ANIMATIONS
// ============================================
function initHeroAnimations() {
    // Typewriter animation for hero name
    const heroNameElement = document.getElementById('heroName');
    if (heroNameElement) {
        const fullText = 'Vijay Sir';
        let charIndex = 0;

        // Typewriter effect - SPEED: Adjust delay for faster/slower typing
        function typeWriter() {
            if (charIndex < fullText.length) {
                heroNameElement.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 150); // 150ms per character - MODIFY THIS for speed
            }
        }

        // Start typewriter after initial fade-in
        setTimeout(typeWriter, 1500);
    }

    // Mouse glow follower effect - Premium positioning
    const mouseGlow = document.getElementById('mouseGlow');

    if (mouseGlow) {
        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        // Track mouse position globally
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            mouseGlow.style.opacity = '1';
        });

        // Hide glow when mouse leaves window
        document.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
        });

        // Smooth follow animation with easing
        function animateGlow() {
            const ease = 0.12; // Smooth, luxurious follow speed

            glowX += (mouseX - glowX) * ease;
            glowY += (mouseY - glowY) * ease;

            // Center the glow on cursor (already handled by translate(-50%, -50%) in CSS)
            mouseGlow.style.left = `${glowX}px`;
            mouseGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }
}

// ============================================
// BIBLE VERSE TYPING ANIMATION
// ============================================
function initBibleVerseTyping() {
    const verseTextElement = document.getElementById('bibleVerseText');
    const verseRefElement = document.getElementById('bibleVerseRef');

    if (!verseTextElement || !verseRefElement) return;

    const verses = [
        {
            text: '"The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you."',
            ref: '— Numbers 6:24-25'
        },
        {
            text: '"May He give you the desire of your heart and make all your plans succeed."',
            ref: '— Psalm 20:4'
        },
        {
            text: '"Beloved, I pray that all may go well with you and that you may be in good health, as it goes well with your soul."',
            ref: '— 3 John 1:2'
        }
    ];

    let currentVerseIndex = 0;
    let charIndex = 0;
    let isTyping = true;

    function typeVerse() {
        const currentVerse = verses[currentVerseIndex];

        if (isTyping) {
            if (charIndex < currentVerse.text.length) {
                verseTextElement.textContent = currentVerse.text.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeVerse, 40); // Typing speed
            } else {
                // Show reference after text is complete
                verseRefElement.textContent = currentVerse.ref;
                verseRefElement.style.opacity = '1';
                // Pause before next verse
                setTimeout(() => {
                    isTyping = false;
                    typeVerse();
                }, 4000); // Display time
            }
        } else {
            // Erase current verse
            if (charIndex > 0) {
                verseTextElement.textContent = currentVerse.text.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeVerse, 20); // Erasing speed
            } else {
                // Move to next verse
                verseRefElement.style.opacity = '0';
                currentVerseIndex = (currentVerseIndex + 1) % verses.length;
                isTyping = true;
                setTimeout(typeVerse, 500);
            }
        }
    }

    // Start typing after a delay
    setTimeout(typeVerse, 1000);
}

// ============================================
// VIDEO AUDIO TOGGLE
// ============================================
function initVideoAudioToggle() {
    const videoAudioButton = document.getElementById('videoAudioToggle');
    const wishVideo = document.getElementById('wishVideo');
    const musicToggle = document.getElementById('musicToggle');

    if (!videoAudioButton || !wishVideo) return;

    let isVideoAudioOn = false;
    let playCount = 0;
    const maxPlays = 3;

    // Remove the loop attribute since we'll control it manually
    wishVideo.removeAttribute('loop');

    videoAudioButton.addEventListener('click', () => {
        isVideoAudioOn = !isVideoAudioOn;

        if (isVideoAudioOn) {
            // Reset play count and start playing
            playCount = 0;
            wishVideo.muted = false;
            wishVideo.currentTime = 0; // Start from beginning
            wishVideo.play();

            videoAudioButton.classList.add('active');
            videoAudioButton.querySelector('.audio-icon').textContent = '🔊';

            // Pause background music if it's playing
            if (window.bgMusic && !window.bgMusic.paused) {
                window.bgMusic.pause();
                if (musicToggle) {
                    musicToggle.classList.remove('playing');
                }
            }
        } else {
            // Mute video
            wishVideo.muted = true;
            videoAudioButton.classList.remove('active');
            videoAudioButton.querySelector('.audio-icon').textContent = '🔇';
            playCount = 0;
        }
    });

    // Listen for video end event to count plays
    wishVideo.addEventListener('ended', () => {
        if (isVideoAudioOn) {
            playCount++;

            if (playCount < maxPlays) {
                // Play again
                wishVideo.currentTime = 0;
                wishVideo.play();
            } else {
                // Reached max plays, turn off audio
                wishVideo.muted = true;
                videoAudioButton.classList.remove('active');
                videoAudioButton.querySelector('.audio-icon').textContent = '🔇';
                isVideoAudioOn = false;
                playCount = 0;

                // Reset video to loop silently
                wishVideo.currentTime = 0;
                wishVideo.setAttribute('loop', 'loop');
                wishVideo.play();
            }
        }
    });

    // Auto-pause video audio when scrolling away from video section
    const videoSection = document.querySelector('.video-wish-section');
    if (videoSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && isVideoAudioOn) {
                    // Video section is not visible, mute it
                    wishVideo.muted = true;
                    videoAudioButton.classList.remove('active');
                    videoAudioButton.querySelector('.audio-icon').textContent = '🔇';
                    isVideoAudioOn = false;
                    playCount = 0;

                    // Reset video to loop silently
                    wishVideo.setAttribute('loop', 'loop');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(videoSection);
    }
}

// ============================================
// HERO CONFETTI CELEBRATION
// ============================================
function initHeroConfetti() {
    const container = document.getElementById('heroConfetti');
    if (!container) return;

    const colors = ['#ffd700', '#ff6b9d', '#d4af37', '#ffed4e', '#ff1493'];

    function createHeroConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = '0';
        confetti.style.animation = `confettiFall ${3 + Math.random() * 4}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 7000);
    }

    // Create confetti periodically
    setInterval(createHeroConfetti, 300);

    // Initial burst
    for (let i = 0; i < 30; i++) {
        setTimeout(createHeroConfetti, i * 50);
    }
}

// ============================================
// TYPING ANIMATION FOR VIDEO MESSAGES
// ============================================
function initTypingAnimation() {
    const textElement = document.getElementById('typingText');
    if (!textElement) return;

    const messages = [
        "May this special day bring you endless joy, success, and happiness.",
        "Your leadership and wisdom inspire us every single day.",
        "Thank you for being an incredible mentor and guiding light.",
        "Wishing you a year filled with amazing achievements and blessings.",
        "Here's to celebrating you today and always!"
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentMessage = messages[messageIndex];

        if (!isDeleting) {
            // Typing
            textElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentMessage.length) {
                // Pause at end
                setTimeout(() => { isDeleting = true; }, 3000);
                return;
            }
            setTimeout(type, 50);
        } else {
            // Deleting
            textElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
                setTimeout(type, 500);
                return;
            }
            setTimeout(type, 30);
        }
    }

    // Start typing animation
    setTimeout(type, 1000);
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
// CONSOLE EASTER EGG
// ============================================
console.log('%c🎂 Happy Birthday Vijay Sir! 🎉',
    'font-size: 24px; font-weight: bold; color: #d4af37; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log('%cMade with ❤️ by your team',
    'font-size: 14px; color: #c41e3a; font-style: italic;'
);
