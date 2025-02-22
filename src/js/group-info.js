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
        // Get all required elements
        const titleEl = document.querySelector('.dhukuti-specs .title');
        const badgeEl = document.querySelector('.dhukuti-specs .badge');
        const specContents = document.querySelectorAll('.spec-content');

        // Only proceed if required elements exist
        if (!titleEl || !badgeEl || specContents.length < 4) return;

        // Update title and badge
        titleEl.textContent = `Dhukuti Round ${dhukutiData.currentRound}/${dhukutiData.totalRounds}`;
        badgeEl.textContent = dhukutiData.contributionType;

        // Update spec cards
        // Dhukuti Ends
        const endDateP = specContents[0].querySelector('p');
        const endDateSub = specContents[0].querySelector('.sub-text');
        if (endDateP && endDateSub) {
            endDateP.textContent = dhukutiData.endDate;
            endDateSub.textContent = dhukutiData.duration;
        }

        // Total Pool
        const poolP = specContents[1].querySelector('p');
        const poolSub = specContents[1].querySelector('.sub-text');
        if (poolP && poolSub) {
            poolP.textContent = `₹${dhukutiData.totalPool.toLocaleString()}`;
            poolSub.textContent = `${dhukutiData.memberCount} members`;
        }

        // Next Winner
        const winnerP = specContents[2].querySelector('p');
        const winnerCount = specContents[2].querySelector('.countdown');
        if (winnerP && winnerCount) {
            winnerP.textContent = dhukutiData.nextWinner.date;
            winnerCount.textContent = dhukutiData.nextWinner.countdown;
        }

        // Bidding Opens
        const biddingP = specContents[3].querySelector('p');
        const biddingCount = specContents[3].querySelector('.countdown');
        if (biddingP && biddingCount) {
            biddingP.textContent = dhukutiData.biddingOpens.date;
            biddingCount.textContent = dhukutiData.biddingOpens.countdown;
        }
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
        if (!tableBody) return;
        
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

    // Get modal elements
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
        if (!modal || !bidAmountInput) return;

        const poolAmountEl = document.querySelector('.bid-information .info-row:first-child .value');
        const minBidEl = document.querySelector('.bid-information .info-row:last-child .value');

        if (poolAmountEl) {
            poolAmountEl.textContent = `₹${bidCalculations.totalPool.toLocaleString()}`;
        }
        
        if (minBidEl) {
            minBidEl.textContent = `₹${bidCalculations.minBidAmount.toLocaleString()}`;
        }

        // Update input constraints
        bidAmountInput.min = bidCalculations.minBidAmount;
        bidAmountInput.max = bidCalculations.maxBidAmount;
        bidAmountInput.placeholder = `Enter amount (₹${bidCalculations.minBidAmount.toLocaleString()} - ₹${bidCalculations.maxBidAmount.toLocaleString()})`;
    }

    // Open modal
    if (placeBidBtn && modal) {
        placeBidBtn.addEventListener('click', () => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            updateBidModalInfo();
            bidAmountInput?.focus();
        });
    }

    // Close modal functions
    const closeModal = () => {
        if (!modal || !bidForm) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = '';
        bidForm.reset();
        updateBidCalculations(0);
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Handle bid amount input
    if (bidAmountInput) {
        bidAmountInput.addEventListener('input', (e) => {
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
    }

    // Calculate and update bid amounts
    const updateBidCalculations = (amount) => {
        if (!receiveAmount || !serviceFee) return;
        
        const fee = bidCalculations.calculateServiceFee(amount);
        const receive = bidCalculations.calculateReceiveAmount(amount);
        
        receiveAmount.textContent = `₹${receive.toLocaleString()}`;
        serviceFee.textContent = `₹${fee.toLocaleString()}`;
    };

    // Handle form submission
    if (bidForm) {
        bidForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                bidAmount: parseInt(bidAmountInput?.value || '0'),
                timestamp: new Date().toISOString()
            };

            // TODO: Send to API
            console.log('Submitting bid:', formData);
            
            // Show success message and close modal
            alert('Bid placed successfully!');
            closeModal();
        });
    }

    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            // Add filter functionality here
            console.log('Filter button clicked');
        });
    }

    // Refresh functionality
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            // Add refresh functionality here
            console.log('Refresh button clicked');
        });
    }

    // Initialize
    populateDhukutiSpecs();
    populateMembers();
}); 
