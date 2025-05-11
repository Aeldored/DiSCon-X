/**
 * Header Initialization
 * Handles header-specific interactions including admin login
 */

const HeaderInit = (function() {
  function init() {
    bindAdminLoginEvents();
  }
  
  function bindAdminLoginEvents() {
    // Desktop admin login link
    const adminLoginLink = document.getElementById('admin-login-link');
    if (adminLoginLink) {
      adminLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (typeof AuthModal !== 'undefined' && AuthModal.showLogin) {
          AuthModal.showLogin();
        }
      });
    }
    
    // Mobile admin login link
    const mobileAdminLoginLink = document.getElementById('mobile-admin-login-link');
    if (mobileAdminLoginLink) {
      mobileAdminLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (typeof MobileMenu !== 'undefined' && MobileMenu.close) {
          MobileMenu.close();
        }
        if (typeof AuthModal !== 'undefined' && AuthModal.showLogin) {
          AuthModal.showLogin();
        }
      });
    }
  }
  
  return {
    init
  };
})();

// Initialize when components are loaded
document.addEventListener('components:allLoaded', function() {
  HeaderInit.init();
});