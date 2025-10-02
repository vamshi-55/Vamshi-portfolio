'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// initialize button state on page load
if (form.checkValidity()) {
  formBtn.removeAttribute("disabled");
} else {
  formBtn.setAttribute("disabled", "");
}

// enable/disable button when typing
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  formBtn.classList.add("sending");
  formBtn.innerHTML = "Sending..."; // show progress

  // send data to Formspree
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { "Accept": "application/json" }
  })
    .then(response => {
      if (response.ok) {
        // ✅ redirect to thankyou.html
        window.location.href = "thankyou.html";
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
      formBtn.classList.remove("sending");
      formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
    })
    .catch(error => {
      alert("Failed to send message. Please check your internet connection.");
      formBtn.classList.remove("sending");
      formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>`;
    });
});

// ✅ Open contact section if #contact is in the URL
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#contact") {
    // remove "active" from all pages & nav links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(link => link.classList.remove("active"));

    // activate contact page
    document.querySelector('[data-page="contact"]').classList.add("active");
    document.querySelector('.navbar-link[data-nav-link]:nth-child(4)').classList.add("active"); 
    window.scrollTo(0, 0);
  }
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
