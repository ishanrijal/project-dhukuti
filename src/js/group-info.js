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
