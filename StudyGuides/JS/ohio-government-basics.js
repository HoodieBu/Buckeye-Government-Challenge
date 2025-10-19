document.addEventListener('DOMContentLoaded', () => {
  console.log('Study guide init (animated + no-jump version)');

  const slides = [
    { title: "Section 1: Introduction to Ohio Government", content: "Ohio’s government operates under a constitution that divides power among three branches: the executive, legislative, and judicial. This system ensures a balance of authority and accountability." },
    { title: "Section 2: Executive Branch", content: "The Governor leads the executive branch, ensuring that state laws are carried out and overseeing various departments and agencies." },
    { title: "Section 3: Legislative Branch", content: "The Ohio General Assembly consists of the House of Representatives and the Senate. They create and amend state laws." },
    { title: "Section 4: Judicial Branch", content: "Ohio’s courts interpret laws and ensure justice is served, with the Ohio Supreme Court being the highest judicial authority in the state." },
    { title: "Section 5: Local Government", content: "Cities, towns, and counties in Ohio manage local issues like education, safety, and public services, working within state laws." }
  ];

  let current = 0;
  const stepsEl = document.getElementById('progressSteps');
  const titleEl = document.getElementById('sectionTitle');
  const contentEl = document.getElementById('sectionContent');
  const nextBtn = document.getElementById('nextBtn');
  const studyContent = document.getElementById('studyContent');
  const progressLine = document.querySelector('.progress-line');

  if (!stepsEl || !titleEl || !contentEl || !nextBtn || !studyContent) {
    console.error('Missing DOM elements', { stepsEl, titleEl, contentEl, nextBtn, studyContent });
    return;
  }

  // Create green progress fill inside progress line
  const progressFill = document.createElement('div');
  progressFill.className = 'progress-fill';
  progressLine.appendChild(progressFill);

  // Build circles
  stepsEl.innerHTML = '';
  slides.forEach((_, i) => {
    const c = document.createElement('button');
    c.type = 'button';
    c.className = 'circle';
    c.setAttribute('data-index', i);
    c.setAttribute('aria-label', `Step ${i+1}`);

    const span = document.createElement('span');
    span.className = 'num';
    span.textContent = (i+1);
    c.appendChild(span);
    stepsEl.appendChild(c);

    // Click to jump
    c.addEventListener('click', (ev) => {
      ev.preventDefault();
      const prevScroll = window.scrollY;
      const idx = Number(ev.currentTarget.getAttribute('data-index'));

      if (idx > current) {
        for (let j = 0; j < idx; j++) markCompleted(j);
      } else if (idx < current) {
        for (let j = idx+1; j < slides.length; j++) unmarkCompleted(j);
      }
      current = idx;
      goToSlide(true);

      try { ev.currentTarget.blur(); } catch(e){ /* ignore */ }
      window.scrollTo({ top: prevScroll, left: 0, behavior: 'auto' });
    });
  });

  const circles = Array.from(document.querySelectorAll('.circle'));

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
    if (num) num.textContent = index + 1;
  }

  function setActive(index) {
    circles.forEach((el, idx) => {
      el.classList.toggle('active', idx === index);
    });
  }

  // Smooth green fill progress bar
  function updateLineProgress() {
    if (!progressFill) return;
    const total = slides.length - 1;
    const percent = (current / total) * 100;
    progressFill.style.width = `${percent}%`;
  }

  // Slide fade transition
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

      nextBtn.textContent = (current === slides.length - 1) ? 'Finish' : 'Go to Next';
      if (current === slides.length - 1) nextBtn.removeAttribute('disabled');

      studyContent.classList.remove('fade-out');
      studyContent.classList.add('fade-in');

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: prevScroll, left: 0, behavior: 'auto' });
      });
    }, skipFade ? 0 : 300);
  }

  // Next button handler
  nextBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const prevScroll = window.scrollY;
    try { ev.currentTarget.blur(); } catch(e){}

    if (current < slides.length - 1) {
      markCompleted(current);
      current++;
      goToSlide();

      if (window.innerWidth < 800) {
        document.getElementById('studyContent').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: prevScroll, left: 0, behavior: 'auto' });
      }
    } else {
      markCompleted(current);
      updateLineProgress();
      nextBtn.disabled = true;
      nextBtn.textContent = '✅ Finished';
      setTimeout(() => alert('🎉 You finished the study guide!'), 200);
      try { ev.currentTarget.blur(); } catch(e){}
    }
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      if (current < slides.length - 1) { markCompleted(current); current++; goToSlide(); updateLineProgress(); }
    } else if (e.key === 'ArrowLeft') {
      if (current > 0) { unmarkCompleted(current-1); current--; goToSlide(); updateLineProgress(); }
    }
  });

  // Init
  goToSlide(true);
  updateLineProgress();
  console.log('Study guide ready — slides:', slides.length);
});
