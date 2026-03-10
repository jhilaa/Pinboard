// main.js
import { getRecords, getRecordsByDomain } from "./api/api.js";
import { renderDomainsMenu } from "./ui/menus/domains.js";
import { renderFoldersMenu } from "./ui/menus/folders.js";
import { renderTagsMenu } from "./ui/menus/tags.js";
import { renderUrlsMenu } from "./ui/menus/urls.js";
import { renderPins } from "./ui/pins/pins.js";
import { setCookie, getCookie } from "./utils/utils.js";
import { applyFilters } from "./ui/filters/applyFilters.js";

// met en place le lien entre evenement et fonction de rafraichissement (mise à jour state et rafrichissement ui)
import { setEventHandler } from "./ui/events/setEventHandler.js";

async function loadDataFromDomainAndRenderFilter(domainId) {
    const spinnerContainer = document.getElementById("spinnerContainer");
    spinnerContainer.style.display = "block";

    try {
        const [pinData, tagData, groupData, urlData] = await Promise.all([
                    getRecordsByDomain("pins", domainId),
                    getRecordsByDomain("tags", domainId),
                    getRecordsByDomain("groups", domainId),
                    getRecordsByDomain("sites", domainId),
                ]);

        renderPins(pinData);
        renderFoldersMenu(groupData);
        renderTagsMenu(tagData);
        renderUrlsMenu(urlData);
        setCookie("selectedDomain", domainId);
		applyFilters();
    } catch (err) {
        console.error("loadDataFromDomainAndRenderFilter error:", err);
    } finally {
        spinnerContainer.style.display = "none";
    }
}

async function init() {

    const spinnerContainer = document.getElementById("spinnerContainer");
    spinnerContainer.style.display = "block";

    try {
        const selectedDomain = getCookie("selectedDomain");
        const domainData = await getRecords("domain");
        renderDomainsMenu(domainData, selectedDomain, loadDataFromDomainAndRenderFilter); //
        if (selectedDomain) {
            await loadDataFromDomainAndRenderFilter(selectedDomain);
        }
        applyFilters();

        // mise place de la gestion des événements
        setEventHandler();

    } catch (e) {
        console.error(e);
    } finally {
        spinnerContainer.style.display = "none";
    }
}

init();
