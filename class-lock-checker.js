// class-lock-checker.js
// Class lock management for student portal

const LOCK_CONFIG_URL = 'https://raw.githubusercontent.com/lfjccbt/lock-config/main/locks.json';

// Function to check if a class is locked
async function isClassLocked(className) {
    try {
        const response = await fetch(LOCK_CONFIG_URL);
        const locks = await response.json();
        return locks[className] === true;
    } catch (error) {
        console.error('Error checking lock status:', error);
        return false; // Default to unlocked if can't check
    }
}

// Function to load class content with lock check
async function loadClassContent(className) {
    const locked = await isClassLocked(className);
    
    if (locked) {
        document.getElementById('content').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <div style="font-size: 64px;">🔒</div>
                <h2>Class ${className} is Locked</h2>
                <p>This class is currently restricted. Please check back later.</p>
            </div>
        `;
    } else {
        // Load normal class content from GitHub
        loadFromGitHub(className);
    }
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isClassLocked, loadClassContent };
}
