document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const mainNav = document.querySelector('.main-nav');
    const navItems = mainNav?.querySelectorAll('.nav-item');
    const searchInput = document.querySelector('.search-input');
    const aiServices = document.querySelector('.ai-services');
    const dhukutiServices = document.querySelector('.dhukuti-services');
    const ctaButton = document.querySelector('.cta-button');

    // Tab switching functionality
    navItems?.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update content based on selected tab
            if (index === 0) {
                // Dhukuti tab
                searchInput.placeholder = 'Search for Dhukuti groups...';
                aiServices.style.display = 'none';
                dhukutiServices.style.display = 'block';
                ctaButton.textContent = 'Create Group';
            } else {
                // AI tab
                searchInput.placeholder = 'Any Questions?';
                aiServices.style.display = 'block';
                dhukutiServices.style.display = 'none';
                ctaButton.textContent = 'Call AI';
            }

            // Animate new content
            const services = document.querySelectorAll('.service-item');
            services.forEach((service, i) => {
                service.style.animation = 'none';
                service.offsetHeight; // Trigger reflow
                service.style.animation = `slideIn 0.3s ease forwards ${i * 0.1}s`;
            });
        });
    });

    // Bottom navigation functionality
    const bottomNav = document.querySelector('.bottom-nav');
    const bottomNavItems = bottomNav?.querySelectorAll('.nav-item');

    bottomNavItems?.forEach(item => {
        item.addEventListener('click', () => {
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Call AI button functionality
    ctaButton?.addEventListener('click', () => {
        if (ctaButton.textContent === 'Call AI') {
            // Implement AI call functionality
            ctaButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            setTimeout(() => {
                ctaButton.innerHTML = 'Call AI';
                // Show AI response UI
                showAIResponse();
            }, 1500);
        } else {
            // Implement group creation
            window.location.href = '/create-group';
        }
    });

    // Service item click handlers
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            handleServiceClick(title);
        });
    });

    // Handle service clicks
    function handleServiceClick(service) {
        switch (service) {
            case 'Education Consulting':
                window.location.href = '/education-consulting';
                break;
            case 'Dhukuti PTE Tutor':
                window.location.href = '/pte-tutor';
                break;
            case 'Student Services':
                window.location.href = '/student-services';
                break;
            case 'Join Active Dhukuti':
                window.location.href = '/join-dhukuti';
                break;
            case 'Create New Dhukuti':
                window.location.href = '/create-dhukuti';
                break;
        }
    }

    // Show AI response UI
    function showAIResponse() {
        const query = searchInput.value.trim();
        if (!query) return;

        const responseContainer = document.createElement('div');
        responseContainer.className = 'ai-response';
        responseContainer.innerHTML = `
            <div class="ai-message">
                <i class="fas fa-robot"></i>
                <div class="message-content">
                    <p>I'm here to help! How can I assist you with "${query}"?</p>
                </div>
            </div>
        `;

        const servicesContainer = document.querySelector('.services-container');
        servicesContainer.insertBefore(responseContainer, servicesContainer.firstChild);

        // Animate response
        responseContainer.style.animation = 'slideIn 0.3s ease forwards';
    }

    // Initialize current time
    function updateTime() {
        const timeElement = document.querySelector('.time');
        if(timeElement){
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }

    // Update time every minute
    updateTime();
    setInterval(updateTime, 60000);
}); 