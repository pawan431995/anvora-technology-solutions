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

  const form = document.getElementById("ideaForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = "hello@anvoratechnology.com"; // CHANGE THIS
    const subject = encodeURIComponent("New App / Web Solution Request");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\n` +
      `Phone: ${data.get("phone")}\n` +
      `Email: ${data.get("email")}\n` +
      `Business / Organization: ${data.get("business") || "Not provided"}\n\n` +
      `Problem / Requirement:\n${data.get("message")}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
