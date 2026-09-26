document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  document.querySelectorAll(".demo-link[data-demo]").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const product = link.dataset.demo;
      alert(`${product} demo link is ready to be connected.\n\nReplace this link in index.html with your live application URL.`);
    });
  });

  // ---- EmailJS setup ----
  // Replace these three with your own values from the EmailJS dashboard.
  const EMAILJS_PUBLIC_KEY = "D0XpV614-oykt9mdP";   // Account > General > Public Key
  const EMAILJS_SERVICE_ID = "service_8a4nsfj";   // Email Services > your service
  const EMAILJS_TEMPLATE_ID = "template_bybzyl6"; // Email Templates > your template

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

  document.getElementById("year").textContent = new Date().getFullYear();
});
