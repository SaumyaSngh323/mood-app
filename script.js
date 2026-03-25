// --- fixed PAGE SWITCHING Logic ---
function showPage(pageId) {
    // 1. Find all sections that have the class "page"
    const pages = document.querySelectorAll('.page');
    
    // 2. Hide all of them
    pages.forEach(p => {
        p.style.display = 'none'; // This hides the page completely
        p.classList.remove('active'); // Extra protection
    });
    
    // 3. Find the one specific page we clicked (like 'weather')
    const clickedPage = document.getElementById(pageId);
    
    // 4. Show it
    if (clickedPage) {
        clickedPage.style.display = 'flex'; // Uses flex to center the content
        clickedPage.classList.add('active'); // For the animation
    }
}

// --- fixed MOOD Logic (Matches your HTML Buttons) ---
// Note: We are using a pseudo-3D parallax effect on the background image itself
function setMood(moodType) {
    const body = document.body;
    const moodText = document.getElementById("text");
    const container = document.querySelector(".container.glass-premium");

    // Clean up old classes first
    body.classList.remove('soft-girl', 'classy-look', 'lively-mood');

    if (moodType === 'soft') {
        body.classList.add('soft-girl'); // Adds soft blur to the mosaic
        moodText.innerText = "Everything is Soft Girl Sweet ✨";
    } else if (moodType === 'classy') {
        body.classList.add('classy-look'); // Adds grayscale to the mosaic
        moodText.innerText = "Keep it Classy, Keep it Quiet 🥂";
    } else if (moodType === 'lively') {
        body.classList.add('lively-mood'); // Adds saturation to the mosaic
        moodText.innerText = "Feeling Absolutely Lively! 🌸";
    }
}

// Basic Chat Logic (Matches your talk() function in HTML)
function talk() {
    const input = document.getElementById("userInput").value;
    const replyText = document.getElementById("reply");
    
    if (input) {
        replyText.innerText = "Lost in this aesthetic moment...listening... 🎧";
        document.getElementById("userInput").value = "";
    }
}
