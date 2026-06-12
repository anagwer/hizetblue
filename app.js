// Configurations for link buttons. Easy to add, remove, and modify!
const links = [
  {
    title: "INSTAGRAM",
    description: "See my photos & stories",
    url: "https://instagram.com/",
    iconClass: "fab fa-instagram",
    iconBg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    bgImage: "img/btn-1.png",
    titleColor: "#ff55b7"
  },
  {
    title: "TIKTOK",
    description: "Short videos & content",
    url: "https://tiktok.com/",
    iconClass: "fab fa-tiktok",
    iconBg: "#000000",
    bgImage: "img/btn-2.png",
    titleColor: "#ff55b7"
  },
  {
    title: "TWITTER",
    description: "Thoughts & updates",
    url: "https://x.com/",
    iconClass: "fab fa-x-twitter", // FontAwesome X (Twitter) icon
    iconBg: "#000000",
    bgImage: "img/btn-3.png",
    titleColor: "#ff55b7"
  },
  {
    title: "YOUTUBE",
    description: "Watch my videos",
    url: "https://youtube.com/",
    iconClass: "fab fa-youtube",
    iconBg: "#ff0000",
    bgImage: "img/btn-1.png",
    titleColor: "#ff55b7"
  },
  {
    title: "EMAIL",
    description: "Let's work together",
    url: "mailto:example@domain.com",
    iconClass: "fas fa-envelope",
    iconBg: "#00b050", // green color to match reference image
    bgImage: "img/btn-2.png",
    titleColor: "#ff55b7"
  }
];

// Web Audio API Retro Sound Effects (Optional and fun!)
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// 8-bit blip sound for hover
function playHoverSound() {
  try {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime); // start freq
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08); // slide up
    
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime); // low volume
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // Audio context not allowed or failed to initialize
  }
}

// 8-bit jump/select sound for click
function playClickSound() {
  try {
    initAudio();
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    // Audio context not allowed or failed to initialize
  }
}

// Render links dynamically when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("links-container");
  
  links.forEach((link, index) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = link.url.startsWith("mailto:") ? "_self" : "_blank";
    a.className = "link-card";
    
    // Set custom background frame image and staggered animation delay
    a.style.backgroundImage = `url('${link.bgImage}')`;
    a.style.animationDelay = `${index * 0.1}s`;
    
    // Set up inner content template
    a.innerHTML = `
      <div class="icon-wrapper" style="background: ${link.iconBg}">
        <i class="${link.iconClass}"></i>
      </div>
      <div class="info-section">
        <h2 style="color: ${link.titleColor}">${link.title}</h2>
        <p>${link.description}</p>
      </div>
      <div class="arrow-wrapper">&gt;&gt;&gt;</div>
    `;
    
    // Sound events
    a.addEventListener("mouseenter", playHoverSound);
    a.addEventListener("click", (e) => {
      playClickSound();
      // Let standard navigation happen after a tiny delay for the sound to play
      if (!link.url.startsWith("mailto:")) {
        e.preventDefault();
        setTimeout(() => {
          window.open(link.url, '_blank');
        }, 120);
      }
    });
    
    container.appendChild(a);
  });
});
