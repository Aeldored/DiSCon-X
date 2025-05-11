/**
 * Demo Modals Component
 * Shows detailed feature demonstrations in modal overlays
 */
const DemoModals = (function() {
  // Modal templates for different features
  const modalTemplates = {
    // Threat Reporting Modal
    threatReporting: {
      title: 'Community Threat Reporting System',
      content: `
        <div class="space-y-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-bold text-lg mb-2">How It Works</h3>
            <p class="text-gray-700">Our community-driven threat reporting system allows users to report suspicious networks in real-time, creating a collaborative security network across CALABARZON.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold mb-3">Reporting Process</h4>
              <ol class="space-y-3">
                <li class="flex items-start">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  <div>
                    <p class="font-medium">Detect Suspicious Network</p>
                    <p class="text-sm text-gray-600">App automatically flags potential threats</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  <div>
                    <p class="font-medium">Submit Report</p>
                    <p class="text-sm text-gray-600">One-tap reporting with automatic location</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  <div>
                    <p class="font-medium">Community Verification</p>
                    <p class="text-sm text-gray-600">Other users validate the threat</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                  <div>
                    <p class="font-medium">DICT Review</p>
                    <p class="text-sm text-gray-600">Official verification and whitelist update</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div>
              <img src="images/demo/threat-reporting-flow.png" alt="Threat Reporting Flow" class="rounded-lg shadow-lg w-full">
            </div>
          </div>
          
          <div class="bg-gray-100 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Privacy & Security</h4>
            <ul class="text-sm text-gray-700 space-y-1">
              <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Anonymous reporting option available</li>
              <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> Location data encrypted and anonymized</li>
              <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i> No personal data shared with other users</li>
            </ul>
          </div>
        </div>
      `
    },

    // AR Scanner Modal
    arScanner: {
      title: 'Augmented Reality Network Scanner',
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg">
            <h3 class="font-bold text-xl mb-2">Next-Gen Security Visualization</h3>
            <p>Use your phone's camera to see Wi-Fi networks in augmented reality, with real-time threat indicators floating in 3D space.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-camera text-blue-600 text-3xl"></i>
              </div>
              <h4 class="font-bold mb-1">Camera View</h4>
              <p class="text-sm text-gray-600">Point your camera to scan surroundings</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-cube text-green-600 text-3xl"></i>
              </div>
              <h4 class="font-bold mb-1">3D Overlays</h4>
              <p class="text-sm text-gray-600">See network info in 3D space</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-shield-alt text-red-600 text-3xl"></i>
              </div>
              <h4 class="font-bold mb-1">Instant Alerts</h4>
              <p class="text-sm text-gray-600">Real-time threat visualization</p>
            </div>
          </div>
          
          <div class="relative rounded-lg overflow-hidden shadow-xl">
            <img src="images/demo/ar-scanner-preview.png" alt="AR Scanner Preview" class="w-full">
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                <i class="fas fa-play mr-2"></i> Watch Demo Video
              </button>
            </div>
          </div>
          
          <div class="border-t pt-6">
            <h4 class="font-bold mb-3">AR Features</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-start">
                <i class="fas fa-wifi text-blue-500 mt-1 mr-3"></i>
                <div>
                  <p class="font-medium">Network Strength Visualization</p>
                  <p class="text-sm text-gray-600">See signal strength as glowing auras</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-map-marker-alt text-red-500 mt-1 mr-3"></i>
                <div>
                  <p class="font-medium">Spatial Threat Mapping</p>
                  <p class="text-sm text-gray-600">Threats appear as 3D warning signs</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-info-circle text-green-500 mt-1 mr-3"></i>
                <div>
                  <p class="font-medium">Information Cards</p>
                  <p class="text-sm text-gray-600">Tap networks to see detailed info</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-route text-purple-500 mt-1 mr-3"></i>
                <div>
                  <p class="font-medium">Safe Path Navigation</p>
                  <p class="text-sm text-gray-600">AR arrows guide to secure zones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // Achievement System Details
    achievementSystem: {
      title: 'Gamified Security Achievements',
      content: `
        <div class="space-y-6">
          <div class="text-center mb-8">
            <img src="images/demo/achievement-hero.png" alt="Achievements" class="w-32 h-32 mx-auto mb-4">
            <h3 class="text-2xl font-bold mb-2">Level Up Your Security</h3>
            <p class="text-gray-600">Earn rewards and recognition for protecting yourself and the community</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold mb-3">Achievement Categories</h4>
              <div class="space-y-3">
                <div class="bg-blue-50 p-3 rounded-lg">
                  <h5 class="font-bold text-blue-700">🛡️ Protection Achievements</h5>
                  <p class="text-sm text-gray-600">Earn badges for safe connections and avoiding threats</p>
                </div>
                <div class="bg-green-50 p-3 rounded-lg">
                  <h5 class="font-bold text-green-700">🔍 Discovery Achievements</h5>
                  <p class="text-sm text-gray-600">Rewards for finding and reporting new threats</p>
                </div>
                <div class="bg-purple-50 p-3 rounded-lg">
                  <h5 class="font-bold text-purple-700">👥 Community Achievements</h5>
                  <p class="text-sm text-gray-600">Recognition for helping other users stay safe</p>
                </div>
                <div class="bg-yellow-50 p-3 rounded-lg">
                  <h5 class="font-bold text-yellow-700">📚 Education Achievements</h5>
                  <p class="text-sm text-gray-600">Complete security tutorials and quizzes</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-bold mb-3">Reward System</h4>
              <div class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-4">
                <h5 class="font-bold mb-2">XP & Leveling</h5>
                <div class="flex items-center justify-between mb-2">
                  <span>Current Level: 12</span>
                  <span>Next: 850/1000 XP</span>
                </div>
                <div class="bg-white bg-opacity-20 rounded-full h-3">
                  <div class="bg-white h-3 rounded-full" style="width: 85%"></div>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span class="font-medium">Digital Badges</span>
                  <span class="text-blue-600">32 Earned</span>
                </div>
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span class="font-medium">Community Points</span>
                  <span class="text-green-600">1,250 CP</span>
                </div>
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span class="font-medium">Leaderboard Rank</span>
                  <span class="text-purple-600">#47 Regional</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-t pt-6">
            <h4 class="font-bold mb-3">Recent Unlocks</h4>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i class="fas fa-trophy text-white text-2xl"></i>
                </div>
                <p class="text-sm font-medium">Elite Guardian</p>
                <p class="text-xs text-gray-500">Legendary Badge</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i class="fas fa-shield-virus text-white text-2xl"></i>
                </div>
                <p class="text-sm font-medium">Threat Hunter</p>
                <p class="text-xs text-gray-500">Epic Badge</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i class="fas fa-users text-white text-2xl"></i>
                </div>
                <p class="text-sm font-medium">Community Hero</p>
                <p class="text-xs text-gray-500">Rare Badge</p>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // AI Analysis Demo
    aiAnalysis: {
      title: 'AI-Powered Threat Analysis',
      content: `
        <div class="space-y-6">
          <div class="bg-gray-900 text-white p-6 rounded-lg">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-brain text-2xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-xl">Neural Network Analysis</h3>
                <p class="text-gray-300">Real-time pattern recognition and threat prediction</p>
              </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mt-6">
              <div class="bg-gray-800 p-3 rounded text-center">
                <p class="text-3xl font-bold text-blue-400">99.7%</p>
                <p class="text-sm text-gray-400">Detection Accuracy</p>
              </div>
              <div class="bg-gray-800 p-3 rounded text-center">
                <p class="text-3xl font-bold text-green-400">0.3s</p>
                <p class="text-sm text-gray-400">Response Time</p>
              </div>
              <div class="bg-gray-800 p-3 rounded text-center">
                <p class="text-3xl font-bold text-purple-400">24/7</p>
                <p class="text-sm text-gray-400">Active Monitoring</p>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold mb-3">AI Capabilities</h4>
              <div class="space-y-3">
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i class="fas fa-fingerprint text-blue-600"></i>
                  </div>
                  <div>
                    <h5 class="font-medium">Pattern Recognition</h5>
                    <p class="text-sm text-gray-600">Identifies attack signatures from network behavior</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i class="fas fa-chart-line text-green-600"></i>
                  </div>
                  <div>
                    <h5 class="font-medium">Predictive Analysis</h5>
                    <p class="text-sm text-gray-600">Forecasts potential threats before they occur</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <i class="fas fa-robot text-purple-600"></i>
                  </div>
                  <div>
                    <h5 class="font-medium">Automated Response</h5>
                    <p class="text-sm text-gray-600">Instant protection without user intervention</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-bold mb-3">Live Analysis Demo</h4>
              <div class="bg-gray-100 rounded-lg p-4">
                <div class="space-y-3">
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-medium">Network: CoffeeShop_WiFi</span>
                      <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Analyzing...</span>
                    </div>
                    <div class="h-16 bg-gray-50 rounded relative overflow-hidden">
                      <!-- Animated waveform -->
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-full h-8 flex items-end justify-around px-2">
                          <div class="w-1 bg-blue-400 animate-pulse" style="height: 60%"></div>
                          <div class="w-1 bg-blue-400 animate-pulse" style="height: 80%; animation-delay: 0.1s"></div>
                          <div class="w-1 bg-blue-400 animate-pulse" style="height: 40%; animation-delay: 0.2s"></div>
                          <div class="w-1 bg-blue-400 animate-pulse" style="height: 90%; animation-delay: 0.3s"></div>
                          <div class="w-1 bg-red-400 animate-pulse" style="height: 100%; animation-delay: 0.4s"></div>
                          <div class="w-1 bg-red-400 animate-pulse" style="height: 70%; animation-delay: 0.5s"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-red-50 border border-red-200 p-3 rounded-lg">
                    <div class="flex items-center text-red-700">
                      <i class="fas fa-exclamation-triangle mr-2"></i>
                      <span class="font-medium">Threat Detected</span>
                    </div>
                    <p class="text-sm text-red-600 mt-1">Evil twin signature match: 94% confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-t pt-6">
            <h4 class="font-bold mb-3">Machine Learning Models</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span>Deep Neural Network (DNN)</span>
                  <span class="text-sm text-gray-500">v3.2.1 - Updated daily</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Random Forest Classifier</span>
                  <span class="text-sm text-gray-500">v2.8.4 - Updated weekly</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>LSTM Time Series Predictor</span>
                  <span class="text-sm text-gray-500">v1.9.2 - Updated monthly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // Network Topology 3D
    networkTopology: {
      title: '3D Network Topology Visualization',
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-2">Interactive 3D Network Map</h3>
            <p>Explore your network environment in three dimensions with real-time threat visualization</p>
          </div>
          
          <div class="relative bg-gray-900 rounded-lg overflow-hidden" style="height: 400px;">
            <!-- Mock 3D canvas -->
            <div class="absolute inset-0 flex items-center justify-center">
              <img src="images/demo/3d-network-topology.png" alt="3D Network Topology" class="max-w-full max-h-full">
            </div>
            
            <!-- 3D Controls -->
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div class="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
                <i class="fas fa-mouse mr-2"></i> Click & drag to rotate • Scroll to zoom
              </div>
              <div class="flex space-x-2">
                <button class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <i class="fas fa-expand"></i>
                </button>
                <button class="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                  <i class="fas fa-cog"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold mb-2 flex items-center">
                <i class="fas fa-cube text-blue-500 mr-2"></i>
                3D Elements
              </h4>
              <ul class="text-sm space-y-2">
                <li class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Your Device (Center)
                </li>
                <li class="flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Verified Networks
                </li>
                <li class="flex items-center">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  Threat Networks
                </li>
                <li class="flex items-center">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  Unknown Networks
                </li>
              </ul>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold mb-2 flex items-center">
                <i class="fas fa-project-diagram text-purple-500 mr-2"></i>
                Connection Types
              </h4>
              <ul class="text-sm space-y-2">
                <li class="flex items-center">
                  <div class="w-8 h-0.5 bg-green-500 mr-2"></div>
                  Secure Connection
                </li>
                <li class="flex items-center">
                  <div class="w-8 h-0.5 bg-red-500 mr-2" style="border-bottom: 2px dashed red;"></div>
                  Threat Connection
                </li>
                <li class="flex items-center">
                  <div class="w-8 h-0.5 bg-yellow-500 mr-2"></div>
                  Unverified Link
                </li>
                <li class="flex items-center">
                  <div class="w-8 h-0.5 bg-blue-300 mr-2"></div>
                  Signal Strength
                </li>
              </ul>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold mb-2 flex items-center">
                <i class="fas fa-eye text-green-500 mr-2"></i>
                View Modes
              </h4>
              <div class="space-y-2">
                <button class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                  <i class="fas fa-globe-asia mr-2"></i> Geographic View
                </button>
                <button class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                  <i class="fas fa-shield-alt mr-2"></i> Security View
                </button>
                <button class="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50 transition-colors">
                  <i class="fas fa-signal mr-2"></i> Signal View
                </button>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Interactive Features</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <i class="fas fa-hand-pointer text-blue-600 mr-2"></i>
                Click networks for detailed information
              </div>
              <div>
                <i class="fas fa-search-plus text-blue-600 mr-2"></i>
                Zoom to focus on specific areas
              </div>
              <div>
                <i class="fas fa-filter text-blue-600 mr-2"></i>
                Filter by threat level or network type
              </div>
              <div>
                <i class="fas fa-clock text-blue-600 mr-2"></i>
                Time-lapse view of network changes
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // Initialize the component
  function init() {
    // Add global click handler for demo triggers
    document.addEventListener('click', handleDemoClick);
    
    // Add CSS for modal animations
    addModalStyles();
    
    console.log('Demo Modals initialized');
  }

  // Handle clicks on demo triggers
  function handleDemoClick(e) {
    const trigger = e.target.closest('[data-demo]');
    if (trigger) {
      e.preventDefault();
      const demoType = trigger.dataset.demo;
      showModal(demoType);
    }
  }

  // Add CSS for modal animations
  function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .demo-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .demo-modal-overlay.show {
        opacity: 1;
      }
      
      .demo-modal-container {
        background: white;
        border-radius: 1rem;
        max-width: 900px;
        width: 90%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        transform: scale(0.9) translateY(50px);
        transition: transform 0.3s ease;
      }
      
      .demo-modal-overlay.show .demo-modal-container {
        transform: scale(1) translateY(0);
      }
      
      .demo-modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      }
      
      .demo-modal-content {
        padding: 1.5rem;
        overflow-y: auto;
        flex: 1;
      }
      
      .demo-modal-close {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        border: none;
        background: transparent;
        color: #6b7280;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .demo-modal-close:hover {
        background-color: #f3f4f6;
        color: #111827;
      }
      
      /* Dark mode styles */
      .dark .demo-modal-container {
        background: #1f2937;
        color: #f9fafb;
      }
      
      .dark .demo-modal-header {
        border-color: #374151;
      }
      
      .dark .demo-modal-close {
        color: #9ca3af;
      }
      
      .dark .demo-modal-close:hover {
        background-color: #374151;
        color: #f9fafb;
      }
    `;
    document.head.appendChild(style);
  }

  // Show modal with specific content
  function showModal(demoType) {
    const template = modalTemplates[demoType];
    if (!template) {
      console.error(`Demo template not found for: ${demoType}`);
      return;
    }

    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'demo-modal-overlay';
    
    const container = document.createElement('div');
    container.className = 'demo-modal-container';
    
    container.innerHTML = `
      <div class="demo-modal-header">
        <h2 class="text-2xl font-bold">${template.title}</h2>
        <button class="demo-modal-close" aria-label="Close modal">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div class="demo-modal-content">
        ${template.content}
      </div>
    `;
    
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add('show');
    });
    
    // Event listeners
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
    
    container.querySelector('.demo-modal-close').addEventListener('click', () => {
      closeModal(overlay);
    });
    
    // Escape key to close
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal(overlay);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
  }

  // Close modal
  function closeModal(overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }

  // Public API
  return {
    init,
    showModal
  };
})();