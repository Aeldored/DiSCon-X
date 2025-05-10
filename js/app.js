/**
 * DiSCon-X Main Application Module
 * This is the main entry point for the application
 */

// Main application object using revealing module pattern
const DisconX = (function() {
    // Private variables
    let initialized = false;
    function preloadCriticalComponents() {
      // Preload critical first-view components
      const criticalComponents = [
        'header-content',
        'hero-section',
        'search-section'
      ];
      
      // Check if ComponentLoader is available
      if (typeof ComponentLoader !== 'undefined' && ComponentLoader.fetchComponent) {
        criticalComponents.forEach(id => {
          const componentInfo = ComponentLoader.getComponentInfoById(id);
          if (componentInfo) {
            // Start loading the component but don't wait for it
            ComponentLoader.fetchComponent(componentInfo.componentUrl);
          }
        });
      }
    }
    // Initialize application
    function init() {
      // Prevent double initialization
      if (initialized) return;
      
      console.log('Initializing DiSCon-X application...');
      
      // Set initialized flag
      initialized = true;  

      // Preload critical components
      preloadCriticalComponents();
      
      // Check for user preferences
      checkUserPreferences();
      
      // Initialize core functionality
      // These will be called after components are loaded
    }
    function checkUserPreferences() {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      // Check for high contrast preference
      if (window.matchMedia('(prefers-contrast: more)').matches) {
        document.documentElement.classList.add('high-contrast');
      }
    }
    // Initialize after components are loaded
    function initAfterComponentsLoaded() {
      console.log('All components loaded, initializing modules...');
      
      // Initialize all modules
      try {
        if (MobileMenu && typeof MobileMenu.init === 'function') MobileMenu.init();
        if (DarkMode && typeof DarkMode.init === 'function') DarkMode.init();
        if (FaqAccordion && typeof FaqAccordion.init === 'function') FaqAccordion.init();
        if (AuthModal && typeof AuthModal.init === 'function' && !AuthModal.initialized) {
          console.log('Initializing Auth Modal');
          AuthModal.initialized = true;
        } else if (AuthModal) {
          console.log('Auth Modal already initialized');
        }
        if (ArchitectureViewer && typeof ArchitectureViewer.init === 'function') ArchitectureViewer.init();
        if (SmoothScroll && typeof SmoothScroll.init === 'function') SmoothScroll.init();
        if (AnimationObserver && typeof AnimationObserver.init === 'function') AnimationObserver.init();
        if (FormValidator && typeof FormValidator.init === 'function') FormValidator.init();
        
        console.log('All modules initialized successfully');
      } catch (error) {
        console.error('Error initializing modules:', error);
      }
      
      // Trigger any post-initialization tasks
      dispatchInitializedEvent();
    }
    
    // Dispatch event when application is fully initialized
    function dispatchInitializedEvent() {
      document.dispatchEvent(new CustomEvent('disconx:initialized', {
        detail: {
          timestamp: new Date().toISOString()
        }
      }));
      
      console.log('DiSCon-X application initialized');
    }
    
    // Handle errors globally
    function handleError(error, source) {
      console.error(`Error in ${source || 'application'}:`, error);
      
      // Could implement more sophisticated error handling here
      // Such as sending errors to a monitoring service
    }
    
    // Public API
    return {
      init,
      initAfterComponentsLoaded,
      handleError
    };
  })();
  
  // Initialize the application when DOM is ready
  document.addEventListener('DOMContentLoaded', DisconX.init);
  
  // Set up global error handler
  window.onerror = function(message, source, lineno, colno, error) {
    DisconX.handleError(error || message, source);
    // Return false to allow the default error handling to occur
    return false;
  };