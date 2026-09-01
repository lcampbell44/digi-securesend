/* Resolve the theme before first paint.
 *
 * index.html cannot do this inline: the server's CSP sets
 * scriptSrc: ["'self'", "'wasm-unsafe-eval'"] with no 'unsafe-inline', so an
 * inline script is blocked. A same-origin file is covered by 'self'.
 *
 * Loaded as a plain (non-module, non-defer) script in <head> so it is
 * render-blocking and runs before the body paints. Without it, <html> would
 * need a hardcoded theme class and every user on the other theme would see a
 * flash before useTheme's first effect corrects it.
 *
 * Must stay in sync with STORAGE_KEY and the resolution order in
 * apps/web/src/hooks/useTheme.tsx.
 */
(function () {
  try {
    var stored = localStorage.getItem("skysend-theme");
    var theme = stored === "dark" || stored === "light" || stored === "system" ? stored : "system";
    var resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    document.documentElement.classList.toggle("dark", resolved === "dark");
  } catch {
    /* localStorage can throw in a partitioned or blocked-cookie context.
       Falling through leaves the light theme, which is the safe default. */
  }
})();
