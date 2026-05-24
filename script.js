// ── MOBILE MENU TOGGLE ──
function toggleMenu() {
  const menu = document.getElementById('mobMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// ── TABS ──
var tabPanes = ["t0", "t1", "t2"];
function switchTab(i) {
  document.querySelectorAll(".tab").forEach(function (t, j) {
    t.classList.toggle("active", j === i);
  });
  tabPanes.forEach(function (id, j) {
    var p = document.getElementById(id);
    if (p) {
      p.classList.toggle("active", j === i);
    }
    if (j === i) runSim(i);
  });
}

// ── SIMULATIONS ──
var sims = [
  [
    {
      type: "ai",
      text: "Hello, SmileCare Dental! I'm your AI receptionist. How can I help you today?",
    },
    {
      type: "user",
      text: "Hi, I need to book an appointment for a root canal.",
    },
    {
      type: "ai",
      text: "Of course! I'd be happy to schedule that for you. Could I get your name and preferred date?",
    },
    { type: "user", text: "Dr. Mehta, this Saturday around 10 AM." },
    {
      type: "ai",
      text: "✅ Perfect! Appointment booked for Saturday, 10 AM. A WhatsApp confirmation has been sent!",
    },
  ],
  [
    {
      type: "ai",
      text: "Welcome to Spice Garden! I can help you book a table or place a pre-order. What would you like?",
    },
    { type: "user", text: "I'd like a table for 4 this Friday at 8 PM." },
    {
      type: "ai",
      text: "Great choice! Shall I note any dietary preferences or occasion details?",
    },
    {
      type: "user",
      text: "It's an anniversary dinner. Vegetarian please.",
    },
    {
      type: "ai",
      text: "✅ Table for 4 booked for Friday 8 PM — anniversary dinner, vegetarian. Confirmation sent on WhatsApp!",
    },
  ],
  [
    {
      type: "ai",
      text: "Hi! 👋 I'm your AI assistant. I can help with services, pricing, or scheduling a visit. What do you need?",
    },
    {
      type: "user",
      text: "What are your charges for a full dental checkup?",
    },
    {
      type: "ai",
      text: "A full checkup with cleaning is ₹800. Includes X-rays and a dentist consultation. Want to book a slot?",
    },
    { type: "user", text: "Yes, this week please." },
    {
      type: "ai",
      text: "✅ Booking link sent to your WhatsApp! Our team will confirm within 30 minutes. 😊",
    },
  ],
];
var simTimers = {};
function runSim(idx) {
  var container = document.getElementById("sim" + idx);
  if (!container) return;
  container.innerHTML = "";
  if (simTimers[idx]) clearTimeout(simTimers[idx]);
  var messages = sims[idx];
  var i = 0;
  function next() {
    if (i >= messages.length) {
      simTimers[idx] = setTimeout(function () {
        runSim(idx);
      }, 3000);
      return;
    }
    var m = messages[i];
    var typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
    var delay = m.type === "ai" ? 900 : 600;
    simTimers[idx] = setTimeout(function () {
      if (container.contains(typing)) {
        container.removeChild(typing);
      }
      var b = document.createElement("div");
      b.className = "bubble " + m.type;
      b.textContent = m.text;
      container.appendChild(b);
      container.scrollTop = container.scrollHeight;
      i++;
      simTimers[idx] = setTimeout(next, 1400);
    }, delay);
  }
  next();
}

// ── FAQ TOGGLE ──
function toggleFaq(btn) {
  const item = btn.parentElement;
  if (item.classList.contains('open')) {
    item.classList.remove('open');
  } else {
    // Close other FAQ items
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    item.classList.add('open');
  }
}

// ── PROTECTED FORM SUBMISSION & VALIDATION LOGIC ──
function g(id) {
  return document.getElementById(id);
}
function v(id) {
  return g(id) ? g(id).value.trim() : '';
}
function isEmail(s) {
  // 1. Standard email format regex
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(s)) return false;

  const parts = s.split("@");
  const username = parts[0].toLowerCase();
  const domain = parts[1].toLowerCase();

  // 2. Prevent dummy usernames
  const dummyUsernames = ["abc", "xyz", "test", "example", "admin", "placeholder", "user", "mail"];
  if (dummyUsernames.includes(username)) return false;

  // 3. Prevent dummy domains
  const dummyDomains = ["abc.com", "xyz.com", "test.com", "example.com", "mail.com", "email.com"];
  if (dummyDomains.includes(domain)) return false;

  // 4. Strict check for Gmail typos
  if (domain.includes("gmail") || domain.includes("gmal") || domain.includes("gamil") || domain.includes("gmaile")) {
    if (domain !== "gmail.com") {
      return false;
    }
  }

  return true;
}
function setE(fid, eid, show) {
  const fieldEl = g(fid);
  const errEl = g(eid);
  if (fieldEl) fieldEl.classList.toggle("err", show);
  if (errEl) errEl.classList.toggle("on", show);
}

function validate() {
  var ok = true;
  if (!v("fname")) {
    setE("fname", "e-fname", true);
    ok = false;
  } else setE("fname", "e-fname", false);
  if (!isEmail(v("femail"))) {
    setE("femail", "e-email", true);
    ok = false;
  } else setE("femail", "e-email", false);
  if (v("fphone").length !== 10) {
    setE("fphone", "e-phone", true);
    ok = false;
  } else setE("fphone", "e-phone", false);
  if (!v("fbiz")) {
    setE("fbiz", "e-biz", true);
    ok = false;
  } else setE("fbiz", "e-biz", false);
  return ok;
}

function doSubmit() {
  if (!validate()) return;
  var btn = g("submitBtn"),
    txt = g("btnTxt"),
    sp = g("spin");
  btn.disabled = true;
  if (txt) txt.textContent = "Booking…";
  if (sp) sp.style.display = "block";

  try {
    // Populate formatted full phone
    var fullPhoneInput = g("full_phone");
    if (fullPhoneInput) {
      fullPhoneInput.value = g("fcc").value + " " + v("fphone");
    }

    // Submit programmatically via native HTML form targeting the hidden iframe
    // This is 100% immune to browser ad-blockers and CORS policies!
    g("formView").submit();

    // Premium micro-delay simulation for high-fidelity interactive feel
    setTimeout(function () {
      g("formView").style.display = "none";
      g("successView").style.display = "flex";
      g("successView").classList.remove("hidden");

      // Reset UI states in case they navigate back
      btn.disabled = false;
      if (txt) txt.textContent = "🚀 Book My Free Demo Now";
      if (sp) sp.style.display = "none";
    }, 800);
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Submission failed. Please contact servesyncai@gmail.com directly.");
    
    btn.disabled = false;
    if (txt) txt.textContent = "🚀 Book My Free Demo Now";
    if (sp) sp.style.display = "none";
  }
}

// ── DYNAMIC UX INTERACTION LISTENERS ──
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initial date picker min attribute setting
  const fdateEl = g("fdate");
  if (fdateEl) {
    fdateEl.min = new Date().toISOString().split("T")[0];
  }

  // 2. Blur and input formatting event listeners
  const fnameEl = g("fname");
  if (fnameEl) {
    fnameEl.addEventListener("blur", function () {
      setE("fname", "e-fname", !v("fname"));
    });
  }
  
  const femailEl = g("femail");
  if (femailEl) {
    femailEl.addEventListener("blur", function () {
      setE("femail", "e-email", !isEmail(v("femail")));
    });
  }
  
  const fphoneEl = g("fphone");
  if (fphoneEl) {
    fphoneEl.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
    fphoneEl.addEventListener("blur", function () {
      setE("fphone", "e-phone", v("fphone").length !== 10);
    });
  }
  
  const fbizEl = g("fbiz");
  if (fbizEl) {
    fbizEl.addEventListener("change", function () {
      setE("fbiz", "e-biz", !v("fbiz"));
    });
  }

  // 3. Sticky Navigation Class Toggle
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('sticky-nav-active');
      } else {
        nav.classList.remove('sticky-nav-active');
      }
    }, { passive: true });
  }

  // 4. Parallax Vexel geometric animation nodes
  const pane1 = document.getElementById('vexel-pane-1');
  const pane2 = document.getElementById('vexel-pane-2');
  const pane3 = document.getElementById('vexel-pane-3');
  
  if (pane1 || pane2 || pane3) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (pane1) pane1.style.transform = `translate3d(0, ${scrolled * -0.12}px, 0) rotate(12deg)`;
      if (pane2) pane2.style.transform = `translate3d(0, ${scrolled * 0.06}px, 0) rotate(-6deg)`;
      if (pane3) pane3.style.transform = `translate3d(0, ${scrolled * -0.04}px, 0) rotate(6deg)`;
    }, { passive: true });
  }

  // 5. Lightweight Intersection Observer for Fade-In Elements
  const animatedElements = document.querySelectorAll('.glass-panel, .hero-left, .hero-right');
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    // Apply initial transitions programmatically to keep markup clean
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 15px, 0)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
  
  // Inject style class to avoid loading lag
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `.animate-fade-in { opacity: 1 !important; transform: translate3d(0, 0, 0) !important; }`;
  document.head.appendChild(styleSheet);

  // 6. Smooth scrolling behaviors for navigation and CTA buttons
  document.querySelectorAll('a[href="#booking"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById("booking");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
  [
    "services",
    "workflow",
    "benefits",
    "testimonials",
    "faq",
    "problem",
    "cta",
  ].forEach(function (id) {
    document
      .querySelectorAll('a[href="#' + id + '"]')
      .forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          var el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          // close mobile menu if open
          const mobMenu = document.getElementById("mobMenu");
          if (mobMenu) mobMenu.classList.add("hidden");
        });
      });
  });
  document.querySelectorAll('a[href="#hero"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // 7. Initialize tab simulator 0 initially
  runSim(0);

  // ── LIVE AI SYNC SIMULATOR LOOP (HERO CINEMATIC ORB CONSOLE) ──
  const simLeft = document.getElementById('sim-left-content');
  const simRight = document.getElementById('sim-right-content');
  const simStatus = document.getElementById('sim-status-bar');
  const voiceWaveform = document.getElementById('voiceWaveform');
  
  if (!simLeft || !simRight || !simStatus) return;

  const scenarios = [
    {
      msg: "Hi, I'd like to book a dental checkup for tomorrow at 3 PM if possible.",
      crmName: "Dental Checkup Intake",
      crmDetail: "Routine cleanup & assessment",
      crmTime: "Tomorrow @ 3:00 PM",
      crmStatus: "Route Success"
    },
    {
      msg: "Do you have a table for 4 tonight around 8 PM? It's for an anniversary.",
      crmName: "Table Booking Sync",
      crmDetail: "Covers: 4 (Anniversary VIP)",
      crmTime: "Tonight @ 8:00 PM",
      crmStatus: "Route Success"
    },
    {
      msg: "I need to schedule a consultation regarding your B2B automation services.",
      crmName: "Infrastructure Consultation",
      crmDetail: "B2B automation blueprint",
      crmTime: "Pending Scheduling",
      crmStatus: "Route Success"
    }
  ];

  let currentScenario = 0;

  async function typeText(element, text, speed = 25) {
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      element.innerHTML += text.charAt(i);
      await new Promise(r => setTimeout(r, speed));
    }
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function runSimulationLoop() {
    while (true) {
      const scenario = scenarios[currentScenario];
      
      // Reset simulator pane styles
      simLeft.innerHTML = '';
      simRight.innerHTML = '';
      simStatus.innerHTML = `<span class="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest"><span class="w-1.5 h-1.5 rounded-full bg-slate-700"></span> System Idle</span>`;
      if (voiceWaveform) {
        voiceWaveform.className = 'waveform-container waveform-passive';
      }
      
      await wait(1000);

      // 1. Create Incoming Customer Message Bubble
      const bubble = document.createElement('div');
      bubble.className = 'bg-slate-900/80 border border-white/10 text-slate-200 rounded-2xl rounded-bl-sm p-4 text-xs sm:text-sm font-medium w-11/12 shadow-md transform translate-y-4 opacity-0 transition-all duration-300';
      simLeft.appendChild(bubble);
      
      // Slide bubble in smoothly
      await wait(50);
      bubble.classList.remove('translate-y-4', 'opacity-0');
      
      // Perform context typing
      await wait(400);
      if (voiceWaveform) {
        voiceWaveform.className = 'waveform-container waveform-active';
      }
      simStatus.innerHTML = `<span class="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-cyan"></span> AI SPEAKING...</span>`;
      
      await typeText(bubble, scenario.msg, 20);
      
      // 2. Transition System Status to Processing
      await wait(600);
      simStatus.innerHTML = `<span class="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-cyan"></span> INGESTING CONTEXT...</span>`;
      if (voiceWaveform) {
        voiceWaveform.className = 'waveform-container waveform-active';
      }
      
      // Simulated cloud latency
      await wait(1500);
      
      // 3. Complete Routing & Sync Database Card
      simStatus.innerHTML = `<span class="flex items-center gap-2 text-[10px] font-bold text-green-400 uppercase tracking-widest"><span class="w-1.5 h-1.5 rounded-full bg-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.6)]"></span> SYNCHRONIZED</span>`;
      if (voiceWaveform) {
        voiceWaveform.className = 'waveform-container waveform-passive';
      }
      
      const crmCard = document.createElement('div');
      crmCard.className = 'bg-slate-950/80 border border-white/10 rounded-xl p-4 shadow-xl transform scale-95 opacity-0 transition-all duration-500 border-l-2 border-l-cyan-400 text-xs sm:text-sm';
      crmCard.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span class="text-[9px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider">Sync Logged</span>
          <span class="text-[9px] font-bold text-slate-500">Just now</span>
        </div>
        <h4 class="text-white font-extrabold text-xs sm:text-sm mb-1 tracking-tight">${scenario.crmName}</h4>
        <p class="text-slate-400 text-[11px] sm:text-xs font-medium mb-3">${scenario.crmDetail}</p>
        <div class="flex items-center gap-1.5 text-[10px] font-semibold text-slate-300 bg-slate-900/50 border border-white/[0.04] p-1.5 rounded">
          <span>🕒</span> <span>${scenario.crmTime}</span>
        </div>
      `;
      simRight.appendChild(crmCard);
      
      await wait(50);
      crmCard.classList.remove('scale-95', 'opacity-0');
      
      // Hold loop before fading out
      await wait(4500);
      
      // Trigger smooth fade out
      bubble.style.opacity = '0';
      crmCard.style.opacity = '0';
      simStatus.style.opacity = '0';
      await wait(500);
      simStatus.style.opacity = '1';
      
      currentScenario = (currentScenario + 1) % scenarios.length;
    }
  }
  
  // Initialize Simulation Loop
  runSimulationLoop();
});
