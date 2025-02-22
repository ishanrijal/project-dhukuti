document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const verificationBanner = document.querySelector('.verification-banner');
    const verificationSection = document.querySelector('.verification-section');
    const toggleButton = document.querySelector('.verify-toggle-btn');
    const balanceToggle = document.querySelector('.toggle-visibility');
    const balanceAmount = document.querySelector('.balance .amount');
    const frequencyButtons = document.querySelectorAll('.frequency-btn');
    const verificationForm = document.querySelector('.verification-form');
    const profilePicture = document.querySelector('.profile-picture');

    // Check if verification elements exist and set up verification section toggle
    if (verificationBanner && verificationSection && toggleButton) {
        verificationBanner.addEventListener('click', () => {
            verificationSection.classList.toggle('hidden');
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    }

    // Balance visibility toggle
    let isBalanceVisible = true;
    if (balanceToggle && balanceAmount) {
        balanceToggle.addEventListener('click', () => {
            isBalanceVisible = !isBalanceVisible;
            const icon = balanceToggle.querySelector('i');
            
            if (isBalanceVisible) {
                balanceAmount.textContent = '$5,000'; // Replace with actual balance
                if (icon) {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            } else {
                balanceAmount.textContent = '****';
                if (icon) {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            }
        });
    }

    // Investment frequency selection
    if (frequencyButtons.length > 0) {
        frequencyButtons.forEach(button => {
            if (!button) return;
            button.addEventListener('click', () => {
                frequencyButtons.forEach(btn => btn?.classList?.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Profile picture navigation
    if (profilePicture) {
        profilePicture.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/profile';
        });
    }

    // Verification form submission
    if (verificationForm) {
        verificationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(verificationForm);
            const submitButton = verificationForm.querySelector('.submit-btn');
            if (!submitButton) return;
            
            try {
                // Show loading state
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;

                // Replace with your actual API endpoint
                const response = await fetch('/api/verify', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    alert('Documents submitted successfully!');
                    verificationSection?.classList?.add('hidden');
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                alert('Error submitting documents. Please try again.');
            } finally {
                // Reset button state
                submitButton.textContent = 'Submit for Verification';
                submitButton.disabled = false;
            }
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .find-group-btn');
    if (buttons.length > 0) {
        buttons.forEach(button => {
            if (!button) return;
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    // Initialize tooltips if needed
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    if (tooltipElements.length > 0) {
        tooltipElements.forEach(element => {
            if (!element) return;
            element.setAttribute('title', element.dataset.tooltip);
        });
    }
});

// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            if (!button) return;
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn?.classList?.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all tab contents
                tabContents.forEach(content => content?.classList?.add('hidden'));
                
                // Show selected tab content
                const tabId = button.dataset.tab;
                if (!tabId) return;

                const selectedContent = document.getElementById(tabId);
                if (selectedContent) {
                    selectedContent.classList.remove('hidden');
                }
            });
        });
    }
});

// Animation functionality
window.addEventListener('load', () => {
    const dhukutiLetters = document.querySelectorAll('.letter');
    const aiText = document.getElementById('ai-text');
    
    if (dhukutiLetters.length > 0 && aiText) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dhukutiLetters.forEach((letter, index) => {
                        if (!letter) return;
                        letter.style.animationDelay = `${index * 0.1}s`;
                    });
                    
                    setTimeout(() => {
                        aiText.classList.add('loaded');
                        setTimeout(() => aiText.classList.add('floating'), 1500);
                    }, 1000);
                    
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const dhukutiText = document.querySelector('.dhukuti-text');
        if (dhukutiText) {
            observer.observe(dhukutiText);
        }
    }
});