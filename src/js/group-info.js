// Future JavaScript functionality for group info can be added here 

document.addEventListener('DOMContentLoaded', () => {
    // Sample member data - replace with actual data from your backend
    const members = [
        { rank: 1, name: "John Doe", bids: 5, eligible: true },
        { rank: 2, name: "Jane Smith", bids: 4, eligible: true },
        { rank: 3, name: "Mike Johnson", bids: 3, eligible: false },
        { rank: 4, name: "Sarah Williams", bids: 3, eligible: true },
        { rank: 5, name: "David Brown", bids: 2, eligible: false }
    ];

    // Populate members list
    const membersList = document.querySelector('.members-list');
    members.forEach((member, index) => {
        const memberRow = document.createElement('div');
        memberRow.className = 'member-row';
        memberRow.style.animationDelay = `${index * 0.1}s`;
        
        memberRow.innerHTML = `
            <span class="rank">#${member.rank}</span>
            <span class="name">${member.name}</span>
            <span class="bids">${member.bids}</span>
            <span class="eligibility ${member.eligible ? 'eligible' : 'not-eligible'}">
                ${member.eligible ? 'Eligible' : 'Not Eligible'}
            </span>
            <span class="actions">
                <button class="view-profile" data-member="${member.name}">
                    <i class="fas fa-user"></i>
                </button>
            </span>
        `;
        
        membersList.appendChild(memberRow);
    });

    // Animate counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });

    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Add click handlers for action buttons
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const isPlaceBid = button.classList.contains('primary');
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);

            if (isPlaceBid) {
                console.log('Opening bid placement modal...');
                // Implement bid placement logic
            } else {
                console.log('Opening bid history...');
                // Implement bid history view
            }
        });
    });

    // Trophy animation
    const trophy = document.querySelector('.trophy-icon');
    let rotation = 0;
    
    setInterval(() => {
        rotation += 1;
        trophy.style.transform = `rotateY(${rotation}deg)`;
    }, 50);

    // View profile button handlers
    document.querySelectorAll('.view-profile').forEach(button => {
        button.addEventListener('click', (e) => {
            const memberName = button.getAttribute('data-member');
            console.log(`Viewing profile of ${memberName}`);
            // Implement profile view logic
        });
    });

    // Modal functionality
    const modal = document.getElementById('bidModal');
    const openModalBtn = document.querySelector('.action-button.primary');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.btn-cancel');
    const bidForm = document.getElementById('bidForm');
    const bidAmountInput = document.getElementById('bidAmount');
    const receiveAmount = document.querySelector('.receive-amount');
    const serviceFee = document.querySelector('.service-fee');

    const openModal = () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        bidAmountInput.focus();
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        bidForm.reset();
    };

    // Calculate bid amounts
    const calculateBidAmounts = (amount) => {
        const fee = Math.round(amount * 0.01); // 1% service fee
        const receive = amount - fee;
        
        receiveAmount.textContent = `₹${receive.toLocaleString()}`;
        serviceFee.textContent = `₹${fee.toLocaleString()}`;
    };

    // Event Listeners
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Handle bid amount changes
    bidAmountInput.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value) || 0;
        calculateBidAmounts(amount);
    });

    // Handle form submission
    bidForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bidForm);
        const bidData = {
            amount: parseInt(formData.get('bidAmount')),
            message: formData.get('bidMessage')
        };

        // Add loading state
        const submitBtn = bidForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Bid placed:', bidData);
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Bid Placed!';
            
            setTimeout(() => {
                closeModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }, 2000);
    });
}); 