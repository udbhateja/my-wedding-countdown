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
        date: "2024-08-30",
        image: "01-first-meet.jpg",
        location: "McD Crossriver Mall",
    },
    {
        id: 2,
        title: "#Rokafied",
        date: "2024-11-23",
        image: "02-roka.jpg",
        location: "3 Storey Restaurant",
    },
    {
        id: 3,
        title: "First Date",
        date: "2024-11-25",
        image: "03-first-date.jpg",
        location: "CP, Delhi",
    },
    {
        id: 4,
        title: "First Movie",
        date: "2024-12-15",
        image: "04-first-movie.jpg",
        location: "NSP",
    },
    {
        id: 5,
        title: "Chai Date",
        date: "2024-12-17",
        image: "05-chai-date.jpg",
        location: "Chaayos, ISBT",
    },
    {
        id: 6,
        title: "Komu Bday",
        date: "2025-02-07",
        images: ["06-1-bday-cake.jpg", "06-2-bday.jpg"],
        location: "F-Block",
    },
    {
        id: 7,
        title: "Valentines",
        date: "2025-02-14",
        image: "07-valentines.jpg",
        location: "Bangalore",
    },
    {
        id: 8,
        title: "First Gurudwara Visit",
        date: "2025-04-11",
        image: "08-first-gurudwara.jpg",
        location: "Sis Ganj Sahib",
    },
    {
        id: 9,
        title: "First Baarish",
        date: "2025-04-11",
        image: "09-first-baarish.jpg",
        location: "Red Fort",
    },
    {
        id: 10,
        title: "First Kiss",
        date: "2025-04-12",
        image: "10-first-kiss.jpg",
        location: "Moonlight Park",
    },
    {
        id: 11,
        title: "First Period",
        date: "2025-04-12",
        image: ["11-first-period.jpg", "11-india-gate.jpg"],
        location: "Our First Home",
    },
    {
        id: 12,
        title: "Maharaj Ji",
        date: "2025-05-02",
        image: "12-maharaj-ji.jpg",
        location: "Shalimar Bag",
    },
    {
        id: 13,
        title: "To Airport",
        date: "2025-06-19",
        image: ["13-1-airport.jpg", "13-2-airport.jpg"],
        location: "Airport",
    },
    {
        id: 21,
        title: "Pizaa >>> Uday",
        date: "2025-06-19",
        image: "pizza.mp4",
        location: "Pizza Hut, IGI",
    },
    {
        id: 14,
        title: "My Bday",
        date: "2025-07-08",
        image: "14-my-bday.jpg",
        mediaFit: "contain",
        location: "Bangalore",
    },
    {
        id: 15,
        title: "Mehndi #UDAY",
        date: "2025-07-27",
        image: "17-mehndi.jpg",
        location: "Delhi",
    },
    {
        id: 22,
        title: "🫶💘",
        date: "2025-10-08",
        image: "hands.MOV",
        location: "CP",
    },
    {
        id: 16,
        title: "Dinner Date",
        date: "2025-10-08",
        image: "15-dinner-date.jpg",
        location: "Qutub Minar",
    },
    {
        id: 17,
        title: "First Auto Ride",
        date: "2025-11-08",
        image: "16-first-auto.jpg",
        location: "Delhi",
    },  
    {
        id: 18,
        title: "I love you 😘",
        date: "2025-11-21",
        images: ["99-01.jpg", "99-02.jpg", "99-03.jpg", "99-04.jpg", "99-05.jpg"],
        mediaFit: "contain",
        location: "Delhi",
    },
    {
        id: 19,
        title: "First Nazar",
        date: "2025-11-08",
        image: "nazar.mp4",
        location: "Whatsapp",
    },
    {
        id: 20,
        title: "Chai #TezPati",
        date: "2025-11-08",
        image: "vlog.mp4",
        location: "Whatsapp",
    }
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm'];

const isImageFile = (filename = '') => {
    return IMAGE_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
};

const isVideoFile = (filename = '') => {
    return VIDEO_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
};

const getMilestoneMedia = (milestone) => {
    if (!milestone) return [];
    if (Array.isArray(milestone.images)) {
        return milestone.images.filter(Boolean);
    }
    if (Array.isArray(milestone.image)) {
        return milestone.image.filter(Boolean);
    }
    if (milestone.images) {
        return [milestone.images].filter(Boolean);
    }
    if (milestone.image) {
        return [milestone.image].filter(Boolean);
    }
    return [];
};

// ===================================
// BACKGROUND SLIDESHOW SYSTEM
// Romantic Photo Carousel with Automatic Transitions
// ===================================

class BackgroundSlideshow {
    constructor() {
        this.container = document.getElementById('slideshowContainer');
        if (!this.container) return;
        
        this.currentIndex = 0;
        this.slides = [];
        this.slideInterval = null;
        this.transitionDuration = 3000; // 3 seconds per slide
        
        // Get available milestone images
        const collectedImages = journeyMilestones
            .flatMap(milestone => getMilestoneMedia(milestone))
            .filter(isImageFile);

        this.images = [...new Set(collectedImages)]
            .map(imageName => `assets/images/${imageName}`);
        
        if (this.images.length > 0) {
            this.initialize();
        }
    }
    
    initialize() {
        this.createSlides();
        this.startSlideshow();
    }
    
    createSlides() {
        // Create slide elements for each image
        this.images.forEach((imageSrc, index) => {
            const slide = document.createElement('div');
            slide.className = 'slideshow-slide';
            slide.classList.add(index % 2 === 0 ? 'scale-up' : 'scale-down');
            slide.style.backgroundImage = `url('${imageSrc}')`;
            
            // Set first slide as active
            if (index === 0) {
                slide.classList.add('active');
            }
            
            this.container.insertBefore(slide, this.container.firstChild);
            this.slides.push(slide);
        });
    }
    
    startSlideshow() {
        // Only run slideshow if there are multiple images
        if (this.slides.length <= 1) return;
        
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.transitionDuration);
    }
    
    nextSlide() {
        const currentSlide = this.slides[this.currentIndex];
        currentSlide.classList.remove('active');
        currentSlide.classList.add('previous');
        window.clearTimeout(currentSlide._previousTimeout);
        currentSlide._previousTimeout = window.setTimeout(() => {
            currentSlide.classList.remove('previous');
        }, 900);
        
        // Move to next slide (loop back to start)
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        
        // Add active class to new slide
        this.slides[this.currentIndex].classList.add('active');
    }
    
    destroy() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        if (this.container) {
            this.container.innerHTML = '<div class="slideshow-overlay"></div>';
        }
    }
}

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
        this.sliderCleanups = [];
        
        if (this.container) {
            this.initialize();
        }
    }
    
    initialize() {
        this.renderTimeline();
    }
    
    renderTimeline() {
        if (!this.container || !this.milestones.length) return;
        
        this.teardownSlideshows();
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
        const mediaSources = getMilestoneMedia(milestone);
        const cardImageMarkup = this.buildCardMediaMarkup(milestone, mediaSources);
        
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
                ${cardImageMarkup}
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
        
        if (mediaSources.length > 1) {
            this.setupCardSlideshow(card);
        }
        
        return event;
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.teardownSlideshows();
    }

    buildCardMediaMarkup(milestone, mediaSources) {
        if (!mediaSources.length) {
            return '<div class="card-image-placeholder">💕</div>';
        }

        if (mediaSources.length === 1) {
            return this.buildMediaElement(milestone, mediaSources[0], true, false);
        }

        const slides = mediaSources.map((media, index) => {
            const isActive = index === 0;
            return this.buildMediaElement(milestone, media, isActive, true);
        }).join('');

        const indicators = `<div class="card-image-indicators">${mediaSources.map((_, index) => {
            const indicatorClass = index === 0 ? 'card-image-indicator active' : 'card-image-indicator';
            return `<span class="${indicatorClass}"></span>`;
        }).join('')}</div>`;

        return `
            <div class="card-image-slider" data-slide-interval="1500">
                ${slides}
                ${indicators}
            </div>
        `;
    }

    buildMediaElement(milestone, mediaSource, isActive, isSlider = true) {
        const isVideo = isVideoFile(mediaSource);
        const mediaType = isVideo ? 'video' : 'image';
        const fitPreference = this.getMediaFitPreference(milestone, mediaType);

        const classes = [isSlider ? 'card-slide' : 'card-media', `media-${fitPreference}`];
        if (isSlider && isActive) {
            classes.push('active');
        }

        const dataAttributes = `data-media-type="${mediaType}"`;

        if (!isVideo && isImageFile(mediaSource)) {
            const altText = `${milestone.title}`;
            return `<img ${dataAttributes} class="${classes.join(' ')}" src="assets/images/${mediaSource}" alt="${altText}" loading="lazy">`;
        }

        if (isVideo) {
            const videoType = mediaSource.toLowerCase().endsWith('.mov') ? 'video/quicktime' :
                mediaSource.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4';
            return `
                <video ${dataAttributes} class="${classes.join(' ')}" data-card-video muted playsinline loop preload="metadata" controls>
                    <source src="assets/images/${mediaSource}" type="${videoType}">
                    Your browser does not support the video tag.
                </video>
            `;
        }

        return '<div class="card-image-placeholder">💕</div>';
    }

    getMediaFitPreference(milestone, mediaType) {
        const normalizeFit = (value) => {
            if (typeof value !== 'string') return null;
            const normalized = value.toLowerCase();
            return normalized === 'cover' || normalized === 'contain' ? normalized : null;
        };

        const preference = milestone && milestone.mediaFit;
        const typeKey = mediaType === 'video' ? 'video' : 'image';

        let fit = normalizeFit(preference);

        if (!fit && preference && typeof preference === 'object') {
            fit = normalizeFit(preference[typeKey]) || normalizeFit(preference.default);
        }

        if (fit) {
            return fit;
        }

        return mediaType === 'video' ? 'contain' : 'cover';
    }

    setupCardSlideshow(card) {
        const slider = card.querySelector('.card-image-slider');
        if (!slider) return;

        const slides = Array.from(slider.querySelectorAll('.card-slide'));
        const indicators = Array.from(slider.querySelectorAll('.card-image-indicator'));
        if (slides.length <= 1) return;

        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let currentIndex = 0;
        const intervalDuration = parseInt(slider.dataset.slideInterval, 10) || 1500;

        const playSlideMedia = (slide) => {
            if (slide && slide.tagName === 'VIDEO') {
                slide.muted = true;
                const playPromise = slide.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                    playPromise.catch(() => {});
                }
            }
        };

        const pauseSlideMedia = (slide, reset = false) => {
            if (slide && slide.tagName === 'VIDEO') {
                slide.pause();
                if (reset) {
                    try {
                        slide.currentTime = 0;
                    } catch (error) {
                        // Ignore DOMExceptions for non-seekable streams
                    }
                }
            }
        };

        const showSlide = (nextIndex) => {
            const previousIndex = currentIndex;
            const previousSlide = slides[previousIndex];
            previousSlide.classList.remove('active');
            previousSlide.classList.add('previous');
            pauseSlideMedia(previousSlide, true);
            if (indicators[previousIndex]) {
                indicators[previousIndex].classList.remove('active');
            }

            currentIndex = nextIndex;

            const nextSlide = slides[currentIndex];
            nextSlide.classList.remove('previous');
            nextSlide.classList.add('active');
            playSlideMedia(nextSlide);
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }

            window.clearTimeout(previousSlide._cleanupTimeout);
            previousSlide._cleanupTimeout = window.setTimeout(() => {
                previousSlide.classList.remove('previous');
            }, 700);
        };

        const advance = () => {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        };

        let intervalId = window.setInterval(advance, intervalDuration);

        const stop = () => {
            if (intervalId === null) return;
            window.clearInterval(intervalId);
            intervalId = null;
        };

        const start = () => {
            if (intervalId !== null) return;
            intervalId = window.setInterval(advance, intervalDuration);
        };

        const handleMouseEnter = () => stop();
        const handleMouseLeave = () => start();

        slider.addEventListener('mouseenter', handleMouseEnter);
        slider.addEventListener('mouseleave', handleMouseLeave);

        playSlideMedia(slides[currentIndex]);

        const cleanup = () => {
            stop();
            slider.removeEventListener('mouseenter', handleMouseEnter);
            slider.removeEventListener('mouseleave', handleMouseLeave);
            slides.forEach(slide => {
                window.clearTimeout(slide._cleanupTimeout);
                pauseSlideMedia(slide, true);
            });
        };

        this.sliderCleanups.push(cleanup);
    }

    teardownSlideshows() {
        if (!this.sliderCleanups.length) return;
        this.sliderCleanups.forEach(cleanup => cleanup());
        this.sliderCleanups = [];
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
        // Initialize countdown timer, slideshow, and floating hearts on main page
        if (document.querySelector('.countdown-container')) {
            this.slideshow = new BackgroundSlideshow();
            new CountdownTimer();
            this.floatingHearts = new FloatingHeartsAnimation();
        }
        
        // Initialize vertical zigzag timeline on journey page
        if (document.querySelector('.journey-page')) {
            this.timeline = new VerticalZigzagTimeline();
        }
        
        // Preload images
        const imageUrls = [...new Set(
            journeyMilestones.flatMap(milestone => 
                getMilestoneMedia(milestone)
                    .filter(isImageFile)
                    .map(image => `assets/images/${image}`)
            )
        )];
        Utils.preloadImages(imageUrls);
        
        // Add smooth page transitions
        this.setupPageTransitions();
        
        // Setup cleanup on page unload
        this.setupCleanup();
    }
    
    setupCleanup() {
        window.addEventListener('beforeunload', () => {
            if (this.slideshow) {
                this.slideshow.destroy();
            }
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
