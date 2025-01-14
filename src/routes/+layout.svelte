<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
  <header class="bg-white border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-xl font-semibold text-blue-600">APICalc</span>
        </div>
        <nav class="flex items-center space-x-4">
          <a
            href="https://github.com/yourusername/apicalc"
            target="_blank"
            class="text-gray-500 hover:text-gray-700"
          >
            GitHub
          </a>
        </nav>
      </div>
    </div>
  </header>

  <main class="flex-1 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {@render children()}
    </div>
  </main>

  <footer class="bg-white border-t">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3
            class="text-sm font-semibold text-gray-600 uppercase tracking-wider"
          >
            About
          </h3>
          <p class="mt-4 text-gray-500 text-sm">
            APICalc helps you estimate and plan your API infrastructure by
            simulating realistic load patterns using Poisson distribution.
          </p>
        </div>
        <div>
          <h3
            class="text-sm font-semibold text-gray-600 uppercase tracking-wider"
          >
            Resources
          </h3>
          <ul class="mt-4 space-y-2">
            <li>
              <p class="text-gray-500 hover:text-gray-700 text-sm">
                Documentation
              </p>
            </li>
            <li>
              <p class="text-gray-500 hover:text-gray-700 text-sm">
                API Reference
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h3
            class="text-sm font-semibold text-gray-600 uppercase tracking-wider"
          >
            Legal
          </h3>
          <ul class="mt-4 space-y-2">
            <li>
              <p class="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </p>
            </li>
            <li>
              <p class="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-gray-400 text-sm text-center">
          © 2024 APICalc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>
