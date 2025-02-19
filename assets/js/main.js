document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const chatMessages = document.querySelector('.chat-messages');
    const messageInput = document.querySelector('.message-input');
    const attachmentBtn = document.querySelector('.attachment-btn');
    const uploadModal = document.querySelector('.upload-modal');
    const voiceBtn = document.querySelector('.voice-btn');
    const emojiBtn = document.querySelector('.emoji-btn');
    const startAssessmentBtn = document.querySelector('.start-assessment-btn');
    const onboardingModal = document.querySelector('.onboarding-modal');
    const onboardingSteps = document.querySelectorAll('.onboarding-step');
    const progressDots = document.querySelectorAll('.progress-dots .dot');

    // @todo: Replace with API - User assessment data storage
    let userAssessment = {
        fluency: null,
        pteGoal: null,
        focusSkill: null
    };

    let currentStep = 1;
    let maxStepReached = 1;

    // Handle start assessment button
    startAssessmentBtn?.addEventListener('click', () => {
        onboardingModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // Hide the initial welcome message
        const welcomeMessage = startAssessmentBtn.closest('.message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
        initializeOnboarding();
    });

    // Initialize onboarding
    function initializeOnboarding() {
        currentStep = 1;
        maxStepReached = 1;
        onboardingSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === 0) {
                step.classList.add('active');
            }
        });
        updateProgressDots();
    }

    // Handle option selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const step = btn.closest('.onboarding-step');
            const stepNum = parseInt(step.dataset.step);
            const value = btn.dataset.value;

            // Remove previous selection in current step
            step.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Store the selection
            switch(stepNum) {
                case 1:
                    userAssessment.fluency = value;
                    break;
                case 2:
                    userAssessment.pteGoal = value;
                    break;
                case 3:
                    userAssessment.focusSkill = value;
                    break;
            }

            // Update max step reached
            maxStepReached = Math.max(maxStepReached, stepNum + 1);

            // Move to next step after a short delay
            if (stepNum < 3) {
                setTimeout(() => {
                    navigateToStep(stepNum + 1);
                }, 300);
            } else {
                completeOnboarding();
            }
        });
    });

    // Handle progress dot clicks
    progressDots.forEach((dot, index) => {
        const stepNumber = index + 1;
        dot.dataset.step = stepNumber;
        
        dot.addEventListener('click', () => {
            if (stepNumber <= maxStepReached) {
                navigateToStep(stepNumber);
            }
        });
    });

    // Function to navigate to a specific step
    function navigateToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 3) return;
        
        const direction = stepNumber > currentStep ? 'Next' : 'Prev';
        const currentStepEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
        const nextStepEl = document.querySelector(`.onboarding-step[data-step="${stepNumber}"]`);

        // Remove active class from all steps
        onboardingSteps.forEach(step => {
            step.classList.remove('active');
            step.style.transform = direction === 'Next' ? 'translateX(100%)' : 'translateX(-100%)';
            step.style.opacity = '0';
            step.style.visibility = 'hidden';
        });

        // Animate the target step
        requestAnimationFrame(() => {
            nextStepEl.classList.add('active');
            nextStepEl.style.transform = 'translateX(0)';
            nextStepEl.style.opacity = '1';
            nextStepEl.style.visibility = 'visible';
        });

        // Update current step and progress dots
        currentStep = stepNumber;
        updateProgressDots();
        
        // Restore previous selection if exists
        restorePreviousSelection(stepNumber);
    }

    // Function to update progress dots
    function updateProgressDots() {
        progressDots.forEach((dot, index) => {
            const stepNum = index + 1;
            dot.classList.toggle('active', stepNum === currentStep);
            dot.classList.toggle('completed', stepNum < currentStep);
        });
    }

    // Function to restore previous selection
    function restorePreviousSelection(stepNumber) {
        const stepKey = stepNumber === 1 ? 'fluency' : 
                       stepNumber === 2 ? 'pteGoal' : 'focusSkill';
        
        if (userAssessment[stepKey]) {
            const step = document.querySelector(`.onboarding-step[data-step="${stepNumber}"]`);
            const selectedOption = step.querySelector(`[data-value="${userAssessment[stepKey]}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    // Function to complete onboarding
    function completeOnboarding() {
        // @todo: Replace with API - Send assessment data to backend
        console.log('User Assessment:', userAssessment);

        // Close modal with fade out
        onboardingModal.style.opacity = '0';
        setTimeout(() => {
            onboardingModal.classList.remove('show');
            document.body.style.overflow = '';
            onboardingModal.style.opacity = '';
            
            // Generate and add the AI response
            const response = generateInitialResponse(userAssessment);
            addMessage(response, 'ai');
        }, 300);
    }

    // Generate initial AI response based on user selections
    function generateInitialResponse(assessment) {
        // @todo: Replace with API - Get personalized response from backend
        const skillMap = {
            reading: 'Reading',
            listening: 'Listening',
            speaking: 'Speaking',
            writing: 'Writing'
        };

        const fluencyMap = {
            beginner: 'starting your English journey',
            fluent: 'already fluent in English',
            excellent: 'having excellent English skills'
        };

        return `Great! I see you're ${fluencyMap[assessment.fluency]} and aiming for a score of ${assessment.pteGoal}+. Let's focus on improving your ${skillMap[assessment.focusSkill]} skills.

Would you like to:
1. Take a practice test
2. Learn test strategies
3. Get study materials
4. Schedule a mock test`;
    }

    // Dropdown functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
    });
    
    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Initialize emoji picker
    const initEmojiPicker = () => {
        const picker = new EmojiButton({
            position: 'top-start',
            theme: 'dark',
            style: 'twemoji'
        });

        picker.on('emoji', emoji => {
            messageInput.value += emoji;
            messageInput.focus();
        });

        emojiBtn.addEventListener('click', () => {
            picker.togglePicker(emojiBtn);
        });
    };

    // Load emoji picker script dynamically
    const loadEmojiPicker = () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.1.1/dist/index.min.js';
        script.onload = initEmojiPicker;
        document.head.appendChild(script);
    };
    loadEmojiPicker();

    // Scroll to bottom of chat
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    scrollToBottom();

    // Handle message input
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                messageInput.value = '';
                // Simulate AI response
                simulateAIResponse(message);
            }
        }
    });

    // Add message to chat
    const addMessage = (message, type = 'user') => {
        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const messageHTML = `
            <div class="message ${type}-message">
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    };

    // File upload handling
    attachmentBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadModal.style.display = 'block';
        setTimeout(() => {
            uploadModal.classList.add('show');
        }, 10);
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.closest('.upload-modal') || e.target.closest('.attachment-btn')) return;
        closeUploadModal();
    });

    const closeUploadModal = () => {
        uploadModal.classList.remove('show');
        setTimeout(() => {
            uploadModal.style.display = 'none';
        }, 300);
    };

    // Handle file upload options
    document.querySelectorAll('.upload-option').forEach(option => {
        option.addEventListener('click', () => {
            const type = option.querySelector('span').textContent;
            handleFileUpload(type);
        });
    });

    // Handle different types of file uploads
    const handleFileUpload = (type) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = getAcceptTypes(type);
        
        if (type.toLowerCase() === 'camera') {
            input.capture = 'environment';
            input.accept = 'image/*';
        }

        input.click();

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                addFileMessage(file, type);
                closeUploadModal();
            }
        });
    };

    // Get accept types for file input
    const getAcceptTypes = (type) => {
        switch (type.toLowerCase()) {
            case 'camera':
            case 'gallery':
                return 'image/*';
            case 'document':
                return '.pdf,.doc,.docx,.txt';
            case 'audio':
                return 'audio/*';
            default:
                return '*/*';
        }
    };

    // Add file message to chat
    const addFileMessage = (file, type) => {
        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        let messageHTML = '';
        const fileType = type.toLowerCase();
        
        if (fileType === 'document') {
            messageHTML = `
                <div class="message user-message">
                    <div class="message-content document-message">
                        <i class="fas fa-file-pdf"></i>
                        <div class="document-info">
                            <span class="document-name">${file.name}</span>
                            <span class="document-size">${(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                        </div>
                        <span class="message-time">${time}</span>
                    </div>
                </div>
            `;
        } else if (fileType === 'camera' || fileType === 'gallery') {
            const imgUrl = URL.createObjectURL(file);
            messageHTML = `
                <div class="message user-message">
                    <div class="message-content image-message">
                        <img src="${imgUrl}" alt="Uploaded image">
                        <span class="message-time">${time}</span>
                    </div>
                </div>
            `;
        }

        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    };

    // Voice recording
    let isRecording = false;
    let mediaRecorder = null;
    let audioChunks = [];
    let recordingStartTime;

    voiceBtn.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            recordingStartTime = Date.now();

            mediaRecorder.addEventListener('dataavailable', (e) => {
                audioChunks.push(e.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const duration = Math.round((Date.now() - recordingStartTime) / 1000);
                addVoiceMessage(audioBlob, duration);
                
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            });

            mediaRecorder.start();
            isRecording = true;
            voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
            voiceBtn.classList.add('recording');
            
            // Add recording animation
            voiceBtn.style.animation = 'pulse 1s infinite';
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Please allow microphone access to record audio.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.classList.remove('recording');
            voiceBtn.style.animation = '';
        }
    };

    // Add voice message to chat
    const addVoiceMessage = (audioBlob, duration) => {
        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const audioUrl = URL.createObjectURL(audioBlob);
        const messageHTML = `
            <div class="message user-message">
                <div class="message-content voice-message">
                    <audio src="${audioUrl}" style="display: none;"></audio>
                    <i class="fas fa-play"></i>
                    <div class="voice-wave"></div>
                    <span class="voice-duration">${formatDuration(duration)}</span>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();

        // Add play functionality
        const lastMessage = chatMessages.lastElementChild;
        const playButton = lastMessage.querySelector('.fa-play');
        const audio = lastMessage.querySelector('audio');
        
        playButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playButton.classList.remove('fa-play');
                playButton.classList.add('fa-pause');
            } else {
                audio.pause();
                playButton.classList.remove('fa-pause');
                playButton.classList.add('fa-play');
            }
        });

        audio.addEventListener('ended', () => {
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        });
    };

    // Format duration for voice messages
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Simulate AI response
    const simulateAIResponse = (userMessage) => {
        // Show typing indicator
        const typingHTML = `
            <div class="message ai-message typing">
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();

        // Remove typing indicator and add AI response after delay
        setTimeout(() => {
            document.querySelector('.typing')?.remove();
            const response = generateAIResponse(userMessage);
            addMessage(response, 'ai');
        }, 1500);
    };

    // Generate AI response based on user message
    const generateAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();
        if (message.includes('speaking')) {
            return "For PTE speaking, I recommend starting with Read Aloud exercises. Would you like to practice with a sample text?";
        } else if (message.includes('writing')) {
            return "I can help you with PTE writing tasks. Let's start with essay writing or summarize written text. Which would you prefer?";
        } else if (message.includes('reading')) {
            return "For PTE reading, we can practice multiple-choice questions, reorder paragraphs, or fill in the blanks. What would you like to focus on?";
        } else if (message.includes('listening')) {
            return "Let's improve your PTE listening skills. We can work on summarize spoken text, multiple choice, or fill in the blanks. Which task interests you?";
        } else {
            return "I'm here to help with your PTE preparation. We can focus on Speaking, Writing, Reading, or Listening. Which section would you like to practice?";
        }
    };
}); 
// Future JavaScript functionality for group info can be added here 

document.addEventListener('DOMContentLoaded', () => {
    // Animate stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animate member cards
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });

    // Animate activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });

    // Add hover effects to member cards
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(5px)';
            card.style.borderColor = '#01a28c';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Animate stat values with counting effect
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(value => {
        const finalValue = value.textContent;
        const isCurrency = finalValue.includes('$');
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        let currentValue = 0;
        const duration = 1500;
        const steps = 60;
        const increment = numericValue / steps;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(counter);
            }
            value.textContent = isCurrency 
                ? `$${Math.floor(currentValue).toLocaleString()}`
                : Math.floor(currentValue).toString();
        }, duration / steps);
    });

    // Add pulse animation to online status indicators
    const onlineIndicators = document.querySelectorAll('.status-indicator.online');
    onlineIndicators.forEach(indicator => {
        indicator.style.animation = 'pulse 2s infinite';
    });

    // Add tooltip functionality
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            tooltip.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}); 
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

    // Verification section toggle
    verificationBanner?.addEventListener('click', () => {
        verificationSection.classList.toggle('hidden');
        const icon = toggleButton.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });

    // Balance visibility toggle
    let isBalanceVisible = true;
    balanceToggle?.addEventListener('click', () => {
        isBalanceVisible = !isBalanceVisible;
        const icon = balanceToggle.querySelector('i');
        
        if (isBalanceVisible) {
            balanceAmount.textContent = '$5,000'; // Replace with actual balance
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            balanceAmount.textContent = '****';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // Investment frequency selection
    frequencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            frequencyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Profile picture navigation
    profilePicture.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/profile';
    });

    // Verification form submission
    verificationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(verificationForm);
        
        try {
            // Show loading state
            const submitButton = verificationForm.querySelector('.submit-btn');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Replace with your actual API endpoint
            const response = await fetch('/api/verify', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Documents submitted successfully!');
                verificationSection.classList.add('hidden');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('Error submitting documents. Please try again.');
        } finally {
            // Reset button state
            const submitButton = verificationForm.querySelector('.submit-btn');
            submitButton.textContent = 'Submit for Verification';
            submitButton.disabled = false;
        }
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .find-group-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Initialize tooltips if needed
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.setAttribute('title', element.dataset.tooltip);
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Show selected tab content
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
});

window.addEventListener('load', () => {
    const dhukutiLetters = document.querySelectorAll('.letter');
    const aiText = document.getElementById('ai-text');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dhukutiLetters.forEach((letter, index) => {
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
    
    observer.observe(document.querySelector('.dhukuti-text'));
});
document.addEventListener('DOMContentLoaded', () => {
    // Handle new session button
    const newSessionBtn = document.querySelector('.new-session-btn');
    newSessionBtn?.addEventListener('click', () => {
        // Add your new session creation logic here
        console.log('Creating new session...');
    });

    // Handle quick idea add buttons
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ideaCard = e.target.closest('.idea-card');
            const ideaTitle = ideaCard.querySelector('h3').textContent;
            const ideaTime = ideaCard.querySelector('p').textContent;
            
            // Add your logic to add the idea to sessions
            console.log(`Adding idea: ${ideaTitle} - ${ideaTime}`);
            
            // Visual feedback
            button.textContent = 'Added';
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.textContent = 'Add';
                button.style.background = '';
            }, 2000);
        });
    });

    // Handle start blocking session button
    const startSessionBtn = document.querySelector('.start-session-btn');
    startSessionBtn?.addEventListener('click', () => {
        // Add your session starting logic here
        console.log('Starting blocking session...');
    });

    // Handle navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Add smooth hover effects
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});
// Future JavaScript functionality for group info can be added here 

document.addEventListener('DOMContentLoaded', () => {
    // Static data - will be replaced with API data
    const dhukutiData = {
        currentRound: 1,
        totalRounds: 10,
        contributionType: "Fortnightly Contribution",
        endDate: "Week of 27 June",
        duration: "5 months after starting date",
        totalPool: 120000,
        memberCount: 10,
        nextWinner: {
            date: "27th February, Thursday",
            countdown: "2 days 14 hours"
        },
        biddingOpens: {
            date: "22nd February",
            countdown: "1 day 6 hours"
        }
    };

    // Populate dhukuti specs
    function populateDhukutiSpecs() {
        // Update title and badge
        document.querySelector('.dhukuti-specs .title').textContent = `Dhukuti Round ${dhukutiData.currentRound}/${dhukutiData.totalRounds}`;
        document.querySelector('.dhukuti-specs .badge').textContent = dhukutiData.contributionType;

        // Update spec cards
        const specContents = document.querySelectorAll('.spec-content');
        
        // Dhukuti Ends
        specContents[0].querySelector('p').textContent = dhukutiData.endDate;
        specContents[0].querySelector('.sub-text').textContent = dhukutiData.duration;

        // Total Pool
        specContents[1].querySelector('p').textContent = `₹${dhukutiData.totalPool.toLocaleString()}`;
        specContents[1].querySelector('.sub-text').textContent = `${dhukutiData.memberCount} members`;

        // Next Winner
        specContents[2].querySelector('p').textContent = dhukutiData.nextWinner.date;
        specContents[2].querySelector('.countdown').textContent = dhukutiData.nextWinner.countdown;

        // Bidding Opens
        specContents[3].querySelector('p').textContent = dhukutiData.biddingOpens.date;
        specContents[3].querySelector('.countdown').textContent = dhukutiData.biddingOpens.countdown;
    }

    // Sample member data - replace with actual data from your backend
    const members = [
        { name: "Where's The New Update", icon: "🏰", dhukutiWins: true, dhukutiBids: true },
        { name: "Goblin Builder Fanclub", icon: "👾", dhukutiWins: false, dhukutiBids: true },
        { name: "SoupCell", icon: "🍜", dhukutiWins: true, dhukutiBids: false },
        { name: "Home_village_wreckers", icon: "🏠", dhukutiWins: false, dhukutiBids: true },
        { name: "NoMoreOresPlease", icon: "⛏️", dhukutiWins: true, dhukutiBids: true },
        { name: "MOAR ORES", icon: "💎", dhukutiWins: false, dhukutiBids: false },
        { name: "Clash Bros", icon: "⚔️", dhukutiWins: false, dhukutiBids: true },
        { name: "NoDragNoWin", icon: "🐉", dhukutiWins: true, dhukutiBids: false }
    ];

    // Populate members table
    function populateMembers() {
        const tableBody = document.querySelector('.minimalist-variation tbody');
        
        members.forEach((member, index) => {
            const row = document.createElement('tr');
            row.className = 'member-row';
            row.style.animationDelay = `${index * 0.1}s`;
            
            row.innerHTML = `
                <td class="member-info">
                    <div class="member-icon">${member.icon}</div>
                    <span class="name">${member.name}</span>
                </td>
                <td class="dhukuti-status">
                    <div class="status-indicator ${member.dhukutiWins ? 'success' : 'danger'}">
                        <i class="fas ${member.dhukutiWins ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${member.dhukutiWins ? 'Won' : 'Not Won'}</span>
                    </div>
                </td>
                <td class="bidding-status">
                    <div class="status-indicator ${member.dhukutiBids ? 'success' : 'danger'}">
                        <i class="fas ${member.dhukutiBids ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${member.dhukutiBids ? 'Bid Placed' : 'No Bid'}</span>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    // Bid calculations
    const bidCalculations = {
        totalPool: dhukutiData.totalPool,
        minBidPercentage: 5,
        maxBidPercentage: 10,
        serviceFeePercentage: 1,

        get minBidAmount() {
            return Math.round(this.totalPool * (this.minBidPercentage / 100));
        },

        get maxBidAmount() {
            return Math.round(this.totalPool * (this.maxBidPercentage / 100));
        },

        calculateServiceFee(amount) {
            return Math.round(amount * (this.serviceFeePercentage / 100));
        },

        calculateReceiveAmount(amount) {
            return amount - this.calculateServiceFee(amount);
        }
    };

    // Modal functionality
    const modal = document.getElementById('bidModal');
    const placeBidBtn = document.getElementById('placeBidBtn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-cancel');
    const bidForm = document.getElementById('bidForm');
    const bidAmountInput = document.getElementById('bidAmount');
    const receiveAmount = document.querySelector('.receive-amount');
    const serviceFee = document.querySelector('.service-fee');

    // Update bid modal information
    function updateBidModalInfo() {
        // Update pool amount and minimum bid
        document.querySelector('.bid-information .info-row:first-child .value')
            .textContent = `₹${bidCalculations.totalPool.toLocaleString()}`;
        document.querySelector('.bid-information .info-row:last-child .value')
            .textContent = `₹${bidCalculations.minBidAmount.toLocaleString()}`;

        // Update input constraints
        bidAmountInput.min = bidCalculations.minBidAmount;
        bidAmountInput.max = bidCalculations.maxBidAmount;
        bidAmountInput.placeholder = `Enter amount (₹${bidCalculations.minBidAmount.toLocaleString()} - ₹${bidCalculations.maxBidAmount.toLocaleString()})`;
    }

    // Open modal
    placeBidBtn?.addEventListener('click', () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        updateBidModalInfo();
        bidAmountInput.focus();
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        bidForm.reset();
        updateBidCalculations(0);
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle bid amount input
    bidAmountInput?.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        
        // Validate bid amount
        if (amount < bidCalculations.minBidAmount) {
            bidAmountInput.setCustomValidity(`Minimum bid amount is ₹${bidCalculations.minBidAmount.toLocaleString()}`);
        } else if (amount > bidCalculations.maxBidAmount) {
            bidAmountInput.setCustomValidity(`Maximum bid amount is ₹${bidCalculations.maxBidAmount.toLocaleString()}`);
        } else {
            bidAmountInput.setCustomValidity('');
        }

        updateBidCalculations(amount);
    });

    // Calculate and update bid amounts
    const updateBidCalculations = (amount) => {
        const fee = bidCalculations.calculateServiceFee(amount);
        const receive = bidCalculations.calculateReceiveAmount(amount);
        
        receiveAmount.textContent = `₹${receive.toLocaleString()}`;
        serviceFee.textContent = `₹${fee.toLocaleString()}`;
    };

    // Handle form submission
    bidForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            bidAmount: parseInt(bidAmountInput.value),
            timestamp: new Date().toISOString()
        };

        // TODO: Send to API
        console.log('Submitting bid:', formData);
        
        // Show success message and close modal
        alert('Bid placed successfully!');
        closeModal();
    });

    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn?.addEventListener('click', () => {
        // Add filter functionality here
        console.log('Filter button clicked');
    });

    // Refresh functionality
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn?.addEventListener('click', () => {
        // Add refresh functionality here
        console.log('Refresh button clicked');
    });

    // Initialize
    populateDhukutiSpecs();
    populateMembers();
}); 

document.addEventListener('DOMContentLoaded', () => {
    const progressSteps = document.querySelectorAll('.progress-bar__step');
    const progressLine = document.querySelector('.progress-bar__line');
    const statusText = document.querySelector('.status-text');
    const estimatedTime = document.querySelector('.estimated-time');
    const cancelButton = document.querySelector('.group-matching__cancel');

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
        const statusMessage = document.createElement('div');
        statusMessage.className = `status-message ${type} show`;
        statusMessage.textContent = message;

        const container = document.querySelector('.group-matching__status');
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

    // Start matching process
    matchingInterval = startMatching();

    // Add hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}); 
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const topPlayersContainer = document.querySelector('.top-players');
    const leaderboardList = document.querySelector('.leaderboard-list');

    // Mock data - Replace this with your API call in the future
    const leaderboardData = {
        region: [
            { id: 1, name: 'Eiden', score: 2430, username: '@eiden', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 2, name: 'Jackson', score: 1847, username: '@jackson', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 3, name: 'Emma Aria', score: 1674, username: '@emmaaria', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'offline' },
            { id: 4, name: 'Sebastian', score: 1124, username: '@sebastian', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 5, name: 'Jason', score: 875, username: '@jason', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'offline' }
        ],
        national: [
            { id: 1, name: 'Anya', score: 2200, username: '@anya', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 2, name: 'David', score: 1950, username: '@david', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'offline' },
            { id: 3, name: 'Sarah', score: 1700, username: '@sarah', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 4, name: 'Michael', score: 1550, username: '@michael', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 5, name: 'Emily', score: 1300, username: '@emily', avatar: 'path/to/emily.jpg', status: 'offline' }
        ],
        global: [
            { id: 1, name: 'Lin', score: 2700, username: '@lin', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 2, name: 'Kenji', score: 2500, username: '@kenji', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 3, name: 'Sofia', score: 2350, username: '@sofia', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'offline' },
            { id: 4, name: 'Mateo', score: 2100, username: '@mateo', avatar: 'https://cdn-icons-png.flaticon.com/512/5998/5998953.png', status: 'online' },
            { id: 5, name: 'Isabella', score: 1800, username: '@isabella', avatar: 'path/to/isabella.jpg', status: 'offline' }
        ]
    };

    function renderTopPlayers(players) {
        const top3 = players.slice(0, 3);
        const [first, second, third] = [top3[0], top3[1], top3[2]];

        topPlayersContainer.innerHTML = `
            <div class="player second">
                <div class="player-avatar">
                    <img src="${second.avatar}" alt="${second.name}">
                </div>
                <div class="player-info">
                    <span class="player-name">${second.name}</span>
                    <span class="player-score">${second.score}</span>
                    <span class="player-username">${second.username}</span>
                </div>
            </div>

            <div class="player first">
                <div class="crown-icon">
                    <i class="fas fa-crown"></i>
                </div>
                <div class="player-avatar">
                    <img src="${first.avatar}" alt="${first.name}">
                </div>
                <div class="player-info">
                    <span class="player-name">${first.name}</span>
                    <span class="player-score">${first.score}</span>
                    <span class="player-username">${first.username}</span>
                </div>
            </div>

            <div class="player third">
                <div class="player-avatar">
                    <img src="${third.avatar}" alt="${third.name}">
                </div>
                <div class="player-info">
                    <span class="player-name">${third.name}</span>
                    <span class="player-score">${third.score}</span>
                    <span class="player-username">${third.username}</span>
                </div>
            </div>
        `;
    }

    function renderLeaderboardList(players) {
        // Get players from index 3 onwards (after top 3)
        const remainingPlayers = players.slice(3);
        
        leaderboardList.innerHTML = remainingPlayers.map(player => `
            <div class="list-item">
                <span class="rank">${players.indexOf(player) + 1}</span>
                <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
                <span class="player-name">${player.name}</span>
                <span class="player-score">${player.score}</span>
                <span class="status-dot ${player.status}"></span>
            </div>
        `).join('');
    }

    function loadLeaderboardData(tabId) {
        // In the future, replace this with an API call
        const data = leaderboardData[tabId];
        if (data) {
            renderTopPlayers(data);
            renderLeaderboardList(data);
        }
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Load data for the selected tab
            const tabId = tab.dataset.tab;
            loadLeaderboardData(tabId);

            // Update the indicator position
            const tabsContainer = document.querySelector('.leaderboard-tabs');
            const index = Array.from(tabs).indexOf(tab);
            const width = 100 / tabs.length;
            tabsContainer.style.setProperty('--indicator-position', `${width * index}%`);
        });
    });

    // Load initial data
    loadLeaderboardData('region');
});
document.addEventListener('DOMContentLoaded', () => {
    // Currency selection
    const currencyButtons = document.querySelectorAll('.currency-btn');
    currencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            currencyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Balance selection
    const balanceButtons = document.querySelectorAll('.balance-btn');
    balanceButtons.forEach(button => {
        button.addEventListener('click', () => {
            balanceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Rules navigation
    const dots = document.querySelectorAll('.rules-navigation .dot');
    const rulesContent = document.querySelector('.rules-content p');
    
    // Sample rules content for different pages
    const rulesPages = [
        "10 Participants will contribute 100 each, per week. Every week total sum of 1000 is collected, which will be given to the winner member that specific week. A dhukuti cycle is completed when all 10 members receive their contributed amount back.",
        "Members can bid for their preferred week. The highest bidder gets the collection for that week. This ensures fair distribution and adds an element of strategy to the game.",
        "All transactions are secured and monitored. Members must maintain consistent contributions to remain eligible for collections."
    ];

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            rulesContent.textContent = rulesPages[index];
            
            // Add fade animation
            rulesContent.style.opacity = '0';
            setTimeout(() => {
                rulesContent.style.opacity = '1';
            }, 150);
        });
    });

    // Get DOM elements
    const frequencyBtns = document.querySelectorAll('.frequency-btn');
    const contributionOptions = document.querySelector('.contribution-options');
    const weeklyOptions = document.querySelector('.weekly-options');
    const fortnightlyOptions = document.querySelector('.fortnightly-options');
    const monthlyOptions = document.querySelector('.monthly-options');
    const membersBtns = document.querySelectorAll('.members-btn');

    // Contribution amounts configuration
    const contributionConfig = {
        weekly: {
            amounts: [100, 250, 500],
            available: [100]
        },
        fortnightly: {
            amounts: [250, 500, 1000],
            available: [250, 500]
        },
        monthly: {
            amounts: [500, 1000, 2500],
            available: [500, 1000, 2500]
        }
    };

    // Handle frequency selection
    frequencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            frequencyBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Get selected frequency
            const frequency = btn.dataset.frequency;
            
            // Hide all options
            weeklyOptions.style.display = 'none';
            fortnightlyOptions.style.display = 'none';
            monthlyOptions.style.display = 'none';

            // Show selected frequency options
            switch(frequency) {
                case 'weekly':
                    weeklyOptions.style.display = 'flex';
                    break;
                case 'fortnightly':
                    fortnightlyOptions.style.display = 'flex';
                    break;
                case 'monthly':
                    monthlyOptions.style.display = 'flex';
                    break;
            }

            updateRulesText();
        });
    });

    // Handle contribution amount selection
    const contributionBtns = document.querySelectorAll('.contribution-btn');
    contributionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) return;

            // Remove active class from all buttons in the same options group
            const parentDiv = btn.closest('div');
            parentDiv.querySelectorAll('.contribution-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');

            updateRulesText();
        });
    });

    // Handle member count selection
    membersBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            membersBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            updateRulesText();
        });
    });

    // Update rules text based on selections
    function updateRulesText() {
        const selectedFrequency = document.querySelector('.frequency-btn.active').dataset.frequency;
        const selectedMembers = document.querySelector('.members-btn.active').dataset.members;
        const selectedAmount = document.querySelector(`.${selectedFrequency}-options .contribution-btn.active`)?.dataset.amount || '0';

        const rulesText = document.querySelector('.rules-content p');
        const totalAmount = parseInt(selectedAmount) * parseInt(selectedMembers);

        rulesText.textContent = `${selectedMembers} members will contribute $${selectedAmount} each, ${selectedFrequency}. Every ${selectedFrequency} period, a total sum of $${totalAmount} is collected, which will be given to the winner member for that specific period. A dhukuti cycle is completed when all ${selectedMembers} members receive their contributed amount back.`;
    }

    // Handle quick comparison button
    const comparisonBtn = document.querySelector('.comparison-btn');
    comparisonBtn?.addEventListener('click', () => {
        // TODO: Implement comparison functionality
        alert('Comparison feature coming soon!');
    });

    // Handle subscribe button
    const subscribeBtn = document.querySelector('.subscribe-btn');
    subscribeBtn?.addEventListener('click', () => {
        const selectedFrequency = document.querySelector('.frequency-btn.active').dataset.frequency;
        const selectedMembers = document.querySelector('.members-btn.active').dataset.members;
        const selectedAmount = document.querySelector(`.${selectedFrequency}-options .contribution-btn.active`)?.dataset.amount;

        if (!selectedAmount) {
            alert('Please select a contribution amount');
            return;
        }

        // TODO: Implement subscription functionality
        const subscriptionDetails = {
            frequency: selectedFrequency,
            memberCount: selectedMembers,
            contributionAmount: selectedAmount,
            timestamp: new Date().toISOString()
        };

        console.log('Subscription details:', subscriptionDetails);
        alert('Thank you for subscribing to Dhukuti! We will contact you soon.');
    });

    // Add hover effects to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const profileUpload = document.getElementById('profile-upload');
    const profilePreview = document.getElementById('profile-preview');
    const form = document.querySelector('.profile-setup-form');
    const verifyButtons = document.querySelectorAll('.verify-btn');

    // Handle profile picture upload
    profileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle verification buttons
    verifyButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const inputGroup = button.closest('.form-group');
            const input = inputGroup.querySelector('input');
            const status = inputGroup.querySelector('.verification-status');
            
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';

            try {
                // Simulate verification API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                status.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                status.classList.remove('unverified');
                status.classList.add('verified');
                button.innerHTML = '<i class="fas fa-check"></i> Verified';
                button.style.background = 'var(--success-color, #27ae60)';
            } catch (error) {
                button.disabled = false;
                button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Retry';
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.save-profile-btn');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Profile Saved!';
            submitBtn.style.background = 'var(--success-color, #27ae60)';
            
            // Redirect to profile page after successful save
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1000);
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Save Profile';
        }
    });
});
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
document.addEventListener('DOMContentLoaded', function() {
    const uploadBoxes = document.querySelectorAll('.upload-box');

    uploadBoxes.forEach(box => {
        const fileInput = box.querySelector('.file-input');

        // Handle click on upload box
        box.addEventListener('click', function(e) {
            // Prevent click if clicking on the file input itself
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });

        // Handle file selection
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload only JPG, PNG or PDF files');
                    fileInput.value = ''; // Clear the input
                    return;
                }

                // Check file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File size should not exceed 5MB');
                    fileInput.value = ''; // Clear the input
                    return;
                }

                // Update UI to show selected file
                updateUploadBoxUI(box, file);
            }
        });

        // Handle drag and drop
        box.addEventListener('dragover', function(e) {
            e.preventDefault();
            box.classList.add('drag-over');
        });

        box.addEventListener('dragleave', function(e) {
            e.preventDefault();
            box.classList.remove('drag-over');
        });

        box.addEventListener('drop', function(e) {
            e.preventDefault();
            box.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload only JPG, PNG or PDF files');
                    return;
                }

                // Check file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File size should not exceed 5MB');
                    return;
                }

                // Set the file to input and update UI
                fileInput.files = e.dataTransfer.files;
                updateUploadBoxUI(box, file);
            }
        });
    });

    // Function to update upload box UI
    function updateUploadBoxUI(box, file) {
        // Remove existing file display if any
        const existingFileDisplay = box.querySelector('.selected-file');
        if (existingFileDisplay) {
            existingFileDisplay.remove();
        }

        // Create new file display
        const fileDisplay = document.createElement('div');
        fileDisplay.className = 'selected-file';
        fileDisplay.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <button class="remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add remove button functionality
        const removeButton = fileDisplay.querySelector('.remove-file');
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent upload box click
            const fileInput = box.querySelector('.file-input');
            fileInput.value = ''; // Clear the input
            fileDisplay.remove(); // Remove the display
            box.classList.remove('has-file');
        });

        // Add the file display to the upload box
        box.appendChild(fileDisplay);
        box.classList.add('has-file');
    }
});
//# sourceMappingURL=main.js.map
