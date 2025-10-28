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
    question: "When was the current Ohio Constitution ratified?",
    options: ["March 15, 1803", "June 17, 1851", "July 4, 1865", "November 3, 1901"],
    correct: 1
  },
  {
    question: "What major issues led to the 1851 Ohio Constitution?",
    options: [
      "Disagreements with the U.S. Supreme Court over slavery",
      "Need to reduce legislative power, impose debt limits, allow for judges’ election, deal with special laws, and make the government more responsive",
      "Disputes over Ohio’s borders with Michigan",
      "Desire to establish a bicameral legislature"
    ],
    correct: 1
  },
  {
    question: "How is the Ohio Constitution different from the U.S. Constitution in structure?",
    options: [
      "It is shorter and less detailed than the U.S. Constitution",
      "It contains only federal-level laws",
      "The Ohio Constitution has more detail, enumerates local government powers, and provides for state-specific rights and processes",
      "It was never ratified by the people of Ohio"
    ],
    correct: 2
  },
  {
    question: "What is Article I of the Ohio Constitution about?",
    options: [
      "The Bill of Rights (rights of individuals)",
      "The Executive Branch",
      "The General Assembly",
      "Education and taxation"
    ],
    correct: 0
  },
  {
    question: "What is the initiative process in Ohio?",
    options: [
      "Citizens can collect signatures to propose laws or constitutional amendments that go to voters for approval",
      "Legislators introduce a bill that must be approved by citizens",
      "The governor can directly change laws",
      "Courts review proposed amendments before voting"
    ],
    correct: 0
  },
  {
    question: "What is the referendum process in Ohio?",
    options: [
      "The governor vetoes a law and calls for a public vote",
      "Citizens can collect signatures to submit laws passed by the General Assembly to the electorate for acceptance or rejection",
      "Judges decide whether a law should stand",
      "The legislature reconsiders a previously passed bill"
    ],
    correct: 1
  },
  {
    question: "Can Ohio citizens recall elected officials under the Ohio Constitution?",
    options: [
      "Yes, any official can be recalled with 5,000 signatures",
      "No, Ohio does not have statewide recall of elected officials under the current constitution",
      "Only the governor can be recalled",
      "Yes, but only for local city officials"
    ],
    correct: 1
  },
  {
    question: "What protections are offered under freedom of speech and press in Ohio?",
    options: [
      "Speech is only protected in newspapers",
      "Freedom of speech is limited to government settings",
      "Press freedom applies only to state-owned media",
      "Article I guarantees freedom of speech and press, similar to the First Amendment"
    ],
    correct: 3
  },
  {
    question: "What is the “supremacy clause” and how does it relate to Ohio’s Constitution?",
    options: [
      "Ohio law overrides all federal laws",
      "Federal law overrides conflicting state laws; Ohio’s Constitution must conform to the U.S. Constitution and federal law",
      "The governor decides which laws take precedence",
      "It allows local governments to override the state constitution"
    ],
    correct: 1
  },
  {
    question: "What does “due process of law” mean under the Ohio Constitution?",
    options: [
      "It allows the governor to pardon anyone",
      "It refers to taxes being paid on time",
      "The government must follow fair procedures before depriving a person of life, liberty, or property",
      "Only criminal defendants are entitled to hearings"
    ],
    correct: 2
  },
  {
    question: "What does Ohio’s Constitution say about public education?",
    options: [
      "It establishes only private education systems",
      "It provides for the support and maintenance of a thorough and efficient system of public education",
      "It leaves education entirely to local governments",
      "It requires tuition for public schools"
    ],
    correct: 1
  },
  {
    question: "True or False: The Ohio General Assembly can override a section of the Ohio Constitution by passing a statute.",
    options: ["True", "False"],
    correct: 1
  },
  {
    question: "What is Article II of the Ohio Constitution about?",
    options: [
      "The Legislative branch: the General Assembly",
      "The Executive branch",
      "The Judicial branch",
      "Local governments"
    ],
    correct: 0
  },
  {
    question: "What is Article III of the Ohio Constitution about?",
    options: [
      "The Executive branch — powers of the Governor and other executive officers",
      "The Judicial branch",
      "The Bill of Rights",
      "Elections and voting procedures"
    ],
    correct: 0
  },
  {
    question: "What is the process for amending the Ohio Constitution?",
    options: [
      "Proposed by the General Assembly or citizen initiative, then submitted to voters for majority approval",
      "Amendments are decided by the Governor",
      "Only Congress can approve changes",
      "Through a Supreme Court decision"
    ],
    correct: 0
  },
  {
    question: "What is the single-subject rule in Ohio lawmaking?",
    options: [
      "It requires each law to address only one subject to prevent 'logrolling'",
      "It allows multiple subjects to be added to one bill",
      "It requires all bills to include at least three subjects",
      "It applies only to tax laws"
    ],
    correct: 0
  },
  {
    question: "What is Article XVIII of the Ohio Constitution about?",
    options: [
      "Municipal corporations, local self-government, and home rule powers",
      "Education and taxation",
      "Judicial powers",
      "Elections and voting"
    ],
    correct: 0
  },
  {
    question: "When was Ohio’s last full constitutional convention held?",
    options: ["1851", "1877", "1912", "2001"],
    correct: 2
  },
  {
    question: "How often must Ohio consider calling a constitutional convention?",
    options: [
      "Every 10 years",
      "Every 20 years",
      "Every 50 years",
      "Whenever the governor requests"
    ],
    correct: 1
  },
  {
    question: "How does the Ohio Constitution limit the power of the General Assembly?",
    options: [
      "By imposing procedural rules, debt limits, and subject restrictions",
      "By letting the governor veto any law",
      "By allowing courts to suspend legislators",
      "By requiring federal approval of all bills"
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
