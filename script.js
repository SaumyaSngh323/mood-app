function updateMood() {
    const input = document.getElementById('moodInput').value.toLowerCase();
    const body = document.body;
    const player = document.getElementById('musicPlayer');
    const msg = document.getElementById('responseMsg');
    
    let trackId = ""; // Spotify Track ID
    
    if (input.includes("happy") || input.includes("good") || input.includes("cute")) {
        body.className = "theme-cute";
        msg.innerText = "That's lovely! Here's some Taylor Swift to match your vibe. ✨";
        trackId = "1BxfuRmsmsOeoFLvC7L61S"; // 'Shake It Off' - Taylor Swift
        
    } else if (input.includes("classy") || input.includes("chill") || input.includes("work")) {
        body.className = "theme-classy";
        msg.innerText = "Staying elegant. Let's play some Ed Sheeran. 🍷";
        trackId = "0tgVpS3mghpBozvYvRPS6u"; // 'Perfect' - Ed Sheeran
        
    } else if (input.includes("sad") || input.includes("dark") || input.includes("night")) {
        body.className = "theme-dark";
        msg.innerText = "Embracing the shadows. Arijit Singh's soul is here for you. 🌙";
        trackId = "5z9S9u0VvVfB4Wd9tPto2n"; // 'Tum Hi Ho' - Arijit Singh
    }

    // This injects the ORIGINAL song player
    if (trackId) {
        player.innerHTML = `
            <iframe style="border-radius:12px; margin-top:20px" 
                src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0" 
                width="100%" height="152" frameBorder="0" allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>`;
    }
}
