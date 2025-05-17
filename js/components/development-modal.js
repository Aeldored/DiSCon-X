/**
 * Development Modal Component
 * Shows a modal notifying users that the application is still under development
 */

// Development Modal Module
const DevelopmentModal = (function() {
    // Private variables
    const elements = {
      getProtectedBtn: null,
      modal: null,
      backdrop: null,
      closeBtn: null,
      xBtn: null,
      learnMoreBtn: null
    };
    
    // Store original scroll position
    let scrollPosition = 0;
    
    // Initialize the module
    function init() {
      // Get DOM elements
      elements.getProtectedBtn = document.getElementById('get-protected-btn');
      elements.modal = document.getElementById('dev-modal');
      elements.backdrop = document.getElementById('dev-modal-backdrop'); 
      elements.closeBtn = document.getElementById('close-dev-modal');
      elements.xBtn = document.getElementById('close-x-btn');
      elements.learnMoreBtn = document.getElementById('learn-more-modal-btn');
      
      if (!elements.getProtectedBtn || !elements.modal) {
        console.error('Development modal elements not found');
        return;
      }
      
      // Bind events
      bindEvents();
      
      console.log('Development modal initialized');
    }
    
    // Bind event listeners
    function bindEvents() {
      // Open modal when clicking the Get Protected Now button
      elements.getProtectedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
      
      // Close on backdrop click
      elements.backdrop.addEventListener('click', closeModal);
      
      // Close button
      elements.closeBtn.addEventListener('click', closeModal);
      
      // X button
      elements.xBtn.addEventListener('click', closeModal);
      
      // Learn More button
      elements.learnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        closeModal();
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
      
      // Close with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !elements.modal.classList.contains('hidden')) {
          closeModal();
        }
      });
    }
    
    // Lock body scroll
    function lockBodyScroll() {
      // Save current scroll position
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply scroll lock styles
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      
      // Add padding to right to prevent layout shift when scrollbar disappears
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    
    // Unlock body scroll
    function unlockBodyScroll() {
      // Remove scroll lock styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollPosition);
    }
    
    // Open the modal
    function openModal() {
      // Lock body scroll first
      lockBodyScroll();
      
      // Show the modal
      elements.modal.classList.remove('hidden');
      
      // Add entrance animation
      const modalContent = elements.modal.querySelector('.transform');
      modalContent.classList.add('scale-95', 'opacity-0');
      
      // Trigger animation after a tiny delay
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
      }, 10);
    }
    
    // Close the modal
    function closeModal() {
      const modalContent = elements.modal.querySelector('.transform');
      
      // Add exit animation
      modalContent.classList.add('scale-95', 'opacity-0');
      
      // Wait for animation to complete
      setTimeout(() => {
        // Hide the modal
        elements.modal.classList.add('hidden');
        
        // Restore body scrolling
        unlockBodyScroll();
        
        // Reset animation state
        modalContent.classList.remove('scale-95', 'opacity-0');
      }, 200);
    }
    
    // Public API
    return {
      init,
      openModal,
      closeModal
    };
})();

// Initialize when components are loaded
document.addEventListener('components:allLoaded', function() {
  DevelopmentModal.init();
});