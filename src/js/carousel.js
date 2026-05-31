// Lightweight, dependency-free carousel.
// Native scroll-snap handles the swiping; the buttons just nudge it along.
(function () {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  const prev = document.querySelector(".carousel-prev");
  const next = document.querySelector(".carousel-next");

  // Distance to scroll: one card plus the flex gap.
  function step() {
    const card = track.querySelector(".card");
    if (!card) return track.clientWidth;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  }

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  next?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  // Disable buttons at the ends.
  function update() {
    const max = track.scrollWidth - track.clientWidth - 1;
    if (prev) prev.disabled = track.scrollLeft <= 0;
    if (next) next.disabled = track.scrollLeft >= max;
  }

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
