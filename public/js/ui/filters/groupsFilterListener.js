export function bindGroupFilter({ filtersState, applyFilters }) {

	const treeElement = document.querySelector('#group_checkboxes_list');
	treeElement.addEventListener("tree:change", () => {
  	  const groupCheckboxesList = document.getElementById("group_checkboxes_list")
  	  const checked = groupCheckboxesList.querySelectorAll(".treejs-node__checked");
  	  filtersState.groupIds = new Set([...checked].map(cb => cb.id));
  	  applyFilters();
  	});
}
		