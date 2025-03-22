/**
 * DiSCon-X Landing Page JavaScript
 * This file contains all the JavaScript functionality for the DiSCon-X landing page
 */

document.addEventListener('DOMContentLoaded', function() {
    // ====================================
    // Mobile Menu Toggle
    // ====================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('mobile-menu-open');
        });
    }
    
    // ====================================
    // Dark Mode Toggle
    // ====================================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-mode');
            
            // Update icon
            const icon = darkModeToggle.querySelector('i');
            if (htmlElement.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
            }
        });
    }
    
    // ====================================
    // FAQ Accordion
    // ====================================
    const faqButtons = document.querySelectorAll('[aria-controls^="faq-"]');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const controlsId = button.getAttribute('aria-controls');
            const content = document.getElementById(controlsId);
            
            // Toggle current item
            button.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('hidden');
            
            // Update icon
            const icon = button.querySelector('i');
            if (!isExpanded) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // ====================================
    // Authentication Modal
    // ====================================
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.getElementById('close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const modalTitle = document.getElementById('modal-title');
    
    // Open login modal
    if (loginBtn && authModal && loginForm && signupForm && modalTitle) {
        loginBtn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            modalTitle.textContent = 'Log In';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Open signup modal
    if (signupBtn && authModal && loginForm && signupForm && modalTitle) {
        signupBtn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            modalTitle.textContent = 'Sign Up';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if (closeModal && authModal) {
        closeModal.addEventListener('click', () => {
            authModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Switch to login
    if (switchToLogin && loginForm && signupForm && modalTitle) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            modalTitle.textContent = 'Log In';
        });
    }
    
    // Switch to signup
    if (switchToSignup && loginForm && signupForm && modalTitle) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            modalTitle.textContent = 'Sign Up';
        });
    }
    
    // Close modal when clicking outside
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ====================================
    // System Architecture Zoom/Pan
    // ====================================
    const architectureImg = document.getElementById('architecture-img');
    const architectureContainer = document.getElementById('architecture-container');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    
    // Initialize zoom state
    let currentScale = 1;
    let startX;
    let startY;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    
    if (architectureImg && architectureContainer) {
        // Zoom in function
        function zoomIn() {
            if (currentScale < 3) { // Max zoom level
                currentScale += 0.25;
                updateTransform();
            }
        }
        
        // Zoom out function
        function zoomOut() {
            if (currentScale > 0.5) { // Min zoom level
                currentScale -= 0.25;
                updateTransform();
            }
        }
        
        // Reset zoom and position
        function resetZoom() {
            currentScale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
        }
        
        // Update the CSS transform property
        function updateTransform() {
            architectureImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
        }
        
        // Mouse down event for dragging
        architectureContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            architectureContainer.style.cursor = 'grabbing';
        });
        
        // Mouse move event for dragging
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        });
        
        // Mouse up event to stop dragging
        window.addEventListener('mouseup', () => {
            isDragging = false;
            architectureContainer.style.cursor = 'move';
        });
        
        // Mouse leave event to stop dragging
        architectureContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            architectureContainer.style.cursor = 'move';
        });
        
        // Double click to zoom in
        architectureContainer.addEventListener('dblclick', (e) => {
            e.preventDefault();
            zoomIn();
        });
        
        // Mouse wheel event for zooming
        architectureContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        }, { passive: false });
        
        // Touch events for mobile
        let touchStartX, touchStartY, initialDistance;
        
        architectureContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                // Single touch for panning
                isDragging = true;
                touchStartX = e.touches[0].clientX - translateX;
                touchStartY = e.touches[0].clientY - translateY;
            } else if (e.touches.length === 2) {
                // Two touches for pinch zoom
                initialDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        });
        
        architectureContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            
            if (isDragging && e.touches.length === 1) {
                // Panning with single touch
                translateX = e.touches[0].clientX - touchStartX;
                translateY = e.touches[0].clientY - touchStartY;
                updateTransform();
            } else if (e.touches.length === 2) {
                // Pinch zooming with two touches
                const currentDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                
                if (initialDistance) {
                    const zoomFactor = currentDistance / initialDistance;
                    const newScale = Math.max(0.5, Math.min(3, currentScale * zoomFactor));
                    currentScale = newScale;
                    initialDistance = currentDistance;
                    updateTransform();
                }
            }
        }, { passive: false });
        
        architectureContainer.addEventListener('touchend', () => {
            isDragging = false;
            initialDistance = null;
        });
        
        // Button event listeners
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', zoomIn);
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', zoomOut);
        }
        
        if (zoomResetBtn) {
            zoomResetBtn.addEventListener('click', resetZoom);
        }
    }
    
    // ====================================
    // Smooth scrolling for anchor links
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('mobile-menu-open')) {
                    mobileMenu.classList.remove('mobile-menu-open');
                }
                
                // Scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ====================================
    // Intersection Observer for animations
    // ====================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
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
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ====================================
    // Form validation
    // ====================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredInputs = this.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('border-red-500');
                    
                    // Create or show error message
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'text-red-500 text-xs mt-1 error-message';
                        errorMsg.textContent = 'This field is required';
                        input.parentNode.insertBefore(errorMsg, input.nextSibling);
                    } else {
                        errorMsg.classList.remove('hidden');
                    }
                } else {
                    input.classList.remove('border-red-500');
                    
                    // Hide error message if exists
                    const errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.classList.add('hidden');
                    }
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        valid = false;
                        input.classList.add('border-red-500');
                        
                        // Create or show error message
                        let errorMsg = input.nextElementSibling;
                        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                            errorMsg = document.createElement('p');
                            errorMsg.className = 'text-red-500 text-xs mt-1 error-message';
                            errorMsg.textContent = 'Please enter a valid email address';
                            input.parentNode.insertBefore(errorMsg, input.nextSibling);
                        } else {
                            errorMsg.textContent = 'Please enter a valid email address';
                            errorMsg.classList.remove('hidden');
                        }
                    }
                }
            });
            
            if (!valid) {
                e.preventDefault();
            }
        });
        
        // Real-time validation feedback
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('border-red-500');
                    
                    // Create or show error message
                    let errorMsg = this.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'text-red-500 text-xs mt-1 error-message';
                        errorMsg.textContent = 'This field is required';
                        this.parentNode.insertBefore(errorMsg, this.nextSibling);
                    } else {
                        errorMsg.classList.remove('hidden');
                    }
                } else {
                    this.classList.remove('border-red-500');
                    
                    // Hide error message if exists
                    const errorMsg = this.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.classList.add('hidden');
                    }
                }
            });
        });
    });
});