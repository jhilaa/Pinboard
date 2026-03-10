import { filtersState } from "./filtersState.js";
import { countFromVisiblePins, updateRatingMenuCounts, updateTagMenuCounts, updateUrlMenuCounts, updateGroupMenuCounts} from "../menus/pinsCounts.js"; //


function csvToSet(csv) {
  return new Set((csv || "").split(",").filter(Boolean));
}

export function applyFilters() {
    // on récupère les pins et leurs attributs pour mettre à jour le "state" filters
    const pins = document.querySelectorAll(".pin:not(#pin_0)");
    pins.forEach(pin => {
    let ok = true;

	// "filtre" sur la note
	const rating = parseInt(pin.dataset.rating || "0");
    if (filtersState.ratingOp === 1) ok = ok && (rating > filtersState.rating);
    if (filtersState.ratingOp === 2) ok = ok && (rating >= filtersState.rating);
    if (filtersState.ratingOp === 3) ok = ok && (rating === filtersState.rating);
    if (filtersState.ratingOp === 4) ok = ok && (rating <= filtersState.rating);
    if (filtersState.ratingOp === 5) ok = ok && (rating < filtersState.rating);

    // filtre sur le texte
    if (filtersState.text) ok &&= pin.dataset.search?.includes(filtersState.text.toLowerCase());

    // filtre sur les tags (AND)
    if (filtersState.tagIds.size) {
      const pinTags = csvToSet(pin.dataset.tags);
      for (const id of filtersState.tagIds) if (!pinTags.has(id)) { ok = false; break; }
    }

    // filtre sur les urls/sites (OR)
    if (ok && filtersState.siteIds.size) {
      ok &&= filtersState.siteIds.has(pin.dataset.siteId);
    }

    // filtre sur les groupes (OR)
    if (ok && filtersState.groupIds.size) {
      const pinGroups = csvToSet(pin.dataset.groups);
      let any = false;
      for (const id of filtersState.groupIds) if (pinGroups.has(id)) { any = true; break; }
      ok &&= any;
    }

    // selected
    if (filtersState.selectedMode === "on") ok &&= (pin.dataset.selected === "1");
    if (filtersState.selectedMode === "off") ok &&= (pin.dataset.selected === "0");

    pin.classList.toggle("display_block", ok);
    pin.classList.toggle("display_none", !ok);
  });
  
  // on appelle la fonction qui compte les pins poir appeler les fonctions qui mettent à jour les menus
  const { total, tagCounts, urlCounts, groupCounts } = countFromVisiblePins();
  updateTagMenuCounts(tagCounts);
  updateUrlMenuCounts(urlCounts);
  updateGroupMenuCounts(groupCounts);
  // total pins pour le menus note / étoile
  updateRatingMenuCounts(total)
}