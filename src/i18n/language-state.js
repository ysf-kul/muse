// The one language controller, installed before paint and shared by every page.
(() => {
  const root = document.documentElement;
  const locales = JSON.parse(root.dataset.supportedLocales);
  const fallback = root.dataset.defaultLocale;
  const base = root.dataset.basePath.replace(/\/$/, "");
  const listeners = new Set();
  let selectedInDocument = false;
  let locale;

  function resolve() {
    try {
      const saved = localStorage.getItem("muse-language");
      if (locales.includes(saved)) return saved;
    } catch {
      /* URL navigation still works when persistent storage is unavailable. */
    }
    if (selectedInDocument) return locale;
    const relative = location.pathname.startsWith(`${base}/`)
      ? location.pathname.slice(base.length + 1)
      : "";
    return relative === "en" || relative.startsWith("en/") ? "en" : fallback;
  }

  function publish(language, announce = false) {
    locale = language;
    root.lang = locale;
    listeners.forEach((listener) => listener(locale, announce));
  }

  const state = Object.freeze({
    get locale() {
      return locale;
    },
    select(language) {
      if (!locales.includes(language))
        throw new Error(`Unsupported language: ${language}`);
      selectedInDocument = true;
      // Save before notifying consumers, so navigation cannot see the old choice.
      try {
        localStorage.setItem("muse-language", language);
      } catch {
        /* Keep the explicit choice in this document and its navigation URLs. */
      }
      publish(language, true);
    },
    refresh() {
      publish(resolve());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  });
  window.museLanguage = state;
  publish(resolve());
  if (locale !== root.dataset.renderedLocale) {
    root.setAttribute("data-language-pending", "");
    setTimeout(() => root.removeAttribute("data-language-pending"), 1500);
  }
  window.addEventListener("storage", (event) => {
    if (event.key === "muse-language" || event.key === null) {
      selectedInDocument = false;
      state.refresh();
    }
  });
  // Cached documents and history entries must consult the same saved preference.
  window.addEventListener("pageshow", () => state.refresh());
  window.addEventListener("popstate", () => state.refresh());
})();
