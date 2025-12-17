document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const menuLines = document.querySelectorAll('#menu-btn span');
    const btnCall = document.getElementById('btn-call');
    const btnCallMobile = document.getElementById('btn-call-mobile');
    const btnLocation = document.getElementById('btn-location');

    const logoWhite = './images/logo-white.png';
    const logoDark = './images/logo.png';

    let ticking = false;

    function updateHeader() {
        if (window.scrollY > 50) {
            // Scrolled state - shrink header
            header.classList.remove('bg-transparent', 'py-4', 'md:py-5', 'lg:py-6');
            header.classList.add('bg-brand-blue', 'shadow-md', 'py-2', 'md:py-3', 'lg:py-3');

            // Shrink logo
            headerLogo.classList.remove('h-16', 'md:h-20', 'lg:h-24');
            headerLogo.classList.add('h-12', 'md:h-14', 'lg:h-16');

            if (headerLogo.src.indexOf('logo-white') === -1) {
                headerLogo.src = logoWhite;
            }

            // Shrink menu button
            menuBtn.classList.remove('w-7', 'h-7', 'gap-1.5');
            menuBtn.classList.add('w-6', 'h-6', 'lg:w-7', 'lg:h-7', 'gap-1');

            menuLines.forEach(line => {
                line.classList.add('bg-white');
                line.classList.remove('bg-brand-blue', 'h-[3px]');
                line.classList.add('h-[2px]', 'lg:h-[2.5px]');
            });

            // Shrink call button
            if (btnCall) {
                btnCall.classList.remove('bg-brand-accent-dark', 'text-white', 'px-8', 'py-2.5');
                btnCall.classList.add('bg-white', 'text-brand-gold', 'border-brand-gold', 'scrolled-btn', 'px-7', 'py-2.5', 'text-sm');
            }

            // Update location button colors (keep size fixed)
            if (btnLocation) {
                btnLocation.classList.remove('bg-brand-accent-dark', 'text-white');
                btnLocation.classList.add('bg-white', 'text-brand-accent-dark', 'border-brand-accent-dark');
            }

            // Update mobile call button colors (keep size fixed)
            if (btnCallMobile) {
                btnCallMobile.classList.remove('bg-brand-accent-dark', 'text-white');
                btnCallMobile.classList.add('bg-white', 'text-brand-accent-dark', 'border-brand-accent-dark');
            }
        } else {
            // Default state - full size header
            header.classList.add('bg-transparent', 'py-4', 'md:py-5', 'lg:py-6');
            header.classList.remove('bg-brand-blue', 'shadow-md', 'py-2', 'md:py-3', 'lg:py-3');

            // Full size logo
            headerLogo.classList.add('h-16', 'md:h-20', 'lg:h-24');
            headerLogo.classList.remove('h-12', 'md:h-14', 'lg:h-16');

            if (headerLogo.src.indexOf('logo.png') === -1) {
                headerLogo.src = logoDark;
            }

            // Full size menu button
            menuBtn.classList.add('w-7', 'h-7', 'gap-1.5');
            menuBtn.classList.remove('w-6', 'h-6', 'lg:w-7', 'lg:h-7', 'gap-1');

            menuLines.forEach(line => {
                line.classList.add('bg-brand-blue', 'h-[3px]');
                line.classList.remove('bg-white', 'h-[2px]', 'lg:h-[2.5px]');
            });

            // Full size call button
            if (btnCall) {
                btnCall.classList.add('bg-brand-accent-dark', 'text-white', 'px-8', 'py-2.5');
                btnCall.classList.remove('bg-white', 'text-brand-gold', 'border-brand-gold', 'scrolled-btn', 'px-7', 'text-sm');
            }

            // Reset location button colors
            if (btnLocation) {
                btnLocation.classList.add('bg-brand-accent-dark', 'text-white');
                btnLocation.classList.remove('bg-white', 'text-brand-accent-dark', 'border-brand-accent-dark');
            }

            // Reset mobile call button colors
            if (btnCallMobile) {
                btnCallMobile.classList.add('bg-brand-accent-dark', 'text-white');
                btnCallMobile.classList.remove('bg-white', 'text-brand-accent-dark', 'border-brand-accent-dark');
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
        document.body.classList.add('overflow-hidden');
        if (mainContent && window.innerWidth >= 768) {
            mainContent.style.transform = 'translateX(-400px)';
        }
        resetToMainMenu();
    }

    function closeSidebar() {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('translate-x-full');
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        if (mainContent) {
            mainContent.style.transform = '';
        }
        setTimeout(() => {
            overlay.classList.add('hidden');
            resetToMainMenu();
        }, 500);
        document.body.classList.remove('overflow-hidden');
    }

    function resetToMainMenu() {
        submenus.forEach(submenu => {
            submenu.classList.add('translate-x-full');
            submenu.classList.remove('translate-x-0');
        });
        if (mainMenu) {
            mainMenu.classList.remove('-translate-x-full');
            mainMenu.classList.add('translate-x-0');
        }
    }

    function openSubmenu(submenuId) {
        const submenu = document.getElementById(submenuId);
        if (submenu && mainMenu) {
            mainMenu.classList.add('-translate-x-full');
            mainMenu.classList.remove('translate-x-0');
            submenu.classList.remove('translate-x-full');
            submenu.classList.add('translate-x-0');
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const submenuId = trigger.getAttribute('data-submenu');
            openSubmenu(submenuId);
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', resetToMainMenu);
    });

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
        scrollObserver.observe(el);
    });

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

        sliderHandle.addEventListener('touchstart', () => {
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

        slider.addEventListener('click', (e) => {
            if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
                updateSliderPosition(e.clientX);
            }
        });
    }
});
