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