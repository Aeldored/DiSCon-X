/**
 * DiSCon-X Component Loader
 * This script loads HTML components into the page - Updated for multiple pages and GitHub Pages compatibility
 */

// Component Loader Module
const ComponentLoader = (function() {
    // Private variables
    const componentCache = {};
    const componentInfoMap = {};
    
    // Determine if we're in a subpage
    function isSubPage() {
        return window.location.pathname.includes('/pages/');
    }
    
    // Get the base path for components
    function getBasePath() {
        return isSubPage() ? '../' : './';
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
    
    // Fix image and link paths in a container
    function fixComponentPaths(container) {
        const basePath = getBasePath();
        
        // Fix image sources
        container.querySelectorAll('img[src^="/"]').forEach(img => {
            const relativePath = img.getAttribute('src').substring(1); // Remove leading slash
            img.setAttribute('src', basePath + relativePath);
        });
        
        // Fix link hrefs (except for # links)
        container.querySelectorAll('a[href^="/"]').forEach(link => {
            const relativePath = link.getAttribute('href').substring(1); // Remove leading slash
            link.setAttribute('href', basePath + relativePath);
        });
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
            
            // Fetch component HTML
            let html = await fetchComponent(componentUrl);
            
            // Get the base path for the current page
            const basePath = getBasePath();
            
            // Replace path placeholders
            html = html.replace(/\{\{basePath\}\}/g, basePath);
            
            // Insert the modified HTML
            container.innerHTML = html;
            
            // Fix any remaining absolute paths
            fixComponentPaths(container);
            
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
    
    // Define components to load based on current page
    function getComponentsForPage() {
        const path = window.location.pathname;
        const basePath = getBasePath();
        
        // Handle pages in /pages/ directory
        if (path.includes('/pages/features.html')) {
            return [
                { containerId: 'header-content', componentUrl: basePath + 'components/header.html' },
                { containerId: 'community-features-section', componentUrl: basePath + 'components/community-features.html' },
                { containerId: 'security-dashboard-section', componentUrl: basePath + 'components/security-dashboard.html' },
                { containerId: 'ai-visualization-section', componentUrl: basePath + 'components/ai-visualization.html' },
                { containerId: 'achievement-system-section', componentUrl: basePath + 'components/achievement-system.html' },
                { containerId: 'footer-content', componentUrl: basePath + 'components/footer.html' }
            ];
        } else if (path.includes('/pages/admin.html')) {
            return [
                { containerId: 'header-content', componentUrl: basePath + 'components/header.html' },
                { containerId: 'admin-dashboard-section', componentUrl: basePath + 'components/admin-dashboard.html' },
                { containerId: 'footer-content', componentUrl: basePath + 'components/footer.html' }
            ];
        } else if (path.includes('/pages/resources.html')) {
            return [
                { containerId: 'header-content', componentUrl: basePath + 'components/header.html' },
                { containerId: 'contact-section', componentUrl: basePath + 'components/contact.html' },
                { containerId: 'footer-content', componentUrl: basePath + 'components/footer.html' }
            ];
        } else {
            // Default for index.html (root level)
            return [
                { containerId: 'header-content', componentUrl: basePath + 'components/header.html' },
                { containerId: 'hero-section', componentUrl: basePath + 'components/hero.html' },
                { containerId: 'search-section', componentUrl: basePath + 'components/search.html' },
                { containerId: 'features-section', componentUrl: basePath + 'components/features.html' },
                { containerId: 'how-it-works-section', componentUrl: basePath + 'components/how-it-works.html' },
                { containerId: 'testimonials-section', componentUrl: basePath + 'components/testimonials.html' },
                { containerId: 'faq-section', componentUrl: basePath + 'components/faq.html' },
                { containerId: 'footer-content', componentUrl: basePath + 'components/footer.html' }
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
    
    // Initialize - load all components based on current page
    function init() {
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
        getBasePath
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