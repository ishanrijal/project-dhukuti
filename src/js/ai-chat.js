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

    // Check if required elements exist
    if (!chatMessages || !messageInput || !onboardingModal || !onboardingSteps.length || !progressDots.length) {
        console.warn('Some required chat elements are missing');
        return;
    }

    // @todo: Replace with API - User assessment data storage
    let userAssessment = {
        fluency: null,
        pteGoal: null,
        focusSkill: null
    };

    let currentStep = 1;
    let maxStepReached = 1;

    // Handle start assessment button
    if (startAssessmentBtn) {
        startAssessmentBtn.addEventListener('click', () => {
            onboardingModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            // Hide the initial welcome message
            const welcomeMessage = startAssessmentBtn.closest('.message');
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
            initializeOnboarding();
        });
    }

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
    const optionBtns = document.querySelectorAll('.option-btn');
    if (optionBtns.length > 0) {
        optionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const step = btn.closest('.onboarding-step');
                if (!step) return;

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
    }

    // Handle progress dot clicks
    if (progressDots.length > 0) {
        progressDots.forEach((dot, index) => {
            const stepNumber = index + 1;
            dot.dataset.step = stepNumber;
            
            dot.addEventListener('click', () => {
                if (stepNumber <= maxStepReached) {
                    navigateToStep(stepNumber);
                }
            });
        });
    }

    // Function to navigate to a specific step
    function navigateToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 3) return;
        
        const direction = stepNumber > currentStep ? 'Next' : 'Prev';
        const currentStepEl = document.querySelector(`.onboarding-step[data-step="${currentStep}"]`);
        const nextStepEl = document.querySelector(`.onboarding-step[data-step="${stepNumber}"]`);

        if (!nextStepEl) return;

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
        if (!progressDots.length) return;

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
            if (!step) return;

            const selectedOption = step.querySelector(`[data-value="${userAssessment[stepKey]}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    // Function to complete onboarding
    function completeOnboarding() {
        if (!onboardingModal) return;

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
    
    // Only initialize dropdown if elements exist
    if (dropdownToggle && dropdownMenu) {
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
    }

    // Initialize emoji picker
    const initEmojiPicker = () => {
        if (!emojiBtn || !messageInput) return;

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
        if (!emojiBtn) return;

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.1.1/dist/index.min.js';
        script.onload = initEmojiPicker;
        document.head.appendChild(script);
    };

    // Only load emoji picker if button exists
    if (emojiBtn) {
        loadEmojiPicker();
    }

    // Scroll to bottom of chat
    const scrollToBottom = () => {
        if (!chatMessages) return;
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