document.addEventListener('DOMContentLoaded', () => {
    // Currency selection
    const currencyButtons = document.querySelectorAll('.currency-btn');
    if (currencyButtons.length > 0) {
        currencyButtons.forEach(button => {
            button.addEventListener('click', () => {
                currencyButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Balance selection
    const balanceButtons = document.querySelectorAll('.balance-btn');
    if (balanceButtons.length > 0) {
        balanceButtons.forEach(button => {
            button.addEventListener('click', () => {
                balanceButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Rules navigation
    const dots = document.querySelectorAll('.rules-navigation .dot');
    const rulesContent = document.querySelector('.rules-content p');
    
    // Sample rules content for different pages
    const rulesPages = [
        "10 Participants will contribute 100 each, per week. Every week total sum of 1000 is collected, which will be given to the winner member that specific week. A dhukuti cycle is completed when all 10 members receive their contributed amount back.",
        "Members can bid for their preferred week. The highest bidder gets the collection for that week. This ensures fair distribution and adds an element of strategy to the game.",
        "All transactions are secured and monitored. Members must maintain consistent contributions to remain eligible for collections."
    ];

    if (dots.length > 0 && rulesContent) {
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
    }

    // Get DOM elements
    const frequencyBtns = document.querySelectorAll('.frequency-btn');
    const contributionOptions = document.querySelector('.contribution-options');
    const weeklyOptions = document.querySelector('.weekly-options');
    const fortnightlyOptions = document.querySelector('.fortnightly-options');
    const monthlyOptions = document.querySelector('.monthly-options');
    const membersBtns = document.querySelectorAll('.members-btn');

    // Only proceed if required elements exist
    if (frequencyBtns.length > 0 && weeklyOptions && fortnightlyOptions && monthlyOptions) {
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
    }

    // Handle contribution amount selection
    const contributionBtns = document.querySelectorAll('.contribution-btn');
    if (contributionBtns.length > 0) {
        contributionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;

                // Remove active class from all buttons in the same options group
                const parentDiv = btn.closest('div');
                if (parentDiv) {
                    parentDiv.querySelectorAll('.contribution-btn').forEach(b => b.classList.remove('active'));
                }
                
                // Add active class to clicked button
                btn.classList.add('active');

                updateRulesText();
            });
        });
    }

    // Handle member count selection
    if (membersBtns.length > 0) {
        membersBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                membersBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                updateRulesText();
            });
        });
    }

    // Update rules text based on selections
    function updateRulesText() {
        const activeFreqBtn = document.querySelector('.frequency-btn.active');
        const activeMembersBtn = document.querySelector('.members-btn.active');
        const rulesText = document.querySelector('.rules-content p');

        if (!activeFreqBtn || !activeMembersBtn || !rulesText) return;

        const selectedFrequency = activeFreqBtn.dataset.frequency;
        const selectedMembers = activeMembersBtn.dataset.members;
        const selectedAmount = document.querySelector(`.${selectedFrequency}-options .contribution-btn.active`)?.dataset.amount || '0';

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
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const activeFreqBtn = document.querySelector('.frequency-btn.active');
            const activeMembersBtn = document.querySelector('.members-btn.active');

            if (!activeFreqBtn || !activeMembersBtn) {
                alert('Please select all required options');
                return;
            }

            const selectedFrequency = activeFreqBtn.dataset.frequency;
            const selectedMembers = activeMembersBtn.dataset.members;
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
    }

    // Add hover effects to all buttons
    const allButtons = document.querySelectorAll('button');
    if (allButtons.length > 0) {
        allButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }
});