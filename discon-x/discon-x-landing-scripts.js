/**
 * DiSCon-X Landing Page JavaScript
 * Modularized version with better separation of concerns
 */

// Use an IIFE to avoid global scope pollution
(function() {
    
    // Core application object
    const DisconX = {
        init: function() {
            // Initialize all modules
            MobileMenu.init();
            DarkMode.init();
            FaqAccordion.init();
            AuthModal.init();
            ArchitectureViewer.init();
            SmoothScroll.init();
            AnimationObserver.init();
            FormValidator.init();
        }
    };
    
    // Mobile Menu Module
    const MobileMenu = {
        elements: {
            btn: document.getElementById('mobile-menu-btn'),
            menu: document.getElementById('mobile-menu')
        },
        
        init: function() {
            if (!this.elements.btn || !this.elements.menu) return;
            
            this.bindEvents();
        },
        
        bindEvents: function() {
            this.elements.btn.addEventListener('click', this.toggleMenu.bind(this));
        },
        
        toggleMenu: function() {
            this.elements.menu.classList.toggle('mobile-menu-open');
        },
        
        close: function() {
            if (this.elements.menu.classList.contains('mobile-menu-open')) {
                this.elements.menu.classList.remove('mobile-menu-open');
            }
        }
    };
    
    // Dark Mode Module
    const DarkMode = {
        elements: {
            toggle: document.getElementById('dark-mode-toggle'),
            html: document.documentElement
        },
        
        init: function() {
            if (!this.elements.toggle) return;
            
            this.loadSavedPreference();
            this.bindEvents();
        },
        
        bindEvents: function() {
            this.elements.toggle.addEventListener('click', this.toggleDarkMode.bind(this));
        },
        
        loadSavedPreference: function() {
            if (localStorage.getItem("darkMode") === "enabled") {
                this.enableDarkMode();
            }
        },
        
        toggleDarkMode: function() {
            if (this.elements.html.classList.contains('dark')) {
                this.disableDarkMode();
            } else {
                this.enableDarkMode();
            }
        },
        
        enableDarkMode: function() {
            this.elements.html.classList.add('dark');
            
            const icon = this.elements.toggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                this.elements.toggle.setAttribute('aria-label', 'Toggle light mode');
            }
            
            localStorage.setItem('darkMode', 'enabled');
        },
        
        disableDarkMode: function() {
            this.elements.html.classList.remove('dark');
            
            const icon = this.elements.toggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                this.elements.toggle.setAttribute('aria-label', 'Toggle dark mode');
            }
            
            localStorage.setItem('darkMode', 'disabled');
        }
    };
    
    // FAQ Accordion Module
    const FaqAccordion = {
        elements: {
            buttons: document.querySelectorAll('[aria-controls^="faq-"]')
        },
        
        init: function() {
            if (!this.elements.buttons.length) return;
            
            this.bindEvents();
        },
        
        bindEvents: function() {
            this.elements.buttons.forEach(button => {
                button.addEventListener('click', this.toggleAccordion.bind(this, button));
            });
        },
        
        toggleAccordion: function(button) {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const controlsId = button.getAttribute('aria-controls');
            const content = document.getElementById(controlsId);
            
            button.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('hidden');
            
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down', isExpanded);
                icon.classList.toggle('fa-chevron-up', !isExpanded);
            }
        }
    };
    
    // Authentication Modal Module
    const AuthModal = {
        elements: {
            loginBtn: document.getElementById('login-btn'),
            signupBtn: document.getElementById('signup-btn'),
            modal: document.getElementById('auth-modal'),
            closeBtn: document.getElementById('close-modal'),
            switchToSignupLink: document.getElementById('switch-to-signup'),
            switchToLoginLink: document.getElementById('switch-to-login'),
            loginForm: document.getElementById('login-form'),
            signupForm: document.getElementById('signup-form'),
            modalTitle: document.getElementById('modal-title')
        },
        
        init: function() {
            if (!this.elements.modal) return;
            
            this.bindEvents();
        },
        
        bindEvents: function() {
            if (this.elements.loginBtn) {
                this.elements.loginBtn.addEventListener('click', this.showLogin.bind(this));
            }
            
            if (this.elements.signupBtn) {
                this.elements.signupBtn.addEventListener('click', this.showSignup.bind(this));
            }
            
            if (this.elements.closeBtn) {
                this.elements.closeBtn.addEventListener('click', this.closeModal.bind(this));
            }
            
            if (this.elements.switchToSignupLink) {
                this.elements.switchToSignupLink.addEventListener('click', this.switchToSignup.bind(this));
            }
            
            if (this.elements.switchToLoginLink) {
                this.elements.switchToLoginLink.addEventListener('click', this.switchToLogin.bind(this));
            }
            
            // Close when clicking outside
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.closeModal();
                }
            });
        },
        
        showLogin: function() {
            this.elements.loginForm.classList.remove('hidden');
            this.elements.signupForm.classList.add('hidden');
            this.elements.modalTitle.textContent = 'Log In';
            this.showModal();
        },
        
        showSignup: function() {
            this.elements.loginForm.classList.add('hidden');
            this.elements.signupForm.classList.remove('hidden');
            this.elements.modalTitle.textContent = 'Sign Up';
            this.showModal();
        },
        
        showModal: function() {
            this.elements.modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        },
        
        closeModal: function() {
            this.elements.modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        },
        
        switchToLogin: function(e) {
            if (e) e.preventDefault();
            this.elements.signupForm.classList.add('hidden');
            this.elements.loginForm.classList.remove('hidden');
            this.elements.modalTitle.textContent = 'Log In';
        },
        
        switchToSignup: function(e) {
            if (e) e.preventDefault();
            this.elements.loginForm.classList.add('hidden');
            this.elements.signupForm.classList.remove('hidden');
            this.elements.modalTitle.textContent = 'Sign Up';
        }
    };
    
    // Architecture Viewer Module
    const ArchitectureViewer = {
        elements: {
            img: document.getElementById('architecture-img'),
            container: document.getElementById('architecture-container'),
            zoomInBtn: document.getElementById('zoom-in'),
            zoomOutBtn: document.getElementById('zoom-out'),
            resetBtn: document.getElementById('zoom-reset')
        },
        
        // State variables
        state: {
            currentScale: 1,
            startX: 0,
            startY: 0,
            translateX: 0,
            translateY: 0,
            isDragging: false,
            touchStartX: 0,
            touchStartY: 0,
            initialDistance: null
        },
        
        init: function() {
            if (!this.elements.img || !this.elements.container) return;
            
            this.bindEvents();
        },
        
        bindEvents: function() {
            // Mouse events
            this.elements.container.addEventListener('mousedown', this.onMouseDown.bind(this));
            window.addEventListener('mousemove', this.onMouseMove.bind(this));
            window.addEventListener('mouseup', this.onMouseUp.bind(this));
            this.elements.container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
            this.elements.container.addEventListener('dblclick', this.onDoubleClick.bind(this));
            this.elements.container.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
            
            // Touch events
            this.elements.container.addEventListener('touchstart', this.onTouchStart.bind(this));
            this.elements.container.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
            this.elements.container.addEventListener('touchend', this.onTouchEnd.bind(this));
            
            // Button events
            if (this.elements.zoomInBtn) {
                this.elements.zoomInBtn.addEventListener('click', this.zoomIn.bind(this));
            }
            
            if (this.elements.zoomOutBtn) {
                this.elements.zoomOutBtn.addEventListener('click', this.zoomOut.bind(this));
            }
            
            if (this.elements.resetBtn) {
                this.elements.resetBtn.addEventListener('click', this.resetZoom.bind(this));
            }
        },
        
        updateTransform: function() {
            this.elements.img.style.transform = `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${this.state.currentScale})`;
        },
        
        zoomIn: function() {
            if (this.state.currentScale < 3) {
                this.state.currentScale += 0.25;
                this.updateTransform();
            }
        },
        
        zoomOut: function() {
            if (this.state.currentScale > 0.5) {
                this.state.currentScale -= 0.25;
                this.updateTransform();
            }
        },
        
        resetZoom: function() {
            this.state.currentScale = 1;
            this.state.translateX = 0;
            this.state.translateY = 0;
            this.updateTransform();
        },
        
        onMouseDown: function(e) {
            this.state.isDragging = true;
            this.state.startX = e.clientX - this.state.translateX;
            this.state.startY = e.clientY - this.state.translateY;
            this.elements.container.style.cursor = 'grabbing';
        },
        
        onMouseMove: function(e) {
            if (!this.state.isDragging) return;
            this.state.translateX = e.clientX - this.state.startX;
            this.state.translateY = e.clientY - this.state.startY;
            this.updateTransform();
        },
        
        onMouseUp: function() {
            this.state.isDragging = false;
            this.elements.container.style.cursor = 'move';
        },
        
        onMouseLeave: function() {
            this.state.isDragging = false;
            this.elements.container.style.cursor = 'move';
        },
        
        onDoubleClick: function(e) {
            e.preventDefault();
            this.zoomIn();
        },
        
        onWheel: function(e) {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        },
        
        onTouchStart: function(e) {
            if (e.touches.length === 1) {
                this.state.isDragging = true;
                this.state.touchStartX = e.touches[0].clientX - this.state.translateX;
                this.state.touchStartY = e.touches[0].clientY - this.state.translateY;
            } else if (e.touches.length === 2) {
                this.state.initialDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        },
        
        onTouchMove: function(e) {
            e.preventDefault();
            
            if (this.state.isDragging && e.touches.length === 1) {
                this.state.translateX = e.touches[0].clientX - this.state.touchStartX;
                this.state.translateY = e.touches[0].clientY - this.state.touchStartY;
                this.updateTransform();
            } else if (e.touches.length === 2 && this.state.initialDistance) {
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                
                const zoomFactor = currentDistance / this.state.initialDistance;
                this.state.currentScale = Math.max(0.5, Math.min(3, this.state.currentScale * zoomFactor));
                this.state.initialDistance = currentDistance;
                this.updateTransform();
            }
        },
        
        onTouchEnd: function() {
            this.state.isDragging = false;
            this.state.initialDistance = null;
        }
    };
    
    // Smooth Scroll Module
    const SmoothScroll = {
        init: function() {
            this.bindEvents();
        },
        
        bindEvents: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', this.scrollToElement.bind(this, anchor));
            });
        },
        
        scrollToElement: function(anchor, e) {
            if (anchor.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open (referencing the MobileMenu module)
                MobileMenu.close();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };
    
    // Animation Observer Module
    const AnimationObserver = {
        elements: {
            animated: document.querySelectorAll('.animate-on-scroll')
        },
        
        init: function() {
            if (!this.elements.animated.length) return;
            
            this.setupObserver();
        },
        
        setupObserver: function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            this.elements.animated.forEach(element => {
                observer.observe(element);
            });
        }
    };
    
    // Form Validation Module
    const FormValidator = {
        elements: {
            forms: document.querySelectorAll('form')
        },
        
        init: function() {
            if (!this.elements.forms.length) return;
            
            this.bindEvents();
        },
        
        bindEvents: function() {
            this.elements.forms.forEach(form => {
                form.addEventListener('submit', this.validateOnSubmit.bind(this, form));
                
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('blur', this.validateField.bind(this, input));
                });
            });
        },
        
        validateOnSubmit: function(form, e) {
            let valid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!this.validateField(input)) {
                    valid = false;
                }
            });
            
            if (!valid) {
                e.preventDefault();
            }
        },
        
        validateField: function(input) {
            let valid = true;
            
            // Required validation
            if (input.hasAttribute('required') && !input.value.trim()) {
                valid = false;
                this.showError(input, 'This field is required');
            } else {
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        valid = false;
                        this.showError(input, 'Please enter a valid email address');
                    } else {
                        this.clearError(input);
                    }
                } else {
                    this.clearError(input);
                }
            }
            
            return valid;
        },
        
        showError: function(input, message) {
            input.classList.add('border-red-500');
            
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'text-red-500 text-xs mt-1 error-message';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
            
            errorMsg.textContent = message;
            errorMsg.classList.remove('hidden');
        },
        
        clearError: function(input) {
            input.classList.remove('border-red-500');
            
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.classList.add('hidden');
            }
        }
    };
    
    // Initialize app on DOM content loaded
    document.addEventListener('DOMContentLoaded', DisconX.init);
    
})();