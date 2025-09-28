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
        image: "first-meeting.jpg",
        constellation: { emoji: "🌟", color: "#ff6b9d" }
    },
    {
        id: 2,
        title: "First Date",
        date: "2023-02-14",
        description: "A perfect Valentine's Day that started it all",
        image: "first-date.jpg",
        constellation: { emoji: "💕", color: "#fd79a8" }
    },
    {
        id: 3,
        title: "First Movie Together",
        date: "2023-03-20",
        description: "Sharing popcorn and stolen glances",
        image: "first-movie.jpg",
        constellation: { emoji: "🎬", color: "#ffeaa7" }
    },
    {
        id: 4,
        title: "Made It Official",
        date: "2023-05-01",
        description: "The day we became 'us'",
        image: "official.jpg",
        constellation: { emoji: "💖", color: "#fab1a0" }
    },
    {
        id: 5,
        title: "First Trip Together",
        date: "2023-08-15",
        description: "Creating memories in new places",
        image: "first-trip.jpg",
        constellation: { emoji: "✈️", color: "#a29bfe" }
    },
    {
        id: 6,
        title: "The Proposal",
        date: "2024-12-25",
        description: "Christmas magic and the most important question",
        image: "proposal.jpg",
        constellation: { emoji: "💍", color: "#e17055" }
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
// JOURNEY PAGE FUNCTIONALITY - SIMPLIFIED
// ===================================

class JourneyTimeline {
    constructor() {
        // Simple coming soon page - no timeline functionality needed
        console.log('Journey page loaded - Coming Soon');
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
// This will be replaced by EnhancedApp initialization below

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

// ===================================
// PHASE 3C: FLOATING CARDS CONSTELLATION
// Mathematical Positioning and Animation System
// ===================================

class FloatingCardsConstellation {
    constructor() {
        this.container = document.getElementById('constellationContainer');
        this.cardsContainer = document.getElementById('constellationCards');
        this.backgroundStars = document.getElementById('backgroundStars');
        this.loading = document.getElementById('constellationLoading');
        
        this.cards = [];
        this.positions = [];
        this.isDesktop = window.innerWidth >= 1024;
        this.animationRAF = null;
        
        if (this.container) {
            this.initialize();
        }
    }
    
    initialize() {
        this.createBackgroundStars();
        this.calculatePositions();
        this.renderConstellationCards();
        this.startFloatingAnimations();
        this.setupResponsiveHandling();
        this.hideLoadingState();
    }
    
    createBackgroundStars() {
        if (!this.backgroundStars) return;
        
        const starEmojis = ['✨', '⭐', '🌟', '💫', '⚡'];
        const numStars = this.isDesktop ? 15 : 8;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'background-star';
            star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            
            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 3; // Random delay for twinkling
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.setProperty('--delay', `${delay}s`);
            
            this.backgroundStars.appendChild(star);
        }
    }
    
    calculatePositions() {
        if (!this.container) return;
        
        // Wait a moment for container to be properly sized
        setTimeout(() => {
            const containerRect = this.container.getBoundingClientRect();
            
            const containerWidth = containerRect.width - 40; // Account for padding
            const containerHeight = containerRect.height - 40;
            const cardWidth = this.isDesktop ? 300 : 280;
            const cardHeight = 220; // More accurate card height
            const minDistance = this.isDesktop ? 350 : 260; // Much larger minimum distance
            
            this.positions = [];
            
            if (this.isDesktop) {
                // Desktop: Scattered constellation pattern
                this.positions = this.generateScatteredPositions(
                    containerWidth, containerHeight, cardWidth, cardHeight, minDistance
                );
            } else {
                // Mobile: Vertical constellation with staggered positioning
                this.positions = this.generateVerticalConstellationPositions(
                    containerWidth, containerHeight, cardWidth, cardHeight
                );
            }
            
            // Re-render cards with new positions if they were already rendered
            if (this.cards.length > 0) {
                this.renderConstellationCards();
            }
        }, 100);
    }
    
    generateScatteredPositions(containerWidth, containerHeight, cardWidth, cardHeight, minDistance) {
        const positions = [];
        const numCards = journeyMilestones.length;
        
        // Much more spread out approach for desktop
        const margin = 80;
        const usableWidth = containerWidth - (margin * 2) - cardWidth;
        const usableHeight = containerHeight - (margin * 2) - cardHeight;
        
        console.log('Desktop generation:', {
            containerWidth, containerHeight, usableWidth, usableHeight, minDistance
        });
        
        // Create positions in a more spaced out pattern
        for (let i = 0; i < numCards; i++) {
            const progress = i / Math.max(1, numCards - 1);
            
            // Create two rows with 3 cards each, staggered
            const row = Math.floor(i / 3);
            const col = i % 3;
            const rowOffset = row * (usableHeight * 0.6); // Large row separation
            const colOffset = col * (usableWidth / 2); // Spread horizontally
            
            // Add some variation to make it feel more organic
            const xVariation = Math.sin(i * 1.5) * 60;
            const yVariation = Math.cos(i * 0.9) * 40;
            
            const baseX = margin + colOffset;
            const baseY = margin + rowOffset;
            
            const x = Math.max(margin, Math.min(baseX + xVariation, containerWidth - cardWidth - margin));
            const y = Math.max(margin, Math.min(baseY + yVariation, containerHeight - cardHeight - margin));
            
            positions.push({
                x,
                y,
                zIndex: i + 1
            });
        }
        
        console.log('Desktop positions before collision check:', positions);
        
        // Apply collision detection
        const adjusted = this.adjustForCollisions(positions, cardWidth, cardHeight, minDistance);
        console.log('Desktop positions after collision check:', adjusted);
        
        return adjusted;
    }
    
    generateChronologicalPath(containerWidth, containerHeight, numCards) {
        const points = [];
        const margin = 60;
        const usableWidth = containerWidth - (margin * 2);
        const usableHeight = containerHeight - (margin * 2);
        
        for (let i = 0; i < numCards; i++) {
            const progress = i / (numCards - 1); // 0 to 1
            
            // Create a flowing S-curve path from top-left to bottom-right
            let x, y;
            
            if (i === 0) {
                // First meeting - top left
                x = margin;
                y = margin;
            } else if (i === numCards - 1) {
                // Proposal - bottom right
                x = containerWidth - margin - 300;
                y = containerHeight - margin - 200;
            } else {
                // Create flowing path between start and end
                const xBase = margin + (usableWidth * progress);
                const yBase = margin + (usableHeight * progress);
                
                // Add S-curve variation
                const curveAmplitude = usableWidth * 0.15;
                const curveOffset = Math.sin(progress * Math.PI * 2) * curveAmplitude;
                
                x = xBase + curveOffset;
                y = yBase + (Math.sin(progress * Math.PI) * 50); // Gentle vertical variation
            }
            
            points.push({ x, y });
        }
        
        return points;
    }
    
    adjustForCollisions(positions, cardWidth, cardHeight, minDistance) {
        const adjustedPositions = [...positions];
        const maxIterations = 10;
        
        for (let iteration = 0; iteration < maxIterations; iteration++) {
            let hasCollisions = false;
            
            for (let i = 0; i < adjustedPositions.length; i++) {
                for (let j = i + 1; j < adjustedPositions.length; j++) {
                    const pos1 = adjustedPositions[i];
                    const pos2 = adjustedPositions[j];
                    
                    const dx = pos2.x - pos1.x;
                    const dy = pos2.y - pos1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < minDistance && distance > 0) {
                        hasCollisions = true;
                        
                        // Calculate push direction
                        const angle = Math.atan2(dy, dx);
                        const pushDistance = (minDistance - distance) / 2 + 5;
                        
                        // Push both cards apart
                        pos1.x -= Math.cos(angle) * pushDistance;
                        pos1.y -= Math.sin(angle) * pushDistance;
                        pos2.x += Math.cos(angle) * pushDistance;
                        pos2.y += Math.sin(angle) * pushDistance;
                        
                        console.log(`Collision detected between cards ${i} and ${j}, distance: ${distance.toFixed(2)}`);
                    }
                }
            }
            
            if (!hasCollisions) {
                console.log(`Collision resolution completed after ${iteration + 1} iterations`);
                break;
            }
        }
        
        return adjustedPositions;
    }
    
    generateVerticalConstellationPositions(containerWidth, containerHeight, cardWidth, cardHeight) {
        const positions = [];
        const numCards = journeyMilestones.length;
        const margin = 20;
        
        // Super simple: just stack vertically with large gaps
        const cardSpacing = 280; // Fixed large spacing
        let currentY = margin;
        
        console.log('Simple mobile layout:', {
            containerWidth, containerHeight, cardSpacing, numCards
        });
        
        for (let i = 0; i < numCards; i++) {
            // Alternate sides but with huge spacing
            const isEven = i % 2 === 0;
            const x = isEven ? margin : containerWidth - cardWidth - margin;
            
            positions.push({
                x: Math.max(margin, Math.min(x, containerWidth - cardWidth - margin)),
                y: currentY,
                zIndex: i + 1
            });
            
            currentY += cardSpacing; // Large fixed spacing
        }
        
        console.log('Simple mobile positions:', positions);
        return positions;
    }
    
    renderConstellationCards() {
        if (!this.cardsContainer || !journeyMilestones.length) return;
        
        // Clear existing cards
        this.cardsContainer.innerHTML = '';
        this.cards = [];
        
        journeyMilestones.forEach((milestone, index) => {
            const card = this.createConstellationCard(milestone, index);
            this.cardsContainer.appendChild(card);
            this.cards.push(card);
        });
    }
    
    createConstellationCard(milestone, index) {
        const position = this.positions[index] || { x: 50, y: 50, zIndex: 1 };
        
        const card = document.createElement('div');
        card.className = 'constellation-card';
        card.setAttribute('data-milestone-id', milestone.id);
        
        // Position the card
        card.style.left = `${position.x}px`;
        card.style.top = `${position.y}px`;
        card.style.zIndex = position.zIndex;
        card.style.setProperty('--entrance-delay', `${index * 0.2}s`);
        
        // Format date
        const date = new Date(milestone.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Card content
        card.innerHTML = `
            <div class="constellation-card-content">
                <div class="constellation-emoji" style="color: ${milestone.constellation.color}">
                    ${milestone.constellation.emoji}
                </div>
                <h3 class="constellation-card-title">${milestone.title}</h3>
                <div class="constellation-card-date">${formattedDate}</div>
            </div>
        `;
        
        // Add click handler
        card.addEventListener('click', () => this.handleCardClick(milestone, index));
        
        return card;
    }
    
    startFloatingAnimations() {
        // Floating animations are handled by CSS
        // This method can be used for additional dynamic animations if needed
        console.log('Floating animations started via CSS');
    }
    
    handleCardClick(milestone, index) {
        console.log(`Constellation card clicked: ${milestone.title}`);
        
        // Add click animation
        const card = this.cards[index];
        if (card) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        }
        
        // Show milestone detail modal (placeholder for now)
        this.showMilestoneModal(milestone);
    }
    
    showMilestoneModal(milestone) {
        // Simple alert for now - will be enhanced in Step 4
        const message = `${milestone.constellation.emoji} ${milestone.title}\n\n${milestone.description}\n\nDate: ${new Date(milestone.date).toLocaleDateString()}`;
        alert(message);
    }
    
    setupResponsiveHandling() {
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                const wasDesktop = this.isDesktop;
                this.isDesktop = window.innerWidth >= 1024;
                
                if (wasDesktop !== this.isDesktop) {
                    console.log('Layout changed, recalculating positions...');
                    this.calculatePositions();
                    this.renderConstellationCards();
                }
            }, 250);
        });
    }
    
    hideLoadingState() {
        if (this.loading) {
            setTimeout(() => {
                this.loading.classList.add('hidden');
                setTimeout(() => {
                    this.loading.style.display = 'none';
                }, 500);
            }, 1500); // Show loading for 1.5 seconds
        }
    }
    
    destroy() {
        if (this.animationRAF) {
            cancelAnimationFrame(this.animationRAF);
        }
        
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.setupResponsiveHandling);
        
        console.log('Floating Cards Constellation destroyed');
    }
}

class ConstellationApp extends App {
    constructor() {
        super();
        this.constellation = null;
        this.initializeConstellation();
    }
    
    initializeConstellation() {
        // Only initialize constellation on journey page
        if (document.body.classList.contains('journey-page')) {
            this.constellation = new FloatingCardsConstellation();
        }
    }
    
    setupCleanup() {
        super.setupCleanup();
        
        window.addEventListener('beforeunload', () => {
            if (this.constellation) {
                this.constellation.destroy();
            }
        });
    }
}

// Initialize constellation application
if (typeof App !== 'undefined') {
    // Use constellation app for all pages
    window.app = new ConstellationApp();
}

