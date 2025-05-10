/**
 * Architecture Viewer Component
 * Provides zoom and pan functionality for the system architecture diagram
 */

// Architecture Viewer Module
const ArchitectureViewer = (function() {
    // Private variables
    const elements = {
      container: null,
      img: null,
      zoomInBtn: null,
      zoomOutBtn: null,
      resetBtn: null
    };
    
    // State variables
    const state = {
      currentScale: 1,
      startX: 0,
      startY: 0,
      translateX: 0,
      translateY: 0,
      isDragging: false,
      touchStartX: 0,
      touchStartY: 0,
      initialDistance: null,
      minScale: 0.5,
      maxScale: 3,
      scaleStep: 0.25
    };
    
    // Initialize the module
    function init() {
      // Get DOM elements
      elements.container = document.getElementById('architecture-container');
      elements.img = document.getElementById('architecture-img');
      elements.zoomInBtn = document.getElementById('zoom-in');
      elements.zoomOutBtn = document.getElementById('zoom-out');
      elements.resetBtn = document.getElementById('zoom-reset');
      
      if (!elements.container || !elements.img) {
        console.error('Architecture viewer elements not found');
        return;
      }
      
      // Bind events
      bindEvents();
      
      console.log('Architecture viewer initialized');
    }
    
    // Bind event listeners
    function bindEvents() {
      // Mouse events
      elements.container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      elements.container.addEventListener('mouseleave', onMouseLeave);
      elements.container.addEventListener('dblclick', onDoubleClick);
      elements.container.addEventListener('wheel', onWheel, { passive: false });
      
      // Touch events
      elements.container.addEventListener('touchstart', onTouchStart);
      elements.container.addEventListener('touchmove', onTouchMove, { passive: false });
      elements.container.addEventListener('touchend', onTouchEnd);
      
      // Button events
      if (elements.zoomInBtn) {
        elements.zoomInBtn.addEventListener('click', zoomIn);
      }
      
      if (elements.zoomOutBtn) {
        elements.zoomOutBtn.addEventListener('click', zoomOut);
      }
      
      if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', resetZoom);
      }
      
      // Keyboard events for accessibility
      elements.container.addEventListener('keydown', onKeyDown);
      
      // Make container focusable for keyboard navigation
      elements.container.tabIndex = 0;
      
      // Set initial cursor
      elements.container.style.cursor = 'move';
    }
    
    // Update the transform of the image
    function updateTransform() {
      elements.img.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.currentScale})`;
      
      // Dispatch custom event
      elements.container.dispatchEvent(new CustomEvent('viewer:updated', {
        bubbles: true,
        detail: {
          scale: state.currentScale,
          translateX: state.translateX,
          translateY: state.translateY
        }
      }));
    }
    
    // Zoom in function
    function zoomIn() {
      if (state.currentScale < state.maxScale) {
        state.currentScale += state.scaleStep;
        updateTransform();
      }
    }
    
    // Zoom out function
    function zoomOut() {
      if (state.currentScale > state.minScale) {
        state.currentScale -= state.scaleStep;
        updateTransform();
      }
    }
    
    // Reset zoom and position
    function resetZoom() {
      state.currentScale = 1;
      state.translateX = 0;
      state.translateY = 0;
      updateTransform();
    }
    
    // Mouse down handler
    function onMouseDown(e) {
      e.preventDefault();
      state.isDragging = true;
      state.startX = e.clientX - state.translateX;
      state.startY = e.clientY - state.translateY;
      elements.container.style.cursor = 'grabbing';
    }
    
    // Mouse move handler
    function onMouseMove(e) {
      if (!state.isDragging) return;
      
      state.translateX = e.clientX - state.startX;
      state.translateY = e.clientY - state.startY;
      updateTransform();
    }
    
    // Mouse up handler
    function onMouseUp() {
      state.isDragging = false;
      elements.container.style.cursor = 'move';
    }
    
    // Mouse leave handler
    function onMouseLeave() {
      if (state.isDragging) {
        state.isDragging = false;
        elements.container.style.cursor = 'move';
      }
    }
    
    // Double click handler
    function onDoubleClick(e) {
      e.preventDefault();
      
      // Double click to zoom in or reset if already zoomed in
      if (state.currentScale > 1.5) {
        resetZoom();
      } else {
        // Zoom in centered on mouse position
        const rect = elements.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        zoomAtPoint(x, y, state.currentScale + state.scaleStep * 2);
      }
    }
    
    // Wheel handler
    function onWheel(e) {
      e.preventDefault();
      
      const rect = elements.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      let scaleDelta = state.scaleStep;
      if (e.deltaY > 0) {
        scaleDelta = -scaleDelta;
      }
      
      const newScale = Math.max(state.minScale, Math.min(state.maxScale, state.currentScale + scaleDelta));
      zoomAtPoint(x, y, newScale);
    }
    
    // Zoom centered on a specific point
    function zoomAtPoint(x, y, newScale) {
      // Calculate new translate values to zoom centered on point
      const scale = newScale / state.currentScale;
      const newTranslateX = state.translateX * scale + (1 - scale) * x;
      const newTranslateY = state.translateY * scale + (1 - scale) * y;
      
      // Update state
      state.currentScale = newScale;
      state.translateX = newTranslateX;
      state.translateY = newTranslateY;
      
      updateTransform();
    }
    
    // Touch start handler
    function onTouchStart(e) {
      if (e.touches.length === 1) {
        // Single touch for panning
        state.isDragging = true;
        state.touchStartX = e.touches[0].clientX - state.translateX;
        state.touchStartY = e.touches[0].clientY - state.translateY;
      } else if (e.touches.length === 2) {
        // Two touches for pinch zoom
        state.initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        // Calculate pinch center
        state.pinchCenterX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        state.pinchCenterY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        
        // Get container position
        const rect = elements.container.getBoundingClientRect();
        state.pinchCenterRelativeX = state.pinchCenterX - rect.left;
        state.pinchCenterRelativeY = state.pinchCenterY - rect.top;
      }
    }
    
    // Touch move handler
    function onTouchMove(e) {
      e.preventDefault();
      
      if (state.isDragging && e.touches.length === 1) {
        // Panning with single touch
        state.translateX = e.touches[0].clientX - state.touchStartX;
        state.translateY = e.touches[0].clientY - state.touchStartY;
        updateTransform();
      } else if (e.touches.length === 2 && state.initialDistance) {
        // Pinch zooming with two touches
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        const pinchScale = currentDistance / state.initialDistance;
        const newScale = Math.max(
          state.minScale, 
          Math.min(state.maxScale, state.currentScale * pinchScale)
        );
        
        // Zoom centered on pinch
        zoomAtPoint(
          state.pinchCenterRelativeX,
          state.pinchCenterRelativeY,
          newScale
        );
        
        // Update initial distance for next move event
        state.initialDistance = currentDistance;
      }
    }
    
    // Touch end handler
    function onTouchEnd() {
      state.isDragging = false;
      state.initialDistance = null;
    }
    
    // Keyboard handler for accessibility
    function onKeyDown(e) {
      // Only respond to keys when the container is focused
      if (document.activeElement !== elements.container) return;
      
      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
        case '_':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          state.translateX += 10;
          updateTransform();
          break;
        case 'ArrowRight':
          e.preventDefault();
          state.translateX -= 10;
          updateTransform();
          break;
        case 'ArrowUp':
          e.preventDefault();
          state.translateY += 10;
          updateTransform();
          break;
        case 'ArrowDown':
          e.preventDefault();
          state.translateY -= 10;
          updateTransform();
          break;
      }
    }
    
    // Public API
    return {
      init,
      zoomIn,
      zoomOut,
      resetZoom
    };
  })();
  
  // Initialize when components are loaded
  document.addEventListener('components:allLoaded', function() {
    // Check if the architecture viewer component is on the page
    if (document.getElementById('architecture-container')) {
      ArchitectureViewer.init();
    }
  });