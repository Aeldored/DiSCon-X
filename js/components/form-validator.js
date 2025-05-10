/**
 * Form Validator Component
 * Handles form validation functionality
 */

// Form Validator Module
const FormValidator = (function() {
    // Private variables
    const elements = {
      forms: null
    };
    
    // Validation rules
    const validationRules = {
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      password: {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: 'Password must be at least 8 characters and include letters, numbers, and special characters'
      },
      phone: {
        pattern: /^(\+\d{1,3})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        message: 'Please enter a valid phone number'
      },
      url: {
        pattern: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
        message: 'Please enter a valid URL'
      }
    };
    
    // Initialize the module
    function init() {
      // Get all forms from the page
      elements.forms = document.querySelectorAll('form');
      
      if (!elements.forms || elements.forms.length === 0) {
        console.error('No forms found on the page');
        return;
      }
      
      // Bind events to forms
      bindEvents();
      
      console.log(`Form validator initialized for ${elements.forms.length} forms`);
    }
    
    // Bind events to forms
    function bindEvents() {
      elements.forms.forEach(form => {
        // Prevent default form submission
        form.addEventListener('submit', onFormSubmit);
        
        // Get all form inputs
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Add blur event for real-time validation
        inputs.forEach(input => {
          input.addEventListener('blur', function() {
            validateField(input);
          });
          
          // Clear error message when user starts typing
          input.addEventListener('input', function() {
            const errorContainer = getErrorContainer(input);
            if (errorContainer && errorContainer.classList.contains('error-message-visible')) {
              hideError(input);
            }
          });
        });
      });
    }
    
    // Handle form submission
    function onFormSubmit(e) {
      const form = e.target;
      let isValid = true;
      
      // Get all required fields
      const requiredFields = form.querySelectorAll('[required]');
      
      // Validate each required field
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      // If form is invalid, prevent submission
      if (!isValid) {
        e.preventDefault();
        
        // Focus on the first invalid field
        const firstInvalidField = form.querySelector('.is-invalid');
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
      } else {
        // Dispatch custom event for valid form
        form.dispatchEvent(new CustomEvent('form:valid', {
          bubbles: true,
          detail: {
            form: form
          }
        }));
        
        // If form has data-ajax attribute, handle AJAX submission
        if (form.hasAttribute('data-ajax')) {
          e.preventDefault();
          handleAjaxSubmission(form);
        }
      }
    }
    
    // Validate a single field
    function validateField(field) {
      let isValid = true;
      let errorMessage = '';
      
      // Check if field is required and empty
      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
      } 
      // If field has a value, check against validation rules
      else if (field.value.trim()) {
        // Check field type
        if (field.type === 'email') {
          if (!validationRules.email.pattern.test(field.value.trim())) {
            isValid = false;
            errorMessage = validationRules.email.message;
          }
        } 
        // Check for password pattern if field has data-validate="password"
        else if (field.dataset.validate === 'password') {
          if (!validationRules.password.pattern.test(field.value.trim())) {
            isValid = false;
            errorMessage = validationRules.password.message;
          }
        }
        // Check for phone pattern if field has data-validate="phone"
        else if (field.dataset.validate === 'phone') {
          if (!validationRules.phone.pattern.test(field.value.trim())) {
            isValid = false;
            errorMessage = validationRules.phone.message;
          }
        }
        // Check for URL pattern if field has data-validate="url"
        else if (field.dataset.validate === 'url') {
          if (!validationRules.url.pattern.test(field.value.trim())) {
            isValid = false;
            errorMessage = validationRules.url.message;
          }
        }
        // Check field against min length
        else if (field.hasAttribute('minlength')) {
          const minLength = parseInt(field.getAttribute('minlength'), 10);
          if (field.value.length < minLength) {
            isValid = false;
            errorMessage = `Must be at least ${minLength} characters`;
          }
        }
        // Check field against max length
        else if (field.hasAttribute('maxlength')) {
          const maxLength = parseInt(field.getAttribute('maxlength'), 10);
          if (field.value.length > maxLength) {
            isValid = false;
            errorMessage = `Cannot exceed ${maxLength} characters`;
          }
        }
        // Check field against pattern attribute
        else if (field.hasAttribute('pattern')) {
          const pattern = new RegExp(field.getAttribute('pattern'));
          if (!pattern.test(field.value)) {
            isValid = false;
            errorMessage = field.dataset.errorMessage || 'Please enter a valid format';
          }
        }
        // Check select field has a value
        else if (field.tagName === 'SELECT' && field.value === '') {
          isValid = false;
          errorMessage = 'Please select an option';
        }
        // Check password confirmation
        else if (field.dataset.validate === 'password-confirm') {
          const passwordField = field.form.querySelector('input[type="password"]:not([data-validate="password-confirm"])');
          if (passwordField && field.value !== passwordField.value) {
            isValid = false;
            errorMessage = 'Passwords do not match';
          }
        }
        // Custom validation through data-custom-validate attribute
        else if (field.dataset.customValidate) {
          try {
            const validateFunction = new Function('value', field.dataset.customValidate);
            if (!validateFunction(field.value)) {
              isValid = false;
              errorMessage = field.dataset.errorMessage || 'Invalid value';
            }
          } catch (error) {
            console.error('Custom validation error:', error);
          }
        }
      }
      
      // Update field styling and error message
      if (!isValid) {
        markFieldAsInvalid(field, errorMessage);
      } else {
        markFieldAsValid(field);
      }
      
      return isValid;
    }
    
    // Mark field as invalid
    function markFieldAsInvalid(field, message) {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      
      if (field.classList.contains('border-gray-300')) {
        field.classList.remove('border-gray-300');
        field.classList.add('border-red-500');
      }
      
      showError(field, message);
    }
    
    // Mark field as valid
    function markFieldAsValid(field) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      
      if (field.classList.contains('border-red-500')) {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
      }
      
      hideError(field);
    }
    
    // Show error message
    function showError(field, message) {
        let errorContainer = getErrorContainer(field);
        
        if (!errorContainer) {
          // Create a placeholder with zero height to prevent layout shift
          errorContainer = document.createElement('p');
          errorContainer.className = 'text-red-500 text-xs mt-1 error-message error-message-visible';
          
          // Create a parent div with relative positioning if not already in one
          let parent = field.parentNode;
          if (!parent.classList.contains('form-field-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-field-container relative';
            parent.insertBefore(wrapper, field);
            wrapper.appendChild(field);
            parent = wrapper;
          }
          
          // Add the error message to the parent
          parent.appendChild(errorContainer);
          
          // Apply a min-height to prevent layout shift
          parent.style.minHeight = (field.offsetHeight + errorContainer.offsetHeight + 4) + 'px';
        } else {
          errorContainer.classList.add('error-message-visible');
          errorContainer.classList.remove('hidden');
        }
        
        errorContainer.textContent = message;
    }
    
    // Hide error message
    function hideError(field) {
      const errorContainer = getErrorContainer(field);
      
      if (errorContainer) {
        errorContainer.classList.remove('error-message-visible');
        errorContainer.classList.add('hidden');
      }
    }
    
    // Get or create error container
    function getErrorContainer(field) {
      // Check if there's already an error container after the field
      return field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')
        ? field.nextElementSibling
        : null;
    }
    
    // Handle AJAX form submission
    function handleAjaxSubmission(form) {
      // Create submission indicator
      const submitBtn = form.querySelector('[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : null;
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
      }
      
      // Mock AJAX submission
      setTimeout(() => {
        // Reset button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'text-green-500 bg-green-50 p-3 rounded-md mt-4';
        successMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Form submitted successfully!';
        
        form.appendChild(successMessage);
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          successMessage.remove();
        }, 3000);
        
        // Dispatch custom event for successful submission
        form.dispatchEvent(new CustomEvent('form:submitted', {
          bubbles: true,
          detail: {
            form: form
          }
        }));
      }, 1500);
    }
    
    // Reset form
    function resetForm(formId) {
      const form = document.getElementById(formId);
      
      if (!form) {
        console.error(`Form with ID "${formId}" not found`);
        return;
      }
      
      // Reset form fields
      form.reset();
      
      // Remove all validation classes and error messages
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
        
        if (input.classList.contains('border-red-500')) {
          input.classList.remove('border-red-500');
          input.classList.add('border-gray-300');
        }
        
        hideError(input);
      });
      
      // Dispatch custom event for form reset
      form.dispatchEvent(new CustomEvent('form:reset', {
        bubbles: true,
        detail: {
          form: form
        }
      }));
    }
    
    // Validate a form programmatically
    function validateForm(formId) {
      const form = document.getElementById(formId);
      
      if (!form) {
        console.error(`Form with ID "${formId}" not found`);
        return false;
      }
      
      let isValid = true;
      
      // Get all required fields
      const requiredFields = form.querySelectorAll('[required]');
      
      // Validate each required field
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      return isValid;
    }
    
    // Public API
    return {
      init,
      validateField,
      validateForm,
      resetForm
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    FormValidator.init();
  });