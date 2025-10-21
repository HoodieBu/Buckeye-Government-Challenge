/***********************
     * Slides for each section
     * (You can expand/replace content for each)
     ***********************/
    const ALL_SECTIONS = {
      /* (your sections unchanged) */
      'ohio-basics': [
        { title: "Section 1: Introduction to Ohio Government", content: "Ohio’s government operates under a constitution that divides power among three branches: the executive, legislative, and judicial. This system ensures a balance of authority and accountability." },
        { title: "Section 2: Executive Branch", content: "The Governor leads the executive branch, ensuring that state laws are carried out and overseeing various departments and agencies." },
        { title: "Section 3: Legislative Branch", content: "The Ohio General Assembly consists of the House of Representatives and the Senate. They create and amend state laws." },
        { title: "Section 4: Judicial Branch", content: "Ohio’s courts interpret laws and ensure justice is served, with the Ohio Supreme Court being the highest judicial authority in the state." },
        { title: "Section 5: Local Government", content: "Cities, towns, and counties in Ohio manage local issues like education, safety, and public services, working within state laws." }
      ],
      /* …other sections unchanged… */
      'branches': [
        { title: "Branches: Overview", content: "The three branches are separate but interdependent: Legislature (writes laws), Executive (executes laws), Judicial (interprets laws)." },
        { title: "Legislature Details", content: "The General Assembly crafts state laws, appropriates funds, and can propose constitutional amendments." },
        { title: "Executive Details", content: "Governor, Lieutenant Governor, and statewide elected officials manage departments and execute state policy." },
        { title: "Judicial Details", content: "Trial courts, appellate courts, and the Ohio Supreme Court form the court system." }
      ],
      'local': [
        { title: "Local Government: What It Is", content: "Local governments include counties, municipalities, and townships that handle local services like police, fire, and zoning." },
        { title: "County Government", content: "Counties manage jails, courts, public records, and infrastructure." },
        { title: "Municipal Government", content: "Cities and towns provide utilities, local police, public works, and community services." }
      ],
      'constitution': [
        { title: "Ohio Constitution: Purpose", content: "The Ohio Constitution is the state's highest law; it defines government powers and protects citizen rights." },
        { title: "Major Sections", content: "It covers the structure of government, taxation, rights, and amendment procedures." },
        { title: "Amendments", content: "The constitution can be amended by legislatively referred amendments or citizen-initiated petitions." }
      ],
      'elections': [
        { title: "Elections: Basics", content: "Elections choose representatives at local, state, and federal levels. Voter registration is required before voting." },
        { title: "Voting Methods", content: "Ohio offers in-person voting, early voting, and absentee/mail-in ballots under qualifying rules." },
        { title: "Election Administration", content: "Boards of Elections run elections in each county, oversee ballots and certify results." }
      ],
      'rights': [
        { title: "Citizenship & Rights", content: "Citizens have constitutional rights including free speech, due process, and equal protection under the law." },
        { title: "Responsibilities", content: "Responsibilities include obeying laws, voting, paying taxes, and serving on juries when called." },
        { title: "Protections", content: "Certain rights are protected by the U.S. Constitution and the Ohio Constitution; courts interpret how those protections apply." }
      ]
    };

    /***********************
     * Presentation system (reusable)
     ***********************/
    (function () {
      // DOM references (static)
      const sectionsGrid = document.getElementById('sectionsGrid');
      const presentationContainer = document.getElementById('presentationContainer');
      const backButton = document.getElementById('backButton');
      const progressWrapper = document.querySelector('.progress-wrapper');
      const progressLine = document.querySelector('.progress-line');
      const progressStepsEl = document.getElementById('progressSteps');
      const studyContent = document.getElementById('studyContent');
      const titleEl = document.getElementById('sectionTitle');
      const contentEl = document.getElementById('sectionContent');

      // dynamic (will be set per presentation)
      let progressFillEl = null;
      let circles = [];
      let slides = [];
      let current = 0;

      // handlers we will attach/remove
      let onNextClick = null;
      let onKeyDown = null;
      let onResize = null;

      // cleanup function to remove previous listeners and reset DOM
      function cleanupPresentation() {
        // remove progress fill if exists
        if (progressFillEl && progressFillEl.parentNode) {
          progressFillEl.parentNode.removeChild(progressFillEl);
        }
        progressFillEl = null;

        // clear steps
        progressStepsEl.innerHTML = '';
        circles = [];

        // remove next button listener if set
        const nextBtnOld = document.getElementById('nextBtn');
        if (nextBtnOld && onNextClick) {
          nextBtnOld.removeEventListener('click', onNextClick);
        }

        // remove keydown listener
        if (onKeyDown) {
          window.removeEventListener('keydown', onKeyDown);
          onKeyDown = null;
        }

        // remove resize listener
        if (onResize) {
          window.removeEventListener('resize', onResize);
          onResize = null;
        }

        // reset next button text and enable state
        if (nextBtnOld) {
          nextBtnOld.disabled = false;
          nextBtnOld.textContent = 'Go to Next';
        }
      }

      // mark/unmark helpers
      function markCompleted(index) {
        const el = circles[index];
        if (!el) return;
        el.classList.add('completed');
        el.classList.remove('active');
        const num = el.querySelector('.num');
        if (num) num.textContent = '✔';
      }
      function unmarkCompleted(index) {
        const el = circles[index];
        if (!el) return;
        el.classList.remove('completed');
        const num = el.querySelector('.num');
        if (num) num.textContent = (index + 1);
      }
      function setActive(index) {
        circles.forEach((el, idx) => {
          el.classList.toggle('active', idx === index);
        });
      }

      // New: compute progress fill using circles' center positions (pixels)
      function updateLineProgress() {
        if (!progressFillEl || circles.length === 0) return;

        // parent that progressFill is appended to -> progressWrapper
        const wrapperRect = progressWrapper.getBoundingClientRect();

        // compute center X positions of each circle relative to progressWrapper
        const centers = circles.map(c => {
          const r = c.getBoundingClientRect();
          return (r.left + r.right) / 2 - wrapperRect.left;
        });

        const firstCenter = centers[0];
        const lastCenter = centers[centers.length - 1];
        const currentCenter = centers[Math.min(current, centers.length - 1)];

        // place the visible background 'line' so it visually lines up (optional tweak)
        // keep the existing .progress-line appearance; we're only controlling the green fill.

        // set fill left and width so it starts at the first circle center and extends to current circle center
        const left = Math.round(firstCenter);
        const width = Math.max(0, Math.round(currentCenter - firstCenter));

        // assign styles (progressFill positioned relative to progressWrapper)
        progressFillEl.style.left = left + 'px';
        progressFillEl.style.width = width + 'px';
      }

      function goToSlide(skipFade = false) {
        const s = slides[current];
        if (!s) return;

        const prevScroll = window.scrollY;
        studyContent.classList.remove('fade-in');
        studyContent.classList.add('fade-out');

        setTimeout(() => {
          titleEl.textContent = s.title;
          contentEl.textContent = s.content;

          setActive(current);
          circles.forEach((el, idx) => {
            if (idx < current) markCompleted(idx);
            else unmarkCompleted(idx);
          });

          updateLineProgress();

          const nextBtn = document.getElementById('nextBtn');
          if (nextBtn) {
            nextBtn.textContent = (current === slides.length - 1) ? 'Finish' : 'Go to Next';
            if (current === slides.length - 1) nextBtn.removeAttribute('disabled');
          }

          studyContent.classList.remove('fade-out');
          studyContent.classList.add('fade-in');

          window.requestAnimationFrame(() => {
            window.scrollTo({ top: prevScroll, left: 0, behavior: 'auto' });
          });
        }, skipFade ? 0 : 300);
      }

      // init for a slide set
      function initPresentationFor(slideSet) {
        // cleanup any previous state/listeners
        cleanupPresentation();

        slides = slideSet || [];
        current = 0;

        // inject progressFill element
        progressFillEl = document.createElement('div');
        progressFillEl.className = 'progress-fill';
        // ensure it's appended to the progress-wrapper so coordinates line up with circles
        if (progressWrapper) {
          progressWrapper.appendChild(progressFillEl);
        } else if (progressLine && progressLine.parentNode) {
          progressLine.parentNode.appendChild(progressFillEl);
        }

        // build circles
        progressStepsEl.innerHTML = '';
        circles = [];
        slides.forEach((_, i) => {
          const c = document.createElement('button');
          c.type = 'button';
          c.className = 'circle';
          c.setAttribute('data-index', i);
          c.setAttribute('aria-label', `Step ${i+1}`);

          const span = document.createElement('span');
          span.className = 'num';
          span.textContent = (i + 1);
          c.appendChild(span);
          progressStepsEl.appendChild(c);
          circles.push(c);

          // click handler for circle (jump)
          c.addEventListener('click', (ev) => {
            ev.preventDefault();
            const idx = Number(ev.currentTarget.getAttribute('data-index'));
            if (isNaN(idx)) return;

            if (idx > current) {
              for (let j = 0; j < idx; j++) markCompleted(j);
            } else if (idx < current) {
              for (let j = idx+1; j < slides.length; j++) unmarkCompleted(j);
            }
            current = idx;
            goToSlide(true);
            try { ev.currentTarget.blur(); } catch(e){ /* ignore */ }
          });
        });

        // initial active/circles state
        setActive(0);
        circles.forEach((el, idx) => {
          if (idx < 0) markCompleted(idx);
          else unmarkCompleted(idx);
        });

        // compute progress after DOM painted (centers require layout)
        window.requestAnimationFrame(() => {
          updateLineProgress();
        });

        // handle window resize to recompute pixel positions
        onResize = function () { updateLineProgress(); };
        window.addEventListener('resize', onResize);

        // next button handler - attach fresh
        const nextBtn = document.getElementById('nextBtn');
        onNextClick = function (ev) {
          ev.preventDefault();
          try { ev.currentTarget.blur(); } catch(e){}

          if (current < slides.length - 1) {
            markCompleted(current);
            current++;
            goToSlide();
            updateLineProgress();
            if (window.innerWidth < 800) {
              document.getElementById('studyContent').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            // finish
            markCompleted(current);
            updateLineProgress();
            nextBtn.disabled = true;
            nextBtn.textContent = '✅ Finished';
            setTimeout(() => { try { alert('🎉 You finished the study guide!'); } catch(e){} }, 200);
            try { ev.currentTarget.blur(); } catch(e){}
          }
        };
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.addEventListener('click', onNextClick);
        }

        // keyboard support: left/right arrows
        onKeyDown = function (e) {
          if (e.key === 'ArrowRight') {
            if (current < slides.length - 1) { markCompleted(current); current++; goToSlide(); updateLineProgress(); }
          } else if (e.key === 'ArrowLeft') {
            if (current > 0) { unmarkCompleted(current-1); current--; goToSlide(); updateLineProgress(); }
          }
        };
        window.addEventListener('keydown', onKeyDown);

        // initial render
        goToSlide(true);
        updateLineProgress();
      }

      /* Hook up menu clicks */
      sectionsGrid.addEventListener('click', (ev) => {
        const card = ev.target.closest('.section-card');
        if (!card) return;
        const key = card.dataset.key;
        if (!key) {
          alert('This section is coming soon!');
          return;
        }
        const slideSet = ALL_SECTIONS[key];
        if (!slideSet) {
          alert('Slides for this section are not available.');
          return;
        }
        // show presentation and init slides
        document.getElementById('menuWrap').style.display = 'none';
        presentationContainer.classList.add('presentation-active');
        // small timeout to allow CSS display change (not required, but nicer)
        setTimeout(() => initPresentationFor(slideSet), 40);
      });

      /* Back button */
      backButton.addEventListener('click', () => {
        // cleanup listeners and reset DOM
        cleanupPresentation();
        // hide presentation container, show menu
        presentationContainer.classList.remove('presentation-active');
        document.getElementById('menuWrap').style.display = '';
        // reset title/content to placeholder
        titleEl.textContent = 'Loading…';
        contentEl.textContent = 'Please wait…';
      });

      // expose for debugging (optional)
      window.__initPresentationFor = initPresentationFor;
    })();
