// ── NAV MOBILE ──
function toggleMenu() {
  var m = document.getElementById("mobMenu");
  m.style.display = m.style.display === "block" ? "none" : "block";
}

// ── TABS ──
var tabPanes = ["t0", "t1", "t2"];
function switchTab(i) {
  document.querySelectorAll(".tab").forEach(function (t, j) {
    t.classList.toggle("active", j === i);
  });
  tabPanes.forEach(function (id, j) {
    var p = document.getElementById(id);
    p.classList.toggle("active", j === i);
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
      container.removeChild(typing);
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
runSim(0);

// ── FAQ ──
function toggleFaq(btn) {
  var item = btn.parentElement;
  var ans = item.querySelector(".faq-a");
  var isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(function (el) {
    el.classList.remove("open");
    el.querySelector(".faq-a").classList.remove("open");
  });
  if (!isOpen) {
    item.classList.add("open");
    ans.classList.add("open");
  }
}

// ── FORM ──
document.getElementById("fdate").min = new Date()
  .toISOString()
  .split("T")[0];
function g(id) {
  return document.getElementById(id);
}
function v(id) {
  return g(id).value.trim();
}
function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function setE(fid, eid, show) {
  g(fid).classList.toggle("err", show);
  g(eid).classList.toggle("on", show);
}

g("fname").addEventListener("blur", function () {
  setE("fname", "e-fname", !v("fname"));
});
g("femail").addEventListener("blur", function () {
  setE("femail", "e-email", !isEmail(v("femail")));
});
g("fphone").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});
g("fphone").addEventListener("blur", function () {
  setE("fphone", "e-phone", v("fphone").length < 6);
});
g("fbiz").addEventListener("change", function () {
  setE("fbiz", "e-biz", !v("fbiz"));
});

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
  if (v("fphone").length < 6) {
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
  txt.textContent = "Booking…";
  sp.style.display = "block";
  var msg = encodeURIComponent(
    "🚀 *New Demo Booking — ServeSync AI*\n\n" +
      "👤 *Name:* " +
      v("fname") +
      "\n" +
      "📧 *Email:* " +
      v("femail") +
      "\n" +
      "📱 *Phone:* " +
      g("fcc").value +
      v("fphone") +
      "\n" +
      "🏢 *Business:* " +
      v("fbiz") +
      "\n" +
      "📅 *Date:* " +
      (v("fdate") || "Flexible") +
      "\n" +
      "⏰ *Time:* " +
      g("fslot").value +
      "\n" +
      "💬 *Note:* " +
      (v("fmsg") || "None") +
      "\n\n" +
      "_Submitted via ServeSync AI website_",
  );
  setTimeout(function () {
    window.open("https://wa.me/917619624407?text=" + msg, "_blank");
    g("formView").style.display = "none";
    g("successView").style.display = "flex";
  }, 800);
}

// ── SMOOTH SCROLL FOR ALL CTA BUTTONS ──
document.querySelectorAll('a[href="#booking"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .getElementById("booking")
      .scrollIntoView({ behavior: "smooth" });
  });
});
[
  "services",
  "how",
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
        document.getElementById("mobMenu").style.display = "none";
      });
    });
});
document.querySelectorAll('a[href="#hero"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ── SCROLL ACTIVE NAV ──
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  nav.style.background =
    window.scrollY > 40 ? "rgba(5,8,15,.97)" : "rgba(5,8,15,.88)";
});
