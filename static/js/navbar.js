(function () {
    // Define navigation items
    const navItems = [
        { href: '/', icon: 'fas fa-home', text: 'Home', page: 'index' },
        { href: '/about', icon: 'fas fa-info-circle', text: 'About', page: 'about' },
        { href: '/services', icon: 'fas fa-concierge-bell', text: 'Services', page: 'services' },
        { href: '/projects', icon: 'fas fa-city', text: 'Projects', page: 'projects' },
        { href: '/team', icon: 'fas fa-users', text: 'Team', page: 'team' },
        { href: '/achievements', icon: 'fas fa-trophy', text: 'Achievements', page: 'achievements' },
        { href: '/partners', icon: 'fas fa-handshake', text: 'Partners', page: 'partners' },
        { href: '/contact', icon: 'fas fa-envelope', text: 'Contact', page: 'contact' }
    ];

    function getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('index')) return 'index';
        const page = path.split('/').pop().replace('', '');
        return page || 'index';
    }

    function generateNavbar() {
        const currentPage = getCurrentPage();

        const navItemsHTML = navItems.map(item => {
            const isActive = item.page === currentPage ? 'active' : '';
            return `
                <li class="nav-item ${isActive}">
                    <a class="nav-link" href="${item.href}">
                        <i class="${item.icon}"></i> ${item.text}
                    </a>
                </li>
            `;
        }).join('');

        return `
            <header>
                <nav class="navbar navbar-expand-lg navbar-custom">
                    <div class="container">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand" href="/">
                            <i class="fas fa-building"></i> Calamba Expressive Properties
                        </a>
                        
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                ${navItemsHTML}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        `;
    }

    function setupNavbarCloseBehavior() {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbar = document.querySelector('.navbar');

        if (!navbarCollapse || !navbar) return;

        // Close navbar when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNavbar = navbar.contains(event.target);
            const isNavbarExpanded = navbarCollapse.classList.contains('show');

            if (!isClickInsideNavbar && isNavbarExpanded) {
                // Use Bootstrap's collapse method to close
                $(navbarCollapse).collapse('hide');
            }
        });

        // Close navbar when clicking on any nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Close the navbar after a short delay to allow navigation
                setTimeout(() => {
                    $(navbarCollapse).collapse('hide');
                }, 100);
            });
        });

        // Also close when clicking the brand logo
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.addEventListener('click', function () {
                setTimeout(() => {
                    $(navbarCollapse).collapse('hide');
                }, 100);
            });
        }
    }

    function insertNavbar() {
        const container = document.getElementById('navbar-container');
        if (container) {
            container.innerHTML = generateNavbar();
            checkNavbarOverflow(); // check immediately after insertion
            setupNavbarCloseBehavior(); // setup close behavior
            window.addEventListener('resize', checkNavbarOverflow); // check on resize
        } else {
            console.warn('Navbar container not found. Add <div id="navbar-container"></div> to your HTML.');
        }
    }

    // **New function to collapse navbar if items overflow**
    function checkNavbarOverflow() {
        const navbar = document.querySelector('.navbar');
        const navCollapse = document.querySelector('.navbar-collapse');
        const navItems = document.querySelector('.navbar-nav');

        if (!navbar || !navCollapse || !navItems) return;

        // If items overflow the container width
        if (navItems.scrollWidth > navbar.clientWidth) {
            navbar.classList.add('collapsed-dynamic');
        } else {
            navbar.classList.remove('collapsed-dynamic');
        }
    }

    // Auto-insert if document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertNavbar);
    } else {
        insertNavbar();
    }
})();