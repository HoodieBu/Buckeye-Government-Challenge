// ====== ELEMENT REFERENCES ======
const introScreen = document.getElementById("intro");
const testScreen = document.getElementById("test");
const overviewScreen = document.getElementById("overview");
const resultScreen = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const questionTitle = document.getElementById("questionTitle");
const optionsContainer = document.getElementById("optionsContainer");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const overviewGrid = document.getElementById("overviewGrid");
const scoreText = document.getElementById("scoreText");

// ====== QUESTION BANK ======
const questions = [
  {
    question: "What year did Ohio become a state of the United States?",
    options: ["1803", "1812", "1798", "1820"],
    correct: 0
  },
  {
    question: "Who was Ohio’s first governor?",
    options: ["Thomas Worthington", "Edward Tiffin", "William Henry Harrison", "Rufus Putnam"],
    correct: 1
  },
  {
    question: "What was Ohio’s role in the Underground Railroad?",
    options: [
      "It enforced the Fugitive Slave Act",
      "It was a Confederate ally",
      "Ohio was a key route for escaped enslaved people seeking freedom in the North and Canada",
      "Ohio had no involvement"
    ],
    correct: 2
  },
  {
    question: "Which river forms much of Ohio’s southern boundary?",
    options: ["The Mississippi River", "The Ohio River", "The Scioto River", "The Great Miami River"],
    correct: 1
  },
  {
    question: "What Native American groups originally lived in Ohio?",
    options: [
      "Cherokee and Creek",
      "Iroquois only",
      "Shawnee, Miami, Delaware (Lenape), Wyandot",
      "Apache and Sioux"
    ],
    correct: 2
  },
  {
    question: "What was the Northwest Ordinance, and how did it lead to Ohio’s creation?",
    options: [
      "It created the Erie Canal",
      "It set governance rules for the Northwest Territory and conditions for statehood",
      "It formed the U.S. Constitution",
      "It ended slavery nationwide"
    ],
    correct: 1
  },
  {
    question: "What was the capital of Ohio before Columbus?",
    options: ["Cincinnati", "Chillicothe", "Marietta", "Dayton"],
    correct: 1
  },
  {
    question: "Why was Columbus chosen as the capital of Ohio?",
    options: [
      "It had the largest population",
      "It was centrally located and a compromise among regions",
      "It was near Lake Erie",
      "It was the oldest settlement"
    ],
    correct: 1
  },
  {
    question: "What major industries helped Ohio’s early economic growth?",
    options: [
      "Agriculture, coal, steel, manufacturing, and transportation",
      "Textiles and tobacco",
      "Fishing and tourism",
      "Gold mining"
    ],
    correct: 0
  },
  {
    question: "What role did Ohio play in the Civil War?",
    options: [
      "It joined the Confederacy",
      "It was neutral",
      "It supported the Union and provided troops and generals like Grant and Sherman",
      "It was a battleground state"
    ],
    correct: 2
  },
  {
    question: "How many U.S. presidents were born in Ohio?",
    options: ["8", "10", "5", "6"],
    correct: 0
  },
  {
    question: "Name at least three U.S. presidents from Ohio.",
    options: [
      "Ulysses S. Grant, William McKinley, Warren G. Harding",
      "George Washington, John Adams, Thomas Jefferson",
      "Abraham Lincoln, Andrew Jackson, James Polk",
      "Theodore Roosevelt, Woodrow Wilson, FDR"
    ],
    correct: 0
  },
  {
    question: "What city was once known as the “Rubber Capital of the World”?",
    options: ["Toledo", "Cleveland", "Akron", "Columbus"],
    correct: 2
  },
  {
    question: "Which Ohio city is known for steel production?",
    options: ["Dayton and Akron", "Cleveland and Youngstown", "Columbus and Toledo", "Marietta and Lima"],
    correct: 1
  },
  {
    question: "What major invention came from Dayton, Ohio?",
    options: ["The automobile", "The light bulb", "The airplane", "The telephone"],
    correct: 2
  },
  {
    question: "Who were the Wright brothers, and why are they important to Ohio’s history?",
    options: [
      "Industrial steel magnates",
      "Founders of Cleveland",
      "Inventors of the first successful airplane from Dayton",
      "Ohio politicians"
    ],
    correct: 2
  },
  {
    question: "What major “war” occurred with Michigan over boundary with Ohio?",
    options: ["The Buckeye Conflict", "The Canal War", "The Toledo War", "The Great Lakes War"],
    correct: 2
  },
  {
    question: "What was the significance of the Cuyahoga River fire?",
    options: [
      "It destroyed Cleveland permanently",
      "It inspired environmental reforms like the Clean Water Act",
      "It caused the Great Depression",
      "It ended canal transportation"
    ],
    correct: 1
  },
  {
    question: "What was Ohio’s role in the abolition movement?",
    options: [
      "It supported slavery",
      "It banned abolitionist activity",
      "It was a strong anti-slavery state with Underground Railroad stations",
      "It remained neutral"
    ],
    correct: 2
  },
  {
    question: "What major transportation systems helped Ohio’s growth in the 19th century?",
    options: [
      "Only stagecoaches",
      "Air travel",
      "Horseback delivery",
      "Canals, railroads, and Great Lakes shipping routes"
    ],
    correct: 3
  },
  {
    question: "How did immigration affect Ohio’s development?",
    options: [
      "It reduced population",
      "Immigrants built industry, agriculture, and enriched culture",
      "It isolated Ohio politically",
      "It caused the economy to collapse"
    ],
    correct: 1
  },
  {
    question: "Which Ohioan served as a Union general and later became U.S. President?",
    options: ["William Tecumseh Sherman", "James Garfield", "Ulysses S. Grant", "Rutherford B. Hayes"],
    correct: 2
  },
  {
    question: "What was the importance of the Erie Canal for Ohio?",
    options: [
      "It started the American Revolution",
      "It destroyed Ohio’s ports",
      "It connected trade routes that boosted Ohio’s economy",
      "It was used for military defense"
    ],
    correct: 2
  },
  {
    question: "What natural resources were abundant in early Ohio?",
    options: ["Coal, timber, oil, and fertile farmland", "Iron only", "Copper and salt", "Gold, silver, and diamonds"],
    correct: 0
  },
  {
    question: "What major labor movements started in Ohio?",
    options: [
      "Cotton workers in Cincinnati",
      "Rubber industry strikes in Akron and steelworker unions in Youngstown",
      "Teachers in Columbus",
      "Fishermen in Toledo"
    ],
    correct: 1
  },
  {
    question: "What event in Ohio led to major environmental legislation in the U.S.?",
    options: [
      "The Steel Strike of 1920",
      "The Toledo Riots",
      "The Ohio Flood of 1913",
      "The Cuyahoga River fire of 1969"
    ],
    correct: 3
  },
  {
    question: "What was the Ohio Company of Associates?",
    options: [
      "A group of settlers who helped found Ohio through land purchases",
      "A government agency",
      "A military regiment",
      "A railroad company"
    ],
    correct: 0
  },
  {
    question: "Which Ohio city was a major stop on the Underground Railroad?",
    options: ["Cleveland", "Akron", "Columbus", "Oberlin"],
    correct: 3
  },
  {
    question: "What role did Ohio play in World War II manufacturing?",
    options: [
      "It was not involved",
      "It became a naval base",
      "It produced planes, tanks, and war materials for the Allies",
      "It focused only on farming"
    ],
    correct: 2
  },
  {
    question: "How has Ohio’s economy changed from the 19th century to today?",
    options: [
      "It evolved from manufacturing and agriculture to a diversified modern economy",
      "It became entirely rural",
      "It depends only on coal mining",
      "It declined completely"
    ],
    correct: 0
  }
];

// ====== RANDOMIZE OPTIONS ======
questions.forEach(q => {
  const correctAnswer = q.options[q.correct];
  q.options = q.options.sort(() => Math.random() - 0.5);
  q.correct = q.options.indexOf(correctAnswer);
});

// ====== STATE ======
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

// ====== SCREEN MANAGEMENT ======
function showScreen(id) {
  [introScreen, testScreen, overviewScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).classList.add("active");
}

// ====== LOAD QUESTION ======
function loadQuestion() {
  const q = questions[currentQuestion];
  questionTitle.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, index) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="question" value="${index}" ${
      answers[currentQuestion] === index ? "checked" : ""
    }>
      ${opt}
    `;
    optionsContainer.appendChild(label);
  });

  progressText.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

// ====== NEXT BUTTON ======
nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="question"]:checked');
  if (selected) {
    answers[currentQuestion] = parseInt(selected.value);
  } else {
    const confirmSkip = confirm("You haven’t selected an answer. Proceed?");
    if (!confirmSkip) return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    generateOverview();
    showScreen("overview");
  }
});

// ====== OVERVIEW ======
function generateOverview() {
  overviewGrid.innerHTML = "";
  answers.forEach((ans, i) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.index = i;
    if (ans === null) box.classList.add("unanswered");
    box.textContent = i + 1;
    overviewGrid.appendChild(box);
  });
}

// ====== CLICKABLE OVERVIEW BOXES ======
document.addEventListener("click", (e) => {
  const box = e.target.closest(".overview-grid .box");
  if (!box) return;
  const qIndex = parseInt(box.dataset.index);
  if (!isNaN(qIndex)) {
    currentQuestion = qIndex;
    loadQuestion();
    showScreen("test");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// ====== SUBMIT BUTTON ======
submitBtn.addEventListener("click", () => {
  const correctCount = answers.reduce(
    (acc, ans, i) => (ans === questions[i].correct ? acc + 1 : acc),
    0
  );
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  scoreText.innerHTML = `
    <div class="score-text">You got ${correctCount} / ${questions.length} correct (${scorePercent}%).</div>
    <button id="reviewBtn" class="review-btn">Review Answers</button>
  `;
  showScreen("result");
  document.getElementById("reviewBtn").addEventListener("click", startReview);
});

// ===== REVIEW ANSWERS =====
const reviewSection = document.getElementById("reviewSection");
const reviewQuestion = document.getElementById("reviewQuestion");
const prevReviewBtn = document.getElementById("prevReviewBtn");
const nextReviewBtn = document.getElementById("nextReviewBtn");
const exitReviewBtn = document.getElementById("exitReviewBtn");
let currentReviewIndex = 0;

function startReview() {
  reviewSection.classList.remove("hidden");
  currentReviewIndex = 0;
  showReviewQuestion(currentReviewIndex);
}

function showReviewQuestion(index) {
  const q = questions[index];
  const userAnswer = answers[index];
  reviewQuestion.innerHTML = `
    <h3>Question ${index + 1}: ${q.question}</h3>
    <div class="review-options">
      ${q.options.map((opt, i) => {
        let cls = "";
        if (i === q.correct) cls = "correct";
        if (i === userAnswer && userAnswer !== q.correct) cls = "wrong";
        return `<div class="review-option ${cls}">${String.fromCharCode(65 + i)}. ${opt}</div>`;
      }).join("")}
    </div>
  `;
}

nextReviewBtn.addEventListener("click", () => {
  if (currentReviewIndex < questions.length - 1) {
    currentReviewIndex++;
    showReviewQuestion(currentReviewIndex);
  }
});

prevReviewBtn.addEventListener("click", () => {
  if (currentReviewIndex > 0) {
    currentReviewIndex--;
    showReviewQuestion(currentReviewIndex);
  }
});

exitReviewBtn.addEventListener("click", () => {
  reviewSection.classList.add("hidden");
});

// ====== START BUTTON ======
startBtn.addEventListener("click", () => {
  currentQuestion = 0;
  answers = new Array(questions.length).fill(null);
  loadQuestion();
  showScreen("test");
});

// ====== RESTART BUTTON ======
restartBtn.addEventListener("click", () => {
  showScreen("intro");
});

// ====== INITIALIZE ======
showScreen("intro");
