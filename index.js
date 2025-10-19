// === Load Ohio Outline SVG ===
const mapContainer = document.getElementById('mapContainer');
const ohioSVGPath = 'Images/Ohio.svg'; // 🔹 Your outline file path

fetch(ohioSVGPath)
  .then(response => response.text())
  .then(svgData => {
    mapContainer.innerHTML = svgData;
    addPins();
  })
  .catch(error => console.error('Error loading SVG:', error));

// === Cities & Study Guide Links ===
const cities = [
  { 
    name: 'Columbus', 
    title: 'Ohio Government Basics', 
    desc: 'Welcome to Columbus, Ohio! All branches of the Ohio government are located here. Ready to learn how the government is set up?', 
    x: 300, y: 350, 
    link: 'StudyGuides/ohio-government-basics.html'
  },
  { 
    name: 'Cleveland', 
    title: 'History of Ohio', 
    desc: 'Welcome to Cleveland, Ohio! Ready to learn more about the history of your state?', 
    x: 380, y: 150, 
    link: 'StudyGuides/history-of-ohio.html'
  },
  { 
    name: 'Akron', 
    title: 'Local Government', 
    desc: 'Welcome to Akron, Ohio! Ready to learn how your local government works?', 
    x: 360, y: 220, 
    link: 'StudyGuides/local-government.html'
  },
  { 
    name: 'Chillicothe', 
    title: 'Constitution & Rights', 
    desc: 'Welcome to Chillicothe, Ohio! The Ohio Constitution was written and signed here! Ready to learn all about it?', 
    x: 320, y: 420, 
    link: 'StudyGuides/constitution-rights.html'
  },
  { 
    name: 'Toledo', 
    title: 'Current Officials', 
    desc: 'Welcome to Toledo, Ohio! Ready to learn who your states officials are?', 
    x: 200, y: 120, 
    link: 'StudyGuides/current-officials.html'
  }
];

let currentPopup = null;

// === Add Pins to the Map ===
function addPins() {
  cities.forEach(city => {
    const pin = document.createElement('div');
    pin.classList.add('pin');
    pin.style.left = city.x + 'px';
    pin.style.top = city.y + 'px';
    pin.title = city.name;

    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      showPopup(city, pin);
    });

    mapContainer.appendChild(pin);
  });

  document.addEventListener('click', () => closePopup());
}

// === Show Popup on Pin Click ===
function showPopup(city, pin) {
  closePopup();

  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <h3>${city.title}</h3>
    <p>${city.desc}</p>
    <button onclick="window.location.href='${city.link}'">Start Study Guide</button>
  `;

  // Position popup near pin
  const rect = pin.getBoundingClientRect();
  const mapRect = mapContainer.getBoundingClientRect();
  const offsetX = rect.left - mapRect.left;
  const offsetY = rect.top - mapRect.top;

  popup.style.left = offsetX + 'px';
  popup.style.top = (offsetY - 20) + 'px';

  mapContainer.appendChild(popup);
  currentPopup = popup;
}

// === Close Active Popup ===
function closePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
}
