// ===============================
// TOGGLE NAVBAR
// ===============================
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

// ===============================
// REMOVE MENU ON LINK CLICK
// ===============================
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// ===============================
// SCROLL ACTIVE LINK
// ===============================
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 30;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

// ===============================
// CHANGE HEADER BACKGROUND ON SCROLL
// ===============================
function scrollHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  if (window.scrollY >= 550) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

// ===============================
// SWIPER JS
// ===============================
if (typeof Swiper !== "undefined") {
  new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

// ===============================
// PROJECT FILTER FUNCTIONALITY
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Active button state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        if (category === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// ===============================
// CONTACT FORM – EMAILJS
// ===============================
(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init("YOUR_PUBLIC_KEY"); // 🔴 replace with real key
  }
})();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",   // 🔴 replace
        "YOUR_TEMPLATE_ID",  // 🔴 replace
        this
      )
      .then(
        () => {
          if (formStatus) {
            formStatus.textContent = "✅ Message sent successfully!";
            formStatus.style.color = "#38bdf8";
          }
          contactForm.reset();
        },
        () => {
          if (formStatus) {
            formStatus.textContent =
              "❌ Failed to send message. Try again.";
            formStatus.style.color = "#ef4444";
          }
        }
      );
  });
}
