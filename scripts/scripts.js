// Initialize
// Theme Toggle Logic
const themeToggleButtons = document.querySelectorAll(".theme-toggle-btn");
const html = document.documentElement;

// Function to set theme
function setTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateIcon(true);
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateIcon(false);
  }
}

// Update icon based on theme
function updateIcon(isDark) {
  if (!themeToggleButtons) return;
  themeToggleButtons.forEach((button) => {
    const icon = button.querySelector("i");
    if (icon) {
      icon.className = isDark
        ? "fas fa-sun text-yellow-400"
        : "fas fa-moon text-gray-600";
    }
  });
}

// Initialize theme
document.addEventListener("DOMContentLoaded", () => {
  // Particle system
  // createParticles();

  // Theme init
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  // Toggle button listener
  themeToggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = html.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  });
});

// --- Dropdown faqs ---
document.querySelectorAll(".faq-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector(".fa-chevron-down");

    // 1. Alternar la altura (Smooth Animation)
    if (content.style.maxHeight) {
      // Si está abierto, ciérralo (null quita el estilo inline)
      content.style.maxHeight = null;
      icon.classList.remove("rotate-180");
      button.classList.remove("text-(--secondary-orange)");
    } else {
      // Si está cerrado, ábrelo calculando la altura exacta del texto
      // Opcional: Cerrar otros acordeones abiertos (comenta esto si quieres permitir múltiples abiertos)
      document
        .querySelectorAll(".faq-content")
        .forEach((el) => (el.style.maxHeight = null));
      document
        .querySelectorAll(".fa-chevron-down")
        .forEach((el) => el.classList.remove("rotate-180"));

      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.add("rotate-180");
      button.classList.add("text-(--secondary-orange)");
    }
  });
});
// Toast Notification System
function showToast(type, message) {
  const config = {
    success: {
      icon: "fa-check-circle",
      bg: "bg-green-50 dark:bg-green-900/80",
      border: "border-green-400 dark:border-green-600",
      text: "text-green-800 dark:text-green-200",
      iconColor: "text-green-500 dark:text-green-400",
      title: "Success",
    },
    error: {
      icon: "fa-exclamation-circle",
      bg: "bg-red-50 dark:bg-red-900/80",
      border: "border-red-400 dark:border-red-600",
      text: "text-red-800 dark:text-red-200",
      iconColor: "text-red-500 dark:text-red-400",
      title: "Error",
    },
    server_error: {
      icon: "fa-exclamation-triangle",
      bg: "bg-amber-50 dark:bg-amber-900/80",
      border: "border-amber-400 dark:border-amber-600",
      text: "text-amber-800 dark:text-amber-200",
      iconColor: "text-amber-500 dark:text-amber-400",
      title: "Server Error",
    },
  };

  const c = config[type];
  if (!c) return;

  const toast = document.createElement("div");
  toast.className = `fixed top-24 right-4 z-[100] max-w-sm w-full ${c.bg} ${c.text} border-l-4 ${c.border} rounded-lg shadow-xl backdrop-blur-sm p-4 flex items-start gap-3 transform translate-x-[120%] transition-transform duration-500 ease-out`;
  toast.innerHTML = `
        <i class="fas ${c.icon} ${c.iconColor} text-xl mt-0.5 shrink-0"></i>
        <div class="flex-1 min-w-0">
            <p class="font-bold text-sm">${c.title}</p>
            <p class="text-sm opacity-90 mt-0.5">${message}</p>
        </div>
        <button onclick="this.closest('div').remove()" class="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <i class="fas fa-times"></i>
        </button>
    `;

  document.body.appendChild(toast);

  // Slide in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove("translate-x-[120%]");
      toast.classList.add("translate-x-0");
    });
  });

  // Auto-dismiss after 5s
  setTimeout(() => {
    toast.classList.remove("translate-x-0");
    toast.classList.add("translate-x-[120%]");
    toast.addEventListener("transitionend", () => toast.remove(), {
      once: true,
    });
  }, 5000);
}

// Form Handling — Submit via AJAX to send_email.php
function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  submitBtn.classList.add("opacity-75");

  // Collect form data
  const formData = new FormData(form);

  fetch("./send_email.php", {
    method: "POST",
    body: formData,
  })
    .then((response) =>
      response.json().then((data) => ({ ok: response.ok, data })),
    )
    .then(({ ok, data }) => {
      if (ok && data.status === "success") {
        showToast(
          "success",
          "Thank you! Your message has been sent successfully.",
        );
        form.reset();
      } else if (data.status === "error") {
        showToast(
          "error",
          data.message || "Please fill in all fields correctly.",
        );
      } else {
        showToast(
          "server_error",
          data.message || "Sorry, there was a problem sending your message.",
        );
      }
    })
    .catch(() => {
      showToast(
        "server_error",
        "Network error. Please check your connection and try again.",
      );
    })
    .finally(() => {
      // Restore button
      submitBtn.innerHTML = originalBtnHTML;
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-75");
    });
}
