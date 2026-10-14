export default function initFlight() {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = RM.matches;
  const root = document.documentElement;

  /* ---------- AllDazeWork eagle mark (from alldaze-logo.svg) ---------- */
  const BODY = 'M212.988 3.14556L102.185 2.5694C102.185 2.5694 74.6902 7.18137 84.1276 50.4202C84.1276 50.4202 75.9201 51.5725 59.0951 30.8173C59.0951 30.8173 50.8876 18.7099 40.2176 26.2054C40.2176 26.2054 36.5251 5.45015 53.7601 2.56663L5.39234e-06 1.99048C5.39234e-06 1.99048 8.61746 26.2054 41.4475 49.8413C41.4475 49.8413 61.145 64.8323 87.4101 68.8653C87.4101 68.8653 126.805 75.2057 156.353 57.9102C156.353 57.9102 190.825 42.3431 212.985 3.14001L212.988 3.14556Z';
  const CUTS = [
    'M62.9921 9.30981L56.2906 9.9463C56.2906 9.9463 55.3651 12.1684 59.0643 12.8049C59.0643 12.8049 61.1439 12.4866 62.9921 9.30981Z',
    'M213.635 0.000634541C213.928 -0.09622 209.46 10.9258 204.116 11.6592C182.943 14.562 156.458 11.2496 144.386 11.2662C143.235 11.2662 120.509 10.6574 120.507 10.7294C120.483 11.518 193.408 14.9024 199.352 15.157C199.352 15.157 203.028 15.6856 207.324 14.0197C208.777 13.4579 210.429 10.8456 210.818 10.2451C213.232 6.5231 213.234 0.133466 213.632 0.00340452L213.635 0.000634541Z',
    'M206.041 12.9392C206.29 12.8612 202.657 21.7363 198.112 22.329C180.135 24.6811 157.466 22.0482 147.176 22.0732C146.193 22.0732 126.142 20.7256 126.142 20.7848C126.134 21.4181 189.49 24.9556 194.562 25.1521C194.562 25.1521 197.25 25.5702 200.888 24.2257C202.117 23.7702 203.485 21.6677 203.807 21.1841C205.806 18.1863 205.706 13.0453 206.041 12.9392Z',
    'M197.715 24.8095C197.917 24.7431 192.597 32.01 188.432 32.7295C173.916 35.2339 158.302 32.5192 149.953 32.5385C149.155 32.5385 132.578 31.4344 132.578 31.4842C132.571 32.021 182.239 34.9129 186.354 35.0817C186.354 35.0817 189.638 34.2847 192.589 33.1446C193.587 32.7599 195.444 29.9567 195.706 29.5471C197.327 27.0123 197.442 24.8981 197.715 24.8095Z',
    'M188.882 34.2182C189.084 34.1518 183.764 41.4187 179.599 42.1382C165.083 44.6425 149.47 41.9279 141.12 41.9472C140.323 41.9472 136.995 41.6733 136.995 41.7231C136.987 42.2599 173.406 44.3215 177.521 44.4903C177.521 44.4903 180.805 43.6934 183.756 42.5533C184.754 42.1686 186.611 39.3654 186.873 38.9558C188.495 36.421 188.609 34.3068 188.882 34.2182Z',
    'M178.425 43.5578C178.628 43.4914 173.936 48.3507 168.104 50.5092C163.428 52.2387 160.57 52.4463 152.517 52.8614C151.722 52.9029 140.525 52.1502 140.567 52.1696C141.801 52.723 163.168 54.6601 167.714 53.4148C167.714 53.4148 171.871 52.4463 173.235 51.201C174.04 50.4649 176.155 48.7049 176.417 48.2954C178.038 45.7606 178.153 43.6464 178.425 43.5578Z'
  ];
  document.querySelectorAll('[data-eagle]').forEach((el, i) => {
    const id = 'egm' + i;
    el.innerHTML = `<svg class="eagle" viewBox="-1 -1 216 72" role="presentation" focusable="false"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-1" y="-1" width="216" height="72"><rect x="-1" y="-1" width="216" height="72" fill="#fff"/>${CUTS.map(d => `<path d="${d}" fill="#000"/>`).join('')}</mask></defs><path d="${BODY}" fill="currentColor" mask="url(#${id})"/></svg>`;
    el.replaceWith(el.firstElementChild);
  });

  /* ---------- Scroll state + nav ---------- */
  const nav = document.getElementById('nav');
  const hero = document.getElementById('top');
  const stack = document.getElementById('stack');
  const links = [...document.querySelectorAll('#links a')];
  const pill = document.getElementById('pill');
  const targets = links.map(a => document.querySelector(a.getAttribute('href')));
  const S = { dirty: true, docH: 1, vh: innerHeight, alt: 0, active: -1 };
  const measure = () => { S.vh = innerHeight; S.docH = Math.max(1, root.scrollHeight - S.vh); S.dirty = true; placePill(); };
  addEventListener('scroll', () => { S.dirty = true; }, { passive: true });
  addEventListener('resize', measure, { passive: true });

  function placePill() {
    const a = links[S.active];
    if (!a) { pill.style.setProperty('--o', 0); return; }
    pill.style.setProperty('--x', a.offsetLeft + 'px');
    pill.style.setProperty('--w', a.offsetWidth + 'px');
    pill.style.setProperty('--o', 1);
  }
  function updateScroll() {
    const y = scrollY;
    root.style.setProperty('--p', Math.min(1, y / S.docH).toFixed(4));
    const hh = hero.offsetHeight;
    const solid = y > hh - 80;
    nav.classList.toggle('solid', solid);
    nav.classList.toggle('lift', !solid && y > 24);
    S.alt = Math.min(1, Math.max(0, y / Math.max(1, hh)));
    if (!reduced && stack) stack.style.setProperty('--by', (-y * 0.18).toFixed(1) + 'px');
    let idx = -1;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= S.vh * 0.4) idx = i; });
    const ct = document.getElementById('contact').getBoundingClientRect().top;
    if (ct <= S.vh * 0.4) idx = -1;
    if (idx !== S.active) {
      S.active = idx;
      links.forEach((a, i) => a.toggleAttribute('aria-current', i === idx));
      placePill();
    }
  }

  /* ---------- Mobile menu ---------- */
  const menu = document.getElementById('menu'), menuBtn = document.getElementById('menuBtn'), menuClose = document.getElementById('menuClose');
  let lastFocus = null;
  menu.querySelectorAll('ol a').forEach((a, i) => { a.style.transitionDelay = (reduced ? 0 : 90 + i * 50) + 'ms'; });
  function openMenu() {
    lastFocus = document.activeElement; menu.hidden = false; document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('open')));
    setTimeout(() => menuClose.focus(), reduced ? 0 : 100);
  }
  function closeMenu(restore = true) {
    menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
    const done = () => { if (!menu.classList.contains('open')) menu.hidden = true; };
    reduced ? done() : setTimeout(done, 600);
    if (restore && lastFocus) lastFocus.focus();
  }
  menuBtn.addEventListener('click', openMenu);
  menuClose.addEventListener('click', () => closeMenu());
  menu.querySelectorAll('ol a').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); closeMenu(false);
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); const h = t.querySelector('h2'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
  }));
  menu.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const f = [...menu.querySelectorAll('a[href],button')]; const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- Reveals (content visible at rest) ---------- */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: .1 });
    document.querySelectorAll('.rv').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) io.observe(el); });
  }

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.cap button').forEach(b => b.addEventListener('click', () => {
    const li = b.closest('.cap'), open = li.dataset.open !== 'true';
    li.dataset.open = String(open); b.setAttribute('aria-expanded', String(open));
  }));

  /* ---------- Copy email ---------- */
  const copyBtn = document.getElementById('copyBtn'), copyMsg = document.getElementById('copyMsg'), mail = document.getElementById('mailAddr');
  copyBtn.addEventListener('click', () => {
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(mail); const s = getSelection(); s.removeAllRanges(); s.addRange(r); copyMsg.textContent = 'Selected. Press Ctrl+C or ⌘C to copy.'; };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(mail.textContent.trim()).then(() => { copyMsg.textContent = 'Copied.'; }).catch(fallback);
    else fallback();
  });

  /* ---------- Lead form ---------- */
  const form = document.getElementById('lead');
  const F = { name: form.elements.name, email: form.elements.email, business: form.elements.business, goal: form.elements.goal, message: form.elements.message };
  const KEY = 'adw-lead-draft';
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* unavailable */ } },
    clear() { try { localStorage.removeItem(KEY); } catch { /* unavailable */ } }
  };
  const draft = store.get(); Object.entries(F).forEach(([k, el]) => { if (draft[k]) el.value = draft[k]; });
  const rules = {
    name: v => v.trim().length >= 2 ? '' : 'Add your name so we know who to reply to.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter an email like you@business.com.',
    goal: v => v ? '' : 'Pick the closest fit. We can adjust on the call.',
    message: v => v.length <= 2000 ? '' : 'Keep it under 2,000 characters. Details can come on the call.'
  };
  const errId = n => 'e-' + (n === 'message' ? 'msg' : n);
  function check(n) { const msg = rules[n](F[n].value); F[n].setAttribute('aria-invalid', msg ? 'true' : 'false'); document.getElementById(errId(n)).textContent = msg; return !msg; }
  form.addEventListener('input', e => {
    const v = {}; Object.entries(F).forEach(([k, el]) => v[k] = el.value); store.set(v);
    if (e.target.getAttribute('aria-invalid') === 'true' && rules[e.target.name]) check(e.target.name);
  });
  document.querySelectorAll('[data-goal]').forEach(a => a.addEventListener('click', () => { F.goal.value = a.dataset.goal; }));
  const fStatus = document.getElementById('fStatus'), submitBtn = document.getElementById('submitBtn');
  let sending = false;
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (sending) return; fStatus.hidden = true;
    if (form.elements.website.value) return;
    const bad = ['name', 'email', 'goal', 'message'].filter(n => !check(n));
    if (bad.length) { F[bad[0]].focus(); return; }
    sending = true; submitBtn.disabled = true; submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: F.name.value.trim(), email: F.email.value.trim(), business: F.business.value.trim(), goal: F.goal.value, message: F.message.value.trim(), website: form.elements.website.value, source: 'homepage' })
      });
      if (!res.ok) throw new Error('send failed: ' + res.status);
      try { window.dataLayer && window.dataLayer.push({ event: 'lead_submit', lead_goal: F.goal.value }); } catch { /* ignore */ }
      store.clear();
      const first = F.name.value.trim().split(/\s+/)[0].replace(/[<>&"']/g, '');
      const wrap = document.getElementById('formWrap');
      wrap.innerHTML = `<div class="success" id="ok" tabindex="-1"><h3>Thanks, ${first}.</h3><p>Your note reached the people you'll work with. Expect a reply within one business day.</p></div>`;
      document.getElementById('ok').focus();
    } catch {
      fStatus.hidden = false; fStatus.textContent = 'That didn’t send. Check your connection and try again, or email design@alldazework.com.';
    } finally {
      sending = false; if (submitBtn.isConnected) { submitBtn.disabled = false; submitBtn.textContent = 'Send it'; }
    }
  });

  /* ---------- Hero review tool ---------- */
  // Sources for the quick review. Each fix states what it rests on and how
  // strong that is. There is no score: fixes are ordered by the visitor's own
  // answers, worst first, so we never present an invented number as a measure.
  const SRC = {
    google: { label: 'Google Business Profile Help: how local ranking works', kind: 'Google guidance', url: 'https://support.google.com/business/answer/7091' },
    lindgaard: { label: 'Lindgaard et al., 2006 (Nature news summary)', kind: 'Peer-reviewed study', url: 'https://www.nature.com/news/2006/060109/full/news060109-13.html' },
    deloitte: { label: 'Milliseconds Make Millions, Deloitte and 55 for Google, 2020', kind: 'Industry study, not peer reviewed', url: 'https://web.dev/case-studies/milliseconds-make-millions' },
    brightlocal: { label: 'BrightLocal Local Consumer Review Survey, 2026', kind: 'Consumer survey, 1,002 US adults', url: 'https://www.brightlocal.com/learn/local-consumer-review-survey/' },
    cbi: { label: 'CB Insights startup post-mortems, summarized by DigitalOcean', kind: 'Founder self-reports', url: 'https://www.digitalocean.com/resources/articles/top-reasons-startups-fail-and-how-to-avoid-them' },
    ours: { label: 'How we run projects', kind: 'Our working rule, not a published standard', url: '' }
  };
  const PATHS = {
    local: {
      label: 'Local business', goal: 'brand-web',
      questions: [
        { q: 'When someone lands on your website, what do they think first?',
          o: ['This place looks established and professional', 'Looks like a real local business', 'Not sure if they’re still open', 'Looks outdated'],
          fix: { t: 'Make the first screen look current', why: 'People judge how a site looks in a fraction of a second, and that judgment tends to hold. The study measured visual appeal, not calls, so treat this as a first filter.', src: 'lindgaard',
            check: 'Show your homepage to someone who doesn’t know you for five seconds. Ask what you do and whether you look open.' } },
        { q: 'How fast can a visitor find your phone number, hours, and address?',
          o: ['On every page, one tap away', 'Easy to find in the usual places', 'Takes some searching', 'Customers ask us for it'],
          fix: { t: 'Put phone, hours, and address on every page', why: 'Google uses accurate hours and address to match you to nearby searches, and customers need them to act. We don’t know of a study that measures this alone; it’s standard practice.', src: 'google',
            check: 'Open any page of your site on your phone. Can you call in one tap?' } },
        { q: 'How does your site work on a phone?',
          o: ['Easy to browse, call, and book', 'Mostly works', 'Usable, but clunky', 'Hard to use, people complain'],
          fix: { t: 'Make the phone version fast and easy to use', why: 'Across 37 retail and travel brands, mobile pages 0.1 seconds faster saw retail conversions rise 8.4%. Google paid for the study and it didn’t include local service businesses, so take the direction, not the number.', src: 'deloitte',
            check: 'Run your homepage through pagespeed.web.dev and read the mobile results for real visitors.' } },
        { q: 'When people nearby search for what you do, do you show up?',
          o: ['Yes, near the top', 'Usually on the first page', 'Sometimes', 'Rarely or never'],
          fix: { t: 'Complete your Google Business Profile', why: 'Google says local results come down to relevance, distance, and prominence. The parts you control: complete information, current hours, reviews and replies, and photos.', src: 'google',
            check: 'Search your service and your town on your phone. Are you in the top three on the map?' } },
        { q: 'What usually happens after someone visits your site?',
          o: ['They call, book, or ask for a quote', 'Some reach out', 'Most look and leave', 'Almost no one reaches out'],
          fix: { t: 'Give every page one next step, and count it', why: 'Recent reviews shape whether people reach out: 74% look for reviews from the last three months. If you don’t count calls and form requests, you can’t tell which pages earn them.', src: 'brightlocal',
            check: 'How many calls and form requests came from your site last month? If you can’t say, start there.' } }
      ]
    },
    launch: {
      label: 'Product launch', goal: 'product',
      questions: [
        { q: 'How have you tested the idea with real people?',
          o: ['Interviews and a prototype test', 'A survey or a few conversations', 'Feedback from friends and family', 'Not yet'],
          fix: { t: 'Talk to people who have the problem', why: 'Founders most often name “no market need” when explaining why a startup failed. Those are self-reports after the fact, so read it as a pattern, not a measurement.', src: 'cbi',
            check: 'Ask a few people with the problem how they handle it today, without pitching. Note what they already pay for.' } },
        { q: 'Can you explain the problem in one sentence a stranger gets?',
          o: ['Yes, and people nod right away', 'Mostly, it takes a follow-up', 'It takes a few minutes', 'Still working that out'],
          fix: { t: 'Get the problem down to one sentence', why: 'Your name, your site, and your first ads all depend on it.', src: 'ours',
            check: 'Say it to someone outside your field and ask them to repeat it back.' } },
        { q: 'How defined is your first version?',
          o: ['Scoped to the one flow that proves it', 'A prioritized feature list', 'A long list of features', 'It’s mostly in my head'],
          fix: { t: 'Cut version one to a single flow', why: 'A smaller first build ships sooner and tells you sooner whether people use it.', src: 'ours',
            check: 'Name the one thing a user must finish for the product to prove itself.' } },
        { q: 'Do you know who your first 100 users are?',
          o: ['By name, and where to reach them', 'We know the type of person', 'A general audience', 'Not yet'],
          fix: { t: 'Know where your first users are', why: 'A launch needs somewhere to land. Knowing where early users spend time decides what you build for launch day.', src: 'ours',
            check: 'Write down where 20 of them spend time, online or in person.' } },
        { q: 'What could you show an investor or partner today?',
          o: ['A tested, clickable prototype', 'Designed screens', 'A pitch deck', 'Nothing visual yet'],
          fix: { t: 'Make something people can try', why: 'Reactions to something people can click are easier to read than reactions to a description.', src: 'ours',
            check: 'Can someone use what you have without you explaining it?' } }
      ]
    }
  };
  const TOOL_KEY = 'adw-review';
  const T = { path: null, i: 0, answers: [] };
  try { const saved = JSON.parse(localStorage.getItem(TOOL_KEY) || 'null'); if (saved && PATHS[saved.path]) Object.assign(T, saved); } catch { /* ignore */ }
  const saveT = () => { try { localStorage.setItem(TOOL_KEY, JSON.stringify(T)); } catch { /* ignore */ } };
  const toolBody = document.getElementById('toolBody'), toolStep = document.getElementById('toolStep'), toolBack = document.getElementById('toolBack'), toolFill = document.getElementById('toolFill');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Worst answers first; ties keep question order. No weights, no score.
  function topFixes(path, answers) {
    const qs = PATHS[path].questions;
    return qs.map((q, k) => ({ k, ans: answers[k] ?? 3 }))
      .filter(x => x.ans > 0).sort((a, b) => b.ans - a.ans || a.k - b.k).slice(0, 3).map(x => qs[x.k].fix);
  }
  function fixHTML(f) {
    const src = SRC[f.src];
    const cite = src.url
      ? `<a href="${src.url}" target="_blank" rel="noopener">${esc(src.label)}<span class="sr"> (opens in a new tab)</span></a>`
      : esc(src.label);
    return `<li><span><b>${esc(f.t)}</b>${esc(f.why)}<span class="fix-check"><em>Check it yourself:</em> ${esc(f.check)}</span><span class="fix-src">${esc(src.kind)} · ${cite}</span></span></li>`;
  }
  function focusHead() { const h = toolBody.querySelector('h2'); if (h && !reduced) h.focus({ preventScroll: true }); else if (h) h.focus({ preventScroll: true }); }

  function renderTool(moveFocus) {
    const P = T.path && PATHS[T.path];
    toolBack.hidden = !P;
    if (!P) {
      toolFill.style.width = '0%';
      toolStep.textContent = 'Five questions · about a minute';
      toolBody.innerHTML = `<h2 id="tool-q" tabindex="-1">Where are you starting?</h2>
        <div class="paths">
          <button type="button" class="path-btn" data-path="local"><b>I run a local business</b><span>See what's costing you calls and bookings.</span></button>
          <button type="button" class="path-btn" data-path="launch"><b>I'm launching a product</b><span>See what to settle before you build.</span></button>
        </div>`;
    } else if (T.i < P.questions.length) {
      const q = P.questions[T.i];
      toolFill.style.width = ((T.i) / P.questions.length * 100) + '%';
      toolStep.textContent = `${P.label} · ${T.i + 1} of ${P.questions.length}`;
      toolBody.innerHTML = `<h2 id="tool-q" tabindex="-1">${esc(q.q)}</h2>
        <div class="opts" role="group" aria-labelledby="tool-q">${q.o.map((t, k) =>
          `<button type="button" class="opt" data-a="${k}" aria-pressed="${T.answers[T.i] === k}"><span class="k" aria-hidden="true">${k + 1}</span>${esc(t)}</button>`).join('')}</div>`;
    } else {
      const fixes = topFixes(T.path, T.answers);
      toolFill.style.width = '100%';
      toolStep.textContent = `${P.label} · your result`;
      toolBody.innerHTML = fixes.length
        ? `<h2 id="tool-q" tabindex="-1" class="res-h">What to fix first</h2>
        <p class="res-desc">Ordered by your answers, weakest first. Each one says what it’s based on.</p>
        <ol class="fixes">${fixes.map(fixHTML).join('')}</ol>
        <div class="res-actions"><button type="button" class="btn btn-ink" id="toolSend">Get a plan for these</button><button type="button" class="btn btn-line-ink" id="toolTalon">Ask Talon about this</button><button type="button" class="link-btn" id="toolRestart">Start over</button></div>`
        : `<h2 id="tool-q" tabindex="-1" class="res-h">Your answers came back strong</h2>
        <p class="res-desc">That’s your read of it. Checking against real data is the next step:</p>
        <ol class="fixes">${P.questions.slice(0, 3).map(q => fixHTML(q.fix)).join('')}</ol>
        <div class="res-actions"><button type="button" class="btn btn-ink" id="toolSend">Talk about what’s next</button><button type="button" class="btn btn-line-ink" id="toolTalon">Ask Talon about this</button><button type="button" class="link-btn" id="toolRestart">Start over</button></div>`;
    }
    if (moveFocus) focusHead();
  }
  toolBody.addEventListener('click', e => {
    const pb = e.target.closest('.path-btn');
    if (pb) { T.path = pb.dataset.path; T.i = 0; T.answers = []; saveT(); renderTool(true); return; }
    const ob = e.target.closest('.opt');
    if (ob) {
      T.answers[T.i] = +ob.dataset.a;
      ob.setAttribute('aria-pressed', 'true');
      saveT();
      setTimeout(() => { T.i++; saveT(); renderTool(true); }, reduced ? 0 : 160);
      return;
    }
    if (e.target.id === 'toolRestart') { T.path = null; T.i = 0; T.answers = []; saveT(); renderTool(true); return; }
    if (e.target.id === 'toolTalon') { window.__talonFromReview(); return; }
    if (e.target.id === 'toolSend') {
      const P = PATHS[T.path], fixes = topFixes(T.path, T.answers);
      F.goal.value = P.goal;
      if (!F.message.value.trim()) F.message.value = `From the quick review (${P.label}).` + (fixes.length ? ` Top areas: ${fixes.map(f => f.t.toLowerCase()).join('; ')}.` : '');
      form.dispatchEvent(new Event('input'));
      document.getElementById('contact').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      setTimeout(() => F.name.focus({ preventScroll: true }), reduced ? 0 : 600);
    }
  });
  toolBack.addEventListener('click', () => {
    if (!T.path) return;
    if (T.i === 0) { T.path = null; T.answers = []; } else T.i--;
    saveT(); renderTool(true);
  });
  // number keys 1–4 pick an option when the tool has focus
  document.getElementById('tool').addEventListener('keydown', e => {
    if (!/^[1-4]$/.test(e.key) || e.target.matches('input,textarea,select')) return;
    const b = toolBody.querySelectorAll('.opt')[+e.key - 1];
    if (b) { e.preventDefault(); b.click(); }
  });
  renderTool(false);

  /* ---------- Talon ---------- */
  const T_SUGS = ['How does pricing work?', 'How long does a project take?', 'Can you help me launch an app?', 'Who will I work with?'];
  const talonEl = document.getElementById('talon'), dock = document.getElementById('talonDock'), tLog = document.getElementById('talonLog'), tSugs = document.getElementById('talonSugs'), tForm = document.getElementById('talonForm'), tIn = document.getElementById('talonIn'), tSend = document.getElementById('talonSend');
  const TK = 'adw-talon';
  let tNext = [], tMsgs = [], tCtx = '', tBusy = false, tAbort = null, tLast = null;
  try { const v = JSON.parse(sessionStorage.getItem(TK) || 'null'); if (v && Array.isArray(v.m)) { tMsgs = v.m.slice(-30); tCtx = v.c || ''; tNext = Array.isArray(v.n) ? v.n : []; } } catch { /* ignore */ }
  const tSave = () => { try { sessionStorage.setItem(TK, JSON.stringify({ m: tMsgs.slice(-30), c: tCtx, n: tNext })); } catch { /* ignore */ } };
  function splitNext(raw) {
    const t = String(raw).replace(/\*\*(.+?)\*\*/g, '$1');
    const i = t.search(/\n?\s*NEXT:/i);
    if (i < 0) return { body: t.trim(), next: [] };
    const next = t.slice(i).replace(/^\s*NEXT:/i, '').split('|').map(q => q.trim().replace(/^["“]|["”]$/g, '')).filter(q => q && q.length < 70).slice(0, 2);
    return { body: t.slice(0, i).trim(), next };
  }
  const tActs = document.getElementById('talonActs'), tReset = document.getElementById('talonReset');
  function renderFollow() {
    const answered = tMsgs.some(m => m.role === 'assistant');
    tSugs.innerHTML = (answered ? tNext : (tMsgs.length ? [] : T_SUGS)).map(q => `<button type="button">${esc(q)}</button>`).join('');
    tActs.hidden = !answered;
    tReset.hidden = tMsgs.length === 0;
  }
  const WELCOME = "I'm Talon, the studio's AI guide. Ask how projects run, how pricing works, or whether we're a fit.";
  function bubble(role, text, cls) { const d = document.createElement('div'); d.className = 't-msg ' + (role === 'user' ? 'u' : 'a') + (cls ? ' ' + cls : ''); d.textContent = text; tLog.appendChild(d); tLog.scrollTop = tLog.scrollHeight; return d; }
  function renderTalon() {
    tLog.textContent = '';
    bubble('assistant', WELCOME);
    tMsgs.forEach(m => bubble(m.role, m.content));
    renderFollow();
  }
  function openTalon() {
    tLast = document.activeElement; talonEl.hidden = false; dock.classList.add('hide'); dock.setAttribute('aria-expanded', 'true');
    renderTalon(); setTimeout(() => tIn.focus(), 30);
  }
  function closeTalon() {
    if (tAbort) tAbort.abort();
    talonEl.hidden = true; dock.classList.remove('hide'); dock.setAttribute('aria-expanded', 'false');
    (tLast && tLast.isConnected ? tLast : dock).focus();
  }
  async function askTalon(text) {
    text = text.trim(); if (!text || tBusy) return;
    tMsgs.push({ role: 'user', content: text.slice(0, 1500) }); tSave();
    tNext = []; tSugs.innerHTML = ''; tActs.hidden = true; tReset.hidden = false; bubble('user', text);
    const out = bubble('assistant', 'Thinking…', 'wait');
    tBusy = true; tSend.disabled = true;
    try {
      tAbort = new AbortController();
      let res;
      try {
        res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: tMsgs.slice(-20), context: tCtx }),
          signal: tAbort.signal
        });
      } catch (err) {
        if (err?.name === 'AbortError') throw err;
        throw { code: 'offline' };
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw { code: res.status === 429 ? 'rate_limited' : res.status >= 500 ? 'server' : 'bad', message: data.error };
      const { body: reply, next } = splitNext(data.reply || '');
      if (!reply) throw { code: 'empty' };
      out.classList.remove('wait'); out.textContent = reply;
      tMsgs.push({ role: 'assistant', content: reply }); tNext = next; tSave(); renderFollow();
    } catch (e) {
      if (e?.name === 'AbortError' || e?.code === 'aborted') { out.remove(); renderFollow(); }
      else {
        tMsgs.pop(); tSave();
        out.classList.remove('wait'); out.classList.add('err');
        out.textContent = e?.code === 'offline'
          ? 'Talon can’t connect right now. Email design@alldazework.com and the team will reply within a business day.'
          : e?.code === 'rate_limited' ? 'Talon needs a short break. Try again in a minute, or use the contact form.'
          : 'That didn’t go through. Try again, or email design@alldazework.com.';
        tActs.hidden = false;
      }
    } finally { tBusy = false; tSend.disabled = false; tAbort = null; }
  }
  dock.setAttribute('aria-expanded', 'false');
  tReset.addEventListener('click', () => {
    if (tAbort) tAbort.abort();
    tMsgs = []; tCtx = ''; tNext = [];
    try { sessionStorage.removeItem(TK); } catch { /* ignore */ }
    renderTalon(); tIn.value = ''; tIn.focus();
  });
  tActs.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const act = b.dataset.act;
    if (act === 'email') {
      const done = () => { b.textContent = 'Copied: design@alldazework.com'; setTimeout(() => { b.textContent = 'Copy our email'; }, 2500); };
      const fail = () => { b.textContent = 'design@alldazework.com'; };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText('design@alldazework.com').then(done, fail); else fail();
      return;
    }
    closeTalon();
    if (act === 'project') {
      const last = [...tMsgs].reverse().find(m => m.role === 'user');
      if (last && !F.message.value.trim()) { F.message.value = 'From my chat with Talon: ' + last.content.slice(0, 400); form.dispatchEvent(new Event('input')); }
      document.getElementById('contact').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      setTimeout(() => F.name.focus({ preventScroll: true }), reduced ? 0 : 600);
    } else if (act === 'review') {
      document.getElementById('top').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      setTimeout(() => { const h = document.querySelector('#toolBody h2'); if (h) h.focus({ preventScroll: true }); }, reduced ? 0 : 600);
    }
  });
  dock.addEventListener('click', openTalon);
  document.getElementById('talonClose').addEventListener('click', closeTalon);
  talonEl.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); closeTalon(); } });
  tSugs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) askTalon(b.textContent); });
  tForm.addEventListener('submit', e => { e.preventDefault(); const v = tIn.value; tIn.value = ''; tIn.style.height = ''; askTalon(v); });
  tIn.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); tForm.requestSubmit(); } });
  tIn.addEventListener('input', () => { tIn.style.height = 'auto'; tIn.style.height = Math.min(tIn.scrollHeight, 140) + 'px'; });
  // hide the dock while the hero tool is on screen so it never covers the review
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { if (talonEl.hidden) dock.classList.toggle('hide', en.isIntersecting && innerWidth < 1060); }, { threshold: .25 }).observe(document.getElementById('tool'));
  window.__talonFromReview = () => {
    const P = PATHS[T.path], fixes = topFixes(T.path, T.answers);
    tCtx = `Path: ${P.label}. Their answers: ${P.questions.map((q, k) => q.q + ' → ' + q.o[T.answers[k] ?? 3]).join(' | ')}. Fixes the page showed them: ${fixes.map(f => f.t).join('; ') || 'none'}. The review gives no score.`;
    tSave(); openTalon();
    askTalon(`I just took the ${P.label.toLowerCase()} review. What should I do first?`);
  };

  /* ---------- WebGL: shared noise ---------- */
  const NOISE = `
    float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
      return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
    float fbm(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);for(int i=0;i<6;i++){v+=a*noise(p);p=r*p*2.03;a*=.5;}return v;}`;

  const SKY_FS = `precision highp float;
    uniform vec2 uRes; uniform float uTime; uniform float uAlt; uniform float uHz; uniform float uNight;
    ${NOISE}
    void main(){
      vec2 uv=gl_FragCoord.xy/uRes; float asp=uRes.x/uRes.y; float N=uNight;
      float hz=uHz-uAlt*0.04;
      vec3 zen=mix(mix(vec3(0.04,0.27,0.80),vec3(0.03,0.17,0.58),uAlt), vec3(0.008,0.018,0.07), N);
      vec3 mid=mix(vec3(0.13,0.42,0.93), vec3(0.03,0.07,0.21), N);
      vec3 hor=mix(vec3(0.80,0.89,0.98), vec3(0.13,0.19,0.38), N);
      float t=clamp((uv.y-hz)/(1.-hz),0.,1.);
      vec3 col=mix(hor,mid,smoothstep(0.,.18,t));
      col=mix(col,zen,smoothstep(.35,1.,t));
      float narrow=1.-clamp((asp-.6)/.6,0.,1.);
      vec2 d=(uv-mix(vec2(.84,.78),vec2(.82,.93),narrow))*vec2(asp,1.);
      float L=length(d)/mix(1.,.62,narrow);
      vec3 sun=vec3(1.,.95,.82)*exp(-L*4.5)*.32;
      float disc=smoothstep(.047,.043,L);
      float crater=fbm(d*40.)*.18;
      vec3 moon=vec3(.62,.7,.95)*exp(-L*5.)*.22 + vec3(.96,.97,1.)*disc*(1.-crater);
      col+=mix(sun,moon,N);
      if(uv.y>hz){
        vec2 g=uv*vec2(asp,1.)*150.; vec2 id=floor(g); vec2 f=fract(g)-.5;
        float h=hash(id); vec2 o=vec2(hash(id+3.1),hash(id+7.7))-.5;
        float st=step(.982,h)*smoothstep(.13,.0,length(f-o*.6));
        float tw=.55+.45*sin(uTime*(1.2+h*3.)+h*60.);
        col+=vec3(.9,.94,1.)*st*tw*smoothstep(.08,.45,t)*(1.-disc)*N*1.2;
        float c=fbm(vec2(uv.x*asp*1.4+uTime*.008,uv.y*7.)*1.3);
        c=smoothstep(.56,.86,c)*(1.-smoothstep(.15,.7,t))*mix(.45,.3,N);
        col=mix(col,mix(vec3(1.),vec3(.32,.4,.62),N),c);
      }
      float camH=.55+uAlt*1.6;
      float below=smoothstep(hz+.015,hz-.02,uv.y);
      if(below>0.){
        float dy=max(hz-uv.y,.002);
        float z=camH/dy;
        vec2 p=vec2((uv.x-.5)*asp*z,z)*.28+vec2(uTime*.012,uTime*.05);
        float n=fbm(p), n2=fbm(p*2.2+vec2(4.1,1.7));
        float dens=smoothstep(.40,.70,n*.78+n2*.32);
        float far=clamp(1.-dy*7.,0.,1.);
        vec3 lit=mix(vec3(1.,.995,.98), vec3(.56,.63,.82), N);
        vec3 shade=mix(vec3(.62,.72,.87), vec3(.09,.12,.25), N);
        vec3 cc=mix(shade,lit,smoothstep(.35,.85,n2*.6+dens*.6));
        vec3 under=mix(mix(vec3(.50,.63,.82),vec3(.04,.06,.14),N),hor,far);
        vec3 deck=mix(under,cc,dens);
        deck=mix(deck,hor,far*.65);
        col=mix(col,deck,below);
      }
      gl_FragColor=vec4(col,1.);
    }`;

  const FIRE_FS = `precision highp float;
    uniform vec2 uRes; uniform float uTime;
    ${NOISE}
    void main(){
      vec2 uv=gl_FragCoord.xy/uRes; float asp=uRes.x/uRes.y;
      vec3 top=vec3(1.,.86,.47), mid=vec3(1.,.69,.29), bot=vec3(1.,.50,.21);
      vec3 col=uv.y>.5?mix(mid,top,(uv.y-.5)*2.):mix(bot,mid,uv.y*2.);
      float n=fbm(vec2(uv.x*asp*2.2,uv.y*2.6-uTime*.32));
      float f=smoothstep(.2,.65,n*1.25-uv.y*1.25+.12);
      col=mix(col,vec3(.96,.38,.13),f*.38);
      float g=smoothstep(.6,.92,fbm(vec2(uv.x*asp*5.,uv.y*7.-uTime*.8)))*(1.-uv.y)*.22;
      col+=vec3(1.,.93,.7)*g;
      gl_FragColor=vec4(col,1.);
    }`;

  const VS = `void main(){gl_Position=vec4(position.xy,0.,1.);}`;
  const scenes = [];
  function makeQuad(canvas, frag, opts) {
    if (!window.THREE || !canvas) return null;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' }); }
    catch (e) { canvas.remove(); return null; }
    const scale = opts.scale;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2) * scale);
    const scene = new THREE.Scene();
    const cam = new THREE.Camera();
    const uniforms = { uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uAlt: { value: 0 }, uHz: { value: .25 }, uNight: { value: document.documentElement.getAttribute('data-mode') === 'night' ? 1 : 0 } };
    const mat = new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false });
    scene.add(new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), mat));
    const host = canvas.parentElement;
    const s = { renderer, scene, cam, uniforms, host, visible: true, lost: false, needs: true };
    const size = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      const b = renderer.getDrawingBufferSize(new THREE.Vector2());
      uniforms.uRes.value.set(b.x, b.y);
      // keep the cloud deck below the hero copy so text always sits on clear sky
      const cta = host.querySelector('.cta');
      if (cta && h > 0) {
        const hr = host.getBoundingClientRect(), cr = cta.getBoundingClientRect();
        const gap = hr.bottom - cr.bottom - 48;
        const v = gap / h;
        if (Number.isFinite(v) && cr.height > 0) uniforms.uHz.value = Math.min(.34, Math.max(.1, v));
      }
      s.needs = true;
    };
    size();
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(host); else addEventListener('resize', size);
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; if (s.visible) s.needs = true; }).observe(host);
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); s.lost = true; });
    canvas.addEventListener('webglcontextrestored', () => { s.lost = false; s.needs = true; });
    s.render = (t, alt) => {
      if (s.lost || !s.visible) return;
      if (s.needsSize) { s.needsSize = false; size(); }
      uniforms.uTime.value = reduced ? 12 : t;
      uniforms.uAlt.value = alt;
      renderer.render(scene, cam);
      s.needs = false;
    };
    scenes.push(s);
    return s;
  }
  const small = innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4;
  const safeQuad = (id, fs, scale) => {
    const c = document.getElementById(id);
    try { return makeQuad(c, fs, { scale }); }
    catch (e) { console.warn('WebGL off for #' + id, e); if (c) c.remove(); return null; } // CSS gradient shows instead
  };
  const sky = safeQuad('skyGL', SKY_FS, small ? .55 : .7);
  const fire = safeQuad('fireGL', FIRE_FS, small ? .4 : .5);

  /* ---------- Loop ---------- */
  const t0 = performance.now();
  let raf = 0, running = !document.hidden;
  function frame(now) {
    raf = 0;
    if (S.dirty) { updateScroll(); S.dirty = false; if (sky) sky.needs = true; }
    const t = (now - t0) / 1000;
    if (sky) {
      const u = sky.uniforms.uNight, dv = nightTarget - u.value;
      if (Math.abs(dv) > .002) { u.value += reduced ? dv : dv * .07; sky.needs = true; if (reduced) u.value = nightTarget; kick2(); }
      else u.value = nightTarget;
    }
    if (sky && (!reduced || sky.needs)) sky.render(t, S.alt);
    if (fire && (!reduced || fire.needs)) fire.render(t, 0);
    if (running && !reduced) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  function kick2() { if (reduced) setTimeout(kick, 16); }
  const modeBtn = document.getElementById('modeBtn');
  let nightTarget = root.getAttribute('data-mode') === 'night' ? 1 : 0;
  function setMode(m, save) {
    root.setAttribute('data-mode', m);
    nightTarget = m === 'night' ? 1 : 0;
    modeBtn.setAttribute('aria-pressed', String(m === 'night'));
    if (save) { try { localStorage.setItem('adw-mode', m); } catch { /* ignore */ } }
    scenes.forEach(sc => sc.needs = true); kick();
  }
  setMode(nightTarget ? 'night' : 'day', false);
  modeBtn.addEventListener('click', () => setMode(nightTarget ? 'day' : 'night', true));
  addEventListener('scroll', () => { if (reduced) kick(); }, { passive: true });
  addEventListener('resize', kick, { passive: true });
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) kick(); });
  RM.addEventListener?.('change', e => { reduced = e.matches; scenes.forEach(s => s.needs = true); kick(); });
  if (document.fonts?.ready) document.fonts.ready.then(() => { measure(); scenes.forEach(s => { s.needsSize = true; s.needs = true; }); kick(); });
  measure(); updateScroll(); kick();
}
