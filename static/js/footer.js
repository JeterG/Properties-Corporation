/**
 * FOOTER COMPONENT
 * ================
 * Reusable footer for all pages
 * 
 * Usage: Add this script to your HTML:
 * <script src="/static/js/footer.js"></script>
 * 
 * Then add this where you want the footer:
 * <div id="footer-container"></div>
 */

(function () {
    console.log('🦶 Footer.js loaded and executing');

    // Footer configuration
    const footerConfig = {
        year: new Date().getFullYear(),
        companyName: 'Calamba Expressive Properties Corporation',
        whatsapp: {
            number: '639276154651',
            message: "Hello, I'm interested in learning more about your listings. Could you please provide more details?"
        },
        email: 'cepc.development@gmail.com',
        facebook: 'https://www.facebook.com/expressivesrealty.lynmanguiat/'
    };

    // Generate footer HTML
    function generateFooter() {
        const whatsappLink = `https://wa.me/${footerConfig.whatsapp.number}?text=${encodeURIComponent(footerConfig.whatsapp.message)}`;
        const emailLink = `mailto:${footerConfig.email}?subject=Inquiry%20about%20Calamba%20Expressive%20Properties&body=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20your%20services.%20Please%20provide%20me%20with%20additional%20information.`;

        return `
            <footer class="text-center" style="padding: 1rem;">
                <div class="container">
                    <p style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 0;">
                        <span>&copy; ${footerConfig.year} ${footerConfig.companyName}. All rights reserved.</span>
                        <span class="footer-links" style="display: inline-flex; gap: 10px; margin: 0;">
                            <a href="${whatsappLink}" target="_blank" class="footer-icon" title="WhatsApp" style="color: white !important;">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="${emailLink}" class="footer-icon" title="Email" style="color: white !important;">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="${footerConfig.facebook}" target="_blank" class="footer-icon" title="Facebook" style="color: white !important;">
                                <i class="fab fa-facebook"></i>
                            </a>
                        </span>
                    </p>
                </div>
            </footer>
        `;
    }

    // Insert footer when DOM is ready
    function insertFooter() {
        console.log('🦶 Attempting to insert footer...');

        const container = document.getElementById('footer-container');

        if (!container) {
            console.error('❌ Footer container not found! Make sure you have <div id="footer-container"></div> in your HTML.');
            return;
        }

        console.log('✅ Footer container found:', container);

        const footerHTML = generateFooter();
        container.innerHTML = footerHTML;

        console.log('✅ Footer inserted successfully! Year:', footerConfig.year);
    }

    // Try multiple loading strategies
    function init() {
        console.log('🦶 Footer init - Document state:', document.readyState);

        // Strategy 1: If DOM is already loaded
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            console.log('🦶 DOM already loaded, inserting footer immediately');
            insertFooter();
        }
        // Strategy 2: Wait for DOMContentLoaded
        else {
            console.log('🦶 Waiting for DOMContentLoaded...');
            document.addEventListener('DOMContentLoaded', function () {
                console.log('🦶 DOMContentLoaded fired');
                insertFooter();
            });
        }

        // Strategy 3: Backup - wait for full page load
        window.addEventListener('load', function () {
            const container = document.getElementById('footer-container');
            if (container && container.innerHTML.trim() === '') {
                console.log('🦶 Backup strategy: Inserting footer on window.load');
                insertFooter();
            }
        });
    }

    // Start initialization
    init();

    // Make it globally accessible for debugging
    window.debugFooter = {
        config: footerConfig,
        insert: insertFooter,
        generate: generateFooter
    };

    console.log('🦶 Footer.js initialization complete. Try window.debugFooter.insert() to manually insert.');
})();