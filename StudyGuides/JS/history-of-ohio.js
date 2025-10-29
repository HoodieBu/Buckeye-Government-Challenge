/***********************
 * Slides for each section
 ***********************/
const ALL_SECTIONS = {
  'statehoodandfounding': [
    { title: "Section 1: Becoming a State", content: "Ohio became the 17th state of the United States in 1803, following the Northwest Ordinance of 1787 that set rules for forming new states." },
    { title: "Section 2: Ohio’s First Governor", content: "Edward Tiffin served as Ohio’s first governor from 1803 to 1807, helping organize the new state’s government." },
    { title: "Section 3: Early Capital Cities", content: "Chillicothe was the first state capital, followed by Zanesville briefly, and then Columbus was chosen for its central location and accessibility." },
  ],

  'geographyandresources': [
    { title: "Section 1: Key Rivers and Borders", content: "The Ohio River forms much of the state’s southern border, while Lake Erie defines its northern edge, shaping trade and settlement." },
    { title: "Section 2: Natural Resources", content: "Early Ohio was rich in coal, timber, oil, natural gas, and fertile farmland — resources that powered its early economy." },
    { title: "Section 3: Transportation and Growth", content: "The Ohio & Erie Canal, railroads, and Great Lakes shipping routes connected Ohio to national markets and fueled its development." },
  ],

  'industrialgrowth': [
    { title: "Section 1: Early Industries", content: "Agriculture, coal, steel, manufacturing, and transportation helped Ohio grow into a major industrial state in the 19th century." },
    { title: "Section 2: The Rubber and Steel Cities", content: "Akron became known as the 'Rubber Capital of the World,' and Cleveland and Youngstown were key centers of steel production." },
    { title: "Section 3: Modern Economy", content: "Ohio’s economy shifted from manufacturing to include healthcare, education, technology, and logistics while keeping strong industry roots." },
  ],

  'socialmovementsandwars': [
    { title: "Section 1: The Civil War and Leadership", content: "Ohio supported the Union in the Civil War, supplying troops and leaders like Ulysses S. Grant and William T. Sherman." },
    { title: "Section 2: The Abolition Movement", content: "Ohio was a center for abolitionists and the Underground Railroad, offering routes and safe houses for enslaved people seeking freedom." },
    { title: "Section 3: World War II and Industry", content: "During WWII, Ohio’s factories produced aircraft, tanks, and supplies, playing a major role in the U.S. war effort." },
  ],

  'innovationandleadership': [
    { title: "Section 1: The Wright Brothers", content: "Orville and Wilbur Wright of Dayton invented the first powered airplane in 1903, marking a major milestone in history." },
    { title: "Section 2: Presidents from Ohio", content: "Eight U.S. Presidents were born in Ohio, including Grant, McKinley, and Harding — earning Ohio the title 'Mother of Presidents'." },
    { title: "Section 3: The Toledo War", content: "In 1835–36, Ohio and Michigan clashed over the Toledo Strip in a boundary dispute known as the Toledo War." },
  ],

  'modernchallengesandlegacy': [
    { title: "Section 1: Environmental Reform", content: "The 1969 Cuyahoga River fire in Cleveland sparked national concern and helped lead to the U.S. Clean Water Act." },
    { title: "Section 2: Immigration and Culture", content: "Immigrants from Germany, Ireland, and Eastern Europe helped shape Ohio’s culture, workforce, and cities." },
    { title: "Section 3: Ohio’s Ongoing Role", content: "From innovation to industry, Ohio continues to influence America’s economy, politics, and culture through its diverse communities." },
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

    if (key === 'statehoodandfounding') {
        launchMatchGame(key);
        } else if (key === 'geographyandresources') {
        launchGeographyAndResourcesGame(key);
        } else if (key === 'industrialgrowth') {
        launchIndustrialGrowthMatchGame(key);
        } else if (key === 'socialmovementsandwars') { 
        launchSocialMovementsAndWarsGame(key)
        } else if (key === 'innovationandleadership') { 
        launchInnovationLeadershipGame(key)
        } else if (key === 'modernchallengesandlegacy') {
        launchModernChallengesGame(key)
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
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Match the Ohio Statehood Facts!</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">Match each statement about Ohio’s founding and early history to the correct category.</p>

    <div class="matchGame" style="margin-top:18px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
      <div class="branch" data-office="statehood" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px;">Becoming a State</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem;">How and when Ohio officially joined the United States</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>

      <div class="branch" data-office="leadership" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px;">Early Leadership</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem;">Ohio’s first leaders and the formation of its government</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>

      <div class="branch" data-office="capitals" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
        <h3 style="color:white; text-align:center; margin-bottom:15px;">Early Capitals</h3>
        <p style="color:#a9bcd0; text-align:center; font-size:0.85rem;">Where Ohio’s government was first located</p>
        <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
      </div>
    </div>

    <div class="tasks" style="margin-top:25px; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
      <!-- Statehood -->
      <div class="task" draggable="true" data-office="statehood" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Became the 17th U.S. state in 1803</div>
      <div class="task" draggable="true" data-office="statehood" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Formed under the 1787 Northwest Ordinance</div>
      <div class="task" draggable="true" data-office="statehood" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Created rules for new states in the Northwest Territory</div>

      <!-- Leadership -->
      <div class="task" draggable="true" data-office="leadership" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Edward Tiffin served as first governor (1803–1807)</div>
      <div class="task" draggable="true" data-office="leadership" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Helped organize the state’s new government</div>
      <div class="task" draggable="true" data-office="leadership" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Established a model for early state institutions</div>

      <!-- Capitals -->
      <div class="task" draggable="true" data-office="capitals" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Chillicothe was the first capital of Ohio</div>
      <div class="task" draggable="true" data-office="capitals" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Zanesville briefly served as the capital</div>
      <div class="task" draggable="true" data-office="capitals" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab;">Columbus became capital for its central location</div>
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
      msg.textContent = '🎉 Great job! You matched all the statehood facts correctly!';
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
 function launchGeographyAndResourcesGame(key) {
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

  // 🔹 Geography and Resources Quiz Questions
  const questions = [
    {
      question: "Which major river forms Ohio’s southern border?",
      choices: ["Ohio River", "Cuyahoga River", "Scioto River", "Maumee River"],
      correct: 0,
    },
    {
      question: "What large body of water borders Ohio to the north?",
      choices: ["Lake Michigan", "Lake Erie", "Lake Ontario", "Lake Superior"],
      correct: 1,
    },
    {
      question: "Which region of Ohio is known for its rolling hills and coal deposits?",
      choices: ["Northwest Ohio", "Northeast Ohio", "Southeast Ohio", "Central Ohio"],
      correct: 2,
    },
    {
      question: "What type of natural resource is especially important in eastern Ohio?",
      choices: ["Oil and natural gas", "Copper", "Gold", "Saltwater"],
      correct: 0,
    },
    {
      question: "Which part of Ohio has the most farmland and flat plains?",
      choices: ["Appalachian Plateau", "Great Black Swamp region", "Glaciated Till Plains", "Hocking Hills region"],
      correct: 2,
    },
    {
      question: "Lake Erie contributes to Ohio’s economy through which industries?",
      choices: ["Fishing, shipping, and tourism", "Mining and forestry", "Desert travel", "Mountain skiing"],
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
          ${passed ? "🌎" : "🗺️"}
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
              ? "You know Ohio’s land, water, and resources — awesome work!"
              : "Review Ohio’s geography and natural resources, then try again!"
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
    <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">Ohio Geography and Resources Quiz</h2>
    <p style="text-align:center;margin-bottom:30px;color:#415a77;">Test your knowledge of Ohio’s land, regions, and natural resources!</p>
    <div class="quiz-content"></div>
  `;

  presentationContainer.appendChild(overlay);
  renderQuestion();
}

/* ---------- Executive Branch Minigame: The Governor’s Decision (Enhanced UI) ---------- */
function launchIndustrialGrowthMatchGame(key) {
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
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🏭 Industrial Growth Match-Up</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Decide whether each example is related to <strong>Industry</strong> or <strong>Transportation</strong> during the Industrial Growth era.
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
          <div id="growthProgressBar" style="height:10px;width:0%;background:#4caf50;border-radius:8px;transition:width 0.5s ease;"></div>
        </div>

        <div id="growthCard" style="
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
          <p id="growthScenario" style="font-size:18px;margin-bottom:20px;color:#eef5f9;">Loading...</p>
          <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
            <button id="industryBtn" style="background:#2196f3;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🏭 Industry</button>
            <button id="transportBtn" style="background:#ff9800;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🚂 Transportation</button>
          </div>
          <p id="growthFeedback" style="margin-top:18px;font-style:italic;min-height:22px;color:#9bb1d4;text-align:center;"></p>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data
  const scenarios = [
    {
      text: "Factories began producing goods faster using machines and assembly lines.",
      correct: "industry",
      feedback: "✅ Correct! Factories were central to industrial growth and mass production.",
    },
    {
      text: "Railroads connected Ohio to other parts of the country.",
      correct: "transportation",
      feedback: "✅ Yes! Railroads helped move people and goods efficiently across the nation.",
    },
    {
      text: "Workers moved from farms to cities to find jobs.",
      correct: "industry",
      feedback: "✅ That’s right! Urbanization grew as people worked in factories and mills.",
    },
    {
      text: "The construction of canals made it easier to ship products by water.",
      correct: "transportation",
      feedback: "✅ Exactly! Canals like the Ohio and Erie Canal boosted trade and travel.",
    },
    {
      text: "Steel mills and oil refineries expanded in cities like Cleveland and Pittsburgh.",
      correct: "industry",
      feedback: "✅ Correct! These industries powered economic growth in the Midwest.",
    },
    {
      text: "Steamboats carried goods and passengers along the Ohio River.",
      correct: "transportation",
      feedback: "✅ Yes! Steamboats revolutionized river travel during the 1800s.",
    },
    {
      text: "Inventors created new machines like the telegraph and mechanical reaper.",
      correct: "industry",
      feedback: "✅ Great! Inventions helped improve communication and production efficiency.",
    },
    {
      text: "New rail lines made it easier for farmers to sell crops in distant markets.",
      correct: "transportation",
      feedback: "✅ Correct! Better transportation expanded trade and boosted the economy.",
    },
  ];

  const scenarioEl = overlay.querySelector('#growthScenario');
  const feedbackEl = overlay.querySelector('#growthFeedback');
  const industryBtn = overlay.querySelector('#industryBtn');
  const transportBtn = overlay.querySelector('#transportBtn');
  const progressBar = overlay.querySelector('#growthProgressBar');

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
      feedbackEl.textContent = "🤔 Not quite — think about whether it’s about producing goods or moving them.";
      feedbackEl.style.color = "#e53935";
    }

    industryBtn.disabled = true;
    transportBtn.disabled = true;

    setTimeout(() => {
      current++;
      if (current < scenarios.length) {
        industryBtn.disabled = false;
        transportBtn.disabled = false;
        showScenario();
      } else {
        feedbackEl.textContent = "🎉 Great job! You understand how industry and transportation worked together to grow the nation!";
        feedbackEl.style.color = "#00c853";
        progressBar.style.width = "100%";
        setTimeout(() => completeTopic(key), 2000);
      }
    }, 1500);
  }

  industryBtn.addEventListener('click', () => handleChoice('industry'));
  transportBtn.addEventListener('click', () => handleChoice('transportation'));

  showScenario();
}

/* ---------- Judicial Branch Minigame: The Verdict Game (Enhanced Courtroom UI) ---------- */
function launchSocialMovementsAndWarsGame(key) {
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
      background:#f3f6ef;
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
      <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">✊ Social Movements & Wars Challenge</h2>
      <p style="text-align:center;margin-bottom:20px;color:#415a77;">
        Match each event or example to its correct movement or conflict!
      </p>

      <div style="
        background:#ffffff;
        border-radius:16px;
        padding:32px;
        max-width:760px;
        width:90%;
        border:3px solid #5b7553;
        box-shadow:0 8px 20px rgba(0,0,0,0.25);
        font-family:'Poppins',sans-serif;
        color:#1a2b3c;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      ">
        <div style="background:#dfe7dc;border-radius:10px;height:10px;width:100%;margin-bottom:22px;">
          <div id="socialProgressBar" style="height:10px;width:0%;background:#588157;border-radius:10px;transition:width 0.5s ease;"></div>
        </div>

        <div id="socialCard" style="
          background:#f9fff4;
          border:2px solid #5b7553;
          border-radius:20px;
          padding:24px;
          width:100%;
          max-width:600px;
          box-shadow:inset 0 0 10px rgba(0,0,0,0.1);
          text-align:center;
        ">
          <div style="margin-bottom:16px;font-size:20px;color:#0d1b2a;">📜 Scenario #<span id="socialNumber">1</span></div>
          <p id="socialCaseText" style="font-size:18px;line-height:1.6;margin-bottom:24px;color:#1a2b3c;">Loading scenario...</p>

          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
            <button class="socialBtn" data-choice="civilrights" style="background:#0077b6;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">✊ Civil Rights</button>
            <button class="socialBtn" data-choice="women" style="background:#e91e63;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">♀️ Women’s Rights</button>
            <button class="socialBtn" data-choice="labor" style="background:#ff9800;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">⚒️ Labor Movement</button>
            <button class="socialBtn" data-choice="wars" style="background:#4caf50;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">⚔️ Wars & Conflicts</button>
          </div>

          <div id="socialFeedback" style="margin-top:20px;font-style:italic;min-height:24px;text-align:center;transition:all 0.3s ease;"></div>
        </div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Scenarios (Movements & Conflicts)
  const scenarios = [
    {
      text: "Dr. Martin Luther King Jr. leads a march in Washington, D.C. for equal rights.",
      correct: "civilrights",
      feedback: "✊ Correct — this was part of the Civil Rights Movement for racial equality."
    },
    {
      text: "Women fight for the right to vote, leading to the 19th Amendment in 1920.",
      correct: "women",
      feedback: "♀️ Exactly — the Women’s Rights Movement secured the right to vote for women."
    },
    {
      text: "Factory workers go on strike demanding safer conditions and fair pay.",
      correct: "labor",
      feedback: "⚒️ Correct — this represents the Labor Movement for workers’ rights and protections."
    },
    {
      text: "American soldiers fight overseas in Europe during World War I.",
      correct: "wars",
      feedback: "⚔️ Right — this describes U.S. involvement in World War I."
    },
    {
      text: "Activists organize sit-ins at lunch counters to protest segregation.",
      correct: "civilrights",
      feedback: "✊ Yes — peaceful protests like sit-ins were key actions in the Civil Rights era."
    },
    {
      text: "Women work in factories during World War II as part of the war effort.",
      correct: "women",
      feedback: "♀️ Correct — women like 'Rosie the Riveter' helped power the war industry."
    },
    {
      text: "The U.S. sends troops to Korea to stop the spread of communism.",
      correct: "wars",
      feedback: "⚔️ Exactly — this represents the Korean War, part of Cold War conflicts."
    },
    {
      text: "Workers form unions to negotiate better pay and shorter workdays.",
      correct: "labor",
      feedback: "⚒️ Right — the rise of labor unions helped improve working conditions across America."
    }
  ];

  // 🔹 Elements
  const caseTextEl = overlay.querySelector('#socialCaseText');
  const feedbackEl = overlay.querySelector('#socialFeedback');
  const progressBar = overlay.querySelector('#socialProgressBar');
  const scenarioNumberEl = overlay.querySelector('#socialNumber');
  const buttons = overlay.querySelectorAll('.socialBtn');

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
      feedbackEl.textContent = "❌ Not quite — think about whether it’s about equality, labor, or wartime action.";
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
        <h2 style="color:#0d1b2a;margin-bottom:12px;">🎯 Social Movements & Wars Complete!</h2>
        <p style="margin-bottom:8px;">You correctly identified <strong>${score}</strong> out of <strong>${scenarios.length}</strong> key events.</p>
        <p style="color:#415a77;margin-bottom:20px;">You’ve learned how Americans fought for rights, equality, and peace through history.</p>
        <button id="finishSocialGame" style="margin-top:12px;background:#588157;color:#fff;border:none;border-radius:10px;padding:12px 26px;font-size:16px;font-weight:bold;cursor:pointer;transition:background 0.3s;">Return to Study Guide</button>
      </div>
    `;

    overlay.querySelector('#finishSocialGame').addEventListener('click', () => {
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
function launchInnovationLeadershipGame(key) {
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
      background:#f4f8ff;
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
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">💡 Innovation & Leadership Quiz</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">
      Decide whether each example describes an <strong>Inventor</strong>, <strong>Entrepreneur</strong>, or <strong>Public Leader</strong>.
    </p>

    <div id="innovationQuestion" style="
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

    <div class="innovationButtons" style="
      display:flex;
      flex-direction:column;
      gap:12px;
      align-items:center;
      margin-top:16px;
    ">
      <button class="innovationBtn" data-choice="Inventor" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🔬 Inventor</button>

      <button class="innovationBtn" data-choice="Entrepreneur" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🚀 Entrepreneur</button>

      <button class="innovationBtn" data-choice="Public Leader" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🏛️ Public Leader</button>
    </div>

    <p id="innovationFeedback" style="text-align:center; margin-top:16px; font-weight:600; color:#1b263b;"></p>

    <div class="progress" style="margin-top:20px; width:80%; height:10px; background:#d8e3ef; border-radius:6px; overflow:hidden;">
      <div id="innovationBar" style="height:100%; width:0%; background:#1b263b; transition:width 0.4s ease;"></div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data (INNOVATION & LEADERSHIP)
  const questions = [
    { q: "Developed the first practical electric light bulb to change everyday life.", a: "Inventor" },
    { q: "Started a business that created affordable automobiles using the assembly line.", a: "Entrepreneur" },
    { q: "Guided a state through major infrastructure improvements as its governor.", a: "Public Leader" },
    { q: "Created a machine that helped farmers produce crops faster.", a: "Inventor" },
    { q: "Opened a chain of grocery stores that offered lower prices and better service.", a: "Entrepreneur" },
    { q: "Promoted new education programs and job training in a growing city.", a: "Public Leader" },
    { q: "Patented a new type of engine that improved transportation.", a: "Inventor" },
    { q: "Founded a technology company that made computers accessible to families.", a: "Entrepreneur" },
    { q: "Led community efforts to expand voting rights and improve local government transparency.", a: "Public Leader" }
  ];

  let current = 0;
  let correct = 0;

  const qEl = overlay.querySelector('#innovationQuestion');
  const feedback = overlay.querySelector('#innovationFeedback');
  const bar = overlay.querySelector('#innovationBar');
  const buttons = overlay.querySelectorAll('.innovationBtn');

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
          feedback.textContent = "🎉 Great work! You understand how inventors, entrepreneurs, and leaders shape progress.";
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
function launchModernChallengesGame(key) {
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
      'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#f6faff;';
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
    <div id="modernChallengesGame" style="
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
        <h2 style="font-size:30px; margin:0;">🌆 Modern Challenges & Legacy Sorter</h2>
        <p style="margin-top:10px; font-size:17px; color:#2c4969;">
          Decide if each situation represents a <strong>Positive Legacy</strong> ✅ or an <strong>Ongoing Challenge</strong> ⚠️ in Ohio today.
        </p>

        <div id="modernBins" style="
          display:flex; justify-content:space-around; margin:30px 0 20px;
          flex-wrap:wrap; gap:20px;
        ">
          <div id="legacyBin" class="drop-zone" style="
            width:240px; height:160px; background:#d7f5e9;
            border:3px dashed #1b5e20; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#1b4332;
            transition:background 0.3s ease, transform 0.3s ease;
          ">✅ Positive Legacy</div>

          <div id="challengeBin" class="drop-zone" style="
            width:240px; height:160px; background:#fde2e4;
            border:3px dashed #b23a48; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#641220;
            transition:background 0.3s ease, transform 0.3s ease;
          ">⚠️ Ongoing Challenge</div>
        </div>

        <div id="modernCard" draggable="true" style="
          background:#ffffff; border:1px solid #a8c4f7; border-radius:12px;
          padding:24px 20px; font-size:18px; color:#1b263b;
          cursor:grab; width:80%; max-width:500px; margin:0 auto;
          box-shadow:0 4px 10px rgba(0,0,0,0.15);
          transition:transform 0.3s ease, box-shadow 0.3s ease;
        ">Loading scenario...</div>

        <p id="modernFeedback" style="
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

  // 🔹 Game Data — “Modern Challenges and Legacy”
  const scenarios = [
    {
      text: "Ohio’s manufacturing industry is cleaner and more efficient than ever before.",
      correct: "legacy",
      feedback: "✅ That’s a positive legacy — technology has helped reduce pollution and modernize factories."
    },
    {
      text: "Many small towns are still struggling to replace jobs lost from factory closures.",
      correct: "challenge",
      feedback: "⚠️ Ongoing challenge — economic change has hit some communities harder than others."
    },
    {
      text: "Ohio universities lead research in clean energy and medical innovation.",
      correct: "legacy",
      feedback: "✅ Positive legacy — Ohio’s higher education system drives progress and opportunity."
    },
    {
      text: "Urban areas face issues with affordable housing and public transportation.",
      correct: "challenge",
      feedback: "⚠️ Challenge — cities continue working to meet residents’ needs as populations grow."
    },
    {
      text: "Cultural festivals and museums preserve Ohio’s diverse history and heritage.",
      correct: "legacy",
      feedback: "✅ Yes — preserving history and culture strengthens Ohio’s legacy for future generations."
    },
    {
      text: "Rural communities struggle with access to broadband internet and healthcare.",
      correct: "challenge",
      feedback: "⚠️ Ongoing challenge — connecting rural areas remains a major issue for modern development."
    }
  ];

  let currentScenario = 0;
  let correctCount = 0;

  const card = overlay.querySelector("#modernCard");
  const feedbackEl = overlay.querySelector("#modernFeedback");
  const legacyBin = overlay.querySelector("#legacyBin");
  const challengeBin = overlay.querySelector("#challengeBin");

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
        min-height:calc(100vh - 120px); background:#eef6ff; text-align:center;
        color:#1b263b; font-family:'Georgia',serif;
      ">
        <div style="
          background:#ffffff; border:2px solid #a8c4f7; border-radius:20px;
          padding:40px 30px; max-width:620px; width:100%;
          box-shadow:0 6px 16px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
        ">
          <h2 style="margin:0; font-size:30px;">🌟 Great Job, History Builder!</h2>
          <p style="margin-top:18px;">You sorted <strong>${correctCount}</strong> of <strong>${scenarios.length}</strong> correctly.</p>
          <p style="color:#2c4969; margin-top:8px;">You understand how Ohio’s achievements and struggles shape its modern legacy!</p>
          <button id="finishModernSorter" style="
            margin-top:26px; background:#1b5e20; color:#fff;
            font-weight:bold; border:none; border-radius:12px;
            padding:12px 28px; cursor:pointer; font-size:17px;
            transition:all 0.3s ease;
          ">Return to Study Guide</button>
        </div>
      </div>
    `;

    overlay.querySelector("#finishModernSorter").addEventListener("click", () => {
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

  [legacyBin, challengeBin].forEach(bin => {
    bin.addEventListener("dragover", e => {
      e.preventDefault();
      bin.classList.add("active");
    });
    bin.addEventListener("dragleave", () => bin.classList.remove("active"));
    bin.addEventListener("drop", e => {
      e.preventDefault();
      bin.classList.remove("active");
      const choice = bin.id === "legacyBin" ? "legacy" : "challenge";
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

  showScenario();
}

})(); 
