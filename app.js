// Demo-data: legg dine egne filer i /videos og bilder i /thumbs
const library = [
  {
    id: "vid1",
    title: "gorilla tag",
    description: "gorilla tag gameplay",
    category: "Film",
    thumb: "mabeygm/gorilla.jpg",
    sources: [
      { src: "videos/gtagvid1.mp4", type: "video/mp4", label: "1080p" },
    ]
  },
  {
    id: "vid2",
    title: "Nattlys",
    description: "Musikkvideo med neon og bystemning.",
    category: "Film",
    thumb: "thumbs/nattlys.jpg",
    sources: [
      { src: "videos/nattlys.webm", type: "video/webm", label: "WEBM" },
      { src: "videos/nattlys.mp4", type: "video/mp4", label: "MP4" }
    ]
  },
  {
    id: "vid3",
    title: "Kysten",
    description: "Episode 1 av min egen serie om kystliv.",
    category: "Serie",
    thumb: "thumbs/kysten.jpg",
    sources: [
      { src: "videos/kysten_ep1.mp4", type: "video/mp4", label: "EP1" }
    ]
  }
];

const gridEl = document.getElementById("videoGrid");
const searchEl = document.getElementById("searchInput");
const catEl = document.getElementById("categorySelect");
const modalEl = document.getElementById("playerModal");
const playerEl = document.getElementById("videoPlayer");
const titleEl = document.getElementById("videoTitle");
const descEl = document.getElementById("videoDescription");
const closeEl = document.getElementById("closeModal");

let currentList = library;

function renderGrid(items) {
  gridEl.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.thumb}" alt="${item.title}" />
      <div class="info">
        <div class="title">${item.title}</div>
        <div class="sub">${item.category}</div>
      </div>
    `;
    card.addEventListener("click", () => openPlayer(item));
    gridEl.appendChild(card);
  });
}

function openPlayer(item) {
  // Konfigurer video-kilder (håndterer flere kvaliteter/typer)
  playerEl.innerHTML = "";
  item.sources.forEach(s => {
    const sourceEl = document.createElement("source");
    sourceEl.src = s.src;
    sourceEl.type = s.type;
    playerEl.appendChild(sourceEl);
  });
  playerEl.poster = item.thumb;
  titleEl.textContent = item.title;
  descEl.textContent = item.description;
  modalEl.classList.remove("hidden");
  playerEl.load();
  playerEl.play().catch(() => {}); // ignorer auto-play blokkering
}

function closePlayer() {
  playerEl.pause();
  modalEl.classList.add("hidden");
  playerEl.innerHTML = "";
}

function applyFilters() {
  const q = (searchEl.value || "").toLowerCase();
  const cat = catEl.value;
  currentList = library.filter(item => {
    const matchesText =
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    const matchesCat = !cat || item.category === cat;
    return matchesText && matchesCat;
  });
  renderGrid(currentList);
}

// Eventer
searchEl.addEventListener("input", applyFilters);
catEl.addEventListener("change", applyFilters);
closeEl.addEventListener("click", closePlayer);
modalEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("backdrop")) closePlayer();
});

// Init
renderGrid(library);
