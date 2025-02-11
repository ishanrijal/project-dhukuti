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
