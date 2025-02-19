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