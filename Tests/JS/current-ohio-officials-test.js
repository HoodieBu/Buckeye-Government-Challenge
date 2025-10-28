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
    question: "Who is the current Governor of Ohio?",
    options: ["Mike DeWine", "Jim Renacci", "Jon Husted", "Frank LaRose"],
    correct: 0
  },
  {
    question: "Who is the Lieutenant Governor of Ohio?",
    options: ["Dave Yost", "Sharon L. Kennedy", "Jim Tressel", "Matt Huffman"],
    correct: 2
  },
  {
    question: "Who is the Ohio Attorney General?",
    options: ["Frank LaRose", "Mike DeWine", "Dave Yost", "Keith Faber"],
    correct: 2
  },
  {
    question: "Who is the Ohio Secretary of State?",
    options: ["Keith Faber", "Frank LaRose", "Robert Sprague", "Dave Yost"],
    correct: 1
  },
  {
    question: "Who is the Ohio Auditor of State?",
    options: ["Dave Yost", "Mike DeWine", "Keith Faber", "Frank LaRose"],
    correct: 2
  },
  {
    question: "Who is the Ohio Treasurer of State?",
    options: ["Keith Faber", "Robert Sprague", "Jim Tressel", "Matt Huffman"],
    correct: 1
  },
  {
    question: "Who is the Chief Justice of the Ohio Supreme Court?",
    options: ["Mike DeWine", "Matt Huffman", "Sharon L. Kennedy", "Dave Yost"],
    correct: 2
  },
  {
    question: "How many justices serve on the Ohio Supreme Court?",
    options: ["Five", "Six", "Seven", "Nine"],
    correct: 2
  },
  {
    question: "Who is the Speaker of the Ohio House of Representatives?",
    options: ["Matt Huffman", "Rob McColley", "Frank LaRose", "Dave Yost"],
    correct: 0
  },
  {
    question: "Who is the President of the Ohio Senate?",
    options: ["Jon Husted", "Rob McColley", "Keith Faber", "Sharon L. Kennedy"],
    correct: 1
  },
  {
    question: "What is one responsibility of the Ohio Secretary of State?",
    options: ["Audit public funds", "Lead education department", "Approve the budget", "Oversee state elections"],
    correct: 3
  },
  {
    question: "What is one responsibility of the Ohio Auditor of State?",
    options: ["Oversee elections", "Audit public offices", "Sign bills", "Lead the courts"],
    correct: 1
  },
  {
    question: "How often are Ohio’s state executive offices elected?",
    options: ["Every 2 years", "Every 4 years", "Every 6 years", "Every 8 years"],
    correct: 1
  },
  {
    question: "What is the term length for an Ohio Supreme Court justice?",
    options: ["4 years", "6 years", "8 years", "10 years"],
    correct: 1
  },
  {
    question: "How are legislative leaders chosen in the Ohio General Assembly?",
    options: ["Elected by chamber members", "Appointed by Governor", "Chosen by judiciary", "Popular vote"],
    correct: 0
  },
  {
    question: "Who represents Ohio in the U.S. Senate?",
    options: ["Two Senators", "One Senator", "Three Senators", "Fifteen Senators"],
    correct: 0
  },
  {
    question: "How many U.S. House Representatives does Ohio have?",
    options: ["12", "15", "16", "18"],
    correct: 1
  },
  {
    question: "How can citizens find their state legislator in Ohio?",
    options: ["By address on the Ohio Legislature site", "By visiting the courthouse", "By calling 911", "Through the Secretary of State only"],
    correct: 0
  },
  {
    question: "What major department is under the Governor’s oversight?",
    options: ["Department of Education and Workforce", "Supreme Court", "State Senate", "General Assembly"],
    correct: 0
  },
  {
    question: "What is one duty of the Lieutenant Governor of Ohio?",
    options: ["Preside over the courts", "Approve judicial rulings", "Assume governorship if needed", "Lead the Senate"],
    correct: 2
  },
  {
    question: "What is one power of the Ohio General Assembly regarding the state budget?",
    options: ["They veto bills", "They conduct audits", "They pass and amend the budget", "They enforce the budget"],
    correct: 2
  },
  {
    question: "What is one way citizens can contact their state legislators?",
    options: ["By email or attending town halls", "Through federal offices", "Via social media ads", "They cannot contact legislators"],
    correct: 0
  },
  {
    question: "What is the political majority party in the Ohio House as of 2025?",
    options: ["Democratic Party", "Independent Party", "Republican Party", "Libertarian Party"],
    correct: 2
  },
  {
    question: "What is the political majority party in the Ohio Senate as of 2025?",
    options: ["Democratic Party", "Republican Party", "Green Party", "Libertarian Party"],
    correct: 1
  },
  {
    question: "How long does the Ohio Governor’s term last?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correct: 1
  },
  {
    question: "When is the next Ohio gubernatorial election scheduled?",
    options: ["2025", "2026", "2027", "2028"],
    correct: 1
  },
  {
    question: "What is the Ohio Secretary of State’s role in relation to elections?",
    options: ["Approve judicial rulings", "Oversee statewide elections", "Lead the Senate", "Audit budgets"],
    correct: 1
  },
  {
    question: "Who audits Ohio’s public schools and local governments financially?",
    options: ["Ohio Auditor of State", "Secretary of State", "Governor’s Office", "Treasurer’s Office"],
    correct: 0
  },
  {
    question: "What is one recent initiative by the Ohio Senate or Governor in 2025?",
    options: ["Property tax reform", "New Supreme Court justice", "Constitutional amendment", "New county divisions"],
    correct: 0
  },
  {
    question: "True or False: Ohio’s state executive offices all have the same term length.",
    options: ["True", "False"],
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
