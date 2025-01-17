// Variables for the typing effect
const textArray = ["Welcome to Rise Colleague!", "Your ultimate hub for programming knowledge.", "Explore code, notes, and videos."];
let charIndex = 0;
let textIndex = 0;
let isErasing = false;

// Typing effect function
function typeEffect() {
    const typedText = document.getElementById('typed-text');
    if (isErasing) {
        if (charIndex > 0) {
            typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isErasing = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(typeEffect, 200);
        }
    } else {
        if (charIndex < textArray[textIndex].length) {
            typedText.textContent = textArray[textIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            isErasing = true;
            setTimeout(typeEffect, 1000);
        }
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Apply saved theme on page load
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (savedTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    } else {
        icon.classList.add('fa-moon');
    }
}

// Set theme based on icon state
function setThemeBasedOnIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    if (icon.classList.contains('fa-sun')) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Search box functioning
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const notes = [
        { title: "Note 1", link: "notes.html#note1" },
        { title: "Note 2", link: "notes.html#note2" },
        { title: "Note 3", link: "notes.html#note3" }
    ]; // Replace with actual notes and links
    const videos = [
        { title: "Video 1: Programming Basics", link: "videos.html#video1" },
        { title: "Video 2: Advanced Concepts", link: "videos.html#video2" },
        { title: "Video 3: Tips & Tricks", link: "videos.html#video3" }
    ]; // Replace with actual video titles and links
    const codes = [
        { title: "Code 1", link: "https://github.com/RiseColleague/code1" },
        { title: "Code 2", link: "https://github.com/RiseColleague/code2" },
        { title: "Code 3", link: "https://github.com/RiseColleague/code3" }
    ]; // Replace with actual code titles and links

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = '';

        if (query) {
            const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(query));
            const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(query));
            const filteredCodes = codes.filter(code => code.title.toLowerCase().includes(query));

            const results = [...filteredNotes, ...filteredVideos, ...filteredCodes];

            results.forEach(result => {
                const div = document.createElement('div');
                div.textContent = result.title;
                div.addEventListener('click', () => {
                    window.location.href = result.link;
                    searchHistory.unshift(result.title);
                    searchHistory = [...new Set(searchHistory)].slice(0, 5); // Keep only the latest 5 unique searches
                    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                    searchInput.value = '';
                    suggestions.innerHTML = '';
                });
                suggestions.appendChild(div);
            });
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !suggestions.contains(event.target)) {
            searchInput.value = ''; // Clear the search input
            suggestions.innerHTML = ''; // Clear the suggestions
        }
    });
}

// Call setupSearch function after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    setThemeBasedOnIcon();

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Save the theme to local storage when a link is clicked
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    });

    setupSearch();
    typeEffect();
});