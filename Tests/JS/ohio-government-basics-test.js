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
    question: "What are the three branches of Ohio’s government?",
    options: [
      "Legislative, Executive, and Judicial",
      "Federal, State, and Local",
      "Senate, House, and Courts",
      "Civil, Criminal, and Administrative"
    ],
    correct: 0
  },
  {
    question: "How many counties are there in Ohio?",
    options: ["75", "80", "88", "92"],
    correct: 2
  },
  {
    question: "Who is the head of the executive branch in Ohio?",
    options: ["The Chief Justice", "The Governor", "The Speaker of the House", "The Auditor"],
    correct: 1
  },
  {
    question: "What is the name of Ohio’s legislative body?",
    options: ["The Ohio General Assembly", "The Ohio State Congress", "The Ohio Parliament", "The Ohio Legislature"],
    correct: 0
  },
  {
    question: "How many houses make up the Ohio General Assembly?",
    options: ["One", "Two", "Three", "Four"],
    correct: 1
  },
  {
    question: "What are the two chambers of the Ohio General Assembly?",
    options: [
      "Senate and House of Representatives",
      "House and Council",
      "Assembly and Commission",
      "Council and Court"
    ],
    correct: 0
  },
  {
    question: "How long is a term for an Ohio State Senator?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correct: 1
  },
  {
    question: "How long is a term for an Ohio State Representative?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correct: 0
  },
  {
    question: "Who signs bills into law in Ohio?",
    options: ["The Lieutenant Governor", "The Governor", "The Speaker of the House", "The Secretary of State"],
    correct: 1
  },
  {
    question: "What is the highest court in Ohio?",
    options: [
      "The Court of Appeals",
      "The Supreme Court of Ohio",
      "The District Court",
      "The Federal Court of Ohio"
    ],
    correct: 1
  },
  {
    question: "How many justices are on the Ohio Supreme Court?",
    options: ["5", "6", "7", "9"],
    correct: 2
  },
  {
    question: "What does the Ohio Secretary of State oversee?",
    options: [
      "Public Safety",
      "State Elections and Business Filings",
      "Education",
      "Transportation"
    ],
    correct: 1
  },
  {
    question: "Who is responsible for auditing state funds in Ohio?",
    options: [
      "The Treasurer",
      "The Auditor of State",
      "The Comptroller",
      "The Governor"
    ],
    correct: 1
  },
  {
    question: "Who manages the state’s money and investments?",
    options: [
      "The Auditor of State",
      "The Treasurer of State",
      "The Governor",
      "The Controller"
    ],
    correct: 1
  },
  {
    question: "Which level of government runs counties and cities?",
    options: ["State Government", "Local Government", "Federal Government", "Judicial Branch"],
    correct: 1
  },
  {
    question: "Who leads the executive branch of a city government?",
    options: ["The Mayor", "The Governor", "The Council President", "The Sheriff"],
    correct: 0
  },
  {
    question: "What is the role of a county auditor?",
    options: [
      "Collecting taxes",
      "Assessing property values and maintaining records",
      "Arresting criminals",
      "Passing laws"
    ],
    correct: 1
  },
  {
    question: "How old must you be to vote in Ohio?",
    options: ["16", "17", "18", "21"],
    correct: 2
  },
  {
    question: "How many days before an election must you register to vote in Ohio?",
    options: ["15", "30", "60", "90"],
    correct: 1
  },
  {
    question: "What is Ohio’s capital city?",
    options: ["Cleveland", "Cincinnati", "Columbus", "Toledo"],
    correct: 2
  },
  {
    question: "What are local laws called?",
    options: ["Acts", "Ordinances", "Bills", "Motions"],
    correct: 1
  },
  {
    question: "What document serves as the foundation of Ohio’s government?",
    options: ["The U.S. Constitution", "The Ohio Constitution", "The Declaration of Independence", "The Bill of Rights"],
    correct: 1
  },
  {
    question: "What is the minimum age to become Governor of Ohio?",
    options: ["18", "21", "25", "30"],
    correct: 2
  },
  {
    question: "Who becomes Governor if the Governor dies or resigns?",
    options: ["Attorney General", "Lieutenant Governor", "Secretary of State", "Speaker of the House"],
    correct: 1
  },
  {
    question: "What branch of government interprets laws?",
    options: ["Legislative", "Executive", "Judicial", "Local"],
    correct: 2
  },
  {
    question: "Which branch enforces the laws?",
    options: ["Legislative", "Judicial", "Executive", "Administrative"],
    correct: 2
  },
  {
    question: "Which branch makes the laws?",
    options: ["Legislative", "Judicial", "Executive", "Local"],
    correct: 0
  },
  {
    question: "How many constitutions has Ohio had?",
    options: ["1", "2", "3", "4"],
    correct: 1
  },
  {
    question: "When did Ohio become a state?",
    options: ["1790", "1803", "1820", "1850"],
    correct: 1
  },
  {
    question: "Who was Ohio’s first Governor?",
    options: ["William Henry Harrison", "Edward Tiffin", "Thomas Worthington", "James Garfield"],
    correct: 1
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
