// Enhanced Lightbox Gallery with Navigation
class LightboxGallery {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.attachEventListeners();
    }

    createLightboxHTML() {
        if (document.getElementById('lightbox-modal')) return;

        const lightboxHTML = `
            <div id="lightbox-modal" class="lightbox-modal" onclick="lightbox.handleBackdropClick(event)">
                <span class="lightbox-close" onclick="lightbox.close()">&times;</span>
                <div class="lightbox-counter" id="lightbox-counter"></div>
                <div class="lightbox-content">
                    <button class="lightbox-nav lightbox-prev" onclick="lightbox.prev()">&#10094;</button>
                    <img class="lightbox-img" id="lightbox-img" alt="Property image">
                    <button class="lightbox-nav lightbox-next" onclick="lightbox.next()">&#10095;</button>
                </div>
                <div class="lightbox-caption" id="lightbox-caption"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    attachEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('lightbox-modal');
            if (!modal || !modal.style.display || modal.style.display === 'none') return;

            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'Escape') this.close();
        });

        // Collect all gallery images on page load
        this.collectGalleryImages();
    }

    collectGalleryImages() {
        const galleryItems = document.querySelectorAll('.gallery-item img, .property-card-img');
        this.images = Array.from(galleryItems).map(img => ({
            src: img.src,
            alt: img.alt || 'Property image'
        }));
    }

    open(src, caption = '', imageArray = null) {
        const modal = document.getElementById('lightbox-modal');
        const img = document.getElementById('lightbox-img');
        const captionEl = document.getElementById('lightbox-caption');

        if (imageArray) {
            this.images = imageArray;
            this.currentIndex = this.images.findIndex(img => img.src === src);
        } else {
            this.currentIndex = this.images.findIndex(img => img.src === src);
        }

        if (this.currentIndex === -1) {
            this.images.push({ src, alt: caption });
            this.currentIndex = this.images.length - 1;
        }

        modal.style.display = 'block';
        img.src = src;
        captionEl.textContent = caption;
        this.updateCounter();
        document.body.style.overflow = 'hidden';
    }

    close() {
        const modal = document.getElementById('lightbox-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    handleBackdropClick(event) {
        if (event.target.id === 'lightbox-modal') {
            this.close();
        }
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const img = document.getElementById('lightbox-img');
        const captionEl = document.getElementById('lightbox-caption');
        const current = this.images[this.currentIndex];

        img.style.opacity = '0';
        setTimeout(() => {
            img.src = current.src;
            captionEl.textContent = current.alt;
            img.style.opacity = '1';
            this.updateCounter();
        }, 150);
    }

    updateCounter() {
        const counter = document.getElementById('lightbox-counter');
        if (counter) {
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        }
    }
}

// Initialize lightbox
let lightbox;
document.addEventListener('DOMContentLoaded', () => {
    lightbox = new LightboxGallery();
});

// Search and Filter functionality
function initSearchFilter() {
    const searchInput = document.getElementById('property-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const properties = document.querySelectorAll('.property-card, .gallery-item');

        properties.forEach(property => {
            const title = property.querySelector('.property-card-title, .gallery-overlay')?.textContent.toLowerCase() || '';
            const text = property.querySelector('.property-card-text')?.textContent.toLowerCase() || '';

            if (title.includes(searchTerm) || text.includes(searchTerm)) {
                property.style.display = '';
                property.classList.add('fade-in');
            } else {
                property.style.display = 'none';
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            // Don't prevent default for external links or special cases
            if (href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.property-card, .team-member, .service-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// WhatsApp link handler - Updated to not use querySelector on URLs
function initWhatsAppLinks() {
    const phoneNumber = "639276154651";
    const message = "Hello, I'm interested in learning more about your listings. Could you please provide more details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Find all WhatsApp links by their ID or class
    const whatsappElements = document.querySelectorAll('#whatsappLink, .whatsapp-link');
    whatsappElements.forEach(link => {
        if (link && link.tagName === 'A') {
            link.href = whatsappLink;
        }
    });
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSearchFilter();
    initBackToTop();
    initSmoothScroll();
    initScrollAnimations();
    initWhatsAppLinks();
    initLazyLoading();

    // Add click handlers for gallery items
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            if (lightbox) {
                lightbox.open(img.src, img.alt);
            }
        });
    });

    // Add click handlers for property card images
    document.querySelectorAll('.property-card-img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            if (lightbox) {
                lightbox.open(img.src, img.alt);
            }
        });
    });
});

// Legacy function for backward compatibility
function openModal(src, title) {
    if (lightbox) {
        const fullSrc = src.startsWith('/') ? src : '/' + src;
        lightbox.open(fullSrc, title);
    }
}

function closeModal() {
    if (lightbox) {
        lightbox.close();
    }
}

function closeModalOnOutsideClick(event) {
    if (lightbox && event.target.classList.contains('lightbox-modal')) {
        lightbox.close();
    }
}