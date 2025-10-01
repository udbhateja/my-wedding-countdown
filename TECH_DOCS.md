# Marriage Countdown Website - Technical Documentation

## Project Overview
**Project Name:** Marriage Countdown Website  
**Target Date:** November 21, 2025  
**Platform:** Web Application (Mobile-First Responsive Design)  
**Deployment:** Netlify Hosting  

## Architecture Overview
- **Frontend Framework:** Vanilla HTML5, CSS3, JavaScript ES6+
- **Design Pattern:** Mobile-First Progressive Enhancement
- **Responsive Framework:** Custom CSS Grid & Flexbox
- **Interaction Model:** Touch-Optimized Mobile Interface

## Technical Specifications

### Core Components
1. **Countdown Timer Module**
   - Real-time countdown to November 21, 2025
   - Granularity: Days, Hours, Minutes, Seconds
   - Calendar-style visual presentation

2. **Journey Timeline Module**
   - Dynamic milestone rendering
   - Touch-optimized card interactions
   - Chronological data presentation
   - Image lazy loading implementation

### Directory Structure
```
my-wedding-countdown/
├── assets/
│   ├── css/
│   │   └── style.css (Main stylesheet)
│   ├── images/ (User-provided photos)
│   └── js/
│       └── script.js (Core JavaScript logic)
├── index.html (Main countdown page)
├── journey.html (Journey timeline page)
├── README.md (Project documentation)
└── TECH_DOCS.md (This file)
```

## Development Phases

### Phase 1: Environment Setup ✅ COMPLETED
- [x] Directory structure creation
- [x] Base file initialization
- [x] Project documentation setup

### Phase 2: Core Architecture Development ✅ COMPLETED
- [x] HTML semantic structure
- [x] CSS responsive framework
- [x] JavaScript countdown logic
- [x] Mobile-first responsive design
- [x] Touch-optimized interactions
- [x] Cross-browser compatibility

### Phase 3: User Experience Implementation (CLEANED)
#### Phase 3A - Core UX Enhancements ✅ COMPLETED
- [x] Mobile interaction patterns
- [x] Romantic UI component library
- [x] Navigation flow optimization
- [x] Names display implementation (Uday ❤️ Komal)
- [x] Advanced floating hearts animation system
- [x] Romantic pastel background with heart patterns
- [x] Performance-optimized animation framework
- [x] Z-index layering fix for floating hearts positioning
- [x] **COMPLETE ANIMATION SYSTEM REWRITE**: Clean dual-direction floating hearts implementation
  - **Left Lane**: Top-to-bottom animation with pink hearts (💕 style)
  - **Right Lane**: Bottom-to-top animation with purple hearts (💖 style)
  - **Eliminated ALL timing conflicts**: Single setTimeout per heart with CSS-only animations
  - **Staggered spawn system**: Left and right lanes spawn 2.5 seconds apart for visual rhythm
  - **Performance optimized**: 3 hearts max per lane, 5-second intervals, 8-12 second durations
  - **Clean architecture**: No race conditions, no opacity conflicts, no sudden appearances/disappearances

#### Phase 3B - Journey Page Reset ✅ COMPLETED
- [x] **Timeline Implementation Removed**: All complex timeline code deleted
- [x] **Clean Loading Page**: Simple "Coming Soon" design with romantic animations
- [x] **Codebase Cleanup**: Removed 500+ lines of CSS and 400+ lines of JavaScript
- [x] **Architecture Reset**: Clean foundation ready for new implementation

#### Phase 3C - Vertical Zigzag Timeline ✅ MINIMALIST VERSION COMPLETED
- [x] **Vertical Zigzag Layout**: Clean minimalist timeline design
  - **Desktop Layout**: Center timeline with alternating left/right cards (zigzag pattern)
  - **Mobile Layout**: Full-width stacked cards (no center line on narrow screens)
  - **Timeline Dots**: Heart-filled dots (❤️) on center line connecting milestones
  - **Chronological Order**: Cards follow love story timeline from First Meeting → Engagement Party
- [x] **Minimalist Card Design**: Essential information only
  - **Image Section**: 16:9 aspect ratio images with hover zoom effect and romantic placeholders (💕)
  - **Date Badge**: Formatted date with 📅 icon and gradient background
  - **Title**: Large bold title (1.5-2rem responsive)
  - **Location Badge**: Geographic context with 📍 icon
  - **Decorative Hearts**: Three hearts (💕💖💗) at card bottom
  - **Hover Effects**: Card lift (-8px), shadow enhancement, image zoom (1.1x)
  - **Sparkle Icon**: Subtle ✨ decoration on each card
- [x] **Simplified Hero Section**: Minimal opening
  - **3 Hearts Only**: 💕💖💗 with pulsing animation (staggered delays)
  - **Pastel Background**: Soft gradient (purple → pink → rose)
  - **Removed**: Title, subtitle, quote paragraph - starts directly with hearts
- [x] **Header Navigation**: Sticky header with glassmorphism effect
  - **Back Button**: Gradient button returning to countdown page
  - **Title Badge**: "Our Love Story" with heart icons and gradient background
  - **Responsive Design**: Mobile-optimized with hidden text labels
- [x] **Simplified Final Section**: Minimal closing
  - **3 Hearts Only**: 💕💖💗 with pulsing animation (staggered delays)
  - **Transparent Background**: No card styling, just hearts
  - **Removed**: Title, subtitle, description, CTA button - ends directly with hearts
- [x] **Visual Enhancements**: Atmospheric background elements
  - **Floating Sparkles**: Subtle ✨ emojis with gentle float animation
  - **Floating Hearts**: Soft 💕💖 emojis in background with pulse effect
  - **Low Opacity**: 0.2 opacity to avoid distraction from main content
- [x] **Performance Architecture**: Clean and efficient implementation
  - **Dynamic Rendering**: JavaScript generates all timeline events from data
  - **Lazy Loading**: Images load progressively as user scrolls
  - **Smooth Animations**: CSS transitions for hover and entrance effects
  - **Mobile Responsive**: Breakpoint at 1024px for layout switching
  - **Reduced Card Height**: min-height 320px (optimized for image-only content)
  - **Accessibility**: Semantic HTML with proper heading hierarchy

### Phase 4: Future Implementation (READY)
#### Phase 4A - Content Integration (PENDING)
- [ ] Image asset pipeline development
- [ ] Dynamic content management system
- [ ] Photo optimization and lazy loading
- [ ] Asset management workflow

#### Phase 4B - Advanced Visual Features (PENDING) 
- [ ] Interactive animations and effects
- [ ] Performance optimization
- [ ] Cross-device compatibility
- [ ] User experience enhancements

### Phase 5: Quality Assurance & Testing (PENDING)
- [ ] Cross-device compatibility validation
- [ ] Performance optimization metrics (target: <2s load time)
- [ ] Animation performance benchmarking
- [ ] Mobile touch interaction testing
- [ ] Slideshow performance validation
- [ ] User acceptance testing protocols

### Phase 6: Deployment (PENDING)
- [ ] Netlify configuration
- [ ] Production environment setup
- [ ] Go-live execution

## Technical Requirements
- **Browser Support:** Modern browsers (Chrome, Safari, Firefox, Edge)
- **Mobile Compatibility:** iOS Safari, Chrome Mobile
- **Performance Targets:** <2s initial load time
- **Image Optimization:** Progressive loading, WebP format support

## Planned Feature Enhancements

### First Page (Countdown) Enhancements:
1. **Names Display:** "Uday ❤️ Komal" romantic typography
2. **Floating Hearts Animation:** Top-to-bottom animated heart emojis
3. **Background Slideshow:** Dynamic photo carousel (Phase 4B)

### Second Page (Journey) Enhancements:
1. **Romantic Background:** Pastel colors with heart emoji patterns
2. **Responsive Scroll:** Vertical (mobile) / Horizontal (desktop/tablet)
3. **Timeline Path:** Curved path format instead of straight line
4. **Card Optimization:** Remove descriptions for cleaner design

## Implementation Strategy
- **Phase 3A:** Basic romantic elements (names, simple hearts, backgrounds)
- **Phase 3B:** Advanced interactions and responsive behaviors
- **Phase 4B:** Complex visual features (slideshow, SVG paths)

## Recent Implementation Details

### Phase 3A - Core UX Enhancements Implementation ✅ COMPLETED (REFINED)

**Personalization Layer:**
- Implemented "Uday ❤️ Komal" display with romantic typography hierarchy (positioned at top)
- Integrated Great Vibes font family with responsive scaling (clamp 2rem to 3.5rem)
- Added gentle glow animation with CSS keyframes and text-shadow effects
- Heart separator emoji with reduced size (0.8em) and optimized pulsing animation

**Floating Hearts Animation System (COMPLETE REWRITE - Enterprise Architecture):**
- **Dual-Direction Animation Framework**: Clean separation of left/right lane logic
  - **Left Lane (Pink Hearts)**: Top-to-bottom movement starting from -5vh to 105vh
  - **Right Lane (Purple Hearts)**: Bottom-to-top movement starting from 105vh to -5vh
  - **Lane Positioning**: Left lane covers 0-35% screen width, right lane covers 65-100% screen width
- **Timing Architecture**: Completely eliminated race conditions and sudden appearances
  - **Staggered Spawn System**: Right lane starts 2.5 seconds after left lane for visual rhythm
  - **Single Timeout Per Heart**: Clean removal after animation completion (8-12 second duration)
  - **No Opacity Conflicts**: CSS animations handle all visual transitions smoothly
- **Performance Specifications**: 3 hearts maximum per lane, 5-second spawn intervals
- **CSS Keyframe Implementation**: 
  - `floatDownLeft`: Smooth top-to-bottom with 5%-95% opacity window
  - `floatUpRight`: Smooth bottom-to-top with 5%-95% opacity window
  - Subtle scale and rotation effects (0.8 to 1.1 scale, up to 720° rotation)
- **Enterprise-Grade Memory Management**: Automatic cleanup with lane-specific counters

**User Interface Refinements:**
- **Days counter formatting**: Removed leading zeros (55 instead of 055)
- **Layout optimization**: Names fixed at top, content section centered with flexbox architecture
- **Click indicator**: Replaced heart icon with animated circular pulse indicator (50px diameter)
- **Typography hierarchy**: Smaller journey prompt text (0.95rem) for improved visual balance
- **Animation smoothing**: Eliminated heart emoji flashing near top with adjusted opacity timing (5%-95%)
- **Extended heart duration**: 12-14 second animation cycles for smoother visual flow

**Romantic Background Enhancement:**
- Journey page multi-layered gradient background system
- Subtle heart emoji patterns with 20-second gentle float animation
- Radial gradient overlays for depth and visual richness
- Optimized opacity levels (0.08-0.1) for subtle romantic ambiance

**Technical Architecture Improvements:**
- **Z-index layering optimization**: Fixed floating hearts appearing above names section
  - Floating hearts container: z-index 0 (background layer)
  - Names section: z-index 10 (top priority)
  - Content section: z-index 5 (middle layer)
- Touch interaction enhancements with webkit-tap-highlight-color
- Mobile-responsive font scaling for floating hearts
- Performance monitoring with animation frame optimization

## Change Log
- **2025-09-26:** Project initialization and Phase 1 completion
- **2025-09-26:** Phase 2 core architecture implementation completed
- **2025-09-26:** Feature enhancement roadmap and phased implementation plan
- **2025-09-27:** Phase 3A core UX enhancements implementation completed
- **2025-09-27:** Phase 3A refinements: 5-emoji system, two-lane hearts, removed leading zeros, click indicator
- **2025-09-27:** Phase 3A final optimizations: eliminated heart flashing, centered layout, reduced click indicator
- **2025-09-27:** Critical z-index layering fix: floating hearts now properly positioned behind names section
- **2025-09-27:** **COMPLETE ANIMATION SYSTEM REWRITE**: Implemented clean dual-direction floating hearts architecture
- **2025-09-30:** **✅ PHASE 3C VERTICAL ZIGZAG TIMELINE - MINIMALIST VERSION COMPLETED**
  - **Design Philosophy**: Clean minimalist approach - let images tell the story
  - **Vertical Zigzag Pattern**: Alternating left/right cards with center timeline and heart dots
  - **Simplified Cards**: Image + Title + Date + Location only (removed quotes and descriptions)
  - **Minimalist Hero**: Just 3 hearts (💕💖💗) with pulse animation - no title/subtitle/quote
  - **Minimalist Ending**: Just 3 hearts (💕💖💗) with pulse animation - no final message card
  - **Sticky Header**: Glassmorphism header with back button and "Our Love Story" badge
  - **Mobile Responsive**: Full-width cards on mobile, zigzag on desktop (1024px breakpoint)
  - **12 Milestones**: Complete love story from First Meeting to Engagement Party
  - **Optimized Height**: Reduced card min-height to 320px for cleaner layout
  - **Production Ready**: Clean code, focus on images and essential info only
- **2025-09-30:** **✅ PHASE 3D CARD DESIGN ENHANCEMENT - OPTION A IMPLEMENTATION**
  - **Full-Bleed Image Design**: Images touch card edges with rounded top corners only
  - **Enhanced Gradient Background**: Lavender (#e9d5ff) → Rose Pink (#fecdd3) → Peach (#fed7aa)
  - **Unified Date/Location Badge**: Single line with bullet separator and glassmorphism effect
  - **Typography Refinement**: Black title (700 weight), -0.01em letter-spacing for premium feel
  - **Removed Elements**: Sparkle icon, bottom decorative hearts for maximum elegance
  - **Hover Enhancement**: Enhanced shadow with pink glow effect, subtle image zoom (1.08x)
  - **Content Spacing**: Increased top padding (32px) for better optical balance
  - **Card Height**: Increased to 380px to accommodate new layout proportions
  - **SVG Icons**: Replaced emoji icons with clean SVG calendar and map pin icons
  - **Text Color Enhancement**: Date/location color changed to #c2185b (dark pink/magenta)
  - **Badge Refinement**: Improved padding (8px 16px), spacing, and increased margin-bottom
  - **Visual Polish**: Enhanced badge opacity (0.85), tighter gaps, refined separator styling
  - **Card Width Optimization**: Max-width 420px for better proportions (narrower, more elegant)
  - **Top Padding**: Reduced to 10px for tighter image-to-content spacing
  - **Title Weight**: Set to 500 (medium) for refined, readable appearance
  - **Dynamic Card Height**: Removed min-height constraint for content-based sizing
  - **Hero Section Refinement**: Removed gradient background bar, reduced heart size to 1.5rem
  - **Spacing Optimization**: Reduced hero/final padding for cleaner, more minimal appearance
  - **Timeline Line Fix**: Repositioned line to end with last card, preventing overlap with final hearts
  - **Floating Elements Removal**: Removed floating hearts and sparkles for cleaner background
- **2025-09-30:** **✅ PHASE 3E ROMANTIC BACKGROUND SYSTEM IMPLEMENTATION**
  - **Multi-Color Gradient**: Purple-100 → Pink-100 → Rose-100 → Amber-100 (dreamy pastel gradient)
  - **SVG Pattern Overlay**: Subtle pink circular pattern at 0.1 opacity for depth
  - **Floating Sparkles**: 3 sparkle emojis (✨) positioned at 20%, 50%, 80% with staggered pulse animation
  - **Floating Hearts**: 2 heart emojis (💖) positioned at 25% and 75% with gentle pulse effect
  - **Animation System**: 4s sparkle-pulse animation with rotation and scale transformations
  - **Header Enhancement**: Gradient background with glassmorphism (white → pink → white)
  - **Z-Index Layering**: Pattern (z-1), sparkles/hearts (z-2), content (z-10+)
  - **Mobile Optimized**: All decorative elements use pointer-events: none for seamless interaction
  - **Production Ready**: Clean implementation with clear visual hierarchy and romantic atmosphere
  - **CRITICAL FIX**: Removed overflow:hidden from .journey-page, changed background elements to position:fixed
  - **Scroll Behavior**: Background elements now stay fixed while content scrolls naturally
- **2025-09-30:** **✅ PHASE 3F HEADER REDESIGN - INTEGRATED ROMANTIC AESTHETIC**
  - **Button Text Shortened**: "Back to Countdown" → "Back" for cleaner layout
  - **Removed Heart Emojis**: Eliminated cluttered heart icons from header badge
  - **Gradient Button**: Enhanced back button with pink gradient (primary → accent)
  - **Transparent Title**: "Our Love Story" uses gradient text with -webkit-background-clip
  - **Subtle Heart Decoration**: Added ::before/::after pseudo-elements with small hearts (0.4em)
  - **Enhanced Glassmorphism**: Upgraded to 24px blur with 180% saturation for richer effect
  - **Diagonal Gradient Background**: White → Pink-tinted → White (135deg angle)
  - **Border Enhancement**: 2px bottom border with pink tint (0.15 opacity)
  - **Soft Shadow**: Added 0 4px 24px pink-tinted shadow for depth
  - **Flexbox Layout**: Proper spacing with gap property, flex:1 for centered title
  - **Responsive Design**: Mobile optimizations hide decorative hearts, adjust spacing
  - **No Overlap**: Fixed spacing ensures back button and title never collide
  - **Production Polish**: Enhanced hover effects, active states, letter-spacing refinement
- **2025-09-30:** **✅ PHASE 4A BACKGROUND SLIDESHOW IMPLEMENTATION**
  - **Full-Screen Photo Carousel**: Background slideshow system for countdown page
  - **Ken Burns Effect**: Cinematic zoom/pan animation (1.08x scale over 7s)
  - **Smooth Crossfade**: 2s opacity transitions between photos
  - **Auto-Cycle**: 7-second interval per slide with automatic looping
  - **Alternate Animations**: Even slides zoom in, odd slides zoom out for variety
  - **Dark Overlay**: Semi-transparent gradient ensures text readability
  - **Smart Detection**: Automatically loads all available milestone photos
  - **Graceful Fallback**: Displays gradient background if no photos available
  - **Performance Optimized**: GPU-accelerated transforms, efficient interval management
  - **Responsive Design**: Scales beautifully across all device sizes
  - **Class Architecture**: BackgroundSlideshow class with lifecycle management
  - **Current Assets**: 3 photos loaded (first-meeting.jpg, first-date.jpg, first-movie.jpg)
  - **Production Ready**: Clean code, proper cleanup on page unload
- **2025-09-30:** **✅ PHASE 4B TIMELINE VISUAL REFINEMENTS**
  - **Thickened Center Line**: Timeline bar width increased from 4px to 8px for better visibility
  - **Heart Dot Repositioning**: Moved heart dots from center (top: 50%) to card start (top: 0)
  - **Improved Alignment**: Dots now align with top of cards for clearer visual hierarchy
  - **Transform Optimization**: Updated hover transforms to maintain proper positioning
  - **Visual Clarity**: Thicker line creates stronger visual backbone for timeline
  - **Card Height Increase**: Image height expanded from 240px to 320px (33% larger)
  - **Better Photo Display**: More vertical space shows fuller composition of photos
  - **Production Ready**: Clean CSS updates with proper commenting
- **2025-09-30:** **✅ PHASE 4C MOBILE HEADER ALIGNMENT FIX (FINAL - WITH !IMPORTANT)**
  - **Centering Solution**: Changed approach from spacer-matching to flex:1 on header-title
  - **Spacer Removal**: Hidden spacer on mobile (display: none) - not needed with new approach
  - **Title Container**: header-title now uses flex:1 with justify-content:center for perfect centering
  - **Button Sizing**: Removed min-width constraints, let button size naturally based on content
  - **Gap Reduction**: Reduced header gap from var(--spacing-sm) to var(--spacing-xs) for tighter layout
  - **Vertical Alignment**: Added align-items:center to header and button for perfect y-axis centering
  - **Button Flexbox**: Back button uses display:flex with align-items:center and gap:6px
  - **Line-height Fix**: Set line-height:1 on arrow, text, and button for consistent vertical alignment
  - **CSS Specificity Fix**: Added !important flags to mobile styles to override desktop CSS
  - **Desktop Line-height**: Added line-height:1 to desktop button, arrow, and text styles
  - **Center Line Hidden**: Added .timeline-events::before { display: none } to hide center bar on mobile
  - **Visual Cleanup**: Timeline now shows only cards on mobile, no center line or dots
  - **Production Ready**: Clean mobile-first approach with perfect vertical and horizontal alignment
- **2025-10-01:** **✅ PHASE 4D MOBILE BACK BUTTON ALIGNMENT FIX - COMPLETE RESOLUTION**
  - **HTML Structure Fix**: Restored proper span elements for arrow and text within button
  - **Button Container**: Display changed to inline-flex with align-items:center
  - **Fixed Heights**: 38px (desktop), 34px (mobile), 30px (small mobile)
  - **Gap Optimization**: 6px (desktop), 4px (mobile), 3px (small mobile)
  - **Font Sizes Refined**: Arrow 1.1rem→1rem→0.9rem, Text 0.9rem→0.85rem→0.8rem
  - **Line Height**: Unified to 1 for all elements to prevent vertical misalignment
  - **Padding Standardized**: 8px 16px (desktop), 6px 12px (mobile), 5px 10px (small)
  - **CSS Specificity**: Added !important flags to ensure mobile overrides apply
  - **Vertical Alignment**: Perfect centering achieved with inline-flex and align-items
  - **Production Ready**: Button now displays correctly across all mobile viewports
- **2025-10-01:** **✅ PHASE 4E IMAGE CHANGES REVERTED**
  - **Reverted Changes**: Removed object-fit:contain and smart image handling classes
  - **Restored Original**: Images use object-fit:cover for full-bleed card design
  - **Maintained Height**: Card images remain at 320px height
  - **Design Decision**: Prioritizing consistent card layout over full image visibility
- **Next Update:** Phase 4F Journey Page Photo Integration with Actual Images

---
**Last Updated:** October 01, 2025  
**Status:** Phase 4E Changes Reverted - Image Fit Restored to Original ✅💕✨  
**Implementation:** Reverted to object-fit:cover for consistent card design across all images  
**Next Milestone:** Phase 4F Journey Page Photo Integration - Replace timeline placeholders with actual photos

## Current Project Status ✅ MINIMALIST TIMELINE COMPLETE

**Successfully Completed:**
- ✅ **Countdown Page**: Fully functional with floating hearts animation system
- ✅ **Journey Page**: Clean minimalist vertical zigzag timeline with 12 milestones
- ✅ **Mobile-First Design**: Responsive layouts across all device sizes
- ✅ **Essential Content Only**: Image, title, date, location per card
- ✅ **Performance Optimization**: Smooth animations and lazy loading
- ✅ **Minimalist Aesthetic**: Let the images tell the story

**Current Architecture:**
- **Clean HTML Structure**: Semantic timeline markup with minimal hero/final sections
- **Streamlined CSS Framework**: Zigzag layout with glassmorphism (400+ lines)
- **Lightweight JavaScript**: VerticalZigzagTimeline class with dynamic card generation
- **Mobile-First Responsive**: Seamless desktop (zigzag) to mobile (stacked) transitions
- **Interactive Experience**: Hover effects, image zoom, smooth animations
- **Minimalist Design**: Focus on visual storytelling through images

**Timeline Features Delivered:**
- 📖 **12 Milestone Cards**: Complete love story from First Meeting to Engagement Party
- ❤️ **Heart Timeline Dots**: Animated heart emojis connecting milestones on center line
- 🖼️ **Full-Bleed Images**: Images touch card edges with 240px fixed height and top corner radius
- 💕 **Gradient Backgrounds**: Lavender → Rose Pink → Peach (135deg diagonal flow)
- 📍📅 **Unified Badge**: Date and location on single line with bullet separator
- 💕 **Minimalist Hero**: Just 3 hearts with pulse animation (no text)
- 💖 **Minimalist Ending**: Just 3 hearts with pulse animation (no text)
- ✨ **Floating Elements**: Subtle sparkles and hearts in background (0.2 opacity)
- 📱 **Mobile Optimized**: Full-width stacked cards with no center line
- 💻 **Desktop Zigzag**: Alternating left/right 50% width cards with center timeline
- 🎨 **Hover Effects**: Card lift (-8px), enhanced shadow with pink glow, image zoom (1.08x)
- 📦 **Elegant Cards**: min-height 380px with sophisticated gradient and typography

**Content Removed for Minimalism:**
- ❌ Hero title "Our Journey Together"
- ❌ Hero subtitle and inspirational quote
- ❌ Card quotes at top
- ❌ Card description paragraphs
- ❌ Final message "And Now... Our Forever Begins!"
- ❌ Final subtitle and description
- ❌ CTA button at end

**Ready for Future Development:**
- 🎯 **Image Integration**: Replace placeholder with actual milestone photos
- 🎯 **Optional Modal**: Click cards to view larger image/full details if needed
- 🎯 **Visual Polish**: Additional subtle animations
- 🎯 **Performance Enhancements**: Further optimization opportunities

**Technical Specifications Delivered:**
- **HTML Pages**: 2 responsive pages with minimalist timeline structure
- **CSS Framework**: Enhanced gradient system with full-bleed images and glassmorphism effects
- **JavaScript Architecture**: VerticalZigzagTimeline class with unified badge rendering
- **Performance**: Smooth 60fps animations with lazy image loading and hardware acceleration
- **Mobile Compatibility**: Touch-optimized timeline with responsive breakpoints at 1024px
- **Design System**: Lavender-Rose-Peach gradient palette with sophisticated typography hierarchy
- **Content Model**: 12 milestones with title, date, location, full-bleed images

