// Path handler to fix links dynamically
(function() {
  // Function to determine base path
  function getBasePath() {
    const isSubPage = window.location.pathname.includes('/pages/');
    return isSubPage ? '../' : './';
  }

  // Function to fix links on the page
  function fixLinks() {
    const basePath = getBasePath();
    const isSubPage = basePath === '../';

    // Fix absolute paths
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      const newPath = basePath + link.getAttribute('href').substring(1);
      link.setAttribute('href', newPath);
    });

    document.querySelectorAll('img[src^="/"]').forEach(img => {
      const newPath = basePath + img.getAttribute('src').substring(1);
      img.setAttribute('src', newPath);
    });
    
    // For pages in subdirectories, adjust links to other pages
    if (isSubPage) {
      document.querySelectorAll('a[href^="./pages/"]').forEach(link => {
        const currentPath = link.getAttribute('href');
        const newPath = './' + currentPath.substring(8); // Remove "./pages/"
        link.setAttribute('href', newPath);
      });
    }
  }

  // Run when DOM is loaded 
  document.addEventListener('DOMContentLoaded', fixLinks);
  
  // Also run after all components are loaded
  document.addEventListener('components:allLoaded', fixLinks);
  
  // Make the utility available globally
  window.PathHandler = {
    getBasePath: getBasePath,
    fixLinks: fixLinks
  };
})();