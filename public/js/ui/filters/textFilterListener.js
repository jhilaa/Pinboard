export function bindTextFilter({ filtersState, applyFilters }) {

  const inputField = document.querySelector("#input_field input");
  inputField.addEventListener("change", () => {
		filtersState.text = inputField.value ;
		applyFilters();
  })

}