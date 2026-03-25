// Multi-Page Navigation Logic
function showPage(pageId) {
    // 1. Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // 2. Show the page that was clicked
    document.getElementById(pageId).classList.add('active');
}

// Interactive Mood/Background Logic
function setMood(mood) {
    const body = document.body;
    const text = document.getElementById("text");

    if (mood === 'soft') {
        body.style.backdropFilter = "brightness(1) contrast(1)";
        text.innerText = "Everything is Soft Girl Sweet ✨";
    } else if (mood === 'classy') {
        body.style.backdropFilter = "brightness(0.9) grayscale(0.2)";
        text.innerText = "Keep it Classy, Keep it Quiet 🥂";
    } else if (mood === 'lively') {
        // Increases saturation to feel energetic
        body.style.backdropFilter = "brightness(1.1) saturate(1.4)";
        text.innerText = "Feeling Absolutely Lively! 🌸";
    }
}

// Basic Audio Player Logic (Can use soundhelix or new links)
function changeSong(songUrl) {
    const music = document.getElementById("music");
    if (music && songUrl !== "") {
        music.src = songUrl;
        music.play();
    }
}

// Chat Box Logic (Matches HTML talk() function)
function talk() {
    const input = document.getElementById("userInput").value;
    const replyText = document.getElementById("reply");
    
    if (input) {
        replyText.innerText = "Lost in this aesthetic moment...listening... 🎧";
        document.getElementById("userInput").value = "";
    }
}
