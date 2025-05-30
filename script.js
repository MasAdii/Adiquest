if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope)
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error)
            })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page')
    const registrationForm = document.getElementById('registration-form')
    const usernameInput = document.getElementById('username')
    const emojiPreviewLanding = document.getElementById('emoji-preview-landing')
    const randomizeAvatarBtn = document.getElementById('randomize-avatar-btn')

    const appContainer = document.getElementById('app-container')
    const navLinks = document.querySelectorAll('.nav-link')
    const contentSections = document.querySelectorAll('.content-section')
    const mainContent = document.getElementById('main-content')

    const userAvatarSidebar = document.getElementById('user-avatar-sidebar')
    const userNameSidebar = document.getElementById('user-name-sidebar')
    const userTitleSidebar = document.getElementById('user-title-sidebar') 
    const userLevelDisplay = document.getElementById('user-level')
    const userTitleDashboard = document.getElementById('user-title-dashboard') 
    const userXpProgress = document.getElementById('user-xp')
    const userXpText = document.getElementById('xp-text')
    const userCoinsDisplay = document.getElementById('user-coins')
    const welcomeUsername = document.getElementById('welcome-username')
    const latestAchievementSummary = document.getElementById('latest-achievement-summary')
    const currentEventSummary = document.getElementById('current-event-summary')


    const profileAvatarMain = document.getElementById('profile-avatar-main')
    const profileNameMain = document.getElementById('profile-name-main')
    const userTitleProfile = document.getElementById('user-title-profile') 
    const profileLevelMain = document.getElementById('profile-level-main')
    const profileXpTotal = document.getElementById('profile-xp-total')
    const profileCoinsMain = document.getElementById('profile-coins-main')
    const ownedItemsList = document.getElementById('owned-items-list')
    const totalQuestsCompletedStat = document.getElementById('total-quests-completed-stat')
    const achievementsUnlockedStat = document.getElementById('achievements-unlocked-stat')
    const totalAchievementsStat = document.getElementById('total-achievements-stat')


    const addQuestForm = document.getElementById('add-quest-form')
    const questTitleInput = document.getElementById('quest-title-input')
    const questDescInput = document.getElementById('quest-desc-input')
    const userQuestListContainer = document.getElementById('quest-list') 
    const dailyQuestListDiv = document.getElementById('daily-quest-list')
    const weeklyQuestListDiv = document.getElementById('weekly-quest-list')
    const monthlyQuestListDiv = document.getElementById('monthly-quest-list')
    const eventQuestListContainer = document.getElementById('event-quest-list-container')
    const activeEventQuestListDiv = document.getElementById('active-event-quest-list')
    const periodicQuestsSummary = document.getElementById('periodic-quests-summary')
    const activeQuestsSummary = document.getElementById('active-quests-summary')
    const templateQuestButtonsDiv = document.getElementById('template-quest-buttons')


    const shopItemsGrid = document.getElementById('shop-items-grid')
    const shopFilterBtns = document.querySelectorAll('.filter-btn')
    const limitedTimeShopItemsDiv = document.getElementById('limited-time-shop-items')
    const limitedItemsGridDiv = document.getElementById('limited-items-grid')
    const craftingSectionDiv = document.getElementById('crafting-section')
    const craftableItemsListDiv = document.getElementById('craftable-items-list')

    const achievementsGridDiv = document.getElementById('achievements-grid')
    const skillTreeGridDiv = document.getElementById('skill-tree-grid')
    const skillPointsAvailableSpan = document.getElementById('skill-points-available')

    const themeToggleBtn = document.getElementById('theme-toggle-btn')
    const colorSchemeSelector = document.getElementById('color-scheme-selector')
    const bgmToggleBtn = document.getElementById('bgm-toggle-btn')
    const bgmVolumeSlider = document.getElementById('bgm-volume')
    const sfxToggleBtn = document.getElementById('sfx-toggle-btn')
    const sfxVolumeSlider = document.getElementById('sfx-volume')
    const resetDataBtn = document.getElementById('reset-data-btn')

    const interactiveCharacter = document.getElementById('interactive-character')
    const characterStatus = document.querySelector('.character-status')

    const notificationPopup = document.getElementById('notification-popup')
    const notificationEmoji = document.getElementById('notification-emoji')
    const notificationMessage = document.getElementById('notification-message')
    
    const modalContainer = document.getElementById('modal-container')
    const modalTitle = document.getElementById('modal-title')
    const modalDescription = document.getElementById('modal-description')
    const modalExtraContent = document.getElementById('modal-extra-content')
    const modalCloseBtn = document.getElementById('modal-close-btn')


    const bgm = document.getElementById('bgm')
    const sfxClick = document.getElementById('sfx-click')
    const sfxHover = document.getElementById('sfx-hover')
    const sfxLevelUp = document.getElementById('sfx-level-up')
    const sfxQuestComplete = document.getElementById('sfx-quest-complete')
    const sfxPurchase = document.getElementById('sfx-purchase')
    const sfxWarp = document.getElementById('sfx-warp')
    const sfxAchievement = document.getElementById('sfx-achievement')
    const sfxSkillUnlocked = document.getElementById('sfx-skill-unlocked')

    const AVATAR_EMOJIS = [
    '🧑‍🚀','🦸','🦹','🧑‍💻','🧑‍🎤','🧞','🧛','🧟',
    '👨‍🚒','👩‍⚕️','👨‍🍳','👩‍🎓','👨‍🏫','👩‍🔧','👨‍🔬','👩‍🚒',
    '👨‍✈️','👩‍✈️','👨‍🎨','👩‍🎤','🕵️‍♂️','🕵️‍♀️','💂‍♂️','💂‍♀️',
    '👮‍♂️','👮‍♀️','🧙‍♂️','🧙‍♀️','🧝‍♂️','🧝‍♀️','🧛‍♂️','🧛‍♀️',
    '🧟‍♂️','🧟‍♀️','🧞‍♂️','🧞‍♀️','🧜‍♂️','🧜‍♀️','🧚‍♂️','🧚‍♀️',
    '👨‍⚖️','👩‍⚖️','👨‍⚕️','👩‍⚕️','👨‍🏭','👩‍🏭','👨‍💼','👩‍💼',
    '👨‍🌾','👩‍🌾','👨‍🔧','👩‍🔧','👨‍🔬','👩‍🔬','👨‍🎓','👩‍🎓',
    '👨‍🍳','👩‍🍳','👨‍🎤','👩‍🎤','👨‍🎨','👩‍🎨','👨‍✈️','👩‍✈️',
    '👨‍🚀','👩‍🚀','👨‍🚒','👩‍🚒','👶','🧒','👦','👧','👨','👩','🧔',
    '👱‍♂️','👱‍♀️','🧑‍🦰','🧑‍🦱','🧑‍🦳','🧑‍🦲','👨‍🦰','👩‍🦰',
    '👨‍🦱','👩‍🦱','👨‍🦳','👩‍🦳','👨‍🦲','👩‍🦲','🧓','👴','👵',
    '🕺','💃','🕴️','🧍‍♂️','🧍‍♀️','🧎‍♂️','🧎‍♀️','🙆‍♂️','🙆‍♀️',
    '🙅‍♂️','🙅‍♀️','🙋‍♂️','🙋‍♀️','🙇‍♂️','🙇‍♀️','🤦‍♂️','🤦‍♀️',
    '🤷‍♂️','🤷‍♀️','💆‍♂️','💆‍♀️','💇‍♂️','💇‍♀️','🙎‍♂️','🙎‍♀️',
    '🙍‍♂️','🙍‍♀️','🤲','👐','🙌','👏','🤝','👍','👎','👊',
    '👋','🤚','✋','🖐️','🖖','👌','🤌','🤏','✌️','🤞',
    '🫰','🤟','🤘','🤙','👈','👉','👆','👇','☝️','🫵',
    '🦵','🦶','🦾','🦿','🧠','🫀','🫁','🦷','🦴','👀',
    '👁️','👅','👄','🧑‍🤝‍🧑','👭','👬','👫','👨‍👩‍👧','👨‍👩‍👦','👨‍👩‍👧‍👦',
    '👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👩‍👩‍👧','👩‍👩‍👦','👩‍👩‍👧‍👦','👩‍👩‍👦‍👦',
    '👨‍👨‍👧','👨‍👨‍👦','👨‍👨‍👧‍👦','👨‍👨‍👦‍👦','👨‍❤️‍👨','👩‍❤️‍👩',
    '💑','💏','👨‍❤️‍💋‍👨','👩‍❤️‍💋‍👩','🧌','👺','👹','💀','☠️','👻',
    '👽','👾','🤖','🎃','🤡','😺','😸','😹','😻','😼',
    '😽','🙀','😿','😾','🐱','🐶','🐵','🦁','🐯','🐰',
    '🦊','🐻','🐼','🐨','🐸','🐲','🐉','🦄','🐴','🪐',
    '🌕','🌑','⭐','⚡','🔥','💧','🌈','💫','🎇','🎆',
    '✨','🌟','🌀','❄️','🌪️','🌊','🕳️','🌋','🏔️','🏜️',
    '🏕️','🛸','🚀','🛫','🛬','✈️','🚁','🚂','🚆','🚄',
    '🚗','🚙','🚓','🚑','🚒','🚐','🛻','🚚','🛵','🏍️',
    '🦽','🦼','🛴','🚲','🛹','⛷️','🏂','🏄‍♂️','🏄‍♀️','🏊‍♂️',
    '🏊‍♀️','🚣‍♂️','🚣‍♀️','🤽‍♂️','🤽‍♀️','🚴‍♂️','🚴‍♀️','🧗‍♂️','🧗‍♀️','🤸‍♂️',
    '🤸‍♀️','🤾‍♂️','🤾‍♀️','🏋️‍♂️','🏋️‍♀️','🤼‍♂️','🤼‍♀️','🤹‍♂️','🤹‍♀️','⛹️‍♂️',
    '⛹️‍♀️','🏌️‍♂️','🏌️‍♀️','🏇','🤺','🎭','🎨','🎬','🎮','🕹️',
    '🎤','🎧','🎷','🎸','🎹','🥁','📷','📸','📹','🎥',
    '💻','🖥️','🖱️','⌨️','📱','📞','☎️','📟','📺','🧭'
    ]  
    const XP_PER_LEVEL_BASE = 50
    const XP_PER_LEVEL_INCREMENT = 50
    const THEME_CHANGE_LEVEL_INTERVAL = 20 
    const SKILL_POINT_LEVEL_INTERVAL = 5 
    const THEMES = [
        { name: 'Default Neon', class: 'theme-default' },
        { name: 'Volcanic Glare', class: 'theme-fire' },
        { name: 'Arctic Cyberspace', class: 'theme-ice' },
        { name: 'Digital Forest', class: 'theme-forest' },
        { name: 'Void Echo', class: 'theme-void' }
    ]
    const USER_TITLES = [
    { level: 1, title: "Pemula Neon" },
    { level: 10, title: "Pejuang Piksel" },
    { level: 20, title: "Prajurit Cyber" },
    { level: 30, title: "Ahli Algoritma" },
    { level: 40, title: "Master Glitch" },
    { level: 50, title: "Penjaga Firewall" },
    { level: 60, title: "Arsitek Jaringan" },
    { level: 70, title: "Raja Kode" },
    { level: 80, title: "Legenda AdiQuest" },
    { level: 90, title: "Ninja Digital" },
    { level: 100, title: "Entitas Kosmik" },
    { level: 110, title: "Pengendali Quantum" },
    { level: 120, title: "Ahli Enkripsi" },
    { level: 130, title: "Pemburu Exploit" },
    { level: 140, title: "Pengurai Data" },
    { level: 150, title: "Pengendali Sistem" },
    { level: 160, title: "Penguasa Server" },
    { level: 170, title: "Penjelajah Cyberspace" },
    { level: 180, title: "Pengendali Dimensi" },
    { level: 190, title: "Raja Malware" },
    { level: 200, title: "Penguasa Matrix" },
    { level: 210, title: "Master Teknologi" },
    { level: 220, title: "Jagoan Virtual" },
    { level: 230, title: "Ahli Botnet" },
    { level: 240, title: "Penjaga Protokol" },
    { level: 250, title: "Pengendali Firewall" },
    { level: 260, title: "Penguasa Data" },
    { level: 270, title: "Mitra AI" },
    { level: 280, title: "Pahlawan Cyber" },
    { level: 290, title: "Legenda Teknologi" },
    { level: 300, title: "Sang Hacker Legendaris" },
    { level: 310, title: "Pengendali Realitas" },
    { level: 320, title: "Penguasa Prosesor" },
    { level: 330, title: "Ahli Neural Network" },
    { level: 340, title: "Penguasa Cloud" },
    { level: 350, title: "Raja Cybersecurity" },
    { level: 360, title: "Misteri Digital" },
    { level: 370, title: "Sang Strategi Jaringan" },
    { level: 380, title: "Penyihir Data" },
    { level: 390, title: "Penjaga Server" },
    { level: 400, title: "Master Cyberpunk" },
    { level: 410, title: "Pengendali Virtual" },
    { level: 420, title: "Sang Cyber Samurai" },
    { level: 430, title: "Arsitek Dunia Digital" },
    { level: 440, title: "Penguasa Algoritma" },
    { level: 450, title: "Pengendali Matrix" },
    { level: 460, title: "Penguasa Sistem Operasi" },
    { level: 470, title: "Legenda Quantum" },
    { level: 480, title: "Sang Penakluk Virus" },
    { level: 490, title: "Master Dimensi" },
    { level: 500, title: "Entitas Kosmik Ultimate" }
    ]

    let userData = {
        name: '',
        avatar: AVATAR_EMOJIS[0],
        level: 1,
        xp: 0,
        xpToNextLevel: XP_PER_LEVEL_BASE,
        totalXpCollected: 0,
        coins: 0,
        ownedItems: [],
        quests: [], 
        completedPeriodicQuests: {}, 
        currentTheme: THEMES[0].class,
        skillPoints: 0,
        unlockedSkills: [],
        unlockedAchievements: [],
        stats: {
            totalQuestsCompleted: 0,
            itemsCrafted: 0,
            // Tambah statistik lain
        }
    }

    let shopItemsData = [
        { id: 'skin001', name: 'Neon Samurai', price: 150, stock: 1, category: 'skin', emoji: '👘', description: 'Tampilan samurai futuristik berkilau.' },
        { id: 'effect001', name: 'Glitch Trail', price: 80, stock: 5, category: 'effect', emoji: '✨', description: 'Efek jejak glitch saat bergerak.' },
        { id: 'badge001', name: 'Cyber Ninja', price: 50, stock: 10, category: 'badge', emoji: '🎖️', description: 'Lencana kehormatan Cyber Ninja.' },
        { id: 'skin002', name: 'Void Walker', price: 200, stock: 1, category: 'skin', emoji: '🧥', description: 'Pakaian penjelajah kehampaan.' },
        { id: 'effect002', name: 'Plasma Aura', price: 120, stock: 3, category: 'effect', emoji: '💫', description: 'Aura plasma mengelilingi karakter.' },
        { id: 'badge002', name: 'Quest Master', price: 75, stock: 8, category: 'badge', emoji: '🏆', description: 'Untuk penyelesai quest ulung.' },
        { id: 'powerup001', name: 'XP Boost (S)', price: 30, stock: 20, category: 'powerup', emoji: '⚡S', description: '+50% XP dari quest berikutnya.' },
        { id: 'powerup002', name: 'Coin Doubler (S)', price: 60, stock: 10, category: 'powerup', emoji: '💰S', description: 'Gandakan koin dari 1 quest.' },
        { id: 'skin003', name: 'Techno Mage Robe', price: 180, stock: 1, category: 'skin', emoji: '🧙', description: 'Jubah penyihir dengan sirkuit neon.' },
        { id: 'effect003', name: 'Holo Wings', price: 250, stock: 2, category: 'effect', emoji: '🦋', description: 'Sayap holografik berkilauan di punggungmu.' },
        { id: 'badge003', name: 'Data Runner', price: 60, stock: 15, category: 'badge', emoji: '💾', description: 'Lencana untuk penjelajah data handal.' },
        { id: 'powerup003', name: 'Quest Skip Ticket', price: 100, stock: 5, category: 'powerup', emoji: '🎟️', description: 'Lewati 1 quest (dapat reward).' },
        { id: 'skin004', name: 'Street Samurai Gear', price: 160, stock: 1, category: 'skin', emoji: '🥷', description: 'Pakaian tempur jalanan yang stylish.' },
        { id: 'effect004', name: 'Neon Footsteps', price: 70, stock: 8, category: 'effect', emoji: '👣', description: 'Jejak kaki bercahaya neon.' },
        { id: 'badge004', name: 'Code Breaker', price: 65, stock: 12, category: 'badge', emoji: '🔑', description: 'Ahli memecahkan kode dan misteri.' },
        { id: 'powerup004', name: 'Energy Cell (M)', price: 40, stock: 15, category: 'powerup', emoji: '🔋M', description: 'Pulihkan sedikit "energi".' },
        { id: 'skin005', name: 'Cosmic Explorer Suit', price: 220, stock: 1, category: 'skin', emoji: '🚀', description: 'Pakaian antariksa untuk petualang kosmik.' },
        { id: 'effect005', name: 'Particle Shield', price: 150, stock: 3, category: 'effect', emoji: '🛡️', description: 'Perisai partikel energi yang berputar.' },
        { id: 'badge005', name: 'Galaxy Guardian', price: 80, stock: 7, category: 'badge', emoji: '🌌', description: 'Pelindung kedamaian galaksi.' },
        { id: 'powerup005', name: 'Shop Discount (5%)', price: 80, stock: 7, category: 'powerup', emoji: '🏷️S', description: 'Diskon 5% untuk 1 item shop.' },
        { id: 'material001', name: 'Cyber Shard', price: 10, stock: 99, category: 'material', emoji: '💠', description: 'Pecahan energi cyber, untuk crafting.'},
        { id: 'material002', name: 'Neon Filament', price: 15, stock: 50, category: 'material', emoji: '🧵', description: 'Filamen bercahaya, untuk crafting efek.'},
        { id: 'skin006', name: 'Cybernetic Assassin', price: 250, stock: 1, category: 'skin', emoji: '👤', description: 'Setelan pembunuh bayaran berteknologi tinggi.' },
        { id: 'effect006', name: 'Binary Rain', price: 90, stock: 6, category: 'effect', emoji: '💻', description: 'Hujan kode biner di sekitarmu.' },
        { id: 'badge006', name: 'Neon Novice', price: 25, stock: 20, category: 'badge', emoji: '💡', description: 'Pemula di dunia neon AdiQuest.' },
        { id: 'powerup006', name: 'XP Boost (M)', price: 70, stock: 12, category: 'powerup', emoji: '⚡M', description: '+100% XP dari quest berikutnya.' },
        { id: 'skin007', name: 'Holographic Idol', price: 190, stock: 1, category: 'skin', emoji: '🎤', description: 'Kostum panggung idola holografik.' },
        { id: 'effect007', name: 'Electric Surge', price: 110, stock: 4, category: 'effect', emoji: '⚡️', description: 'Percikan listrik statis pada gerakanmu.' },
        { id: 'badge007', name: 'Coin Collector', price: 40, stock: 18, category: 'badge', emoji: '💰', description: 'Pengumpul koin yang rajin.' },
        { id: 'powerup007', name: 'Coin Doubler (M)', price: 110, stock: 7, category: 'powerup', emoji: '💰M', description: 'Gandakan koin dari 2 quest.' },
        { id: 'skin008', name: 'Quantum Nomad', price: 210, stock: 1, category: 'skin', emoji: '🧭', description: 'Pakaian pengembara antar dimensi.' },
        { id: 'effect008', name: 'Cosmic Dust Trail', price: 130, stock: 3, category: 'effect', emoji: '🌠', description: 'Jejak debu bintang mengikuti langkahmu.' },
        { id: 'badge008', name: 'XP Grinder', price: 45, stock: 16, category: 'badge', emoji: '📈', description: 'Pekerja keras dalam mengumpulkan XP.' },
        { id: 'powerup008', name: 'Rare Item Magnet', price: 150, stock: 3, category: 'powerup', emoji: '🧲', description: 'Tingkatkan шанс drop item langka.' },
        { id: 'skin009', name: 'Data Pirate Captain', price: 230, stock: 1, category: 'skin', emoji: '🏴‍☠️', description: 'Seragam kapten bajak laut data.' },
        { id: 'effect009', name: 'Stealth Shadow', price: 100, stock: 5, category: 'effect', emoji: '💨', description: 'Bayangan samar yang meningkatkan kesan siluman.' },
        { id: 'badge009', name: 'Shopaholic', price: 55, stock: 14, category: 'badge', emoji: '🛍️', description: 'Pengunjung setia toko item.' },
        { id: 'powerup009', name: 'Invincibility (5s)', price: 90, stock: 8, category: 'powerup', emoji: '🌟', description: 'Kebal sementara.' },
        { id: 'skin010', name: 'Chrono Guardian', price: 240, stock: 1, category: 'skin', emoji: '⏳', description: 'Armor penjaga aliran waktu.' },
        { id: 'effect010', name: 'Data Stream Aura', price: 140, stock: 4, category: 'effect', emoji: '🌐', description: 'Aliran data digital mengelilingimu.' },
        { id: 'badge010', name: 'Event Enthusiast', price: 70, stock: 9, category: 'badge', emoji: '🎉', description: 'Selalu ikut serta dalam setiap event.' },
        { id: 'powerup010', name: 'Shop Discount (15%)', price: 200, stock: 2, category: 'powerup', emoji: '🏷️M', description: 'Diskon 15% untuk 1 item shop.' },
        { id: 'badge011', name: 'Techno Tinkerer', price: 60, stock: 11, category: 'badge', emoji: '🛠️', description: 'Suka mengutak-atik teknologi.' },
        { id: 'powerup011', name: 'Mystery Box Key', price: 120, stock: 6, category: 'powerup', emoji: '🔑🎁', description: 'Buka Mystery Box.' },
        { id: 'badge012', name: 'Stealth Specialist', price: 70, stock: 10, category: 'badge', emoji: '🤫', description: 'Master operasi senyap.' },
        { id: 'powerup012', name: 'Adrenaline Shot', price: 50, stock: 10, category: 'powerup', emoji: '💉', description: 'Tingkatkan "kecepatan" sementara.' },
        { id: 'badge013', name: 'Glitch Hunter', price: 85, stock: 6, category: 'badge', emoji: '👾', description: 'Pemburu anomali dan glitch sistem.' },
        { id: 'powerup013', name: 'Time Warp Fragment', price: 180, stock: 3, category: 'powerup', emoji: '🌀', description: 'Percepat cooldown skill.' },
        { id: 'badge014', name: 'Lore Keeper', price: 50, stock: 13, category: 'badge', emoji: '📜', description: 'Pengumpul cerita dan rahasia dunia.' },
        { id: 'powerup014', name: 'Reputation Booster', price: 75, stock: 9, category: 'powerup', emoji: '📈🤝', description: 'Tingkatkan perolehan "reputasi".' },
        { id: 'badge015', name: 'Speed Runner', price: 90, stock: 5, category: 'badge', emoji: '⏱️', description: 'Menyelesaikan quest dengan rekor waktu.' },
        { id: 'powerup015', name: 'Full Energy Restore', price: 100, stock: 5, category: 'powerup', emoji: '🔋L', description: 'Pulihkan "energi" penuh.' },
    ]
    shopItemsData.forEach(item => {
        if (typeof item.initialStock === 'undefined') {
            item.initialStock = item.stock
        }
    })

    const periodicQuestTemplates = {
        daily: [
            { idBase: 'daily_check_schedule', title: '🗓️ Cek Jadwal Hari Ini', description: 'Buka dan tinjau rencana harianmu.', xp: 30, coins: 6 },
            { idBase: 'daily_clean_desk', title: '🧹 Bersihkan Meja Belajar/Kerja', description: 'Ruang bersih bantu pikiran lebih fokus.', xp: 35, coins: 7 },
            { idBase: 'daily_no_procrastinate', title: '⏳ Hindari Menunda', description: 'Selesaikan 1 tugas yang sering kamu tunda.', xp: 50, coins: 10 },
            { idBase: 'daily_plan_tomorrow', title: '📝 Rencanakan Hari Esok', description: 'Susun to-do list untuk besok.', xp: 40, coins: 8 },
            { idBase: 'daily_review_day', title: '📊 Tinjau Harimu', description: 'Catat 1 hal yang berhasil kamu lakukan hari ini.', xp: 35, coins: 7 },
            { idBase: 'daily_learn_word', title: '🧠 Pelajari Kata Baru', description: 'Cari dan pahami 1 kata baru dalam bahasa asing.', xp: 30, coins: 6 },
            { idBase: 'daily_reflection', title: '🪞 Refleksi Diri 2 Menit', description: 'Diam sejenak dan evaluasi perasaanmu hari ini.', xp: 35, coins: 7 },
            { idBase: 'daily_ted_watch', title: '🎥 Tonton 1 Video TED', description: 'Dapatkan inspirasi dari para pemikir dunia.', xp: 45, coins: 9 },
            { idBase: 'daily_ask_question', title: '❓Tanyakan Hal Baru', description: 'Tanya sesuatu yang kamu belum tahu.', xp: 30, coins: 6 },
            { idBase: 'daily_break_habit', title: '🛑 Putus 1 Kebiasaan Buruk', description: 'Sadari dan coba hentikan kebiasaan negatif.', xp: 50, coins: 10 },
            { idBase: 'daily_breathe_deep', title: '🌬️ Tarik Napas Dalam 3x', description: 'Latihan pernapasan singkat untuk relaksasi.', xp: 20, coins: 4 },
            { idBase: 'daily_drink_water', title: '💧 Minum Air Putih Sekarang', description: 'Jaga tubuh tetap terhidrasi.', xp: 25, coins: 5 },
            { idBase: 'daily_no_sugar', title: '🚫 Tanpa Gula Hari Ini', description: 'Jaga pola makan dengan menghindari gula.', xp: 40, coins: 8 },
            { idBase: 'daily_stretch_body', title: '🤸‍♂️ Peregangan Ringan', description: 'Lakukan peregangan selama 2 menit.', xp: 30, coins: 6 },
            { idBase: 'daily_sleep_early', title: '🌙 Tidur Lebih Awal', description: 'Tidur sebelum jam 10 malam.', xp: 50, coins: 10 },
            { idBase: 'daily_phone_free_hour', title: '📵 1 Jam Tanpa HP', description: 'Lepas gadget sejenak dan nikmati waktu nyata.', xp: 35, coins: 7 },
            { idBase: 'daily_clean_apps', title: '🧼 Bersihkan Aplikasi Tak Terpakai', description: 'Hapus 1 aplikasi yang tak kamu butuh.', xp: 30, coins: 6 },
            { idBase: 'daily_unfollow_toxic', title: '🧯 Unfollow Akun Negatif', description: 'Kurangi konten yang mengganggu pikiranmu.', xp: 40, coins: 8 },
            { idBase: 'daily_social_off', title: '📴 Nonaktifkan Sosial Media Sehari', description: 'Detoks digital untuk pikiran yang lebih jernih.', xp: 50, coins: 10 },
            { idBase: 'daily_set_limit', title: '🔒 Atur Waktu Layar HP', description: 'Batasi waktu menggunakan gadget hari ini.', xp: 35, coins: 7 },
            { idBase: 'daily_give_compliment', title: '💬 Puji Seseorang', description: 'Sampaikan pujian tulus hari ini.', xp: 30, coins: 6 },
            { idBase: 'daily_help_someone', title: '🤝 Bantu Orang Lain', description: 'Tawarkan bantuan sederhana.', xp: 35, coins: 7 },
            { idBase: 'daily_smile_more', title: '😊 Senyum ke 3 Orang', description: 'Senyumanmu bisa mencerahkan hari orang.', xp: 20, coins: 4 },
        ],
        weekly: [
            { idBase: 'weekly_calisthenics_major', title: '🗓️ Sesi Calisthenics Utama', description: 'Lakukan sesi latihan calisthenics lengkap (min 30-45 menit).', xp: 300, coins: 60 },
            { idBase: 'weekly_deep_clean', title: '🗓️ Bersih-bersih Mendalam', description: 'Satu area rumah/kamar dibersihkan secara menyeluruh.', xp: 250, coins: 50 },
            { idBase: 'weekly_learn_block', title: '🗓️ Blok Waktu Belajar Intensif', description: 'Alokasikan minimal 2 jam untuk belajar skill baru/topik tertentu.', xp: 350, coins: 70 },
            { idBase: 'weekly_no_screen_hour', title: '🗓️ Satu Jam Tanpa Layar Sebelum Tidur', description: 'Selama 3 hari minggu ini, hindari layar 1 jam sebelum tidur.', xp: 200, coins: 40 },
            { idBase: 'weekly_walk_5k', title: '🗓️ Jalan Kaki Total 5km', description: 'Akumulasi jalan kaki 5km selama minggu ini.', xp: 250, coins: 50 },
            { idBase: 'weekly_early_sleep', title: '🗓️ Tidur Sebelum Jam 10 selama 3 Hari', description: 'Prioritaskan istirahat yang cukup dan berkualitas.', xp: 200, coins: 40 },
            { idBase: 'weekly_sugar_free', title: '🗓️ 2 Hari Bebas Gula', description: 'Latih tubuh untuk hidup sehat dengan tidak konsumsi gula.', xp: 250, coins: 50 },
            { idBase: 'weekly_yoga', title: '🗓️ Sesi Yoga/Meditasi 2x', description: 'Lakukan latihan relaksasi atau mindfulness.', xp: 200, coins: 40 },
            { idBase: 'weekly_no_junk', title: '🗓️ Seminggu Tanpa Junk Food', description: 'Tidak makan makanan cepat saji selama seminggu.', xp: 300, coins: 60 },
            { idBase: 'weekly_read_30', title: '🗓️ Baca 30 Menit x 3 Hari', description: 'Latih fokus dan tambah ilmu dengan membaca.', xp: 250, coins: 50 },
            { idBase: 'weekly_journal_3x', title: '🗓️ Menulis Jurnal 3 Kali', description: 'Refleksi diri lewat tulisan pribadi.', xp: 200, coins: 40 },
            { idBase: 'weekly_finish_book', title: '🗓️ Selesaikan 1 Buku/Kursus', description: 'Fokus untuk menyelesaikan materi yang kamu mulai.', xp: 400, coins: 80 },
            { idBase: 'weekly_learn_3_vids', title: '🗓️ Tonton 3 Video Edukasi', description: 'Kaya wawasan lewat konten berkualitas.', xp: 250, coins: 50 },
            { idBase: 'weekly_skill_practice', title: '🗓️ Latihan Skill 3 Kali', description: 'Ulangi skill atau materi praktis secara konsisten.', xp: 300, coins: 60 },
            { idBase: 'weekly_laundry', title: '🗓️ Cuci dan Lipat Pakaian', description: 'Selesaikan cucian dan rapikan selama seminggu.', xp: 200, coins: 40 },
            { idBase: 'weekly_clean_workspace', title: '🗓️ Rapikan Meja Belajar/Kerja', description: 'Bersih dan siap pakai sepanjang minggu.', xp: 250, coins: 50 },
            { idBase: 'weekly_room_refresh', title: '🗓️ Tata Ulang Kamar/Meja', description: 'Beri suasana baru agar lebih produktif.', xp: 200, coins: 40 },
            { idBase: 'weekly_trash_out', title: '🗓️ Buang Sampah & Pilah', description: 'Jaga lingkungan tetap bersih dan sehat.', xp: 200, coins: 40 },
            { idBase: 'weekly_organize_files', title: '🗓️ Rapikan File di HP/Laptop', description: 'Folder dan file digital ditata dengan rapi.', xp: 300, coins: 60 },
            { idBase: 'weekly_call_family', title: '🗓️ Hubungi Keluarga', description: 'Sapa dan luangkan waktu bersama keluarga.', xp: 200, coins: 40 },
            { idBase: 'weekly_help_others', title: '🗓️ Bantu Seseorang', description: 'Minimal 1 aksi bantuan di minggu ini.', xp: 250, coins: 50 },
            { idBase: 'weekly_gratitude', title: '🗓️ Tulis 5 Hal Disyukuri', description: 'Latih hati untuk lebih bersyukur.', xp: 200, coins: 40 },
            { idBase: 'weekly_positive_post', title: '🗓️ Buat 1 Konten Positif', description: 'Posting hal baik untuk menyebar semangat.', xp: 250, coins: 50 },
            { idBase: 'weekly_listen_friend', title: '🗓️ Dengarkan Cerita Teman', description: 'Berikan waktu untuk menjadi pendengar.', xp: 250, coins: 50 },
            { idBase: 'weekly_silent_day', title: '🗓️ 1 Jam Tenang Total', description: 'Luangkan waktu tanpa suara, layar, dan gangguan.', xp: 200, coins: 40 },
            { idBase: 'weekly_mood_check', title: '🗓️ Pantau Mood 3x', description: 'Sadari dan catat perasaanmu.', xp: 200, coins: 40 },
            { idBase: 'weekly_screen_track', title: '🗓️ Cek Screen Time Mingguan', description: 'Tinjau berapa lama waktu kamu habis di layar.', xp: 200, coins: 40 },
            { idBase: 'weekly_digital_cleanse', title: '🗓️ Bersihkan Notifikasi/Email', description: 'Rapikan inbox & hapus spam.', xp: 250, coins: 50 },
            { idBase: 'weekly_no_socials', title: '🗓️ 1 Hari Tanpa Sosial Media', description: 'Lepas sejenak dari dunia maya.', xp: 300, coins: 60 },
            { idBase: 'weekly_task_clear', title: '🗓️ Selesaikan Semua To-Do Mingguan', description: 'Checklist semua target mingguanmu.', xp: 400, coins: 80 },
            { idBase: 'weekly_time_block', title: '🗓️ Rencana Waktu Mingguan', description: 'Gunakan metode time-blocking.', xp: 250, coins: 50 },
            { idBase: 'weekly_1_big_task', title: '🗓️ Selesaikan 1 Tugas Besar', description: 'Tuntaskan 1 hal penting yang selama ini tertunda.', xp: 400, coins: 80 },
            { idBase: 'weekly_meal_plan', title: '🗓️ Rencanakan Menu Makan', description: 'Susun menu makan sehat dan hemat.', xp: 200, coins: 40 },
            { idBase: 'weekly_budget_check', title: '🗓️ Cek Pengeluaran & Anggaran', description: 'Pantau uang masuk dan keluar.', xp: 250, coins: 50 },
            { idBase: 'weekly_artwork', title: '🗓️ Buat 1 Karya Kreatif', description: 'Gambar, nulis, edit, coding, atau lainnya.', xp: 300, coins: 60 },
        ],
        monthly: [
            { idBase: 'monthly_new_recipe', title: '🌙 Coba Resep Sehat Baru', description: 'Masak dan nikmati satu hidangan sehat baru.', xp: 600, coins: 120 },
            { idBase: 'monthly_volunteer_or_help', title: '🌙 Bantu Orang Lain/Komunitas', description: 'Luangkan waktu untuk kegiatan sosial atau membantu seseorang.', xp: 800, coins: 150 },
            { idBase: 'monthly_project_milestone', title: '🌙 Capai Milestone Proyek Pribadi', description: 'Buat kemajuan signifikan pada proyek pribadi (belajar, hobi, dll).', xp: 1000, coins: 200 },
            { idBase: 'monthly_digital_detox_halfday', title: '🌙 Setengah Hari Detoks Digital', description: 'Habiskan minimal 4 jam tanpa gadget yang tidak perlu.', xp: 700, coins: 140 },
            { idBase: 'monthly_reflection_journal', title: '🌙 Tulis Refleksi Bulanan', description: 'Luangkan waktu untuk menulis jurnal refleksi tentang bulan ini.', xp: 650, coins: 130 },
            { idBase: 'monthly_budget_review', title: '🌙 Review Keuangan Bulanan', description: 'Evaluasi pengeluaran dan pemasukan bulan ini.', xp: 600, coins: 120 },
            { idBase: 'monthly_learn_new_skill', title: '🌙 Pelajari Satu Skill Baru', description: 'Pelajari dan praktekkan satu keterampilan baru.', xp: 950, coins: 180 },
            { idBase: 'monthly_book_finish', title: '🌙 Selesaikan Membaca 1 Buku', description: 'Baca dan selesaikan satu buku bulan ini.', xp: 700, coins: 140 },
            { idBase: 'monthly_exercise_streak', title: '🌙 Konsistensi Olahraga 3x/Minggu', description: 'Pertahankan jadwal olahraga minimal 3 kali per minggu selama sebulan.', xp: 850, coins: 170 },
            { idBase: 'monthly_deep_clean_room', title: '🌙 Bersih-Bersih Kamar Mendalam', description: 'Rapikan dan bersihkan seluruh bagian kamar.', xp: 750, coins: 150 },
            { idBase: 'monthly_social_media_limit', title: '🌙 Batasi Sosial Media', description: 'Kurangi waktu layar sosial media jadi maksimal 1 jam/hari selama 1 minggu.', xp: 720, coins: 140 },
            { idBase: 'monthly_meditation_consistency', title: '🌙 Meditasi 5x Dalam Sebulan', description: 'Lakukan sesi meditasi sebanyak minimal 5 kali.', xp: 800, coins: 160 },
            { idBase: 'monthly_random_act_kindness', title: '🌙 Aksi Baik Tak Terduga', description: 'Lakukan satu aksi kebaikan spontan pada orang lain.', xp: 650, coins: 130 },
            { idBase: 'monthly_sunset_or_sunrise', title: '🌙 Nikmati Matahari Terbit/Terbenam', description: 'Luangkan waktu untuk menyaksikan dan menikmati momen alam.', xp: 500, coins: 100 },
            { idBase: 'monthly_long_walk_nature', title: '🌙 Jalan Kaki di Alam', description: 'Lakukan perjalanan kaki panjang di alam terbuka.', xp: 800, coins: 150 },
            { idBase: 'monthly_meal_prep', title: '🌙 Siapkan Makanan Sehat untuk Seminggu', description: 'Buat meal plan dan siapkan bekal/makanan sehat.', xp: 750, coins: 145 },
            { idBase: 'monthly_minimalism_task', title: '🌙 Lakukan Tugas Minimalisme', description: 'Sortir dan singkirkan barang yang tidak dibutuhkan.', xp: 700, coins: 140 },
            { idBase: 'monthly_learn_finance', title: '🌙 Pelajari Tentang Keuangan Pribadi', description: 'Baca atau ikuti kelas keuangan untuk literasi finansial.', xp: 850, coins: 160 },
            { idBase: 'monthly_reconnect_friend', title: '🌙 Hubungi Teman Lama', description: 'Jalin kembali komunikasi dengan seseorang yang sudah lama tidak ditemui.', xp: 600, coins: 120 },
        ]
    }

    const userQuestTemplates = [
        { title: '💪 Push Up (Target Sendiri)', description: 'Contoh: 3 set x 10 repetisi' },
        { title: '🤸 Plank (Target Sendiri)', description: 'Contoh: 3 set x 30 detik' },
        { title: '📚 Belajar [Topik] 30 Menit', description: 'Fokus pada satu topik pembelajaran.' },
        { title: '🧹 Merapikan Meja Kerja', description: 'Ciptakan ruang kerja yang nyaman.' },
        { title: '🧘 Meditasi 5 Menit', description: 'Tenangkan pikiran sejenak.' },
        { title: '💧 Minum Segelas Air Sekarang', description: 'Ingatkan diri untuk hidrasi.' },
        { title: '😊 Lakukan Kebaikan Kecil', description: 'Senyum, bantu teman, atau hal positif lainnya.' },
        { title: '🚶 Jalan Santai 15 Menit', description: 'Segarkan tubuh dan pikiran.' },
    ]

    const achievementsData = [
        { id: 'ach_level_10', name: 'Level 10 Dicapai!', description: 'Selamat, kamu mencapai Level 10.', emoji: '🔟', condition: () => userData.level >= 10, reward: { xp: 50, coins: 10 } },
        { id: 'ach_level_20', name: 'Level 20 Dicapai!', description: 'Selamat, kamu mencapai Level 20.', emoji: '2️⃣0️⃣', condition: () => userData.level >= 20, reward: { xp: 50, coins: 10 } },
        { id: 'ach_level_30', name: 'Level 30 Dicapai!', description: 'Selamat, kamu mencapai Level 30.', emoji: '3️⃣0️⃣', condition: () => userData.level >= 30, reward: { xp: 50, coins: 10 } },
        { id: 'ach_level_40', name: 'Level 40 Dicapai!', description: 'Selamat, kamu mencapai Level 40.', emoji: '4️⃣0️⃣', condition: () => userData.level >= 40, reward: { xp: 50, coins: 10 } },
        { id: 'ach_level_50', name: 'Penjaga Firewall', description: 'Kamu mencapai Level 50 dan gelar baru!', emoji: '🛡️', condition: () => userData.level >= 50, reward: { coins: 100, itemId: 'badge_firewall_guardian' } },
        { id: 'ach_level_60', name: 'Level 60 Dicapai!', description: 'Kamu mencapai Level 60 dan gelar baru!', emoji: '6️⃣0️⃣', condition: () => userData.level >= 60, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_70', name: 'Level 70 Dicapai!', description: 'Kamu mencapai Level 70 dan gelar baru!', emoji: '7️⃣0️⃣', condition: () => userData.level >= 70, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_80', name: 'Level 80 Dicapai!', description: 'Kamu mencapai Level 80 dan gelar baru!', emoji: '8️⃣0️⃣', condition: () => userData.level >= 80, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_90', name: 'Level 90 Dicapai!', description: 'Kamu mencapai Level 90 dan gelar baru!', emoji: '9️⃣0️⃣', condition: () => userData.level >= 90, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_100', name: 'Entitas Kosmik', description: 'Kamu mencapai Level 100 dan gelar baru!', emoji: '🌌', condition: () => userData.level >= 100, reward: { xp: 100, coins: 100, itemId: 'badge_cosmic_entity' } },
        { id: 'ach_level_110', name: 'Level 110 Dicapai!', description: 'Kamu mencapai Level 110!', emoji: '1️⃣1️⃣0️⃣', condition: () => userData.level >= 110, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_120', name: 'Level 120 Dicapai!', description: 'Kamu mencapai Level 120!', emoji: '1️⃣2️⃣0️⃣', condition: () => userData.level >= 120, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_130', name: 'Level 130 Dicapai!', description: 'Kamu mencapai Level 130!', emoji: '1️⃣3️⃣0️⃣', condition: () => userData.level >= 130, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_140', name: 'Level 140 Dicapai!', description: 'Kamu mencapai Level 140!', emoji: '1️⃣4️⃣0️⃣', condition: () => userData.level >= 140, reward: { xp: 100, coins: 100 } },
        { id: 'ach_level_150', name: 'Pengendali Sistem', description: 'Kamu mencapai Level 150 dan gelar baru!', emoji: '⚙️', condition: () => userData.level >= 150, reward: { xp: 150, coins: 150, itemId: 'badge_system_controller' } },
        { id: 'ach_level_160', name: 'Level 160 Dicapai!', description: 'Kamu mencapai Level 160!', emoji: '1️⃣6️⃣0️⃣', condition: () => userData.level >= 160, reward: { xp: 150, coins: 150 } },
        { id: 'ach_level_170', name: 'Level 170 Dicapai!', description: 'Kamu mencapai Level 170!', emoji: '1️⃣7️⃣0️⃣', condition: () => userData.level >= 170, reward: { xp: 150, coins: 150 } },
        { id: 'ach_level_180', name: 'Level 180 Dicapai!', description: 'Kamu mencapai Level 180!', emoji: '1️⃣8️⃣0️⃣', condition: () => userData.level >= 180, reward: { xp: 150, coins: 150 } },
        { id: 'ach_level_190', name: 'Level 190 Dicapai!', description: 'Kamu mencapai Level 190!', emoji: '1️⃣9️⃣0️⃣', condition: () => userData.level >= 190, reward: { xp: 150, coins: 150 } },
        { id: 'ach_level_200', name: 'Penguasa Matrix', description: 'Kamu mencapai Level 200 dan gelar baru!', emoji: '🌐', condition: () => userData.level >= 200, reward: { xp: 200, coins: 200, itemId: 'badge_matrix_ruler' } },
        { id: 'ach_level_210', name: 'Level 210 Dicapai!', description: 'Kamu mencapai Level 210!', emoji: '2️⃣1️⃣0️⃣', condition: () => userData.level >= 210, reward: { xp: 200, coins: 200 } },
        { id: 'ach_level_220', name: 'Level 220 Dicapai!', description: 'Kamu mencapai Level 220!', emoji: '2️⃣2️⃣0️⃣', condition: () => userData.level >= 220, reward: { xp: 200, coins: 200 } },
        { id: 'ach_level_230', name: 'Level 230 Dicapai!', description: 'Kamu mencapai Level 230!', emoji: '2️⃣3️⃣0️⃣', condition: () => userData.level >= 230, reward: { xp: 200, coins: 200 } },
        { id: 'ach_level_240', name: 'Level 240 Dicapai!', description: 'Kamu mencapai Level 240!', emoji: '2️⃣4️⃣0️⃣', condition: () => userData.level >= 240, reward: { xp: 200, coins: 200 } },
        { id: 'ach_level_250', name: 'Arsitek Digital', description: 'Kamu mencapai Level 250 dan gelar baru!', emoji: '🏛️', condition: () => userData.level >= 250, reward: { xp: 250, coins: 250, itemId: 'badge_digital_architect' } },
        { id: 'ach_level_260', name: 'Level 260 Dicapai!', description: 'Kamu mencapai Level 260!', emoji: '2️⃣6️⃣0️⃣', condition: () => userData.level >= 260, reward: { xp: 250, coins: 250 } },
        { id: 'ach_level_270', name: 'Level 270 Dicapai!', description: 'Kamu mencapai Level 270!', emoji: '2️⃣7️⃣0️⃣', condition: () => userData.level >= 270, reward: { xp: 250, coins: 250 } },
        { id: 'ach_level_280', name: 'Level 280 Dicapai!', description: 'Kamu mencapai Level 280!', emoji: '2️⃣8️⃣0️⃣', condition: () => userData.level >= 280, reward: { xp: 250, coins: 250 } },
        { id: 'ach_level_290', name: 'Level 290 Dicapai!', description: 'Kamu mencapai Level 290!', emoji: '2️⃣9️⃣0️⃣', condition: () => userData.level >= 290, reward: { xp: 250, coins: 250 } },
        { id: 'ach_level_300', name: 'Sang Hacker Legendaris', description: 'Kamu mencapai Level 300 dan gelar baru!', emoji: '💻', condition: () => userData.level >= 300, reward: { xp: 300, coins: 300, itemId: 'badge_legendary_hacker' } },
        { id: 'ach_level_310', name: 'Level 310 Dicapai!', description: 'Kamu mencapai Level 310!', emoji: '3️⃣1️⃣0️⃣', condition: () => userData.level >= 310, reward: { xp: 300, coins: 300}},
        { id: 'ach_level_320', name: 'Level 320 Dicapai!', description: 'Kamu mencapai Level 320!', emoji: '3️⃣2️⃣0️⃣', condition: () => userData.level >= 320, reward: { xp: 300, coins: 300}},
        { id: 'ach_level_330', name: 'Level 330 Dicapai!', description: 'Kamu mencapai Level 330!', emoji: '3️⃣3️⃣0️⃣', condition: () => userData.level >= 330, reward: { xp: 300, coins: 300}},
        { id: 'ach_level_340', name: 'Level 340 Dicapai!', description: 'Kamu mencapai Level 340!', emoji: '3️⃣4️⃣0️⃣', condition: () => userData.level >= 340, reward: { xp: 300, coins: 300}},
        { id: 'ach_level_350', name: 'Raja CyberSecurity', description: 'Kamu mencapai Level 350 dan gelar baru!', emoji: '👑', condition: () => userData.level >= 350, reward: { xp: 350, coins: 350, itemId: 'badge_cybersecurity_king' } },
        { id: 'ach_level_360', name: 'Level 360 Dicapai!', description: 'Kamu mencapai Level 360!', emoji: '3️⃣6️⃣0️⃣', condition: () => userData.level >= 360, reward: { xp: 350, coins: 350}},
        { id: 'ach_level_370', name: 'Level 370 Dicapai!', description: 'Kamu mencapai Level 370!', emoji: '3️⃣7️⃣0️⃣', condition: () => userData.level >= 370, reward: { xp: 350, coins: 350}},
        { id: 'ach_level_380', name: 'Level 380 Dicapai!', description: 'Kamu mencapai Level 380!', emoji: '3️⃣8️⃣0️⃣', condition: () => userData.level >= 380, reward: { xp: 350, coins: 350}},
        { id: 'ach_level_380', name: 'Level 380 Dicapai!', description: 'Kamu mencapai Level 380!', emoji: '3️⃣9️⃣0️⃣', condition: () => userData.level >= 380, reward: { xp: 350, coins: 350}},
        { id: 'ach_level_400', name: 'Master CyberPunk', description: 'Kamu mencapai Level 400 dan gelar baru!', emoji: '🤖', condition: () => userData.level >= 400, reward: { xp: 400, coins: 400, itemId: 'badge_cyberpunk_master' } },
        { id: 'ach_level_410', name: 'Level 410 Dicapai!', description: 'Kamu mencapai Level 410!', emoji: '4️⃣1️⃣0️⃣', condition: () => userData.level >= 410, reward: { xp: 400, coins: 400}},
        { id: 'ach_level_420', name: 'Level 420 Dicapai!', description: 'Kamu mencapai Level 420!', emoji: '4️⃣2️⃣0️⃣', condition: () => userData.level >= 420, reward: { xp: 400, coins: 400}},
        { id: 'ach_level_430', name: 'Level 430 Dicapai!', description: 'Kamu mencapai Level 430!', emoji: '4️⃣3️⃣0️⃣', condition: () => userData.level >= 430, reward: { xp: 400, coins: 400}},
        { id: 'ach_level_440', name: 'Level 440 Dicapai!', description: 'Kamu mencapai Level 440!', emoji: '4️⃣4️⃣0️⃣', condition: () => userData.level >= 440, reward: { xp: 400, coins: 400}},
        { id: 'ach_level_450', name: 'Pengendali Matrix Lanjutan', description: 'Kamu mencapai Level 450 dan gelar baru!', emoji: '🌀', condition: () => userData.level >= 450, reward: { xp: 450, coins: 450, itemId: 'badge_matrix_controller_adv' } },
        { id: 'ach_level_460', name: 'Level 460 Dicapai!', description: 'Kamu mencapai Level 460!', emoji: '4️⃣6️⃣0️⃣', condition: () => userData.level >= 460, reward: { xp: 450, coins: 450}},
        { id: 'ach_level_470', name: 'Level 470 Dicapai!', description: 'Kamu mencapai Level 470!', emoji: '4️⃣7️⃣0️⃣', condition: () => userData.level >= 470, reward: { xp: 450, coins: 450}},
        { id: 'ach_level_480', name: 'Level 480 Dicapai!', description: 'Kamu mencapai Level 480!', emoji: '4️⃣8️⃣0️⃣', condition: () => userData.level >= 480, reward: { xp: 450, coins: 450}},
        { id: 'ach_level_490', name: 'Level 490 Dicapai!', description: 'Kamu mencapai Level 490!', emoji: '4️⃣9️⃣0️⃣', condition: () => userData.level >= 490, reward: { xp: 450, coins: 450}},
        { id: 'ach_level_460', name: 'Level 460 Dicapai!', description: 'Kamu mencapai Level 460!', emoji: '💻', condition: () => userData.level >= 460, reward: { xp: 450, coins: 450}},
        { id: 'ach_level_500', name: 'Entitas Kosmik Ultimate', description: 'Kamu mencapai Level 500 dan gelar baru!', emoji: '🌟', condition: () => userData.level >= 500, reward: { xp: 500, coins: 500, itemId: 'badge_cosmic_ultimate' } },
        
        { id: 'ach_first_quest', name: 'Quest Pertama Selesai', description: 'Kamu menyelesaikan quest pertamamu!', emoji: '🏁', condition: () => userData.stats.totalQuestsCompleted >= 1, reward: { xp: 20 } },
        { id: 'ach_10_quests', name: 'Petualang Pemula', description: 'Selesaikan 10 quest.', emoji: '🧭', condition: () => userData.stats.totalQuestsCompleted >= 10, reward: { xp: 30, coins: 20 } },
        { id: 'ach_50_quests', name: 'Petualang Sejati', description: 'Selesaikan 50 quest.', emoji: '🗺️', condition: () => userData.stats.totalQuestsCompleted >= 50, reward: { coins: 50, xp: 50 } },
        { id: 'ach_100_quests', name: 'Pemburu Quest Ahli', description: 'Selesaikan 100 quest.', emoji: '🏹', condition: () => userData.stats.totalQuestsCompleted >= 100, reward: { xp: 100, coins: 100, itemId: 'item_quest_master_charm' } },
        { id: 'ach_250_quests', name: 'Legenda Quest', description: 'Selesaikan 250 quest.', emoji: '📜', condition: () => userData.stats.totalQuestsCompleted >= 250, reward: { xp: 250, coins: 250, itemId: 'item_quest_legend_scroll' } },
        { id: 'ach_500_quests', name: 'Dewa Quest', description: 'Selesaikan 500 quest.', emoji: '🏆', condition: () => userData.stats.totalQuestsCompleted >= 500, reward: { xp: 500, coins: 500, itemId: 'badge_quest_god' } },
        
        { id: 'ach_first_purchase', name: 'Pembeli Cerdas', description: 'Melakukan pembelian pertama di shop.', emoji: '💸', condition: () => userData.ownedItems && userData.ownedItems.length > 0, reward: { xp: 30 } },
        { id: 'ach_coin_hoarder_1', name: 'Kolektor Koin', description: 'Miliki 10,000 koin.', emoji: '💰', condition: () => userData.coins >= 10000, reward: { xp: 50, itemId: 'item_coin_magnet_small' } },
        { id: 'ach_coin_hoarder_2', name: 'Bankir Digital', description: 'Miliki 100,000 koin.', emoji: '🏦', condition: () => userData.coins >= 100000, reward: { xp: 100, coins: 1000, itemId: 'item_coin_vault_key' } },
        { id: 'ach_coin_millionaire', name: 'Jutawan Cyber', description: 'Miliki 1,000,000 koin.', emoji: '💎', condition: () => userData.coins >= 1000000, reward: { xp: 500, coins: 10000, itemId: 'badge_cyber_millionaire' } },
        { id: 'ach_big_spender', name: 'Pemboros Dermawan', description: 'Habiskan total 50,000 koin.', emoji: '🛍️', condition: () => userData.stats.totalCoinsSpent >= 50000, reward: { xp: 100, itemId: 'item_discount_coupon_10' } },
        { id: 'ach_item_collector_1', name: 'Pengumpul Pemula', description: 'Miliki 25 item berbeda di inventaris.', emoji: '🎒', condition: () => userData.ownedItems && new Set(userData.ownedItems.map(item => item.id)).size >= 25, reward: { xp: 50, coins: 50 } },
        { id: 'ach_item_collector_2', name: 'Kolektor Sejati', description: 'Miliki 100 item berbeda di inventaris.', emoji: '📦', condition: () => userData.ownedItems && new Set(userData.ownedItems.map(item => item.id)).size >= 100, reward: { xp: 150, coins: 150, itemId: 'item_collectors_manual' } },
        { id: 'ach_rare_item_owner', name: 'Pemburu Harta Karun', description: 'Miliki item langka (Rare atau lebih tinggi).', emoji: '✨', condition: () => userData.ownedItems && userData.ownedItems.some(item => ['rare', 'epic', 'legendary'].includes(item.rarity)), reward: { xp: 75, coins: 100 } },
        { id: 'ach_fully_upgraded_item', name: 'Ahli Modifikasi', description: 'Upgrade item hingga level maksimum.', emoji: '🛠️', condition: () => userData.ownedItems && userData.ownedItems.some(item => item.level && item.maxLevel && item.level === item.maxLevel && item.maxLevel > 1), reward: { xp: 100, coins: 50 } },
        
        { id: 'ach_all_daily_done', name: 'Raja Harian', description: 'Selesaikan semua quest harian dalam satu siklus.', emoji: '🔥', condition: () => periodicQuestTemplates.daily.every(t => userData.completedPeriodicQuests[generatePeriodicQuestId(t.idBase, 'daily')]), reward: { coins: 50, itemId: 'powerup_daily_boost' } },
        { id: 'ach_all_weekly_done', name: 'Raja Mingguan', description: 'Selesaikan semua quest mingguan dalam satu siklus.', emoji: '🗓️', condition: () => periodicQuestTemplates.weekly.every(t => userData.completedPeriodicQuests[generatePeriodicQuestId(t.idBase, 'weekly')]), reward: { coins: 75, itemId: 'powerup_weekly_boost' } },
        { id: 'ach_all_monthly_done', name: 'Raja Bulanan', description: 'Selesaikan semua quest bulanan dalam satu siklus.', emoji: '📅', condition: () => periodicQuestTemplates.monthly.every(t => userData.completedPeriodicQuests[generatePeriodicQuestId(t.idBase, 'monthly')]), reward: { coins: 100, itemId: 'powerup_monthly_boost' } },
        
        { id: 'ach_login_streak_7', name: 'Pejuang Harian', description: 'Login 7 hari berturut-turut.', emoji: '📆', condition: () => userData.stats.loginStreak >= 7, reward: { xp: 50, coins: 50 } },
        { id: 'ach_login_streak_30', name: 'Loyalis Sejati', description: 'Login 30 hari berturut-turut.', emoji: '🏅', condition: () => userData.stats.loginStreak >= 30, reward: { xp: 150, coins: 150, itemId: 'item_loyalty_badge' } },
        { id: 'ach_login_total_100', name: 'Warga Setia', description: 'Total login 100 hari.', emoji: '🫂', condition: () => userData.stats.totalLogins >= 100, reward: { xp: 200, coins: 200, itemId: 'badge_veteran_user' } },
        
        { id: 'ach_first_challenge_won', name: 'Penakluk Tantangan', description: 'Menangkan tantangan pertamamu.', emoji: '🎯', condition: () => userData.stats.challengesWon > 0, reward: { xp: 50, coins: 25 } },
        { id: 'ach_10_challenges_won', name: 'Ahli Strategi', description: 'Menangkan 10 tantangan berbeda.', emoji: '♟️', condition: () => userData.stats.uniqueChallengesWon >= 10, reward: { xp: 100, coins: 100, itemId: 'item_strategy_guide' } },
        { id: 'ach_perfect_score_challenge', name: 'Sempurna!', description: 'Dapatkan skor sempurna dalam sebuah tantangan.', emoji: '💯', condition: () => userData.stats.perfectScoresInChallenges > 0, reward: { xp: 75, coins: 75, itemId: 'item_perfect_score_token' } },
        
        { id: 'ach_social_sharer', name: 'Penyebar Kabar', description: 'Bagikan progresmu.', emoji: '📢', condition: () => userData.stats.timesShared >= 1, reward: { xp: 20, coins: 10 } },
        { id: 'ach_easter_egg_hunter', name: 'Detektif Digital', description: 'Temukan rahasia tersembunyi.', emoji: '🕵️', condition: () => userData.secretsFound && userData.secretsFound.includes('main_easter_egg_01'), reward: { xp: 100, coins: 100, itemId: 'item_secret_decoder' } },
        { id: 'ach_feedback_given', name: 'Kontributor Aktif', description: 'Berikan masukan atau saran untuk game.', emoji: '📝', condition: () => userData.stats.feedbackSubmitted >= 1, reward: { xp: 30, coins: 20 } },
        { id: 'ach_max_inventory', name: 'Gudang Penuh Sesak', description: 'Capai kapasitas inventaris maksimum.', emoji: '🗄️', condition: () => userData.inventory && userData.inventory.items && userData.inventory.maxCapacity && userData.inventory.items.length >= userData.inventory.maxCapacity, reward: { coins: 100, itemId: 'item_inventory_expansion_token_plus' } },
        
        { id: 'ach_level_25', name: 'Level 25 Tercapai!', description: 'Konsisten!', emoji: '🌱', condition: () => userData.level >= 25, reward: { xp: 55, coins: 15 } },
        { id: 'ach_level_75', name: 'Level 75 Tercapai!', description: 'Makin Tangguh!', emoji: '💪', condition: () => userData.level >= 75, reward: { xp: 75, coins: 25 } },
        { id: 'ach_level_125', name: 'Level 125 Tercapai!', description: 'Kekuatan Bertambah!', emoji: '⚡', condition: () => userData.level >= 125, reward: { xp: 125, coins: 60 } },
        { id: 'ach_level_175', name: 'Level 175 Tercapai!', description: 'Hampir Legendaris!', emoji: '🌠', condition: () => userData.level >= 175, reward: { xp: 175, coins: 80 } },
        { id: 'ach_xp_millionaire', name: 'Jutawan XP', description: 'Kumpulkan 1.000.000 total XP.', emoji: '📈', condition: () => userData.stats && userData.stats.totalXpEarned >= 1000000, reward: { coins: 200, itemId: 'xp_boost_large' } },
        
        { id: 'ach_quests_25_done', name: 'Quest Fanatik', description: 'Selesaikan 25 quest.', emoji: '🗺️', condition: () => userData.stats.totalQuestsCompleted >= 25, reward: { xp: 40, coins: 30 } },
        { id: 'ach_quests_75_done', name: 'Pemburu Quest Handal', description: 'Selesaikan 75 quest.', emoji: '🎯', condition: () => userData.stats.totalQuestsCompleted >= 75, reward: { xp: 75, coins: 75 } },
        { id: 'ach_quests_150_done', name: 'Master Quest', description: 'Selesaikan 150 quest.', emoji: '🎖️', condition: () => userData.stats.totalQuestsCompleted >= 150, reward: { xp: 150, coins: 150 } },
        { id: 'ach_quests_350_done', name: 'Grandmaster Quest', description: 'Selesaikan 350 quest.', emoji: '📜✨', condition: () => userData.stats.totalQuestsCompleted >= 350, reward: { xp: 350, coins: 350 } },
        { id: 'ach_daily_streak_3', name: 'Ritual Harian', description: 'Selesaikan semua quest harian 3 hari berturut-turut.', emoji: '🗓️🔥', condition: () => userData.stats && userData.stats.dailyQuestConsecutiveCompletion >= 3, reward: { coins: 75, itemId: 'loot_box_common' } },
        { id: 'ach_weekly_streak_2', name: 'Konsistensi Mingguan', description: 'Selesaikan semua quest mingguan 2 minggu berturut-turut.', emoji: '🗓️🗓️', condition: () => userData.stats && userData.stats.weeklyQuestConsecutiveCompletion >= 2, reward: { coins: 150, itemId: 'loot_box_rare' } },
        { id: 'ach_specific_quest_chain_done', name: 'Penyelidik Ulung', description: 'Selesaikan rantai quest "Misteri Kode Kuno".', emoji: '🔍📜', condition: () => userData.completedQuestChains && userData.completedQuestChains.includes('ancient_code_mystery'), reward: { xp: 200, itemId: 'decoder_ring_item' } },
        
        { id: 'ach_coin_collector_tier1', name: 'Dompet Mulai Terisi', description: 'Miliki 1.000 koin.', emoji: '🪙', condition: () => userData.coins >= 1000, reward: { xp: 20 } },
        { id: 'ach_coin_collector_tier2', name: 'Kantung Koin', description: 'Miliki 5.000 koin.', emoji: '💰', condition: () => userData.coins >= 5000, reward: { xp: 30 } },
        { id: 'ach_coin_collector_tier4', name: 'Brankas Digital', description: 'Miliki 50.000 koin.', emoji: '🤑', condition: () => userData.coins >= 50000, reward: { xp: 75, coins: 500 } },
        { id: 'ach_coin_spender_tier2', name: 'Pembelanja Aktif', description: 'Habiskan total 10.000 koin.', emoji: '🛒', condition: () => userData.stats.totalCoinsSpent >= 10000, reward: { xp: 50 } },
        { id: 'ach_coin_spender_tier3', name: 'Pelanggan Setia Toko', description: 'Habiskan total 100.000 koin.', emoji: '💳', condition: () => userData.stats.totalCoinsSpent >= 100000, reward: { xp: 150, itemId: 'permanent_shop_discount_1pc' } },
        { id: 'ach_item_seller_beginner', name: 'Pedagang Pemula', description: 'Dapatkan 1.000 koin dari menjual item.', emoji: '⚖️', condition: () => userData.stats && userData.stats.coinsEarnedFromSelling >= 1000, reward: { xp: 25, coins: 100 } },
        { id: 'ach_item_seller_advanced', name: 'Juragan Item', description: 'Dapatkan 25.000 koin dari menjual item.', emoji: '📈💰', condition: () => userData.stats && userData.stats.coinsEarnedFromSelling >= 25000, reward: { xp: 100, coins: 500 } },
        { id: 'ach_first_gem_purchase', name: 'Investasi Premium', description: 'Lakukan pembelian pertama menggunakan mata uang premium.', emoji: '💎✨', condition: () => userData.stats && userData.stats.premiumCurrencySpent > 0, reward: { xp: 100, itemId: 'exclusive_emote_01' } },
        
        { id: 'ach_item_collector_tier0_5', name: 'Kolektor Awal', description: 'Miliki 10 item berbeda.', emoji: '🧸', condition: () => userData.ownedItems && new Set(userData.ownedItems.map(item => item.id)).size >= 10, reward: { xp: 20, coins: 10 } },
        { id: 'ach_item_collector_tier1_5', name: 'Pengarsip Item', description: 'Miliki 50 item berbeda.', emoji: '📚', condition: () => userData.ownedItems && new Set(userData.ownedItems.map(item => item.id)).size >= 50, reward: { xp: 75, coins: 75 } },
        { id: 'ach_item_collector_epic', name: 'Kolektor Epik', description: 'Miliki 10 item epik atau lebih tinggi.', emoji: '💜✨', condition: () => userData.ownedItems && userData.ownedItems.filter(item => ['epic', 'legendary'].includes(item.rarity)).length >= 10, reward: { xp: 150, coins: 150 } },
        { id: 'ach_item_set_beginner', name: 'Koleksi Set Pemula', description: 'Kumpulkan set item "Cybernetic Starter".', emoji: '🦾', condition: () => ['starter_helm', 'starter_chest', 'starter_boots'].every(id => userData.ownedItems && userData.ownedItems.find(item => item.id === id)), reward: { xp: 50, itemId: 'set_bonus_charm_starter' } },
        { id: 'ach_item_upgrade_first', name: 'Modifikator Pertama', description: 'Upgrade item untuk pertama kali.', emoji: '🔧', condition: () => userData.stats && userData.stats.itemsUpgradedCount >= 1, reward: { xp: 20, coins: 10 } },
        { id: 'ach_item_upgrade_expert', name: 'Ahli Peningkatan', description: 'Upgrade item sebanyak 50 kali.', emoji: '🛠️✨', condition: () => userData.stats && userData.stats.itemsUpgradedCount >= 50, reward: { xp: 100, coins: 100 } },
        { id: 'ach_consumable_user', name: 'Pengguna Konsumabel', description: 'Gunakan 20 item konsumabel.', emoji: '🧪', condition: () => userData.stats && userData.stats.consumablesUsed >= 20, reward: { xp: 40, coins: 20 } },
        { id: 'ach_foodie', name: 'Pecinta Kuliner Digital', description: 'Konsumsi 10 jenis makanan/minuman berbeda.', emoji: '🍔🥤', condition: () => userData.stats && userData.stats.uniqueFoodConsumed >= 10, reward: { xp: 30, itemId: 'recipe_snack_boost' } },
        { id: 'ach_potion_master', name: 'Ahli Ramuan', description: 'Gunakan 50 ramuan (potion).', emoji: '⚗️', condition: () => userData.stats && userData.stats.potionsUsed >= 50, reward: { xp: 75, coins: 50 } },
        { id: 'ach_tool_user', name: 'Pengrajin Terampil', description: 'Gunakan 100 tool (misal: pickaxe, fishing rod).', emoji: '⛏️🎣', condition: () => userData.stats && userData.stats.toolsUsedCount >= 100, reward: { xp: 60, coins: 40 } },
        
        { id: 'ach_challenge_participant', name: 'Peserta Tantangan', description: 'Ikuti 5 tantangan (menang atau kalah).', emoji: '🚩', condition: () => userData.stats && userData.stats.challengesParticipated >= 5, reward: { xp: 30 } },
        { id: 'ach_challenge_winner_25', name: 'Juara Tantangan', description: 'Menangkan 25 tantangan.', emoji: '🏆✨', condition: () => userData.stats.challengesWon >= 25, reward: { xp: 150, coins: 150 } },
        { id: 'ach_challenge_perfect_streak_3', name: 'Tiga Kali Sempurna', description: 'Dapatkan skor sempurna di 3 tantangan berbeda.', emoji: '💯💯💯', condition: () => userData.stats && userData.stats.uniquePerfectScoreChallenges >= 3, reward: { xp: 100, coins: 100, itemId: 'perfect_score_aura' } },
        { id: 'ach_minigame_mastery_1', name: 'Jagoan Mini-game', description: 'Capai skor tinggi di mini-game "Hacker Dash".', emoji: '🎮💨', condition: () => userData.minigames && userData.minigames.hackerDash && userData.minigames.hackerDash.highScore >= 50000, reward: { coins: 75, itemId: 'minigame_token_hacker_dash' } },
        { id: 'ach_fishing_hobbyist', name: 'Pemancing Santai', description: 'Tangkap 50 ikan.', emoji: '🎣🐟', condition: () => userData.stats && userData.stats.fishCaught >= 50, reward: { xp: 40, coins: 20 } },
        { id: 'ach_mining_enthusiast', name: 'Penambang Gigih', description: 'Tambang 100 bijih.', emoji: '⛏️💎', condition: () => userData.stats && userData.stats.oresMined >= 100, reward: { xp: 40, coins: 20 } },
        { id: 'ach_explorer_zone_1', name: 'Penjelajah Neon Alley', description: 'Kunjungi semua landmark di Neon Alley.', emoji: '🏙️🚶', condition: () => userData.exploration && userData.exploration.neonAlleyCompleted, reward: { xp: 50, itemId: 'map_neon_alley_souvenir' } },
        { id: 'ach_puzzle_solver_10', name: 'Pemecah Teka-Teki', description: 'Selesaikan 10 puzzle.', emoji: '🧩💡', condition: () => userData.stats && userData.stats.puzzlesSolved >= 10, reward: { xp: 60, coins: 30 } },
        
        { id: 'ach_friend_adder', name: 'Sosialisator', description: 'Tambah 5 teman.', emoji: '👥', condition: () => userData.friends && userData.friends.length >= 5, reward: { xp: 25, coins: 10 } },
        { id: 'ach_guild_member', name: 'Anggota Gilda', description: 'Bergabung dengan sebuah gilda.', emoji: '🛡️🤝', condition: () => userData.guild && userData.guild.id !== null, reward: { xp: 50, itemId: 'guild_welcome_pack' } },
        { id: 'ach_profile_customizer', name: 'Ekspresi Diri', description: 'Kustomisasi profilmu dengan avatar dan banner.', emoji: '🖼️👤', condition: () => userData.profile && userData.profile.avatarSet && userData.profile.bannerSet, reward: { xp: 30, itemId: 'profile_frame_basic' } },
        { id: 'ach_emote_collector', name: 'Kolektor Emote', description: 'Miliki 10 emote berbeda.', emoji: '😀😂😍', condition: () => userData.ownedEmotes && userData.ownedEmotes.length >= 10, reward: { xp: 40, coins: 20 } },
        { id: 'ach_forum_poster', name: 'Penyumbang Suara', description: 'Buat 5 post di forum komunitas.', emoji: '💬🌐', condition: () => userData.stats && userData.stats.forumPosts >= 5, reward: { xp: 30, coins: 15 } },
        { id: 'ach_event_participant_tier1', name: 'Partisipan Event', description: 'Ikut serta dalam 1 event musiman/khusus.', emoji: '🎉', condition: () => userData.stats && userData.stats.eventsParticipated >= 1, reward: { xp: 50, itemId: 'event_token_participation' } },
        
        { id: 'ach_secret_finder_1', name: 'Pemburu Rahasia', description: 'Temukan 3 rahasia tersembunyi.', emoji: '🤫🗝️', condition: () => userData.secretsFound && userData.secretsFound.length >= 3, reward: { xp: 75, coins: 75 } },
        { id: 'ach_lore_reader', name: 'Pencinta Cerita', description: 'Baca 20 entri lore.', emoji: '📖👓', condition: () => userData.stats && userData.stats.loreEntriesRead >= 20, reward: { xp: 40, coins: 20 } },
        { id: 'ach_time_played_24h', name: 'Dedikasi Sehari Penuh', description: 'Total waktu bermain mencapai 24 jam.', emoji: '🕒⏳', condition: () => userData.stats && userData.stats.totalPlaytimeSeconds >= 86400, reward: { xp: 100, itemId: 'time_orb_small' } },
        { id: 'ach_failed_first_quest_epicly', name: 'Awal yang... Menarik', description: 'Gagal pada quest pertama dengan cara yang spektakuler.', emoji: '💥😂', condition: () => userData.stats && userData.stats.failedFirstQuestSpectacularly === true, reward: { xp: 10, title: 'Si Kurang Beruntung' } },
        { id: 'ach_tried_to_break_it', name: 'Penguji Batas', description: 'Mencoba melakukan aksi yang "tidak mungkin".', emoji: '🚫🖱️', condition: () => userData.stats && userData.stats.forbiddenActionAttempts >= 100, reward: { xp: 50, title: 'Penasaran Membawa Petaka' } },
        { id: 'ach_one_year_anniversary', name: 'Veteran Tahun Pertama', description: 'Bermain selama setidaknya satu tahun sejak rilis.', emoji: '🎂1️⃣', condition: () => userData.accountCreationDate && userData.stats && (Date.now() - new Date(userData.accountCreationDate).getTime()) >= 31536000000 && userData.stats.firstYearActive === true, reward: { coins: 500, itemId: 'anniversary_badge_year1', title: 'Penyintas Tahun Pertama' } },
        
        { id: 'ach_all_achievements', name: 'Sang Kolektor Ultimate', description: 'Dapatkan semua achievement lain (kecuali yang ini)!', emoji: '🌠', condition: () => {
            if (!userData.unlockedAchievements) return false
            const allOtherAchievementIds = achievementsData.filter(ach => ach.id !== 'ach_all_achievements').map(ach => ach.id)
            return allOtherAchievementIds.every(id => userData.unlockedAchievements.includes(id))
        }, reward: { xp: 1000, coins: 1000, itemId: 'badge_ultimate_collector_god_tier', title: 'Sang Kolektor' } }
]

    const skillsData = [
        { id: 'skill_xp_boost_1', name: 'XP Amplifier I', description: '+5% XP dari semua quest.', cost: 1, levelReq: 5, effect: { type: 'xp_bonus_percentage', value: 0.05 }, prerequisites: [] },
        { id: 'skill_coin_boost_1', name: 'Coin Magnet I', description: '+5% Koin dari semua quest.', cost: 1, levelReq: 5, effect: { type: 'coin_bonus_percentage', value: 0.05 }, prerequisites: [] },
        { id: 'skill_xp_boost_2', name: 'XP Amplifier II', description: '+10% XP dari semua quest (total).', cost: 2, levelReq: 15, effect: { type: 'xp_bonus_percentage', value: 0.10 }, prerequisites: ['skill_xp_boost_1'] },
        { id: 'skill_shop_discount_1', name: 'Diskon Toko I', description: 'Diskon 2% permanen di shop.', cost: 3, levelReq: 20, effect: { type: 'shop_discount_percentage', value: 0.02 }, prerequisites: ['skill_coin_boost_1'] }
    ]
    
    let sfxEnabled = true
    let bgmEnabled = true
    let notificationTimeout
    let selectedEmojiAvatar = null
    let activeEvent = null 

    function playSound(soundElement, volume = parseFloat(sfxVolumeSlider.value)) {
        if (sfxEnabled && soundElement) {
            soundElement.currentTime = 0
            soundElement.volume = volume
            soundElement.play().catch(e => console.warn("SFX play failed:", e.message))
        }
    }

    function toggleBgm() {
        bgmEnabled = !bgmEnabled
        if (bgmEnabled) {
            bgm.volume = parseFloat(bgmVolumeSlider.value)
            bgm.play().catch(e => console.warn("BGM play failed:", e.message))
            bgmToggleBtn.innerHTML = '🔊'
            showNotification("Musik Latar Aktif 🎶", "🎵", "info")
        } else {
            bgm.pause()
            bgmToggleBtn.innerHTML = '🔇'
            showNotification("Musik Latar Nonaktif 🔇", "🎵", "info")
        }
        saveSettings()
    }
    
    function updateBgmVolume() {
        if (bgm) bgm.volume = parseFloat(bgmVolumeSlider.value)
        if (bgmEnabled && bgm && bgm.paused) {
            bgm.play().catch(e => console.warn("BGM play failed on volume change:", e.message))
        }
        saveSettings()
    }

    function toggleSfx() {
        sfxEnabled = !sfxEnabled
        sfxToggleBtn.innerHTML = sfxEnabled ? '🔊' : '🔇'
        showNotification(`Efek Suara ${sfxEnabled ? 'Aktif' : 'Nonaktif'}`, sfxEnabled ? '🔊' : '🔇', "info")
        if (sfxEnabled) playSound(sfxClick)
        saveSettings()
    }
    
    function updateSfxVolume() {
        playSound(sfxClick, parseFloat(sfxVolumeSlider.value))
        saveSettings()
    }

    function saveData() {
        try {
            localStorage.setItem('adiQuestUserData', JSON.stringify(userData))
            const shopState = shopItemsData.map(item => ({ id: item.id, stock: item.stock }))
            localStorage.setItem('adiQuestShopState', JSON.stringify(shopState))
        } catch (e) {
            console.error("Error saving data to localStorage:", e)
            showNotification("Gagal menyimpan data! Penyimpanan mungkin penuh.", "💾", "error")
        }
    }
    
    function saveSettings() {
        try {
            localStorage.setItem('adiQuestSettings', JSON.stringify({
                sfx: sfxEnabled,
                bgm: bgmEnabled,
                sfxVol: parseFloat(sfxVolumeSlider.value),
                bgmVol: parseFloat(bgmVolumeSlider.value),
                theme: userData.currentTheme,
                lightMode: document.body.classList.contains('light-mode')
            }))
        } catch (e) {
            console.error("Error saving settings to localStorage:", e)
        }
    }

    function loadData() {
        const savedUserData = localStorage.getItem('adiQuestUserData')
        if (savedUserData) {
            try {
                const parsedData = JSON.parse(savedUserData)
                userData.name = parsedData.name || ''
                userData.avatar = parsedData.avatar || AVATAR_EMOJIS[0]
                userData.level = parseInt(parsedData.level) || 1
                userData.xp = parseInt(parsedData.xp) || 0
                userData.xpToNextLevel = parseInt(parsedData.xpToNextLevel) || calculateXpToNextLevel(userData.level)
                userData.totalXpCollected = parseInt(parsedData.totalXpCollected) || 0
                userData.coins = parseInt(parsedData.coins) || 0
                userData.ownedItems = Array.isArray(parsedData.ownedItems) ? parsedData.ownedItems : []
                userData.quests = Array.isArray(parsedData.quests) ? parsedData.quests : []
                userData.completedPeriodicQuests = parsedData.completedPeriodicQuests || {} 
                userData.currentTheme = parsedData.currentTheme || THEMES[0].class
                userData.skillPoints = parseInt(parsedData.skillPoints) || 0
                userData.unlockedSkills = Array.isArray(parsedData.unlockedSkills) ? parsedData.unlockedSkills : []
                userData.unlockedAchievements = Array.isArray(parsedData.unlockedAchievements) ? parsedData.unlockedAchievements : []
                userData.stats = parsedData.stats || { totalQuestsCompleted: 0, itemsCrafted: 0 }
            } catch (e) {
                console.error("Error parsing user data from localStorage:", e)
            }
        }

        const savedShopState = localStorage.getItem('adiQuestShopState')
        if (savedShopState) {
            try {
                const shopState = JSON.parse(savedShopState)
                shopState.forEach(stateItem => {
                    const shopItem = shopItemsData.find(item => item.id === stateItem.id)
                    if (shopItem) {
                        shopItem.stock = parseInt(stateItem.stock)
                    }
                })
            } catch (e) { console.error("Error parsing shop state:", e) }
        }
        
        const savedSettings = localStorage.getItem('adiQuestSettings')
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings)
                sfxEnabled = typeof settings.sfx === 'boolean' ? settings.sfx : true
                bgmEnabled = typeof settings.bgm === 'boolean' ? settings.bgm : true
                sfxVolumeSlider.value = parseFloat(settings.sfxVol) || 0.5
                bgmVolumeSlider.value = parseFloat(settings.bgmVol) || 0.3
                
                if (settings.lightMode) { 
                    document.body.classList.remove('dark-mode')
                    document.body.classList.add('light-mode')
                } else {
                    document.body.classList.add('dark-mode')
                    document.body.classList.remove('light-mode')
                }
                sfxToggleBtn.innerHTML = sfxEnabled ? '🔊' : '🔇'
                bgmToggleBtn.innerHTML = bgmEnabled ? '🔊' : '🔇'
                applyTheme(settings.theme || THEMES[0].class)
            } catch (e) { console.error("Error parsing settings:", e) }
        } else {
            applyTheme(userData.currentTheme) 
        }

        if (bgmEnabled) {
            bgm.volume = parseFloat(bgmVolumeSlider.value)
            bgm.play().catch(e => console.warn("BGM autoplay prevented on load:", e.message))
        }
    }
    
    function resetGameData() {
        playSound(sfxClick)
        if (confirm("⚠️ Apakah Anda yakin ingin mereset SEMUA data game? Tindakan ini tidak dapat diurungkan!")) {
            localStorage.removeItem('adiQuestUserData')
            localStorage.removeItem('adiQuestShopState')
            
            userData = {
                name: '', avatar: AVATAR_EMOJIS[0], level: 1, xp: 0,
                xpToNextLevel: XP_PER_LEVEL_BASE, totalXpCollected: 0, coins: 0,
                ownedItems: [], quests: [], completedPeriodicQuests: {}, currentTheme: THEMES[0].class,
                skillPoints: 0, unlockedSkills: [], unlockedAchievements: [], stats: { totalQuestsCompleted: 0, itemsCrafted: 0 }
            }
            shopItemsData.forEach(item => item.stock = item.initialStock)
            applyTheme(THEMES[0].class) 

            showNotification("Data Game Telah Direset! 🔄", "🗑️", "info")
            setTimeout(() => window.location.reload(), 1500)
        }
    }

    function getUserTitle(level) {
        let currentTitle = ""
        for (let i = USER_TITLES.length - 1; i >= 0; i--) {
            if (level >= USER_TITLES[i].level) {
                currentTitle = USER_TITLES[i].title
                break
            }
        }
        return currentTitle
    }

    function displayAvatar(element, avatarData) {
        if (element) {
            element.textContent = avatarData || AVATAR_EMOJIS[0]
        }
    }

    function updateDashboardUI() {
        displayAvatar(userAvatarSidebar, userData.avatar)
        userNameSidebar.textContent = userData.name.substring(0,15) + (userData.name.length > 15 ? '...' : '')
        const title = getUserTitle(userData.level)
        if(userTitleSidebar) userTitleSidebar.textContent = title
        if(welcomeUsername) welcomeUsername.textContent = userData.name || "Petualang"
        if(userLevelDisplay) userLevelDisplay.textContent = userData.level
        if(userTitleDashboard) userTitleDashboard.textContent = title ? `(${title})` : ''
        if(userXpProgress) userXpProgress.value = userData.xp
        if(userXpProgress) userXpProgress.max = userData.xpToNextLevel
        if(userXpText) userXpText.textContent = `${userData.xp}/${userData.xpToNextLevel}`
        if(userCoinsDisplay) userCoinsDisplay.textContent = userData.coins

        const activeUserQuestsCount = userData.quests.filter(q => !q.completed && !q.isPeriodic).length
        if(activeQuestsSummary) activeQuestsSummary.textContent = activeUserQuestsCount > 0 ? `Kamu memiliki ${activeUserQuestsCount} quest pribadi aktif!` : "Tidak ada quest pribadi aktif."
        
        const uncompletedPeriodic = getUncompletedPeriodicQuestCount()
        if(periodicQuestsSummary) periodicQuestsSummary.innerHTML = `<p>${uncompletedPeriodic > 0 ? `${uncompletedPeriodic} quest periodik menunggu!` : 'Semua quest periodik selesai untuk saat ini.'}</p>`

        const latestAch = userData.unlockedAchievements.length > 0 ? achievementsData.find(a => a.id === userData.unlockedAchievements[userData.unlockedAchievements.length - 1]) : null
        if(latestAchievementSummary) latestAchievementSummary.textContent = latestAch ? `Terbaru: ${latestAch.emoji} ${latestAch.name}` : "Belum ada achievement diraih."

        if(currentEventSummary) currentEventSummary.textContent = activeEvent ? `Sedang Berlangsung: ${activeEvent.title}` : "Tidak ada event aktif saat ini."

    }

    function updateProfileUI() {
        displayAvatar(profileAvatarMain, userData.avatar)
        if(profileNameMain) profileNameMain.textContent = userData.name
        const title = getUserTitle(userData.level)
        if(userTitleProfile) userTitleProfile.textContent = title
        if(profileLevelMain) profileLevelMain.textContent = userData.level
        if(profileXpTotal) profileXpTotal.textContent = userData.totalXpCollected
        if(profileCoinsMain) profileCoinsMain.textContent = userData.coins
        if(totalQuestsCompletedStat) totalQuestsCompletedStat.textContent = userData.stats.totalQuestsCompleted
        if(achievementsUnlockedStat) achievementsUnlockedStat.textContent = userData.unlockedAchievements.length
        if(totalAchievementsStat) totalAchievementsStat.textContent = achievementsData.length


        if(ownedItemsList) ownedItemsList.innerHTML = ''
        if (userData.ownedItems.length > 0) {
            userData.ownedItems.forEach(itemId => {
                const item = shopItemsData.find(i => i.id === itemId)
                if (item) {
                    const li = document.createElement('li')
                    li.innerHTML = `${item.emoji} <strong>${item.name}</strong> <span class="item-category-tag">(${item.category})</span>`
                    ownedItemsList.appendChild(li)
                }
            })
        } else {
            if(ownedItemsList) ownedItemsList.innerHTML = '<li>Belum ada item yang dimiliki. Kunjungi Shop! 🛒</li>'
        }
    }

    function showNotification(message, emoji = '✅', type = 'success', duration = 3500) {
        clearTimeout(notificationTimeout)
        
        notificationEmoji.textContent = emoji
        notificationMessage.textContent = message
        
        notificationPopup.classList.remove('success', 'error', 'info', 'purchase', 'levelup', 'show')
        
        notificationPopup.classList.add(type)
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                notificationPopup.classList.add('show')
            })
        })

        if (type === 'error') {
            playSound(sfxWarp, 0.5)
        } else if (type === 'purchase' || type === 'levelup' || type === 'achievement') {
        } else {
            playSound(sfxClick)
        }

        notificationTimeout = setTimeout(() => {
            notificationPopup.classList.remove('show')
        }, duration)
    }
    
    function triggerConfetti() {
        const confettiCount = 50
        const mainContentArea = document.getElementById('main-content')
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div')
            confetti.classList.add('confetti-piece')
            confetti.style.left = Math.random() * 100 + 'vw'
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's'
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`
            confetti.style.setProperty('--random-x', (Math.random() - 0.5) * 2)
            if(mainContentArea) mainContentArea.appendChild(confetti)
            setTimeout(() => confetti.remove(), 3000)
        }
    }

    function switchSection(targetId) {
        playSound(sfxClick)
        contentSections.forEach(section => {
            section.classList.remove('active')
            setTimeout(() => { if (!section.classList.contains('active')) section.classList.add('hidden') }, 300)
        })
        navLinks.forEach(link => link.classList.remove('active'))

        const targetSection = document.getElementById(targetId)
        const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`)

        if (targetSection) {
            targetSection.classList.remove('hidden')
            setTimeout(() => {
                targetSection.classList.add('active')
                if(mainContent) mainContent.scrollTop = 0
            }, 50)
        }
        if (targetLink) targetLink.classList.add('active')

        if (targetId === 'profile-section') updateProfileUI()
        if (targetId === 'shop-section') renderShopItems(document.querySelector('.filter-btn.active')?.dataset.filter || 'all')
        if (targetId === 'quest-section') {
            checkAndResetPeriodicQuests() 
            renderTemplateQuestButtons()
            checkActiveEvent() 
        }
        if (targetId === 'achievements-section') renderAchievements()
        if (targetId === 'skills-section') renderSkillTree()
        if (targetId === 'event-section') renderEventDetails()

    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            switchSection(link.dataset.target)
        })
        link.addEventListener('mouseenter', () => playSound(sfxHover, 0.2))
    })
    
    document.querySelectorAll('button[data-navigate]').forEach(button => {
        button.addEventListener('click', () => {
            switchSection(button.dataset.navigate)
        })
    })

    if(registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const name = usernameInput.value.trim()
            if (!name) {
                showNotification("Nama tidak boleh kosong! 📛", "🏷️", "error")
                return
            }
            userData.name = name

            if (!selectedEmojiAvatar) {
                selectedEmojiAvatar = AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)]
            }
            userData.avatar = selectedEmojiAvatar
            
            saveData()
            playSound(sfxWarp, 0.8)

            landingPage.style.transition = 'opacity var(--transition-speed-slow) ease-out, transform var(--transition-speed-slow) ease-out'
            landingPage.style.opacity = '0'
            landingPage.style.transform = 'scale(0.7) rotateZ(10deg)'

            setTimeout(() => {
                landingPage.classList.add('hidden')
                landingPage.classList.remove('active')
                
                if(appContainer) appContainer.classList.remove('hidden')
                if(appContainer) appContainer.classList.add('warp-in-effect')
                
                checkAndResetPeriodicQuests()
                updateAllUI()
                checkAllAchievements()
                switchSection('dashboard-section')
            }, 500)
        })
    }

    function calculateXpToNextLevel(level) {
        return XP_PER_LEVEL_BASE + (level - 1) * XP_PER_LEVEL_INCREMENT
    }

    function applyTheme(themeClass) {
        THEMES.forEach(t => document.body.classList.remove(t.class))
        document.body.classList.add(themeClass)
        userData.currentTheme = themeClass
        const themeMeta = document.querySelector('meta[name="theme-color"]')
        if(themeMeta) {
            setTimeout(() => { 
                const rootStyle = getComputedStyle(document.documentElement)
                const primaryNeon = rootStyle.getPropertyValue('--primary-neon').trim()
                if(primaryNeon) themeMeta.setAttribute('content', primaryNeon)
            }, 100)
        }
        if (colorSchemeSelector) {
            colorSchemeSelector.value = themeClass
        }
        saveSettings()
    }

    function checkAndChangeTheme(level) {
        const themeIndex = Math.floor((level -1) / THEME_CHANGE_LEVEL_INTERVAL) % THEMES.length
        const newThemeClass = THEMES[themeIndex].class
        if (newThemeClass !== userData.currentTheme ) {
            applyTheme(newThemeClass)
            showNotification(`Warna tema berubah! Selamat menikmati suasana ${THEMES[themeIndex].name}! 🎨`, '✨', 'info')
            saveData() 
        }
    }

    function addXp(amount, questId = null) {
        let xpBonus = 1
        if(userData.unlockedSkills.includes('skill_xp_boost_1') && !userData.unlockedSkills.includes('skill_xp_boost_2')) xpBonus = 1.05
        if(userData.unlockedSkills.includes('skill_xp_boost_2')) xpBonus = 1.10
        const finalXp = Math.round(amount * xpBonus)

        userData.xp += finalXp
        userData.totalXpCollected += finalXp
        let leveledUp = false
        const oldLevel = userData.level
        
        while (userData.xp >= userData.xpToNextLevel) {
            leveledUp = true
            userData.xp -= userData.xpToNextLevel
            userData.level++
            userData.xpToNextLevel = calculateXpToNextLevel(userData.level)
            if(userData.level % SKILL_POINT_LEVEL_INTERVAL === 0) {
                userData.skillPoints++
                showNotification(`Kamu mendapatkan 1 Skill Point! ✨ Total: ${userData.skillPoints}`, '🧠', 'info')
            }
        }
        if (leveledUp) {
            showNotification(`🎉 LEVEL UP! Kamu mencapai Level ${userData.level}!`, '🌟', 'levelup')
            playSound(sfxLevelUp)
            triggerConfetti()
            checkAndChangeTheme(userData.level)
        }

        const quest = userData.quests.find(q => q.id === questId)
        if (quest) {
            quest.completed = true 
            userData.stats.totalQuestsCompleted = (userData.stats.totalQuestsCompleted || 0) + 1
            if (quest.isPeriodic) {
                userData.completedPeriodicQuests[quest.id] = true 
            }
        }

        updateDashboardUI()
        if (document.getElementById('profile-section')?.classList.contains('active')) updateProfileUI()
        renderAllQuests() 
        checkAllAchievements()
        saveData()
    }
    
    function addCoins(amount) {
        let coinBonus = 1
        if(userData.unlockedSkills.includes('skill_coin_boost_1')) coinBonus = 1.05
        const finalCoins = Math.round(amount * coinBonus)
        userData.coins += finalCoins
        updateDashboardUI()
        if (document.getElementById('profile-section')?.classList.contains('active')) updateProfileUI()
        saveData()
    }

    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
        return weekNo
    }
    
    function generatePeriodicQuestId(idBase, periodType) {
        const today = new Date()
        if (periodType === 'daily') {
            return `periodic_${idBase}_${today.toISOString().split('T')[0]}`
        } else if (periodType === 'weekly') {
            return `periodic_${idBase}_${today.getFullYear()}-W${getWeekNumber(today)}`
        } else if (periodType === 'monthly') {
            return `periodic_${idBase}_${today.getFullYear()}-${today.getMonth() + 1}`
        }
        return `periodic_${idBase}_unknown`
    }
    
    function checkAndResetPeriodicQuests() {
        const today = new Date()
        const todayDateString = today.toISOString().split('T')[0]
        const currentWeekIdPart = `${today.getFullYear()}-W${getWeekNumber(today)}`
        const currentMonthIdPart = `${today.getFullYear()}-${today.getMonth() + 1}`
    
        let questsRefreshed = false
    
        userData.quests = userData.quests.filter(q => {
            if (!q.isPeriodic) return true
    
            const questDatePart = q.id.substring(q.id.lastIndexOf('_') + 1)
            let shouldKeep = false
    
            if (q.period === 'daily' && questDatePart === todayDateString) {
                shouldKeep = true
            } else if (q.period === 'weekly' && questDatePart === currentWeekIdPart) {
                shouldKeep = true
            } else if (q.period === 'monthly' && questDatePart === currentMonthIdPart) {
                shouldKeep = true
            }
            
            if (!shouldKeep) {
                questsRefreshed = true
            }
            return shouldKeep
        })
    
        periodicQuestTemplates.daily.forEach(template => {
            const questId = generatePeriodicQuestId(template.idBase, 'daily')
            if (!userData.quests.find(q => q.id === questId)) {
                userData.quests.unshift({ ...template, id: questId, completed: !!userData.completedPeriodicQuests[questId], isPeriodic: true, period: 'daily' })
                questsRefreshed = true
            }
        })
    
        periodicQuestTemplates.weekly.forEach(template => {
            const questId = generatePeriodicQuestId(template.idBase, 'weekly')
            if (!userData.quests.find(q => q.id === questId)) {
                userData.quests.unshift({ ...template, id: questId, completed: !!userData.completedPeriodicQuests[questId], isPeriodic: true, period: 'weekly' })
                questsRefreshed = true
            }
        })
    
        periodicQuestTemplates.monthly.forEach(template => {
            const questId = generatePeriodicQuestId(template.idBase, 'monthly')
            if (!userData.quests.find(q => q.id === questId)) {
                userData.quests.unshift({ ...template, id: questId, completed: !!userData.completedPeriodicQuests[questId], isPeriodic: true, period: 'monthly' })
                questsRefreshed = true
            }
        })
        
        const activePeriodicQuestIds = userData.quests.filter(q => q.isPeriodic).map(q => q.id)
        Object.keys(userData.completedPeriodicQuests).forEach(completedId => {
            if (!activePeriodicQuestIds.includes(completedId)) {
                delete userData.completedPeriodicQuests[completedId]
            }
        })
    
        if (questsRefreshed) {
            console.log("Periodic quests have been refreshed/generated.")
            saveData()
        }
        renderAllQuests()
    }


    function renderQuestItem(quest, container) {
        if (!container) return
        const questDiv = document.createElement('div')
        questDiv.classList.add('quest-item', 'card')
        if (quest.completed) questDiv.classList.add('completed')
        if (quest.isPeriodic) questDiv.classList.add('periodic')
        
        questDiv.innerHTML = `
            <h3>${quest.title} ${quest.period ? `(${quest.period.charAt(0).toUpperCase() + quest.period.slice(1)})` : ''}</h3>
            ${quest.description ? `<p class="quest-description">${quest.description}</p>` : ''}
            <p class="quest-rewards"><strong>Reward:</strong> ${quest.xp} XP, ${quest.coins} 💰</p>
            <div class="quest-actions">
                ${!quest.completed ? `<button class="neon-button small complete-quest-btn" data-id="${quest.id}">Selesaikan ✅</button>` : '<span class="completed-tag">Telah Selesai</span>'}
                ${!quest.isPeriodic && !quest.isEventQuest ? `<button class="danger-button small delete-quest-btn" data-id="${quest.id}">Hapus 🗑️</button>` : ''}
            </div>
        `
        container.appendChild(questDiv)
    }

    function renderAllQuests() {
        if(dailyQuestListDiv) dailyQuestListDiv.innerHTML = '<h4>☀️ Harian</h4>'
        if(weeklyQuestListDiv) weeklyQuestListDiv.innerHTML = '<h4>🗓️ Mingguan</h4>'
        if(monthlyQuestListDiv) monthlyQuestListDiv.innerHTML = '<h4>🌙 Bulanan</h4>'
        if(userQuestListContainer) userQuestListContainer.innerHTML = ''
        if(activeEventQuestListDiv) activeEventQuestListDiv.innerHTML = ''


        let dailyCount = 0, weeklyCount = 0, monthlyCount = 0, userCount = 0, eventCount = 0

        const sortedQuests = [...userData.quests].sort((a,b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1)
                                                .sort((a,b) => (a.isPeriodic === b.isPeriodic) ? 0 : a.isPeriodic ? -1 : 1)
                                                .sort((a,b) => (a.isEventQuest === b.isEventQuest) ? 0 : a.isEventQuest ? -1 : 1)


        sortedQuests.forEach(quest => {
            if (quest.isEventQuest && activeEventQuestListDiv) {
                renderQuestItem(quest, activeEventQuestListDiv)
                eventCount++
            } else if (quest.isPeriodic) {
                if (quest.period === 'daily' && dailyQuestListDiv) {
                    renderQuestItem(quest, dailyQuestListDiv)
                    dailyCount++
                } else if (quest.period === 'weekly' && weeklyQuestListDiv) {
                    renderQuestItem(quest, weeklyQuestListDiv)
                    weeklyCount++
                } else if (quest.period === 'monthly' && monthlyQuestListDiv) {
                    renderQuestItem(quest, monthlyQuestListDiv)
                    monthlyCount++
                }
            } else if (userQuestListContainer) {
                renderQuestItem(quest, userQuestListContainer)
                userCount++
            }
        })

        if(dailyCount === 0 && dailyQuestListDiv) dailyQuestListDiv.innerHTML += '<p class="empty-state">Tidak ada quest harian.</p>'
        if(weeklyCount === 0 && weeklyQuestListDiv) weeklyQuestListDiv.innerHTML += '<p class="empty-state">Tidak ada quest mingguan.</p>'
        if(monthlyCount === 0 && monthlyQuestListDiv) monthlyQuestListDiv.innerHTML += '<p class="empty-state">Tidak ada quest bulanan.</p>'
        if(eventCount === 0 && activeEventQuestListDiv && activeEvent) activeEventQuestListDiv.innerHTML = '<p class="empty-state">Tidak ada quest untuk event ini.</p>'
        if(userCount === 0 && userQuestListContainer) userQuestListContainer.innerHTML = '<p class="empty-state">🏜️ Belum ada quest pribadi. Tambahkan di atas atau dari template!</p>'

        addQuestEventListeners()
        updateDashboardUI()
    }
    
    function getUncompletedPeriodicQuestCount() {
        let count = 0
        userData.quests.forEach(q => {
            if(q.isPeriodic && !q.completed) count++
        })
        return count
    }

    function renderTemplateQuestButtons() {
        if (!templateQuestButtonsDiv) return
        templateQuestButtonsDiv.innerHTML = ''
        userQuestTemplates.forEach(template => {
            const button = document.createElement('button')
            button.classList.add('neon-button', 'small', 'template-quest-btn')
            button.textContent = template.title
            button.addEventListener('click', () => {
                playSound(sfxClick)
                const minXp = 20
                const maxXp = 100 
                const randomXp = Math.floor(Math.random() * (maxXp - minXp + 1)) + minXp
                const minCoins = 5
                const maxCoins = 30
                const randomCoins = Math.floor(Math.random() * (maxCoins - minCoins + 1)) + minCoins

                const newQuest = {
                    id: 'quest_' + Date.now() + Math.random().toString(16).slice(2),
                    title: template.title,
                    description: template.description || '',
                    xp: randomXp,
                    coins: randomCoins,
                    completed: false,
                    isPeriodic: false,
                    isEventQuest: false
                }
                userData.quests.unshift(newQuest)
                renderAllQuests()
                saveData()
                showNotification(`Quest "${template.title}" ditambahkan dari template!`, '💡', 'success')
            })
            templateQuestButtonsDiv.appendChild(button)
        })
    }

    function addQuestEventListeners() {
        document.querySelectorAll('.complete-quest-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                playSound(sfxClick)
                const questId = e.currentTarget.dataset.id
                const quest = userData.quests.find(q => q.id === questId)

                if (quest && !quest.completed) {
                    addXp(quest.xp, quest.id) 
                    addCoins(quest.coins)
                    showNotification(`Quest "${quest.title}" selesai! +${quest.xp} XP, +${quest.coins} 💰`, '🎉', 'success')
                    playSound(sfxQuestComplete)
                    
                    if (!quest.isPeriodic && !quest.isEventQuest && userData.level > (userData.level -1) && quest.xp > 0) { 
                        triggerConfetti()
                    }
                }
            })
        })
        document.querySelectorAll('.delete-quest-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                playSound(sfxClick)
                const questId = e.currentTarget.dataset.id
                const questIndex = userData.quests.findIndex(q => q.id === questId && !q.isPeriodic && !q.isEventQuest) 
                if (questIndex > -1) {
                    if (confirm("Yakin ingin menghapus quest pribadi ini?")) {
                        userData.quests.splice(questIndex, 1)
                        showNotification("Quest pribadi dihapus.", "🗑️", "info")
                        renderAllQuests()
                        saveData()
                    }
                }
            })
        })
    }

    if(addQuestForm) {
        addQuestForm.addEventListener('submit', (e) => {
            e.preventDefault()
            playSound(sfxClick)
            const title = questTitleInput.value.trim()
            const description = questDescInput.value.trim()

            const minXp = 25
            const maxXp = 150
            const randomXp = Math.floor(Math.random() * (maxXp - minXp + 1)) + minXp

            const minCoins = 10
            const maxCoins = 50
            const randomCoins = Math.floor(Math.random() * (maxCoins - minCoins + 1)) + minCoins
            
            if (title) {
                const newQuest = {
                    id: 'quest_' + Date.now() + Math.random().toString(16).slice(2),
                    title,
                    description,
                    xp: randomXp,
                    coins: randomCoins,
                    completed: false,
                    isPeriodic: false,
                    isEventQuest: false
                }
                userData.quests.unshift(newQuest)
                renderAllQuests()
                saveData()
                addQuestForm.reset()
                if(questTitleInput) questTitleInput.focus()
                showNotification(`Quest "${title}" ditambahkan dengan reward acak! 🎲`, "📝", "success")
            } else {
                showNotification("Judul quest wajib diisi!", "⚠️", "error")
            }
        })
    }


    function renderShopItems(filter = 'all') {
        if(!shopItemsGrid) return
        shopItemsGrid.innerHTML = ''
        let currentShopItems = [...shopItemsData]
        if(activeEvent && activeEvent.shopItems) {
            currentShopItems = [...currentShopItems, ...activeEvent.shopItems]
        }
        if(limitedTimeShopItemsDiv && limitedItemsGridDiv) {
            const limitedTimeItems = currentShopItems.filter(item => item.isLimitedTime)
            if(limitedTimeItems.length > 0) {
                limitedTimeShopItemsDiv.classList.remove('hidden')
                limitedItemsGridDiv.innerHTML = ''
                limitedTimeItems.forEach(item => renderShopItemDOM(item, limitedItemsGridDiv))
            } else {
                limitedTimeShopItemsDiv.classList.add('hidden')
            }
        }


        const regularItems = currentShopItems.filter(item => !item.isLimitedTime && (filter === 'all' || item.category === filter))

        if (regularItems.length === 0 && filter !== 'all') {
            shopItemsGrid.innerHTML = `<p class="empty-state">🚫 Tidak ada item dalam kategori '${filter}'.</p>`
        } else if (regularItems.length === 0 && filter === 'all' && (!limitedTimeShopItemsDiv || limitedTimeShopItemsDiv.classList.contains('hidden')) ) {
            shopItemsGrid.innerHTML = `<p class="empty-state">🚫 Toko sedang kosong.</p>`
        } else {
            regularItems.forEach(item => renderShopItemDOM(item, shopItemsGrid))
        }
        addShopEventListeners()
    }

    function renderShopItemDOM(item, container) {
        const itemDiv = document.createElement('div')
        itemDiv.classList.add('shop-item', 'card')
        if(item.isLimitedTime) itemDiv.classList.add('limited-time')
        itemDiv.dataset.itemId = item.id
        
        const isOwned = userData.ownedItems.includes(item.id)
        const isSoldOut = item.stock <= 0

        if (isSoldOut && !isOwned) itemDiv.classList.add('sold-out')
        if (isOwned) itemDiv.classList.add('owned')

        itemDiv.innerHTML = `
            <div class="item-emoji-display">${item.emoji || '❓'}</div>
            <h4>${item.name} ${item.isLimitedTime ? '⏳' : ''}</h4>
            <p class="item-description">${item.description || 'Deskripsi item...'}</p>
            <p class="item-price">Harga: ${item.price} 💰</p>
            <p class="item-stock">Stok: ${isSoldOut && !isOwned ? 'Habis' : (isOwned ? 'Dimiliki' : (item.stock > 99 ? '99+' : item.stock) )}</p>
            <button class="neon-button small buy-item-btn" data-id="${item.id}" ${isSoldOut || isOwned ? 'disabled' : ''}>
                ${isOwned ? 'Dimiliki ✔️' : (isSoldOut ? 'Stok Habis' : 'Beli')}
            </button>
        `
        container.appendChild(itemDiv)
    }
    
    shopFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound(sfxClick)
            shopFilterBtns.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            renderShopItems(btn.dataset.filter)
        })
    })

    function addShopEventListeners() {
        document.querySelectorAll('.buy-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                playSound(sfxClick)
                const itemId = e.currentTarget.dataset.id
                let allShopItems = [...shopItemsData]
                if(activeEvent && activeEvent.shopItems) allShopItems = [...allShopItems, ...activeEvent.shopItems]
                const item = allShopItems.find(i => i.id === itemId)


                if (!item) return

                if (userData.ownedItems.includes(item.id)) {
                    showNotification("Kamu sudah memiliki item ini!", "ℹ️", "info")
                    return
                }
                if (item.stock <= 0) {
                    showNotification("Maaf, item ini sudah habis stok!", "😔", "error")
                    return
                }
                
                let finalPrice = item.price
                if(userData.unlockedSkills.includes('skill_shop_discount_1')) finalPrice = Math.round(finalPrice * 0.98)

                if (userData.coins < finalPrice) {
                    showNotification(`Koinmu tidak cukup! Butuh ${finalPrice} 💰.`, "💰❌", "error") 
                    return
                }
                
                userData.coins -= finalPrice
                item.stock--
                userData.ownedItems.push(item.id)
                
                showNotification(`Kamu berhasil membeli ${item.name}! 🎁 (-${finalPrice}💰)`, '🛍️', 'purchase')
                playSound(sfxPurchase)
                triggerConfetti()
                checkAllAchievements()

                updateDashboardUI()
                if (document.getElementById('profile-section')?.classList.contains('active')) updateProfileUI()
                renderShopItems(document.querySelector('.filter-btn.active')?.dataset.filter || 'all')
                saveData()
            })
        })
    }

    function renderAchievements() {
        if(!achievementsGridDiv) return
        achievementsGridDiv.innerHTML = ''
        achievementsData.forEach(ach => {
            const isUnlocked = userData.unlockedAchievements.includes(ach.id)
            const achDiv = document.createElement('div')
            achDiv.classList.add('achievement-item', 'card', isUnlocked ? 'unlocked' : 'locked')
            achDiv.innerHTML = `
                <div class="achievement-emoji">${isUnlocked ? ach.emoji : '❓'}</div>
                <h4>${ach.name}</h4>
                <p>${isUnlocked ? ach.description : 'Terkunci - Selesaikan syaratnya!'}</p>
                ${isUnlocked ? '<span class="completed-tag">Diraih!</span>' : ''}
            `
            achievementsGridDiv.appendChild(achDiv)
        })
    }
    
    function checkAllAchievements() {
        let newAchievementUnlocked = false
        achievementsData.forEach(ach => {
            if (!userData.unlockedAchievements.includes(ach.id) && ach.condition()) {
                userData.unlockedAchievements.push(ach.id)
                showNotification(`Achievement Diraih: ${ach.emoji} ${ach.name}!`, '🏆', 'achievement')
                playSound(sfxAchievement)
                if (ach.reward) {
                    if (ach.reward.xp) addXp(ach.reward.xp)
                    if (ach.reward.coins) addCoins(ach.reward.coins)
                    if (ach.reward.itemId) {
                        const item = shopItemsData.find(i => i.id === ach.reward.itemId) || (activeEvent && activeEvent.shopItems ? activeEvent.shopItems.find(i => i.id === ach.reward.itemId) : null)
                        if (item && !userData.ownedItems.includes(item.id)) {
                            userData.ownedItems.push(item.id)
                            showNotification(`Kamu mendapatkan item: ${item.name}!`, '🎁', 'info')
                        }
                    }
                }
                newAchievementUnlocked = true
            }
        })
        if (newAchievementUnlocked) {
            if (document.getElementById('achievements-section')?.classList.contains('active')) renderAchievements()
            if (document.getElementById('profile-section')?.classList.contains('active')) updateProfileUI()
            updateDashboardUI() 
            saveData()
        }
    }

    function renderSkillTree() {
        if(!skillTreeGridDiv || !skillPointsAvailableSpan) return
        skillTreeGridDiv.innerHTML = ''
        skillPointsAvailableSpan.textContent = userData.skillPoints

        skillsData.forEach(skill => {
            const isUnlocked = userData.unlockedSkills.includes(skill.id)
            const canUnlock = userData.skillPoints >= skill.cost && userData.level >= skill.levelReq &&
                            (skill.prerequisites.length === 0 || skill.prerequisites.every(pr => userData.unlockedSkills.includes(pr)))
            
            const skillDiv = document.createElement('div')
            skillDiv.classList.add('skill-item', 'card', isUnlocked ? 'unlocked' : (canUnlock ? 'available' : 'locked'))
            skillDiv.innerHTML = `
                <div class="skill-emoji">${isUnlocked ? '💡' : '🧠'}</div>
                <h4>${skill.name}</h4>
                <p>${skill.description}</p>
                <p>Level Syarat: ${skill.levelReq} | Biaya: ${skill.cost} SP</p>
                ${isUnlocked ? '<span class="completed-tag">Dikuasai!</span>' : 
                    (canUnlock ? `<button class="neon-button small unlock-skill-btn" data-id="${skill.id}">Unlock (${skill.cost} SP)</button>` : '<span class="locked-tag">Terkunci</span>')}
            `
            skillTreeGridDiv.appendChild(skillDiv)
        })
        addSkillEventListeners()
    }

    function addSkillEventListeners() {
        document.querySelectorAll('.unlock-skill-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const skillId = e.currentTarget.dataset.id
                const skill = skillsData.find(s => s.id === skillId)
                if (skill && userData.skillPoints >= skill.cost && !userData.unlockedSkills.includes(skill.id)) {
                    userData.skillPoints -= skill.cost
                    userData.unlockedSkills.push(skill.id)
                    playSound(sfxSkillUnlocked)
                    showNotification(`Skill Dikuasai: ${skill.name}!`, '🧠✨', 'success')
                    renderSkillTree()
                    saveData()
                }
            })
        })
    }
    
    function populateColorSchemeSelector() {
        if (!colorSchemeSelector) return
        THEMES.forEach(theme => {
            const option = document.createElement('option')
            option.value = theme.class
            option.textContent = theme.name
            colorSchemeSelector.appendChild(option)
        })
        colorSchemeSelector.value = userData.currentTheme
        colorSchemeSelector.addEventListener('change', (e) => {
            applyTheme(e.target.value)
        })
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            playSound(sfxClick)
            document.body.classList.toggle('dark-mode')
            document.body.classList.toggle('light-mode')
            const isDarkMode = document.body.classList.contains('dark-mode')
            themeToggleBtn.innerHTML = `${isDarkMode ? '🌙' : '☀️'} Ganti Mode`
            showNotification(`Mode tampilan diubah ke ${isDarkMode ? 'Gelap' : 'Terang'}!`, isDarkMode ? '🌙' : '☀️', 'info')
            saveSettings()
        })
    }

    if(bgmToggleBtn) bgmToggleBtn.addEventListener('click', toggleBgm)
    if(bgmVolumeSlider) bgmVolumeSlider.addEventListener('input', updateBgmVolume)
    if(sfxToggleBtn) sfxToggleBtn.addEventListener('click', toggleSfx)
    if(sfxVolumeSlider) sfxVolumeSlider.addEventListener('input', updateSfxVolume)
    if(resetDataBtn) resetDataBtn.addEventListener('click', resetGameData)
    
    if (randomizeAvatarBtn && emojiPreviewLanding) {
        randomizeAvatarBtn.addEventListener('click', () => {
            playSound(sfxClick)
            selectedEmojiAvatar = AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)]
            emojiPreviewLanding.textContent = selectedEmojiAvatar
        })
    }

    if(interactiveCharacter) {
        interactiveCharacter.addEventListener('click', () => {
            playSound(sfxClick, 0.5)
                const responses = [
                "Siap beraksi!", "Ada yang bisa dibantu?", "Ayo selesaikan quest!", "Neon bersinar terang hari ini!", "Waktunya berburu koin!",
                "Sistem berjalan optimal!", "Merasa bertenaga!", "Ke mana petualangan kita selanjutnya?", "Jangan ragu untuk bertanya.", "Ada misi baru?",
                "Setiap baris kode adalah langkah maju.", "Data stream stabil.", "Waktunya mengoptimalkan!", "Glitch? Tidak di pengawasanku!", "Mari kita buat progres hari ini!",
                "Energi cyber mengalir deras!", "Dunia digital menanti.", "Siap untuk tantangan berikutnya?", "Tidak ada bug yang bisa menghentikanku!", "Peta jaringan sudah diperbarui.",
                "Prosesor siap untuk overclock!", "Firewall aktif dan kuat.", "Ada anomali yang perlu diselidiki?", "Mari kita pecahkan kode ini!", "Setiap klik adalah kemajuan.",
                "Jaringan aman, komandan.", "Waktunya untuk grinding XP!", "Koneksi ke AdiVerse stabil.", "Sensor mendeteksi peluang.", "Mari kita jelajahi matriks!",
                "Logika terstruktur, hasil maksimal.", "Update terbaru telah diinstal.", "Algoritma sukses dieksekusi.", "Dunia ini penuh dengan data.", "Apa target kita hari ini?",
                "Memproses permintaan Anda...", "Avatar siap tempur!", "Level keamanan ditingkatkan.", "Koin tidak akan terkumpul sendiri!", "Semangat kode membara!",
                "Sirkuit dalam kondisi prima.", "Tidak ada waktu untuk idle!", "Mari kita retas sistem ini!", "Wawasan baru telah terbuka.", "Apakah ada item baru di toko?",
                "Keahlian ditingkatkan!", "Menunggu perintah selanjutnya.", "Dunia virtual ini milik kita!", "Jangan biarkan error mengalahkanmu.", "Setiap tugas adalah peluang.",
                "Kekuatan neon menyertaiku!", "Waktunya berburu achievement!", "Kompilasi berhasil!", "Database telah di-backup.", "Siap untuk menjalankan skrip.",
                "Koneksi neural aktif.", "Mari kita gali lebih dalam.", "Ada quest event yang menarik?", "Simulasi berjalan lancar.", "Tidak ada batasan di dunia digital.",
                "Pikiran setajam pisau cukur data.", "Energi inti stabil.", "Ayo kita tingkatkan level!", "Setiap byte berarti.", "Apakah ada skill baru untuk dipelajari?",
                "Waktunya untuk debugging realitas!", "Visi holografik jernih.", "Mari kita optimalkan alur kerja.", "Kode adalah puisi.", "Sistem merespons dengan baik.",
                "Siap untuk mengunduh kesuksesan.", "Mari kita enkripsi masa depan!", "Tidak ada sistem yang tidak bisa ditembus.", "Filter realitas aktif.", "Kekuatan data ada di tanganmu.",
                "Mencari tantangan baru.", "Waktunya untuk dekompilasi masalah.", "Nanobot sedang memperbaiki diri.", "Memori inti penuh inspirasi.", "Mari kita bangun sesuatu yang luar biasa.",
                "Antivirus selalu terbarui.", "Jejak digital terhapus bersih.", "Modul tempur diaktifkan.", "Siap untuk penjelajahan data.", "Fokus pada tujuan.",
                "Tidak ada lagging di sini!", "Bandwidth tak terbatas untuk sukses.", "Kecerdasan buatan siap membantu.", "Setiap piksel adalah potensi.", "Mari kita ciptakan legenda digital.",
                "Boot sequence selesai.", "Sistem operasi berjalan sempurna.", "Waktunya untuk mengumpulkan sumber daya.", "Tidak ada tantangan yang terlalu besar.", "Mari kita rewrite aturan!",
                "Koneksi ke server utama aman.", "Mode stealth aktif.", "Siap untuk infiltrasi data.", "Kekuatan komputasi maksimal!", "Setiap pencapaian adalah batu loncatan.",
                "Protokol keamanan dijalankan.", "Mari kita lacak anomali itu.", "Dunia ini adalah sandbox kita.", "Tidak ada yang mustahil dengan kode yang tepat.", "Waktunya untuk upgrade!",
                "Unit pemrosesan grafis siap.", "Visualisasi data sedang berlangsung.", "Mari kita analisis pola ini.", "Setiap baris kode membawa kita lebih dekat.", "Interface pengguna optimal.",
                "Mode efisiensi energi aktif.", "Siap untuk menjalankan diagnostik.", "Data adalah mata uang baru.", "Tidak ada kegagalan, hanya feedback.", "Mari kita kuasai teknologi ini.",
                "Cadangan daya penuh.", "Sistem pendingin bekerja dengan baik.", "Mari kita temukan semua easter egg!", "Setiap variabel penting.", "Akses diberikan.",
                "Kriptografi adalah seni.", "Siap untuk memecahkan enkripsi.", "Jaringan saraf tiruan belajar.", "Tidak ada shortcut menuju kesuksesan, kecuali skrip yang bagus.", "Mari kita eksploitasi peluang ini."
            ]
            if(characterStatus) characterStatus.textContent = responses[Math.floor(Math.random() * responses.length)]
            interactiveCharacter.style.transform = 'scale(1.3) rotate(5deg)'
            setTimeout(() => {
                interactiveCharacter.style.transform = ''
                if(characterStatus) characterStatus.textContent = "Idle..."
            }, 1500)
        })
        interactiveCharacter.addEventListener('mouseenter', () => playSound(sfxHover, 0.1))
    }

    if(modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            if(modalContainer) modalContainer.classList.add('hidden')
        })
    }
    
    const MOCK_EVENTS = [
        {
            id: 'event_cyber_bloom',
            title: 'Festival Cyber Bloom 🌸🤖',
            description: 'Rayakan mekarnya bunga cyber! Selesaikan quest spesial untuk hadiah eksklusif.',
            startDate: new Date('2025-07-20'), 
            endDate: new Date('2025-08-05'), 
            reward: 'Skin "Sakura Droid" & Badge "Bloom Guardian"',
            quests: [
                { idBase: 'ev_bloom_collect', title: 'Kumpulkan 5 Data Bloom', description: 'Temukan fragmen data dari bunga cyber.', xp: 100, coins: 20, isEventQuest: true },
                { idBase: 'ev_bloom_protect', title: 'Lindungi Taman Cyber', description: 'Selesaikan 3 quest olahraga untuk menjaga taman tetap aman.', xp: 150, coins: 30, isEventQuest: true }
            ],
            shopItems: [
                { id: 'event_item_sakura_skin', name: 'Sakura Droid Skin', price: 300, stock: 1, category: 'skin', emoji: '🌸', description: 'Skin edisi terbatas Cyber Bloom.', isLimitedTime: true },
                { id: 'event_item_bloom_badge', name: 'Bloom Guardian Badge', price: 100, stock: 5, category: 'badge', emoji: '💮', description: 'Badge spesial event Cyber Bloom.', isLimitedTime: true }
            ]
        }
    ]

    function checkActiveEvent() {
        const now = new Date()
        activeEvent = MOCK_EVENTS.find(event => now >= event.startDate && now <= event.endDate) || null
        
        if (activeEvent) {
            if (eventQuestListContainer) eventQuestListContainer.classList.remove('hidden')
            activeEvent.quests.forEach(template => {
                const questId = generatePeriodicQuestId(template.idBase, 'event_' + activeEvent.id) 
                if (!userData.quests.find(q => q.id === questId)) {
                    userData.quests.unshift({ ...template, id: questId, completed: !!userData.completedPeriodicQuests[questId], isPeriodic: false, period: 'event' })
                }
            })
        } else {
            if (eventQuestListContainer) eventQuestListContainer.classList.add('hidden')
            userData.quests = userData.quests.filter(q => !q.isEventQuest)
        }
        renderAllQuests()
        renderEventDetails()
    }

    function renderEventDetails() {
        const activeEventDiv = document.getElementById('active-event-details')
        const noEventDiv = document.getElementById('no-active-event')
        const goToEventQuestsBtn = document.getElementById('go-to-event-quests-btn')

        if (activeEvent && activeEventDiv && noEventDiv) {
            activeEventDiv.classList.remove('hidden')
            noEventDiv.classList.add('hidden')
            document.getElementById('active-event-title').textContent = activeEvent.title
            document.getElementById('active-event-description').textContent = activeEvent.description
            document.getElementById('active-event-period').textContent = `${activeEvent.startDate.toLocaleDateString()} - ${activeEvent.endDate.toLocaleDateString()}`
            document.getElementById('active-event-reward').textContent = activeEvent.reward
            if(goToEventQuestsBtn) goToEventQuestsBtn.classList.remove('hidden')

        } else if (noEventDiv && activeEventDiv) {
            activeEventDiv.classList.add('hidden')
            noEventDiv.classList.remove('hidden')
            if(goToEventQuestsBtn) goToEventQuestsBtn.classList.add('hidden')
        }
    }


    function updateAllUI() {
        updateDashboardUI()
        if (document.getElementById('profile-section')?.classList.contains('active')) updateProfileUI()
        renderAllQuests()
        renderTemplateQuestButtons()
        renderAchievements()
        renderSkillTree()
        renderEventDetails()
    }
    
    function initializeApp() {
        loadData()
        populateColorSchemeSelector()
        checkAndResetPeriodicQuests()
        checkActiveEvent()

        if (userData.name && userData.avatar) {
            if(landingPage) landingPage.classList.add('hidden')
            if(landingPage) landingPage.classList.remove('active')
            if(appContainer) appContainer.classList.remove('hidden')
            
            if(appContainer) appContainer.style.opacity = '0'
            setTimeout(() => {
                if(appContainer) appContainer.style.transition = 'opacity var(--transition-speed-slow) ease-in'
                if(appContainer) appContainer.style.opacity = '1'
            }, 50)

            updateAllUI()
            checkAndChangeTheme(userData.level) 
            checkAllAchievements()
            switchSection('dashboard-section')
        } else { 
            if(landingPage) landingPage.classList.remove('hidden')
            if(landingPage) landingPage.classList.add('active')
            if(appContainer) appContainer.classList.add('hidden')
            
            selectedEmojiAvatar = userData.avatar || AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)]
            if(emojiPreviewLanding) emojiPreviewLanding.textContent = selectedEmojiAvatar
            
            if(usernameInput) usernameInput.value = userData.name || ''
        }
        
        if(themeToggleBtn) themeToggleBtn.innerHTML = `${document.body.classList.contains('dark-mode') ? '🌙' : '☀️'} Ganti Mode`
    }

    initializeApp()
})