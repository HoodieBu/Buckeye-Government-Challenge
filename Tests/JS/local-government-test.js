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
    question: "How many counties are there in Ohio?",
    options: ["75", "80", "88", "92"],
    correct: 2
  },
  {
    question: "What is the main governing body at the county level in Ohio?",
    options: [
      "County Sheriff",
      "County Auditor",
      "County Treasurer",
      "The Board of County Commissioners"
    ],
    correct: 3
  },
  {
    question: "Who oversees property records, deeds and real-estate transactions at the county level?",
    options: [
      "County Engineer",
      "County Recorder",
      "County Auditor",
      "County Treasurer"
    ],
    correct: 1
  },
  {
    question: "What is the role of the County Auditor?",
    options: [
      "Manages schools",
      "Runs local elections",
      "Assesses property values for taxation and oversees county finances",
      "Supervises sheriffs"
    ],
    correct: 2
  },
  {
    question: "Who is responsible for collecting property taxes in each county?",
    options: [
      "County Auditor",
      "County Treasurer",
      "County Engineer",
      "County Recorder"
    ],
    correct: 1
  },
  {
    question: "What does a County Sheriff do?",
    options: [
      "Issues property deeds",
      "Collects taxes",
      "Enforces county and state laws, manages the county jail, and provides court security",
      "Runs elections"
    ],
    correct: 2
  },
  {
    question: "What is the difference between a city and a village in Ohio?",
    options: [
      "Cities have mayors, villages do not",
      "Cities have a population of 5,000 or more; villages have fewer than 5,000",
      "Villages must have charters",
      "Cities are governed by counties"
    ],
    correct: 1
  },
  {
    question: "What is a charter city under Ohio law?",
    options: [
      "A city that adopts its own charter under home-rule authority",
      "A city run by the state",
      "A city with a special mayor",
      "A capital city"
    ],
    correct: 0
  },
  {
    question: "What is the role of the mayor in a mayor-council form of city government?",
    options: [
      "Runs the courts",
      "Oversees state law",
      "Enforces city ordinances and manages city administration",
      "Votes on council matters"
    ],
    correct: 2
  },
  {
    question: "How does a city manager government differ from a mayor-council government?",
    options: [
      "The mayor hires the council",
      "The council hires a professional manager to run operations",
      "The governor appoints the mayor",
      "There is no city council"
    ],
    correct: 1
  },
  {
    question: "What powers are granted under home rule authority to municipalities?",
    options: [
      "Control state laws",
      "Adopt charters, enact ordinances, levy taxes, and regulate services",
      "Elect federal officials",
      "Change the state constitution"
    ],
    correct: 1
  },
  {
    question: "What are the three main types of local government units in Ohio?",
    options: [
      "Counties, Municipalities, and Townships",
      "Cities, Villages, and Districts",
      "Regions, Wards, and Counties",
      "Counties, Cities, and States"
    ],
    correct: 0
  },
  {
    question: "What is the function of township trustees?",
    options: [
      "Oversee schools",
      "Govern the township, adopt budgets, and oversee services",
      "Run elections",
      "Enforce state laws"
    ],
    correct: 1
  },
  {
    question: "Who enforces local laws and ordinances in an Ohio township?",
    options: [
      "State Troopers",
      "Town Mayor",
      "Zoning board, township trustees, or county sheriff",
      "Federal Agents"
    ],
    correct: 2
  },
  {
    question: "How do school districts fit into Ohio’s local government system?",
    options: [
      "They are independent local units with elected boards",
      "Run by mayors",
      "Supervised by counties",
      "Controlled by the governor"
    ],
    correct: 0
  },
  {
    question: "Who is responsible for setting policies in a local Ohio school district?",
    options: [
      "Teachers",
      "Parents",
      "The School Board (Board of Education)",
      "Mayor"
    ],
    correct: 2
  },
  {
    question: "What are special districts in Ohio, and what do they do?",
    options: [
      "Entities created for specific services like fire, water, or transit",
      "Private businesses",
      "Counties",
      "State agencies"
    ],
    correct: 0
  },
  {
    question: "Who oversees public health departments at the county level?",
    options: [
      "County Sheriff",
      "Mayor",
      "County Health Commissioner or Board of Health",
      "County Auditor"
    ],
    correct: 2
  },
  {
    question: "What is a levy, and how does it affect local taxation?",
    options: [
      "A spending cut",
      "A voter-approved tax measure that raises property tax for a purpose",
      "A court ruling",
      "A state law"
    ],
    correct: 1
  },
  {
    question: "How can citizens propose local ordinances or charter changes?",
    options: [
      "By petition to place the issue on the ballot",
      "By calling the mayor",
      "By emailing the governor",
      "Through state legislature"
    ],
    correct: 0
  },
  {
    question: "What is the role of the local board of elections?",
    options: [
      "Oversees schools",
      "Administers county elections and certifies results",
      "Handles taxes",
      "Issues driver’s licenses"
    ],
    correct: 1
  },
  {
    question: "What responsibilities does a county engineer have?",
    options: [
      "Maintains county roads, bridges, and drainage systems",
      "Manages elections",
      "Collects taxes",
      "Runs jails"
    ],
    correct: 0
  },
  {
    question: "Which local official issues building permits and zoning regulations?",
    options: [
      "County Recorder",
      "County Treasurer",
      "Zoning administrator or building department",
      "Township trustee"
    ],
    correct: 2
  },
  {
    question: "What is a township fiscal officer?",
    options: [
      "Town Clerk",
      "An elected official who handles township finances",
      "Auditor General",
      "Taxpayer Advocate"
    ],
    correct: 1
  },
  {
    question: "What is the difference between incorporated and unincorporated areas?",
    options: [
      "Incorporated areas are within municipalities; unincorporated areas are governed by township/county",
      "One pays no taxes",
      "One has no elections",
      "They are the same"
    ],
    correct: 0
  },
  {
    question: "How can residents annex land from a township into a city?",
    options: [
      "Through petition, agreement, or vote following state law",
      "By mayoral decree",
      "By court order",
      "By request to the governor"
    ],
    correct: 0
  },
  {
    question: "What is the purpose of local referendums and initiatives?",
    options: [
      "To allow citizens to approve or reject laws or charter amendments",
      "To raise taxes automatically",
      "To appoint new officials",
      "To approve state laws"
    ],
    correct: 0
  },
  {
    question: "How do local governments raise revenue aside from property taxes?",
    options: [
      "Through fees, local income taxes, grants, and special assessments",
      "By federal loans only",
      "From lotteries",
      "From private donations"
    ],
    correct: 0
  },
  {
    question: "Who provides emergency services (police, fire, EMS) in most townships?",
    options: [
      "Townships directly or through county/municipal contracts",
      "Federal agencies",
      "The state patrol",
      "Private companies"
    ],
    correct: 0
  },
  {
    question: "True or False: All Ohio cities must follow the same form of government outlined by the state constitution.",
    options: ["True", "False"],
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
