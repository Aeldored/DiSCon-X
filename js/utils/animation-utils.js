/**
 * Animation Utilities
 * Helper functions for animations and transitions
 */

// Animation Utilities Module
const AnimationUtils = (function() {
    /**
     * Animate a property from start to end value
     * @param {Object} options - Animation options
     * @param {number} options.duration - Duration in milliseconds
     * @param {function} options.easing - Easing function
     * @param {function} options.onUpdate - Update callback function(value, progress)
     * @param {function} [options.onComplete] - Complete callback function
     * @param {number} [options.from=0] - Start value
     * @param {number} [options.to=1] - End value
     * @returns {Object} - Animation controller
     */
    function animate(options) {
      const {
        duration = 300,
        easing = t => t,
        onUpdate,
        onComplete,
        from = 0,
        to = 1
      } = options;
      
      const startTime = performance.now();
      let animationFrame = null;
      let isCancelled = false;
      
      // Run animation frame
      function tick(currentTime) {
        if (isCancelled) return;
        
        // Calculate progress (0 to 1)
        let progress = (currentTime - startTime) / duration;
        
        // Clamp progress
        progress = Math.min(1, Math.max(0, progress));
        
        // Apply easing function
        const easedProgress = easing(progress);
        
        // Calculate current value
        const value = from + (to - from) * easedProgress;
        
        // Call update callback
        onUpdate(value, easedProgress);
        
        // Continue animation if not complete
        if (progress < 1) {
          animationFrame = requestAnimationFrame(tick);
        } else if (onComplete) {
          // Call complete callback
          onComplete();
        }
      }
      
      // Start animation
      animationFrame = requestAnimationFrame(tick);
      
      // Return controller
      return {
        // Cancel animation
        cancel() {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
          isCancelled = true;
        }
      };
    }
    
    /**
     * Fade in an element
     * @param {Element} element - Element to fade in
     * @param {Object} [options] - Animation options
     * @param {number} [options.duration=300] - Duration in milliseconds
     * @param {function} [options.easing] - Easing function
     * @param {function} [options.onComplete] - Complete callback
     * @returns {Object} - Animation controller
     */
    function fadeIn(element, options = {}) {
      // Set initial style
      element.style.opacity = '0';
      element.style.display = options.display || 'block';
      
      // Animate opacity
      return animate({
        duration: options.duration || 300,
        easing: options.easing || easeOutQuad,
        onUpdate(value) {
          element.style.opacity = value;
        },
        onComplete: options.onComplete
      });
    }
    
    /**
     * Fade out an element
     * @param {Element} element - Element to fade out
     * @param {Object} [options] - Animation options
     * @param {number} [options.duration=300] - Duration in milliseconds
     * @param {function} [options.easing] - Easing function
     * @param {function} [options.onComplete] - Complete callback
     * @returns {Object} - Animation controller
     */
    function fadeOut(element, options = {}) {
      // Set initial style
      element.style.opacity = '1';
      
      // Animate opacity
      return animate({
        duration: options.duration || 300,
        easing: options.easing || easeOutQuad,
        onUpdate(value) {
          element.style.opacity = 1 - value;
        },
        onComplete() {
          element.style.display = 'none';
          if (options.onComplete) options.onComplete();
        }
      });
    }
    
    /**
     * Slide down an element
     * @param {Element} element - Element to slide down
     * @param {Object} [options] - Animation options
     * @param {number} [options.duration=300] - Duration in milliseconds
     * @param {function} [options.easing] - Easing function
     * @param {function} [options.onComplete] - Complete callback
     * @returns {Object} - Animation controller
     */
    function slideDown(element, options = {}) {
        // Get target height
        const height = getTargetHeight(element);
        
        // Set initial style
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = options.display || 'block';
        element.style.opacity = '0';
        
        // Force browser to recognize element before animating
        // This allows for GPU acceleration
        element.getBoundingClientRect();
        
        // Add CSS transform for GPU acceleration
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'opacity';
        
        // Animate height and opacity
        return animate({
          duration: options.duration || 300,
          easing: options.easing || easeOutQuad,
          onUpdate(value) {
            element.style.height = `${height * value}px`;
            element.style.opacity = value;
          },
          onComplete() {
            // Reset height to auto
            element.style.height = 'auto';
            element.style.overflow = '';
            element.style.willChange = 'auto';
            if (options.onComplete) options.onComplete();
          }
        });
    }
    
    /**
     * Slide up an element
     * @param {Element} element - Element to slide up
     * @param {Object} [options] - Animation options
     * @param {number} [options.duration=300] - Duration in milliseconds
     * @param {function} [options.easing] - Easing function
     * @param {function} [options.onComplete] - Complete callback
     * @returns {Object} - Animation controller
     */
    function slideUp(element, options = {}) {
      // Get current height
      const height = element.offsetHeight;
      
      // Set initial style
      element.style.height = `${height}px`;
      element.style.overflow = 'hidden';
      
      // Animate height and opacity
      return animate({
        duration: options.duration || 300,
        easing: options.easing || easeOutQuad,
        onUpdate(value) {
          element.style.height = `${height * (1 - value)}px`;
          element.style.opacity = 1 - value;
        },
        onComplete() {
          element.style.display = 'none';
          element.style.height = '';
          element.style.overflow = '';
          if (options.onComplete) options.onComplete();
        }
      });
    }
    
    /**
     * Toggle slide an element
     * @param {Element} element - Element to toggle
     * @param {Object} [options] - Animation options
     * @param {number} [options.duration=300] - Duration in milliseconds
     * @param {function} [options.easing] - Easing function
     * @param {function} [options.onComplete] - Complete callback
     * @returns {Object} - Animation controller
     */
    function slideToggle(element, options = {}) {
      // Check if element is visible
      const isHidden = element.offsetParent === null || 
                       window.getComputedStyle(element).display === 'none';
      
      // Toggle element
      return isHidden ? 
        slideDown(element, options) : 
        slideUp(element, options);
    }
    
    /**
     * Get target height of an element
     * @private
     * @param {Element} element - Element to measure
     * @returns {number} - Element height
     */
    function getTargetHeight(element) {
      // Clone element for measuring
      const clone = element.cloneNode(true);
      
      // Set styles for measuring
      clone.style.display = 'block';
      clone.style.height = 'auto';
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.pointerEvents = 'none';
      
      // Add to DOM
      document.body.appendChild(clone);
      
      // Measure height
      const height = clone.offsetHeight;
      
      // Remove clone
      document.body.removeChild(clone);
      
      return height;
    }
    
    // Easing functions
    
    /**
     * Linear easing
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function linear(t) {
      return t;
    }
    
    /**
     * Quadratic ease in
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeInQuad(t) {
      return t * t;
    }
    
    /**
     * Quadratic ease out
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeOutQuad(t) {
      return t * (2 - t);
    }
    
    /**
     * Quadratic ease in-out
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    /**
     * Cubic ease in
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeInCubic(t) {
      return t * t * t;
    }
    
    /**
     * Cubic ease out
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeOutCubic(t) {
      return (--t) * t * t + 1;
    }
    
    /**
     * Cubic ease in-out
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeInOutCubic(t) {
      return t < 0.5 ?
        4 * t * t * t :
        (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    /**
     * Elastic ease out
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeOutElastic(t) {
      const p = 0.3;
      return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    }
    
    /**
     * Bounce ease out
     * @param {number} t - Progress (0 to 1)
     * @returns {number} - Eased value
     */
    function easeOutBounce(t) {
      if (t < (1 / 2.75)) {
        return 7.5625 * t * t;
      } else if (t < (2 / 2.75)) {
        return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
      } else if (t < (2.5 / 2.75)) {
        return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
      } else {
        return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
      }
    }
    
    // Public API
    return {
      animate,
      fadeIn,
      fadeOut,
      slideDown,
      slideUp,
      slideToggle,
      easing: {
        linear,
        easeInQuad,
        easeOutQuad,
        easeInOutQuad,
        easeInCubic,
        easeOutCubic,
        easeInOutCubic,
        easeOutElastic,
        easeOutBounce
      }
    };
  })();
  
  // Make utilities available globally
  window.AnimationUtils = AnimationUtils;