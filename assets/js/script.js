/* ==========================================================================
   SCROLL REVEAL ANIMATION
   ========================================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===============================
   TOGGLE NAVBAR
   =============================== */
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/* ===============================
   REMOVE MENU ON LINK CLICK
   =============================== */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ===============================
   SCROLL ACTIVE LINK & HEADER BACKGROUND
   =============================== */
const sections = document.querySelectorAll("section[id]");
const header = document.getElementById("header");

function scrollHandler() {
  const scrollY = window.pageYOffset;

  // Header background toggle
  if (header) {
    if (scrollY >= 50) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  }

  // Active link highlighing
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollHandler);

/* ===============================
   PROJECT FILTER FUNCTIONALITY
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (filterValue === category || filterValue === "all") {
          card.style.display = "block";
          card.classList.add('reveal', 'active'); // Re-trigger reveal animation
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

/* ===============================
   CONTACT FORM – EMAILJS
   =============================== */
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Initialize EmailJS
(function () {
  if (typeof emailjs !== "undefined") {
    // 🔴 REPLACE with your actual Public Key from EmailJS dashboard
    emailjs.init("YOUR_PUBLIC_KEY");
  }
})();

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show sending status
    if (formStatus) {
      formStatus.textContent = "Sending...";
      formStatus.style.color = "var(--accent-light)";
    }

    if (typeof emailjs !== "undefined") {
      emailjs.sendForm(
        "YOUR_SERVICE_ID",   // 🔴 REPLACE with your actual Service ID
        "YOUR_TEMPLATE_ID",  // 🔴 REPLACE with your actual Template ID
        this
      )
      .then(
        () => {
          if (formStatus) {
            formStatus.textContent = "Message sent successfully! ✨";
            formStatus.style.color = "#4ade80"; // Bright Green
          }
          contactForm.reset();
          setTimeout(() => { if(formStatus) formStatus.textContent = ""; }, 5000);
        },
        () => {
          if (formStatus) {
            formStatus.textContent = "Failed to send message. Please try again.";
            formStatus.style.color = "#f87171"; // Bright Red
          }
        }
      );
    } else {
      // Simulation if EmailJS is not loaded or for local testing
      setTimeout(() => {
         if (formStatus) {
           formStatus.textContent = "Simulation: Message sent! (EmailJS not linked)";
           formStatus.style.color = "var(--accent-light)";
         }
         contactForm.reset();
      }, 1000);
    }
  });
}
