export default function hideNavbars() {
  const hamburgersClicked = document.querySelectorAll(".hamburger--clicked");
  hamburgersClicked.forEach((hamburger) => hamburger.click());
}
