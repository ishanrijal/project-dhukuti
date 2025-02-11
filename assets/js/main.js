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
    // Sample member data - replace with actual data from your backend
    const members = [
        { rank: 1, name: "Where's The New Update", stars: 230, points: 7491, icon: "🏰" },
        { rank: 2, name: "Goblin Builder Fanclub", stars: 229, points: 7568, icon: "👾" },
        { rank: 3, name: "SoupCell", stars: 195, points: 6808, icon: "🍜" },
        { rank: 4, name: "Home_village_wreckers", stars: 195, points: 6511, icon: "🏠" },
        { rank: 5, name: "NoMoreOresPlease", stars: 185, points: 6717, icon: "⛏️" },
        { rank: 6, name: "MOAR ORES", stars: 145, points: 5303, icon: "💎" },
        { rank: 7, name: "Clash Bros", stars: 132, points: 4337, icon: "⚔️" },
        { rank: 8, name: "NoDragNoWin", stars: 123, points: 4652, icon: "🐉" }
    ];

    // Populate members list
    const membersList = document.querySelector('.members-list');
    members.forEach((member, index) => {
        const memberRow = document.createElement('div');
        memberRow.className = 'member-row';
        memberRow.style.animationDelay = `${index * 0.1}s`;
        
        const rankIcon = index < 3 ? `<img src="assets/images/rank-${index + 1}.png" class="rank-icon" alt="Rank ${index + 1}">` : '';
        
        memberRow.innerHTML = `
            <div class="position">
                ${rankIcon}
                <span>${member.rank}</span>
            </div>
            <div class="member-info">
                <div class="member-icon">
                    <span>${member.icon}</span>
                </div>
                <span class="name">${member.name}</span>
            </div>
            <div class="stars">
                <i class="fas fa-star" style="color: #FFD700"></i>
                ${member.stars}
            </div>
            <div class="points">${member.points}</div>
            <div class="actions">
                <button class="more-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
        `;
        
        membersList.appendChild(memberRow);
    });

    // Modal functionality
    const modal = document.getElementById('bidModal');
    const placeBidBtn = document.getElementById('placeBidBtn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-cancel');
    const bidForm = document.getElementById('bidForm');
    const bidAmountInput = document.getElementById('bidAmount');
    const receiveAmount = document.querySelector('.receive-amount');
    const serviceFee = document.querySelector('.service-fee');

    // Open modal
    placeBidBtn.addEventListener('click', () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        bidAmountInput.focus();
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        bidForm.reset();
        updateBidCalculations(0);
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Calculate bid amounts
    const updateBidCalculations = (amount) => {
        const fee = Math.round(amount * 0.01); // 1% service fee
        const receive = amount - fee;
        
        receiveAmount.textContent = `₹${receive.toLocaleString()}`;
        serviceFee.textContent = `₹${fee.toLocaleString()}`;
    };

    // Handle bid amount input
    bidAmountInput.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        updateBidCalculations(amount);
    });

    // Handle form submission
    bidForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = bidForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Add loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Bid Placed!';
            submitBtn.style.background = '#4CAF50';
            
            // Close modal after delay
            setTimeout(() => {
                closeModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 1500);

        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            submitBtn.style.background = '#F44336';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });

    // Animate stats on load
    const animateValue = (element, start, end, duration) => {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const animate = () => {
            current += increment;
            if (current < end) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(animate);
            } else {
                element.textContent = end.toLocaleString();
            }
        };
        
        animate();
    };

    // Animate all stat values
    document.querySelectorAll('.stat-card .value').forEach(stat => {
        const value = parseInt(stat.textContent.replace(/,/g, ''));
        stat.textContent = '0';
        animateValue(stat, 0, value, 2000);
    });

    // Add hover effects
    document.querySelectorAll('.member-row').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'translateX(5px)';
        });

        row.addEventListener('mouseleave', () => {
            row.style.transform = 'translateX(0)';
        });
    });

    // Handle bid history button
    const bidHistoryBtn = document.getElementById('bidHistoryBtn');
    bidHistoryBtn.addEventListener('click', () => {
        // Implement bid history view
        console.log('Opening bid history...');
    });

    // Handle member info buttons
    document.querySelectorAll('.action-icon').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const memberName = e.currentTarget.dataset.member;
            console.log(`Viewing info for ${memberName}`);
            // Implement member info view
        });
    });
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

    // Quick comparison button
    const comparisonBtn = document.querySelector('.comparison-btn');
    comparisonBtn?.addEventListener('click', () => {
        // Add your comparison logic here
        console.log('Opening comparison view...');
    });

    // Subscribe button
    const subscribeBtn = document.querySelector('.subscribe-btn');
    subscribeBtn?.addEventListener('click', () => {
        // Add your subscription logic here
        console.log('Processing subscription...');
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
