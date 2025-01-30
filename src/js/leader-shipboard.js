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