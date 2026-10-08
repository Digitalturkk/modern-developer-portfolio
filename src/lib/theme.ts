export function toggleTheme() {
  const isLight = document.documentElement.classList.toggle("light");
  try {
    localStorage.setItem("theme", isLight ? "light" : "dark");
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
}
