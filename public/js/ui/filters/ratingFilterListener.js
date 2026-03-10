export function bindRatingFilter({ filtersState, applyFilters }) {

  const ratingOperator = document.getElementById("rating-operator");
  const ratingContainer = document.querySelector(".rating");

  // mmise à jour des étoiles en fonction du clic
  function updateStarsDisplay(value) {
    const stars = ratingContainer.querySelectorAll(".star");

    stars.forEach((star) => {
      const v = parseInt(star.dataset.value, 10);

      star.classList.toggle("bi-star-fill", v <= value);
      star.classList.toggle("bi-star", v > value);
    });
  }
 
  // mise à jour du state avec l'opérateur sélectionné
  ratingOperator.addEventListener("change", () => {
    filtersState.ratingOp = parseInt(ratingOperator.value);
    applyFilters();
  });

  // mise à jour du state avec la note sélectionner
  ratingContainer.addEventListener("click", (e) => {
    const star = e.target.closest(".star");
    if (!star) return;

    const clicked = parseInt(star.dataset.value, 10);
    const current = parseInt(ratingContainer.getAttribute("filter_value") || "0", 10);

    let newValue = clicked;

    // toggle uniquement pour la 1ère étoile
    if (clicked === 1 && current === 1) {
      newValue = 0;
    }

    ratingContainer.setAttribute("filter_value", newValue);
    filtersState.rating = newValue;
    updateStarsDisplay(newValue);
    applyFilters();
  });

}