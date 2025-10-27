/***********************
 * Slides for each section
 ***********************/
const ALL_SECTIONS = {
  'counties': [
    { title: "Section 1: Ohio’s 88 Counties", content: "Ohio is made up of 88 counties, each serving as a local level of government that helps carry out state laws and provide services like roads, safety, and public records." },
    { title: "Section 2: County Leadership", content: "Each county is led by a Board of County Commissioners, which manages county business, approves budgets, and oversees local programs and services." },
    { title: "Section 3: Key County Officials", content: "Counties also have elected officials such as the Auditor, Treasurer, Recorder, Sheriff, and Engineer, who handle finances, taxes, property records, law enforcement, and road maintenance." },
  ],
  'townships': [
    { title: "Section 1: Township Government", content: "Townships are one of Ohio’s oldest forms of government. They are run by three township trustees who manage local services and make decisions for the community." },
    { title: "Section 2: Township Duties", content: "Township trustees handle roads, cemeteries, budgets, and sometimes zoning. A fiscal officer keeps track of township money and records." },
    { title: "Section 3: Law Enforcement and Services", content: "Townships often rely on the county sheriff for law enforcement and may provide or contract for fire and emergency services to protect residents." },
  ],
  'citiesandvillages': [
    { title: "Section 1: Cities vs. Villages", content: "In Ohio, places with 5,000 or more people are cities, and those with fewer than 5,000 are villages. Both are called municipalities and can make local laws." },
    { title: "Section 2: Forms of City Government", content: "Cities may use a mayor-council system, where the mayor leads the city, or a city manager system, where a professional manager runs daily operations." },
    { title: "Section 3: Charter Cities and Home Rule", content: "A charter city writes its own rules of government under home rule authority, giving it more control over local affairs like taxes, services, and ordinances." }
  ],
  'localpowers': [
    { title: "Section 1: Home Rule Authority", content: "Ohio’s home rule lets cities and villages govern their own local matters, create charters, and pass ordinances as long as they follow state law." },
    { title: "Section 2: Local Initiatives and Referendums", content: "Citizens can propose new laws or vote to approve or reject local laws by petitioning to place issues on the ballot — a key part of local democracy." },
    { title: "Section 3: Local Boards of Elections", content: "Each county has a Board of Elections that runs local elections, manages voter registration, and counts votes to make sure elections are fair and accurate." },
  ],
  'localfinances': [
    { title: "Section 1: County Auditor and Treasurer", content: "The Auditor assesses property values and oversees county finances, while the Treasurer collects property taxes to fund schools, safety, and public services." },
    { title: "Section 2: Levies and Local Revenue", content: "A levy is a voter-approved property tax used to fund services like schools, libraries, or fire departments. Local governments also collect fees and local taxes." },
    { title: "Section 3: Budget Oversight", content: "Local officials prepare and manage budgets to plan spending and ensure that tax money is used properly and efficiently for community needs." },
  ],
  'districts': [
    { title: "Section 1: School Districts", content: "School districts are independent local governments that manage public education, led by an elected school board that sets policies and budgets." },
    { title: "Section 2: Public Health Departments", content: "Each county has a Board of Health or Health Commissioner responsible for protecting public health and working with state agencies to provide health services." },
    { title: "Section 3: Special Districts", content: "Special districts are created for specific purposes like fire protection, water service, or public transit. They can cover multiple communities and collect taxes or fees." },
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

  // ===== Intro Screen Logic =====
document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const startBtn = document.getElementById("startBtn");

  // Only show intro if it hasn't been shown this session
  if (sessionStorage.getItem("introShown")) {
    introScreen.style.display = "none";
  } else {
    introScreen.style.display = "flex";
  }

  startBtn.addEventListener("click", () => {
    introScreen.classList.add("fade-out");
    setTimeout(() => {
      introScreen.style.display = "none";
      sessionStorage.setItem("introShown", "true");
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

    if (key === 'counties') {
        launchMatchGame(key);
        } else if (key === 'townships') {
        launchTownshipGame(key);
        } else if (key === 'citiesandvillages') {
        launchMunicipalMatchGame(key);
        } else if (key === 'localpowers') { 
        launchLocalPowersGame(key)
        } else if (key === 'localfinances') { 
        launchWhoLeadsGame(key)
        } else if (key === 'districts') {
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
  // First, aggressively hide ALL presentation elements
  if (progressWrapper) {
    progressWrapper.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important;';
  }
  if (studyContent) {
    studyContent.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important;';
  }

  const studySection = document.querySelector('.study-section');
  if (studySection) {
    studySection.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important; min-height: 0 !important;';
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
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Match the County Roles!</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">Match each county service or responsibility to the correct county office.</p>

    <div class="matchGame" style="margin-top:18px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
      <div class="branch" data-office="commissioners" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px; font-size:1.3rem;">County Commissioners</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem; margin-bottom:10px;">Manage budgets & county programs</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
      <div class="branch" data-office="sheriff" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px; font-size:1.3rem;">County Sheriff</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem; margin-bottom:10px;">Keeps the peace & enforces laws</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
      <div class="branch" data-office="auditor" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px; font-size:1.3rem;">County Auditor</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem; margin-bottom:10px;">Handles taxes & property values</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
    </div>

    <div class="tasks" style="margin-top:25px; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
      <div class="task" draggable="true" data-office="commissioners" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Approves county budget</div>
      <div class="task" draggable="true" data-office="commissioners" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Oversees local projects and roads</div>
      <div class="task" draggable="true" data-office="commissioners" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Coordinates public services</div>

      <div class="task" draggable="true" data-office="sheriff" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Operates the county jail</div>
      <div class="task" draggable="true" data-office="sheriff" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Patrols rural areas</div>
      <div class="task" draggable="true" data-office="sheriff" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Serves court papers</div>

      <div class="task" draggable="true" data-office="auditor" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Maintains property records</div>
      <div class="task" draggable="true" data-office="auditor" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Determines property values</div>
      <div class="task" draggable="true" data-office="auditor" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77;">Collects local tax information</div>
    </div>

    <button id="matchCheckBtn" style="margin-top:25px; padding:12px 24px; background:#1b263b; color:white; border:none; border-radius:8px; cursor:pointer; font-size:16px; display:block; margin-left:auto; margin-right:auto; transition: background 0.3s;">Check Answers</button>
    <p id="matchMsg" style="margin-top:15px; font-weight:600; text-align:center; font-size:18px;"></p>
  `;

  presentationContainer.appendChild(overlay);

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

  overlay.querySelector('#matchCheckBtn').addEventListener('click', function() {
    let correct = 0;
    let total = 0;
    const offices = overlay.querySelectorAll('.branch');

    offices.forEach(o => {
      const zone = o.querySelector('.dropzone');
      const droppedTasks = zone.querySelectorAll('.task');

      droppedTasks.forEach(t => {
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
      msg.textContent = '🎉 Excellent! You matched all the county roles correctly!';
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
  function launchTownshipGame(key) {
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

  // 🔹 Township-themed quiz questions
  const questions = [
    {
      question: "How many trustees usually govern an Ohio township?",
      choices: ["One", "Two", "Three", "Five"],
      correct: 2,
    },
    {
      question: "What is the title of the official who manages township finances and records?",
      choices: ["Fiscal Officer", "Treasurer", "County Auditor", "Trustee Chair"],
      correct: 0,
    },
    {
      question: "Which of the following is typically a responsibility of township trustees?",
      choices: [
        "Operating airports",
        "Maintaining township roads and cemeteries",
        "Running state parks",
        "Issuing driver’s licenses",
      ],
      correct: 1,
    },
    {
      question: "Who usually provides law enforcement services in most Ohio townships?",
      choices: [
        "The township police chief",
        "The Ohio State Patrol",
        "The County Sheriff’s Office",
        "The Mayor",
      ],
      correct: 2,
    },
    {
      question: "Townships may provide or contract for which essential service?",
      choices: [
        "Electricity distribution",
        "Fire and emergency protection",
        "Water treatment for the whole county",
        "Postal delivery",
      ],
      correct: 1,
    },
    {
      question: "Which best describes the purpose of township government in Ohio?",
      choices: [
        "To handle national issues",
        "To manage local community needs like roads, zoning, and public safety",
        "To run state elections",
        "To collect federal taxes",
      ],
      correct: 1,
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
          <span style="color:#415a77;font-weight:600;">Question ${currentQ + 1} of ${
      questions.length
    }</span>
          <span style="color:#415a77;font-weight:600;">Score: ${score}/${currentQ}</span>
        </div>
        <div style="width:100%;height:8px;background:#e0e0e0;border-radius:10px;overflow:hidden;margin-bottom:20px;">
          <div style="width:${((currentQ) / questions.length) * 100}%;height:100%;background:#2e8b57;transition:width 0.3s;"></div>
        </div>
      </div>

      <h3 style="color:#0d1b2a;font-size:1.3rem;margin-bottom:25px;line-height:1.4;">${q.question}</h3>

      <div class="choices" style="display:flex;flex-direction:column;gap:12px;">
        ${q.choices
          .map(
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
          )
          .join("")}
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
          ${passed ? "🏡" : "📘"}
        </div>
        <h2 style="color:#0d1b2a;font-size:2rem;margin-bottom:15px;">
          ${passed ? "Nice Work!" : "Try Again!"}
        </h2>
        <p style="color:#415a77;font-size:1.2rem;margin-bottom:25px;">
          You scored <strong style="color:#0d1b2a;font-size:1.5rem;">${score}/${questions.length}</strong>
        </p>
        <div style="width:100%;max-width:300px;height:20px;background:#e0e0e0;border-radius:10px;overflow:hidden;margin:0 auto 25px;">
          <div style="width:${percentage}%;height:100%;background:${
      passed ? "#00c853" : "#ff9800"
    };transition:width 0.5s;"></div>
        </div>
        <p style="color:#415a77;font-size:1rem;margin-bottom:30px;">
          ${
            passed
              ? "You understand how township governments keep Ohio communities running smoothly!"
              : "Review township duties and roles, then give it another shot!"
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
    <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">Township Government Quiz</h2>
    <p style="text-align:center;margin-bottom:30px;color:#415a77;">Test your knowledge about Ohio’s township officials and their duties!</p>
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
function launchMunicipalMatchGame(key) {
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
      background:#eef5f9;
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
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🏙️ Municipal Match-Up</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Decide if each situation describes a <strong>City</strong> or a <strong>Village</strong> in Ohio.
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
          <div id="muniProgressBar" style="height:10px;width:0%;background:#00b4d8;border-radius:8px;transition:width 0.5s ease;"></div>
        </div>

        <div id="muniCard" style="
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
          <p id="muniScenario" style="font-size:18px;margin-bottom:20px;color:#eef5f9;">Loading...</p>
          <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
            <button id="cityBtn" style="background:#0077b6;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🏙️ City</button>
            <button id="villageBtn" style="background:#4caf50;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🏡 Village</button>
          </div>
          <p id="muniFeedback" style="margin-top:18px;font-style:italic;min-height:22px;color:#9bb1d4;text-align:center;"></p>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data
  const scenarios = [
    { text: "This place has 8,000 residents and elects a mayor and city council.", correct: "city", feedback: "✅ Correct! A municipality with 5,000 or more people is a city." },
    { text: "This small community of 2,300 residents manages its own roads and parks.", correct: "village", feedback: "✅ Right! Villages handle local services on a smaller scale." },
    { text: "This government hired a professional city manager to oversee daily operations.", correct: "city", feedback: "✅ Yes! Some cities use a city manager system." },
    { text: "This community doesn’t have a charter and follows general Ohio laws for villages.", correct: "village", feedback: "✅ That’s it! Villages usually don’t have their own charter." },
    { text: "This city wrote its own charter under home rule to set up local tax rules.", correct: "city", feedback: "✅ Exactly! Charter cities have more control under home rule authority." }
  ];

  const scenarioEl = overlay.querySelector('#muniScenario');
  const feedbackEl = overlay.querySelector('#muniFeedback');
  const cityBtn = overlay.querySelector('#cityBtn');
  const villageBtn = overlay.querySelector('#villageBtn');
  const progressBar = overlay.querySelector('#muniProgressBar');

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
      feedbackEl.textContent = "🤔 Not quite — remember, population and government structure make the difference.";
      feedbackEl.style.color = "#e53935";
    }

    cityBtn.disabled = true;
    villageBtn.disabled = true;

    setTimeout(() => {
      current++;
      if (current < scenarios.length) {
        cityBtn.disabled = false;
        villageBtn.disabled = false;
        showScenario();
      } else {
        feedbackEl.textContent = "🎉 Great job! You’ve mastered Ohio’s cities and villages!";
        feedbackEl.style.color = "#00c853";
        progressBar.style.width = "100%";
        setTimeout(() => completeTopic(key), 2000);
      }
    }, 1500);
  }

  cityBtn.addEventListener('click', () => handleChoice('city'));
  villageBtn.addEventListener('click', () => handleChoice('village'));

  showScenario();
}

/* ---------- Judicial Branch Minigame: The Verdict Game (Enhanced Courtroom UI) ---------- */
function launchLocalPowersGame(key) {
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
      background:#eef5f9;
    `;
  }

  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Overlay container (centered layout fix)
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
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🏙️ Local Powers Challenge</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Decide who has the power in Ohio — local governments, the state, or the people!
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
          <div id="powerProgressBar" style="height:10px;width:0%;background:#0077b6;border-radius:10px;transition:width 0.5s ease;"></div>
        </div>

        <div id="powerCard" style="
          background:#f4f9ff;
          border:2px solid #4a6fa5;
          border-radius:20px;
          padding:24px;
          width:100%;
          max-width:600px;
          box-shadow:inset 0 0 10px rgba(0,0,0,0.1);
          text-align:center;
        ">
          <div style="margin-bottom:16px;font-size:20px;color:#0d1b2a;">⚖️ Scenario #<span id="scenarioNumber">1</span></div>
          <p id="powerCaseText" style="font-size:18px;line-height:1.6;margin-bottom:24px;color:#1a2b3c;">Loading scenario...</p>

          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <button class="powerBtn" data-choice="local" style="background:#0077b6;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">🏘️ Local Government</button>
            <button class="powerBtn" data-choice="state" style="background:#1b4965;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">🏛️ State Government</button>
            <button class="powerBtn" data-choice="citizens" style="background:#52b788;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">🗳️ Citizens</button>
          </div>

          <div id="powerFeedback" style="margin-top:20px;font-style:italic;min-height:24px;text-align:center;transition:all 0.3s ease;"></div>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Scenarios (Home Rule, Initiatives, Elections)
  const scenarios = [
    {
      text: "A city wants to pass a curfew law for minors that’s stricter than the state’s version.",
      correct: "local",
      feedback: "🏘️ Correct — under home rule, local governments can pass ordinances as long as they don’t conflict with state law."
    },
    {
      text: "Citizens gather signatures to put a proposed recycling program on the local ballot.",
      correct: "citizens",
      feedback: "🗳️ Right — that’s a local initiative, where citizens can propose laws directly!"
    },
    {
      text: "A township wants to change the state’s election day to better fit its schedule.",
      correct: "state",
      feedback: "🏛️ Correct — only the state can set election dates and laws that apply statewide."
    },
    {
      text: "A village creates a charter outlining how its local council and mayor operate.",
      correct: "local",
      feedback: "🏘️ Exactly — that’s home rule authority at work! Charter cities and villages design their own systems."
    },
    {
      text: "Citizens organize a petition to repeal a recently passed city noise ordinance.",
      correct: "citizens",
      feedback: "🗳️ Yes! That’s a referendum — a way for voters to approve or reject a local law."
    },
    {
      text: "A county board runs local polling places and counts ballots on election night.",
      correct: "state",
      feedback: "🏛️ Correct — though it’s local, the county Board of Elections acts under state law to ensure fairness."
    }
  ];

  // 🔹 Elements
  const caseTextEl = overlay.querySelector('#powerCaseText');
  const feedbackEl = overlay.querySelector('#powerFeedback');
  const progressBar = overlay.querySelector('#powerProgressBar');
  const scenarioNumberEl = overlay.querySelector('#scenarioNumber');
  const buttons = overlay.querySelectorAll('.powerBtn');

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
      feedbackEl.textContent = "❌ Not quite — that power belongs to a different level of government.";
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
        <h2 style="color:#0d1b2a;margin-bottom:12px;">🎯 Power Check Complete!</h2>
        <p style="margin-bottom:8px;">You got <strong>${score}</strong> out of <strong>${scenarios.length}</strong> decisions right.</p>
        <p style="color:#415a77;margin-bottom:20px;">Now you know how local and state powers balance under Ohio’s Home Rule!</p>
        <button id="finishLocalPowersGame" style="margin-top:12px;background:#0077b6;color:#fff;border:none;border-radius:10px;padding:12px 26px;font-size:16px;font-weight:bold;cursor:pointer;transition:background 0.3s;">Return to Study Guide</button>
      </div>
    `;

    overlay.querySelector('#finishLocalPowersGame').addEventListener('click', () => {
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
function launchWhoLeadsGame(key) {
  // First, aggressively hide ALL presentation elements (match-game style)
  if (progressWrapper) {
    progressWrapper.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important;';
  }
  if (studyContent) {
    studyContent.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important;';
  }
  const studySection = document.querySelector('.study-section');
  if (studySection) {
    studySection.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important; min-height: 0 !important;';
  }

  // Make presentation container minimal and consistent with match game
  if (presentationContainer) {
    presentationContainer.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:flex-start; min-height:0; padding:0; margin:0; background:#eef5f9;';
  }

  // Only show back button
  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // Create overlay
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">💰 Local Finances Challenge</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">
      Choose which local financial official or concept fits each situation.
    </p>

    <div id="whoLeadsQuestion" style="
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

    <div class="whoLeadsButtons" style="
      display:flex;
      flex-direction:column;
      gap:12px;
      align-items:center;
      margin-top:16px;
    ">
      <button class="leaderBtn" data-leader="County Auditor" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">📘 County Auditor</button>

      <button class="leaderBtn" data-leader="County Treasurer" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">💵 County Treasurer</button>

      <button class="leaderBtn" data-leader="Levy" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">📊 Levy</button>
    </div>

    <p id="whoLeadsFeedback" style="text-align:center; margin-top:16px; font-weight:600; color:#1b263b;"></p>

    <div class="progress" style="margin-top:20px; width:80%; height:10px; background:#d8e3ef; border-radius:6px; overflow:hidden;">
      <div id="whoLeadsBar" style="height:100%; width:0%; background:#1b263b; transition:width 0.4s ease;"></div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // Game data (LOCAL FINANCES)
  const questions = [
    { q: "Who is responsible for assessing property values and keeping financial records for the county?", a: "County Auditor" },
    { q: "Who collects property taxes that fund schools, safety, and local services?", a: "County Treasurer" },
    { q: "What is a voter-approved property tax used to fund schools or fire departments?", a: "Levy" },
    { q: "Who helps make sure county money is spent properly and budgets are balanced?", a: "County Auditor" },
    { q: "Who manages and tracks the flow of tax money coming into the county?", a: "County Treasurer" },
    { q: "When citizens vote to approve new funding for a public library, what are they passing?", a: "Levy" }
  ];

  let current = 0;
  let correct = 0;

  // Scoped elements
  const qEl = overlay.querySelector('#whoLeadsQuestion');
  const feedback = overlay.querySelector('#whoLeadsFeedback');
  const bar = overlay.querySelector('#whoLeadsBar');
  const buttons = overlay.querySelectorAll('.leaderBtn');

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

  // Button logic
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.leader;
      const correctAns = questions[current].a;

      buttons.forEach(b => b.disabled = true);

      if (answer === correctAns) {
        correct++;
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "#00c853";
        btn.style.background = "#e7fbf0";
        btn.style.borderColor = "#00c853";
      } else {
        feedback.textContent = `❌ Not quite — that’s the ${correctAns}.`;
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

  // Start game
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
    <div id="districtSorterGame" style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:calc(100vh - 120px); padding:40px 20px;
      background:linear-gradient(180deg,#ffffff 0%,#e8f5ff 100%);
      font-family:'Georgia',serif; color:#1b263b; text-align:center;
    ">
      <div style="
        background:#f8fbff; border:2px solid #9ec9e2; border-radius:20px;
        padding:36px 28px; max-width:780px; width:100%;
        box-shadow:0 6px 18px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
      ">
        <h2 style="font-size:30px; margin:0;">🏫 District Sorter</h2>
        <p style="margin-top:10px; font-size:17px; color:#2c4969;">
          Decide if each situation belongs to a <strong>Local District</strong> ✅ or is <strong>Not Their Job</strong> ❌.
        </p>

        <div id="districtSorterBins" style="
          display:flex; justify-content:space-around; margin:30px 0 20px;
          flex-wrap:wrap; gap:20px;
        ">
          <div id="localBin" class="drop-zone" style="
            width:240px; height:160px; background:#d0f0c0;
            border:3px dashed #2d6a4f; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#1b4332;
            transition:background 0.3s ease, transform 0.3s ease;
          ">✅ Local District</div>

          <div id="notJobBin" class="drop-zone" style="
            width:240px; height:160px; background:#fde2e4;
            border:3px dashed #b23a48; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#641220;
            transition:background 0.3s ease, transform 0.3s ease;
          ">❌ Not Their Job</div>
        </div>

        <div id="districtSorterCard" draggable="true" style="
          background:#ffffff; border:1px solid #9ec9e2; border-radius:12px;
          padding:24px 20px; font-size:18px; color:#1b263b;
          cursor:grab; width:80%; max-width:500px; margin:0 auto;
          box-shadow:0 4px 10px rgba(0,0,0,0.15);
          transition:transform 0.3s ease, box-shadow 0.3s ease;
        ">Loading scenario...</div>

        <p id="districtSorterFeedback" style="
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

  // 🔹 Game Logic — “Districts” version
  const scenarios = [
    { text: "A school board approves a new math curriculum for local schools.", correct: "local", feedback: "✅ That’s a School District job — they manage public education!" },
    { text: "The Board of Health sets up a vaccination clinic for the county.", correct: "local", feedback: "✅ Correct! Public Health Departments handle health and safety programs." },
    { text: "The Ohio General Assembly passes a new statewide law.", correct: "notJob", feedback: "❌ That’s state government, not a local district." },
    { text: "A special district repairs broken water lines in several towns.", correct: "local", feedback: "✅ Right — special districts handle shared services like water or transit." },
    { text: "The Governor appoints judges to the Ohio Supreme Court.", correct: "notJob", feedback: "❌ Not their job — local districts don’t manage state courts." }
  ];

  let currentScenario = 0;
  let correctCount = 0;

  const card = overlay.querySelector("#districtSorterCard");
  const feedbackEl = overlay.querySelector("#districtSorterFeedback");
  const localBin = overlay.querySelector("#localBin");
  const notJobBin = overlay.querySelector("#notJobBin");

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
          background:#ffffff; border:2px solid #9ec9e2; border-radius:20px;
          padding:40px 30px; max-width:620px; width:100%;
          box-shadow:0 6px 16px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
        ">
          <h2 style="margin:0; font-size:30px;">🌟 Great Job, District Sorter!</h2>
          <p style="margin-top:18px;">You sorted <strong>${correctCount}</strong> of <strong>${scenarios.length}</strong> correctly.</p>
          <p style="color:#2c4969; margin-top:8px;">You know how Ohio’s local districts keep communities running smoothly!</p>
          <button id="finishDistrictSorter" style="
            margin-top:26px; background:#2d6a4f; color:#fff;
            font-weight:bold; border:none; border-radius:12px;
            padding:12px 28px; cursor:pointer; font-size:17px;
            transition:all 0.3s ease;
          ">Return to Study Guide</button>
        </div>
      </div>
    `;

    overlay.querySelector("#finishDistrictSorter").addEventListener("click", () => {
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

  [localBin, notJobBin].forEach(bin => {
    bin.addEventListener("dragover", e => {
      e.preventDefault();
      bin.classList.add("active");
    });
    bin.addEventListener("dragleave", () => bin.classList.remove("active"));
    bin.addEventListener("drop", e => {
      e.preventDefault();
      bin.classList.remove("active");
      const choice = bin.id === "localBin" ? "local" : "notJob";
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
