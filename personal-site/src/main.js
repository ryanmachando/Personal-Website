import './style.css'
import data from './data.json'

console.log('DATA LOADED:', data)

const pageTitle = `${data.name} | ${data.title}`
const pageDescription = data.bio
document.title = pageTitle
document.querySelector('meta[name="description"]').content = pageDescription
document.querySelector('meta[property="og:title"]').content = pageTitle
document.querySelector('meta[property="og:description"]').content = pageDescription
document.querySelector('meta[property="og:image"]').content = new URL(data.headshot, window.location.href).href
document.querySelector('meta[property="og:image:alt"]').content = data.name

const savedTheme = localStorage.getItem('theme')
document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light'

const projectCardMarkup = project => `
  <div class="mb-3 flex flex-wrap items-center gap-3">
    <h3 class="text-xl font-bold">${project.name}</h3>
    <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
      ${project.dates}
    </span>
  </div>

  <p class="mb-3 text-sm font-medium text-blue-700">${project.subtitle}</p>
  <p class="mb-5 text-gray-700">${project.description}</p>

  <ul class="mb-6 flex flex-wrap gap-2" aria-label="Technologies used">
    ${project.tags.map(tag => `<li class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">${tag}</li>`).join('')}
  </ul>

  ${project.repo ? `
    <a href="${project.repo}" target="_blank" rel="noopener noreferrer"
       class="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
      View on GitHub
      <span aria-hidden="true">↗</span>
    </a>
  ` : ''}
`

const app = document.querySelector('#app')

app.innerHTML = `
  <nav class="site-nav sticky top-0 z-50 border-b backdrop-blur-xl">
    <div class="site-container mx-auto px-5 sm:px-6">
      <div class="flex min-h-16 items-center justify-between gap-4 py-2">
        <a href="#about" class="shrink-0 text-lg font-bold tracking-tight">${data.name}</a>

        <!-- Desktop links -->
        <ul class="site-nav-links hidden lg:flex items-center gap-1">
          ${data.nav.map(item => `
            <li>
              ${item.href === '#contact'
                ? `<button type="button" data-open-contact class="site-nav-link">${item.label}</button>`
                : `<a href="${item.href}" class="site-nav-link">${item.label}</a>`}
            </li>
          `).join('')}
        </ul>

        <div class="site-nav-actions flex shrink-0 items-center gap-2">
          <button id="theme-toggle" type="button" class="site-icon-button"
                  aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
            <svg id="icon-sun" class="hidden h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="4"/>
              <path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>
            </svg>
            <svg id="icon-moon" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>
            </svg>
          </button>

          <button id="menu-toggle" class="site-icon-button lg:hidden" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
            <svg id="icon-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="hidden h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <ul id="mobile-menu" class="site-mobile-menu hidden lg:hidden">
        ${data.nav.map(item => `
          <li>
            ${item.href === '#contact'
              ? `<button type="button" data-open-contact class="site-mobile-link">${item.label}</button>`
              : `<a href="${item.href}" class="site-mobile-link">${item.label}</a>`}
          </li>
        `).join('')}
      </ul>
    </div>
  </nav>

 
<section id="about" class="hero-section flex items-center relative overflow-hidden">
    <div class="site-container mx-auto w-full px-5 sm:px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-[1.2fr_.8fr] gap-10 md:gap-16 items-center">

        <!-- Left column: text + buttons -->
        <div>
          <p class="mb-4 text-sm font-semibold uppercase tracking-[.18em] text-blue-700">Hello, I'm</p>
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">${data.name}</h1>
          <p class="text-xl md:text-2xl text-blue-600 font-medium mt-3">${data.title}</p>
          <p class="max-w-xl text-gray-600 mt-6 leading-7">${data.bio}</p>

          <div class="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="${data.resume}" download
               class="site-button site-button-primary">
              Download CV
            </a>
            <button type="button" data-open-contact
               class="site-button site-button-secondary">
              Contact Me
            </button>
          </div>
        </div>

        <!-- Right column: photo -->
        <div class="flex justify-center">
          <img src="${data.headshot}" alt="${data.name}"
               class="hero-headshot w-56 h-56 md:w-72 md:h-72 rounded-full object-cover ring-4 ring-white shadow-2xl" />
        </div>

      </div>
    </div>
  </section>

  <section id="projects" class="py-14 sm:py-16">
    <div class="site-container mx-auto px-5 sm:px-6">
    <h2 class="section-title mb-8">Projects</h2>
      <div class="project-carousel" role="region" aria-label="Project carousel">
        <div id="project-deck" class="project-deck" tabindex="0" aria-label="Project cards. Use the arrow keys to browse.">
          ${data.projects.map((project, index) => `
            <article class="project-card rounded-2xl border border-white/70 bg-white/60 p-6 shadow-lg backdrop-blur"
                     data-project-index="${index}" aria-hidden="${index !== 0}" ${index !== 0 ? 'inert' : ''}>
              ${projectCardMarkup(project)}
            </article>
          `).join('')}
        </div>
        <div class="mt-6 flex items-center justify-between gap-4">
          <button id="project-previous" type="button" aria-label="Previous project"
                  class="site-button site-button-secondary">
            <span aria-hidden="true">←</span> Previous
          </button>
          <span id="project-count" class="text-sm font-medium text-gray-600" aria-live="polite">1 / ${data.projects.length}</span>
          <button id="project-next" type="button" aria-label="Next project"
                  class="site-button site-button-secondary">
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section id="skills" class="py-14 sm:py-16 scroll-mt-16">
    <div class="site-container mx-auto px-5 sm:px-6">
      <h2 class="section-title mb-8">Skills</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
        ${Object.entries(data.skills).map(([category, skills]) => `
          <div>
            <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">${category === 'ai_ml' ? 'AI & ML' : category[0].toUpperCase() + category.slice(1)}</h3>
            <ul class="flex flex-wrap gap-3" aria-label="${category === 'ai_ml' ? 'AI and machine learning' : category}">
              ${skills.map(skill => `<li class="skill-pill rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700">${skill}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="certifications" class="py-14 sm:py-16 scroll-mt-16">
    <div class="site-container mx-auto px-5 sm:px-6">
      <h2 class="section-title mb-8">Certifications</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${data.certifications.map(certification => `
          <article class="surface-card flex items-center justify-between gap-4 rounded-2xl p-5">
            <h3 class="font-semibold">${certification.name}</h3>
            <button type="button" data-view-cert data-name="${certification.name}" data-file="${certification.file}"
                    class="site-button site-button-primary shrink-0">
              View certificate
            </button>
          </article>
        `).join('')}
      </div>
    </div>
  </section>

  <section id="experience" class="py-14 sm:py-16">
    <div class="site-container mx-auto px-5 sm:px-6">
      <h2 class="section-title mb-8">Experience</h2>
      <div class="space-y-8">
        ${data.experience.map(job => `
          <article class="experience-item pl-5 py-2">
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



    <footer class="py-8 border-t border-gray-200">
      <div class="site-container mx-auto flex justify-center gap-6 px-5 sm:px-6">
        <a href="${data.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="/linkedin.svg" alt="LinkedIn" class="w-6 h-6" />
        </a>
          <a href="${data.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
           <img src="/github.svg" alt="GitHub" class="w-6 h-6" />
        </a>
      </div>
    </footer>

<dialog id="contact-dialog" aria-labelledby="contact-title"
        class="fixed inset-0 m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/50">
  <div class="p-6 sm:p-8">
    <div class="mb-6 flex items-start justify-between gap-4">
      <div>
        <h2 id="contact-title" class="text-3xl font-bold">Contact</h2>
        <p class="mt-2 text-gray-600">Send me a message and I'll get back to you soon.</p>
      </div>
      <button id="close-contact" type="button" aria-label="Close contact form"
              class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" d="M6 6l12 12M6 18L18 6"/>
        </svg>
      </button>
    </div>

    <form id="contact-form" action="https://formspree.io/f/moedadvq" method="POST"
          class="space-y-4">
      <div>
        <label for="name" class="mb-1 block text-sm font-medium text-gray-700">Your name</label>
        <input type="text" id="name" name="name" required
               class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-gray-700">Your email</label>
        <input type="email" id="email" name="email" required
               class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label for="subject" class="mb-1 block text-sm font-medium text-gray-700">Subject</label>
        <input type="text" id="subject" name="subject" required
               class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div>
        <label for="message" class="mb-1 block text-sm font-medium text-gray-700">Your message</label>
        <textarea id="message" name="message" required rows="5"
                  class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>

      <button type="submit"
              class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
        Send message
      </button>
    </form>

    <div id="form-success" class="hidden rounded-lg border border-green-200 bg-green-50 p-6 text-green-800" role="status">
      <p class="text-lg font-medium">Thank you!</p>
      <p class="mt-1">Your message has been sent. I'll get back to you soon.</p>
    </div>
  </div>
</dialog>

<dialog id="certification-dialog" aria-labelledby="certification-title"
        class="fixed inset-0 m-auto h-[90vh] w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/50">
  <div class="flex h-full flex-col p-4 sm:p-6">
    <div class="mb-4 flex items-center justify-between gap-4">
      <h2 id="certification-title" class="text-xl font-bold"></h2>
      <div class="flex shrink-0 items-center gap-2">
        <a id="open-certification" href="#" target="_blank" rel="noopener noreferrer"
           class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
          Open in new tab
        </a>
        <button id="close-certification" type="button" aria-label="Close certificate preview"
                class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
      </div>
    </div>
    <iframe id="certification-preview" title="Certificate preview"
            class="min-h-0 w-full flex-1 rounded-lg border border-gray-200 bg-white">
    </iframe>
  </div>
</dialog>
 
`

// --- Hamburger toggle ---
const toggle = document.querySelector('#menu-toggle')
const mobileMenu = document.querySelector('#mobile-menu')
const iconOpen = document.querySelector('#icon-open')
const iconClose = document.querySelector('#icon-close')
const themeToggle = document.querySelector('#theme-toggle')
const iconSun = document.querySelector('#icon-sun')
const iconMoon = document.querySelector('#icon-moon')

// --- Project carousel ---
const projectDeck = document.querySelector('#project-deck')
const projectCards = [...projectDeck.querySelectorAll('.project-card')]
const projectCount = document.querySelector('#project-count')
let currentProjectIndex = 0
let swipeStart = null
let projectTransitioning = false
let projectTransitionTimeout = null

function updateProjectStack() {
  projectCards.forEach((card, index) => {
    const depth = (index - currentProjectIndex + data.projects.length) % data.projects.length
    card.dataset.depth = String(depth)
    card.style.setProperty('--card-offset-y', `${depth * 13}px`)
    card.style.setProperty('--card-offset-z', `${depth * -38}px`)
    card.style.setProperty('--card-scale', String(1 - depth * 0.045))
    card.style.setProperty('--card-rotation', `${depth === 0 ? 0 : (depth % 2 ? -1 : 1) * (depth + 1)}deg`)
    card.style.zIndex = String(data.projects.length - depth)
    card.style.visibility = depth < 3 ? 'visible' : 'hidden'
    card.style.pointerEvents = depth === 0 ? 'auto' : 'none'
    card.setAttribute('aria-hidden', String(depth !== 0))
    card.inert = depth !== 0
  })
  projectCount.textContent = `${currentProjectIndex + 1} / ${data.projects.length}`
}

function finishProjectTransition(direction) {
  if (!projectTransitioning) return
  window.clearTimeout(projectTransitionTimeout)
  projectTransitionTimeout = null
  currentProjectIndex = (currentProjectIndex + (direction === 'next' ? 1 : -1) + data.projects.length) % data.projects.length
  projectDeck.classList.remove('is-swiping-next', 'is-swiping-previous', 'is-dragging')
  projectDeck.style.removeProperty('--drag-x')
  projectDeck.style.removeProperty('--drag-rotate')
  projectDeck.style.removeProperty('--drag-tilt')
  projectTransitioning = false
  updateProjectStack()
}

function showProject(direction) {
  if (projectTransitioning || data.projects.length < 2) return
  projectTransitioning = true
  projectDeck.dataset.direction = direction
  projectDeck.classList.add(direction === 'next' ? 'is-swiping-next' : 'is-swiping-previous')
  projectTransitionTimeout = window.setTimeout(() => finishProjectTransition(direction), 450)
}

document.querySelector('#project-previous').addEventListener('click', () => {
  showProject('previous')
})

document.querySelector('#project-next').addEventListener('click', () => {
  showProject('next')
})

projectDeck.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showProject('previous')
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    showProject('next')
  }
})

projectDeck.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.target.closest('a, button')) {
    swipeStart = null
    return
  }
  swipeStart = { x: event.clientX, y: event.clientY }
  projectDeck.setPointerCapture(event.pointerId)
})

projectDeck.addEventListener('pointermove', event => {
  if (!swipeStart || projectTransitioning) return
  const deltaX = event.clientX - swipeStart.x
  const deltaY = event.clientY - swipeStart.y
  if (Math.abs(deltaX) < Math.abs(deltaY)) return

  const rotation = Math.max(-18, Math.min(18, -deltaX / projectDeck.clientWidth * 18))
  const tilt = Math.max(-5, Math.min(5, deltaX / projectDeck.clientWidth * 5))
  projectDeck.classList.add('is-dragging')
  projectDeck.style.setProperty('--drag-x', `${deltaX}px`)
  projectDeck.style.setProperty('--drag-rotate', `${rotation}deg`)
  projectDeck.style.setProperty('--drag-tilt', `${tilt}deg`)
})

projectDeck.addEventListener('pointerup', event => {
  if (!swipeStart) return
  const deltaX = event.clientX - swipeStart.x
  const deltaY = event.clientY - swipeStart.y
  swipeStart = null

  if (Math.abs(deltaX) >= 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
    showProject(deltaX < 0 ? 'next' : 'previous')
  } else {
    projectDeck.classList.remove('is-dragging')
    projectDeck.style.removeProperty('--drag-x')
    projectDeck.style.removeProperty('--drag-rotate')
    projectDeck.style.removeProperty('--drag-tilt')
  }
})

projectDeck.addEventListener('pointercancel', () => {
  swipeStart = null
  projectDeck.classList.remove('is-dragging')
  projectDeck.style.removeProperty('--drag-x')
  projectDeck.style.removeProperty('--drag-rotate')
  projectDeck.style.removeProperty('--drag-tilt')
})

projectDeck.addEventListener('animationend', event => {
  if (event.target !== projectCards[currentProjectIndex]) return
  if (event.animationName === 'project-card-swipe-next') finishProjectTransition('next')
  if (event.animationName === 'project-card-swipe-previous') finishProjectTransition('previous')
})

updateProjectStack()

function updateThemeToggle(theme) {
  const isDark = theme === 'dark'
  themeToggle.setAttribute('aria-pressed', String(isDark))
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`)
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} mode`
  iconSun.classList.toggle('hidden', !isDark)
  iconMoon.classList.toggle('hidden', isDark)
}

updateThemeToggle(document.documentElement.dataset.theme)

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)
  updateThemeToggle(theme)
})

toggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden')
  mobileMenu.classList.toggle('hidden')
  iconOpen.classList.toggle('hidden')
  iconClose.classList.toggle('hidden')
  toggle.setAttribute('aria-expanded', String(!isOpen))
})

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden')
    iconOpen.classList.remove('hidden')
    iconClose.classList.add('hidden')
    toggle.setAttribute('aria-expanded', 'false')
  })
})

// --- Contact dialog ---
const contactDialog = document.querySelector('#contact-dialog')
const closeContact = document.querySelector('#close-contact')

document.querySelectorAll('[data-open-contact]').forEach(button => {
  button.addEventListener('click', () => {
    contactDialog.showModal()
    mobileMenu.classList.add('hidden')
    iconOpen.classList.remove('hidden')
    iconClose.classList.add('hidden')
    toggle.setAttribute('aria-expanded', 'false')
  })
})

closeContact.addEventListener('click', () => contactDialog.close())

contactDialog.addEventListener('click', event => {
  if (event.target === contactDialog) contactDialog.close()
})

// --- Certification dialog ---
const certificationDialog = document.querySelector('#certification-dialog')
const certificationTitle = document.querySelector('#certification-title')
const certificationPreview = document.querySelector('#certification-preview')
const openCertification = document.querySelector('#open-certification')

document.querySelectorAll('[data-view-cert]').forEach(button => {
  button.addEventListener('click', () => {
    const { name, file } = button.dataset
    certificationTitle.textContent = name
    certificationPreview.title = `${name} preview`
    certificationPreview.src = `${file}#view=FitH`
    openCertification.href = file
    certificationDialog.showModal()
  })
})

document.querySelector('#close-certification').addEventListener('click', () => {
  certificationDialog.close()
})

certificationDialog.addEventListener('close', () => {
  certificationPreview.removeAttribute('src')
})

certificationDialog.addEventListener('click', event => {
  if (event.target === certificationDialog) certificationDialog.close()
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
