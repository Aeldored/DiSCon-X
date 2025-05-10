/**
 * DOM Utilities
 * Common DOM manipulation and utility functions
 */

// DOM Utilities Module
const DOMUtils = (function() {
    /**
     * Select a single element
     * @param {string} selector - CSS selector
     * @param {Element} [parent=document] - Parent element to search within
     * @returns {Element|null} - Selected element or null
     */
    function select(selector, parent = document) {
      return parent.querySelector(selector);
    }
    
    /**
     * Select multiple elements
     * @param {string} selector - CSS selector
     * @param {Element} [parent=document] - Parent element to search within
     * @returns {NodeList} - List of matching elements
     */
    function selectAll(selector, parent = document) {
      return parent.querySelectorAll(selector);
    }
    
    /**
     * Create a new element with attributes and content
     * @param {string} tag - HTML tag name
     * @param {Object} [attributes={}] - Attributes to set on the element
     * @param {string|Element|Array} [content] - Content to append to element
     * @returns {Element} - Created element
     */
    function create(tag, attributes = {}, content = null) {
      const element = document.createElement(tag);
      
      // Set attributes
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'class' || key === 'className') {
          // Handle classes specially to accept array or string
          if (Array.isArray(value)) {
            value.forEach(cls => {
              if (cls) element.classList.add(cls);
            });
          } else if (typeof value === 'string') {
            value.split(' ').forEach(cls => {
              if (cls) element.classList.add(cls);
            });
          }
        } else if (key === 'style' && typeof value === 'object') {
          // Handle style object
          Object.entries(value).forEach(([prop, val]) => {
            element.style[prop] = val;
          });
        } else if (key.startsWith('data-')) {
          // Handle data attributes
          element.setAttribute(key, value);
        } else if (key === 'text') {
          // Handle text content
          element.textContent = value;
        } else if (key === 'html') {
          // Handle HTML content
          element.innerHTML = value;
        } else {
          // Handle other attributes
          element[key] = value;
        }
      });
      
      // Add content
      if (content !== null) {
        append(element, content);
      }
      
      return element;
    }
    
    /**
     * Append content to an element
     * @param {Element} parent - Parent element
     * @param {string|Element|Array} content - Content to append
     * @returns {Element} - Parent element
     */
    function append(parent, content) {
      if (typeof content === 'string') {
        // String content becomes text node
        parent.appendChild(document.createTextNode(content));
      } else if (content instanceof Element) {
        // Element gets appended directly
        parent.appendChild(content);
      } else if (Array.isArray(content)) {
        // Arrays get recursively appended
        content.forEach(item => append(parent, item));
      }
      
      return parent;
    }
    
    /**
     * Add event listeners to elements
     * @param {string|Element|NodeList|Array} elements - Elements to attach listeners to
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     * @param {Object} [options] - Event listener options
     * @returns {Function} - Function to remove listeners
     */
    function on(elements, event, callback, options) {
      const targets = getElements(elements);
      
      targets.forEach(element => {
        element.addEventListener(event, callback, options);
      });
      
      // Return function to remove listeners
      return function off() {
        targets.forEach(element => {
          element.removeEventListener(event, callback, options);
        });
      };
    }
    
    /**
     * Remove event listeners from elements
     * @param {string|Element|NodeList|Array} elements - Elements to remove listeners from
     * @param {string} event - Event name
     * @param {Function} callback - Event callback
     * @param {Object} [options] - Event listener options
     */
    function off(elements, event, callback, options) {
      const targets = getElements(elements);
      
      targets.forEach(element => {
        element.removeEventListener(event, callback, options);
      });
    }
    
    /**
     * Add or remove a class based on condition
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {string} className - Class to toggle
     * @param {boolean} [force] - Force add or remove
     * @returns {boolean} - Class is present
     */
    function toggleClass(elements, className, force) {
      const targets = getElements(elements);
      let result = false;
      
      targets.forEach(element => {
        result = element.classList.toggle(className, force);
      });
      
      return result;
    }
    
    /**
     * Add classes to elements
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {...string} classNames - Classes to add
     */
    function addClass(elements, ...classNames) {
      const targets = getElements(elements);
      
      targets.forEach(element => {
        element.classList.add(...classNames);
      });
    }
    
    /**
     * Remove classes from elements
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {...string} classNames - Classes to remove
     */
    function removeClass(elements, ...classNames) {
      const targets = getElements(elements);
      
      targets.forEach(element => {
        element.classList.remove(...classNames);
      });
    }
    
    /**
     * Check if element has class
     * @param {Element} element - Element to check
     * @param {string} className - Class to check for
     * @returns {boolean} - Element has class
     */
    function hasClass(element, className) {
      return element.classList.contains(className);
    }
    
    /**
     * Get or set element attributes
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {string|Object} attribute - Attribute name or object of attributes
     * @param {string} [value] - Attribute value (if setting)
     * @returns {string|Array|undefined} - Attribute value(s) if getting
     */
    function attr(elements, attribute, value) {
      const targets = getElements(elements);
      
      // Getting attribute
      if (typeof attribute === 'string' && value === undefined) {
        if (targets.length === 1) {
          return targets[0].getAttribute(attribute);
        }
        
        return targets.map(element => element.getAttribute(attribute));
      }
      
      // Setting attribute(s)
      targets.forEach(element => {
        if (typeof attribute === 'object') {
          // Set multiple attributes
          Object.entries(attribute).forEach(([key, val]) => {
            element.setAttribute(key, val);
          });
        } else {
          // Set single attribute
          element.setAttribute(attribute, value);
        }
      });
    }
    
    /**
     * Remove attributes from elements
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {...string} attributes - Attributes to remove
     */
    function removeAttr(elements, ...attributes) {
      const targets = getElements(elements);
      
      targets.forEach(element => {
        attributes.forEach(attribute => {
          element.removeAttribute(attribute);
        });
      });
    }
    
    /**
     * Get or set element style properties
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {string|Object} property - Style property or object of properties
     * @param {string} [value] - Style value (if setting)
     * @returns {string|CSSStyleDeclaration|Array|undefined} - Style value(s) if getting
     */
    function css(elements, property, value) {
      const targets = getElements(elements);
      
      // Getting computed style
      if (typeof property === 'string' && value === undefined) {
        if (targets.length === 1) {
          return getComputedStyle(targets[0])[property];
        }
        
        return targets.map(element => getComputedStyle(element)[property]);
      }
      
      // Getting all styles
      if (property === undefined) {
        if (targets.length === 1) {
          return getComputedStyle(targets[0]);
        }
        
        return targets.map(element => getComputedStyle(element));
      }
      
      // Setting style(s)
      targets.forEach(element => {
        if (typeof property === 'object') {
          // Set multiple styles
          Object.entries(property).forEach(([prop, val]) => {
            element.style[prop] = val;
          });
        } else {
          // Set single style
          element.style[property] = value;
        }
      });
    }
    
    /**
     * Get element position relative to document
     * @param {Element} element - Element to get position of
     * @returns {Object} - {top, left, right, bottom, width, height}
     */
    function position(element) {
      const rect = element.getBoundingClientRect();
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        right: rect.right + scrollLeft,
        bottom: rect.bottom + scrollTop,
        width: rect.width,
        height: rect.height
      };
    }
    
    /**
     * Check if element is in viewport
     * @param {Element} element - Element to check
     * @param {Object} [options] - Options
     * @param {number} [options.threshold=0] - Threshold of visibility (0-1)
     * @returns {boolean} - Element is in viewport
     */
    function isInViewport(element, options = {}) {
      const { threshold = 0 } = options;
      const rect = element.getBoundingClientRect();
      
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold) &&
        rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * threshold &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) * (1 - threshold) &&
        rect.right >= (window.innerWidth || document.documentElement.clientWidth) * threshold
      );
    }
    
    /**
     * Get or set element text content
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {string} [text] - Text to set
     * @returns {string|Array|undefined} - Text content if getting
     */
    function text(elements, text) {
      const targets = getElements(elements);
      
      // Getting text
      if (text === undefined) {
        if (targets.length === 1) {
          return targets[0].textContent;
        }
        
        return targets.map(element => element.textContent);
      }
      
      // Setting text
      targets.forEach(element => {
        element.textContent = text;
      });
    }
    
    /**
     * Get or set element HTML content
     * @param {string|Element|NodeList|Array} elements - Elements to modify
     * @param {string} [html] - HTML to set
     * @returns {string|Array|undefined} - HTML content if getting
     */
    function html(elements, html) {
      const targets = getElements(elements);
      
      // Getting HTML
      if (html === undefined) {
        if (targets.length === 1) {
          return targets[0].innerHTML;
        }
        
        return targets.map(element => element.innerHTML);
      }
      
      // Setting HTML
      targets.forEach(element => {
        element.innerHTML = html;
      });
    }
    
    /**
     * Get closest ancestor matching selector
     * @param {Element} element - Element to start from
     * @param {string} selector - CSS selector
     * @returns {Element|null} - Matching ancestor or null
     */
    function closest(element, selector) {
      // Use built-in closest method if available
      if (element.closest) {
        return element.closest(selector);
      }
      
      // Fallback implementation
      let current = element;
      
      while (current && current !== document) {
        if (current.matches(selector)) {
          return current;
        }
        
        current = current.parentElement;
      }
      
      return null;
    }
    
    /**
     * Check if element matches selector
     * @param {Element} element - Element to check
     * @param {string} selector - CSS selector
     * @returns {boolean} - Element matches selector
     */
    function matches(element, selector) {
      // Use the appropriate vendor-prefixed method or standard method
      const matchesMethod = element.matches ||
        element.webkitMatchesSelector ||
        element.mozMatchesSelector ||
        element.msMatchesSelector;
      
      return matchesMethod.call(element, selector);
    }
    
    /**
     * Delegate event to children matching selector
     * @param {Element} element - Parent element
     * @param {string} event - Event name
     * @param {string} selector - CSS selector for children
     * @param {Function} callback - Event callback
     * @param {Object} [options] - Event listener options
     * @returns {Function} - Function to remove listener
     */
    function delegate(element, event, selector, callback, options) {
      const handler = function(e) {
        const target = e.target;
        const delegateTarget = closest(target, selector);
        
        if (delegateTarget) {
          // Call callback with correct this and add delegateTarget property
          const callbackEvent = Object.assign({}, e, {
            delegateTarget
          });
          
          callback.call(delegateTarget, callbackEvent);
        }
      };
      
      element.addEventListener(event, handler, options);
      
      // Return function to remove event listener
      return function removeDelegate() {
        element.removeEventListener(event, handler, options);
      };
    }
    
    /**
     * Get all parent elements
     * @param {Element} element - Element to get parents of
     * @param {string} [selector] - Optional selector to filter parents
     * @returns {Array} - Array of parent elements
     */
    function parents(element, selector) {
      const result = [];
      let parent = element.parentElement;
      
      while (parent) {
        if (!selector || matches(parent, selector)) {
          result.push(parent);
        }
        
        parent = parent.parentElement;
      }
      
      return result;
    }
    
    /**
     * Parse HTML string into DOM elements
     * @param {string} html - HTML string
     * @returns {DocumentFragment} - Document fragment containing parsed elements
     */
    function parseHTML(html) {
      const template = document.createElement('template');
      template.innerHTML = html.trim();
      return template.content;
    }
    
    /**
     * Helper function to normalize element selectors into array of elements
     * @private
     * @param {string|Element|NodeList|Array} elements - Elements to normalize
     * @returns {Array} - Array of elements
     */
    function getElements(elements) {
      if (typeof elements === 'string') {
        // CSS selector
        return Array.from(document.querySelectorAll(elements));
      } else if (elements instanceof Element) {
        // Single element
        return [elements];
      } else if (elements instanceof NodeList || elements instanceof HTMLCollection) {
        // NodeList or HTMLCollection
        return Array.from(elements);
      } else if (Array.isArray(elements)) {
        // Array of elements
        return elements;
      }
      
      return [];
    }
    
    // Public API
    return {
      select,
      selectAll,
      create,
      append,
      on,
      off,
      toggleClass,
      addClass,
      removeClass,
      hasClass,
      attr,
      removeAttr,
      css,
      position,
      isInViewport,
      text,
      html,
      closest,
      matches,
      delegate,
      parents,
      parseHTML
    };
  })();
  
  // Make utilities available globally
  window.$ = DOMUtils;