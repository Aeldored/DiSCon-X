/**
 * Mobile Menu Component
 * Manages the mobile navigation menu functionality
 */

// Mobile Menu Module
const MobileMenu = (function() {
    // Private variables
    const elements = {
      menuBtn: null,
      menu: null,
      menuLinks: null,
      mobileDarkModeToggle: null
    };
    
    let isOpen = false;
    
    // Initialize the module
    function init() {
      // Get DOM elements
      elements.menuBtn = document.getElementById('mobile-menu-btn');
      elements.menu = document.getElementById('mobile-menu');
      elements.mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
      
      if (!elements.menuBtn || !elements.menu) {
        console.error('Mobile menu elements not found');
        return;
      }
      
      // Get menu links after components are loaded
      elements.menuLinks = elements.menu.querySelectorAll('a');
      
      // Bind events
      bindEvents();
      
      console.log('Mobile menu initialized');
    }
    
    // Bind event listeners
    function bindEvents() {
      elements.menuBtn.addEventListener('click', toggleMenu);
      
      // Close menu when clicking a link
      if (elements.menuLinks) {
        elements.menuLinks.forEach(link => {
          link.addEventListener('click', close);
        });
      }
      
      // Handle mobile dark mode toggle
      if (elements.mobileDarkModeToggle) {
        elements.mobileDarkModeToggle.addEventListener('click', function() {
          // If DarkMode module exists, use it to toggle
          if (typeof DarkMode !== 'undefined' && DarkMode.toggle) {
            DarkMode.toggle();
          } else {
            // Fallback if DarkMode module is not available
            document.documentElement.classList.toggle('dark');
          }
          
          close();
        });
      }
      
      // Close menu on window resize if viewport width is desktop size
      window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isOpen) {
          close();
        }
      });
      
      // Close menu when user clicks outside
      document.addEventListener('click', function(e) {
        if (isOpen &&
            !elements.menu.contains(e.target) &&
            !elements.menuBtn.contains(e.target)) {
          close();
        }
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
          close();
        }
      });
      // Add login/signup functionality to mobile menu buttons
      const mobileLoginBtn = elements.menu.querySelector('button:nth-of-type(1)');
      const mobileSignupBtn = elements.menu.querySelector('button:nth-of-type(2)');

      if (mobileLoginBtn && typeof AuthModal !== 'undefined' && AuthModal.showLogin) {
        mobileLoginBtn.addEventListener('click', function() {
          close(); // Close mobile menu
          AuthModal.showLogin(); // Open login modal
        });
      }

      if (mobileSignupBtn && typeof AuthModal !== 'undefined' && AuthModal.showSignup) {
        mobileSignupBtn.addEventListener('click', function() {
          close(); // Close mobile menu
          AuthModal.showSignup(); // Open signup modal
        });
      }
    }
    
    // Toggle menu visibility
    function toggleMenu() {
      if (isOpen) {
        close();
      } else {
        open();
      }
    }
    
    // Open the mobile menu
    function open() {
      elements.menu.classList.add('mobile-menu-open');
      elements.menuBtn.setAttribute('aria-expanded', 'true');
      
      // Change icon to close icon
      const icon = elements.menuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      }
      
      isOpen = true;
      
      // Trap focus inside menu for accessibility
      trapFocus();
    }
    
    // Close the mobile menu
    function close() {
      elements.menu.classList.remove('mobile-menu-open');
      elements.menuBtn.setAttribute('aria-expanded', 'false');
      
      // Change icon back to menu icon
      const icon = elements.menuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      isOpen = false;
    }
    
    // Handle keyboard navigation for accessibility
    function trapFocus() {
      // Implementation of focus trapping for accessibility
      // This keeps keyboard focus inside the menu when it's open
    }
    
    // Check if menu is open
    function isMenuOpen() {
      return isOpen;
    }
    
    // Public API
    return {
      init,
      open,
      close,
      toggleMenu,
      isMenuOpen
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    MobileMenu.init();
  });