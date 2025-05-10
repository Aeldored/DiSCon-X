/**
 * Dark Mode Component
 * Manages the dark mode theme functionality
 */

// Dark Mode Module
const DarkMode = (function() {
    // Private variables
    const elements = {
      toggleBtn: null,
      mobileToggleBtn: null,
      html: document.documentElement
    };
    
    const STORAGE_KEY = 'discon-x-dark-mode';
    
    // Initialize the module
    function init() {
      // Get DOM elements
      elements.toggleBtn = document.getElementById('dark-mode-toggle');
      elements.mobileToggleBtn = document.getElementById('mobile-dark-mode-toggle');
      
      // Check if we have the toggle button
      if (!elements.toggleBtn) {
        console.error('Dark mode toggle button not found');
        return;
      }
      
      // Load the user's preferred theme
      loadUserPreference();
      
      // Bind events
      bindEvents();
      
      console.log('Dark mode initialized');
    }
    
    // Bind event listeners
    function bindEvents() {
      // Desktop toggle button
      elements.toggleBtn.addEventListener('click', toggle);
      
      // Mobile toggle button (if exists)
      if (elements.mobileToggleBtn) {
        elements.mobileToggleBtn.addEventListener('click', toggle);
      }
      
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemPreferenceChange);
    }
    
    // Toggle dark mode
    function toggle() {
      if (isDarkMode()) {
        disable();
      } else {
        enable();
      }
    }
    
    // Enable dark mode
    function enable() {
      elements.html.classList.add('dark');
      updateIcons(true);
      saveUserPreference('dark');
      
      // Dispatch event for other components to respond
      document.dispatchEvent(new CustomEvent('darkmode:enabled'));
    }
    
    // Disable dark mode
    function disable() {
      elements.html.classList.remove('dark');
      updateIcons(false);
      saveUserPreference('light');
      
      // Dispatch event for other components to respond
      document.dispatchEvent(new CustomEvent('darkmode:disabled'));
    }
    
    // Update toggle button icons
    function updateIcons(isDark) {
      // Update desktop toggle icon
      if (elements.toggleBtn) {
        const icon = elements.toggleBtn.querySelector('i');
        if (icon) {
          if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            elements.toggleBtn.setAttribute('aria-label', 'Switch to light mode');
          } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            elements.toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
          }
        }
      }
      
      // Update mobile toggle icon
      if (elements.mobileToggleBtn) {
        const mobileIcon = elements.mobileToggleBtn.querySelector('i');
        if (mobileIcon) {
          if (isDark) {
            mobileIcon.classList.remove('fa-moon');
            mobileIcon.classList.add('fa-sun');
          } else {
            mobileIcon.classList.remove('fa-sun');
            mobileIcon.classList.add('fa-moon');
          }
        }
      }
    }
    
    // Save user preference to localStorage
    function saveUserPreference(theme) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        console.error('Failed to save theme preference to localStorage:', error);
      }
    }
    
    // Load user preference from localStorage
    function loadUserPreference() {
      try {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        
        if (savedTheme === 'dark') {
          enable();
        } else if (savedTheme === 'light') {
          disable();
        } else {
          // If no saved preference, use system preference
          useSystemPreference();
        }
      } catch (error) {
        console.error('Failed to load theme preference from localStorage:', error);
        useSystemPreference();
      }
    }
    
    // Use system color scheme preference
    function useSystemPreference() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enable();
      } else {
        disable();
      }
    }
    
    // Handle system preference change
    function handleSystemPreferenceChange(e) {
      // Only automatically switch if the user hasn't set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        if (e.matches) {
          enable();
        } else {
          disable();
        }
      }
    }
    
    // Check if dark mode is currently active
    function isDarkMode() {
      return elements.html.classList.contains('dark');
    }
    
    // Public API
    return {
      init,
      toggle,
      enable,
      disable,
      isDarkMode
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    DarkMode.init();
  });