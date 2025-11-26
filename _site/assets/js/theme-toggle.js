(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.dataset.theme = stored;
  }

  btn.addEventListener("click", () => {
    const current = root.dataset.theme || "auto";
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
})();
