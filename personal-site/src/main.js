import './style.css'
import data from './data.json'

console.log('DATA LOADED:', data)

const app = document.querySelector('#app')

app.innerHTML = `
  <h1>${data.name}</h1>
  <p><strong>${data.title}</strong></p>
  <p>${data.bio}</p>
  <footer>
    <a href="${data.social.linkedin}" target="_blank" rel="noopener noreferrer">
      <img src="/linkedin.svg" alt="LinkedIn" class="w-6 h-6" />
    </a>
    <a href="${data.social.github}" target="_blank" rel="noopener noreferrer">
      <img src="/github.svg" alt="GitHub" class="w-6 h-6" />
    </a>
  </footer>
`