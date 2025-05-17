/**
 * DiSCon-X Component Loader
 * This script loads HTML components into the page - Updated for GitHub Pages compatibility
 */

// Component Loader Module
const ComponentLoader = (function() {
    // Private variables
    const componentCache = {};
    const componentInfoMap = {};
    
    /**
     * Determines the correct base path for assets based on current URL
     * This is crucial for GitHub Pages to resolve paths correctly
     * @returns {string} The relative base path ('./' or '../')
     */
    function getBasePath() {
      const path = window.location.pathname;
      // If we're in a subdirectory like /pages/, we need to go up one level
      if (path.includes('/pages/')) {
        return '../';
      }
      // Check if we're in the repository root or project site
      const pathSegments = path.split('/');
      // If we're on the main page of a project site, add repository name if needed
      if (pathSegments.length > 2 && !path.includes('/pages/')) {
        return './';
      }
      // Default for root
      return './';
    }
    
    /**
     * Gets the repository name from the path for GitHub Pages project sites
     * Helps with constructing correct URLs
     * @returns {string} The repository name or empty string
     */
    function getRepoName() {
      const path = window.location.pathname;
      const pathSegments = path.split('/');
      // If we're not at root domain and have more than one path segment
      if (pathSegments.length > 2) {
        return pathSegments[1]; // First segment after domain is repo name
      }
      return '';
    }
    
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
    
    // Define components to load based on current page with proper relative paths
    function getComponentsForPage() {
      const path = window.location.pathname;
      const basePath = getBasePath();
      const repoContext = getRepoName() ? `/${getRepoName()}` : '';
      
      console.log(`Current path: ${path}`);
      console.log(`Base path: ${basePath}`);
      console.log(`Repository context: ${repoContext}`);
      
      // Handle pages in /pages/ directory
      if (path.includes('/pages/features.html')) {
        return [
          { containerId: 'header-content', componentUrl: '../components/header.html' },
          { containerId: 'community-features-section', componentUrl: '../components/community-features.html' },
          { containerId: 'security-dashboard-section', componentUrl: '../components/security-dashboard.html' },
          { containerId: 'ai-visualization-section', componentUrl: '../components/ai-visualization.html' },
          { containerId: 'achievement-system-section', componentUrl: '../components/achievement-system.html' },
          { containerId: 'footer-content', componentUrl: '../components/footer.html' }
        ];
      } else if (path.includes('/pages/admin.html')) {
        return [
          { containerId: 'header-content', componentUrl: '../components/header.html' },
          { containerId: 'admin-dashboard-section', componentUrl: '../components/admin-dashboard.html' },
          { containerId: 'footer-content', componentUrl: '../components/footer.html' }
        ];
      } else if (path.includes('/pages/resources.html')) {
        return [
          { containerId: 'header-content', componentUrl: '../components/header.html' },
          { containerId: 'contact-section', componentUrl: '../components/contact.html' },
          { containerId: 'footer-content', componentUrl: '../components/footer.html' }
        ];
      } else {
        // Default for index.html (root level)
        return [
          { containerId: 'header-content', componentUrl: `${basePath}components/header.html` },
          { containerId: 'hero-section', componentUrl: `${basePath}components/hero.html` },
          { containerId: 'search-section', componentUrl: `${basePath}components/search.html` },
          { containerId: 'features-section', componentUrl: `${basePath}components/features.html` },
          { containerId: 'how-it-works-section', componentUrl: `${basePath}components/how-it-works.html` },
          { containerId: 'testimonials-section', componentUrl: `${basePath}components/testimonials.html` },
          { containerId: 'faq-section', componentUrl: `${basePath}components/faq.html` },
          { containerId: 'footer-content', componentUrl: `${basePath}components/footer.html` }
        ];
      }
    }

    function preloadComponentDimensions() {
      // Get components for current page
      const componentsToLoad = getComponentsForPage();
      
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
    
    /**
     * Fixes relative paths in loaded components 
     * Particularly important for components loaded in /pages/ directory
     * @param {string} html - The component HTML
     * @param {string} componentUrl - The URL of the component
     * @returns {string} - HTML with fixed paths
     */
    function fixRelativePaths(html, componentUrl) {
      // Only modify if we're in the pages directory
      if (window.location.pathname.includes('/pages/')) {
        // Fix paths that start with / to use relative paths instead
        // This regex finds all attributes that likely contain URLs and fixes them
        return html.replace(
          /(src|href|data-src|data-href)=["']\/([^"']+)["']/g, 
          `$1="../$2"`
        );
      }
      return html;
    }
    
    // Initialize - load all components based on current page
    function init() {
      // Detect GitHub Pages environment and log info
      console.log("Initializing ComponentLoader for path: " + window.location.pathname);
      
      // Get components for current page
      const componentsToLoad = getComponentsForPage();
      
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
    
    // Expose public API
    return {
      init,
      loadComponent,
      fetchComponent,
      getComponentInfoById,
      getBasePath,
      getRepoName
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
    
    // Log completion
    console.log("All components loaded successfully");
  });
});