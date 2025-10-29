/***********************
 * Slides for each section
 ***********************/
const ALL_SECTIONS = {
  'historyandstructure': [
    { title: "Section 1: Ohio’s Current Constitution", content: "The current Ohio Constitution was ratified on June 17, 1851, replacing the 1802 version to reduce legislative power, limit debt, and increase voter control." },
    { title: "Section 2: Differences from the U.S. Constitution", content: "Ohio’s Constitution is more detailed, with specific provisions for local governments, amendments, and rights that go beyond the U.S. Constitution." },
    { title: "Section 3: Articles and Branches", content: "Article I covers the Bill of Rights; Article II creates the General Assembly; Article III establishes the Executive Branch — forming the state’s structure of government." },
  ],

  'billofrights': [
    { title: "Section 1: Individual Freedoms", content: "Article I guarantees freedoms like speech, religion, press, petition, and assembly — similar to the U.S. Bill of Rights but often interpreted independently." },
    { title: "Section 2: Due Process and Legal Protections", content: "The Ohio Constitution ensures fair procedures before depriving life, liberty, or property and protects against double jeopardy and self-incrimination." },
    { title: "Section 3: Searches, Seizures, and Jury Rights", content: "Ohio law requires probable cause for searches and preserves the right to a jury trial in certain cases to protect fairness and justice." },
  ],

  'citizenpowers': [
    { title: "Section 1: Initiative and Referendum", content: "Ohio citizens can collect signatures to propose (initiative) or challenge (referendum) laws through statewide or local ballots — a key direct democracy tool." },
    { title: "Section 2: Constitutional Amendments", content: "Amendments may be proposed by the General Assembly (2/3 vote each house) or by citizens via petition, then approved by a majority of voters." },
    { title: "Section 3: Constitutional Conventions", content: "Every 20 years, Ohio must ask voters if a convention should be held to rewrite or revise the Constitution — the last full one was in 1912." },
  ],

  'rightsandprotections': [
    { title: "Section 1: Crime Victims’ Rights", content: "Amendments to the Ohio Constitution protect crime victims by ensuring notice of proceedings, safety, and restitution rights." },
    { title: "Section 2: Civil Liberties vs. Civil Rights", content: "Civil liberties protect against government interference (like free speech), while civil rights ensure equal treatment for all citizens." },
    { title: "Section 3: Education and Equality", content: "The Ohio Constitution mandates a 'thorough and efficient' system of public education and safeguards equal rights under law." },
  ],

  'governmentlimits': [
    { title: "Section 1: Limits on Legislative Power", content: "The General Assembly is limited by rules like reading bills three times, avoiding multiple subjects per law, and maintaining debt limits." },
    { title: "Section 2: Supremacy of Federal Law", content: "The U.S. Constitution’s Supremacy Clause means federal law overrides conflicting state laws; Ohio’s Constitution must comply with it." },
    { title: "Section 3: State vs. Federal Rights", content: "Ohio’s Constitution can provide stronger protections than the U.S. Constitution, interpreted independently by state courts." },
  ],

  'civicresponsibility': [
    { title: "Section 1: Citizens and Accountability", content: "Ohio citizens protect constitutional government by voting, staying informed, and holding officials accountable through civic engagement." },
    { title: "Section 2: Local Self-Government", content: "Article XVIII grants cities and villages the power of self-government — letting them adopt charters and manage local affairs." },
    { title: "Section 3: Importance of Knowing Rights", content: "Understanding your constitutional rights helps recognize when they’re violated and ensures active, informed participation in democracy." },
  ]
};

/***********************
 * Presentation & Minigames - Fixed Implementation
 ***********************/
(function () {
  /* ---------- DOM refs ---------- */
  const sectionsGrid = document.getElementById('sectionsGrid');
  const menuWrap = document.getElementById('menuWrap');
  const presentationContainer = document.getElementById('presentationContainer');
  const backButton = document.getElementById('backButton');
  const progressWrapper = document.querySelector('.progress-wrapper');
  const progressStepsEl = document.getElementById('progressSteps');
  const studyContent = document.getElementById('studyContent');
  const titleEl = document.getElementById('sectionTitle');
  const contentEl = document.getElementById('sectionContent');
  const nextBtn = document.getElementById('nextBtn');

  /* ---------- state ---------- */
  let progressFillEl = null;
  let circles = [];
  let slides = [];
  let current = 0;
  let onNextClick = null;
  let onKeyDown = null;
  let onResize = null;
  let activeKey = null;

  /* ---------- safe cleanup ---------- */
  function cleanupPresentation() {
    // Remove any game overlays
    document.querySelectorAll('.overlay-game').forEach(e => e.remove());
    
    // Reset presentation container
    if (studyContent) {
      studyContent.style.display = '';
      studyContent.style.height = '';
      studyContent.style.overflow = '';
      studyContent.style.margin = '';
      studyContent.style.padding = '';
    }
    if (progressWrapper) {
      progressWrapper.style.display = '';
      progressWrapper.style.height = '';
      progressWrapper.style.overflow = '';
      progressWrapper.style.margin = '';
      progressWrapper.style.padding = '';
    }
    if (presentationContainer) {
      presentationContainer.style.display = '';
      presentationContainer.style.flexDirection = '';
      presentationContainer.style.height = '';
      presentationContainer.style.minHeight = '';
      presentationContainer.style.padding = '';
      presentationContainer.style.margin = '';
    }

    // Remove event listeners
    if (onNextClick) {
      nextBtn.removeEventListener('click', onNextClick);
      onNextClick = null;
    }
    if (onKeyDown) {
      window.removeEventListener('keydown', onKeyDown);
      onKeyDown = null;
    }
    if (onResize) {
      window.removeEventListener('resize', onResize);
      onResize = null;
    }

    // Clear progress fill
    if (progressFillEl && progressFillEl.parentNode) {
      progressFillEl.remove();
      progressFillEl = null;
    }
  }

// ===== Intro Screen Logic (Always Show) =====
document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const startBtn = document.getElementById("startBtn");

  // Always show the intro
  introScreen.style.display = "flex";

  startBtn.addEventListener("click", () => {
    introScreen.classList.add("fade-out");
    setTimeout(() => {
      introScreen.style.display = "none";
    }, 1000); // match fade-out duration
  });
});




  /* ---------- complete topic - SINGLE DEFINITION ---------- */
  function completeTopic(key) {
    cleanupPresentation();
    presentationContainer.classList.remove('presentation-active');
    
    // Fully restore all containers for next use
    if (progressWrapper) {
      progressWrapper.style.cssText = '';
    }
    if (studyContent) {
      studyContent.style.cssText = '';
    }
    const studySection = document.querySelector('.study-section');
    if (studySection) {
      studySection.style.cssText = '';
    }
    if (presentationContainer) {
      presentationContainer.style.cssText = '';
    }
    if (backButton) {
      backButton.style.cssText = '';
    }
    
    // Show menu
    if (menuWrap) menuWrap.style.display = '';

    const card = document.querySelector(`.section-card[data-key="${key}"]`);
    if (card) {
      card.classList.add('completed-topic');
      card.textContent = '✅ Completed';
      card.style.pointerEvents = 'none';
    }
  }

  /* ---------- helper functions ---------- */
  function markCompleted(index) {
    const el = circles[index];
    if (!el) return;
    el.classList.add('completed');
    const num = el.querySelector('.num');
    if (num) num.textContent = '✔';
  }
  
  function setActive(index) {
    circles.forEach((el, idx) => el.classList.toggle('active', idx === index));
  }
  
  function updateLineProgress() {
    if (!progressFillEl || circles.length === 0) return;
    const wrapperRect = progressWrapper.getBoundingClientRect();
    const centers = circles.map(c => {
      const r = c.getBoundingClientRect();
      return (r.left + r.right) / 2 - wrapperRect.left;
    });
    const firstCenter = centers[0];
    const currentCenter = centers[Math.min(current, centers.length - 1)];
    progressFillEl.style.left = Math.round(firstCenter) + 'px';
    progressFillEl.style.width = Math.max(0, Math.round(currentCenter - firstCenter)) + 'px';
  }

  function goToSlide(skipFade = false) {
    const s = slides[current];
    if (!s) return;
    titleEl.textContent = s.title;
    contentEl.textContent = s.content;
    setActive(current);
    circles.forEach((el, idx) => {
      if (idx < current) markCompleted(idx);
      else el.classList.remove('completed');
    });
    updateLineProgress();
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.textContent = (current === slides.length - 1) ? 'Finish' : 'Continue →';
    }
  }

  function initPresentationFor(slideSet, key) {
    cleanupPresentation();
    slides = slideSet || [];
    current = 0;
    activeKey = key;

    if (menuWrap) menuWrap.style.display = 'none';
    presentationContainer.classList.add('presentation-active');
    
    // Ensure presentation elements are visible and properly styled
    if (progressWrapper) {
      progressWrapper.style.cssText = '';
      progressWrapper.style.display = '';
    }
    if (studyContent) {
      studyContent.style.cssText = '';
      studyContent.style.display = '';
    }
    const studySection = document.querySelector('.study-section');
    if (studySection) {
      studySection.style.cssText = '';
    }
    if (presentationContainer) {
      presentationContainer.style.cssText = '';
      presentationContainer.style.display = 'block';
    }
    if (backButton) {
      backButton.style.cssText = '';
    }

    progressFillEl = document.createElement('div');
    progressFillEl.className = 'progress-fill';
    progressWrapper.appendChild(progressFillEl);

    progressStepsEl.innerHTML = '';
    circles = [];
    slides.forEach((_, i) => {
      const c = document.createElement('button');
      c.type = 'button';
      c.className = 'circle';
      c.setAttribute('data-index', i);
      const span = document.createElement('span');
      span.className = 'num';
      span.textContent = (i + 1);
      c.appendChild(span);
      progressStepsEl.appendChild(c);
      circles.push(c);
      c.addEventListener('click', (ev) => {
        const idx = Number(ev.currentTarget.getAttribute('data-index'));
        if (isNaN(idx)) return;
        current = idx;
        goToSlide(true);
      });
    });

    onResize = () => updateLineProgress();
    window.addEventListener('resize', onResize);

    onNextClick = function () {
      if (current < slides.length - 1) {
        markCompleted(current);
        current++;
        goToSlide();
      } else {
        markCompleted(current);
        nextBtn.disabled = true;
        nextBtn.textContent = '✅ Finished';

    if (key === 'historyandstructure') {
        launchMatchGame(key);
        } else if (key === 'billofrights') {
        launchBillOfRightsGame(key);
        } else if (key === 'citizenpowers') {
        launchCitizenPowersMatchGame(key);
        } else if (key === 'rightsandprotections') { 
        launchRightsProtectionsGame(key)
        } else if (key === 'governmentlimits') { 
        launchGovernmentLimitsGame(key)
        } else if (key === 'civicresponsibility') {
        launchMailSorterGame(key)
        } else {
        completeTopic(key);
        }
      }
    };
    nextBtn.addEventListener('click', onNextClick);

    onKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        if (current < slides.length - 1) { markCompleted(current); current++; goToSlide(); }
      } else if (e.key === 'ArrowLeft') {
        if (current > 0) { current--; goToSlide(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    goToSlide(true);
    requestAnimationFrame(updateLineProgress);
  }

  sectionsGrid.addEventListener('click', ev => {
    const card = ev.target.closest('.section-card');
    if (!card || card.classList.contains('completed-topic')) return;
    const key = card.dataset.key;
    const slideSet = ALL_SECTIONS[key];
    if (!slideSet) { alert('Slides unavailable.'); return; }
    initPresentationFor(slideSet, key);
  });

  backButton.addEventListener('click', () => {
    cleanupPresentation();
    presentationContainer.classList.remove('presentation-active');
    if (menuWrap) menuWrap.style.display = '';
  });

  /* ---------- Helper for overlays ---------- */
  function createOverlayWrapper() {
    // Remove any existing overlays
    document.querySelectorAll('.overlay-game').forEach(e => e.remove());
    
    // Hide progress and study content completely
    if (progressWrapper) {
      progressWrapper.style.display = 'none';
      progressWrapper.style.height = '0';
      progressWrapper.style.overflow = 'hidden';
      progressWrapper.style.margin = '0';
      progressWrapper.style.padding = '0';
    }
    if (studyContent) {
      studyContent.style.display = 'none';
      studyContent.style.height = '0';
      studyContent.style.overflow = 'hidden';
      studyContent.style.margin = '0';
      studyContent.style.padding = '0';
    }
    
    // Set presentation container to flex for proper centering
    if (presentationContainer) {
      presentationContainer.style.display = 'flex';
      presentationContainer.style.flexDirection = 'column';
      presentationContainer.style.alignItems = 'center';
      presentationContainer.style.justifyContent = 'center';
      presentationContainer.style.minHeight = 'calc(100vh - 72px)';
      presentationContainer.style.padding = '20px';
    }
    
    const wrap = document.createElement('div');
    wrap.className = 'overlay-game';
    wrap.style.cssText = `
      width: 100%;
      max-width: 980px;
      margin: 0 auto;
      padding: 30px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    `;
    return wrap;
  }

  /* ---------- Match Game ---------- */
  function launchMatchGame(key) {
  // 🔹 Hide other UI
  if (progressWrapper) progressWrapper.style.cssText = 'display:none!important;height:0!important;';
  if (studyContent) studyContent.style.cssText = 'display:none!important;height:0!important;';
  const studySection = document.querySelector('.study-section');
  if (studySection) studySection.style.cssText = 'display:none!important;height:0!important;';
  if (presentationContainer) presentationContainer.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;background:#eef5f9;';
  if (backButton) { backButton.style.display = 'block'; backButton.style.margin = '20px'; }

  const overlay = createOverlayWrapper();

  overlay.innerHTML = `
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Match the Constitution Facts!</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">Match each statement about Ohio’s Constitution to the correct category.</p>

    <div class="matchGame" style="margin-top:18px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
      <div class="branch" data-office="history" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px;">Historical Context</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem;">When and why Ohio’s Constitution was created</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>

      <div class="branch" data-office="differences" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px;">Key Differences</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem;">How Ohio’s Constitution differs from the U.S. Constitution</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>

      <div class="branch" data-office="structure" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px;">Articles & Structure</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem;">What each part of the Constitution covers</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
    </div>

    <div class="tasks" style="margin-top:25px; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
      <!-- History -->
      <div class="task" draggable="true" data-office="history" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Ratified on June 17, 1851</div>
      <div class="task" draggable="true" data-office="history" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Replaced 1802 Constitution to limit legislative power</div>
      <div class="task" draggable="true" data-office="history" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Aimed to make government more accountable to voters</div>

      <!-- Differences -->
      <div class="task" draggable="true" data-office="differences" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">More detailed than the U.S. Constitution</div>
      <div class="task" draggable="true" data-office="differences" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Specifies local government powers like municipal corporations</div>
      <div class="task" draggable="true" data-office="differences" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Includes processes unique to Ohio, like initiatives and referendums</div>

      <!-- Structure -->
      <div class="task" draggable="true" data-office="structure" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Article I: Bill of Rights</div>
      <div class="task" draggable="true" data-office="structure" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Article II: Legislative Branch (General Assembly)</div>
      <div class="task" draggable="true" data-office="structure" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Article III: Executive Branch (Governor & officers)</div>
    </div>

    <button id="matchCheckBtn" style="margin-top:25px; padding:12px 24px; background:#1b263b; color:white; border:none; border-radius:8px; cursor:pointer; font-size:16px; display:block; margin-left:auto; margin-right:auto;">Check Answers</button>
    <p id="matchMsg" style="margin-top:15px; font-weight:600; text-align:center; font-size:18px;"></p>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Drag logic
  const tasks = overlay.querySelectorAll('.task');
  const dropzones = overlay.querySelectorAll('.dropzone');
  let draggedElement = null;

  tasks.forEach(t => {
    t.addEventListener('dragstart', e => {
      draggedElement = t;
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => (t.style.opacity = '0.5'), 0);
    });
    t.addEventListener('dragend', () => {
      t.style.opacity = '1';
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.style.background = 'rgba(119, 141, 169, 0.2)';
    });
    zone.addEventListener('dragleave', () => {
      zone.style.background = '';
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.style.background = '';
      if (draggedElement) {
        zone.appendChild(draggedElement);
        draggedElement = null;
      }
    });
  });

  // 🔹 Check answers
  overlay.querySelector('#matchCheckBtn').addEventListener('click', function() {
    let correct = 0;
    let total = 0;

    overlay.querySelectorAll('.branch').forEach(o => {
      const zone = o.querySelector('.dropzone');
      zone.querySelectorAll('.task').forEach(t => {
        total++;
        if (t.dataset.office === o.dataset.office) {
          correct++;
          t.style.background = '#00c853';
          t.style.borderColor = '#00c853';
        } else {
          t.style.background = '#e53935';
          t.style.borderColor = '#e53935';
        }
      });
    });

    const msg = overlay.querySelector('#matchMsg');
    if (correct === total && total === 9) {
      msg.textContent = '🎉 Great job! You matched all the constitutional facts correctly!';
      msg.style.color = '#00c853';
      this.style.display = 'none';
      setTimeout(() => completeTopic(key), 2000);
    } else {
      msg.textContent = `You got ${correct} out of ${total} correct. Try again!`;
      msg.style.color = '#e53935';
      setTimeout(() => {
        tasks.forEach(t => {
          t.style.background = '#778da9';
          t.style.borderColor = '#415a77';
        });
        msg.textContent = '';
      }, 2000);
    }
  });
}


  /* ---------- Legislative Quiz Game ---------- */
  function launchBillOfRightsGame(key) {
  // 🔹 Hide presentation layout elements
  if (progressWrapper) progressWrapper.style.cssText = 'display:none!important;height:0!important;';
  if (studyContent) studyContent.style.cssText = 'display:none!important;height:0!important;';
  const studySection = document.querySelector('.study-section');
  if (studySection) studySection.style.cssText = 'display:none!important;height:0!important;';
  if (presentationContainer)
    presentationContainer.style.cssText =
      'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#f4f8fb;';
  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  const overlay = createOverlayWrapper();

  // 🔹 Bill of Rights Quiz Questions
  const questions = [
    {
      question: "What is Article I of the Ohio Constitution commonly called?",
      choices: ["The Executive Article", "The Bill of Rights", "The Powers of the Courts", "The Election Article"],
      correct: 1,
    },
    {
      question: "Which freedom is guaranteed under Article I of the Ohio Constitution?",
      choices: ["Freedom of Speech", "Freedom to Ignore Laws", "Freedom from Taxes", "Freedom to Hold Office Forever"],
      correct: 0,
    },
    {
      question: "Which protection does Article I guarantee during criminal trials?",
      choices: [
        "Right to a jury trial",
        "Right to create your own laws",
        "Right to appoint judges",
        "Right to avoid paying taxes",
      ],
      correct: 0,
    },
    {
      question: "The Ohio Constitution’s Bill of Rights protects citizens from what kind of searches?",
      choices: [
        "Unreasonable searches and seizures",
        "Any search by any officer",
        "All forms of investigation",
        "Only home inspections",
      ],
      correct: 0,
    },
    {
      question: "What does 'due process of law' mean under Ohio’s Bill of Rights?",
      choices: [
        "Government must follow fair legal procedures before taking away life, liberty, or property",
        "Citizens must always agree with the government",
        "The governor decides guilt or innocence",
        "Courts can skip hearings in emergencies",
      ],
      correct: 0,
    },
    {
      question: "Which right is *not* part of the Ohio Bill of Rights?",
      choices: [
        "Freedom of the press",
        "Right to assemble peacefully",
        "Freedom of religion",
        "Right to declare war",
      ],
      correct: 3,
    },
  ];

  let currentQ = 0;
  let score = 0;
  let selectedAnswer = null;

  function renderQuestion() {
    const q = questions[currentQ];
    const quizContent = overlay.querySelector(".quiz-content");

    quizContent.innerHTML = `
      <div style="margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
          <span style="color:#415a77;font-weight:600;">Question ${currentQ + 1} of ${questions.length}</span>
          <span style="color:#415a77;font-weight:600;">Score: ${score}/${currentQ}</span>
        </div>
        <div style="width:100%;height:8px;background:#e0e0e0;border-radius:10px;overflow:hidden;margin-bottom:20px;">
          <div style="width:${((currentQ) / questions.length) * 100}%;height:100%;background:#1b263b;transition:width 0.3s;"></div>
        </div>
      </div>

      <h3 style="color:#0d1b2a;font-size:1.3rem;margin-bottom:25px;line-height:1.4;">${q.question}</h3>

      <div class="choices" style="display:flex;flex-direction:column;gap:12px;">
        ${q.choices.map(
          (choice, idx) => `
          <button class="choice-btn" data-index="${idx}" style="
            background:#fff;
            border:2px solid #415a77;
            color:#0d1b2a;
            padding:16px 20px;
            border-radius:10px;
            cursor:pointer;
            font-size:1rem;
            text-align:left;
            transition:all 0.3s;
          ">${choice}</button>
        `
        ).join("")}
      </div>

      <button id="submitAnswer" style="
        margin-top:25px;
        padding:12px 30px;
        background:#1b263b;
        color:white;
        border:none;
        border-radius:8px;
        cursor:pointer;
        font-size:16px;
        opacity:0.5;
        pointer-events:none;
        transition:all 0.3s;
      " disabled>Submit Answer</button>

      <p class="feedback" style="margin-top:15px;font-weight:600;text-align:center;font-size:16px;min-height:24px;"></p>
    `;

    const choiceBtns = quizContent.querySelectorAll(".choice-btn");
    const submitBtn = quizContent.querySelector("#submitAnswer");
    const feedback = quizContent.querySelector(".feedback");

    selectedAnswer = null;

    choiceBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        choiceBtns.forEach((b) => {
          b.style.background = "#fff";
          b.style.borderColor = "#415a77";
        });
        btn.style.background = "#e3f2fd";
        btn.style.borderColor = "#1b263b";
        selectedAnswer = parseInt(btn.dataset.index, 10);
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.pointerEvents = "auto";
        feedback.textContent = "";
      });
    });

    submitBtn.addEventListener("click", () => {
      if (selectedAnswer === null) return;

      choiceBtns.forEach((btn) => (btn.style.pointerEvents = "none"));
      submitBtn.disabled = true;

      const isCorrect = selectedAnswer === q.correct;
      if (isCorrect) {
        score++;
        choiceBtns[selectedAnswer].style.background = "#00c853";
        choiceBtns[selectedAnswer].style.borderColor = "#00c853";
        choiceBtns[selectedAnswer].style.color = "white";
        feedback.textContent = "✓ Correct!";
        feedback.style.color = "#00c853";
      } else {
        choiceBtns[selectedAnswer].style.background = "#e53935";
        choiceBtns[selectedAnswer].style.borderColor = "#e53935";
        choiceBtns[selectedAnswer].style.color = "white";
        choiceBtns[q.correct].style.background = "#00c853";
        choiceBtns[q.correct].style.borderColor = "#00c853";
        choiceBtns[q.correct].style.color = "white";
        feedback.textContent = "✗ Incorrect. The correct answer is highlighted.";
        feedback.style.color = "#e53935";
      }

      setTimeout(() => {
        currentQ++;
        if (currentQ < questions.length) {
          renderQuestion();
        } else {
          showResults();
        }
      }, 2000);
    });
  }

  function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    overlay.querySelector(".quiz-content").innerHTML = `
      <div style="text-align:center;padding:30px 20px;">
        <div style="font-size:4rem;margin-bottom:20px;">
          ${passed ? "⚖️" : "📘"}
        </div>
        <h2 style="color:#0d1b2a;font-size:2rem;margin-bottom:15px;">
          ${passed ? "Excellent!" : "Try Again!"}
        </h2>
        <p style="color:#415a77;font-size:1.2rem;margin-bottom:25px;">
          You scored <strong style="color:#0d1b2a;font-size:1.5rem;">${score}/${questions.length}</strong>
        </p>
        <div style="width:100%;max-width:300px;height:20px;background:#e0e0e0;border-radius:10px;overflow:hidden;margin:0 auto 25px;">
          <div style="width:${percentage}%;height:100%;background:${passed ? "#00c853" : "#ff9800"};transition:width 0.5s;"></div>
        </div>
        <p style="color:#415a77;font-size:1rem;margin-bottom:30px;">
          ${
            passed
              ? "You know your rights under Ohio’s Constitution — great job!"
              : "Review the Ohio Bill of Rights and try again!"
          }
        </p>
        ${
          passed
            ? '<p style="color:#00c853;font-size:1.1rem;font-weight:600;">✓ Topic Completed!</p>'
            : `<button id="retryQuiz" style="padding:12px 30px;background:#1b263b;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;">Try Again</button>`
        }
      </div>
    `;

    if (passed) {
      setTimeout(() => completeTopic(key), 2500);
    } else {
      const retryBtn = overlay.querySelector("#retryQuiz");
      if (retryBtn) {
        retryBtn.addEventListener("click", () => {
          currentQ = 0;
          score = 0;
          renderQuestion();
        });
      }
    }
  }

  overlay.innerHTML = `
    <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">Ohio Bill of Rights Quiz</h2>
    <p style="text-align:center;margin-bottom:30px;color:#415a77;">Test your understanding of the freedoms and protections guaranteed by Ohio’s Constitution!</p>
    <div class="quiz-content"></div>
  `;

  presentationContainer.appendChild(overlay);
  renderQuestion();
}


  /* ---------- Optional: Law Process Simulation (kept from orphaned markup) ---------- */
  function launchLawProcess(key) {
    // This function contains the "multi-step lawmaking simulation" markup and logic
    // (Was present as orphaned markup in the original paste; wrapped here so it's available.)
    if (progressWrapper) {
      progressWrapper.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important;';
    }
    if (studyContent) {
      studyContent.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important;';
    }
    if (presentationContainer) {
      presentationContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: flex-start; min-height: 0; padding: 0; margin: 0; background: #eef5f9;';
    }
    if (backButton) {
      backButton.style.display = 'block';
      backButton.style.margin = '20px';
    }

    const overlay = createOverlayWrapper();
    overlay.innerHTML = `
      <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Create a Law — Simulation</h2>
      <p style="text-align:center; margin-bottom:20px; color:#415a77;">Make decisions to guide a bill through the General Assembly to the Governor.</p>
      <div class="law-steps" style="max-width:700px; margin:0 auto;">
        <div class="step step-1" style="display:block;">
          <p style="font-size:18px; font-weight:600; margin-bottom:15px;"><strong>Step 1:</strong> Choose where to introduce your bill:</p>
          <div style="display:flex; gap:12px; justify-content:center; margin-bottom:20px;">
            <button data-intro="house" style="background:#1b263b; color:white; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Introduce in House</button>
            <button data-intro="senate" style="background:#1b263b; color:white; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Introduce in Senate</button>
          </div>
        </div>
        <div class="step step-2" style="display:none;">
          <p style="font-size:18px; font-weight:600; margin-bottom:15px;"><strong>Step 2:</strong> Choose how it should pass committee:</p>
          <div style="display:flex; gap:12px; justify-content:center; margin-bottom:20px;">
            <button data-committee="unanimous" style="background:#1b263b; color:white; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Unanimous</button>
            <button data-committee="majority" style="background:#1b263b; color:white; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Majority Only</button>
          </div>
        </div>
        <div class="step step-3" style="display:none;">
          <p style="font-size:18px; font-weight:600; margin-bottom:15px;"><strong>Step 3:</strong> Choose the Governor's action:</p>
          <div style="display:flex; flex-direction:column; gap:12px; max-width:400px; margin:0 auto;">
            <button data-gov="sign" style="background:#1b263b; color:white; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Sign into Law</button>
            <button data-gov="veto" style="background:#1b263b; color:white; padding:14px; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Veto</button>
          </div>
        </div>
      </div>
      <p id="lawMsg" style="margin-top:20px; font-weight:600; text-align:center; font-size:18px;"></p>
    `;

    presentationContainer.appendChild(overlay);

    const msg = overlay.querySelector('#lawMsg');
    const steps = overlay.querySelectorAll('.step');
    let currentStep = 0;

    function showStep(i) { 
      steps.forEach((s, idx) => s.style.display = idx === i ? 'block' : 'none'); 
    }

    overlay.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') return;
      const btn = e.target;
      if (currentStep === 0) {
        currentStep = 1; 
        showStep(currentStep);
      } else if (currentStep === 1) {
        currentStep = 2; 
        showStep(currentStep);
      } else if (currentStep === 2) {
        if (btn.dataset.gov === 'sign') {
          msg.textContent = '🎉 The Governor signed your law! Well done, Lawmaker!';
          msg.style.color = 'green';
          setTimeout(() => completeTopic(key), 1500);
        } else {
          msg.textContent = '🚫 The Governor vetoed it. Try again!';
          msg.style.color = 'red';
          setTimeout(() => {
            currentStep = 0; 
            showStep(currentStep);
            msg.textContent = '';
          }, 2000);
        }
      }
    });
  }


/* ---------- Executive Branch Minigame: The Governor’s Decision (Enhanced UI) ---------- */
function launchCitizenPowersMatchGame(key) {
  // 🔹 Hide study and presentation content
  if (progressWrapper)
    progressWrapper.style.cssText =
      'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  if (studyContent)
    studyContent.style.cssText =
      'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  const studySection = document.querySelector('.study-section');
  if (studySection)
    studySection.style.cssText =
      'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';

  if (presentationContainer) {
    presentationContainer.style.cssText = `
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      min-height:0;
      padding:0;
      margin:0;
      background:#f5f9f2;
    `;
  }

  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Create overlay
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <div style="
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      min-height:calc(100vh - 120px);
      width:100%;
    ">
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🗳️ Citizen Power Match-Up</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Decide whether each example shows a <strong>Right</strong> or a <strong>Responsibility</strong> of U.S. citizens.
      </p>

      <div style="
        background:#0d1b2a;
        border-radius:16px;
        padding:28px;
        max-width:650px;
        width:90%;
        box-shadow:0 4px 16px rgba(0,0,0,0.3);
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      ">
        <div style="background:#415a77;border-radius:8px;height:10px;width:100%;margin:18px 0;">
          <div id="citizenProgressBar" style="height:10px;width:0%;background:#4caf50;border-radius:8px;transition:width 0.5s ease;"></div>
        </div>

        <div id="citizenCard" style="
          background:#1b263b;
          border-radius:12px;
          padding:24px;
          box-shadow:inset 0 0 8px rgba(0,0,0,0.4);
          margin-top:10px;
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
        ">
          <p id="citizenScenario" style="font-size:18px;margin-bottom:20px;color:#eef5f9;">Loading...</p>
          <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
            <button id="rightBtn" style="background:#2196f3;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">⚖️ Right</button>
            <button id="respBtn" style="background:#ff9800;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🧭 Responsibility</button>
          </div>
          <p id="citizenFeedback" style="margin-top:18px;font-style:italic;min-height:22px;color:#9bb1d4;text-align:center;"></p>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data
  const scenarios = [
    {
      text: "Voting in elections to choose your leaders.",
      correct: "responsibility",
      feedback: "✅ Correct! Voting is a civic responsibility that keeps democracy strong.",
    },
    {
      text: "Freedom of speech and expression.",
      correct: "right",
      feedback: "✅ Right! Freedom of speech is a fundamental constitutional right.",
    },
    {
      text: "Serving on a jury when called.",
      correct: "responsibility",
      feedback: "✅ Exactly! Jury duty is a key civic duty that supports justice.",
    },
    {
      text: "Practicing any religion—or none at all.",
      correct: "right",
      feedback: "✅ Yes! Freedom of religion is protected by the First Amendment.",
    },
    {
      text: "Obeying the laws and respecting others’ rights.",
      correct: "responsibility",
      feedback: "✅ Correct! Citizens must follow laws and respect others’ freedoms.",
    },
    {
      text: "Running for public office.",
      correct: "right",
      feedback: "✅ Great! Citizens have the right to seek and hold elected office.",
    },
    {
      text: "Paying taxes to support government services.",
      correct: "responsibility",
      feedback: "✅ That’s right! Taxes fund schools, roads, and safety services.",
    },
    {
      text: "Petitioning the government to make changes.",
      correct: "right",
      feedback: "✅ Correct! The right to petition allows citizens to express concerns to leaders.",
    },
  ];

  const scenarioEl = overlay.querySelector('#citizenScenario');
  const feedbackEl = overlay.querySelector('#citizenFeedback');
  const rightBtn = overlay.querySelector('#rightBtn');
  const respBtn = overlay.querySelector('#respBtn');
  const progressBar = overlay.querySelector('#citizenProgressBar');

  let current = 0;

  function showScenario() {
    const s = scenarios[current];
    scenarioEl.textContent = s.text;
    feedbackEl.textContent = '';
    progressBar.style.width = ((current / scenarios.length) * 100) + "%";
  }

  function handleChoice(choice) {
    const s = scenarios[current];
    if (choice === s.correct) {
      feedbackEl.textContent = s.feedback;
      feedbackEl.style.color = "#00c853";
    } else {
      feedbackEl.textContent = "🤔 Not quite — think about whether it’s something you’re free to do or something you must do.";
      feedbackEl.style.color = "#e53935";
    }

    rightBtn.disabled = true;
    respBtn.disabled = true;

    setTimeout(() => {
      current++;
      if (current < scenarios.length) {
        rightBtn.disabled = false;
        respBtn.disabled = false;
        showScenario();
      } else {
        feedbackEl.textContent = "🎉 Well done! You understand the rights and responsibilities of U.S. citizens!";
        feedbackEl.style.color = "#00c853";
        progressBar.style.width = "100%";
        setTimeout(() => completeTopic(key), 2000);
      }
    }, 1500);
  }

  rightBtn.addEventListener('click', () => handleChoice('right'));
  respBtn.addEventListener('click', () => handleChoice('responsibility'));

  showScenario();
}


/* ---------- Judicial Branch Minigame: The Verdict Game (Enhanced Courtroom UI) ---------- */
function launchRightsProtectionsGame(key) {
  // 🔹 Hide presentation and study elements
  if (progressWrapper) progressWrapper.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  if (studyContent) studyContent.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  
  const studySection = document.querySelector('.study-section');
  if (studySection) studySection.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';
  
  if (presentationContainer) {
    presentationContainer.style.cssText = `
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      min-height:0;
      padding:0;
      margin:0;
      background:#f2f7ff;
    `;
  }

  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Overlay container
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <div style="
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      min-height:calc(100vh - 120px);
      width:100%;
    ">
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🛡️ Rights & Protections Challenge</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Match each situation to the correct constitutional right or protection!
      </p>

      <div style="
        background:#ffffff;
        border-radius:16px;
        padding:32px;
        max-width:760px;
        width:90%;
        border:3px solid #4a6fa5;
        box-shadow:0 8px 20px rgba(0,0,0,0.25);
        font-family:'Poppins',sans-serif;
        color:#1a2b3c;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      ">
        <div style="background:#dbe4ee;border-radius:10px;height:10px;width:100%;margin-bottom:22px;">
          <div id="rightsProgressBar" style="height:10px;width:0%;background:#0077b6;border-radius:10px;transition:width 0.5s ease;"></div>
        </div>

        <div id="rightsCard" style="
          background:#f4f9ff;
          border:2px solid #4a6fa5;
          border-radius:20px;
          padding:24px;
          width:100%;
          max-width:600px;
          box-shadow:inset 0 0 10px rgba(0,0,0,0.1);
          text-align:center;
        ">
          <div style="margin-bottom:16px;font-size:20px;color:#0d1b2a;">⚖️ Scenario #<span id="rightsNumber">1</span></div>
          <p id="rightsCaseText" style="font-size:18px;line-height:1.6;margin-bottom:24px;color:#1a2b3c;">Loading scenario...</p>

          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <button class="rightsBtn" data-choice="speech" style="background:#0077b6;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">💬 Free Speech</button>
            <button class="rightsBtn" data-choice="religion" style="background:#ff9800;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">⛪ Freedom of Religion</button>
            <button class="rightsBtn" data-choice="press" style="background:#4caf50;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">📰 Freedom of Press</button>
            <button class="rightsBtn" data-choice="dueprocess" style="background:#9c27b0;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">⚖️ Due Process</button>
          </div>

          <div id="rightsFeedback" style="margin-top:20px;font-style:italic;min-height:24px;text-align:center;transition:all 0.3s ease;"></div>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Scenarios (Bill of Rights protections)
  const scenarios = [
    {
      text: "A student gives a speech at a rally criticizing government policy.",
      correct: "speech",
      feedback: "💬 Correct — the First Amendment protects freedom of speech, even when opinions are unpopular."
    },
    {
      text: "A reporter publishes an article investigating government spending.",
      correct: "press",
      feedback: "📰 Exactly — the freedom of the press allows journalists to publish information freely."
    },
    {
      text: "A citizen is arrested but not told what crime they are charged with.",
      correct: "dueprocess",
      feedback: "⚖️ Right — due process ensures fair treatment and the right to know the charges against you."
    },
    {
      text: "A new city law tries to ban people from attending certain churches.",
      correct: "religion",
      feedback: "⛪ Correct — the government cannot interfere with your freedom of religion."
    },
    {
      text: "A journalist criticizes public officials without fear of punishment.",
      correct: "press",
      feedback: "📰 Yes — freedom of the press protects the ability to question those in power."
    },
    {
      text: "Someone refuses to testify against themselves in court.",
      correct: "dueprocess",
      feedback: "⚖️ Exactly — that’s the Fifth Amendment right against self-incrimination."
    },
    {
      text: "A group peacefully protests in front of a government building.",
      correct: "speech",
      feedback: "💬 Correct — peaceful assembly and protest are part of the right to free speech."
    },
    {
      text: "A student wants to wear a religious symbol at school without discrimination.",
      correct: "religion",
      feedback: "⛪ Yes — freedom of religion protects individuals from being penalized for their beliefs."
    }
  ];

  // 🔹 Elements
  const caseTextEl = overlay.querySelector('#rightsCaseText');
  const feedbackEl = overlay.querySelector('#rightsFeedback');
  const progressBar = overlay.querySelector('#rightsProgressBar');
  const scenarioNumberEl = overlay.querySelector('#rightsNumber');
  const buttons = overlay.querySelectorAll('.rightsBtn');

  let current = 0;
  let score = 0;

  function showScenario() {
    const sc = scenarios[current];
    scenarioNumberEl.textContent = current + 1;
    caseTextEl.textContent = sc.text;
    feedbackEl.textContent = '';
    progressBar.style.width = ((current / scenarios.length) * 100) + "%";
    buttons.forEach(btn => btn.disabled = false);
  }

  function handleChoice(choice) {
    const sc = scenarios[current];
    buttons.forEach(btn => btn.disabled = true);

    if (choice === sc.correct) {
      score++;
      feedbackEl.textContent = sc.feedback;
      feedbackEl.style.color = "#1b4332";
    } else {
      feedbackEl.textContent = "❌ Not quite — think about which specific right applies to this situation.";
      feedbackEl.style.color = "#9b2226";
    }

    setTimeout(() => {
      current++;
      if (current < scenarios.length) {
        showScenario();
      } else {
        showResults();
      }
    }, 1700);
  }

  function showResults() {
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(100vh - 120px);text-align:center;">
        <h2 style="color:#0d1b2a;margin-bottom:12px;">🎯 Rights Check Complete!</h2>
        <p style="margin-bottom:8px;">You correctly identified <strong>${score}</strong> out of <strong>${scenarios.length}</strong> protections.</p>
        <p style="color:#415a77;margin-bottom:20px;">You’ve mastered the key freedoms and due process rights in the Bill of Rights!</p>
        <button id="finishRightsGame" style="margin-top:12px;background:#0077b6;color:#fff;border:none;border-radius:10px;padding:12px 26px;font-size:16px;font-weight:bold;cursor:pointer;transition:background 0.3s;">Return to Study Guide</button>
      </div>
    `;

    overlay.querySelector('#finishRightsGame').addEventListener('click', () => {
      overlay.remove();
      completeTopic(key);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', e => handleChoice(e.target.dataset.choice));
  });

  showScenario();
}

/* ---------- Leadership Roles Minigame: Who Leads? (Footer-safe version) ---------- */
function launchGovernmentLimitsGame(key) {
  // 🔹 Hide study and presentation content
  if (progressWrapper) progressWrapper.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  if (studyContent) studyContent.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  const studySection = document.querySelector('.study-section');
  if (studySection) studySection.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';

  // 🔹 Main container style
  if (presentationContainer) {
    presentationContainer.style.cssText = `
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      min-height:0;
      padding:0;
      margin:0;
      background:#eef5f9;
    `;
  }

  // 🔹 Back button visible
  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Create overlay
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">⚖️ Government Limits Quiz</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">
      Decide which principle limits government power in each situation.
    </p>

    <div id="limitsQuestion" style="
      margin:20px auto;
      background:#f8fbff;
      border:1px solid #c9d8ee;
      border-radius:10px;
      padding:18px;
      font-size:18px;
      color:#223354;
      max-width:680px;
      text-align:center;
      min-height:90px;
      display:flex;
      align-items:center;
      justify-content:center;
    ">Loading...</div>

    <div class="limitsButtons" style="
      display:flex;
      flex-direction:column;
      gap:12px;
      align-items:center;
      margin-top:16px;
    ">
      <button class="limitBtn" data-choice="Separation of Powers" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🏛️ Separation of Powers</button>

      <button class="limitBtn" data-choice="Checks and Balances" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">⚖️ Checks and Balances</button>

      <button class="limitBtn" data-choice="Rule of Law" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">📜 Rule of Law</button>
    </div>

    <p id="limitsFeedback" style="text-align:center; margin-top:16px; font-weight:600; color:#1b263b;"></p>

    <div class="progress" style="margin-top:20px; width:80%; height:10px; background:#d8e3ef; border-radius:6px; overflow:hidden;">
      <div id="limitsBar" style="height:100%; width:0%; background:#1b263b; transition:width 0.4s ease;"></div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data (GOVERNMENT LIMITS)
  const questions = [
    { q: "The governor enforces laws, the legislature makes them, and the courts interpret them.", a: "Separation of Powers" },
    { q: "The state supreme court rules that a law passed by the legislature violates the constitution.", a: "Checks and Balances" },
    { q: "A mayor must follow the same traffic laws as every other citizen.", a: "Rule of Law" },
    { q: "The legislature overrides the governor’s veto of a bill.", a: "Checks and Balances" },
    { q: "Each branch of government has its own responsibilities to prevent abuse of power.", a: "Separation of Powers" },
    { q: "Even high-ranking officials can be charged if they break the law.", a: "Rule of Law" }
  ];

  let current = 0;
  let correct = 0;

  const qEl = overlay.querySelector('#limitsQuestion');
  const feedback = overlay.querySelector('#limitsFeedback');
  const bar = overlay.querySelector('#limitsBar');
  const buttons = overlay.querySelectorAll('.limitBtn');

  function loadQuestion() {
    const q = questions[current];
    qEl.textContent = q.q;
    feedback.textContent = "";
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.style.background = "#ffffff";
      btn.style.borderColor = "#415a77";
      btn.style.transform = "none";
    });
    bar.style.width = ((current / questions.length) * 100) + "%";
  }

  // 🔹 Button logic
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.choice;
      const correctAns = questions[current].a;

      buttons.forEach(b => b.disabled = true);

      if (answer === correctAns) {
        correct++;
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "#00c853";
        btn.style.background = "#e7fbf0";
        btn.style.borderColor = "#00c853";
      } else {
        feedback.textContent = `❌ Not quite — that’s an example of ${correctAns}.`;
        feedback.style.color = "#e53935";
        btn.style.background = "#ffeaea";
        btn.style.borderColor = "#e53935";
      }

      btn.style.transform = "scale(0.97)";

      setTimeout(() => {
        current++;
        if (current < questions.length) {
          loadQuestion();
        } else {
          bar.style.width = "100%";
          setTimeout(() => {
            overlay.remove();
            completeTopic(key);
          }, 700);
        }
      }, 1400);
    });
  });

  // 🔹 Start
  loadQuestion();
}

/* ---------- Citizenship & Voting Minigame: Mail Sorter ---------- */
function launchMailSorterGame(key) {
  // 🔹 Hide all study/presentation elements
  if (progressWrapper) {
    progressWrapper.style.cssText =
      'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  }
  if (studyContent) {
    studyContent.style.cssText =
      'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  }

  const studySection = document.querySelector('.study-section');
  if (studySection) {
    studySection.style.cssText =
      'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';
  }

  // 🔹 Simplify presentation container
  if (presentationContainer) {
    presentationContainer.style.cssText =
      'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#f4fafc;';
  }

  // 🔹 Ensure back button is visible
  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Create overlay wrapper
  const overlay = createOverlayWrapper();

  // 🔹 Inject game HTML
  overlay.innerHTML = `
    <div id="civicSorterGame" style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:calc(100vh - 120px); padding:40px 20px;
      background:linear-gradient(180deg,#ffffff 0%,#e9f7ef 100%);
      font-family:'Georgia',serif; color:#1b263b; text-align:center;
    ">
      <div style="
        background:#f8fbff; border:2px solid #a8d5ba; border-radius:20px;
        padding:36px 28px; max-width:780px; width:100%;
        box-shadow:0 6px 18px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
      ">
        <h2 style="font-size:30px; margin:0;">🗳️ Civic Responsibility Sorter</h2>
        <p style="margin-top:10px; font-size:17px; color:#2c4969;">
          Decide if each action shows <strong>Good Citizenship</strong> ✅ or <strong>Not Responsible Behavior</strong> ❌.
        </p>

        <div id="civicSorterBins" style="
          display:flex; justify-content:space-around; margin:30px 0 20px;
          flex-wrap:wrap; gap:20px;
        ">
          <div id="goodBin" class="drop-zone" style="
            width:240px; height:160px; background:#d0f0c0;
            border:3px dashed #2d6a4f; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#1b4332;
            transition:background 0.3s ease, transform 0.3s ease;
          ">✅ Good Citizenship</div>

          <div id="badBin" class="drop-zone" style="
            width:240px; height:160px; background:#fde2e4;
            border:3px dashed #b23a48; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#641220;
            transition:background 0.3s ease, transform 0.3s ease;
          ">❌ Not Responsible</div>
        </div>

        <div id="civicSorterCard" draggable="true" style="
          background:#ffffff; border:1px solid #a8d5ba; border-radius:12px;
          padding:24px 20px; font-size:18px; color:#1b263b;
          cursor:grab; width:80%; max-width:500px; margin:0 auto;
          box-shadow:0 4px 10px rgba(0,0,0,0.15);
          transition:transform 0.3s ease, box-shadow 0.3s ease;
        ">Loading scenario...</div>

        <p id="civicSorterFeedback" style="
          margin-top:24px; font-style:italic; min-height:24px;
          color:#2c4969; opacity:0; transition:opacity 0.4s ease;
        "></p>
      </div>
    </div>

    <style>
      @keyframes fadeIn {
        from {opacity:0; transform:translateY(15px);}
        to {opacity:1; transform:translateY(0);}
      }
      .drop-zone.active { transform:scale(1.05); }
      .show-feedback { opacity:1 !important; }
    </style>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game Logic — “Civic Responsibility” version
  const scenarios = [
    { text: "A citizen votes in a local election to choose new leaders.", correct: "good", feedback: "✅ That’s good citizenship — voting is one of your key civic duties!" },
    { text: "Someone ignores jury duty and throws away the summons.", correct: "bad", feedback: "❌ Not responsible — serving on a jury is an important civic obligation." },
    { text: "A student volunteers to help clean up a public park.", correct: "good", feedback: "✅ Great! Helping your community shows civic pride and responsibility." },
    { text: "A resident refuses to pay property taxes that fund local schools.", correct: "bad", feedback: "❌ Not responsible — taxes fund essential public services and education." },
    { text: "A neighbor reports a broken streetlight to the city.", correct: "good", feedback: "✅ That’s responsible — reporting issues helps local government serve everyone better." }
  ];

  let currentScenario = 0;
  let correctCount = 0;

  const card = overlay.querySelector("#civicSorterCard");
  const feedbackEl = overlay.querySelector("#civicSorterFeedback");
  const goodBin = overlay.querySelector("#goodBin");
  const badBin = overlay.querySelector("#badBin");

  function showScenario() {
    const current = scenarios[currentScenario];
    card.textContent = current.text;
    feedbackEl.textContent = "";
    feedbackEl.classList.remove("show-feedback");
  }

  function giveFeedback(message, color) {
    feedbackEl.textContent = message;
    feedbackEl.style.color = color;
    feedbackEl.classList.add("show-feedback");
  }

  function showResults() {
    overlay.innerHTML = `
      <div style="
        display:flex; flex-direction:column; justify-content:center; align-items:center;
        min-height:calc(100vh - 120px); background:#f0f9ff; text-align:center;
        color:#1b263b; font-family:'Georgia',serif;
      ">
        <div style="
          background:#ffffff; border:2px solid #a8d5ba; border-radius:20px;
          padding:40px 30px; max-width:620px; width:100%;
          box-shadow:0 6px 16px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
        ">
          <h2 style="margin:0; font-size:30px;">🌟 Well Done, Civic Star!</h2>
          <p style="margin-top:18px;">You sorted <strong>${correctCount}</strong> of <strong>${scenarios.length}</strong> correctly.</p>
          <p style="color:#2c4969; margin-top:8px;">You understand what it means to be a responsible and active citizen!</p>
          <button id="finishCivicSorter" style="
            margin-top:26px; background:#2d6a4f; color:#fff;
            font-weight:bold; border:none; border-radius:12px;
            padding:12px 28px; cursor:pointer; font-size:17px;
            transition:all 0.3s ease;
          ">Return to Study Guide</button>
        </div>
      </div>
    `;

    overlay.querySelector("#finishCivicSorter").addEventListener("click", () => {
      overlay.remove();
      completeTopic(key);
    });
  }

  // 🔹 Drag & Drop Logic
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "scenario");
    setTimeout(() => (card.style.opacity = "0.5"), 0);
  });
  card.addEventListener("dragend", () => (card.style.opacity = "1"));

  [goodBin, badBin].forEach(bin => {
    bin.addEventListener("dragover", e => {
      e.preventDefault();
      bin.classList.add("active");
    });
    bin.addEventListener("dragleave", () => bin.classList.remove("active"));
    bin.addEventListener("drop", e => {
      e.preventDefault();
      bin.classList.remove("active");
      const choice = bin.id === "goodBin" ? "good" : "bad";
      const current = scenarios[currentScenario];

      if (choice === current.correct) {
        correctCount++;
        giveFeedback(current.feedback, "#2d6a4f");
      } else {
        giveFeedback(current.feedback, "#b23a48");
      }

      setTimeout(() => {
        currentScenario++;
        if (currentScenario < scenarios.length) showScenario();
        else showResults();
      }, 1500);
    });
  });

  showScenario();
}
})(); 
