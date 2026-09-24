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

  // --- UPDATED EMAILJS INTEGRATION ---
  const form = document.getElementById("ideaForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    // 1. Find the submit button to show loading feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
    if (submitBtn) submitBtn.innerText = 'Sending...';

    // 2. Send the form data to EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual keys
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
      .then(() => {
        if (submitBtn) submitBtn.innerText = originalBtnText;
        alert('Thank you! Your request has been sent successfully.');
        form.reset(); // Clears the form fields after successful sending
      })
      .catch((error) => {
        if (submitBtn) submitBtn.innerText = originalBtnText;
        alert('Oops... Something went wrong. Please try again.');
        console.error('EmailJS Error:', error);
      });
  });

  // Dynamic Year update
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
