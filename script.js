/**
 * Portfolio Website Interactive Features & Modern UX Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. THEME TOGGLE (DARK / LIGHT MODE)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');

            if (themeIcon) {
                if (isDark) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        });
    }

    // ==========================================
    // 2. MOBILE NAVIGATION MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu on clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close on clicking outside menu
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ==========================================
    // 3. STICKY NAVBAR & SCROLLSPY
    // ==========================================
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.pageYOffset;

        // Sticky Navbar styling
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // ScrollSpy Active Link Indicator
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ==========================================
    // 4. HERO SECTION TYPING ANIMATION
    // ==========================================
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const words = [
            'MERN Stack Developer',
            'Frontend Specialist',
            'Full Stack Engineer',
            'Creative UI/UX Designer'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 120;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 60;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 130;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                typingDelay = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 400;
            }

            setTimeout(type, typingDelay);
        }

        type();
    }

    // ==========================================
    // 5. ANIMATED STATS COUNTER
    // ==========================================
    const statCounters = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounters() {
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800; // milliseconds
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out quad
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.floor(easeProgress * target);

                counter.textContent = currentVal + (counter.getAttribute('data-suffix') || '');

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ==========================================
    // 6. ANIMATED SKILL PROGRESS BARS
    // ==========================================
    const skillProgressBars = document.querySelectorAll('.progress-fill');
    const skillsSection = document.getElementById('skills');

    if (skillsSection && skillProgressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-level');
                        bar.style.width = targetWidth;
                    });
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }

    // ==========================================
    // 7. PROJECT FILTERING SYSTEM
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 8. CONTACT FORM VALIDATION & INTERACTIVE TOAST
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    function showToast(message, type = 'success') {
        if (!toast) return;

        toast.className = `toast toast-${type} show`;
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput.value.trim();

            // Simple validation
            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            if (message.length < 10) {
                showToast('Message must be at least 10 characters long.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            // Simulate sending message (client-side demo)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                showToast('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            }, 1200);
        });
    }

    // ==========================================
    // 9. COPY CONTACT INFO ON CLICK (UX ENHANCEMENT)
    // ==========================================
    const copyableItems = document.querySelectorAll('.copyable');
    copyableItems.forEach(item => {
        item.addEventListener('click', () => {
            const textToCopy = item.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
                }).catch(() => {
                    showToast('Unable to copy to clipboard', 'error');
                });
            }
        });
    });
});
