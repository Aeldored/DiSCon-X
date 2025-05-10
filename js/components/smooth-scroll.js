/**
 * Smooth Scroll Component
 * Handles smooth scrolling to anchor links
 */

// Smooth Scroll Module
const SmoothScroll = (function() {
    // Private variables
    const config = {
      duration: 800,      // Duration of scroll animation in milliseconds
      offset: 80,         // Offset in pixels from the top of the target element (for fixed headers)
      easing: 'easeInOutCubic'  // Easing function for animation
    };
    
    // Initialize the module
    function init(options = {}) {
      // Override default config with passed options
      Object.assign(config, options);
      
      // Bind events
      bindEvents();
      
      console.log('Smooth scroll initialized');
    }
    
    // Bind event listeners
    function bindEvents() {
      // Get all anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleLinkClick);
      });
    }
    
    // Handle anchor link click
    function handleLinkClick(e) {
      // Skip if the link is just '#'
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      
      // Get target element
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (typeof MobileMenu !== 'undefined' && MobileMenu.isMenuOpen && MobileMenu.isMenuOpen()) {
          MobileMenu.close();
        }
        
        // Scroll to target
        scrollToElement(targetElement);
        
        // Update URL hash without scrolling
        updateUrlHash(targetId);
      }
    }
    
    // Scroll to element
    function scrollToElement(element, customOffset) {
      // Get element position relative to viewport
      const rect = element.getBoundingClientRect();
      
      // Get current scroll position
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate target position with offset
      const offset = customOffset !== undefined ? customOffset : config.offset;
      const targetTop = rect.top + scrollTop - offset;
      
      // Animate scroll
      animate({
        duration: config.duration,
        timing: getEasingFunction(config.easing),
        draw: function(progress) {
          const currentPosition = scrollTop;
          const distance = targetTop - currentPosition;
          window.scrollTo(0, currentPosition + distance * progress);
        }
      });
      
      // Focus element for accessibility
      setTimeout(() => {
        element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
      }, config.duration);
    }
    
    // Update URL hash without scrolling
    function updateUrlHash(hash) {
      // Remove # if present
      const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
      
      // Update URL without scrolling
      if (history.pushState) {
        history.pushState(null, null, '#' + cleanHash);
      } else {
        // Fallback for older browsers
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        window.location.hash = cleanHash;
        window.scrollTo(0, scrollPosition);
      }
    }
    
    // Animation function
    function animate({ duration, timing, draw }) {
      const start = performance.now();
      
      requestAnimationFrame(function animate(time) {
        // Calculate progress
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        
        // Apply timing function
        const progress = timing(timeFraction);
        
        // Draw animation
        draw(progress);
        
        // Continue animation if not done
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
      });
    }
    
    // Easing functions
    function getEasingFunction(type) {
      const easingFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeInQuart: t => t * t * t * t,
        easeOutQuart: t => 1 - (--t) * t * t * t,
        easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
      };
      
      return easingFunctions[type] || easingFunctions.easeInOutCubic;
    }
    
    // Scroll to element programmatically
    function scrollTo(elementId, customOffset) {
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.error(`Element with ID "${elementId}" not found`);
        return;
      }
      
      scrollToElement(element, customOffset);
    }
    
    // Scroll to top
    function scrollToTop(customDuration) {
      animate({
        duration: customDuration || config.duration,
        timing: getEasingFunction(config.easing),
        draw: function(progress) {
          const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo(0, currentPosition * (1 - progress));
        }
      });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Public API
    return {
      init,
      scrollTo,
      scrollToTop,
      isInViewport
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    SmoothScroll.init();
  });