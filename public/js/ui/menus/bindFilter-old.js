import { setState } from "../filters/store.js";

export function bindFilters() {
	
  const textInput = document.getElementById("text-input");
  textInput.addEventListener("change", () => {
    setState(s => { s.filters.text = textInput.value.trim(); });
  });

  const ratingOp = document.getElementById("rating-operator");
  ratingOp.addEventListener("change", () => {
    setState(s => { s.filters.ratingOp = parseInt(ratingOp.value, 10); });
  });
  
  const tagCheckboxes = document.getElementById("tag_checkboxes_container")
  tagCheckboxes.addEventListener("change", () => {
		setState(s => { s.filters.ratingOp = parseInt(ratingOp.value, 10);
		  const checked = document.querySelectorAll(".form-check-input-tag:checked");
		  filters.tagIds = new Set([...checked].map(cb => cb.id));
		  applyFilters();
		});
  

  // etc : tags/url/group => setState avec Set()
}