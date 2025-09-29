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
        description: "The day our paths crossed for the first time. I knew there was something special about you from that very first smile.",
        image: "first-meeting.jpg",
        location: "Coffee House Downtown",
        quote: "In a room full of people, my eyes still search for you.",
        constellation: { emoji: "🌟", color: "#ff6b9d" }
    },
    {
        id: 2,
        title: "First Date",
        date: "2023-02-14",
        description: "A perfect Valentine's Day that started it all. We talked for hours and I knew I wanted to spend forever getting to know you.",
        image: "first-date.jpg",
        location: "Bella Vista Restaurant",
        quote: "I could listen to you talk for hours and never get bored.",
        constellation: { emoji: "💕", color: "#fd79a8" }
    },
    {
        id: 3,
        title: "First Movie Together",
        date: "2023-03-20",
        description: "Sharing popcorn and stolen glances. Little did I know it would become our tradition.",
        image: "first-movie.jpg",
        location: "Cinema Plaza",
        quote: "Home is wherever I'm with you.",
        constellation: { emoji: "🎬", color: "#ffeaa7" }
    },
    {
        id: 4,
        title: "Made It Official",
        date: "2023-05-01",
        description: "The day we became 'us'. You looked so beautiful in the spring sunshine when you said yes.",
        image: "official.jpg",
        location: "Riverside Park",
        quote: "From this day forward, you're my forever.",
        constellation: { emoji: "💖", color: "#fab1a0" }
    },
    {
        id: 5,
        title: "First Trip Together",
        date: "2023-08-15",
        description: "Creating memories in new places. Every adventure is better with you by my side.",
        image: "first-trip.jpg",
        location: "Beach Paradise Resort",
        quote: "Together is my favorite place to be.",
        constellation: { emoji: "✈️", color: "#a29bfe" }
    },
    {
        id: 6,
        title: "The Proposal",
        date: "2024-12-25",
        description: "Christmas magic and the most important question. When you said yes, my heart felt like it would burst with joy.",
        image: "proposal.jpg",
        location: "Seaside Cliff at Sunset",
        quote: "Will you marry me? Because I can't imagine life without you.",
        constellation: { emoji: "💍", color: "#e17055" }
    },
    {
        id: 7,
        title: "First Kiss",
        date: "2023-02-20",
        description: "A moment that stopped time. Under the stars, our lips met and everything changed.",
        image: "first-kiss.jpg",
        location: "Moonlight Park",
        quote: "That kiss was the beginning of everything beautiful.",
        constellation: { emoji: "💋", color: "#ff7675" }
    },
    {
        id: 8,
        title: "Meeting the Family",
        date: "2023-06-10",
        description: "Becoming part of each other's worlds. Your family welcomed me with open hearts.",
        image: "family-meeting.jpg",
        location: "Parents' Home",
        quote: "Love grows when families unite.",
        constellation: { emoji: "🏠", color: "#74b9ff" }
    },
    {
        id: 9,
        title: "First Anniversary",
        date: "2024-05-01",
        description: "Celebrating one year of love. Every moment together has been a gift.",
        image: "anniversary.jpg",
        location: "The Garden Restaurant",
        quote: "365 days of loving you, and forever more to go.",
        constellation: { emoji: "🎉", color: "#55a3ff" }
    },
    {
        id: 10,
        title: "Moving In Together",
        date: "2024-08-01",
        description: "Building our first home together. Every morning I wake up grateful to see your face.",
        image: "moving-in.jpg",
        location: "Our First Home",
        quote: "This is where our forever begins.",
        constellation: { emoji: "📦", color: "#fdcb6e" }
    },
    {
        id: 11,
        title: "Adopting Our Pet",
        date: "2024-10-15",
        description: "Adding a furry member to our family. Now we're a family of three!",
        image: "pet-adoption.jpg",
        location: "Animal Shelter",
        quote: "Love makes a family, and ours just grew.",
        constellation: { emoji: "🐶", color: "#6c5ce7" }
    },
    {
        id: 12,
        title: "Engagement Party",
        date: "2025-01-15",
        description: "Celebrating with all our loved ones. Their joy and blessings made the night perfect.",
        image: "engagement-party.jpg",
        location: "Grand Ballroom",
        quote: "Surrounded by love, ready for our forever.",
        constellation: { emoji: "🎆", color: "#fd79a8" }
    }
];

// ===================================
// FLOATING HEARTS ANIMATION SYSTEM
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
// PHASE 3C: VERTICAL ZIGZAG TIMELINE
// Modern Love Story Layout Design
// ===================================

class VerticalZigzagTimeline {
    constructor() {
        this.container = document.getElementById('timelineEvents');
        this.milestones = journeyMilestones;
        
        if (this.container) {
            this.initialize();
        }
    }
    
    initialize() {
        this.renderTimeline();
    }
    
    renderTimeline() {
        if (!this.container || !this.milestones.length) return;
        
        // Clear container
        this.container.innerHTML = '';
        
        // Render each milestone
        this.milestones.forEach((milestone, index) => {
            const eventElement = this.createEventElement(milestone, index);
            this.container.appendChild(eventElement);
        });
    }
    
    createEventElement(milestone, index) {
        const isLeft = index % 2 === 0;
        
        // Create main event container
        const event = document.createElement('div');
        event.className = 'timeline-event';
        event.setAttribute('data-aos', 'fade-up');
        
        // Create timeline dot
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.textContent = '❤️';
        
        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.className = `event-card-container ${isLeft ? 'left' : 'right'}`;
        
        // Create event card
        const card = document.createElement('div');
        card.className = 'event-card';
        
        // Format date
        const date = new Date(milestone.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Build card HTML
        card.innerHTML = `
            <div class="card-image">
                ${milestone.image ? `
                    <img src="assets/images/${milestone.image}" alt="${milestone.title}" loading="lazy">
                ` : `
                    <div class="card-image-placeholder">💕</div>
                `}
            </div>
            
            <div class="card-content">
                <div class="card-date-location">
                    <div class="card-date">
                        <span class="card-date-icon"></span>
                        <span>${formattedDate}</span>
                    </div>
                    <span class="date-location-separator">•</span>
                    <div class="card-location">
                        <span class="card-location-icon"></span>
                        <span>${milestone.location || 'Unknown'}</span>
                    </div>
                </div>
                
                <h3 class="card-title">${milestone.title}</h3>
            </div>
        `;
        
        // Assemble event
        cardContainer.appendChild(card);
        event.appendChild(dot);
        event.appendChild(cardContainer);
        
        return event;
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// ===================================
// APPLICATION INITIALIZATION
// ===================================

class App {
    constructor() {
        this.floatingHearts = null;
        this.timeline = null;
        this.initialize();
    }
    
    initialize() {
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
        
        // Initialize vertical zigzag timeline on journey page
        if (document.querySelector('.journey-page')) {
            this.timeline = new VerticalZigzagTimeline();
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
            if (this.timeline) {
                this.timeline.destroy();
            }
        });
    }
    
    setupPageTransitions() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Initialize application
window.app = new App();
