/**
 * DiSCon-X Component Loader
 * This script loads HTML components into the page
 */

// Component Loader Module
const ComponentLoader = (function() {
    // Private variables
    const componentCache = {};
    const componentInfoMap = {};
    
    function getComponentInfoById(id) {
      return componentInfoMap[id] || null;
    }
    // Load a component via fetch
    async function fetchComponent(url) {
      // Check if component is already in cache
      if (componentCache[url]) {
        return componentCache[url];
      }
      
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to load component from ${url}: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Cache the component
        componentCache[url] = html;
        
        return html;
      } catch (error) {
        console.error('Error loading component:', error);
        return `<p class="text-red-500">Error loading component: ${error.message}</p>`;
      }
    }
    
    // Load a component into a container
    async function loadComponent(containerId, componentUrl) {
      const container = document.getElementById(containerId);
      
      if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
      }
      
      try {
        // Add loading indicator
        container.innerHTML = `
          <div class="component-loading flex items-center justify-center p-8">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">Loading...</span>
          </div>
        `;
        
        const html = await fetchComponent(componentUrl);
        container.innerHTML = html;
        
        // Dispatch event when component is loaded
        const event = new CustomEvent('component:loaded', {
          detail: {
            containerId,
            componentUrl
          }
        });
        
        document.dispatchEvent(event);
        
      } catch (error) {
        console.error(`Error loading component into ${containerId}:`, error);
        container.innerHTML = `
          <div class="bg-red-50 p-4 rounded-md">
            <p class="text-red-500">Error loading component: ${error.message}</p>
            <button class="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md" onclick="ComponentLoader.loadComponent('${containerId}', '${componentUrl}')">
              <i class="fas fa-sync-alt mr-1"></i> Retry
            </button>
          </div>
        `;
      }
    }
    
    // Define components to load
    const componentsToLoad = [
      { containerId: 'header-content', componentUrl: 'components/header.html' },
      { containerId: 'hero-section', componentUrl: 'components/hero.html' },
      { containerId: 'search-section', componentUrl: 'components/search.html' },
      { containerId: 'features-section', componentUrl: 'components/features.html' },
      { containerId: 'how-it-works-section', componentUrl: 'components/how-it-works.html' },
      { containerId: 'admin-dashboard-section', componentUrl: 'components/admin-dashboard.html' },
      { containerId: 'testimonials-section', componentUrl: 'components/testimonials.html' },
      { containerId: 'faq-section', componentUrl: 'components/faq.html' },
      { containerId: 'contact-section', componentUrl: 'components/contact.html' },
      { containerId: 'footer-content', componentUrl: 'components/footer.html' },
      { containerId: 'auth-modal-container', componentUrl: 'components/auth-modal.html' }
    ];

    function preloadComponentDimensions() {
      // Reserve space for components
      componentsToLoad.forEach(component => {
        const container = document.getElementById(component.containerId);
        if (container) {
          // Estimate minimum height based on section
          let minHeight = "200px";
          
          // Different defaults for different section types
          if (component.containerId.includes('hero')) {
            minHeight = "500px";
          } else if (component.containerId.includes('feature')) {
            minHeight = "400px";
          } else if (component.containerId.includes('footer')) {
            minHeight = "300px";
          }
          
          // Set min-height to prevent layout shift
          container.style.minHeight = minHeight;
        }
      });
    }
    
    // Initialize - load all components
    // Call this function before loading components

    function init() {
      // Map component info for later reference
      componentsToLoad.forEach(component => {
        componentInfoMap[component.containerId] = component;
      });
      
      // Reserve space for components to prevent layout shifts
      preloadComponentDimensions();
      
      // Load components
      componentsToLoad.forEach(component => {
        loadComponent(component.containerId, component.componentUrl);
      });
      
      // Listen for all components loaded
      let loadedComponents = 0;
      document.addEventListener('component:loaded', () => {
        loadedComponents++;
        
        // All components are loaded
        if (loadedComponents === componentsToLoad.length) {
          document.dispatchEvent(new Event('components:allLoaded'));
        }
      });
    }
    
    // Expose the new function in the public API
    return {
      init,
      loadComponent,
      fetchComponent,
      getComponentInfoById
    };
})();
  
// Initialize the component loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  ComponentLoader.init();
  
  // Re-initialize app modules after all components are loaded
  document.addEventListener('components:allLoaded', function() {
    // If the main app has an init method, call it after components are loaded
    if (typeof DisconX !== 'undefined' && DisconX.initAfterComponentsLoaded) {
      DisconX.initAfterComponentsLoaded();
    }
  });
});


