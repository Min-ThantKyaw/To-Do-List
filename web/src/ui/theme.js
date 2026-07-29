const STORAGE_KEY = 'mode'
const rootHtml = document.documentElement

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  rootHtml.classList.toggle('dark', theme === 'dark')
  rootHtml.classList.toggle('light', theme === 'light')
  localStorage.setItem(STORAGE_KEY, theme)
}

let currentTheme = getPreferredTheme()
applyTheme(currentTheme)

export function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light'
  applyTheme(currentTheme)
}

export function getTheme() {
  return currentTheme
}
