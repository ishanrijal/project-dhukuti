document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const topPlayersContainer = document.querySelector('.top-players');
    const leaderboardList = document.querySelector('.leaderboard-list');

    // Check if required elements exist
    if (!topPlayersContainer || !leaderboardList || !tabs.length) {
        console.warn('Required leaderboard elements are missing');
        return;
    }

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
        if (!topPlayersContainer || !players || players.length < 3) return;

        const top3 = players.slice(0, 3);
        const [first, second, third] = [top3[0], top3[1], top3[2]];

        // Ensure all required player data exists
        if (!first || !second || !third) return;

        topPlayersContainer.innerHTML = `
            <div class="player second">
                <div class="player-avatar">
                    <img src="${second.avatar || ''}" alt="${second.name || 'Player'}" onerror="this.src='default-avatar.png'">
                </div>
                <div class="player-info">
                    <span class="player-name">${second.name || 'Unknown Player'}</span>
                    <span class="player-score">${second.score || 0}</span>
                    <span class="player-username">${second.username || '@unknown'}</span>
                </div>
            </div>

            <div class="player first">
                <div class="crown-icon">
                    <i class="fas fa-crown"></i>
                </div>
                <div class="player-avatar">
                    <img src="${first.avatar || ''}" alt="${first.name || 'Player'}" onerror="this.src='default-avatar.png'">
                </div>
                <div class="player-info">
                    <span class="player-name">${first.name || 'Unknown Player'}</span>
                    <span class="player-score">${first.score || 0}</span>
                    <span class="player-username">${first.username || '@unknown'}</span>
                </div>
            </div>

            <div class="player third">
                <div class="player-avatar">
                    <img src="${third.avatar || ''}" alt="${third.name || 'Player'}" onerror="this.src='default-avatar.png'">
                </div>
                <div class="player-info">
                    <span class="player-name">${third.name || 'Unknown Player'}</span>
                    <span class="player-score">${third.score || 0}</span>
                    <span class="player-username">${third.username || '@unknown'}</span>
                </div>
            </div>
        `;
    }

    function renderLeaderboardList(players) {
        if (!leaderboardList || !players || players.length < 4) return;

        // Get players from index 3 onwards (after top 3)
        const remainingPlayers = players.slice(3);
        
        leaderboardList.innerHTML = remainingPlayers.map(player => {
            if (!player) return '';
            
            return `
                <div class="list-item">
                    <span class="rank">${players.indexOf(player) + 1}</span>
                    <img src="${player.avatar || ''}" alt="${player.name || 'Player'}" class="player-avatar" onerror="this.src='default-avatar.png'">
                    <span class="player-name">${player.name || 'Unknown Player'}</span>
                    <span class="player-score">${player.score || 0}</span>
                    <span class="status-dot ${player.status || 'offline'}"></span>
                </div>
            `;
        }).join('');
    }

    function loadLeaderboardData(tabId) {
        if (!tabId) return;

        // In the future, replace this with an API call
        const data = leaderboardData[tabId];
        if (data) {
            renderTopPlayers(data);
            renderLeaderboardList(data);
        }
    }

    // Tab click handlers
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            if (!tab) return;

            tab.addEventListener('click', () => {
                const tabsContainer = document.querySelector('.leaderboard-tabs');
                if (!tabsContainer) return;

                // Remove active class from all tabs
                tabs.forEach(t => t?.classList?.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                // Load data for the selected tab
                const tabId = tab.dataset.tab;
                if (!tabId) return;
                
                loadLeaderboardData(tabId);

                // Update the indicator position
                const index = Array.from(tabs).indexOf(tab);
                const width = 100 / tabs.length;
                tabsContainer.style.setProperty('--indicator-position', `${width * index}%`);
            });
        });

        // Load initial data
        const defaultTab = tabs[0]?.dataset?.tab;
        if (defaultTab) {
            loadLeaderboardData(defaultTab);
        } else {
            loadLeaderboardData('region'); // Fallback to region if no tab is found
        }
    }
});