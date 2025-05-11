/**
 * Auth Modal Component
 * Handles login and signup modal functionality
 */
const AuthModal = (function() {
  let isOpen = false;
  let currentForm = 'login';
  
  // Initialize the modal
  function init() {
    // Create modal HTML dynamically to ensure it exists
    createModal();
    bindEvents();
    console.log('Auth Modal initialized');
  }
  
  // Create the modal HTML
  function createModal() {
    const modalHTML = `
      <div id="auth-modal" class="auth-modal-overlay">
        <div class="auth-modal-container">
          <button class="auth-modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="auth-modal-content">
            <h2 class="auth-modal-title" id="modal-title">Log In</h2>
            
            <!-- Login Form -->
            <form id="login-form" class="auth-form">
              <div class="form-group">
                <label for="login-email">Email Address</label>
                <input type="email" id="login-email" required>
              </div>
              
              <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" required>
              </div>
              
              <div class="form-group checkbox-group">
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Remember me</label>
                <a href="#" class="forgot-password">Forgot password?</a>
              </div>
              
              <button type="submit" class="btn-primary btn-full">Log In</button>
              
              <div class="social-login">
                <div class="divider"><span>OR</span></div>
                <button type="button" class="btn-social btn-google">
                  <i class="fab fa-google"></i> Continue with Google
                </button>
                <button type="button" class="btn-social btn-facebook">
                  <i class="fab fa-facebook-f"></i> Continue with Facebook
                </button>
              </div>
              
              <p class="switch-form">
                Don't have an account? 
                <button type="button" id="switch-to-signup">Sign Up</button>
              </p>
            </form>
            
            <!-- Signup Form -->
            <form id="signup-form" class="auth-form" style="display: none;">
              <div class="form-group">
                <label for="signup-name">Full Name</label>
                <input type="text" id="signup-name" required>
              </div>
              
              <div class="form-group">
                <label for="signup-email">Email Address</label>
                <input type="email" id="signup-email" required>
              </div>
              
              <div class="form-group">
                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" required>
                <small>Must be at least 8 characters</small>
              </div>
              
              <div class="form-group">
                <label for="signup-confirm">Confirm Password</label>
                <input type="password" id="signup-confirm" required>
              </div>
              
              <div class="form-group checkbox-group">
                <input type="checkbox" id="terms" required>
                <label for="terms">
                  I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>
              
              <button type="submit" class="btn-primary btn-full">Create Account</button>
              
              <div class="social-login">
                <div class="divider">OR</div>
                <button type="button" class="btn-social btn-google">
                  <i class="fab fa-google"></i> Sign up with Google
                </button>
                <button type="button" class="btn-social btn-facebook">
                  <i class="fab fa-facebook-f"></i> Sign up with Facebook
                </button>
              </div>
              
              <p class="switch-form">
                Already have an account? 
                <button type="button" id="switch-to-login">Log In</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    `;
    
    // Add to body if not already present
    if (!document.getElementById('auth-modal')) {
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
  }
  
  // Bind all event listeners
  function bindEvents() {
    // Login/Signup buttons in header
    document.addEventListener('click', function(e) {
      if (e.target.closest('#login-btn')) {
        e.preventDefault();
        showLogin();
      }
      if (e.target.closest('#signup-btn')) {
        e.preventDefault();
        showSignup();
      }
    });
    
    // Close button and overlay click
    const modal = document.getElementById('auth-modal');
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.closest('.auth-modal-close')) {
        close();
      }
    });
    
    // Form switching
    document.getElementById('switch-to-signup').addEventListener('click', function(e) {
      e.preventDefault();
      showSignup();
    });
    
    document.getElementById('switch-to-login').addEventListener('click', function(e) {
      e.preventDefault();
      showLogin();
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    });
  }
  
  // Show login form
  function showLogin() {
    currentForm = 'login';
    open();
    document.getElementById('modal-title').textContent = 'Log In';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
  }
  
  // Show signup form
  function showSignup() {
    currentForm = 'signup';
    open();
    document.getElementById('modal-title').textContent = 'Sign Up';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
  }
  
  // Open modal
  function open() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    isOpen = true;
  }
  
  // Close modal
  function close() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    isOpen = false;
  }
  
  // Public API
  return {
    init,
    showLogin,
    showSignup,
    close
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  AuthModal.init();
});