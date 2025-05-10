/**
 * Animation Observer Component
 * Uses Intersection Observer to trigger animations when elements become visible
 */

// Animation Observer Module
const AnimationObserver = (function() {
    // Private variables
    const elements = {
      animated: null
    };
    
    // Observer instance
    let observer = null;
    
    // Configuration options
    const config = {
      threshold: 0.1,        // Percentage of element visible before triggering animation
      rootMargin: '0px',     // Margin around the root
      animateOnce: true,     // Whether to animate elements only once
      visibleClass: 'animate-visible' // Class to add when element is visible
    };
    
    // Animation class mapping
    const animationClasses = {
      fade: {
        hidden: 'opacity-0',
        visible: 'opacity-100 transition-opacity duration-1000'
      },
      'fade-up': {
        hidden: 'opacity-0 translate-y-10',
        visible: 'opacity-100 translate-y-0 transition-all duration-1000'
      },
      'fade-down': {
        hidden: 'opacity-0 -translate-y-10',
        visible: 'opacity-100 translate-y-0 transition-all duration-1000'
      },
      'fade-left': {
        hidden: 'opacity-0 -translate-x-10',
        visible: 'opacity-100 translate-x-0 transition-all duration-1000'
      },
      'fade-right': {
        hidden: 'opacity-0 translate-x-10',
        visible: 'opacity-100 translate-x-0 transition-all duration-1000'
      },
      scale: {
        hidden: 'opacity-0 scale-95',
        visible: 'opacity-100 scale-100 transition-all duration-1000'
      },
      'scale-up': {
        hidden: 'opacity-0 scale-90',
        visible: 'opacity-100 scale-100 transition-all duration-1000'
      },
      'scale-down': {
        hidden: 'opacity-0 scale-110',
        visible: 'opacity-100 scale-100 transition-all duration-1000'
      }
    };
    
    // Initialize the module
    function init(options = {}) {
      // Override default config with passed options
      Object.assign(config, options);
      
      // Check if Intersection Observer is supported
      if (!('IntersectionObserver' in window)) {
        console.warn('Intersection Observer not supported. Animations will not be triggered on scroll.');
        return;
      }
      
      // Get all animated elements
      elements.animated = document.querySelectorAll('.animate-on-scroll');
      
      if (!elements.animated || elements.animated.length === 0) {
        console.log('No animated elements found');
        return;
      }
      
      // Create observer
      setupObserver();
      
      // Apply initial classes
      prepareElements();
      
      console.log(`Animation observer initialized for ${elements.animated.length} elements`);
    }
    
    // Prepare elements for animation
    function prepareElements() {
      elements.animated.forEach(element => {
        // Get animation type from data attribute or default to fade
        const animationType = element.dataset.animation || 'fade';
        
        // Get animation classes
        const classes = animationClasses[animationType] || animationClasses.fade;
        
        // Add hidden classes
        element.classList.add(classes.hidden);
        
        // Store visible classes for later
        element.dataset.visibleClasses = classes.visible;
        
        // Set animation delay if specified
        if (element.dataset.delay) {
          element.style.transitionDelay = `${element.dataset.delay}ms`;
        }
        
        // Set animation duration if specified
        if (element.dataset.duration) {
          element.style.transitionDuration = `${element.dataset.duration}ms`;
        }
      });
    }
    
    // Set up the Intersection Observer
    function setupObserver() {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      });
      
      // Observe each element
      elements.animated.forEach(element => {
        observer.observe(element);
      });
    }
    
    // Handle intersection events
    function handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible
          animateElement(entry.target);
          
          // Unobserve element if animating only once
          if (config.animateOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!config.animateOnce) {
          // Element is not visible and we're animating multiple times
          resetElement(entry.target);
        }
      });
    }
    
    // Animate the element
    function animateElement(element) {
      // Get animation classes from data attribute
      const visibleClasses = element.dataset.visibleClasses || '';
      
      // Add visible classes
      visibleClasses.split(' ').forEach(className => {
        if (className) element.classList.add(className);
      });
      
      // Remove hidden classes based on animation type
      const animationType = element.dataset.animation || 'fade';
      const classes = animationClasses[animationType] || animationClasses.fade;
      
      classes.hidden.split(' ').forEach(className => {
        if (className) element.classList.remove(className);
      });
      
      // Add visible class
      element.classList.add(config.visibleClass);
      
      // Dispatch custom event
      element.dispatchEvent(new CustomEvent('animation:started', {
        bubbles: true,
        detail: {
          element: element,
          animationType: animationType
        }
      }));
      
      // Listen for transition end to trigger completion event
      element.addEventListener('transitionend', function onTransitionEnd() {
        element.removeEventListener('transitionend', onTransitionEnd);
        
        // Dispatch custom event
        element.dispatchEvent(new CustomEvent('animation:completed', {
          bubbles: true,
          detail: {
            element: element,
            animationType: animationType
          }
        }));
      });
    }
    
    // Reset element for repeated animations
    function resetElement(element) {
      // Get animation classes from data attribute
      const visibleClasses = element.dataset.visibleClasses || '';
      
      // Remove visible classes
      visibleClasses.split(' ').forEach(className => {
        if (className) element.classList.remove(className);
      });
      
      // Add hidden classes based on animation type
      const animationType = element.dataset.animation || 'fade';
      const classes = animationClasses[animationType] || animationClasses.fade;
      
      classes.hidden.split(' ').forEach(className => {
        if (className) element.classList.add(className);
      });
      
      // Remove visible class
      element.classList.remove(config.visibleClass);
    }
    
    // Refresh observer (e.g., after dynamic content is added)
    function refresh() {
      // Disconnect existing observer
      if (observer) {
        observer.disconnect();
      }
      
      // Get all animated elements again
      elements.animated = document.querySelectorAll('.animate-on-scroll');
      
      // Prepare elements and create new observer
      prepareElements();
      setupObserver();
      
      console.log(`Animation observer refreshed for ${elements.animated.length} elements`);
    }
    
    // Animate a specific element programmatically
    function animateElementById(id) {
      const element = document.getElementById(id);
      
      if (!element) {
        console.error(`Element with ID "${id}" not found`);
        return;
      }
      
      // Add animate-on-scroll class if not present
      if (!element.classList.contains('animate-on-scroll')) {
        element.classList.add('animate-on-scroll');
        
        // Prepare element for animation
        const animationType = element.dataset.animation || 'fade';
        const classes = animationClasses[animationType] || animationClasses.fade;
        
        element.classList.add(classes.hidden);
        element.dataset.visibleClasses = classes.visible;
      }
      
      // Animate element
      animateElement(element);
    }
    
    // Add custom animation type
    function addAnimationType(name, hiddenClasses, visibleClasses) {
      if (!name || !hiddenClasses || !visibleClasses) {
        console.error('Animation type requires name, hidden classes, and visible classes');
        return;
      }
      
      animationClasses[name] = {
        hidden: hiddenClasses,
        visible: visibleClasses
      };
      
      console.log(`Added custom animation type: ${name}`);
    }
    
    // Public API
    return {
      init,
      refresh,
      animateElementById,
      addAnimationType
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    AnimationObserver.init();
  });