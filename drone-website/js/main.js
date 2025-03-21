// Main JavaScript functionality for DroneX website

// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Scroll animations
const handleScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-fade-in');
        }
    });
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    window.addEventListener('scroll', debounce(handleScrollAnimations, 15));
    
    // Initialize components
    new MobileMenu();
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator(contactForm);
    }
    new PortfolioFilter();
    new VideoModal();
});

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.button = document.querySelector('.mobile-menu-button');
        this.menu = document.querySelector('.mobile-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.button && this.menu) {
            this.button.addEventListener('click', () => this.toggle());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.button.contains(e.target) && !this.menu.contains(e.target)) {
                    this.close();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            });
        }
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.menu.classList.remove('hidden');
        this.isOpen = true;
    }
    
    close() {
        this.menu.classList.add('hidden');
        this.isOpen = false;
    }
}

// Form validation
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputValidation();
    }
    
    setupInputValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
            input.addEventListener('blur', () => this.validateInput(input));
        });
    }
    
    validateInput(input) {
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        this.clearError(input);
        
        // Required field validation
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^\+?[\d\s-()]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        if (!isValid) {
            this.showError(input, errorMessage);
        }
        
        return isValid;
    }
    
    showError(input, message) {
        const errorElement = input.nextElementSibling;
        input.classList.add('border-red-500');
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }
    
    clearError(input) {
        const errorElement = input.nextElementSibling;
        input.classList.remove('border-red-500');
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.classList.add('hidden');
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(this.form);
        
        // Validate all inputs
        this.form.querySelectorAll('input, textarea, select').forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.form.reset();
        }
    }
}

// Portfolio filtering
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        
        this.init();
    }
    
    init() {
        if (this.filterButtons.length && this.portfolioItems.length) {
            this.filterButtons.forEach(button => {
                button.addEventListener('click', () => this.filterItems(button));
            });
        }
    }
    
    filterItems(clickedButton) {
        const filter = clickedButton.getAttribute('data-filter');
        
        // Update active button state
        this.filterButtons.forEach(button => {
            button.classList.remove('bg-blue-600', 'text-white');
            button.classList.add('bg-gray-200', 'text-gray-700');
        });
        clickedButton.classList.remove('bg-gray-200', 'text-gray-700');
        clickedButton.classList.add('bg-blue-600', 'text-white');
        
        // Filter items
        this.portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.classList.add('animate-fade-in');
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Video modal functionality
class VideoModal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalVideo = document.querySelector('#modal-video');
        this.modalTitle = document.querySelector('#modal-title');
        this.modalDescription = document.querySelector('#modal-description');
        this.closeButton = document.querySelector('.modal-close');
        
        this.init();
    }
    
    init() {
        if (this.modal) {
            // Setup project view buttons
            document.querySelectorAll('.view-project').forEach(button => {
                button.addEventListener('click', () => this.openModal(button));
            });
            
            // Setup close button
            if (this.closeButton) {
                this.closeButton.addEventListener('click', () => this.closeModal());
            }
            
            // Close on overlay click
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            });
        }
    }
    
    openModal(button) {
        const videoSrc = button.getAttribute('data-video');
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-description');
        
        if (this.modalVideo) this.modalVideo.src = videoSrc;
        if (this.modalTitle) this.modalTitle.textContent = title;
        if (this.modalDescription) this.modalDescription.textContent = description;
        
        this.modal.classList.remove('opacity-0', 'pointer-events-none');
        document.body.classList.add('modal-active');
    }
    
    closeModal() {
        this.modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('modal-active');
        
        if (this.modalVideo) {
            this.modalVideo.pause();
            this.modalVideo.currentTime = 0;
        }
    }
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});