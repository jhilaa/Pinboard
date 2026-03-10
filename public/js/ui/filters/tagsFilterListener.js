export function bindTagFilter({ filtersState, applyFilters }) {

  document.getElementById("tag_checkboxes_container").addEventListener("change", () => {
		  const checked = document.querySelectorAll(".form-check-input-tag:checked");
		  filtersState.tagIds = new Set([...checked].map(cb => cb.id));
		  applyFilters();
		});
}