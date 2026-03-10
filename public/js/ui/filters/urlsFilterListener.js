 import { toggleClass } from "../../utils/utils.js";
 
export function bindUrlFilter({ filtersState, applyFilters }) {

  document.getElementById("url_checkboxes_container").addEventListener("click", (e) => {
	  
	const tg = e.target
	if (tg.matches(".url-favorite")) {
		// on change le statut dans l'interface et en base
		toggleClass(tg,"bi-dot", "bi-star-fill")
	}
	
	if (tg.matches(".form-check-input-url")) {
	const checked = document.querySelectorAll(".form-check-input-url:checked");
	filtersState.siteIds = new Set([...checked].map(cb => cb.dataset.siteId));
	}
	
	applyFilters();
	});
}

export function setfilterFavoriteListener () {
	console.log("setfilterFavoriteListener 1 ")
	document.getElementById("url_status_filter").addEventListener("click", (e) => {
		const star = e.currentTarget.querySelector(".bi");
		const lis = document.querySelectorAll("#url_checkboxes_list li");

		// toggle de l'icône du filtre
		toggleClass(star,"bi-star", "bi-star-fill")

		const filterActive = star.classList.contains("bi-star-fill");

		lis.forEach(li => {
			const fav = li.querySelector(".url-favorite");

			if (filterActive && !fav.classList.contains("bi-star-fill")) {
				li.style.display="none"
			} else {
				li.style.display="flex"
			}
		});
	})
}
