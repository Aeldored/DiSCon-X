/**
 * FAQ Accordion Component
 * Manages the FAQ accordion functionality
 */

// FAQ Accordion Module
const FaqAccordion = (function() {
    // Private variables
    const elements = {
      buttons: null,
      activeItem: null
    };
    
    // Configuration options
    const config = {
      allowMultiple: false, // Whether multiple items can be expanded at once
      initialItem: null,    // Index of item that should be open by default
      animationSpeed: 300   // Animation speed in milliseconds
    };
    
    // Initialize the module
    function init(options = {}) {
      // Override default config with passed options
      Object.assign(config, options);
      
      // Get DOM elements
      elements.buttons = document.querySelectorAll('.faq-button');
      
      if (!elements.buttons || elements.buttons.length === 0) {
        console.error('FAQ accordion elements not found');
        return;
      }
      
      // Bind events
      bindEvents();
      
      // Initialize any default open item
      if (config.initialItem !== null && config.initialItem < elements.buttons.length) {
        toggleAccordion(elements.buttons[config.initialItem]);
      }
      
      console.log('FAQ accordion initialized');
    }
    
    // Bind event listeners
    function bindEvents() {
      elements.buttons.forEach(button => {
        button.addEventListener('click', function() {
          toggleAccordion(this);
        });
        
        // Keyboard accessibility
        button.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion(this);
          }
        });
      });
    }
    
    // Toggle the accordion item
    function toggleAccordion(button) {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const controlsId = button.getAttribute('aria-controls');
      const content = document.getElementById(controlsId);
      
      if (!content) {
        console.error(`Content element with ID "${controlsId}" not found`);
        return;
      }
      
      // If we don't allow multiple open items, close the currently open one
      if (!config.allowMultiple && elements.activeItem && elements.activeItem !== button) {
        const activeControlsId = elements.activeItem.getAttribute('aria-controls');
        const activeContent = document.getElementById(activeControlsId);
        
        elements.activeItem.setAttribute('aria-expanded', 'false');
        activeContent.classList.add('hidden');
        
        // Update the icon
        const activeIcon = elements.activeItem.querySelector('i');
        if (activeIcon) {
          activeIcon.classList.remove('fa-chevron-up');
          activeIcon.classList.add('fa-chevron-down');
        }
      }
      
      // Toggle the clicked item
      button.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('hidden');
      
      // Update the icon
      const icon = button.querySelector('i');
      if (icon) {
        if (isExpanded) {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
        } else {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      }
      
      // If expanding, set as active item
      if (!isExpanded) {
        elements.activeItem = button;
        
        // Scroll into view if needed
        if (!isElementInViewport(content)) {
          content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else if (elements.activeItem === button) {
        elements.activeItem = null;
      }
      
      // Dispatch custom event
      button.dispatchEvent(new CustomEvent('faq:toggled', {
        bubbles: true,
        detail: {
          button: button,
          content: content,
          isExpanded: !isExpanded
        }
      }));
    }
    
    // Helper function to check if an element is in the viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Open a specific accordion item by ID
    function openItem(id) {
      const button = document.querySelector(`[aria-controls="${id}"]`);
      if (button && button.getAttribute('aria-expanded') !== 'true') {
        toggleAccordion(button);
      }
    }
    
    // Close a specific accordion item by ID
    function closeItem(id) {
      const button = document.querySelector(`[aria-controls="${id}"]`);
      if (button && button.getAttribute('aria-expanded') === 'true') {
        toggleAccordion(button);
      }
    }
    
    // Open all accordion items
    function openAll() {
      elements.buttons.forEach(button => {
        if (button.getAttribute('aria-expanded') !== 'true') {
          toggleAccordion(button);
        }
      });
    }
    
    // Close all accordion items
    function closeAll() {
      elements.buttons.forEach(button => {
        if (button.getAttribute('aria-expanded') === 'true') {
          toggleAccordion(button);
        }
      });
    }
    
    // Public API
    return {
      init,
      openItem,
      closeItem,
      openAll,
      closeAll
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    FaqAccordion.init();
  });