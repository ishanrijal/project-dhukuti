document.addEventListener('DOMContentLoaded', () => {
    // Get all required DOM elements
    const progressSteps = document.querySelectorAll('.progress-bar__step');
    const progressLine = document.querySelector('.progress-bar__line');
    const statusText = document.querySelector('.status-text');
    const estimatedTime = document.querySelector('.estimated-time');
    const cancelButton = document.querySelector('.group-matching__cancel');

    // Check if required elements exist
    if (!progressLine || !statusText || !estimatedTime || !progressSteps.length) {
        console.warn('Required group matching elements are missing');
        return;
    }

    const statusMessages = [
        'Initializing group search...',
        'Looking for compatible groups...',
        'Analyzing group preferences...',
        'Finalizing match...'
    ];

    let currentStep = 0;
    const totalSteps = progressSteps.length;

    // Initialize progress animation
    function updateProgress() {
        if (!progressLine || !statusText || !estimatedTime || !progressSteps.length) return;

        // Update progress line
        const progress = (currentStep / (totalSteps - 1)) * 100;
        progressLine.style.width = `${progress}%`;

        // Update steps
        progressSteps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add('active');
                if (index < currentStep) {
                    step.classList.add('completed');
                }
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Update status text
        statusText.textContent = statusMessages[currentStep];

        // Update estimated time
        const remainingSteps = totalSteps - currentStep;
        const estimatedMinutes = remainingSteps * 2;
        estimatedTime.textContent = `Estimated time: ${estimatedMinutes} minutes`;
    }

    // Progress animation
    function startMatching() {
        if (!progressLine || !statusText || !estimatedTime) return null;

        currentStep = 0;
        updateProgress();

        const interval = setInterval(() => {
            currentStep++;
            updateProgress();

            if (currentStep >= totalSteps - 1) {
                clearInterval(interval);
                showSuccessMessage();
            }
        }, 3000);

        // Store interval ID for cancellation
        return interval;
    }

    // Show status message
    function showStatusMessage(message, type = 'info') {
        const container = document.querySelector('.group-matching__status');
        if (!container) return;

        const statusMessage = document.createElement('div');
        statusMessage.className = `status-message ${type} show`;
        statusMessage.textContent = message;

        container.appendChild(statusMessage);

        setTimeout(() => {
            statusMessage.remove();
        }, 3000);
    }

    // Show success message
    function showSuccessMessage() {
        showStatusMessage('Group match found! Redirecting to group chat...', 'info');
        setTimeout(() => {
            // Redirect to group chat or show group details
            // window.location.href = '/group-chat';
        }, 2000);
    }

    // Handle cancel button
    let matchingInterval;
    
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            if (matchingInterval) {
                clearInterval(matchingInterval);
                showStatusMessage('Group matching cancelled', 'error');
                
                // Reset progress
                currentStep = 0;
                updateProgress();
                
                // Enable restart
                setTimeout(() => {
                    matchingInterval = startMatching();
                }, 1000);
            }
        });
    }

    // Start matching process
    matchingInterval = startMatching();

    // Add hover effects
    const buttons = document.querySelectorAll('button');
    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }
}); 