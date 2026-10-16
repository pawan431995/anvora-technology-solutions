document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Placeholder demo links (href="#") show a notice. Once a real URL is added
  // in index.html, the link works normally and is not intercepted here.
  document.querySelectorAll('a.demo-link[data-demo][href="#"]').forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`The ${link.dataset.demo} demo is coming soon. Contact us and we will share a live demo with you.`);
    });
  });

  // ---- EmailJS setup ----
  // Public values from your EmailJS dashboard (these are safe to expose in the browser).
  const EMAILJS_PUBLIC_KEY = "D0XpV614-oykt9mdP";   // Account > General > Public Key
  const EMAILJS_SERVICE_ID = "service_8a4nsfj";     // Email Services > your service
  const EMAILJS_TEMPLATE_ID = "template_bybzyl6";   // Email Templates > your template

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.getElementById("ideaForm");
  const formStatus = document.getElementById("formStatus");
  const submitBtn = form?.querySelector("button[type='submit']");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      if (formStatus) formStatus.textContent = "Email service failed to load. Please try again later.";
      return;
    }

    const data = new FormData(form);
    const templateParams = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      business: data.get("business") || "Not provided",
      message: data.get("message")
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }
    if (formStatus) formStatus.textContent = "";

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        if (formStatus) formStatus.textContent = "Thanks! Your idea has been sent. We'll be in touch soon.";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        if (formStatus) formStatus.textContent = "Something went wrong sending your message. Please try again or email us directly.";
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send My Idea →";
        }
      });
  });

  // Fade solution cards in as they scroll into view. Skipped for reduced motion;
  // without JavaScript the cards simply stay visible.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const solutionCards = document.querySelectorAll(".solution-card");
  if ("IntersectionObserver" in window && !reduceMotion) {
    solutionCards.forEach((card, index) => {
      card.classList.add("reveal");
      card.style.transitionDelay = `${(index % 4) * 80}ms`;
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.style.transitionDelay = ""; // keep hover responsive after the reveal
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    solutionCards.forEach((card) => observer.observe(card));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
