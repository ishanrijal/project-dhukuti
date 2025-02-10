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

    // Add hover animations for member rows
    document.querySelectorAll('.member-row').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'scale(1.01)';
        });

        row.addEventListener('mouseleave', () => {
            row.style.transform = 'scale(1)';
        });
    });

    // Trophy rotation animation
    const trophy = document.querySelector('.trophy-image');
    let isHovered = false;

    trophy.addEventListener('mouseenter', () => {
        isHovered = true;
        rotateTrophy();
    });

    trophy.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    function rotateTrophy() {
        if (!isHovered) return;
        trophy.style.transform = `rotate(${Math.sin(Date.now() / 1000) * 10}deg)`;
        requestAnimationFrame(rotateTrophy);
    }

    // Pause button functionality
    const pauseButton = document.querySelector('.pause-button');
    let isPaused = false;

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.innerHTML = isPaused ? 
            '<i class="fas fa-play"></i>' : 
            '<i class="fas fa-pause"></i>';
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