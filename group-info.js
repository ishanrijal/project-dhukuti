// Sample bid data - will be replaced with API data
const currentBids = [
    { member: "Sarah M.", bidAmount: 300, bidPercentage: 6 },
    { member: "John D.", bidAmount: 400, bidPercentage: 8 },
    { member: "Mike R.", bidAmount: 250, bidPercentage: 5 }
];

// Bid calculations
const bidCalculations = {
    totalPool: 5000, // From static data
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

    calculatePotentialWinnings(bidAmount) {
        return this.totalPool - bidAmount - this.calculateServiceFee(bidAmount);
    },

    getHighestBid() {
        return currentBids.reduce((max, bid) => 
            bid.bidAmount > max.bidAmount ? bid : max, currentBids[0]);
    }
};

// Modal functionality
const modal = document.getElementById('bidModal');
const placeBidBtn = document.getElementById('placeBidBtn');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.querySelector('.btn-cancel');
const bidForm = document.getElementById('bidForm');
const bidAmountInput = document.getElementById('bidAmount');
const matchHighestBtn = document.querySelector('.match-highest');
const placeMaxBtn = document.querySelector('.place-max');
const bidPercentage = document.querySelector('.bid-percentage');
const highestAmount = document.querySelector('.highest-amount');
const poolAmount = document.querySelector('.pool-amount');
const bidAmount = document.querySelector('.bid-amount');
const serviceFee = document.querySelector('.service-fee');
const receiveAmount = document.querySelector('.receive-amount');
const currentBidsList = document.querySelector('.current-bids-list');

// Update bid modal information
function updateBidModalInfo() {
    const highestBid = bidCalculations.getHighestBid();
    
    // Update pool amount and bid limits
    poolAmount.textContent = `₹${bidCalculations.totalPool.toLocaleString()}`;
    document.querySelector('.bid-information .info-row:nth-child(2) .value')
        .textContent = `₹${bidCalculations.minBidAmount.toLocaleString()}`;
    document.querySelector('.bid-information .info-row:nth-child(3) .value')
        .textContent = `₹${bidCalculations.maxBidAmount.toLocaleString()}`;

    // Update highest bid information
    highestAmount.textContent = `₹${highestBid.bidAmount.toLocaleString()} (${highestBid.bidPercentage}%)`;
    matchHighestBtn.textContent = `Match Highest Bid (₹${highestBid.bidAmount.toLocaleString()})`;

    // Update input constraints
    bidAmountInput.min = bidCalculations.minBidAmount;
    bidAmountInput.max = bidCalculations.maxBidAmount;
    bidAmountInput.placeholder = `Enter amount between ₹${bidCalculations.minBidAmount.toLocaleString()} - ₹${bidCalculations.maxBidAmount.toLocaleString()}`;

    // Update current bids list
    updateCurrentBidsList();
}

// Update current bids list
function updateCurrentBidsList() {
    currentBidsList.innerHTML = '';
    
    // Sort bids by amount in descending order
    const sortedBids = [...currentBids].sort((a, b) => b.bidAmount - a.bidAmount);
    
    sortedBids.forEach(bid => {
        const bidItem = document.createElement('div');
        bidItem.className = 'bid-item';
        bidItem.innerHTML = `
            <div class="bid-info">
                <span class="member-name">${bid.member}</span>
                <span class="bid-details">
                    ₹${bid.bidAmount.toLocaleString()} (${bid.bidPercentage}%)
                </span>
            </div>
            <button class="match-bid-btn" data-amount="${bid.bidAmount}">
                Match Bid
            </button>
        `;
        currentBidsList.appendChild(bidItem);
    });

    // Add event listeners to match bid buttons
    document.querySelectorAll('.match-bid-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseInt(btn.dataset.amount);
            setBidAmount(amount);
        });
    });
}

// Set bid amount and update calculations
function setBidAmount(amount) {
    bidAmountInput.value = amount;
    updateBidCalculations(amount);
}

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

// Quick action buttons
matchHighestBtn?.addEventListener('click', () => {
    const highestBid = bidCalculations.getHighestBid();
    setBidAmount(highestBid.bidAmount);
});

placeMaxBtn?.addEventListener('click', () => {
    setBidAmount(bidCalculations.maxBidAmount);
});

// Calculate and update bid amounts
const updateBidCalculations = (amount) => {
    const fee = bidCalculations.calculateServiceFee(amount);
    const winnings = bidCalculations.calculatePotentialWinnings(amount);
    
    bidAmount.textContent = `₹${amount.toLocaleString()}`;
    serviceFee.textContent = `₹${fee.toLocaleString()}`;
    receiveAmount.textContent = `₹${winnings.toLocaleString()}`;

    // Update bid percentage display
    const percentage = ((amount / bidCalculations.totalPool) * 100).toFixed(1);
    bidPercentage.textContent = `${percentage}%`;
};

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