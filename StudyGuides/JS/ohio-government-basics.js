/***********************
 * Slides for each section
 ***********************/
const ALL_SECTIONS = {
  'structure': [
    { title: "Section 1: The Three Branches of Government", content: "Ohio's government has three branches that work together to keep power balanced. The legislative branch (the General Assembly) makes the laws. The executive branch (led by the Governor) carries out the laws. The judicial branch (the court system) interprets the laws and makes sure they are applied fairly." },
    { title: "Section 2: Ohio's Constitution", content: "The Ohio Constitution is the foundation of the state's government. It explains how Ohio is organized and how its three branches — legislative, executive, and judicial — share power. The Constitution lists the rights and freedoms of Ohio's citizens, describes how state laws are created, and sets rules for how government officials are chosen and what they can do. It helps make sure the government is fair, balanced, and serves the people of Ohio." },
    { title: "Section 3: Ohio vs. U.S. Government", content: "The Ohio government and the U.S. government are similar because both have three branches — legislative, executive, and judicial — and both make and enforce laws. However, the Ohio government focuses only on state issues, like schools, roads, and local taxes, while the U.S. government handles national issues, such as defense and foreign policy. This means Ohio's laws apply just within the state, while federal laws apply to the whole country." },
  ],
  'legislative': [
    { title: "Section 1: Two Houses of the General Assembly", content: "The Ohio General Assembly has two houses that work together to make state laws. The House of Representatives has 99 members who represent smaller districts, and the Senate has 33 members who represent larger districts. Both houses must agree on a bill before it can become a law in Ohio." },
    { title: "Section 2: Terms and Qualifications", content: "Members of the Ohio House of Representatives serve two-year terms, and members of the Ohio Senate serve four-year terms. To qualify, a person must be at least 18 years old, live in their district for at least one year before the election, and be a registered voter in Ohio." },
    { title: "Section 3: Making and Passing Laws", content: "In Ohio, a bill starts as an idea that is written and introduced in the General Assembly. Both the House and Senate must discuss and approve it. After that, the Governor reviews the bill and can sign it into law or veto it. If vetoed, the General Assembly can override the veto with a three-fifths vote." },
  ],
  'executive': [
    { title: "Section 1: The Governor of Ohio", content: "The Governor of Ohio is the state's chief executive and leader of the government. The Governor's job is to enforce state laws, prepare the budget, and work with the General Assembly to make sure Ohio runs smoothly." },
    { title: "Section 2: State Budget and Finances", content: "The state budget is a plan for how Ohio's money will be collected and spent. The Governor prepares the budget and sends it to the General Assembly for approval. The Auditor of State checks that all public money is used properly and spent for the right purposes." },
    { title: "Section 3: The Attorney General's Role", content: "The Ohio Attorney General is the state's top lawyer. Their job is to protect the legal rights of Ohio and its citizens. They represent the state in court, give legal advice to state agencies, and help make sure laws are followed fairly across Ohio." }
  ],
  'judicial': [
    { title: "Section 1: Role of the Judicial Branch", content: "The judicial branch is the part of Ohio's government that interprets the laws and makes sure they are applied fairly. It settles disagreements, protects people's rights, and ensures that laws follow the Ohio and U.S. Constitutions." },
    { title: "Section 2: The Ohio Supreme Court", content: "The Ohio Supreme Court is the highest court in the state. It reviews important cases and decides if laws or government actions follow the Ohio and U.S. Constitutions. The court's decisions guide all other courts in Ohio." },
    { title: "Section 3: Other State Courts", content: "Below the Ohio Supreme Court are appeals courts and local courts, which handle cases involving individuals, businesses, and communities. These courts make most of the day-to-day legal decisions in Ohio and ensure that justice is carried out fairly across the state." },
  ],
  'leadershiproles': [
    { title: "Section 1: President of the Ohio Senate", content: "The President of the Ohio Senate is the leader of the Senate. They guide discussions, decide which bills are debated, and help manage the work of the senators. The President also works with other state leaders to move important laws forward." },
    { title: "Section 2: Speaker of the House", content: "The Speaker of the House is the leader of the Ohio House of Representatives. They run meetings, decide which bills are discussed, and help organize the work of the representatives. The Speaker plays an important role in guiding laws through the House." },
    { title: "Section 3: Cooperation Between Leaders", content: "In Ohio's government, leaders like the Governor, Senate President, and Speaker of the House work together to create and pass laws. Their cooperation helps keep the government running smoothly and ensures that decisions reflect the needs of the people of Ohio." },
  ],
  'citizenshipandvoting': [
    { title: "Section 1: Voting Requirements in Ohio", content: "To vote in Ohio, you must be a U.S. citizen, at least 18 years old by the next general election, and a resident of Ohio for at least 30 days before the election. You must also not be in prison for a felony, not declared incompetent to vote by a court, and not permanently banned from voting for breaking election laws." },
    { title: "Section 2: Ohio's Counties", content: "Ohio is divided into 88 counties, each with its own local government that helps carry out state laws and provide services like roads, law enforcement, and public records. Counties make it easier to manage and serve the people who live in different parts of the state." },
    { title: "Section 3: Citizen Participation", content: "Citizen participation means getting involved in government by voting, sharing opinions, and staying informed about issues. When citizens take part, they help shape the decisions that affect their communities and the state." },
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

    if (key === 'structure') {
        launchMatchGame(key);
        } else if (key === 'legislative') {
        launchLawmakerGame(key);
        } else if (key === 'executive') {
        launchGovernorDecisionGame(key);
        } else if (key === 'judicial') { 
        launchVerdictGame(key)
        } else if (key === 'leadershiproles') { 
        launchWhoLeadsGame(key)
        } else if (key === 'citizenshipandvoting') {
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
    
    // Remove the study-section wrapper if it exists
    const studySection = document.querySelector('.study-section');
    if (studySection) {
      studySection.style.cssText = 'display: none !important; height: 0 !important; margin: 0 !important; padding: 0 !important; min-height: 0 !important;';
    }
    
    // Set presentation container to be minimal
    if (presentationContainer) {
      presentationContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: flex-start; min-height: 0; padding: 0; margin: 0; background: #eef5f9;';
    }
    
    // Only show back button
    if (backButton) {
      backButton.style.display = 'block';
      backButton.style.margin = '20px';
    }
    
    const overlay = createOverlayWrapper();

    overlay.innerHTML = `
      <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Match the Powers!</h2>
      <p style="text-align:center; margin-bottom:20px; color:#415a77;">Drag each power or responsibility to the correct branch of Ohio's government.</p>
      <div class="matchGame" style="margin-top:18px; display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
        <div class="branch" data-branch="legislative" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
          <h3 style="color:white; text-align:center; margin-bottom:15px; font-size:1.3rem;">Legislative Branch</h3>
          <p style="color:#a9bcd0; text-align:center; font-size:0.85rem; margin-bottom:10px;">Ohio General Assembly</p>
          <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
        </div>
        <div class="branch" data-branch="executive" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
          <h3 style="color:white; text-align:center; margin-bottom:15px; font-size:1.3rem;">Executive Branch</h3>
          <p style="color:#a9bcd0; text-align:center; font-size:0.85rem; margin-bottom:10px;">Led by the Governor</p>
          <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
        </div>
        <div class="branch" data-branch="judicial" style="background:#0d1b2a; border:2px solid #415a77; padding:20px; border-radius:8px; min-height:250px;">
          <h3 style="color:white; text-align:center; margin-bottom:15px; font-size:1.3rem;">Judicial Branch</h3>
          <p style="color:#a9bcd0; text-align:center; font-size:0.85rem; margin-bottom:10px;">Court System</p>
          <div class="dropzone" style="min-height:150px; border:2px dashed #778da9; border-radius:5px; padding:10px; display:flex; flex-direction:column; gap:8px;"></div>
        </div>
      </div>
      <div class="tasks" style="margin-top:25px; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
        <div class="task" draggable="true" data-branch="legislative" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Creates state laws</div>
        <div class="task" draggable="true" data-branch="executive" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Enforces laws</div>
        <div class="task" draggable="true" data-branch="judicial" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Interprets laws</div>
        <div class="task" draggable="true" data-branch="legislative" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Passes the state budget</div>
        <div class="task" draggable="true" data-branch="executive" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Prepares the budget</div>
        <div class="task" draggable="true" data-branch="judicial" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Reviews laws for fairness</div>
        <div class="task" draggable="true" data-branch="legislative" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Has House and Senate</div>
        <div class="task" draggable="true" data-branch="executive" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Can veto bills</div>
        <div class="task" draggable="true" data-branch="judicial" style="background:#778da9; color:white; padding:10px 16px; border-radius:8px; cursor:grab; border:2px solid #415a77; font-size:0.95rem;">Ohio Supreme Court leads</div>
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
      const branches = overlay.querySelectorAll('.branch');
      
      branches.forEach(b => {
        const zone = b.querySelector('.dropzone');
        const droppedTasks = zone.querySelectorAll('.task');
        
        droppedTasks.forEach(t => {
          total++;
          if (t.dataset.branch === b.dataset.branch) {
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
        msg.textContent = '🎉 Perfect! All matches are correct!';
        msg.style.color = '#00c853';
        this.style.display = 'none';
        setTimeout(() => completeTopic(key), 2000);
      } else {
        msg.textContent = `You got ${correct} out of ${total} correct. Try again!`;
        msg.style.color = '#e53935';
        
        // Reset colors after 2 seconds
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
  function launchLawmakerGame(key) {
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

    const questions = [
      {
        question: "How many members are in the Ohio House of Representatives?",
        choices: ["33 members", "50 members", "99 members", "150 members"],
        correct: 2
      },
      {
        question: "How many members are in the Ohio Senate?",
        choices: ["33 members", "50 members", "99 members", "100 members"],
        correct: 0
      },
      {
        question: "How long is a term for an Ohio House Representative?",
        choices: ["1 year", "2 years", "4 years", "6 years"],
        correct: 1
      },
      {
        question: "How long is a term for an Ohio Senator?",
        choices: ["2 years", "4 years", "6 years", "8 years"],
        correct: 1
      },
      {
        question: "What happens after the Governor vetoes a bill?",
        choices: ["The bill is dead forever", "The General Assembly can override with 3/5 vote", "The bill automatically becomes law", "Only the Senate can override"],
        correct: 1
      },
      {
        question: "What must both houses do before a bill becomes law?",
        choices: ["Only discuss it", "Approve it", "Send it to voters", "Ignore it"],
        correct: 1
      }
    ];

    let currentQ = 0;
    let score = 0;
    let selectedAnswer = null;

    function renderQuestion() {
      const q = questions[currentQ];
      const quizContent = overlay.querySelector('.quiz-content');
      
      quizContent.innerHTML = `
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <span style="color:#415a77; font-weight:600;">Question ${currentQ + 1} of ${questions.length}</span>
            <span style="color:#415a77; font-weight:600;">Score: ${score}/${currentQ}</span>
          </div>
          <div style="width:100%; height:8px; background:#e0e0e0; border-radius:10px; overflow:hidden; margin-bottom:20px;">
            <div style="width:${((currentQ) / questions.length) * 100}%; height:100%; background:#34a853; transition: width 0.3s;"></div>
          </div>
        </div>
        
        <h3 style="color:#0d1b2a; font-size:1.3rem; margin-bottom:25px; line-height:1.4;">${q.question}</h3>
        
        <div class="choices" style="display:flex; flex-direction:column; gap:12px;">
          ${q.choices.map((choice, idx) => `
            <button class="choice-btn" data-index="${idx}" style="
              background:#fff;
              border:2px solid #415a77;
              color:#0d1b2a;
              padding:16px 20px;
              border-radius:10px;
              cursor:pointer;
              font-size:1rem;
              text-align:left;
              transition: all 0.3s;
            ">${choice}</button>
          `).join('')}
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
          transition: all 0.3s;
        " disabled>Submit Answer</button>
        
        <p class="feedback" style="margin-top:15px; font-weight:600; text-align:center; font-size:16px; min-height:24px;"></p>
      `;

      const choiceBtns = quizContent.querySelectorAll('.choice-btn');
      const submitBtn = quizContent.querySelector('#submitAnswer');
      const feedback = quizContent.querySelector('.feedback');
      
      selectedAnswer = null;

      choiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          choiceBtns.forEach(b => {
            b.style.background = '#fff';
            b.style.borderColor = '#415a77';
          });
          btn.style.background = '#e3f2fd';
          btn.style.borderColor = '#1b263b';
          selectedAnswer = parseInt(btn.dataset.index, 10);
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
          feedback.textContent = '';
        });
      });

      submitBtn.addEventListener('click', () => {
        if (selectedAnswer === null) return;

        choiceBtns.forEach(btn => btn.style.pointerEvents = 'none');
        submitBtn.disabled = true;

        const isCorrect = selectedAnswer === q.correct;
        if (isCorrect) {
          score++;
          choiceBtns[selectedAnswer].style.background = '#00c853';
          choiceBtns[selectedAnswer].style.borderColor = '#00c853';
          choiceBtns[selectedAnswer].style.color = 'white';
          feedback.textContent = '✓ Correct!';
          feedback.style.color = '#00c853';
        } else {
          choiceBtns[selectedAnswer].style.background = '#e53935';
          choiceBtns[selectedAnswer].style.borderColor = '#e53935';
          choiceBtns[selectedAnswer].style.color = 'white';
          choiceBtns[q.correct].style.background = '#00c853';
          choiceBtns[q.correct].style.borderColor = '#00c853';
          choiceBtns[q.correct].style.color = 'white';
          feedback.textContent = '✗ Incorrect. The correct answer is highlighted.';
          feedback.style.color = '#e53935';
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
      
      overlay.querySelector('.quiz-content').innerHTML = `
        <div style="text-align:center; padding:30px 20px;">
          <div style="font-size:4rem; margin-bottom:20px;">
            ${passed ? '🎉' : '📚'}
          </div>
          <h2 style="color:#0d1b2a; font-size:2rem; margin-bottom:15px;">
            ${passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          <p style="color:#415a77; font-size:1.2rem; margin-bottom:25px;">
            You scored <strong style="color:#0d1b2a; font-size:1.5rem;">${score}/${questions.length}</strong>
          </p>
          <div style="width:100%; max-width:300px; height:20px; background:#e0e0e0; border-radius:10px; overflow:hidden; margin:0 auto 25px;">
            <div style="width:${percentage}%; height:100%; background:${passed ? '#00c853' : '#ff9800'}; transition: width 0.5s;"></div>
          </div>
          <p style="color:#415a77; font-size:1rem; margin-bottom:30px;">
            ${passed 
              ? 'Great job! You have a strong understanding of the Legislative Branch!' 
              : 'Review the material and try again to improve your score!'}
          </p>
          ${passed 
            ? '<p style="color:#00c853; font-size:1.1rem; font-weight:600;">✓ Topic Completed!</p>' 
            : `<button id="retryQuiz" style="padding:12px 30px; background:#1b263b; color:white; border:none; border-radius:8px; cursor:pointer; font-size:16px;">Try Again</button>`
          }
        </div>
      `;

      if (passed) {
        setTimeout(() => completeTopic(key), 2500);
      } else {
        const retryBtn = overlay.querySelector('#retryQuiz');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            currentQ = 0;
            score = 0;
            renderQuestion();
          });
        }
      }
    }

    overlay.innerHTML = `
      <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">Legislative Branch Quiz</h2>
      <p style="text-align:center; margin-bottom:30px; color:#415a77;">Test your knowledge about Ohio's Legislative Branch!</p>
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
function launchGovernorDecisionGame(key) {
  // 🔹 Hide all presentation and study elements
  if (progressWrapper) {
    progressWrapper.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  }
  if (studyContent) {
    studyContent.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  }

  const studySection = document.querySelector('.study-section');
  if (studySection) {
    studySection.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';
  }

  if (presentationContainer) {
    presentationContainer.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#eef5f9;';
  }

  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Create overlay for the game
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">🏛️ Governor’s Decision</h2>
    <p style="text-align:center;margin-bottom:20px;color:#415a77;">You’re the Governor of Ohio! Choose whether to <strong>Sign</strong> or <strong>Veto</strong> each bill wisely.</p>

    <div style="background:#0d1b2a;border-radius:16px;padding:28px;max-width:650px;width:100%;box-shadow:0 4px 16px rgba(0,0,0,0.3);">
      <div style="background:#415a77;border-radius:8px;height:10px;width:100%;margin:18px 0;">
        <div id="govProgressBar" style="height:10px;width:0%;background:#00c853;border-radius:8px;transition:width 0.5s ease;"></div>
      </div>

      <div id="govCard" style="background:#1b263b;border-radius:12px;padding:24px;box-shadow:inset 0 0 8px rgba(0,0,0,0.4);margin-top:10px;">
        <p id="govBillText" style="font-size:18px;margin-bottom:20px;color:#eef5f9;">Loading bill...</p>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button id="signBtn" style="background:#2d6a4f;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">✅ Sign Bill</button>
          <button id="vetoBtn" style="background:#c1121f;border:none;border-radius:8px;color:white;padding:10px 20px;font-size:16px;cursor:pointer;transition:background 0.3s;">🚫 Veto Bill</button>
        </div>
        <p id="govFeedback" style="margin-top:18px;font-style:italic;min-height:22px;color:#9bb1d4;text-align:center;"></p>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Game data
  const bills = [
    { text: "A bill to increase teacher salaries to attract more qualified educators.", correct: "sign", feedback: "✅ Great! Supporting education helps Ohio’s future." },
    { text: "A bill to remove safety inspections for restaurants to cut costs.", correct: "veto", feedback: "🚫 Good veto! Public health and safety come first." },
    { text: "A bill that lowers taxes for small businesses.", correct: "sign", feedback: "✅ Smart move! This supports Ohio’s local economy." },
    { text: "A bill that removes environmental protections on rivers and parks.", correct: "veto", feedback: "🚫 Good call! Protecting nature keeps Ohio beautiful." },
    { text: "A bill that funds new highway repairs through a slight gas tax.", correct: "sign", feedback: "✅ Excellent! Better roads mean safer travel for everyone." }
  ];

  // 🔹 Select elements
  const billTextEl = overlay.querySelector('#govBillText');
  const feedbackEl = overlay.querySelector('#govFeedback');
  const signBtn = overlay.querySelector('#signBtn');
  const vetoBtn = overlay.querySelector('#vetoBtn');
  const progressBar = overlay.querySelector('#govProgressBar');

  let currentBill = 0;

  function showBill() {
    const bill = bills[currentBill];
    billTextEl.textContent = bill.text;
    feedbackEl.textContent = '';
    progressBar.style.width = ((currentBill / bills.length) * 100) + "%";
  }

  function handleDecision(choice) {
    const bill = bills[currentBill];
    if (choice === bill.correct) {
      feedbackEl.textContent = bill.feedback;
      feedbackEl.style.color = "#00c853";
    } else {
      feedbackEl.textContent = "🤔 Not the best choice — think about what helps Ohio’s people most.";
      feedbackEl.style.color = "#e53935";
    }

    signBtn.disabled = true;
    vetoBtn.disabled = true;

    setTimeout(() => {
      currentBill++;
      if (currentBill < bills.length) {
        signBtn.disabled = false;
        vetoBtn.disabled = false;
        showBill();
      } else {
        feedbackEl.textContent = "🎉 Great work, Governor! You’ve completed your term!";
        feedbackEl.style.color = "#00c853";
        progressBar.style.width = "100%";
        setTimeout(() => completeTopic(key), 2000);
      }
    }, 1500);
  }

  signBtn.addEventListener('click', () => handleDecision('sign'));
  vetoBtn.addEventListener('click', () => handleDecision('veto'));

  showBill();
}

/* ---------- Judicial Branch Minigame: The Verdict Game (Enhanced Courtroom UI) ---------- */
function launchVerdictGame(key) {
  // 🔹 Hide other presentation elements (same logic as match game)
  if (progressWrapper) {
    progressWrapper.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  }
  if (studyContent) {
    studyContent.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;';
  }

  const studySection = document.querySelector('.study-section');
  if (studySection) {
    studySection.style.cssText = 'display:none!important;height:0!important;margin:0!important;padding:0!important;min-height:0!important;';
  }

  if (presentationContainer) {
    presentationContainer.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#eef5f9;';
  }

  if (backButton) {
    backButton.style.display = 'block';
    backButton.style.margin = '20px';
  }

  // 🔹 Create overlay container
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <h2 style="text-align:center;margin-bottom:10px;color:#0d1b2a;">⚖️ The Verdict Game</h2>
    <p style="text-align:center;margin-bottom:20px;color:#415a77;">Step into the courtroom. Hear each case and deliver your verdict.</p>

    <div style="background:#fff8ed;border-radius:16px;padding:32px;max-width:760px;width:100%;border:3px solid #c7a16b;box-shadow:0 8px 20px rgba(0,0,0,0.25);font-family:'Georgia',serif;color:#2b1e16;">
      <div style="background:#d9c3a5;border-radius:10px;height:10px;width:100%;margin-bottom:22px;">
        <div id="verdictProgressBar" style="height:10px;width:0%;background:#4f772d;border-radius:10px;transition:width 0.5s ease;"></div>
      </div>

      <div id="verdictCard" style="background:#fdfaf6;border:2px solid #c7a16b;border-radius:20px;padding:24px;box-shadow:inset 0 0 10px rgba(0,0,0,0.1);">
        <div style="text-align:center;margin-bottom:16px;font-size:20px;color:#7c5c2e;">📜 Case #<span id="caseNumber">1</span></div>
        <p id="verdictCaseText" style="font-size:18px;line-height:1.6;margin-bottom:24px;color:#2b1e16;">Loading case...</p>

        <div style="display:flex;justify-content:center;gap:18px;">
          <button id="guiltyBtn" style="background:#8b0000;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">🔨 Guilty</button>
          <button id="notGuiltyBtn" style="background:#0b8457;border:none;border-radius:10px;color:white;padding:12px 24px;font-size:16px;cursor:pointer;font-weight:bold;transition:background 0.3s;">✅ Not Guilty</button>
        </div>

        <div id="verdictFeedback" style="margin-top:20px;font-style:italic;min-height:24px;text-align:center;transition:all 0.3s ease;"></div>
      </div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // 🔹 Case data
  const cases = [
    {
      text: "A driver accidentally hits another car while avoiding a child who ran into the road. No one is hurt.",
      correct: "notGuilty",
      feedback: "✅ Correct — this was an accident, not a crime. Intent matters in criminal law."
    },
    {
      text: "A store owner is caught changing price tags to overcharge customers.",
      correct: "guilty",
      feedback: "⚖️ Right — that’s fraud, and it’s illegal."
    },
    {
      text: "A teen accidentally breaks a window while throwing a baseball in a park.",
      correct: "notGuilty",
      feedback: "✅ Not guilty — it’s property damage, but not a criminal act. Civil court might handle it."
    },
    {
      text: "A person steals a phone from a public bench and runs away.",
      correct: "guilty",
      feedback: "🚨 Correct — theft is a clear criminal offense."
    },
    {
      text: "A protester peacefully holds a sign outside city hall.",
      correct: "notGuilty",
      feedback: "🗽 Correct — that’s protected under the First Amendment."
    }
  ];

  // 🔹 Elements
  const caseTextEl = overlay.querySelector('#verdictCaseText');
  const feedbackEl = overlay.querySelector('#verdictFeedback');
  const guiltyBtn = overlay.querySelector('#guiltyBtn');
  const notGuiltyBtn = overlay.querySelector('#notGuiltyBtn');
  const progressBar = overlay.querySelector('#verdictProgressBar');
  const caseNumberEl = overlay.querySelector('#caseNumber');

  let currentCase = 0;
  let correctCount = 0;

  function showCase() {
    const current = cases[currentCase];
    caseNumberEl.textContent = currentCase + 1;
    caseTextEl.textContent = current.text;
    feedbackEl.textContent = '';
    feedbackEl.style.background = 'none';
    progressBar.style.width = ((currentCase / cases.length) * 100) + "%";
  }

  function handleVerdict(choice) {
    const current = cases[currentCase];
    guiltyBtn.disabled = true;
    notGuiltyBtn.disabled = true;

    if (choice === current.correct) {
      correctCount++;
      feedbackEl.textContent = current.feedback;
      feedbackEl.style.color = '#1b4332';
    } else {
      feedbackEl.textContent = "❌ Not quite — verdicts must be based on evidence and intent.";
      feedbackEl.style.color = '#7b1d1d';
    }

    setTimeout(() => {
      currentCase++;
      if (currentCase < cases.length) {
        guiltyBtn.disabled = false;
        notGuiltyBtn.disabled = false;
        showCase();
      } else {
        showResults();
      }
    }, 1700);
  }

  function showResults() {
    overlay.innerHTML = `
      <h2 style="text-align:center;color:#0d1b2a;margin-bottom:12px;">🧑‍⚖️ The Verdict Is In!</h2>
      <p style="text-align:center;margin-bottom:8px;">You made <strong>${correctCount}</strong> out of <strong>${cases.length}</strong> fair decisions.</p>
      <p style="text-align:center;color:#5b4636;margin-bottom:20px;">Justice served — well done, juror!</p>
      <button id="finishVerdictGame" style="margin-top:12px;background:#4f772d;color:#fff;border:none;border-radius:10px;padding:12px 26px;font-size:16px;font-weight:bold;cursor:pointer;transition:background 0.3s;">Return to Study Guide</button>
    `;

    overlay.querySelector('#finishVerdictGame').addEventListener('click', () => {
      overlay.remove();
      completeTopic(key);
    });
  }

  guiltyBtn.addEventListener('click', () => handleVerdict('guilty'));
  notGuiltyBtn.addEventListener('click', () => handleVerdict('notGuilty'));

  showCase();
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

  // Create overlay (same pattern as match game)
  const overlay = createOverlayWrapper();
  overlay.innerHTML = `
    <h2 style="text-align:center; margin-bottom:10px; color:#0d1b2a;">🏛️ Who Leads Ohio?</h2>
    <p style="text-align:center; margin-bottom:20px; color:#415a77;">
      Choose which leader is responsible for each situation.
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
      <button class="leaderBtn" data-leader="Governor" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🧑‍⚖️ Governor</button>

      <button class="leaderBtn" data-leader="Speaker of the House" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🏠 Speaker of the House</button>

      <button class="leaderBtn" data-leader="President of the Senate" style="
        background:#ffffff; border:2px solid #415a77; color:#0d1b2a;
        padding:12px 18px; border-radius:8px; cursor:pointer;
        font-size:16px; width:300px; transition:background 0.3s, transform 0.2s;
      ">🏛️ President of the Senate</button>
    </div>

    <p id="whoLeadsFeedback" style="text-align:center; margin-top:16px; font-weight:600; color:#1b263b;"></p>

    <div class="progress" style="margin-top:20px; width:80%; height:10px; background:#d8e3ef; border-radius:6px; overflow:hidden;">
      <div id="whoLeadsBar" style="height:100%; width:0%; background:#1b263b; transition:width 0.4s ease;"></div>
    </div>
  `;

  presentationContainer.appendChild(overlay);

  // Game data
  const questions = [
    { q: "Who decides which bills are debated in the Senate?", a: "President of the Senate" },
    { q: "Who runs meetings and debates in the House of Representatives?", a: "Speaker of the House" },
    { q: "Who signs or vetoes bills after they pass both chambers?", a: "Governor" },
    { q: "Who helps organize the work of representatives in the House?", a: "Speaker of the House" },
    { q: "Who works with the Governor to move laws forward in the Senate?", a: "President of the Senate" },
    { q: "Who can call leaders together to discuss new state laws?", a: "Governor" }
  ];

  let current = 0;
  let correct = 0;

  // Scoped element references inside overlay (match-game style)
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

  // Attach listeners (scoped)
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.leader;
      const correctAns = questions[current].a;

      // disable immediately so user can't double-click
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
          // final progress and then finish like match game
          bar.style.width = "100%";
          setTimeout(() => {
            // remove the overlay and mark topic complete (consistent with match game)
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
      'display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0;padding:0;margin:0;background:#fdfaf5;';
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
    <div id="mailSorterGame" style="
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:calc(100vh - 120px); padding:40px 20px;
      background:linear-gradient(180deg,#ffffff 0%,#fffaf2 100%);
      font-family:'Georgia',serif; color:#3b2f2f; text-align:center;
    ">
      <div style="
        background:#fffaf2; border:2px solid #d4b483; border-radius:20px;
        padding:36px 28px; max-width:780px; width:100%;
        box-shadow:0 6px 18px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
      ">
        <h2 style="font-size:30px; margin:0;">📮 Mail Sorter: The Ballot Center</h2>
        <p style="margin-top:10px; font-size:17px; color:#6e4e24;">
          Sort each ballot correctly! Drag it to <strong>Count It!</strong> ✅ or <strong>Reject It!</strong> ❌ based on the rule shown.
        </p>

        <div id="mailSorterBins" style="
          display:flex; justify-content:space-around; margin:30px 0 20px;
          flex-wrap:wrap; gap:20px;
        ">
          <div id="countBin" class="drop-zone" style="
            width:240px; height:160px; background:#d8f3dc;
            border:3px dashed #74c69d; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#1b4332;
            transition:background 0.3s ease, transform 0.3s ease;
          ">✅ Count It!</div>

          <div id="rejectBin" class="drop-zone" style="
            width:240px; height:160px; background:#ffe5ec;
            border:3px dashed #b02a37; border-radius:16px;
            display:flex; align-items:center; justify-content:center;
            font-weight:bold; font-size:18px; color:#7f1d1d;
            transition:background 0.3s ease, transform 0.3s ease;
          ">❌ Reject It!</div>
        </div>

        <div id="mailSorterCard" draggable="true" style="
          background:#fffefb; border:1px solid #d4b483; border-radius:12px;
          padding:24px 20px; font-size:18px; color:#3b2f2f;
          cursor:grab; width:80%; max-width:500px; margin:0 auto;
          box-shadow:0 4px 10px rgba(0,0,0,0.15);
          transition:transform 0.3s ease, box-shadow 0.3s ease;
        ">Loading ballot...</div>

        <p id="mailSorterFeedback" style="
          margin-top:24px; font-style:italic; min-height:24px;
          color:#6e4e24; opacity:0; transition:opacity 0.4s ease;
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

  // 🔹 Game Logic
  const ballots = [
    { text: "Postmarked the day before Election Day.", correct: "count", feedback: "✅ Counted! It was sent on time." },
    { text: "No voter signature on the envelope.", correct: "reject", feedback: "❌ Rejected. The signature is required for verification." },
    { text: "Dropped off at a polling place on Election Day.", correct: "count", feedback: "✅ Counted! Hand-delivered ballots on time are valid." },
    { text: "Postmarked two days after Election Day.", correct: "reject", feedback: "❌ Rejected. It missed the postmark deadline." },
    { text: "Voter included ID and signature, sent a week early.", correct: "count", feedback: "✅ Counted! Properly filled and sent early." }
  ];

  let currentBallot = 0;
  let correctCount = 0;

  const card = overlay.querySelector("#mailSorterCard");
  const feedbackEl = overlay.querySelector("#mailSorterFeedback");
  const countBin = overlay.querySelector("#countBin");
  const rejectBin = overlay.querySelector("#rejectBin");

  function showBallot() {
    const current = ballots[currentBallot];
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
        min-height:calc(100vh - 120px); background:#fffaf2; text-align:center;
        color:#3b2f2f; font-family:'Georgia',serif;
      ">
        <div style="
          background:#fff; border:2px solid #d4b483; border-radius:20px;
          padding:40px 30px; max-width:620px; width:100%;
          box-shadow:0 6px 16px rgba(0,0,0,0.25); animation:fadeIn 0.6s ease-in-out;
        ">
          <h2 style="margin:0; font-size:30px;">📬 Great Work, Mail Sorter!</h2>
          <p style="margin-top:18px;">You sorted <strong>${correctCount}</strong> of <strong>${ballots.length}</strong> ballots correctly.</p>
          <p style="color:#6e4e24; margin-top:8px;">You kept the election fair and accurate — democracy thanks you!</p>
          <button id="finishMailSorter" style="
            margin-top:26px; background:#8cbf3f; color:#3b2f2f;
            font-weight:bold; border:none; border-radius:12px;
            padding:12px 28px; cursor:pointer; font-size:17px;
            transition:all 0.3s ease;
          ">Return to Study Guide</button>
        </div>
      </div>
    `;

    overlay.querySelector("#finishMailSorter").addEventListener("click", () => {
      overlay.remove();
      completeTopic(key);
    });
  }

  // 🔹 Drag & Drop Logic
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "ballot");
    setTimeout(() => (card.style.opacity = "0.5"), 0);
  });
  card.addEventListener("dragend", () => (card.style.opacity = "1"));

  [countBin, rejectBin].forEach(bin => {
    bin.addEventListener("dragover", e => {
      e.preventDefault();
      bin.classList.add("active");
    });
    bin.addEventListener("dragleave", () => bin.classList.remove("active"));
    bin.addEventListener("drop", e => {
      e.preventDefault();
      bin.classList.remove("active");
      const choice = bin.id === "countBin" ? "count" : "reject";
      const current = ballots[currentBallot];

      if (choice === current.correct) {
        correctCount++;
        giveFeedback(current.feedback, "#2d6a4f");
      } else {
        giveFeedback("❌ Not quite — review the ballot rules!", "#b02a37");
      }

      setTimeout(() => {
        currentBallot++;
        if (currentBallot < ballots.length) showBallot();
        else showResults();
      }, 1500);
    });
  });

  showBallot();
}
})(); 
