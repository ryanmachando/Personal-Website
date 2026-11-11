import './style.css'
import data from './data.json'

console.log('DATA LOADED:', data)

const app = document.querySelector('#app')

app.innerHTML = `
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
    <div class="max-w-4xl mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <a href="#" class="text-lg font-bold">${data.name}</a>

        <!-- Desktop links -->
        <ul class="hidden md:flex gap-8">
          ${data.nav.map(item => `
            <li>
              <a href="${item.href}" class="text-gray-600 hover:text-black transition-colors">${item.label}</a>
            </li>
          `).join('')}
        </ul>

        <!-- Hamburger button -->
        <button id="menu-toggle" class="md:hidden p-2" aria-label="Toggle menu" aria-expanded="false">
          <svg id="icon-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 hidden" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <ul id="mobile-menu" class="md:hidden hidden pb-4 space-y-2">
        ${data.nav.map(item => `
          <li>
            <a href="${item.href}" class="block py-2 text-gray-600 hover:text-black transition-colors">${item.label}</a>
          </li>
        `).join('')}
      </ul>
    </div>
  </nav>

 
<section id="hero" class="min-h-svh flex items-center relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-6 w-full relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <!-- Left column: text + buttons -->
        <div>
          <h1 class="text-4xl md:text-5xl font-bold">${data.name}</h1>
          <p class="text-xl md:text-2xl text-blue-600 font-medium mt-2">${data.title}</p>
          <p class="text-gray-600 mt-6">${data.bio}</p>

          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="${data.resume}" download
               class="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Download CV
            </a>
            <a href="#contact"
               class="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Me
            </a>
          </div>
        </div>

        <!-- Right column: photo -->
        <div class="flex justify-center">
          <img src="${data.headshot}" alt="${data.name}"
               class="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover ring-4 ring-blue-500/20 shadow-xl" />
        </div>

      </div>
    </div>
  </section>

<section id="experience" class="py-24">
  <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12">Experience</h2>
        <div class="space-y-8">
          ${data.experience.map(job => `
            <article class="border-l-4 border-blue-600 pl-6 py-2">
              <div class="flex flex-wrap items-center gap-3 mb-1">
                <h3 class="font-bold text-lg">${job.company}</h3>
                <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  ${job.dates}
                </span>
              </div>

              <p class="italic text-gray-700 mb-4">${job.role}</p>

              <ul class="list-disc list-inside space-y-2 text-gray-600">
                ${job.achievements.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </article>
          `).join('')}
        </div>
      </div>
    </section>


  <section id="projects" class="py-24 ">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-12">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${data.projects.map(project => `
        <article class=" py-2">
          <div class="flex flex-wrap items-center gap-3 mb-1">
            <h3 class="font-bold text-lg">${project.name}</h3>
            <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              ${project.dates}
            </span>
          </div>

          <p class="text-gray-700 mb-4">${project.description}</p>

        </article>
      `).join('')}
      </div>
    </div>
  </section>



    <footer class="py-12 border-t border-gray-200">
      <div class="max-w-4xl mx-auto px-6 flex justify-center gap-6">
        <a href="${data.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="/linkedin.svg" alt="LinkedIn" class="w-6 h-6" />
        </a>
          <a href="${data.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
           <img src="/github.svg" alt="GitHub" class="w-6 h-6" />
        </a>
      </div>
    </footer>

<section id="contact" class="py-24">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-3xl font-bold mb-12">Contact</h2>

    <form id="contact-form" action="https://formspree.io/f/moedadvq" method="POST"
          class="max-w-lg space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your name</label>
        <input type="text" id="name" name="name" required
               class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Your email</label>
        <input type="email" id="email" name="email" required
               class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input type="text" id="subject" name="subject" required
               class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Your message</label>
        <textarea id="message" name="message" required rows="5"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <button type="submit"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Send message
      </button>
    </form>

    <div id="form-success" class="hidden max-w-lg bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
      <p class="font-medium text-lg">✓ Thank you!</p>
      <p class="mt-1">Your message has been sent. I'll get back to you soon.</p>
    </div>
  </div>
</section
 
`

// --- Hamburger toggle ---
const toggle = document.querySelector('#menu-toggle')
const mobileMenu = document.querySelector('#mobile-menu')
const iconOpen = document.querySelector('#icon-open')
const iconClose = document.querySelector('#icon-close')

toggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden')
  mobileMenu.classList.toggle('hidden')
  iconOpen.classList.toggle('hidden')
  iconClose.classList.toggle('hidden')
  toggle.setAttribute('aria-expanded', String(!isOpen))
})

// --- Contact form ---
const form = document.querySelector('#contact-form')
const formSuccess = document.querySelector('#form-success')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const emailInput = form.querySelector('#email')

  // Custom validation — roadmap asks for an alert on invalid email
  if (!emailInput.validity.valid) {
    alert('Please enter a valid email address.')
    return
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })

    if (response.ok) {
      form.classList.add('hidden')
      formSuccess.classList.remove('hidden')
    } else {
      alert('Something went wrong. Please try again.')
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again.')
  }
})

