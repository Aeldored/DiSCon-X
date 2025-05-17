/**
 * Development Modal Component
 * Shows a modal notifying users that the application is still under development
 */

// Development Modal Module
const DevelopmentModal = (function() {
    // Private variables
    const elements = {
      getProtectedBtn: null,
      devModal: null,
      closeDevModalBtn: null,
      closeXBtn: null
    };
    
    // Initialize the module
    function init() {
      // Get DOM elements
      elements.getProtectedBtn = document.getElementById('get-protected-btn');
      elements.devModal = document.getElementById('dev-modal');
      elements.closeDevModalBtn = document.getElementById('close-dev-modal');
      elements.closeXBtn = document.getElementById('close-x-btn');
      
      if (!elements.getProtectedBtn || !elements.devModal) {
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
      
      // Close modal buttons
      if (elements.closeDevModalBtn) {
        elements.closeDevModalBtn.addEventListener('click', closeModal);
      }
      
      if (elements.closeXBtn) {
        elements.closeXBtn.addEventListener('click', closeModal);
      }
      
      // Close modal when clicking on backdrop
      elements.devModal.addEventListener('click', function(e) {
        if (e.target === elements.devModal) {
          closeModal();
        }
      });
      
      // Close modal with Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !elements.devModal.classList.contains('opacity-0')) {
          closeModal();
        }
      });
    }
    
    // Open modal
    function openModal() {
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
      
      // Show the modal
      elements.devModal.classList.remove('opacity-0', 'pointer-events-none');
      
      // Scale up the modal content for nice animation
      setTimeout(() => {
        elements.devModal.querySelector('.transform').classList.remove('scale-90');
      }, 10);
    }
    
    // Close modal
    function closeModal() {
      // Scale down first (for animation)
      elements.devModal.querySelector('.transform').classList.add('scale-90');
      
      // Hide the modal
      setTimeout(() => {
        elements.devModal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
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