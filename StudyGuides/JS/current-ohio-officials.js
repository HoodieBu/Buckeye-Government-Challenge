/***********************
 * Slides for each section
 ***********************/
const ALL_SECTIONS = {
   'stateexecutiveoffices': [
    { title: "Section 1: Governor and Lieutenant Governor", content: "Mike DeWine serves as Ohio’s Governor, and Jim Tressel is the Lieutenant Governor as of 2025, overseeing the state’s executive branch." },
    { title: "Section 2: Other Key Officials", content: "Ohio’s statewide elected officers include Attorney General Dave Yost, Secretary of State Frank LaRose, Auditor Keith Faber, and Treasurer Robert Sprague." },
    { title: "Section 3: Executive Leadership Roles", content: "These leaders manage state agencies, enforce laws, oversee elections, and ensure financial accountability in Ohio’s government." },
  ],

  'termsandelections': [
    { title: "Section 1: Election Cycles", content: "Ohio’s statewide executive offices are elected every four years, with the next gubernatorial election scheduled for November 2026." },
    { title: "Section 2: Judicial Terms", content: "Justices on the Ohio Supreme Court serve six-year terms, with staggered elections to maintain continuity on the bench." },
    { title: "Section 3: Voter Participation", content: "Ohio voters elect leaders in even-numbered years, playing a direct role in shaping state policy through regular elections." },
  ],

  'legislativeandjudicialleadership': [
    { title: "Section 1: Ohio House Leadership", content: "The Speaker of the Ohio House of Representatives, Matt Huffman, leads the lower chamber as of 2025." },
    { title: "Section 2: Ohio Senate Leadership", content: "Rob McColley serves as President of the Ohio Senate, guiding legislative priorities and debate." },
    { title: "Section 3: Judicial Oversight", content: "The Chief Justice of the Ohio Supreme Court, Sharon L. Kennedy, leads a seven-member court that interprets state law." },
  ],

  'rolesandresponsibilities': [
    { title: "Section 1: Secretary of State", content: "The Secretary of State oversees statewide elections, voter registration, and campaign finance reporting." },
    { title: "Section 2: Auditor of State", content: "The Auditor ensures transparency by auditing public offices and funds across local and state government." },
    { title: "Section 3: Lieutenant Governor", content: "The Lieutenant Governor assists the Governor, assumes duties if needed, and may oversee special initiatives or agencies." },
  ],

  'representationandcitizenaccess': [
    { title: "Section 1: Ohio’s Representation", content: "Ohio has two U.S. Senators and 15 U.S. House Representatives as of the current apportionment." },
    { title: "Section 2: Finding Legislators", content: "Citizens can find and contact their state legislators through the Ohio Legislature’s online district directory." },
    { title: "Section 3: Citizen Engagement", content: "Ohioans can reach out to officials by email, phone, attending town halls, or submitting concerns on government websites." },
  ],

  'partycontrolandinitiatives': [
    { title: "Section 1: Political Majority", content: "As of 2025, the Republican Party holds the majority in both the Ohio House and Senate." },
    { title: "Section 2: Term Uniformity", content: "All statewide executive offices share a four-year term length and are elected during the same cycle." },
    { title: "Section 3: Recent Initiatives", content: "Recent efforts in 2025 include property tax reform, workforce development, and renewable energy expansion." },
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

    if (key === 'stateexecutiveoffices') {
        launchMatchGame(key);
        } else if (key === 'termsandelections') {
        launchTermsAndElectionsGame(key);
        } else if (key === 'legislativeandjudicialleadership') {
        launchLegislativeAndJudicialLeadershipMatchGame(key);
        } else if (key === 'rolesandresponsibilities') { 
        launchRolesAndResponsibilitiesGame(key)
        } else if (key === 'representationandcitizenaccess') { 
        launchRepresentationAndCitizenAccessGame(key)
        } else if (key === 'partycontrolandinitiatives') {
        launchPartyControlAndInitiativesGame(key)
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
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Who Leads Ohio’s Executive Offices?</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">Match each office to the current Ohio officeholder (as of 2025).</p>

    <div class="matchGame" style="margin-top:18px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
      <!-- Governor -->
      <div class="branch" data-office="governor" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:200px;">
        <h3 style="color:white; text-align:center; margin-bottom:10px;">Governor</h3>
        <div class="dropzone" style="min-height:100px; border:2px dashed #778da9; border-radius:5px; padding:10px;"></div>
      </div>

      <!-- Lieutenant Governor -->
      <div class="branch" data-office="lieutenantgovernor" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:200px;">
        <h3 style="color:white; text-align:center; margin-bottom:10px;">Lieutenant Governor</h3>
        <div class="dropzone" style="min-height:100px; border:2px dashed #778da9; border-radius:5px; padding:10px;"></div>
      </div>

      <!-- Attorney General -->
      <div class="branch" data-office="attorneygeneral" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:200px;">
        <h3 style="color:white; text-align:center; margin-bottom:10px;">Attorney General</h3>
        <div class="dropzone" style="min-height:100px; border:2px dashed #778da9; border-radius:5px; padding:10px;"></div>
      </div>

      <!-- Secretary of State -->
      <div class="branch" data-office="secretaryofstate" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:200px;">
        <h3 style="color:white; text-align:center; margin-bottom:10px;">Secretary of State</h3>
        <div class="dropzone" style="min-height:100px; border:2px dashed #778da9; border-radius:5px; padding:10px;"></div>
      </div>

      <!-- State Treasurer -->
      <div class="branch" data-office="statetreasurer" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:200px;">
        <h3 style="color:white; text-align:center; margin-bottom:10px;">State Treasurer</h3>
        <div class="dropzone" style="min-height:100px; border:2px dashed #778da9; border-radius:5px; padding:10px;"></div>
      </div>

      <!-- State Auditor -->
      <div class="branch" data-office="stateauditor" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:200px;">
        <h3 style="color:white; text-align:center; margin-bottom:10px;">State Auditor</h3>
        <div class="dropzone" style="min-height:100px; border:2px dashed #778da9; border-radius:5px; padding:10px;"></div>
      </div>
    </div>

    <div class="tasks" style="margin-top:25px; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
      <div class="task" draggable="true" data-office="governor" style="background:#778da9;color:white;padding:10px 16px;border-radius:8px;cursor:grab;">Mike DeWine</div>
      <div class="task" draggable="true" data-office="lieutenantgovernor" style="background:#778da9;color:white;padding:10px 16px;border-radius:8px;cursor:grab;">Jon Husted</div>
      <div class="task" draggable="true" data-office="attorneygeneral" style="background:#778da9;color:white;padding:10px 16px;border-radius:8px;cursor:grab;">Dave Yost</div>
      <div class="task" draggable="true" data-office="secretaryofstate" style="background:#778da9;color:white;padding:10px 16px;border-radius:8px;cursor:grab;">Frank LaRose</div>
      <div class="task" draggable="true" data-office="statetreasurer" style="background:#778da9;color:white;padding:10px 16px;border-radius:8px;cursor:grab;">Robert Sprague</div>
      <div class="task" draggable="true" data-office="stateauditor" style="background:#778da9;color:white;padding:10px 16px;border-radius:8px;cursor:grab;">Keith Faber</div>
    </div>

    <button id="matchCheckBtn" style="margin-top:25px;padding:12px 24px;background:#1b263b;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;display:block;margin-left:auto;margin-right:auto;">Check Answers</button>
    <p id="matchMsg" style="margin-top:15px;font-weight:600;text-align:center;font-size:18px;"></p>
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
        } else {
          t.style.background = '#e53935';
        }
      });
    });

    const msg = overlay.querySelector('#matchMsg');
    if (correct === total && total === 6) {
      msg.textContent = '🎉 Perfect! You matched all Ohio leaders correctly!';
      msg.style.color = '#00c853';
      this.style.display = 'none';
      setTimeout(() => completeTopic(key), 2000);
    } else {
      msg.textContent = `You got ${correct} out of ${total} correct. Try again!`;
      msg.style.color = '#e53935';
      setTimeout(() => {
        tasks.forEach(t => t.style.background = '#778da9');
        msg.textContent = '';
      }, 2000);
    }
  });
}


  /* ---------- Legislative Quiz Game ---------- */
 function launchTermsAndElectionsGame(key) {
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

  // 🔹 Terms and Elections Quiz Questions
  const questions = [
    {
      question: "How long is the term for Ohio’s Governor?",
      choices: ["2 years", "4 years", "6 years", "8 years"],
      correct: 1,
    },
    {
      question: "What is the maximum number of consecutive terms the Ohio Governor may serve?",
      choices: ["One", "Two", "Three", "Unlimited"],
      correct: 1,
    },
    {
      question: "How often are statewide executive offices like Secretary of State and Treasurer elected?",
      choices: ["Every 2 years", "Every 4 years", "Every 6 years", "Every 8 years"],
      correct: 1,
    },
    {
      question: "When are general elections for state offices held in Ohio?",
      choices: ["Even-numbered years in November", "Odd-numbered years in May", "Every three years", "Only during presidential elections"],
      correct: 0,
    },
    {
      question: "Which office manages Ohio’s election process and certifies results?",
      choices: ["Governor’s Office", "Attorney General", "Secretary of State", "State Auditor"],
      correct: 2,
    },
    {
      question: "How long is the term for a member of the Ohio House of Representatives?",
      choices: ["2 years", "4 years", "6 years", "8 years"],
      correct: 0,
    },
    {
      question: "How long is the term for a member of the Ohio Senate?",
      choices: ["2 years", "4 years", "6 years", "8 years"],
      correct: 1,
    },
    {
      question: "What must you be to vote in Ohio?",
      choices: ["A U.S. citizen and at least 18 years old by the next general election", "A U.S. resident of any age", "A state employee", "A registered driver"],
      correct: 0,
    },
    {
      question: "How do citizens directly propose or reject laws on the ballot?",
      choices: ["Through petitions and referendums", "Through the court system", "By writing to the Governor", "By voting only in primaries"],
      correct: 0,
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
          ${passed ? "🗳️" : "📋"}
        </div>
        <h2 style="color:#0d1b2a;font-size:2rem;margin-bottom:15px;">
          ${passed ? "Great Job!" : "Try Again!"}
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
              ? "You understand how Ohio’s elections and term limits work — well done!"
              : "Review how elections and term limits function in Ohio, then try again!"
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
    <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">Terms and Elections Quiz</h2>
    <p style="text-align:center;margin-bottom:30px;color:#415a77;">Test your knowledge of how Ohio’s leaders are elected and how long they serve!</p>
    <div class="quiz-content"></div>
  `;

  presentationContainer.appendChild(overlay);
  renderQuestion();
}


/* ---------- Executive Branch Minigame: The Governor’s Decision (Enhanced UI) ---------- */
function launchLegislativeAndJudicialLeadershipMatchGame(key) {
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
      background:#f5f7fb;
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
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">⚖️ Legislative vs. Judicial Match-Up</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Decide whether each example describes the <strong>Legislative Branch</strong> or the <strong>Judicial Branch</strong> in Ohio’s government.
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
          <div id="leadershipProgressBar" style="height:10px;width:0%;background:#4caf50;border-radius:8px;transition:width 0.5s ease;"></div>
        </div>

        <div id="leadershipCard" style="
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
          <p id="leadershipScenario" style="font-size:18px;margin-bottom:20px;color:#eef5f9;">Loading...</p>
          <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
            <button id="legislativeBtn" style="background:#2196f3;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🏛️ Legislative</button>
            <button id="judicialBtn" style="background:#9c27b0;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">⚖️ Judicial</button>
          </div>
          <p id="leadershipFeedback" style="margin-top:18px;font-style:italic;min-height:22px;color:#9bb1d4;text-align:center;"></p>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data
  const scenarios = [
    {
      text: "Creates and passes new state laws in Ohio.",
      correct: "legislative",
      feedback: "✅ Correct! The General Assembly makes Ohio’s laws.",
    },
    {
      text: "Decides whether a law follows the Ohio Constitution.",
      correct: "judicial",
      feedback: "✅ Right! Courts interpret laws and ensure they are constitutional.",
    },
    {
      text: "The Ohio Senate and House of Representatives meet to debate bills.",
      correct: "legislative",
      feedback: "✅ Exactly! Those are the two chambers of the Ohio General Assembly.",
    },
    {
      text: "The Ohio Supreme Court hears appeals from lower courts.",
      correct: "judicial",
      feedback: "✅ Correct! The state’s highest court reviews important cases.",
    },
    {
      text: "Can override a governor’s veto with enough votes.",
      correct: "legislative",
      feedback: "✅ Yes! The legislature has checks on the executive branch.",
    },
    {
      text: "Judges and justices interpret laws and apply them to cases.",
      correct: "judicial",
      feedback: "✅ That’s right! Judges explain what laws mean in real situations.",
    },
    {
      text: "Approves the state budget and allocates funds for public services.",
      correct: "legislative",
      feedback: "✅ Good work! The General Assembly controls the state’s finances.",
    },
    {
      text: "Can declare a law unconstitutional.",
      correct: "judicial",
      feedback: "✅ Exactly! Courts ensure laws follow the state and U.S. constitutions.",
    },
  ];

  const scenarioEl = overlay.querySelector('#leadershipScenario');
  const feedbackEl = overlay.querySelector('#leadershipFeedback');
  const legislativeBtn = overlay.querySelector('#legislativeBtn');
  const judicialBtn = overlay.querySelector('#judicialBtn');
  const progressBar = overlay.querySelector('#leadershipProgressBar');

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
      feedbackEl.textContent = "🤔 Not quite — think about whether it’s about making laws or interpreting them.";
      feedbackEl.style.color = "#e53935";
    }

    legislativeBtn.disabled = true;
    judicialBtn.disabled = true;

    setTimeout(() => {
      current++;
      if (current < scenarios.length) {
        legislativeBtn.disabled = false;
        judicialBtn.disabled = false;
        showScenario();
      } else {
        feedbackEl.textContent = "🎉 Great job! You understand Ohio’s Legislative and Judicial branches!";
        feedbackEl.style.color = "#00c853";
        progressBar.style.width = "100%";
        setTimeout(() => completeTopic(key), 2000);
      }
    }, 1500);
  }

  legislativeBtn.addEventListener('click', () => handleChoice('legislative'));
  judicialBtn.addEventListener('click', () => handleChoice('judicial'));

  showScenario();
}


/* ---------- Judicial Branch Minigame: The Verdict Game (Enhanced Courtroom UI) ---------- */
function launchRolesAndResponsibilitiesGame(key) {
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
      background:#eef3f9;
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
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🏛️ Roles & Responsibilities Challenge</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Match each situation to the correct public role or level of government!
      </p>

      <div style="
        background:#ffffff;
        border-radius:16px;
        padding:32px;
        max-width:760px;
        width:90%;
        border:3px solid #3b5b92;
        box-shadow:0 8px 20px rgba(0,0,0,0.25);
        font-family:'Poppins',sans-serif;
        color:#1a2b3c;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      ">
        <div style="background:#dae3f2;border-radius:10px;height:10px;width:100%;margin-bottom:22px;">
          <div id="rolesProgressBar" style="height:10px;width:0%;background:#1d4ed8;border-radius:10px;transition:width 0.5s ease;"></div>
        </div>

        <div id="rolesCard" style="
          background:#f7faff;
          border:2px solid #3b5b92;
          border-radius:20px;
          padding:24px;
          width:100%;
          max-width:600px;
          box-shadow:inset 0 0 10px rgba(0,0,0,0.1);
          text-align:center;
        ">
          <div style="margin-bottom:16px;font-size:20px;color:#0d1b2a;">📘 Scenario #<span id="rolesNumber">1</span></div>
          <p id="rolesCaseText" style="font-size:18px;line-height:1.6;margin-bottom:24px;color:#1a2b3c;">Loading scenario...</p>

          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <button class="rolesBtn" data-choice="governor" style="background:#1d4ed8;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;">🏛️ Governor</button>
            <button class="rolesBtn" data-choice="legislator" style="background:#2a9d8f;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;">📜 Legislator</button>
            <button class="rolesBtn" data-choice="judge" style="background:#9b2226;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;">⚖️ Judge</button>
            <button class="rolesBtn" data-choice="citizen" style="background:#e9c46a;border:none;border-radius:10px;color:#000;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;">🗳️ Citizen</button>
          </div>

          <div id="rolesFeedback" style="margin-top:20px;font-style:italic;min-height:24px;text-align:center;transition:all 0.3s ease;"></div>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Scenarios for "Roles & Responsibilities"
  const scenarios = [
    {
      text: "This official signs bills into law and can veto bills passed by the General Assembly.",
      correct: "governor",
      feedback: "🏛️ Correct — the Governor approves or vetoes laws in Ohio’s executive branch."
    },
    {
      text: "A member of the General Assembly debates and votes on new state laws.",
      correct: "legislator",
      feedback: "📜 That’s right — legislators in the House or Senate make state laws."
    },
    {
      text: "Someone serves on a jury to help decide the outcome of a court case.",
      correct: "citizen",
      feedback: "🗳️ Exactly — citizens have the duty to serve on juries as part of civic responsibility."
    },
    {
      text: "This person ensures that court cases follow Ohio law and delivers fair judgments.",
      correct: "judge",
      feedback: "⚖️ Correct — judges interpret and apply the law in court cases."
    },
    {
      text: "You vote in an election to help choose your city council or school board members.",
      correct: "citizen",
      feedback: "🗳️ Right — voting is one of the most important responsibilities of a citizen."
    },
    {
      text: "This role involves enforcing state laws and managing state agencies.",
      correct: "governor",
      feedback: "🏛️ Exactly — the Governor leads the executive branch and ensures laws are carried out."
    },
    {
      text: "This official writes and proposes bills about education funding in Ohio.",
      correct: "legislator",
      feedback: "📜 Correct — legislators create and propose bills that affect public policy."
    },
    {
      text: "This person presides over trials and ensures everyone follows proper courtroom procedure.",
      correct: "judge",
      feedback: "⚖️ Yes — the judge ensures justice and fairness in legal proceedings."
    }
  ];

  // 🔹 Elements
  const caseTextEl = overlay.querySelector('#rolesCaseText');
  const feedbackEl = overlay.querySelector('#rolesFeedback');
  const progressBar = overlay.querySelector('#rolesProgressBar');
  const scenarioNumberEl = overlay.querySelector('#rolesNumber');
  const buttons = overlay.querySelectorAll('.rolesBtn');

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
      feedbackEl.textContent = "❌ Not quite — think about who makes, enforces, or interprets laws.";
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
        <h2 style="color:#0d1b2a;margin-bottom:12px;">🎯 Roles & Responsibilities Complete!</h2>
        <p style="margin-bottom:8px;">You correctly identified <strong>${score}</strong> out of <strong>${scenarios.length}</strong> key roles.</p>
        <p style="color:#415a77;margin-bottom:20px;">You’ve learned who makes, enforces, and interprets Ohio’s laws — and how citizens play a part!</p>
        <button id="finishRolesGame" style="margin-top:12px;background:#1d4ed8;color:#fff;border:none;border-radius:10px;padding:12px 26px;font-size:16px;font-weight:bold;cursor:pointer;">Return to Study Guide</button>
      </div>
    `;

    overlay.querySelector('#finishRolesGame').addEventListener('click', () => {
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
function launchRepresentationAndCitizenAccessGame(key) {
  // 🔹 Hide study and presentation content
  if (progressWrapper)
    progressWrapper.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  if (studyContent)
    studyContent.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  const studySection = document.querySelector('.study-section');
  if (studySection)
    studySection.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';

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
      background:#f5faff;
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
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">🏛️ Representation & Citizen Access Quiz</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">
      Decide whether each example describes a <strong>Representative</strong>, <strong>Senator</strong>, or <strong>Citizen</strong>.
    </p>

    <div id="repQuestion" style="
      margin:20px auto;
      background:#ffffff;
      border:1px solid #cbd5e1;
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

    <div class="repButtons" style="
      display:flex;
      flex-direction:column;
      gap:12px;
      align-items:center;
      margin-top:16px;
    ">
      <button class="repBtn" data-choice="Representative" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🏠 Representative</button>

      <button class="repBtn" data-choice="Senator" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🏛️ Senator</button>

      <button class="repBtn" data-choice="Citizen" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🗳️ Citizen</button>
    </div>

    <p id="repFeedback" style="text-align:center; margin-top:16px; font-weight:600; color:#1b263b;"></p>

    <div class="progress" style="margin-top:20px; width:80%; height:10px; background:#d8e3ef; border-radius:6px; overflow:hidden;">
      <div id="repBar" style="height:100%; width:0%; background:#1b263b; transition:width 0.4s ease;"></div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data (Representation & Citizen Access)
  const questions = [
    { q: "Meets with local residents to hear their concerns about a new education bill.", a: "Representative" },
    { q: "Serves a four-year term representing a larger district in the Ohio Senate.", a: "Senator" },
    { q: "Writes a letter to a state legislator about improving public transportation.", a: "Citizen" },
    { q: "Votes in the General Assembly to pass a state budget.", a: "Representative" },
    { q: "Attends a committee meeting to discuss environmental regulations.", a: "Senator" },
    { q: "Organizes a petition to support funding for local schools.", a: "Citizen" },
    { q: "Represents a smaller district and introduces bills in the Ohio House.", a: "Representative" },
    { q: "Debates and votes on laws that apply across the whole state.", a: "Senator" },
    { q: "Testifies at a public hearing to share opinions on a proposed law.", a: "Citizen" }
  ];

  let current = 0;
  let correct = 0;

  const qEl = overlay.querySelector('#repQuestion');
  const feedback = overlay.querySelector('#repFeedback');
  const bar = overlay.querySelector('#repBar');
  const buttons = overlay.querySelectorAll('.repBtn');

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
        feedback.textContent = `❌ Not quite — that’s an example of a ${correctAns}.`;
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
          feedback.textContent = "🎉 Great work! You understand how citizens, representatives, and senators participate in democracy.";
          feedback.style.color = "#00c853";
          setTimeout(() => {
            overlay.remove();
            completeTopic(key);
          }, 1500);
        }
      }, 1400);
    });
  });

  // 🔹 Start
  loadQuestion();
}

/* ---------- Citizenship & Voting Minigame: Mail Sorter ---------- */
function launchPartyControlAndInitiativesGame(key) {
  // 🔹 Hide all study/presentation elements
  if (progressWrapper) progressWrapper.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  if (studyContent) studyContent.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  const studySection = document.querySelector('.study-section');
  if (studySection) studySection.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';

  // 🔹 Main layout setup
  if (presentationContainer) {
    presentationContainer.style.cssText =
      'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#f6faff;';
  }

  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <div id="partyControlGame" style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:calc(100vh - 120px); padding:40px 20px;
      background:linear-gradient(180deg,#ffffff 0%,#eaf1fb 100%);
      font-family:'Georgia',serif; color:#1b263b; text-align:center;
    ">
      <div style="
        background:#f8fbff; border:2px solid #a8c4f7; border-radius:20px;
        padding:36px 28px; max-width:780px; width:100%;
        box-shadow:0 6px 18px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
      ">
        <h2 style="font-size:30px; margin:0;">⚖️ Party Power & Citizen Initiatives Sorter</h2>
        <p style="margin-top:10px; font-size:17px; color:#2c4969;">
          Decide if each example shows <strong>Party Control</strong> 🏛️ or <strong>Citizen Initiative</strong> 🗳️ in Ohio’s democracy.
        </p>

        <div id="partyBins" style="display:flex; justify-content:space-around; margin:30px 0 20px; flex-wrap:wrap; gap:20px;">
          <div id="partyBin" class="drop-zone" style="
            width:240px; height:160px; background:#e0ecff;
            border:3px dashed #1e3a8a; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#1e3a8a;
            transition:background 0.3s ease, transform 0.3s ease;
          ">🏛️ Party Control</div>

          <div id="initiativeBin" class="drop-zone" style="
            width:240px; height:160px; background:#e7f5e6;
            border:3px dashed #1b5e20; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#1b5e20;
            transition:background 0.3s ease, transform 0.3s ease;
          ">🗳️ Citizen Initiative</div>
        </div>

        <div id="partyCard" draggable="true" style="
          background:#ffffff; border:1px solid #a8c4f7; border-radius:12px;
          padding:24px 20px; font-size:18px; color:#1b263b;
          cursor:grab; width:80%; max-width:500px; margin:0 auto;
          box-shadow:0 4px 10px rgba(0,0,0,0.15);
          transition:transform 0.3s ease, box-shadow 0.3s ease;
        ">Loading scenario...</div>

        <p id="partyFeedback" style="margin-top:24px; font-style:italic; min-height:24px;
          color:#2c4969; opacity:0; transition:opacity 0.4s ease;"></p>
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

  // 🔹 Scenarios for Party Control & Initiatives
  const scenarios = [
    {
      text: "The majority party in the Ohio General Assembly sets the agenda for new laws and state policies.",
      correct: "party",
      feedback: "🏛️ That’s party control — elected officials from the majority party guide legislation."
    },
    {
      text: "Citizens gather signatures to place a proposed law on the statewide ballot for voters to decide.",
      correct: "initiative",
      feedback: "🗳️ Correct — that’s a citizen initiative where people directly shape the law."
    },
    {
      text: "The governor’s political party influences which programs get funding in the state budget.",
      correct: "party",
      feedback: "🏛️ Party control — leadership decisions often follow the governor’s political priorities."
    },
    {
      text: "Voters organize a campaign to repeal a law passed by the legislature through a referendum.",
      correct: "initiative",
      feedback: "🗳️ That’s a referendum — an example of citizen-led action to change or reject laws."
    },
    {
      text: "Legislative committees, controlled by the majority party, decide which bills move forward for debate.",
      correct: "party",
      feedback: "🏛️ Exactly — committee leadership reflects the power of the majority party."
    },
    {
      text: "A grassroots group proposes an amendment to the Ohio Constitution through petition and a public vote.",
      correct: "initiative",
      feedback: "🗳️ Correct — constitutional amendments can come from citizen initiative petitions."
    }
  ];

  let currentScenario = 0;
  let correctCount = 0;

  const card = overlay.querySelector("#partyCard");
  const feedbackEl = overlay.querySelector("#partyFeedback");
  const partyBin = overlay.querySelector("#partyBin");
  const initiativeBin = overlay.querySelector("#initiativeBin");

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
      <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;
        min-height:calc(100vh - 120px);background:#eef6ff;text-align:center;
        color:#1b263b;font-family:'Georgia',serif;">
        <div style="
          background:#ffffff; border:2px solid #a8c4f7; border-radius:20px;
          padding:40px 30px; max-width:620px; width:100%;
          box-shadow:0 6px 16px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
        ">
          <h2 style="margin:0; font-size:30px;">🎉 Great Job, Civic Thinker!</h2>
          <p style="margin-top:18px;">You sorted <strong>${correctCount}</strong> of <strong>${scenarios.length}</strong> correctly.</p>
          <p style="color:#2c4969; margin-top:8px;">You now understand how political parties and citizens share influence in Ohio’s government!</p>
          <button id="finishPartySorter" style="
            margin-top:26px; background:#1e3a8a; color:#fff;
            font-weight:bold; border:none; border-radius:12px;
            padding:12px 28px; cursor:pointer; font-size:17px;
            transition:all 0.3s ease;
          ">Return to Study Guide</button>
        </div>
      </div>
    `;
    overlay.querySelector("#finishPartySorter").addEventListener("click", () => {
      overlay.remove();
      completeTopic(key);
    });
  }

  // 🔹 Drag-and-Drop Logic
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "scenario");
    setTimeout(() => (card.style.opacity = "0.5"), 0);
  });
  card.addEventListener("dragend", () => (card.style.opacity = "1"));

  [partyBin, initiativeBin].forEach(bin => {
    bin.addEventListener("dragover", e => {
      e.preventDefault();
      bin.classList.add("active");
    });
    bin.addEventListener("dragleave", () => bin.classList.remove("active"));
    bin.addEventListener("drop", e => {
      e.preventDefault();
      bin.classList.remove("active");
      const choice = bin.id === "partyBin" ? "party" : "initiative";
      const current = scenarios[currentScenario];

      if (choice === current.correct) {
        correctCount++;
        giveFeedback(current.feedback, "#1b5e20");
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

  // 🔹 Start game
  showScenario();
}


})(); 
