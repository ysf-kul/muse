// Inlined after the page markup: no translation fetch or hydration is needed.
(() => {
  const root = document.documentElement;
  const languageState = window.museLanguage;
  const translations = JSON.parse(
    document.getElementById("muse-translations").textContent,
  );
  const names = JSON.parse(root.dataset.languageNames);
  const base = root.dataset.basePath.replace(/\/$/, "");
  const route = root.dataset.pagePath;
  const system = matchMedia("(prefers-color-scheme: dark)");
  const themes = ["system", "light", "dark"];
  const themeButton = document.getElementById("theme-toggle");
  const languageLink = document.getElementById("language-toggle");
  const status = document.getElementById("language-status");
  const path = (language, page = route) =>
    `${base}/${language === "en" ? "en/" : ""}${page}`;
  const save = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Controls work without storage. */
    }
  };
  const paramsFor = (element) => JSON.parse(element.dataset.i18nParams || "{}");
  function text(key, params = {}) {
    const value = translations[languageState.locale][key];
    if (value === undefined) throw new Error(`Missing translation key: ${key}`);
    return value.replace(/\{(\w+)\}/g, (_, key) => {
      const value = params[key];
      if (value === undefined)
        throw new Error(`Missing translation parameter: ${key}`);
      return typeof value === "string" ? value : value[languageState.locale];
    });
  }
  function applyTheme(preference) {
    if (!themes.includes(preference)) preference = "system";
    root.dataset.themePreference = preference;
    root.dataset.theme =
      preference === "dark" || (preference === "system" && system.matches)
        ? "dark"
        : "light";
    const next = themes[(themes.indexOf(preference) + 1) % themes.length];
    document.getElementById("theme-label").textContent = text(
      `theme.${preference}`,
    );
    const label = text("theme.action", {
      current: text(`theme.${preference}`),
      next: text(`theme.${next}`),
    });
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
  }
  function elementsIn(scope, selector) {
    return [
      ...(scope instanceof Element && scope.matches(selector) ? [scope] : []),
      ...scope.querySelectorAll(selector),
    ];
  }
  function localizedValue(json) {
    const value = JSON.parse(json)[languageState.locale];
    if (typeof value !== "string" || !value.trim())
      throw new Error(`Missing localized text: ${languageState.locale}`);
    return value;
  }
  function translateContent(scope = document) {
    const language = languageState.locale;
    elementsIn(scope, "[data-i18n], [data-localized]").forEach((element) => {
      element.textContent = element.dataset.i18n
        ? text(element.dataset.i18n, paramsFor(element))
        : localizedValue(element.dataset.localized);
    });
    for (const attribute of ["aria-label", "title", "alt", "content"]) {
      elementsIn(
        scope,
        `[data-i18n-${attribute}], [data-localized-${attribute}]`,
      ).forEach((element) => {
        const key = element.getAttribute(`data-i18n-${attribute}`);
        const value = key
          ? text(key, paramsFor(element))
          : localizedValue(element.getAttribute(`data-localized-${attribute}`));
        element.setAttribute(attribute, value);
      });
    }
    elementsIn(scope, "[data-route]").forEach((link) =>
      link.setAttribute("href", path(language, link.dataset.route)),
    );
    elementsIn(scope, "time[data-date]").forEach((element) => {
      element.textContent = new Intl.DateTimeFormat(language, {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(element.dataset.date));
    });
  }
  function applyLanguage(language, announce = false) {
    translateContent();
    const next = language === "tr" ? "en" : "tr";
    document.getElementById("language-label").textContent = names[language];
    const action = text("language.action", {
      current: names[language],
      next: names[next],
    });
    languageLink.setAttribute("aria-label", action);
    languageLink.title = action;
    languageLink.href = path(
      next,
      root.dataset.knownPage === "true" ? route : "",
    );
    document.querySelector('meta[property="og:locale"]').content =
      language === "tr" ? "tr_TR" : "en_US";
    const image = `${root.dataset.siteOrigin || ""}${base}/assets/${language === "tr" ? "social-preview-tr.png" : "social-preview.png"}`;
    document
      .querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')
      .forEach((element) => (element.content = image));
    if (root.dataset.knownPage === "true") {
      const canonical = `${root.dataset.siteOrigin || location.origin}${path(language)}`;
      document
        .querySelector('link[rel="canonical"]')
        ?.setAttribute("href", canonical);
      document
        .querySelector('meta[property="og:url"]')
        ?.setAttribute("content", canonical);
      if (location.pathname !== path(language)) {
        history.replaceState(
          history.state,
          "",
          `${path(language)}${location.search}${location.hash}`,
        );
      }
    }
    applyTheme(root.dataset.themePreference || "system");
    status.textContent = announce ? text("language.announcement") : "";
    root.removeAttribute("data-language-pending");
  }
  languageState.subscribe(applyLanguage);
  applyLanguage(languageState.locale);
  // Newly inserted translated content uses the same controller, including links.
  new MutationObserver((mutations) => {
    for (const mutation of mutations)
      for (const node of mutation.addedNodes)
        if (node instanceof Element) translateContent(node);
  }).observe(document.body, { childList: true, subtree: true });
  document.querySelector(".theme-controls").hidden = false;
  languageLink.addEventListener("click", (event) => {
    if (event.altKey || event.button !== 0) return;
    // A modified click is still an explicit choice; keep normal new-tab behavior.
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey)
      event.preventDefault();
    languageState.select(languageState.locale === "tr" ? "en" : "tr");
  });
  languageLink.addEventListener("auxclick", (event) => {
    if (event.button === 1 && !event.altKey)
      languageState.select(languageState.locale === "tr" ? "en" : "tr");
  });
  themeButton.addEventListener("click", () => {
    const next =
      themes[
        (themes.indexOf(root.dataset.themePreference) + 1) % themes.length
      ];
    applyTheme(next);
    save("muse-theme", next);
  });
  system.addEventListener("change", () => {
    if (root.dataset.themePreference === "system") applyTheme("system");
  });
  window.addEventListener("storage", (event) => {
    if (event.key === "muse-theme" || event.key === null)
      applyTheme(event.newValue || "system");
  });
})();
