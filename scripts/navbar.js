/**
 * Reusable Navbar Component
 * Usage: renderNavbar({ page: 'home' | 'subpage' })
 *
 * - 'home' = index page (anchor links like #services, hamburger mobile menu)
 * - 'subpage' = terms/privacy pages (links like /#services, simplified mobile nav)
 */
function renderNavbar(options = {}) {
  const page = options.page || "home";
  const isHome = page === "home";
  const prefix = isHome ? "" : "/";
  const homeHref = isHome ? "#" : "/";

  const container = document.getElementById("navbar-container");
  if (!container) return;

  // Desktop menu links (shared)
  const desktopLinks = `
    <a href="${prefix}#home"
       class="py-2 text-gray-600 dark:text-gray-200 hover:text-(--secondary-orange) transition">Home</a>
    <a href="${prefix}#services"
       class="py-2 text-gray-600 dark:text-gray-200 hover:text-(--secondary-orange) transition">Services</a>
    <a href="${prefix}#about"
       class="py-2 text-gray-600 dark:text-gray-200 hover:text-(--secondary-orange) transition">Why Us</a>
    <a href="${prefix}#faqs"
       class="py-2 text-gray-600 dark:text-gray-200 hover:text-(--secondary-orange) transition">FAQs</a>
    <button id="theme-toggle"
       class="theme-toggle-btn rounded-full hover:scale-110 transition focus:outline-none"
       aria-label="Toggle Dark Mode">
       <i class="fas fa-moon text-gray-600 dark:text-gray-300"></i>
    </button>
    <button onclick="window.location.href='${prefix}#contact'"
       class="px-5 py-2 bg-(--secondary-orange) hover:bg-orange-500 text-(--hs-white) rounded transition cursor-pointer">
       Contact
    </button>
  `;

  // Mobile controls differ per page type
  let mobileControls = "";
  let mobileMenu = "";

  if (isHome) {
    // Full hamburger menu for index page
    mobileControls = `
      <div class="md:hidden flex items-center gap-4">
        <button
          class="theme-toggle-btn p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none"
          aria-label="Toggle Dark Mode">
          <i class="fas fa-moon text-gray-600 dark:text-gray-300"></i>
        </button>
        <button id="mobile-menu-btn" class="focus:outline-none">
          <i class="fas fa-bars text-2xl text-gray-600 dark:text-gray-300"></i>
        </button>
      </div>
    `;

    mobileMenu = `
      <div id="mobile-menu"
        class="md:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t dark:border-gray-700 w-full shadow-xl">
        <div class="p-4 flex flex-col gap-2">
          <a href="#home"
            class="block py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 hover:text-(--secondary-orange) transition-colors">Home</a>
          <a href="#services"
            class="block py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 hover:text-(--secondary-orange) transition-colors">Services</a>
          <a href="#about"
            class="block py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 hover:text-(--secondary-orange) transition-colors">Why
            Us</a>
          <a href="#faqs"
            class="block py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 hover:text-(--secondary-orange) transition-colors">FAQs</a>
          <a href="#contact"
            class="block py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-(--secondary-orange) font-bold transition-colors">Contact
            Now</a>
        </div>
      </div>
    `;
  } else {
    // Simplified mobile nav for sub-pages (theme toggle + home icon)
    mobileControls = `
      <div class="md:hidden flex items-center gap-4">
        <button id="theme-toggle"
          class="theme-toggle-btn rounded-full hover:scale-110 transition focus:outline-none"
          aria-label="Toggle Dark Mode">
          <i class="fas fa-moon text-gray-600 dark:text-gray-300"></i>
        </button>
        <a href="/" class="text-gray-600 dark:text-gray-300 hover:text-(--secondary-orange) transition">
          <i class="fas fa-home text-2xl"></i>
        </a>
      </div>
    `;
  }

  container.innerHTML = `
    <nav class="bg-white dark:bg-gray-800 shadow-md fixed w-full z-50 transition-colors duration-300">
      <div class="container mx-auto pr-4 md:px-6 flex justify-between items-center">
        <a href="${homeHref}" class="flex items-center gap-2">
          <img class="w-16 h-16 md:w-20 md:h-20" src="../images/file-copy.svg" alt="logo" />
          <span class="text-gray-600 text-sm xl:text-xl font-bold uppercase tracking-wider dark:text-gray-200 hover:text-(--secondary-orange)">Hot Shooters <span
              class="accent-text">LLC</span></span>
        </a>

        ${mobileControls}

        <!-- Desktop Menu -->
        <div class="hidden md:flex xl:space-x-8 space-x-4 font-semibold">
          ${desktopLinks}
        </div>
      </div>
      ${mobileMenu}
    </nav>
  `;

  // Initialize mobile menu if on the home page
  if (isHome) {
    initMobileMenu();
  }
}

/**
 * Mobile menu toggle logic — called after navbar HTML is injected.
 */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("max-h-0");
    menu.classList.toggle("opacity-0");
    menu.classList.toggle("max-h-96");
    menu.classList.toggle("opacity-100");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isOpen = menu.classList.contains("max-h-96");
    if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.add("max-h-0", "opacity-0");
      menu.classList.remove("max-h-96", "opacity-100");
    }
  });

  // Close mobile menu when clicking a menu option
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("max-h-0", "opacity-0");
      menu.classList.remove("max-h-96", "opacity-100");
    });
  });
}
