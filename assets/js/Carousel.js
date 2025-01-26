class Carousel {
    constructor(element, options = {}) {
        this.defaults = {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false,
            autoplay: {
                enabled: false,
                delay: 3000,
                pauseOnHover: true
            },
            speed: 300,
            navigation: {
                enabled: true,
                prevEl: '.carousel-prev',
                nextEl: '.carousel-next'
            },
            pagination: {
                enabled: true,
                el: '.carousel-pagination',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            }
        };

        this.options = { ...this.defaults, ...options };
        this.container = typeof element === 'string' ? document.querySelector(element) : element;
        this.wrapper = this.container.querySelector('.carousel-wrapper');
        this.slides = Array.from(this.wrapper.children);
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.slideWidth = 0;
        this.slidePositions = [];
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragCurrentX = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;

        this.init();
    }

    init() {
        this.setupStyles();
        this.createControls();
        this.bindEvents();
        this.updateSlidePositions();
        this.setupAutoplay();
        this.setupResponsive();
    }

    setupStyles() {
        this.container.style.position = 'relative';
        this.wrapper.style.display = 'flex';
        this.wrapper.style.transition = `transform ${this.options.speed}ms ease`;
        this.wrapper.style.width = `${100 * this.slides.length}%`;
        
        const slideWidth = 100 / this.slides.length;
        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`;
            slide.style.width = `${slideWidth}%`;
        });
    }

    calculateDimensions() {
        const containerWidth = this.container.offsetWidth;
        this.slideWidth = containerWidth;
        
        this.slidePositions = this.slides.map((_, index) => {
            return -(index * containerWidth);
        });
    }

    getCurrentSlidesPerView() {
        const width = window.innerWidth;
        let slidesPerView = this.options.slidesPerView;

        if (this.options.breakpoints) {
            Object.entries(this.options.breakpoints)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .forEach(([breakpoint, options]) => {
                    if (width >= parseInt(breakpoint)) {
                        slidesPerView = options.slidesPerView;
                    }
                });
        }

        return slidesPerView;
    }

    createControls() {
        // Create navigation buttons
        if (this.options.navigation.enabled) {
            const prevButton = document.createElement('button');
            const nextButton = document.createElement('button');
            
            prevButton.className = 'carousel-prev';
            nextButton.className = 'carousel-next';
            
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            this.container.appendChild(prevButton);
            this.container.appendChild(nextButton);

            // Add event listeners
            prevButton.addEventListener('click', () => this.prev());
            nextButton.addEventListener('click', () => this.next());
        }

        // Create pagination dots
        if (this.options.pagination.enabled) {
            const pagination = document.createElement('div');
            pagination.className = 'carousel-pagination';
            
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('data-index', index);
                
                // Add click event listener to each dot
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                });
                
                pagination.appendChild(dot);
            });
            
            this.container.appendChild(pagination);
        }
    }

    bindEvents() {
        // Touch events
        this.wrapper.addEventListener('touchstart', e => this.handleTouchStart(e));
        this.wrapper.addEventListener('touchmove', e => this.handleTouchMove(e));
        this.wrapper.addEventListener('touchend', () => this.handleTouchEnd());

        // Pause autoplay on hover if enabled
        if (this.options.autoplay.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
        }
    }

    handleTouchStart(e) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX;
        this.dragCurrentX = this.dragStartX;
        this.prevTranslate = this.currentTranslate;
        this.pauseAutoplay();
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.dragCurrentX = e.touches[0].clientX;
        const diff = this.dragCurrentX - this.dragStartX;
        this.currentTranslate = this.prevTranslate + diff;
        this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    handleTouchEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;
        const diff = this.dragCurrentX - this.dragStartX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.prev();
            } else {
                this.next();
            }
        } else {
            this.goToSlide(this.currentIndex);
        }
        
        this.resumeAutoplay();
    }

    updateSlidePositions() {
        const translate = this.slidePositions[this.currentIndex];
        this.wrapper.style.transform = `translateX(${translate}px)`;
        
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        this.updatePagination();
    }

    updatePagination() {
        if (this.options.pagination.enabled) {
            const dots = this.container.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    next() {
        if (!this.isTransitioning) {
            const nextIndex = this.options.loop ? 
                (this.currentIndex + 1) % this.slides.length : 
                Math.min(this.currentIndex + 1, this.slides.length - 1);
            this.goToSlide(nextIndex);
        }
    }

    prev() {
        if (!this.isTransitioning) {
            const prevIndex = this.options.loop ? 
                (this.currentIndex - 1 + this.slides.length) % this.slides.length : 
                Math.max(this.currentIndex - 1, 0);
            this.goToSlide(prevIndex);
        }
    }

    goToSlide(index) {
        if (this.currentIndex === index || this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex = index;
        this.updateSlidePositions();
        this.updatePagination();

        setTimeout(() => {
            this.isTransitioning = false;
        }, this.options.speed);
    }

    setupAutoplay() {
        if (this.options.autoplay.enabled) {
            this.startAutoplay();
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.options.autoplay.delay);
    }

    pauseAutoplay() {
        clearInterval(this.autoplayInterval);
    }

    resumeAutoplay() {
        if (this.options.autoplay.enabled) {
            this.startAutoplay();
        }
    }

    setupResponsive() {
        if (this.options.breakpoints) {
            const handleResize = () => {
                const width = window.innerWidth;
                Object.entries(this.options.breakpoints).forEach(([breakpoint, options]) => {
                    if (width >= parseInt(breakpoint)) {
                        this.options = { ...this.options, ...options };
                        this.updateSlidePositions();
                    }
                });
            };

            window.addEventListener('resize', handleResize);
            handleResize(); // Initial check
        }
    }
} 