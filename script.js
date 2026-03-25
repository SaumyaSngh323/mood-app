function setMood(mood) {
    const body = document.body;
    const text = document.getElementById("text");

    if (mood === 'cute') {
        body.style.background = "linear-gradient(135deg, #ffafbd, #ffc3a0)";
        text.innerText = "Everything is Soft & Sweet ✨";
    } else if (mood === 'dark') {
        body.style.background = "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";
        text.innerText = "Lost in the Aesthetic 🌑";
    } else if (mood === 'classy') {
        body.style.background = "linear-gradient(135deg, #2c3e50, #bdc3c7)";
        text.innerText = "Keep it Classy 🥂";
    }
}

function changeSong() {
    const music = document.getElementById("music");
    const selector = document.getElementById("songSelector");
    if (selector && selector.value !== "") {
        music.src = selector.value;
        music.play();
    }
}

// This matches the talk() function your button is looking for
function talk() {
    const input = document.getElementById("userInput").value;
    const replyText = document.getElementById("reply");
    
    if (input) {
        replyText.innerText = "I hear you... stay aesthetic! 🎧";
        document.getElementById("userInput").value = "";
    }
}
