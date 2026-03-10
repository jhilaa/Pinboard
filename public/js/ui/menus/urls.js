 import { toggleClass } from "../../utils/utils.js";
 
 export async function renderUrlsMenu(urlsData, selectedGroups) {
	 const sortedUrls = urlsData.records.toSorted((a, b) => {
            const siteA = a.fields.site.toLowerCase();
            const siteB = b.fields.site.toLowerCase();

            if (siteA < siteB) return -1;
            if (siteA > siteB) return 1;
            return 0;
        });
        const urlCheckboxesList = document.getElementById("url_checkboxes_list");
        urlCheckboxesList.innerHTML = "";
		
		
		
		
		for (const url of sortedUrls) {
            const urlItemInput = document.createElement("input");
            urlItemInput.classList.add("form-check-input");
            urlItemInput.classList.add("form-check-input-url");
            urlItemInput.type = "checkbox";
            urlItemInput.dataset.siteId = url.id;

            const urlItemLabel = document.createElement("label");
            urlItemLabel.setAttribute('for', url.id);
            urlItemLabel.setAttribute('name', url.fields.site);
            urlItemLabel.classList.add("form-check-label");
            urlItemLabel.textContent = url.fields.site;

            const urlCount = document.createElement("span");
            urlCount.classList.add("urlCount");

            const urlItemFavorite = document.createElement("span");
            const urlItemFavoriteClass = (url.fields.site_rating == 1 ? "bi-star-fill" : "bi-dot")
            urlItemFavorite.classList.add("url-favorite", "dot", "bi", urlItemFavoriteClass);
            //urlItemFavorite.id = url.id;
            urlItemFavorite.setAttribute("rating", url.fields.site_rating);
           

            const urlItemDiv = document.createElement("li")
            urlItemDiv.id = url.id;
            urlItemDiv.appendChild(urlItemInput);
            urlItemDiv.appendChild(urlItemFavorite);
            urlItemDiv.appendChild(urlItemLabel);
            urlItemDiv.appendChild(urlCount);
            urlItemDiv.classList.add("form-check");
            urlCheckboxesList.appendChild(urlItemDiv);
        }
	
	 
 }
 
