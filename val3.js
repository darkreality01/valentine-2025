function createBurstOfHearts() {
    for (let i = 0; i < 1000; i++) {
        let heart = document.createElement("div");
        heart.innerText = "❤️";
        heart.classList.add("floating-heart");
        document.body.appendChild(heart);

        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        setTimeout(() => heart.remove(), 15000);
    }
}

setTimeout(createBurstOfHearts, 500); 
window.onload = function() {
    const noButton = document.getElementById("no");

    document.addEventListener("mousemove", function(event) {
        if (!noButton) return;

        const rect = noButton.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - (rect.x + rect.width / 2), 
                                    event.clientY - (rect.y + rect.height / 2));

        if (distance < 100) {
            let newX = Math.random() * (window.innerWidth - rect.width);
            let newY = Math.random() * (window.innerHeight - rect.height);
            noButton.style.position = "fixed";
            noButton.style.left = newX + "px";
            noButton.style.top = newY + "px";

            throwFlowers(newX, newY);
            playVoice("i love you please accept my proposal");
        }
    });

    function throwFlowers(x, y) {
        let flower = document.createElement("div");
        flower.innerHTML = "🌸";
        flower.classList.add("flower");
        document.body.appendChild(flower);
        flower.style.position = "fixed";
        flower.style.left = x + "px";
        flower.style.top = y + "px";

        setTimeout(() => flower.remove(), 1000);
    }

    function playVoice(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-in"; // Set language
        speech.rate = 1.3; // Speed of the voice
        speech.pitch = 0.5; // Pitch of the voice
        speech.volume = 1; // Volume (0 to 1)
        window.speechSynthesis.speak(speech);
    }
};
function playVoice(text, voiceName = "Google English (India)") {
    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    const selectedVoice = voices.find(voice => voice.name === voiceName);
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    speech.lang = "en-IN"; // Indian English
    speech.rate = 1;  
    speech.pitch = 1.2; 
    speech.volume = 1; 

    window.speechSynthesis.speak(speech);
}

// 🎤 When clicking on H1 (Valentine message)
document.querySelector(".heart").addEventListener("click", function() {
    playVoice("Will you be my Valentine?", "Google English (India)");
});

// 🎤 When clicking NO button (Only first time)
let noClicked = false;
document.getElementById("no").addEventListener("click", function() {
    if (!noClicked) {
        playVoice("No way! You can't catch me!", "Google English (India)");
        noClicked = true;  // Prevents multiple voice repeats
    }
});
