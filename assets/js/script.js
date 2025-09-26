// ===================================
// MARRIAGE COUNTDOWN WEBSITE JAVASCRIPT
// Core Functionality Implementation
// ===================================

// Configuration Constants
const CONFIG = {
    weddingDate: new Date('2025-11-21T00:00:00').getTime(),
    updateInterval: 1000, // 1 second
    animationDuration: 300
};

// DOM Element References
const DOM = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    tapOverlay: document.getElementById('tapOverlay'),
    timelineContainer: document.getElementById('timelineContainer'),
    floatingHeartsContainer: document.getElementById('floatingHeartsContainer')
};

// Journey Data Structure (To be populated with actual content)
const journeyMilestones = [
    {
        id: 1,
        title: "First Meeting",
        date: "2023-01-15",
        description: "The day our paths crossed for the first time",
        image: "first-meeting.jpg"
    },
    {
        id: 2,
        title: "First Date",
        date: "2023-02-14",
        description: "A perfect Valentine's Day that started it all",
        image: "first-date.jpg"
    },
    {
        id: 3,
        title: "First Movie Together",
        date: "2023-03-20",
        description: "Sharing popcorn and stolen glances",
        image: "first-movie.jpg"
    },
    {
        id: 4,
        title: "Made It Official",
        date: "2023-05-01",
        description: "The day we became 'us'",
        image: "official.jpg"
    },
    {
        id: 5,
        title: "First Trip Together",
        date: "2023-08-15",
        description: "Creating memories in new places",
        image: "first-trip.jpg"
    },
    {
        id: 6,
        title: "The Proposal",
        date: "2024-12-25",
        description: "Christmas magic and the most important question",
        image: "proposal.jpg"
    }
    // Additional milestones will be added here
];

// ===================================
// FLOATING HEARTS ANIMATION SYSTEM - COMPLETELY REWRITTEN
// Clean Dual-Direction Architecture: Left (Top-Down) | Right (Bottom-Up)
// ===================================

class FloatingHeartsAnimation {
    constructor() {
        this.container = DOM.floatingHeartsContainer;
        this.heartEmojis = ['💕', '💖', '💗', '💓', '💝'];
        this.animationActive = true;
        this.leftLaneHearts = 0;
        this.rightLaneHearts = 0;
        this.maxHeartsPerLane = 3;
        this.spawnInterval = 5000; // 5 seconds between spawns
        this.initialize();
    }
    
    initialize() {
        if (!this.container) return;
        this.startDualLaneAnimation();
        this.setupPerformanceOptimization();
    }
    
    startDualLaneAnimation() {
        // Initial spawn for both lanes
        this.spawnLeftLaneHeart();
        this.spawnRightLaneHeart();
        
        // Set up staggered intervals
        this.leftLaneInterval = setInterval(() => {
            if (this.animationActive && this.leftLaneHearts < this.maxHeartsPerLane) {
                this.spawnLeftLaneHeart();
            }
        }, this.spawnInterval);
        
        // Right lane starts 2.5 seconds after left lane for staggered effect
        setTimeout(() => {
            this.rightLaneInterval = setInterval(() => {
                if (this.animationActive && this.rightLaneHearts < this.maxHeartsPerLane) {
                    this.spawnRightLaneHeart();
                }
            }, this.spawnInterval);
        }, 2500);
    }
    
    spawnLeftLaneHeart() {
        const heart = this.createHeart('left-lane');
        const leftPosition = Math.random() * (window.innerWidth * 0.35); // Left 35% of screen
        
        this.positionAndAnimateHeart(heart, leftPosition, () => {
            this.leftLaneHearts--;
        });
        
        this.leftLaneHearts++;
    }
    
    spawnRightLaneHeart() {
        const heart = this.createHeart('right-lane');
        const rightPosition = window.innerWidth * 0.65 + Math.random() * (window.innerWidth * 0.35); // Right 35% of screen
        
        this.positionAndAnimateHeart(heart, rightPosition, () => {
            this.rightLaneHearts--;
        });
        
        this.rightLaneHearts++;
    }
    
    createHeart(laneClass) {
        const heart = document.createElement('div');
        heart.className = `floating-heart ${laneClass}`;
        heart.textContent = this.getRandomHeart();
        return heart;
    }
    
    positionAndAnimateHeart(heart, xPosition, onComplete) {
        const duration = 8000 + Math.random() * 4000; // 8-12 seconds
        const driftX = (Math.random() - 0.5) * 30; // Subtle horizontal drift
        const rotation = Math.random() * 720; // Up to 2 full rotations
        
        // Set CSS custom properties
        heart.style.setProperty('--heart-duration', `${duration}ms`);
        heart.style.setProperty('--drift-x', `${driftX}px`);
        heart.style.setProperty('--rotation', `${rotation}deg`);
        heart.style.left = `${xPosition}px`;
        
        // Add to DOM
        this.container.appendChild(heart);
        
        // Clean removal after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
                onComplete();
            }
        }, duration + 100); // Small buffer for animation completion
    }
    
    getRandomHeart() {
        return this.heartEmojis[Math.floor(Math.random() * this.heartEmojis.length)];
    }
    
    setupPerformanceOptimization() {
        // Pause animation when page is not visible
        document.addEventListener('visibilitychange', () => {
            this.animationActive = !document.hidden;
        });
        
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.destroy();
        }
    }
    
    destroy() {
        if (this.leftLaneInterval) clearInterval(this.leftLaneInterval);
        if (this.rightLaneInterval) clearInterval(this.rightLaneInterval);
        this.animationActive = false;
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// ===================================
// COUNTDOWN FUNCTIONALITY
// ===================================

class CountdownTimer {
    constructor() {
        this.targetDate = CONFIG.weddingDate;
        this.interval = null;
        this.previousValues = {};
        this.initialize();
    }
    
    initialize() {
        this.updateCountdown();
        this.startTimer();
        this.setupEventListeners();
    }
    
    startTimer() {
        this.interval = setInterval(() => {
            this.updateCountdown();
        }, CONFIG.updateInterval);
    }
    
    updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = this.targetDate - now;
        
        if (timeLeft > 0) {
            const timeUnits = this.calculateTimeUnits(timeLeft);
            this.updateDisplay(timeUnits);
        } else {
            this.handleCountdownComplete();
        }
    }
    
    calculateTimeUnits(timeLeft) {
        return {
            days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
        };
    }
    
    updateDisplay(timeUnits) {
        Object.keys(timeUnits).forEach(unit => {
            const element = DOM[unit];
            const value = timeUnits[unit];
            const formattedValue = this.formatTimeValue(value, unit);
            
            if (element && this.previousValues[unit] !== formattedValue) {
                this.animateValueChange(element, formattedValue);
                this.previousValues[unit] = formattedValue;
            }
        });
    }
    
    formatTimeValue(value, unit) {
        if (unit === 'days') {
            return value.toString(); // Remove padding for days
        }
        return value.toString().padStart(2, '0');
    }
    
    animateValueChange(element, newValue) {
        element.style.transform = 'scale(1.1)';
        element.textContent = newValue;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, CONFIG.animationDuration);
    }
    
    handleCountdownComplete() {
        clearInterval(this.interval);
        document.querySelector('.main-title').textContent = 'We\'re Married! 💕';
        document.querySelector('.journey-prompt').textContent = 'Tap to see our journey as husband and wife';
    }
    
    setupEventListeners() {
        // Full-screen tap to navigate to journey page
        if (DOM.tapOverlay) {
            DOM.tapOverlay.addEventListener('click', () => {
                this.navigateToJourney();
            });
            
            // Touch event for mobile
            DOM.tapOverlay.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.navigateToJourney();
            });
        }
    }
    
    navigateToJourney() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'journey.html';
        }, CONFIG.animationDuration);
    }
}

// ===================================
// JOURNEY PAGE FUNCTIONALITY
// ===================================

class JourneyTimeline {
    constructor() {
        this.milestones = journeyMilestones;
        this.initialize();
    }
    
    initialize() {
        if (DOM.timelineContainer) {
            this.renderTimeline();
            this.setupScrollAnimations();
        }
    }
    
    renderTimeline() {
        // Clear existing content except the timeline line
        const timelineLine = DOM.timelineContainer.querySelector('.timeline-line');
        DOM.timelineContainer.innerHTML = '';
        if (timelineLine) {
            DOM.timelineContainer.appendChild(timelineLine);
        }
        
        // Sort milestones chronologically
        const sortedMilestones = this.milestones.sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );
        
        // Render each milestone
        sortedMilestones.forEach((milestone, index) => {
            const timelineItem = this.createTimelineItem(milestone, index);
            DOM.timelineContainer.appendChild(timelineItem);
        });
    }
    
    createTimelineItem(milestone, index) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', `${index * 100}`);
        
        const formattedDate = this.formatDate(milestone.date);
        const imagePath = `assets/images/${milestone.image}`;
        
        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-card">
                <div class="card-image-placeholder">
                    <img src="${imagePath}" 
                         alt="${milestone.title}" 
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjZiOWQiLz48dGV4dCB4PSIyMDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij5QaG90byBDb21pbmcgU29vbjwvdGV4dD48L3N2Zz4='">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${milestone.title}</h3>
                    <p class="card-date">${formattedDate}</p>
                    <p class="card-description">${milestone.description}</p>
                </div>
            </div>
        `;
        
        return item;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    setupScrollAnimations() {
        // Simple scroll-based animation using Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
}

// ===================================
// APPLICATION INITIALIZATION
// ===================================

class App {
    constructor() {
        this.floatingHearts = null;
        this.initialize();
    }
    
    initialize() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        // Initialize countdown timer and floating hearts on main page
        if (document.querySelector('.countdown-container')) {
            new CountdownTimer();
            this.floatingHearts = new FloatingHeartsAnimation();
        }
        
        // Initialize journey timeline on journey page
        if (document.querySelector('.journey-page')) {
            new JourneyTimeline();
        }
        
        // Preload images
        const imageUrls = journeyMilestones.map(milestone => 
            `assets/images/${milestone.image}`
        );
        Utils.preloadImages(imageUrls);
        
        // Add smooth page transitions
        this.setupPageTransitions();
        
        // Setup cleanup on page unload
        this.setupCleanup();
    }
    
    setupCleanup() {
        window.addEventListener('beforeunload', () => {
            if (this.floatingHearts) {
                this.floatingHearts.destroy();
            }
        });
    }
    
    setupPageTransitions() {
        // Fade in page on load
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Initialize application
new App();

// ===================================
// ADDITIONAL CSS ANIMATIONS VIA JS
// ===================================

// Add CSS class for scroll animations
const animationCSS = `
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);