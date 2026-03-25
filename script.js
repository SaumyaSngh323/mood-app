function showPage(pageId) {
    // Hide all pages first
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    
    // Show the specific page clicked
    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'flex';
    }
}

function setMood(mood) {
    const body = document.body;
    const moodText = document.getElementById("text");

    // Remove old moods
    body.classList.remove('soft-bg', 'classy-bg', 'lively-bg');

    if (mood === 'soft') {
        body.classList.add('soft-bg');
        moodText.innerText = "Everything is Soft Girl Sweet ✨";
    } else if (mood === 'classy') {
        body.classList.add('classy-bg');
        moodText.innerText = "Keep it Classy 🥂";
    } else if (mood === 'lively') {
        body.classList.add('lively-bg');
        moodText.innerText = "Feeling Absolutely Lively! 🌸";
    }
}

function talk() {
    const input = document.getElementById("userInput").value;
    const replyText = document.getElementById("reply");
    if (input) {
        replyText.innerText = "I'm listening... stay aesthetic. 🎧";
        document.getElementById("userInput").value = "";
    }
}
