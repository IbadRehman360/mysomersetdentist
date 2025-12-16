document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const menuLines = document.querySelectorAll('#menu-btn span');
    const btnCall = document.getElementById('btn-call');

    const logoWhite = './images/logo-white.png';
    const logoDark = './images/logo.png';

    // Header Scroll Effect
    let ticking = false;

    function updateHeader() {
        if (window.scrollY > 50) {
            // Scrolled State - Gold background, smaller padding
            header.classList.remove('bg-transparent', 'py-4', 'md:py-6');
            header.classList.add('bg-brand-blue', 'shadow-md', 'py-2', 'md:py-3');

            // Logo -> White (keep same size)
            if (headerLogo.src.indexOf('logo-white') === -1) {
                headerLogo.src = logoWhite;
            }

            // Menu Lines -> White
            menuLines.forEach(line => {
                line.classList.remove('bg-brand-blue');
                line.classList.add('bg-white');
            });

            // Button -> White bg, gold text/border
            if (btnCall) {
                btnCall.classList.remove('bg-brand-accent-dark', 'text-white');
                btnCall.classList.add('bg-white', 'text-brand-gold', 'border-brand-gold', 'scrolled-btn');
            }

        } else {
            // Initial State - Transparent, normal padding
            header.classList.add('bg-transparent', 'py-4', 'md:py-6');
            header.classList.remove('bg-brand-blue', 'shadow-md', 'py-2', 'md:py-3');

            // Logo -> Dark (keep same size)
            if (headerLogo.src.indexOf('logo.png') === -1) {
                headerLogo.src = logoDark;
            }

            // Menu Lines -> Keep White (hero has dark background)
            menuLines.forEach(line => {
                line.classList.add('bg-white');
                line.classList.remove('bg-brand-blue');
            });

            // Button -> Original style (gold bg, white text)
            if (btnCall) {
                btnCall.classList.add('bg-brand-accent-dark', 'text-white');
                btnCall.classList.remove('bg-white', 'text-brand-gold', 'border-brand-gold', 'scrolled-btn');
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Sidebar Toggle
    const mainMenu = document.getElementById('main-menu');
    const mainContent = document.getElementById('main-content');
    const submenus = document.querySelectorAll('.submenu');
    const submenuTriggers = document.querySelectorAll('.submenu-trigger');
    const backBtns = document.querySelectorAll('.back-btn');

    function openSidebar() {
        sidebar.classList.remove('translate-x-full');
        sidebar.classList.add('translate-x-0');
        overlay.classList.remove('hidden', 'opacity-0');
        overlay.classList.add('opacity-100');

        // Push main content to the left on desktop
        if (window.innerWidth >= 768) {
            mainContent.style.transform = 'translateX(-400px)';
        }

        document.body.classList.add('overflow-hidden');

        // Reset to main menu
        resetToMainMenu();
    }

    function closeSidebar() {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('translate-x-full');
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');

        // Reset main content position
        mainContent.style.transform = 'translateX(0)';

        setTimeout(() => {
            overlay.classList.add('hidden');
            resetToMainMenu();
        }, 500);
        document.body.classList.remove('overflow-hidden');
    }

    function resetToMainMenu() {
        // Hide all submenus
        submenus.forEach(submenu => {
            submenu.classList.add('translate-x-full');
            submenu.classList.remove('translate-x-0');
        });
        // Show main menu
        if (mainMenu) {
            mainMenu.classList.remove('-translate-x-full');
            mainMenu.classList.add('translate-x-0');
        }
    }

    function openSubmenu(submenuId) {
        const submenu = document.getElementById(submenuId);
        if (submenu && mainMenu) {
            // Slide main menu out
            mainMenu.classList.add('-translate-x-full');
            mainMenu.classList.remove('translate-x-0');
            // Slide submenu in
            submenu.classList.remove('translate-x-full');
            submenu.classList.add('translate-x-0');
        }
    }

    // Event Listeners
    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Submenu triggers
    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const submenuId = trigger.getAttribute('data-submenu');
            openSubmenu(submenuId);
        });
    });

    // Back buttons
    backBtns.forEach(btn => {
        btn.addEventListener('click', resetToMainMenu);
    });

    // Enhanced Scroll Animation Observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS transition
                entry.target.classList.add('animate-visible');

                // Stop observing once animated (one-time animation)
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
    });

    // Observe all elements with scroll animation classes
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
        scrollObserver.observe(el);
    });

    // Legacy support for data-animate attribute
    const legacyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        legacyObserver.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Before/After Comparison Slider
    const slider = document.getElementById('comparison-slider');
    const beforeContainer = document.getElementById('before-container');
    const sliderHandle = document.getElementById('slider-handle');
    const progressBar = document.getElementById('progress-bar');

    if (slider && beforeContainer && sliderHandle) {
        let isDragging = false;

        function updateSliderPosition(x) {
            const rect = slider.getBoundingClientRect();
            let percentage = ((x - rect.left) / rect.width) * 100;
            percentage = Math.max(0, Math.min(100, percentage));

            beforeContainer.style.width = percentage + '%';
            sliderHandle.style.left = percentage + '%';
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
        }

        // Mouse events
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSliderPosition(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSliderPosition(e.touches[0].clientX);
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Click on slider to move
        slider.addEventListener('click', (e) => {
            if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
                updateSliderPosition(e.clientX);
            }
        });
    }
});
