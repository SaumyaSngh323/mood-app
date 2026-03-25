function setMood(mood) {
  document.body.className = mood;

  let text = document.getElementById("text");
  let music = document.getElementById("music");

  if (mood === "cute") {
    text.innerText = "Cute Vibes 🎀";
    music.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  }

  if (mood === "dark") {
    text.innerText = "Dark Vibes 🖤";
    music.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
  }

  if (mood === "classy") {
    text.innerText = "Classy Vibes ✨";
    music.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
  }

  music.play();
}

function talk() {
  let input = document.getElementById("userInput").value.toLowerCase();
  let reply = "I'm here for you 💛";

  if (input.includes("sad")) {
    reply = "I get it... bad days happen. I'm here 💛";
  }

  else if (input.includes("lonely")) {
    reply = "You're not alone 🤍";
  }

  else if (input.includes("happy")) {
    reply = "That’s amazing 😄!";
  }

  document.getElementById("reply").innerText = reply;
}