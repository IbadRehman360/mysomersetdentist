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
            header.classList.remove('bg-transparent', 'py-6', 'md:py-8');
            header.classList.add('bg-brand-gold', 'shadow-md', 'py-4', 'md:py-5');

            // Logo -> White (keep same size)
            if (headerLogo.src.indexOf('logo-white') === -1) {
                headerLogo.src = logoWhite;
            }

            // Menu Lines -> White
            menuLines.forEach(line => {
                line.classList.remove('bg-brand-gold');
                line.classList.add('bg-white');
            });

            // Button -> White bg, gold text/border
            if (btnCall) {
                btnCall.classList.remove('bg-brand-light', 'border-white', 'text-white');
                btnCall.classList.add('bg-white', 'text-brand-gold', 'border-brand-gold', 'scrolled-btn');
            }

        } else {
            // Initial State - Transparent, normal padding
            header.classList.add('bg-transparent', 'py-6', 'md:py-8');
            header.classList.remove('bg-brand-gold', 'shadow-md', 'py-4', 'md:py-5');

            // Logo -> Dark (keep same size)
            if (headerLogo.src.indexOf('logo.png') === -1) {
                headerLogo.src = logoDark;
            }

            // Menu Lines -> Gold
            menuLines.forEach(line => {
                line.classList.add('bg-brand-gold');
                line.classList.remove('bg-white');
            });

            // Button -> Original style
            if (btnCall) {
                btnCall.classList.add('bg-brand-light', 'border-white', 'text-white');
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

    // Fade In Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
});
