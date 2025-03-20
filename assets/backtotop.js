const backToTopButton = document.getElementById('backToTop');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

backToTopButton.addEventListener('click', () => {
  if (backToTopButton.classList.contains('down')) {
    smoothScrollTo(0); // Scroll to top
  } else {
    smoothScrollTo(scrollHeight); // Scroll to bottom
  }
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const progress = (scrolled / scrollHeight) * 100;
  scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const offset = circumference - (progress / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  if (scrolled > 400) {
    backToTopButton.classList.add('down');
  } else {
    backToTopButton.classList.remove('down');
  }
});

// Smooth scrolling function with custom speed
function smoothScrollTo(targetPosition) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1600; // Adjust speed (higher = slower)
  let startTime = null;

  function animationStep(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Normalize progress (0 to 1)

    // Custom ease-in-out function: starts fast, slows down more at the end
    const easedProgress = progress < 0.5 ? 1 * progress * progress : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (elapsedTime < duration) {
      requestAnimationFrame(animationStep);
    } else {
      window.scrollTo(0, targetPosition); // Ensure exact position
    }
  }

  requestAnimationFrame(animationStep);
}
