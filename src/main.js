import './style.css';
import { categories, quotes } from './data.js';
import { store } from './store.js';

// Initialize Store
store.init();

// DOM Elements
const app = document.getElementById('app');
const screens = {
  landing: document.getElementById('screen-landing'),
  selection: document.getElementById('screen-selection'),
  slider: document.getElementById('screen-slider'),
  card: document.getElementById('screen-card'),
  quote: document.getElementById('screen-quote')
};

const btnStart = document.getElementById('btn-start');
const wheelContainer = document.getElementById('wheel-container');
const sliderTrack = document.getElementById('slider-track');
const card = document.getElementById('active-card');
const cardQuestionText = document.getElementById('card-question-text');
const cardCategoryLabel = document.getElementById('card-category-label');
const cardCategoryLabelBack = document.getElementById('card-category-label-back');
const inputArea = document.getElementById('input-area');
const answerInput = document.getElementById('answer-input');
const btnNextCard = document.getElementById('btn-next-card');
const btnBackCard = document.getElementById('btn-back-card');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

// State
let currentCategoryKey = null;
let currentQuestionIndex = 0;

// Navigation
function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
    setTimeout(() => {
      if (!screen.classList.contains('active')) screen.style.display = 'none';
    }, 500);
  });

  const target = screens[screenName];
  target.style.display = 'flex';
  // Force reflow
  void target.offsetWidth;
  target.classList.add('active');
}

// Wheel Generation
function createWheel() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";
  // Removed CSS transform, handling rotation in logic

  const categoryKeys = Object.keys(categories);
  const total = categoryKeys.length;
  const radius = 150;
  const center = 150;
  const textRadius = 115; // Slightly adjusted for text path

  // Offset to start Curiosidade at Top Left (approx -162deg relative to standard 0 at 3 o'clock)
  // Standard 0 is 3 o'clock. Top is -90.
  // We want Curiosidade (index 0) to be at "Reinvencao's spot".
  // Let's stick to the visual rotation requested: -162deg.
  // We will apply this offset to all angles.
  const rotationOffset = -162;

  categoryKeys.forEach((key, index) => {
    const startAngle = (index * 360) / total + rotationOffset;
    const endAngle = ((index + 1) * 360) / total + rotationOffset;

    // Calculate path for segment
    const x1 = center + radius * Math.cos(Math.PI * startAngle / 180);
    const y1 = center + radius * Math.sin(Math.PI * startAngle / 180);
    const x2 = center + radius * Math.cos(Math.PI * endAngle / 180);
    const y2 = center + radius * Math.sin(Math.PI * endAngle / 180);

    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

    // Group for segment
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "wheel-segment");
    g.addEventListener("click", () => selectCategory(key));

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", categories[key].color);
    path.setAttribute("stroke", "white");
    path.setAttribute("stroke-width", "2");

    // Text Path Logic
    // We need a path specifically for the text to follow.
    // It should be an arc at textRadius.
    // Determine if text needs to be flipped (for bottom half readability)

    // Normalize angles to 0-360 for easier checking
    let midAngle = (startAngle + endAngle) / 2;
    // Normalize to 0-360 range
    midAngle = (midAngle % 360 + 360) % 360;

    const isBottomHalf = midAngle > 0 && midAngle < 180; // SVG Y is down, so 0-180 is actually bottom half in standard math but let's check visual
    // Visual check: 0 is 3 o'clock. 90 is 6 o'clock (bottom). 180 is 9 o'clock. 270 is 12 o'clock (top).
    // So bottom half is roughly 0 to 180.

    let textPathData;
    if (isBottomHalf) {
      // Reverse path for readability (Counter-Clockwise)
      const tx1 = center + textRadius * Math.cos(Math.PI * endAngle / 180);
      const ty1 = center + textRadius * Math.sin(Math.PI * endAngle / 180);
      const tx2 = center + textRadius * Math.cos(Math.PI * startAngle / 180);
      const ty2 = center + textRadius * Math.sin(Math.PI * startAngle / 180);
      textPathData = `M ${tx1} ${ty1} A ${textRadius} ${textRadius} 0 0 0 ${tx2} ${ty2}`;
    } else {
      // Normal path (Clockwise)
      const tx1 = center + textRadius * Math.cos(Math.PI * startAngle / 180);
      const ty1 = center + textRadius * Math.sin(Math.PI * startAngle / 180);
      const tx2 = center + textRadius * Math.cos(Math.PI * endAngle / 180);
      const ty2 = center + textRadius * Math.sin(Math.PI * endAngle / 180);
      textPathData = `M ${tx1} ${ty1} A ${textRadius} ${textRadius} 0 0 1 ${tx2} ${ty2}`;
    }

    const pathId = `text-path-${key}`;
    const defs = document.createElementNS(svgNS, "defs");
    const textPathCurve = document.createElementNS(svgNS, "path");
    textPathCurve.setAttribute("id", pathId);
    textPathCurve.setAttribute("d", textPathData);
    defs.appendChild(textPathCurve);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("font-family", "Outfit, sans-serif");
    text.style.pointerEvents = "none";
    // Adjust letter spacing for better curve fit if needed
    text.setAttribute("letter-spacing", "1");

    const textPathEl = document.createElementNS(svgNS, "textPath");
    textPathEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${pathId}`);
    textPathEl.setAttribute("startOffset", "50%");
    textPathEl.setAttribute("text-anchor", "middle");
    textPathEl.textContent = categories[key].label;

    text.appendChild(textPathEl);
    g.appendChild(defs);
    g.appendChild(path);
    g.appendChild(text);
    svg.appendChild(g);
  });

  wheelContainer.insertBefore(svg, wheelContainer.firstChild);
}

// Slider Logic
function setupSlider(key) {
  sliderTrack.innerHTML = ''; // Clear previous
  const category = categories[key];
  const questions = category.questions;

  // Create cards. To make it infinite, we need enough duplicates.
  // For a smooth infinite effect with CSS, we duplicate the set.
  const cardsToRender = [...questions, ...questions, ...questions, ...questions]; // 4x to be safe for width

  cardsToRender.forEach((q, index) => {
    // Map back to original index
    const originalIndex = index % questions.length;

    const cardEl = document.createElement('div');
    cardEl.className = 'slider-card';
    // Remove border color as we use image now
    // cardEl.style.borderColor = category.color;

    const img = document.createElement('img');
    img.src = category.image;
    img.className = 'slider-card-image';
    img.alt = category.label;

    const number = document.createElement('div');
    number.className = 'slider-card-number';
    number.textContent = originalIndex + 1;

    cardEl.appendChild(img);
    cardEl.appendChild(number);

    cardEl.addEventListener('click', () => {
      selectCard(key, originalIndex);
    });

    sliderTrack.appendChild(cardEl);
  });
}

function selectCategory(key) {
  currentCategoryKey = key;
  store.setCategory(key);

  // Show Quote Transition
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = randomQuote.author;

  showScreen('quote');

  setTimeout(() => {
    setupSlider(key);
    showScreen('slider');
  }, 3000); // 3 seconds reading time
}

function selectCard(key, index) {
  currentQuestionIndex = index;
  setupCard(key, index);
  showScreen('card');
}

function setupCard(key, index) {
  const category = categories[key];
  const question = category.questions[index];

  // Reset Card State
  card.classList.remove('is-flipped');
  inputArea.classList.remove('visible');
  answerInput.value = store.getAnswer(key, index);

  // Update Content Front - Now uses Image
  const cardFront = document.querySelector('.card-front');
  cardFront.innerHTML = ''; // Clear previous content

  const img = document.createElement('img');
  img.src = category.image;
  img.className = 'card-front-image';
  img.alt = category.label;

  const number = document.createElement('div');
  number.className = 'card-front-number';
  number.textContent = index + 1;

  const instruction = document.createElement('div');
  instruction.className = 'card-front-instruction';
  instruction.textContent = 'Toque para virar';

  cardFront.appendChild(img);
  cardFront.appendChild(number);
  cardFront.appendChild(instruction);

  // Update Content Back - New Design
  const cardBack = document.querySelector('.card-back');
  const cardBackHeader = document.getElementById('card-back-header');
  const cardBackFooter = document.getElementById('card-back-footer');

  cardBack.style.borderColor = category.color;

  cardBackHeader.textContent = category.label;
  cardBackHeader.style.color = category.color;

  cardBackFooter.style.backgroundColor = category.color;

  cardQuestionText.textContent = question;
}

// Event Listeners
btnStart.addEventListener('click', () => {
  showScreen('selection');
});

card.addEventListener('click', () => {
  card.classList.toggle('is-flipped');
  if (card.classList.contains('is-flipped')) {
    setTimeout(() => {
      inputArea.classList.add('visible');
    }, 500);
  }
});

btnNextCard.addEventListener('click', () => {
  // Save answer
  store.saveAnswer(currentCategoryKey, currentQuestionIndex, answerInput.value);

  // Go back to selection for MVP flow
  showScreen('selection');
});

btnBackCard.addEventListener('click', () => {
  showScreen('slider');
});

// Init
createWheel();
