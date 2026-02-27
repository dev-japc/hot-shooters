/**
 * Reusable Footer Component
 * Usage: renderFooter()
 */
function renderFooter() {
  const container = document.getElementById("footer-container");
  if (!container) return;

  const currentYear = new Date().getFullYear();

  container.innerHTML = `
    <footer
      class="bg-gray-900 border-t border-gray-800 dark:border-gray-700 text-gray-400 py-10 transition-colors duration-300">
      <div class="container mx-auto px-6 text-center">

        <div class="flex justify-center items-center space-x-2">
          <img class="w-16 h-16 md:w-20 md:h-20" src="../images/file-copy.svg" alt="logo" />
          <h2 class="text-lg md:text-2xl font-bold text-(--hs-white) uppercase tracking-wider">Hot Shooters LLC
          </h2>
        </div>
        <div class="flex justify-center space-x-6 mb-8">
          <a href="https://www.facebook.com/" class="hover:text-(--secondary-orange) transition"
            target="_blank"><i class="fab fa-facebook fa-lg"></i></a>
          <a href="https://www.instagram.com/hotshooters7" class="hover:text-(--secondary-orange) transition"
            target="_blank"><i class="fab fa-instagram fa-lg"></i></a>
          <a href="https://www.youtube.com" target="_blank" class="hover:text-(--secondary-orange) transition"><i
              class="fab fa-youtube fa-lg"></i></a>
        </div>
        <p>&copy; ${currentYear} Hot Shooters LLC. All rights reserved.</p>
        <p class="mt-2 text-sm">
          <a href="/terms" class="hover:text-(--secondary-orange) transition">Terms of Use</a>
          <span class="mx-2">|</span>
          <a href="/privacy" class="hover:text-(--secondary-orange) transition">Privacy
            Policy</a>
        </p>
        <div class="mt-6 pt-4">
          <p class="text-sm text-gray-500">
            Developed by: <br><span class="text-gray-300 font-semibold">Jorge Palacios - Systems Engineer</span>
          </p>
          <div class="flex justify-center space-x-4 mt-2">
            <a href="https://www.linkedin.com/in/jorgeapalaciosc/" target="_blank"
              class="text-gray-500 hover:text-(--secondary-orange) transition" aria-label="LinkedIn">
              <i class="fab fa-linkedin fa-lg"></i>
            </a>
            <a href="https://github.com/jorgepalaciios" target="_blank"
              class="text-gray-500 hover:text-(--secondary-orange) transition" aria-label="GitHub">
              <i class="fab fa-github fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
