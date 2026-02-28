// i18n logic
function setLanguage(lang) {
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  localStorage.setItem("language", lang);

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (
      typeof translations !== "undefined" &&
      translations[lang] &&
      translations[lang][key]
    ) {
      // If it's an input or textarea, update placeholder
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[lang][key];
      } else if (el.tagName === "OPTION") {
        el.textContent = translations[lang][key];
      } else {
        // Use innerHTML to support strong/br tags in translations
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Update active state of toggle buttons
  const enButtons = document.querySelectorAll(".lang-btn-en");
  const esButtons = document.querySelectorAll(".lang-btn-es");

  if (lang === "en") {
    enButtons.forEach((btn) => {
      btn.classList.add("block");
      btn.classList.remove("hidden");
    });
    esButtons.forEach((btn) => {
      btn.classList.add("hidden");
    });
  } else {
    esButtons.forEach((btn) => {
      btn.classList.add("block");
      btn.classList.remove("hidden");
    });
    enButtons.forEach((btn) => {
      btn.classList.add("hidden");
    });
  }
}

function toggleLanguage() {
  const currentLang = localStorage.getItem("language") || "en";
  const newLang = currentLang === "en" ? "es" : "en";
  setLanguage(newLang);
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize language
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
});
